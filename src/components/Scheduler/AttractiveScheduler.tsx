import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useSchedulerNotifications } from '../../hooks/useSchedulerNotifications';
import { BeautifulCalendar } from './BeautifulCalendar';
import { Button } from '../UI/Button';
import { Plus } from 'lucide-react';

export function AttractiveScheduler() {
   const { user } = useAuth();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

   useSchedulerNotifications();

   const handleEventSave = () => {
     setIsModalOpen(false);
     // Refresh will be handled by BeautifulCalendar
   };

  return (
    <div className="relative z-0 p-4 sm:p-6 lg:p-8">
      {/* Header with View Toggle */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Content Scheduler
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Plan and manage your social media content
            </p>
          </div>
          <div className="flex items-center justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[#0033FF] to-[#977DFF] hover:from-[#0600AF] hover:to-[#0033FF] text-white border-none"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>
      </div>

            {/* Calendar Content */}
            <BeautifulCalendar className="w-full" isMini={false} />

    </div>
  );
}
