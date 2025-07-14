export interface Barber {
  id: string;
  name: string;
  specialty: string;
  avatar?: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number; // em minutos
  price: number;
  description?: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  barberId: string;
  serviceId: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface AdminSettings {
  workingDays: number[]; // 0-6 (domingo-sábado)
  startTime: string;
  endTime: string;
  breakTime?: {
    start: string;
    end: string;
  };
}