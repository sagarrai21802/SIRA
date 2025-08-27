
import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, Event as BigCalendarEvent } from 'react-big-calendar';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabaseClient';
import { EventModal } from './EventModal';
import { CalendarToolbar } from './CalendarToolbar';
import { EventItem } from './EventItem';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop(Calendar);

interface ScheduledPost {
  id: string;
  caption: string;
  image_url: string;
  scheduled_at: string;
  status: string;
  platform?: string;
}

import { useSchedulerNotifications } from '../../hooks/useSchedulerNotifications';

export function ModernScheduler() {
  const { user } = useAuth();
  const [events, setEvents] = useState<BigCalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<BigCalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useSchedulerNotifications();

  const fetchScheduledPosts = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching scheduled posts:', error);
      return;
    }

    const formattedEvents = data.map((post: ScheduledPost) => ({
      title: post.caption,
      start: new Date(post.scheduled_at),
      end: new Date(post.scheduled_at),
      resource: post,
    }));

    setEvents(formattedEvents);
  }, [user]);

  useEffect(() => {
    fetchScheduledPosts();
  }, [fetchScheduledPosts]);

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

  const handleEventDrop: withDragAndDropProps['onEventDrop'] = async ({ event, start, end }) => {
    if (!event.resource) return;

    const { error } = await supabase
      .from('scheduled_posts')
      .update({ scheduled_at: (start as Date).toISOString() })
      .eq('id', event.resource.id);

    if (error) {
      console.error('Error updating event:', error);
      return;
    }

    fetchScheduledPosts();
  };

  const handleEventSave = () => {
    setIsModalOpen(false);
    fetchScheduledPosts();
  };

  const handleEventDelete = async () => {
    if (!selectedEvent || !selectedEvent.resource) return;

    const { error } = await supabase
      .from('scheduled_posts')
      .delete()
      .eq('id', selectedEvent.resource.id);

    if (error) {
      console.error('Error deleting event:', error);
      return;
    }

    setIsModalOpen(false);
    fetchScheduledPosts();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <DnDCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onEventDrop={handleEventDrop}
          components={{
            toolbar: CalendarToolbar,
            event: EventItem,
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
