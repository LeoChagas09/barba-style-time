import { Scissors, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

interface HeaderProps {
  isAdmin?: boolean;
  onLoginClick?: () => void;
}

export const Header = ({ isAdmin = false, onLoginClick }: HeaderProps) => {
  return (
    <header className="w-full bg-white/80 dark:bg-black/60 shadow-lg rounded-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-12 md:h-16 max-h-16 w-auto object-contain mx-auto" />
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