import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Search, Settings } from 'lucide-react';

interface WelcomeScreenProps {
  onClientBook: () => void;
  onClientConsult: () => void;
  onAdminLogin: () => void;
}

export const WelcomeScreen = ({ onClientBook, onClientConsult, onAdminLogin }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Barbearia <span className="text-primary">Gomes</span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Seu estilo, nossa paixão
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Cliente - Agendar */}
            <Card className="bg-background/95 backdrop-blur border-border hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Agendar Horário</CardTitle>
                <CardDescription>
                  Faça seu agendamento de forma rápida e prática
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={onClientBook}
                  variant="premium" 
                  size="lg" 
                  className="w-full"
                >
                  Agendar Agora
                </Button>
              </CardContent>
            </Card>

            {/* Cliente - Consultar */}
            <Card className="bg-background/95 backdrop-blur border-border hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Consultar Agendamento</CardTitle>
                <CardDescription>
                  Verifique seus horários agendados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={onClientConsult}
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                >
                  Consultar
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Admin */}
          <div className="flex justify-center">
            <Button
              onClick={onAdminLogin}
              variant="ghost"
              className="text-white/70 hover:text-white flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Acesso Administrativo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};