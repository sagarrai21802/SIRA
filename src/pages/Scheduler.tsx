import { AttractiveScheduler } from '../components/Scheduler/AttractiveScheduler';

export function Scheduler() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2E6EE] via-[#FFCCF2] to-[#F2E6EE] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AttractiveScheduler />
      </div>
    </div>
  );
}
