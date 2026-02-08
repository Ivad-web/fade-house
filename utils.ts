
import { BUSINESS_HOURS } from './constants';

export const generateTimeSlots = (dateString: string): string[] => {
  const date = new Date(dateString + 'T00:00:00');
  const day = date.getDay(); // 0: Sunday, 1-5: Mon-Fri, 6: Sat
  
  let hours = BUSINESS_HOURS.WEEKDAYS;
  if (day === 0) return []; // Sunday
  if (day === 6) hours = BUSINESS_HOURS.SATURDAY;

  const slots: string[] = [];
  const [startHour, startMin] = hours.start.split(':').map(Number);
  const [endHour, endMin] = hours.end.split(':').map(Number);

  let current = new Date();
  current.setHours(startHour, startMin, 0, 0);
  
  const end = new Date();
  end.setHours(endHour, endMin, 0, 0);

  while (current < end) {
    const hh = current.getHours().toString().padStart(2, '0');
    const mm = current.getMinutes().toString().padStart(2, '0');
    slots.push(`${hh}:${mm}`);
    current.setMinutes(current.getMinutes() + 30);
  }

  return slots;
};

export const formatDateBR = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

export const isToday = (dateString: string) => {
  const today = new Date().toISOString().split('T')[0];
  return dateString === today;
};
