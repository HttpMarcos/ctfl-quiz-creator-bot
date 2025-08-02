import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Award, BookOpen, Home, History } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navigation = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Simulados', href: '/simulados', icon: BookOpen },
    { name: 'Histórico', href: '/historico', icon: History },
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">CTFL Simulator</h1>
                <p className="text-xs text-muted-foreground">Certified Tester Foundation Level</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Button
                    key={item.name}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    asChild
                  >
                    <a href={item.href} className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </a>
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border">
        <div className="flex items-center justify-around py-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
};