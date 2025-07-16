import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Booking } from './Booking';
import { Dashboard } from '@/components/admin/Dashboard';
import { WelcomeScreen } from '@/components/home/WelcomeScreen';
import { ConsultBooking } from '@/components/booking/ConsultBooking';
import { useAuth } from '@/hooks/useAuth';

type AppMode = 'welcome' | 'booking' | 'consult' | 'admin';

const Index = () => {
  const [mode, setMode] = useState<AppMode>('welcome');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClientBook = () => {
    setMode('booking');
  };

  const handleClientConsult = () => {
    setMode('consult');
  };

  useEffect(() => {
    // Check if we're on the admin route and user is logged in
    if (location.pathname === '/admin' && user) {
      setMode('admin');
    } else if (location.pathname === '/admin' && !user) {
      navigate('/auth');
    } else {
      setMode('welcome');
    }
  }, [location.pathname, user, navigate]);

  const handleAdminLogin = () => {
    navigate('/auth');
  };

  const handleAdminLogout = async () => {
    await signOut();
    navigate('/');
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
