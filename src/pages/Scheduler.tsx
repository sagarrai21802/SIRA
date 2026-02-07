import { motion } from 'framer-motion';
import { AttractiveScheduler } from '../components/Scheduler/AttractiveScheduler';
import { Calendar, Clock, Sparkles } from 'lucide-react';

export function Scheduler() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Content Scheduler
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Plan and schedule your social media content
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex-shrink-0">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Schedule Your Content
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Drag and drop posts to reschedule, or click on any date to create new content. 
                Your scheduled posts will be automatically published at the specified time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Scheduler Component Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden"
        >
          <AttractiveScheduler />
        </motion.div>
      </div>
    </div>
  );
}
