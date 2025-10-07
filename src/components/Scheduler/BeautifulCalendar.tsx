import { useState, useEffect, useCallback } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay, isToday, parseISO } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, Users, Star } from 'lucide-react';
import { Button } from '../UI/Button';
import { Link } from 'react-router-dom';
import { EventModal } from './EventModal';

interface ScheduledPost {
  id: string;
  content: string;
  image_url?: string;
  scheduled_at: string;
  status: string;
  platform?: string;
}

interface BeautifulCalendarProps {
  className?: string;
  isMini?: boolean;
}

export function BeautifulCalendar({ className = '', isMini = false }: BeautifulCalendarProps) {
   const { user } = useAuth();
   const [currentDate, setCurrentDate] = useState(new Date());
   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
   const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);

  const fetchScheduledPosts = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
      const token = localStorage.getItem('auth_token');
      const resp = await fetch(`${apiBase}/api/scheduled-posts?user_id=${encodeURIComponent(user.id)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      setScheduledPosts(data.items || []);
    } catch (e) {
      console.error('Error fetching scheduled posts:', e);
      setError('Failed to load scheduled posts');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchScheduledPosts();
    }
  }, [user, fetchScheduledPosts]);

  const handlePostClick = (post: ScheduledPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleEventSave = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    fetchScheduledPosts();
  };

  const handleEventDelete = async () => {
    if (!selectedPost) return;
    try {
      const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
      const token = localStorage.getItem('auth_token');
      const resp = await fetch(`${apiBase}/api/scheduled-posts/${encodeURIComponent(selectedPost.id)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!resp.ok) throw new Error(await resp.text());
      setIsModalOpen(false);
      setSelectedPost(null);
      fetchScheduledPosts();
    } catch (e) {
      console.error('Error deleting post:', e);
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];

  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const dayPosts = scheduledPosts.filter(post => 
        isSameDay(parseISO(post.scheduled_at), day)
      );
      
      days.push(
        <div
          key={day.toString()}
          className={`
            relative min-h-[${isMini ? '60px' : '80px'}] p-2 border-r border-b border-gray-200 dark:border-gray-700
            ${!isSameMonth(day, monthStart) ? 'bg-gray-50 dark:bg-gray-800 text-gray-400' : 'bg-white dark:bg-gray-900'}
            ${isToday(day) ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20' : ''}
            ${selectedDate && isSameDay(day, selectedDate) ? 'bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30' : ''}
            hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-700
            transition-all duration-200 cursor-pointer group
          `}
          onClick={() => setSelectedDate(day)}
        >
          <div className="flex flex-col h-full">
            {/* Date Number */}
            <div className={`
              text-sm font-semibold mb-1
              ${isToday(day) ? 'text-blue-600 dark:text-blue-400' : ''}
              ${selectedDate && isSameDay(day, selectedDate) ? 'text-purple-600 dark:text-purple-400' : ''}
              ${!isSameMonth(day, monthStart) ? 'text-gray-400' : 'text-gray-700 dark:text-gray-300'}
            `}>
              {format(day, dateFormat)}
            </div>

            {/* Event Indicators */}
            <div className="flex-1 flex flex-col gap-1">
              {dayPosts.slice(0, isMini ? 2 : 3).map((post, index) => (
                <div
                  key={index}
                  className={`
                    text-xs px-2 py-1 rounded-full truncate cursor-pointer
                    ${index === 0 ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : ''}
                    ${index === 1 ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white' : ''}
                    ${index === 2 ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' : ''}
                    shadow-sm hover:shadow-md transition-shadow
                  `}
                  title={post.content}
                  onClick={() => handlePostClick(post)}
                >
                  {post.content.length > (isMini ? 8 : 12) ? `${post.content.substring(0, isMini ? 8 : 12)}...` : post.content}
                </div>
              ))}
              {dayPosts.length > (isMini ? 2 : 3) && (
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  +{dayPosts.length - (isMini ? 2 : 3)} more
                </div>
              )}
            </div>
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toString()} className="grid grid-cols-7">
        {days}
      </div>
    );
    days = [];
  }

  const getPostsForDay = (day: Date) => {
    return scheduledPosts.filter(post => isSameDay(parseISO(post.scheduled_at), day));
  };

  const getUpcomingPosts = () => {
    const now = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() + 7);

    return scheduledPosts.filter(post => {
      const postDate = parseISO(post.scheduled_at);
      return postDate >= now && postDate <= sevenDaysLater;
    }).sort((a, b) => parseISO(a.scheduled_at).getTime() - parseISO(b.scheduled_at).getTime())
      .slice(0, isMini ? 3 : 5);
  };

  const upcomingPosts = getUpcomingPosts();

  return (
    <div className={`beautiful-calendar ${className} ${isMini ? 'mini-version' : ''}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Scheduled Posts</h3>
              <p className="text-purple-100 text-sm">
                {format(currentDate, 'MMMM yyyy')}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Link to="/scheduler" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Post</span>
            </Link>
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="text-white hover:bg-white/20 p-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="text-white hover:bg-white/20 p-2"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-b-xl shadow-lg overflow-hidden">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="min-h-[400px]">
          {rows}
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && !isMini && (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h4>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{getPostsForDay(selectedDate).length} posts scheduled</span>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-24">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-500 dark:text-red-400">{error}</div>
          ) : (
            <>
              {getPostsForDay(selectedDate).length > 0 ? (
                <div className="space-y-3">
                  {getPostsForDay(selectedDate).map((post, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700"
                    >
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {post.content}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {format(parseISO(post.scheduled_at), 'h:mm a')}
                          </span>
                          {post.platform && (
                            <>
                              <span className="text-xs text-gray-300">•</span>
                              <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                                {post.platform}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 mb-3">No posts scheduled for this day</p>
                  <Button variant="outline" size="sm" asChild className="border-purple-300 hover:bg-purple-50">
                    <Link to="/scheduler">Schedule a Post</Link>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Upcoming Posts */}
      {upcomingPosts.length > 0 && (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Upcoming This Week
            </h4>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Users className="w-4 h-4" />
              <span>{upcomingPosts.length} posts</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {upcomingPosts.map((post, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 hover:shadow-md transition-shadow"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {post.content}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {format(parseISO(post.scheduled_at), 'MMM d, h:mm a')}
                    </span>
                    {post.platform && (
                      <>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                          {post.platform}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {scheduledPosts.length === 0 && !loading && !error && (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
          <CalendarIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No scheduled posts yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start scheduling your content to see it appear on the calendar
          </p>
          <Button variant="primary" size="lg" asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Link to="/scheduler" className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Schedule Your First Post</span>
            </Link>
          </Button>
        </div>
      )}

      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPost(null);
        }}
        onSave={handleEventSave}
        onDelete={handleEventDelete}
        event={selectedPost ? {
          title: selectedPost.content,
          start: new Date(selectedPost.scheduled_at),
          end: new Date(selectedPost.scheduled_at),
          resource: selectedPost
        } : null}
        selectedDate={null}
      />
    </div>
  );
}
