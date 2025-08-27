
import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '../lib/supabaseClient';

export function useSchedulerNotifications() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const checkUpcomingEvents = async () => {
      const now = new Date();
      const inOneMinute = new Date(now.getTime() + 60 * 1000);

      const { data, error } = await supabase
        .from('scheduled_posts')
        .select('*')
        .eq('user_id', user.id)
        .gte('scheduled_at', now.toISOString())
        .lte('scheduled_at', inOneMinute.toISOString());

      if (error) {
        console.error('Error fetching upcoming events:', error);
        return;
      }

      if (data && data.length > 0) {
        data.forEach((event) => {
          showNotification(event.caption);
        });
      }
    };

    const interval = setInterval(checkUpcomingEvents, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, [user]);

  const showNotification = (message: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Time to post!', {
        body: message,
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Time to post!', {
            body: message,
          });
        }
      });
    }
  };
}
