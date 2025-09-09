import React, { useState, useEffect, Fragment } from 'react';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import { Event as BigCalendarEvent } from 'react-big-calendar';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabaseClient';
import { format } from 'date-fns';
import { ModernDropdown } from '../UI/ModernDropdown';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
  event: BigCalendarEvent | null;
  selectedDate: Date | null;
}

const platforms = ['LinkedIn', 'Instagram', 'Twitter', 'Facebook'];

export function EventModal({ isOpen, onClose, onSave, onDelete, event, selectedDate }: EventModalProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [start, setStart] = useState<Date | null>(null);
  const [platform, setPlatform] = useState<string>('LinkedIn');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setContent((event.resource as any)?.content || event.title || '');
      setStart(event.start || null);
      setPlatform((event.resource as any)?.platform || 'LinkedIn');
      setImageUrl((event.resource as any)?.image_url || null);
    } else if (selectedDate) {
      setContent('');
      setStart(selectedDate);
      setPlatform('LinkedIn');
      setImageUrl(null);
    }
  }, [event, selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !start || !content) return;

    setLoading(true);

    const eventData = {
      user_id: user.id,
      content: content,
      scheduled_at: start.toISOString(),
      status: 'scheduled',
      platform,
      image_url: imageUrl,
    };

    let error;

    if (event) {
      ({ error } = await supabase
        .from('scheduled_posts')
        .update(eventData)
        .eq('id', (event.resource as any).id));
    } else {
      ({ error } = await supabase.from('scheduled_posts').insert([eventData]));
    }

    if (error) {
      console.error('Error saving event:', error);
      toast.error(error.message);
    } else {
      toast.success(`Post ${event ? 'updated' : 'created'} successfully!`);
      onSave();
    }

    setLoading(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-30" />
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl">
            <Dialog.Title as="h3" className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {event ? 'Edit Post' : 'Create Post'}
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-6">
              <textarea
                className="w-full h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {imageUrl && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Image Preview</label>
                  <img src={imageUrl} alt="Scheduled post" className="w-full h-auto rounded-lg" />
                </div>
              )}
              <Input
                label="Date & Time"
                type="datetime-local"
                value={start ? format(start, "yyyy-MM-dd'T'HH:mm") : ''}
                onChange={(e) => setStart(new Date(e.target.value))}
                required
              />
              <ModernDropdown
                label="Platform"
                options={platforms}
                selected={platform}
                onChange={(value) => setPlatform(value)}
              />
              <div className="flex justify-end items-center space-x-4 pt-4">
                {event && (
                  <Button type="button" variant="danger" onClick={onDelete} loading={loading}>
                    Delete
                  </Button>
                )}
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" loading={loading}>
                  {event ? 'Save Changes' : 'Create Post'}
                </Button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}