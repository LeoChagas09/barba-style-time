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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <Card 
            key={service.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedService?.id === service.id 
                ? 'ring-2 ring-primary bg-accent/50' 
                : 'hover:bg-accent/20'
            }`}
            onClick={() => onSelectService(service)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{service.name}</CardTitle>
              {service.description && (
                <CardDescription>{service.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>R$ {service.price}</span>
                  </div>
                </div>
                {selectedService?.id === service.id && (
                  <Button size="sm" variant="premium">
                    Selecionado
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};