import { useState, useEffect, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, Event as BigCalendarEvent } from 'react-big-calendar';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import { useAuth } from '../../hooks/useAuth';
import { EventModal } from './EventModal';
import { EventItem } from './EventItem';
import { useSchedulerNotifications } from '../../hooks/useSchedulerNotifications';
import { BeautifulCalendar } from './BeautifulCalendar';
import { Button } from '../UI/Button';
import { Plus, Calendar as CalendarIcon, Grid } from 'lucide-react';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });
const DnDCalendar = withDragAndDrop(Calendar);

interface ScheduledPost {
  id: string;
  content: string;
  image_url?: string;
  scheduled_at: string;
  status: string;
  platform?: string;
}

type ViewMode = 'calendar' | 'modern';

export function AttractiveScheduler() {
  const { user } = useAuth();
  const [events, setEvents] = useState<BigCalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<BigCalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('modern');

  useSchedulerNotifications();

  const fetchScheduledPosts = useCallback(async () => {
    if (!user) return;
    try {
      const apiBase = 'http://localhost:4000';
      const resp = await fetch(`${apiBase}/api/scheduled-posts?user_id=${encodeURIComponent(user.id)}`);
      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      const formattedEvents = (data.items as ScheduledPost[]).map((post: ScheduledPost) => ({
        title: post.content,
        start: new Date(post.scheduled_at),
        end: new Date(post.scheduled_at),
        resource: post,
      }));
      setEvents(formattedEvents);
    } catch (e) {
      console.error('Error fetching scheduled posts:', e);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchScheduledPosts();
    }
  }, [user, fetchScheduledPosts]);

  const handleSelectSlot = (slotInfo: { start: Date }) => {
    setSelectedDate(slotInfo.start);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event: BigCalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(null);
    setIsModalOpen(true);
  };

  const handleEventDrop: withDragAndDropProps['onEventDrop'] = async ({ event, start }) => {
    if (!event.resource) return;
    try {
      const apiBase = 'http://localhost:4000';
      const resp = await fetch(`${apiBase}/api/scheduled-posts/${encodeURIComponent((event.resource as any).id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scheduled_at: (start as Date).toISOString() })
      });
      if (!resp.ok) throw new Error(await resp.text());
      fetchScheduledPosts();
    } catch (e) {
      console.error('Error updating event:', e);
    }
  };

  const handleEventSave = () => {
    setIsModalOpen(false);
    fetchScheduledPosts();
  };

  const handleEventDelete = async () => {
    if (!selectedEvent || !selectedEvent.resource) return;
    try {
      const apiBase = 'http://localhost:4000';
      const resp = await fetch(`${apiBase}/api/scheduled-posts/${encodeURIComponent((selectedEvent.resource as any).id)}`, {
        method: 'DELETE'
      });
      if (!resp.ok) throw new Error(await resp.text());
      setIsModalOpen(false);
      fetchScheduledPosts();
    } catch (e) {
      console.error('Error deleting event:', e);
    }
  };

  return (
    <div className="relative z-0 p-4 sm:p-6 lg:p-8">
      {/* Header with View Toggle */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Content Scheduler
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Plan and manage your social media content
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('modern')}
              className={`flex items-center space-x-2 ${
                viewMode === 'modern' 
                  ? 'bg-[#0033FF] text-white border-[#0033FF]' 
                  : 'border-[#0033FF]/30 hover:bg-[#0033FF]/10'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Modern View</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('calendar')}
              className={`flex items-center space-x-2 ${
                viewMode === 'calendar' 
                  ? 'bg-[#0033FF] text-white border-[#0033FF]' 
                  : 'border-[#0033FF]/30 hover:bg-[#0033FF]/10'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Calendar View</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[#0033FF] to-[#977DFF] hover:from-[#0600AF] hover:to-[#0033FF] text-white border-none"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>
      </div>

            {/* Calendar Content */}
            {viewMode === 'modern' ? (
              <BeautifulCalendar className="w-full" isMini={false} />
            ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-[#0033FF]/20">
          <style dangerouslySetInnerHTML={{
            __html: `
            .rbc-calendar {
              background: linear-gradient(135deg, #F2E6EE 0%, #FFCCF2 100%);
              border-radius: 12px;
            }
            
            .rbc-header {
              background: linear-gradient(135deg, #0033FF 0%, #977DFF 100%);
              color: white;
              font-weight: bold;
              padding: 12px 8px;
              border: none;
            }
            
            .rbc-toolbar {
              background: linear-gradient(135deg, #0033FF 0%, #977DFF 100%);
              color: white;
              padding: 16px;
              border-radius: 12px 12px 0 0;
            }
            
            .rbc-toolbar button {
              background: rgba(255, 255, 255, 0.2);
              border: 1px solid rgba(255, 255, 255, 0.3);
              color: white;
              border-radius: 6px;
              padding: 8px 12px;
              transition: all 0.2s ease;
            }
            
            .rbc-toolbar button:hover {
              background: rgba(255, 255, 255, 0.3);
              transform: translateY(-1px);
            }
            
            .rbc-toolbar button.rbc-active {
              background: rgba(255, 255, 255, 0.4);
              font-weight: bold;
            }
            
            .rbc-toolbar-label {
              font-size: 18px;
              font-weight: bold;
            }
            
            .rbc-month-view {
              border: none;
            }
            
            .rbc-month-row {
              border: none;
            }
            
            .rbc-date-cell {
              padding: 8px;
            }
            
            .rbc-off-range-bg {
              background: rgba(255, 255, 255, 0.3);
            }
            
            .rbc-today {
              background: linear-gradient(135deg, #F2E6EE 0%, #FFCCF2 100%);
              font-weight: bold;
            }
            
            .rbc-event {
              background: linear-gradient(135deg, #0033FF 0%, #977DFF 100%);
              border: none;
              border-radius: 6px;
              color: white;
              font-weight: 500;
              padding: 2px 6px;
              box-shadow: 0 2px 8px rgba(0, 51, 255, 0.3);
            }
            
            .rbc-event:hover {
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(0, 51, 255, 0.4);
            }
            
            .rbc-event-content {
              font-size: 12px;
            }
            
            .rbc-time-view {
              border: none;
            }
            
            .rbc-time-header {
              border: none;
            }
            
            .rbc-time-content {
              border: none;
            }
            
            .rbc-timeslot-group {
              border: none;
            }
            
            .rbc-time-slot {
              border: none;
            }
            
            .rbc-day-slot .rbc-events-container {
              margin-right: 0;
            }
            `
          }} />
          
          <DnDCalendar
            localizer={localizer}
            events={events}
            startAccessor={(event: any) => event.start}
            endAccessor={(event: any) => event.end}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            onEventDrop={handleEventDrop}
            components={{ 
              event: EventItem 
            }}
            style={{ height: '85vh' }}
            className="p-4 text-gray-900 dark:text-white"
            eventPropGetter={() => ({
              style: {
                backgroundColor: 'transparent',
                background: 'linear-gradient(135deg, #0033FF 0%, #977DFF 100%)',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                fontSize: '12px',
                padding: '2px 6px',
                boxShadow: '0 2px 8px rgba(0, 51, 255, 0.3)',
              },
            })}
          />
        </div>
      )}

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleEventSave}
        onDelete={handleEventDelete}
        event={selectedEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
}
