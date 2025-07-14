import { Scissors, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isAdmin?: boolean;
  onLoginClick?: () => void;
}

export const Header = ({ isAdmin = false, onLoginClick }: HeaderProps) => {
  return (
    <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Scissors className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Barbearia Gomes
            </h1>
            <p className="text-xs text-muted-foreground">
              Tradição e qualidade
            </p>
          </div>
        </div>
        
        {!isAdmin && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onLoginClick}
            className="flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Admin
          </Button>
        )}
      </div>
    </header>
  );
};