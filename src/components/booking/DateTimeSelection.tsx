import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { generateTimeSlots } from '@/data/mockData';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DateTimeSelectionProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  serviceDuration: number;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
}

export const DateTimeSelection = ({ 
  selectedDate, 
  selectedTime, 
  serviceDuration,
  onSelectDate, 
  onSelectTime 
}: DateTimeSelectionProps) => {
  const timeSlots = generateTimeSlots('09:00', '18:00', 30, { start: '12:00', end: '13:00' });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Escolha data e horário
        </h2>
        <p className="text-muted-foreground">
          Selecione quando deseja ser atendido
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Selecionar Data
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate || undefined}
              onSelect={(date) => date && onSelectDate(date)}
              disabled={(date) => date <= new Date() || date.getDay() === 0} // Desabilita domingos e datas passadas
              className="rounded-md border pointer-events-auto"
              locale={ptBR}
            />
          </CardContent>
        </Card>

        {/* Horários */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Horários Disponíveis
              {serviceDuration && (
                <Badge variant="secondary" className="ml-auto">
                  <span className="whitespace-nowrap">{serviceDuration} min</span>
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "premium" : "outline"}
                    size="sm"
                    onClick={() => onSelectTime(time)}
                    className="h-10"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Selecione uma data primeiro
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {selectedDate && selectedTime && (
        <Card className="bg-accent/50 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-foreground mb-2">
                Agendamento selecionado:
              </h3>
              <p className="text-muted-foreground">
                {format(selectedDate, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })} às {selectedTime}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};