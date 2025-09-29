import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { useAuth } from '../../hooks/useAuth';
import { getMongoDb } from '../../lib/realm';
import toast from 'react-hot-toast';

interface ScheduleGeneratedPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostScheduled: () => void;
  content: string;
  imageUrl: string | null;
  platform: string;
}

export function ScheduleGeneratedPostModal({ isOpen, onClose, onPostScheduled, content, imageUrl, platform }: ScheduleGeneratedPostModalProps) {
  const { user } = useAuth();
  const [scheduledAt, setScheduledAt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      now.setHours(now.getHours() + 1); // Default to 1 hour from now
      const formattedDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
      setScheduledAt(formattedDate);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !scheduledAt || !user) return;

    setLoading(true);
    try {
      const dbName = import.meta.env.VITE_MONGODB_DB_NAME || 'sira';
      const db = await getMongoDb(dbName);
      await db.collection('scheduled_posts').insertOne({
        id: crypto.randomUUID(),
        user_id: user.id,
        content,
        image_url: imageUrl,
        scheduled_at: scheduledAt,
        status: 'scheduled',
        platform,
      });

      toast.success('Post scheduled successfully!');
      onPostScheduled();
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to schedule post.');
    }
    setLoading(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                  Schedule Post for {platform}
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div className="max-h-60 overflow-y-auto rounded-lg border p-3 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                      <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{content}</p>
                  </div>

                  {imageUrl && (
                      <div className="rounded-lg overflow-hidden border dark:border-gray-600">
                          <img src={imageUrl} alt="Generated post" className="w-full h-auto" />
                      </div>
                  )}

                  <Input
                    label="Scheduled Date & Time"
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    required
                  />
                  <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" onClick={onClose} variant="outline">
                        Cancel
                      </Button>
                      <Button type="submit" loading={loading}>
                        Schedule
                      </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
