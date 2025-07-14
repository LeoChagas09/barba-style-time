import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone, CheckCircle } from 'lucide-react';

interface ClientFormProps {
  onSubmit: (data: { name: string; phone: string }) => void;
}

// Mock data - em produção viria do banco
const mockClients = [
  { phone: '11999999999', name: 'João Silva' },
  { phone: '11888888888', name: 'Pedro Santos' },
  { phone: '11777777777', name: 'Maria Oliveira' }
];

export const ClientForm = ({ onSubmit }: ClientFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isExistingClient, setIsExistingClient] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      onSubmit({ name, phone });
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const checkExistingClient = (phoneNumber: string) => {
    const numbers = phoneNumber.replace(/\D/g, '');
    const client = mockClients.find(c => c.phone.includes(numbers) && numbers.length >= 10);
    
    if (client) {
      setName(client.name);
      setIsExistingClient(true);
    } else {
      if (isExistingClient) {
        setName('');
        setIsExistingClient(false);
      }
    }
  };

  useEffect(() => {
    if (phone.replace(/\D/g, '').length >= 10) {
      checkExistingClient(phone);
    }
  }, [phone]);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Seus dados
        </h2>
        <p className="text-muted-foreground">
          Precisamos de algumas informações para confirmar seu agendamento
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações pessoais</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone/WhatsApp</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className="pl-10"
                  maxLength={15}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                {isExistingClient && (
                  <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                )}
                <Input
                  id="name"
                  type="text"
                  placeholder={isExistingClient ? "Nome preenchido automaticamente" : "Digite seu nome"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`pl-10 ${isExistingClient ? 'pr-10 bg-green-50 border-green-200' : ''}`}
                  required
                  readOnly={isExistingClient}
                />
              </div>
              {isExistingClient && (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Cliente já cadastrado - dados preenchidos automaticamente
                </p>
              )}
            </div>


            <Button 
              type="submit" 
              className="w-full"
              variant="premium"
              disabled={!name || !phone}
            >
              Confirmar agendamento
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};