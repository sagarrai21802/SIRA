import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { getMongoDb } from '../lib/realm';

export function useSchedulerNotifications() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const checkUpcomingEvents = async () => {
      try {
        const now = new Date();
        const inOneMinute = new Date(now.getTime() + 60 * 1000);

        const dbName = import.meta.env.VITE_MONGODB_DB_NAME || 'sira';
        const db = await getMongoDb(dbName);
        const events = await db
          .collection('scheduled_posts')
          .find({
            user_id: user.id,
            scheduled_at: { $gte: now.toISOString(), $lte: inOneMinute.toISOString() }
          });

        if (Array.isArray(events) && events.length > 0) {
          events.forEach((event: any) => {
            showNotification(event.content || 'You have a scheduled post!');
          });
        }
      } catch (err) {
        console.error('Error fetching upcoming events (catch block):', err);
      }
    };

    const interval = setInterval(checkUpcomingEvents, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, [user]);

  const showNotification = (message: string) => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;

    if (Notification.permission === 'granted') {
      new Notification('Time to post!', { body: message });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Time to post!', { body: message });
        }
      });
    }
  };
}