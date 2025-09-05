
// import React from 'react';
// import { Navigate, View } from 'react-big-calendar';
// import { Button } from '../UI/Button';

// interface CalendarToolbarProps {
//   label: string;
//   view: View;
//   views: View[];
//   onNavigate: (navigate: Navigate) => void;
//   onView: (view: View) => void;
// }

// export function CalendarToolbar({ label, view, views, onNavigate, onView }: CalendarToolbarProps) {
//   return (
//     <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-t-lg">
//       <div className="flex items-center space-x-2 mb-4 sm:mb-0">
//         <Button onClick={() => onNavigate(Navigate.PREVIOUS)}>&lt;</Button>
//         <Button onClick={() => onNavigate(Navigate.TODAY)}>Today</Button>
//         <Button onClick={() => onNavigate(Navigate.NEXT)}>&gt;</Button>
//       </div>
//       <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4 sm:mb-0">
//         {label}
//       </h2>
//       <div className="flex items-center space-x-2">
//         {(views as string[]).map((viewName) => (
//           <Button
//             key={viewName}
//             onClick={() => onView(viewName as View)}
//             variant={view === viewName ? 'solid' : 'outline'}
//             className="capitalize"
//           >
//             {viewName}
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { Navigate, View } from 'react-big-calendar';
import { Button } from '../UI/Button';

interface CalendarToolbarProps {
  label: string;
  view: View;
  views: View[];
  onNavigate: (navigate: Navigate) => void;
  onView: (view: View) => void;
}

export function CalendarToolbar({ label, view, views, onNavigate, onView }: CalendarToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-t-lg">
      <div className="flex items-center space-x-2 mb-4 sm:mb-0">
        <Button onClick={() => onNavigate(Navigate.PREVIOUS)}>&lt;</Button>
        <Button onClick={() => onNavigate(Navigate.TODAY)}>Today</Button>
        <Button onClick={() => onNavigate(Navigate.NEXT)}>&gt;</Button>
      </div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4 sm:mb-0">
        {label}
      </h2>
      <div className="flex items-center space-x-2">
        {(views as string[]).map((viewName) => (
          <Button
            key={viewName}
            onClick={() => onView(viewName as View)}
            variant={view === viewName ? 'solid' : 'outline'}
            className="capitalize"
          >
            {viewName}
          </Button>
        ))}
      </div>
    </div>
  );
}