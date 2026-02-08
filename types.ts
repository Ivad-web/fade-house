
export interface Service {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  serviceId: string;
  createdAt: number;
}

export type ViewState = 'home' | 'booking' | 'admin';
