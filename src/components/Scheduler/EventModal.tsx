import React, { useState, useEffect, Fragment } from 'react';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import { Event as BigCalendarEvent } from 'react-big-calendar';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { useAuth } from '../../hooks/useAuth';
// import { getMongoDb } from '../../lib/realm';
import { generateWithGemini } from '../../lib/gemini';
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasBrandSnapshot, setHasBrandSnapshot] = useState(true);

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

    // Check if user has brand snapshot when modal opens
    if (isOpen && user) {
      setHasBrandSnapshot(!!(user as any).user_metadata?.brand_snapshot);
    }
  }, [event, selectedDate, isOpen, user]);

  const handleGenerateContent = async () => {
    if (!user) return;

    setIsGenerating(true);
    try {
      console.log('EventModal: Starting content generation...');
      
      const brandSnapshot = (user as any).user_metadata?.brand_snapshot;
      if (!brandSnapshot) {
        throw new Error('Could not retrieve brand snapshot. Please ensure your profile is complete.');
      }

      console.log('EventModal: Brand snapshot found, generating content...');
      const generatedContent = await generateWithGemini({
        prompt: `Generate a social media post caption for ${platform} based on this brand snapshot: "${brandSnapshot}"`, 
        contentType: 'social-media',
        tone: 'engaging',
      });

      console.log('EventModal: Content generated successfully, length:', generatedContent.length);
      setContent(generatedContent);
      toast.success('Content generated successfully!');
    } catch (error: any) {
      console.error('EventModal: Content generation failed:', error);
      toast.error(error.message || 'Failed to generate content.');
    }
    setIsGenerating(false);
  };

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

    try {
      const apiBase = 'http://localhost:4000';
      if (event) {
        const resp = await fetch(`${apiBase}/api/scheduled-posts/${encodeURIComponent((event.resource as any).id)}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData)
        });
        if (!resp.ok) throw new Error(await resp.text());
      } else {
        const resp = await fetch(`${apiBase}/api/scheduled-posts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData)
        });
        if (!resp.ok) throw new Error(await resp.text());
      }
      toast.success(`Post ${event ? 'updated' : 'created'} successfully!`);
      onSave();
    } catch (e: any) {
      console.error('Error saving event:', e);
      toast.error(e?.message || 'Failed to save event');
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
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Post Content
                  </label>
                  {!event && hasBrandSnapshot && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleGenerateContent}
                      loading={isGenerating}
                      disabled={isGenerating}
                    >
                      {isGenerating ? 'Generating...' : 'Generate Content'}
                    </Button>
                  )}
                </div>
                <textarea
                  className="w-full h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter your post content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                {!hasBrandSnapshot && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Complete your profile to enable content generation.
                  </p>
                )}
              </div>
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
                  <Button type="button" variant="secondary" onClick={onDelete} loading={loading}>
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