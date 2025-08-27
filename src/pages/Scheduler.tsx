import { ModernScheduler } from '../components/Scheduler/ModernScheduler';

export function Scheduler() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Content Scheduler
      </h1>
      <ModernScheduler />
    </div>
  );
}
