import { type ReactNode } from 'react';
import { LayoutDashboard, Users, UserCog, BookOpen, Calendar, RefreshCw, BarChart3, LogOut } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function AdminLayout({ children, currentScreen, onNavigate, onLogout }: AdminLayoutProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Читатели' },
    { id: 'staff-management', icon: UserCog, label: 'Персонал' },
    { id: 'books', icon: BookOpen, label: 'Книги' },
    { id: 'events', icon: Calendar, label: 'Мероприятия' },
    { id: 'renewals', icon: RefreshCw, label: 'Продления' },
    { id: 'analytics', icon: BarChart3, label: 'Статистика' },
  ];

  return (
    <div className="flex h-screen bg-[#2a2a2a]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4a4a4a] border-r border-[#636363] flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-[#636363]">
          <h1 className="text-[#aac0a7]">Admin Panel</h1>
          <p className="text-sm text-[#888888] mt-1">City Library #14</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#aac0a7] text-[#000000]'
                    : 'text-[#aac0a7] hover:bg-[#636363]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#636363]">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-[#636363] transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Выйти</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
