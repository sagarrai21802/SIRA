
// import React, { useState, useEffect, Fragment } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
// import { Event as BigCalendarEvent } from 'react-big-calendar';
// import { Button } from '../UI/Button';
// import { Input } from '../UI/Input';
// import { useAuth } from '../../hooks/useAuth';
// import { supabase } from '../../lib/supabaseClient';

// interface EventModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: () => void;
//   onDelete: () => void;
//   event: BigCalendarEvent | null;
//   selectedDate: Date | null;
// }

// import { format } from 'date-fns';

// export function EventModal({ isOpen, onClose, onSave, onDelete, event, selectedDate }: EventModalProps) {
//   const { user } = useAuth();
//   const [title, setTitle] = useState('');
//   const [start, setStart] = useState<Date | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (event) {
//       setTitle(event.title || '');
//       setStart(event.start || null);
//     } else if (selectedDate) {
//       setTitle('');
//       setStart(selectedDate);
//     }
//   }, [event, selectedDate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user || !start || !title) return;

//     setLoading(true);

//     const eventData = {
//       user_id: user.id,
//       caption: title,
//       scheduled_at: start.toISOString(),
//       status: 'scheduled',
//     };

//     let error;

//     if (event) {
//       ({ error } = await supabase
//         .from('scheduled_posts', { schema: 'public' })
//         .update(eventData)
//         .eq('id', (event.resource as any).id));
//     } else {
//       ({ error } = await supabase.from('scheduled_posts', { schema: 'public' }).insert([eventData]));
//     }

//     if (error) {
//       console.error('Error saving event:', error);
//     } else {
//       onSave();
//     }

//     setLoading(false);
//   };

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-20" onClose={onClose}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black bg-opacity-30" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
//                 <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-gray-900 dark:text-white mb-4">
//                   {event ? 'Edit Task' : 'Create Task'}
//                 </Dialog.Title>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <Input
//                     label="Task"
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     placeholder="What is your task?"
//                     required
//                   />
//                   <Input
//                     label="Date & Time"
//                     type="datetime-local"
//                     value={start ? format(start, "yyyy-MM-dd'T'HH:mm") : ''}
//                     onChange={(e) => setStart(new Date(e.target.value))}
//                     required
//                   />
//                   <div className="flex justify-end items-center space-x-4 pt-4">
//                     {event && (
//                       <Button type="button" variant="danger" onClick={onDelete} loading={loading}>
//                         Delete
//                       </Button>
//                     )}
//                     <Button type="button" variant="outline" onClick={onClose}>
//                       Cancel
//                     </Button>
//                     <Button type="submit" loading={loading}>
//                       {event ? 'Save Changes' : 'Create Task'}
//                     </Button>
//                   </div>
//                 </form>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }
import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Event as BigCalendarEvent } from 'react-big-calendar';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabaseClient';
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
  const [title, setTitle] = useState('');
  const [start, setStart] = useState<Date | null>(null);
  const [platform, setPlatform] = useState<string>('LinkedIn');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setStart(event.start || null);
      setPlatform((event.resource as any)?.platform || 'LinkedIn');
    } else if (selectedDate) {
      setTitle('');
      setStart(selectedDate);
      setPlatform('LinkedIn');
    }
  }, [event, selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !start || !title) return;

    setLoading(true);

    const eventData = {
      user_id: user.id,
      caption: title,
      scheduled_at: start.toISOString(),
      status: 'scheduled',
      platform,
    };

    let error;

    if (event) {
      ({ error } = await supabase
        .from('scheduled_posts')
        .update(eventData)
        .eq('id', (event.resource as any).id));
    } else {
      ({ error } = await supabase.from('scheduled_posts').insert([eventData]));
    }

    if (error) {
      console.error('Error saving event:', error);
    } else {
      onSave();
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
              {event ? 'Edit Task' : 'Create Task'}
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Task"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What is your task?"
                required
              />
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
                  <Button type="button" variant="danger" onClick={onDelete} loading={loading}>
                    Delete
                  </Button>
                )}
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" loading={loading}>
                  {event ? 'Save Changes' : 'Create Task'}
                </Button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}