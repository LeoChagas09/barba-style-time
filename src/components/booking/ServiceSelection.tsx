import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Service } from '@/types';
import { Clock, DollarSign } from 'lucide-react';

interface ServiceSelectionProps {
  services: Service[];
  selectedService: Service | null;
  onSelectService: (service: Service) => void;
}

export const ServiceSelection = ({ services, selectedService, onSelectService }: ServiceSelectionProps) => {
  // Função para formatar o preço em moeda brasileira
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Escolha seu serviço
        </h2>
        <p className="text-muted-foreground">
          Selecione o tipo de serviço desejado
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card 
            key={service.id} 
            className={`relative cursor-pointer transition-all duration-200 hover:shadow-md p-4 flex flex-col items-center justify-center ${
              selectedService?.id === service.id 
                ? 'ring-2 ring-primary bg-accent/50' 
                : 'hover:bg-accent/10'
            }`}
            onClick={() => onSelectService(service)}
          >
            {/* Check de selecionado */}
            {selectedService?.id === service.id && (
              <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
            )}
            <CardHeader className="pb-2 flex flex-col items-center justify-center">
              <CardTitle className="text-lg text-center font-bold mb-2">{service.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 flex flex-col items-center justify-center gap-1 w-full">
              <div className="flex items-center justify-center gap-2 w-full">
                <div className="flex flex-col items-center gap-0.5 bg-accent/20 rounded-md px-2 py-1 min-w-[70px]">
                  <Clock className="w-4 h-4 mb-0.5 text-primary" />
                  <span className="text-sm font-semibold">{service.duration} min</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 bg-accent/20 rounded-md px-2 py-1 min-w-[70px] max-w-[110px]">
                  <DollarSign className="w-4 h-4 mb-0.5 text-primary" />
                  <span className="text-sm font-semibold truncate text-center w-full" title={formatPrice(service.price)}>{formatPrice(service.price)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};