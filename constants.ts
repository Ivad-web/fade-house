
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'corte',
    name: 'Corte Social/Fade',
    price: 50,
    durationMinutes: 30,
    description: 'Corte moderno com acabamento impecável.'
  },
  {
    id: 'barba',
    name: 'Barba Terapia',
    price: 35,
    durationMinutes: 30,
    description: 'Modelagem de barba com toalha quente e óleos essenciais.'
  },
  {
    id: 'combo',
    name: 'Corte + Barba',
    price: 75,
    durationMinutes: 60,
    description: 'O pacote completo para renovar seu visual.'
  }
];

export const BUSINESS_HOURS = {
  WEEKDAYS: { start: '09:00', end: '18:00' },
  SATURDAY: { start: '07:00', end: '12:00' },
  SUNDAY: null // Closed
};

export const WHATSAPP_NUMBER = "5511999999999";
export const WHATSAPP_MESSAGE = "Olá, gostaria de agendar um horário na Fade House!";
