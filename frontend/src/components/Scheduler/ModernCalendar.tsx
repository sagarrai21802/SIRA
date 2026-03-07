import React, { useState, useEffect, useCallback } from 'react';
import { DayPicker, DateRange, SelectSingleEventHandler } from 'react-day-picker';
import { format, startOfWeek, endOfWeek, isSameDay, isToday, isWithinInterval } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Button } from '../UI/Button';
import { Link } from 'react-router-dom';
import 'react-day-picker/dist/style.css';

interface ScheduledPost {
  id: string;
  content: string;
  image_url?: string;
  scheduled_at: string;
  status: string;
  platform?: string;
}

interface ModernCalendarProps {
  className?: string;
  isMini?: boolean;
}

export function ModernCalendar({ className = '', isMini = false }: ModernCalendarProps) {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScheduledPosts = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
      const resp = await fetch(`${apiBase}/api/scheduled-posts?user_id=${encodeURIComponent(user.id)}`);
      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      setEvents(data.items || []);
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

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.scheduled_at);
      return isSameDay(eventDate, date);
    });
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    return events.filter(event => {
      const eventDate = new Date(event.scheduled_at);
      return eventDate >= today && eventDate <= nextWeek;
    }).slice(0, isMini ? 3 : 5);
  };

  const upcomingEvents = getUpcomingEvents();

  const modifiers = {
    today: new Date(),
    hasEvents: events.map(event => new Date(event.scheduled_at)),
    selected: selectedDate,
  };

  const modifiersClassNames = {
    today: 'today-modifier',
    hasEvents: 'has-events-modifier',
    selected: 'selected-modifier',
  };

  const modifiersStyles = {
    today: {
      background: 'linear-gradient(135deg, #0033FF 0%, #977DFF 100%)',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '8px',
    },
    hasEvents: {
      background: 'linear-gradient(135deg, #F2E6EE 0%, #FFCCF2 100%)',
      border: '2px solid #977DFF',
      borderRadius: '8px',
    },
    selected: {
      background: 'linear-gradient(135deg, #977DFF 0%, #0033FF 100%)',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '8px',
    },
  };

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-[#0033FF]/20 dark:border-[#0033FF]/30 ${className}`}>
        <div className="p-4">
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0033FF]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-[#0033FF]/20 dark:border-[#0033FF]/30 ${className}`}>
        <div className="p-4">
          <div className="text-center py-8">
            <CalendarIcon className="w-12 h-12 text-[#0033FF]/60 mx-auto mb-3" />
            <p className="text-sm text-red-500 dark:text-red-400 mb-3">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchScheduledPosts} className="border-[#0033FF]/30 hover:bg-[#0033FF]/10">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-[#0033FF]/20 dark:border-[#0033FF]/30 ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isMini ? 'Scheduled Posts' : 'Content Calendar'}
          </h3>
          <Button variant="outline" size="sm" asChild className="border-[#0033FF]/30 hover:bg-[#0033FF]/10">
            <Link to="/scheduler" className="flex items-center space-x-1">
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </Link>
          </Button>
        </div>

        {/* Calendar */}
        <div className="mb-4">
          <style jsx global>{`
            .rdp {
              --rdp-cell-size: ${isMini ? '32px' : '40px'};
              --rdp-accent-color: #0033FF;
              --rdp-background-color: #F2E6EE;
              --rdp-outline: 2px solid #977DFF;
              --rdp-outline-selected: 2px solid #0033FF;
              margin: 0;
            }
            
            .rdp-day {
              border-radius: 8px;
              transition: all 0.2s ease;
              position: relative;
            }
            
            .rdp-day:hover {
              transform: scale(1.05);
              box-shadow: 0 4px 12px rgba(0, 51, 255, 0.2);
            }
            
            .rdp-day_selected {
              background: linear-gradient(135deg, #977DFF 0%, #0033FF 100%) !important;
              color: white !important;
              font-weight: bold;
            }
            
            .rdp-day_today {
              background: linear-gradient(135deg, #0033FF 0%, #977DFF 100%) !important;
              color: white !important;
              font-weight: bold;
            }
            
            .has-events-modifier {
              background: linear-gradient(135deg, #F2E6EE 0%, #FFCCF2 100%) !important;
              border: 2px solid #977DFF !important;
              position: relative;
            }
            
            .has-events-modifier::after {
              content: '';
              position: absolute;
              bottom: 2px;
              left: 50%;
              transform: translateX(-50%);
              width: 4px;
              height: 4px;
              background: #0033FF;
              border-radius: 50%;
            }
            
            .rdp-caption {
              background: linear-gradient(135deg, #0033FF 0%, #977DFF 100%);
              color: white;
              padding: 12px;
              border-radius: 8px;
              margin-bottom: 8px;
            }
            
            .rdp-caption_label {
              font-weight: bold;
              font-size: 16px;
            }
            
            .rdp-nav {
              background: rgba(255, 255, 255, 0.2);
              border-radius: 6px;
              padding: 4px;
            }
            
            .rdp-nav_button {
              background: transparent;
              border: none;
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              transition: all 0.2s ease;
            }
            
            .rdp-nav_button:hover {
              background: rgba(255, 255, 255, 0.3);
            }
            
            .rdp-head_cell {
              color: #0600AF;
              font-weight: bold;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .rdp-weekday {
              color: #0600AB;
              font-weight: 600;
            }
          `}</style>
          
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate as SelectSingleEventHandler}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            modifiersStyles={modifiersStyles}
            showOutsideDays
            className="w-full"
            classNames={{
              months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
              month: 'space-y-4',
              caption: 'flex justify-center pt-1 relative items-center',
              caption_label: 'text-sm font-medium',
              nav: 'space-x-1 flex items-center',
              nav_button: 'h-7 w-7 bg-transparent hover:bg-opacity-100 p-0 rounded-md',
              nav_button_previous: 'absolute left-1',
              nav_button_next: 'absolute right-1',
              table: 'w-full border-collapse space-y-1',
              head_row: 'flex',
              head_cell: 'text-gray-500 rounded-md w-9 font-normal text-[0.8rem]',
              row: 'flex w-full mt-2',
              cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
              day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
              day_selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
              day_today: 'bg-accent text-accent-foreground',
              day_outside: 'text-muted-foreground opacity-50',
              day_disabled: 'text-muted-foreground opacity-50',
              day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
              day_hidden: 'invisible',
            }}
          />
        </div>

        {/* Selected Date Events */}
        {selectedDate && (
          <div className="mb-4 p-3 bg-gradient-to-r from-[#F2E6EE] to-[#FFCCF2] rounded-lg border border-[#977DFF]/20">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              {format(selectedDate, 'EEEE, MMMM do, yyyy')}
            </h4>
            {getEventsForDate(selectedDate).length > 0 ? (
              <div className="space-y-2">
                {getEventsForDate(selectedDate).map((event, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-700 rounded-md">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#0033FF] to-[#977DFF]"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {event.content.length > 30 ? event.content.substring(0, 30) + '...' : event.content}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{format(new Date(event.scheduled_at), 'h:mm a')}</span>
                        {event.platform && (
                          <>
                            <span>•</span>
                            <span>{event.platform}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No posts scheduled for this date</p>
            )}
          </div>
        )}

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="border-t border-[#0033FF]/20 dark:border-[#0033FF]/30 pt-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Upcoming This Week
            </h4>
            <div className="space-y-2">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-2 rounded-lg bg-[#F2E6EE]/50 dark:bg-[#0033FF]/10 hover:bg-[#F2E6EE] dark:hover:bg-[#0033FF]/20 transition-colors border border-[#0033FF]/10"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#0033FF] to-[#977DFF]"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {event.content.length > 30 ? event.content.substring(0, 30) + '...' : event.content}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(event.scheduled_at), 'MMM dd, h:mm a')}
                      {event.platform && ` • ${event.platform}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {events.length === 0 && !loading && !error && (
          <div className="text-center py-8">
            <CalendarIcon className="w-12 h-12 text-[#0033FF]/60 mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              No scheduled posts yet
            </p>
            <Button variant="outline" size="sm" asChild className="border-[#0033FF]/30 hover:bg-[#0033FF]/10">
              <Link to="/scheduler">Schedule Your First Post</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
