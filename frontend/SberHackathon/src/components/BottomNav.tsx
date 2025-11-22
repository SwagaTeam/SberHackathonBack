import { Home, Search, Calendar, User, ShoppingCart } from 'lucide-react';
import { Badge } from './ui/badge';

interface BottomNavProps {
  currentScreen: 'home' | 'catalog' | 'events' | 'profile' | 'cart';
  onNavigate: (screen: 'home' | 'catalog' | 'events' | 'profile' | 'cart') => void;
  cartCount?: number;
}

export function BottomNav({ currentScreen, onNavigate, cartCount = 0 }: BottomNavProps) {
  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'catalog' as const, icon: Search, label: 'Catalog' },
    { id: 'cart' as const, icon: ShoppingCart, label: 'Cart' },
    { id: 'events' as const, icon: Calendar, label: 'Events' },
    { id: 'profile' as const, icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#4a4a4a] border-t border-[#636363] safe-area-inset-bottom">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
                isActive ? 'text-[#aac0a7]' : 'text-[#888888]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${isActive ? 'fill-[#aac0a7]' : ''}`} />
                {item.id === 'cart' && cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-[#aac0a7] text-[#000000] text-xs">
                    {cartCount > 9 ? '9+' : cartCount}
                  </Badge>
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}