import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ServiceSelection } from '@/components/booking/ServiceSelection';
import { BarberSelection } from '@/components/booking/BarberSelection';
import { DateTimeSelection } from '@/components/booking/DateTimeSelection';
import { ClientForm } from '@/components/booking/ClientForm';
import { ConfirmationScreen } from '@/components/booking/ConfirmationScreen';
import { Header } from '@/components/layout/Header';
import { services, barbers } from '@/data/mockData';
import { Service, Barber } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const steps = [
  { id: 1, title: 'Serviço', description: 'Escolha o tipo de serviço' },
  { id: 2, title: 'Barbeiro', description: 'Selecione o profissional' },
  { id: 3, title: 'Data/Hora', description: 'Quando deseja ser atendido' },
  { id: 4, title: 'Dados', description: 'Suas informações' },
  { id: 5, title: 'Confirmação', description: 'Revisar e confirmar' }
];

interface BookingProps {
  onAdminLogin: () => void;
}

export const Booking = ({ onAdminLogin }: BookingProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientData, setClientData] = useState<{ name: string; phone: string } | null>(null);

  const progress = (currentStep / steps.length) * 100;

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1: return !!selectedService;
      case 2: return !!selectedBarber;
      case 3: return !!selectedDate && !!selectedTime;
      case 4: return !!clientData;
      default: return false;
    }
  };

  const handleNext = () => {
    if (canProceedToNext() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClientFormSubmit = (data: { name: string; phone: string }) => {
    setClientData(data);
    setCurrentStep(5);
  };

  const handleNewBooking = () => {
    setCurrentStep(1);
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setClientData(null);
  };

  if (currentStep === 5 && selectedService && selectedBarber && selectedDate && selectedTime && clientData) {
    return (
      <>
        <Header onLoginClick={onAdminLogin} />
        <main className="min-h-screen bg-gradient-dark pt-8 pb-16">
          <div className="container mx-auto px-4">
            <ConfirmationScreen
              barber={selectedBarber}
              service={selectedService}
              date={selectedDate}
              time={selectedTime}
              clientName={clientData.name}
              clientPhone={clientData.phone}
              onNewBooking={handleNewBooking}
            />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header onLoginClick={onAdminLogin} />
      <main className="min-h-screen bg-gradient-dark">
        {/* Header do processo */}
        <div className="bg-background border-b border-border py-6">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-foreground">
                  {steps[currentStep - 1].title}
                </h1>
                <span className="text-sm text-muted-foreground">
                  Passo {currentStep} de {steps.length}
                </span>
              </div>
              
              <Progress value={progress} className="h-2 mb-4" />
              
              <p className="text-muted-foreground">
                {steps[currentStep - 1].description}
              </p>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-background rounded-lg shadow-elegant p-6 animate-fade-in">
              {currentStep === 1 && (
                <ServiceSelection
                  services={services}
                  selectedService={selectedService}
                  onSelectService={setSelectedService}
                />
              )}

              {currentStep === 2 && (
                <BarberSelection
                  barbers={barbers}
                  selectedBarber={selectedBarber}
                  onSelectBarber={setSelectedBarber}
                />
              )}

              {currentStep === 3 && selectedService && (
                <DateTimeSelection
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  serviceDuration={selectedService.duration}
                  onSelectDate={setSelectedDate}
                  onSelectTime={setSelectedTime}
                />
              )}

              {currentStep === 4 && (
                <ClientForm onSubmit={handleClientFormSubmit} />
              )}
            </div>

            {/* Navegação */}
            {currentStep < 5 && (
              <div className="flex justify-between items-center mt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </Button>

                <Button
                  variant="premium"
                  onClick={currentStep === 4 ? undefined : handleNext}
                  disabled={!canProceedToNext()}
                  className="flex items-center gap-2"
                  type={currentStep === 4 ? "submit" : "button"}
                >
                  {currentStep === 4 ? 'Confirmar agendamento' : 'Próximo'}
                  {currentStep !== 4 && <ChevronRight className="w-4 h-4" />}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};