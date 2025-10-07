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
      const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
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
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-3xl bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 p-4 text-left align-middle shadow-2xl ring-1 ring-black ring-opacity-5">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="rounded-full bg-gray-100 dark:bg-gray-700 p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <Dialog.Title as="h3" className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {event ? 'Edit Post' : 'New Post'}
                      </Dialog.Title>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {event ? 'Update details' : 'Schedule content'}
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Post Content */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
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
                              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              {isGenerating ? 'Generating...' : '✨ Generate'}
                            </Button>
                          )}
                        </div>
                        <textarea
                          className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                          placeholder="Write your engaging social media post here..."
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          required
                        />
                        {!hasBrandSnapshot && (
                          <p className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg mt-3">
                            ⚠️ Complete your profile to enable AI content generation.
                          </p>
                        )}
                      </div>

                      {/* Image Preview */}
                      {imageUrl && (
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Image Preview</label>
                          <div className="relative">
                            <img src={imageUrl} alt="Scheduled post" className="w-full h-48 object-contain rounded-xl shadow-lg bg-gray-100 dark:bg-gray-700" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Settings */}
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Post Settings</h4>

                        <div className="space-y-4">
                          <div>
                            <Input
                              label="Schedule Date & Time"
                              type="datetime-local"
                              value={start ? format(start, "yyyy-MM-dd'T'HH:mm") : ''}
                              onChange={(e) => setStart(new Date(e.target.value))}
                              required
                              className="w-full"
                            />
                          </div>

                          <div>
                            <ModernDropdown
                              label="Platform"
                              options={platforms}
                              selected={platform}
                              onChange={(value) => setPlatform(value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                        <div className="space-y-3">
                          {event && (
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={onDelete}
                              loading={loading}
                              className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30"
                            >
                              🗑️ Delete Post
                            </Button>
                          )}

                          <div className="flex space-x-3">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={onClose}
                              className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              loading={loading}
                              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                            >
                              {event ? '💾 Save' : '📅 Schedule'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
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