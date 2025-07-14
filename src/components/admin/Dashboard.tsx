import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockAppointments, services, barbers } from '@/data/mockData';
import { DollarSign, Calendar, Users, TrendingUp, Clock, Settings } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear] = useState(new Date().getFullYear());

  // Calcular estatísticas do mês
  const monthlyAppointments = mockAppointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate.getMonth() === selectedMonth && 
           aptDate.getFullYear() === selectedYear &&
           apt.status === 'completed';
  });

  const monthlyRevenue = monthlyAppointments.reduce((total, apt) => {
    const service = services.find(s => s.id === apt.serviceId);
    return total + (service?.price || 0);
  }, 0);

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-primary text-primary-foreground p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Dashboard Admin</h1>
              <p className="opacity-90">Barbearia Gomes - Gestão</p>
            </div>
            <Button variant="outline" onClick={onLogout} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        {/* Filtro de mês */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Relatório Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {months.map((month, index) => (
                <Button
                  key={month}
                  variant={selectedMonth === index ? "premium" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMonth(index)}
                >
                  {month}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                R$ {monthlyRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {months[selectedMonth]} {selectedYear}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atendimentos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyAppointments.length}</div>
              <p className="text-xs text-muted-foreground">
                Cortes realizados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {monthlyAppointments.length > 0 ? (monthlyRevenue / monthlyAppointments.length).toFixed(2) : '0.00'}
              </div>
              <p className="text-xs text-muted-foreground">
                Por atendimento
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Barbeiros Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{barbers.length}</div>
              <p className="text-xs text-muted-foreground">
                Profissionais
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs com detalhes */}
        <Tabs defaultValue="appointments" className="space-y-4">
          <TabsList>
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="schedule">Horários</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Agendamentos de {months[selectedMonth]}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyAppointments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Nenhum agendamento encontrado para este mês
                    </p>
                  ) : (
                    monthlyAppointments.map((appointment) => {
                      const service = services.find(s => s.id === appointment.serviceId);
                      const barber = barbers.find(b => b.id === appointment.barberId);
                      
                      return (
                        <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-semibold">{appointment.clientName}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{format(new Date(appointment.date), 'dd/MM/yyyy', { locale: ptBR })}</span>
                              <span>{appointment.time}</span>
                              <span>{barber?.name}</span>
                            </div>
                          </div>
                          <div className="text-right space-y-1">
                            <Badge variant="secondary">{service?.name}</Badge>
                            <p className="text-sm font-semibold">R$ {service?.price}</p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Serviços e Preços
                  <Button size="sm" variant="premium">
                    <Settings className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{service.name}</h4>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {service.duration} min
                          </Badge>
                        </div>
                        <p className="font-semibold">R$ {service.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Configuração de Horários
                  <Button size="sm" variant="premium">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Dias de Funcionamento</h4>
                    <div className="space-y-2">
                      {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].map((day, index) => (
                        <div key={day} className="flex items-center justify-between p-3 border rounded">
                          <span>{day}</span>
                          <Badge variant="secondary">09:00 - 18:00</Badge>
                        </div>
                      ))}
                      <div className="flex items-center justify-between p-3 border rounded bg-muted/50">
                        <span>Domingo</span>
                        <Badge variant="outline">Fechado</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Configurações</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Horário de Almoço</span>
                        <Badge variant="secondary">12:00 - 13:00</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Intervalo entre Atendimentos</span>
                        <Badge variant="secondary">30 min</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Agendamento Antecipado</span>
                        <Badge variant="secondary">30 dias</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};