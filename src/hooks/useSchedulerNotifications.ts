import { useEffect } from 'react';
import { useAuth } from './useAuth';
// import { getMongoDb } from '../lib/realm';

export function useSchedulerNotifications() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const checkUpcomingEvents = async () => {
      try {
        const now = new Date();
        const inOneMinute = new Date(now.getTime() + 60 * 1000);

        const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
        const params = new URLSearchParams({ user_id: user.id, from: now.toISOString(), to: inOneMinute.toISOString() });
        const resp = await fetch(`${apiBase}/api/scheduled-posts?${params.toString()}`);
        if (!resp.ok) throw new Error(await resp.text());
        const data = await resp.json();
        const events = data.items || [];

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