import { BeautifulCalendar } from './BeautifulCalendar';

interface MiniCalendarProps {
  className?: string;
}

export function MiniCalendar({ className = '' }: MiniCalendarProps) {
  return <BeautifulCalendar className={className} isMini={true} />;
}