
// import React from 'react';
// import { EventProps } from 'react-big-calendar';

// export function EventItem({ event }: EventProps) {
//   return (
//     <div className="p-1 rounded-lg h-full flex flex-col justify-center">
//       <strong className="font-semibold text-sm truncate">{event.title}</strong>
//       {(event.resource as any)?.platform && (
//         <p className="text-xs mt-1 truncate">{(event.resource as any).platform}</p>
//       )}
//     </div>
//   );
// }
import React from 'react';
import { EventProps } from 'react-big-calendar';

export function EventItem({ event }: EventProps) {
  return (
    <div className="p-1 rounded-lg h-full flex flex-col justify-center">
      <strong className="font-semibold text-sm truncate">{event.title}</strong>
      {(event.resource as any)?.platform && (
        <p className="text-xs mt-1 truncate text-gray-500 dark:text-gray-300">
          {(event.resource as any).platform}
        </p>
      )}
    </div>
  );
}