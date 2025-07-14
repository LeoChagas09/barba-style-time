import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Search } from 'lucide-react';

interface ConsultBookingProps {
  onBack: () => void;
}

// Mock data - em produção viria do banco
const mockBookings = [
  {
    id: 1,
    phone: '11999999999',
    name: 'João Silva',
    barber: 'Carlos Gomes',
    service: 'Corte + Barba',
    date: '2024-01-20',
    time: '14:00',
    status: 'confirmado'
  },
  {
    id: 2,
    phone: '11888888888',
    name: 'Pedro Santos',
    barber: 'Miguel Torres',
    service: 'Corte Simples',
    date: '2024-01-21',
    time: '10:30',
    status: 'pendente'
  }
];

export const ConsultBooking = ({ onBack }: ConsultBookingProps) => {
  const [phone, setPhone] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSearch = () => {
    const phoneNumbers = phone.replace(/\D/g, '');
    const found = mockBookings.filter(booking => 
      booking.phone.includes(phoneNumbers)
    );
    setBookings(found);
    setHasSearched(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado': return 'text-green-600';
      case 'pendente': return 'text-yellow-600';
      case 'cancelado': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-white hover:text-white/80 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            <h1 className="text-3xl font-bold text-white mb-2">
              Consultar Agendamento
            </h1>
            <p className="text-white/70">
              Digite seu telefone para consultar seus agendamentos
            </p>
          </div>

          <Card className="bg-background/95 backdrop-blur border-border mb-6">
            <CardHeader>
              <CardTitle>Buscar por Telefone</CardTitle>
              <CardDescription>
                Informe o número cadastrado no agendamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={15}
                />
              </div>
              
              <Button 
                onClick={handleSearch}
                disabled={phone.length < 14}
                className="w-full"
                variant="premium"
              >
                <Search className="w-4 h-4 mr-2" />
                Buscar Agendamentos
              </Button>
            </CardContent>
          </Card>

          {hasSearched && (
            <div className="space-y-4">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <Card key={booking.id} className="bg-background/95 backdrop-blur border-border">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{booking.name}</h3>
                          <p className="text-muted-foreground">{booking.phone}</p>
                        </div>
                        <span className={`text-sm font-medium capitalize ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Barbeiro</p>
                          <p className="font-medium">{booking.barber}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Serviço</p>
                          <p className="font-medium">{booking.service}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Data</p>
                          <p className="font-medium">{formatDate(booking.date)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Horário</p>
                          <p className="font-medium">{booking.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-background/95 backdrop-blur border-border">
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">
                      Nenhum agendamento encontrado para este telefone.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};