import { useState } from 'react';
import { Booking } from './Booking';
import { Dashboard } from '@/components/admin/Dashboard';

const Index = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleAdminLogin = () => {
    // Em um ambiente real, aqui seria feita a autenticação
    setIsAdminMode(true);
  };

  const handleAdminLogout = () => {
    setIsAdminMode(false);
  };

  if (isAdminMode) {
    return <Dashboard onLogout={handleAdminLogout} />;
  }

  return <Booking onAdminLogin={handleAdminLogin} />;
};

export default Index;
