import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Calendar, Clock, User, Scissors, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Barber, Service } from '@/types';

interface ConfirmationScreenProps {
  barber: Barber;
  service: Service;
  date: Date;
  time: string;
  clientName: string;
  clientPhone: string;
  onNewBooking: () => void;
}

export const ConfirmationScreen = ({
  barber,
  service,
  date,
  time,
  clientName,
  clientPhone,
  onNewBooking
}: ConfirmationScreenProps) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Agendamento confirmado!
        </h2>
        <p className="text-muted-foreground">
          Seu horário foi reservado com sucesso. Você receberá uma confirmação no WhatsApp.
        </p>
      </div>

      <Card className="border-primary/20 shadow-elegant">
        <CardHeader className="bg-gradient-primary text-primary-foreground">
          <CardTitle className="text-center">Detalhes do agendamento</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {/* Data e Hora */}
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold text-foreground">
                {format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{time}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Barbeiro */}
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold text-foreground">{barber.name}</p>
              <p className="text-sm text-muted-foreground">{barber.specialty}</p>
            </div>
          </div>

          <Separator />

          {/* Serviço */}
          <div className="flex items-center gap-3">
            <Scissors className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-semibold text-foreground">{service.name}</p>
              <div className="flex items-center gap-4 mt-1">
                <Badge variant="secondary">
                  <Clock className="w-3 h-3 mr-1" />
                  {service.duration} min
                </Badge>
                <Badge variant="secondary">
                  <DollarSign className="w-3 h-3 mr-1" />
                  R$ {service.price}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Cliente */}
          <div>
            <h4 className="font-semibold text-foreground mb-2">Dados do cliente:</h4>
            <p className="text-muted-foreground">{clientName}</p>
            <p className="text-muted-foreground">{clientPhone}</p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Chegue com 5 minutos de antecedência. Para cancelar ou reagendar, 
          entre em contato pelo WhatsApp até 2 horas antes do horário marcado.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={onNewBooking}>
            Novo agendamento
          </Button>
          <Button variant="premium">
            Compartilhar no WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};