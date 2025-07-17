import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Search, Settings, Instagram, Phone } from 'lucide-react';
import logo from '@/assets/logo.png';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

interface WelcomeScreenProps {
  onClientBook: () => void;
  onClientConsult: () => void;
  onAdminLogin: () => void;
}

export const WelcomeScreen = ({ onClientBook, onClientConsult, onAdminLogin }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Botão Admin mobile - canto superior direito, fora do card */}
          <Button
            onClick={onAdminLogin}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 md:hidden absolute top-0 right-0 m-2 z-10"
          >
            <Settings className="w-5 h-5" />
            Admin
          </Button>
          <div className="mb-12">
            <div className="w-full bg-white/80 dark:bg-black/60 py-6 shadow-lg rounded-md flex flex-col items-center relative">
              <div className="relative w-full flex justify-center items-center">
                <img src={logo} alt="Logo" className="h-24 object-contain mx-auto" />
                {/* Botão Admin desktop - lado direito */}
                <Button
                  onClick={onAdminLogin}
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2 hidden md:flex absolute right-6 top-1/2 -translate-y-1/2"
                >
                  <Settings className="w-5 h-5" />
                  Admin
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
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
          </div>

          {/* Botões sociais */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <span className="text-white text-lg font-medium">Acesse também</span>
            <div className="flex gap-6 justify-center mt-2">
              <a
                href="https://instagram.com/barbeariafernandogomes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:scale-110 transition-transform"
              >
                <FaInstagram className="w-10 h-10 text-white" />
              </a>
              <a
                href="https://wa.me/5518997870083"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="hover:scale-110 transition-transform"
              >
                <FaWhatsapp className="w-10 h-10 text-white" />
              </a>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};