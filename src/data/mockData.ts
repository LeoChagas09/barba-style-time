import { Barber, Service, Appointment } from '@/types';

export const barbers: Barber[] = [
  {
    id: '1',
    name: 'Fernando Gomes',
    specialty: 'Cortes clássicos e modernos',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'João Silva',
    specialty: 'Barbas e bigodes',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Carlos Santos',
    specialty: 'Cortes infantis',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
  }
];

export const services: Service[] = [
  {
    id: '1',
    name: 'Corte Simples',
    duration: 30,
    price: 25,
    description: 'Corte básico com máquina e tesoura'
  },
  {
    id: '2',
    name: 'Corte + Barba',
    duration: 45,
    price: 35,
    description: 'Corte completo com aparação de barba'
  },
  {
    id: '3',
    name: 'Corte Premium',
    duration: 60,
    price: 50,
    description: 'Corte, barba, sobrancelha e hot towel'
  },
  {
    id: '4',
    name: 'Barba',
    duration: 20,
    price: 15,
    description: 'Aparação e modelagem de barba'
  },
  {
    id: '5',
    name: 'Corte Infantil',
    duration: 25,
    price: 20,
    description: 'Corte especial para crianças até 12 anos'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    barberId: '1',
    serviceId: '2',
    date: '2024-01-15',
    time: '09:00',
    clientName: 'João Silva',
    clientPhone: '(11) 99999-9999',
    status: 'completed',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    barberId: '2',
    serviceId: '1',
    date: '2024-01-15',
    time: '10:30',
    clientName: 'Pedro Santos',
    clientPhone: '(11) 88888-8888',
    status: 'completed',
    createdAt: new Date('2024-01-15')
  }
];

export const generateTimeSlots = (startTime: string, endTime: string, duration: number, breakTime?: { start: string; end: string }): string[] => {
  const slots: string[] = [];
  const start = new Date(`2024-01-01 ${startTime}`);
  const end = new Date(`2024-01-01 ${endTime}`);
  
  let current = new Date(start);
  
  while (current < end) {
    const timeString = current.toTimeString().slice(0, 5);
    
    // Verifica se não é horário de pausa
    if (breakTime) {
      const isBreakTime = timeString >= breakTime.start && timeString < breakTime.end;
      if (!isBreakTime) {
        slots.push(timeString);
      }
    } else {
      slots.push(timeString);
    }
    
    current.setMinutes(current.getMinutes() + duration);
  }
  
  return slots;
};