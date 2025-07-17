import { Scissors, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

interface HeaderProps {
  isAdmin?: boolean;
  onLoginClick?: () => void;
}

export const Header = ({ isAdmin = false, onLoginClick }: HeaderProps) => {
  return (
    <header className="w-full bg-white/80 dark:bg-black/60 shadow-lg rounded-md border-b border-border z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 h-auto md:h-20 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 py-2 md:py-0">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-16 md:h-20 max-h-20 w-auto object-contain mx-auto transition-all duration-200" />
        </div>
      </div>
    </header>
  );
};