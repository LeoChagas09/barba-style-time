import { useState } from 'react';
import { Booking } from './Booking';
import { Dashboard } from '@/components/admin/Dashboard';
import { WelcomeScreen } from '@/components/home/WelcomeScreen';
import { ConsultBooking } from '@/components/booking/ConsultBooking';

type AppMode = 'welcome' | 'booking' | 'consult' | 'admin';

const Index = () => {
  const [mode, setMode] = useState<AppMode>('welcome');

  const handleClientBook = () => {
    setMode('booking');
  };

  const handleClientConsult = () => {
    setMode('consult');
  };

  const handleAdminLogin = () => {
    // Em um ambiente real, aqui seria feita a autenticação
    setMode('admin');
  };

  const handleAdminLogout = () => {
    setMode('welcome');
  };

  const handleBackToWelcome = () => {
    setMode('welcome');
  };

  if (mode === 'admin') {
    return <Dashboard onLogout={handleAdminLogout} />;
  }

  if (mode === 'booking') {
    return <Booking onAdminLogin={handleAdminLogin} onBack={handleBackToWelcome} />;
  }

  if (mode === 'consult') {
    return <ConsultBooking onBack={handleBackToWelcome} />;
  }

  return (
    <WelcomeScreen 
      onClientBook={handleClientBook}
      onClientConsult={handleClientConsult}
      onAdminLogin={handleAdminLogin}
    />
  );
};

export default Index;
