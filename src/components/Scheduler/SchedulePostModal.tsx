import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabaseClient';
import { generateWithGemini } from '../../lib/gemini';
import toast from 'react-hot-toast';

interface SchedulePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onPostScheduled: () => void;
}

export function SchedulePostModal({ isOpen, onClose, selectedDate, onPostScheduled }: SchedulePostModalProps) {
  const { user } = useAuth();
  const [caption, setCaption] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasBrandSnapshot, setHasBrandSnapshot] = useState(true);
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);

  useEffect(() => {
    if (selectedDate) {
      // Format the date to be compatible with the datetime-local input
      const formattedDate = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
      setScheduledAt(formattedDate);
    }

    // When the modal opens, check if the user has a brand snapshot.
    if (isOpen && user) {
      setIsCheckingProfile(true);
      // Check for brand_snapshot directly in the user's metadata
      setHasBrandSnapshot(!!user.user_metadata?.brand_snapshot);
      setIsCheckingProfile(false);
    }
  }, [selectedDate, isOpen, user]);

  const handleGenerateContent = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const brandSnapshot = user.user_metadata?.brand_snapshot;
      if (!brandSnapshot) {
        throw new Error('Could not retrieve brand snapshot. Please ensure your profile is complete.');
      }

      const generatedCaption = await generateWithGemini({
        prompt: `Generate a social media post caption based on this brand snapshot: "${brandSnapshot}"`, contentType: 'social-media',
        tone: 'engaging',
      });

      setCaption(generatedCaption);
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate content.');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption || !scheduledAt || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('scheduled_posts').insert([
        {
          user_id: user.id,
          caption,
          scheduled_at: scheduledAt,
          status: 'scheduled',
        },
      ]);

      if (error) throw error;

      toast.success('Post scheduled successfully!');
      onPostScheduled(); // Callback to refresh the calendar
      onClose(); // Close the modal
    } catch (error: any) {
      toast.error(error.message || 'Failed to schedule post.');
    }
    setLoading(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Schedule a New Post
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <textarea
                    className="w-full h-32 p-2 border rounded"
                    placeholder="Enter your caption here..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                  <Input
                    label="Scheduled Date & Time"
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    required
                  />
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      onClick={handleGenerateContent}
                      loading={loading || isCheckingProfile}
                      disabled={!hasBrandSnapshot || isCheckingProfile}
                    >
                      Generate Content
                    </Button>
                    <div className="flex gap-2">
                      <Button type="button" onClick={onClose} variant="outline">
                        Cancel
                      </Button>
                      <Button type="submit" loading={loading} disabled={!caption}>
                        Save
                      </Button>
                    </div>
                  </div>
                  {!isCheckingProfile && !hasBrandSnapshot && (
                    <p className="text-sm text-red-600 mt-2">
                      To generate content, please complete your profile with your website URL.
                    </p>
                  )}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
