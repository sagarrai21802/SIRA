import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, Event as BigCalendarEvent } from 'react-big-calendar';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';

import { format, parse, startOfWeek, getDay } from 'date-fns';
// import enUS from 'date-fns/locale/en-US';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import { useAuth } from '../../hooks/useAuth';
// import { getMongoDb } from '../../lib/realm';
import { EventModal } from './EventModal';
import { CalendarToolbar } from './CalendarToolbar';
import { EventItem } from './EventItem';
import { useSchedulerNotifications } from '../../hooks/useSchedulerNotifications';

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

export function ModernScheduler() {
  const { user } = useAuth();
  const [events, setEvents] = useState<BigCalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<BigCalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useSchedulerNotifications();

  const fetchScheduledPosts = useCallback(async () => {
    if (!user) return;
    try {
      const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
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
      const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
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
      const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <DnDCalendar
          localizer={localizer}
          events={events}
          startAccessor={(event: BigCalendarEvent) => event.start ?? new Date()}
          endAccessor={(event: BigCalendarEvent) => event.end ?? new Date()}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onEventDrop={handleEventDrop}
          components={{ 
            toolbar: (props: any) => (
              <CalendarToolbar
                label={props.label}
                view={props.view}
                views={props.views}
                onNavigate={props.onNavigate}
                onView={props.onView}
              />
            ),
            event: EventItem
          }}
          style={{ height: '85vh' }}
          className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg"
        />
      </div>
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