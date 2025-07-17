import { Barber, Service, Appointment } from '@/types';

export const barbers: Barber[] = [
  {
    id: '1',
    name: 'Fernando Gomes',
    specialty: 'Cortes clássicos e modernos',
    avatar: 'https://media-gru1-2.cdn.whatsapp.net/v/t61.24694-24/491886646_30785610081038519_319260474686991272_n.jpg?ccb=11-4&oh=01_Q5Aa2AGDSquM1BcNgZ0qTO1qSCV6IHIx7FZJg0qCU5AVRVa4TQ&oe=68849F55&_nc_sid=5e03e0&_nc_cat=104'
  },
  {
    id: '2',
    name: 'Leonardo Chagas',
    specialty: 'Barbas e bigodes',
    avatar: 'https://media-gru1-2.cdn.whatsapp.net/v/t61.24694-24/408946755_814193623962330_5497489951670147482_n.jpg?ccb=11-4&oh=01_Q5Aa2AFQiOUgUzdvDVhppg8rKPKSWWA4fTE-NC3uRFxeKuaH2Q&oe=68849706&_nc_sid=5e03e0&_nc_cat=109'
  },
  {
    id: '3',
    name: 'Fernando Mendes',
    specialty: 'Cortou, raspou, ta novo!',
    avatar: 'https://media-gru1-2.cdn.whatsapp.net/v/t61.24694-24/516467817_1489697035524709_6724042363211930515_n.jpg?ccb=11-4&oh=01_Q5Aa2AFxxCy7fArRWXIrgMPPaOOicC_ZGV47tUTtAnqzd7so8Q&oe=6884B23F&_nc_sid=5e03e0&_nc_cat=110'
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
  
  const current = new Date(start);
  
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