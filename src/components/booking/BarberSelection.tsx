import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Barber } from '@/types';
import { User } from 'lucide-react';

interface BarberSelectionProps {
  barbers: Barber[];
  selectedBarber: Barber | null;
  onSelectBarber: (barber: Barber) => void;
}

export const BarberSelection = ({ barbers, selectedBarber, onSelectBarber }: BarberSelectionProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Escolha seu barbeiro
        </h2>
        <p className="text-muted-foreground">
          Selecione o profissional de sua preferência
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {barbers.map((barber) => (
          <Card 
            key={barber.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedBarber?.id === barber.id 
                ? 'ring-2 ring-primary bg-accent/50' 
                : 'hover:bg-accent/20'
            }`}
            onClick={() => onSelectBarber(barber)}
          >
            <CardHeader className="text-center pb-3">
              <div className="flex justify-center mb-3">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={barber.avatar} alt={barber.name} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    <User className="w-8 h-8" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-lg">{barber.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                {barber.specialty}
              </p>
              {selectedBarber?.id === barber.id && (
                <Button size="sm" variant="premium" className="w-full">
                  Selecionado
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};