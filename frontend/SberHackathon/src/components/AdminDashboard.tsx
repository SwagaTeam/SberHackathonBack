import { BookOpen, Calendar, Users, BarChart3, ArrowRight } from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (screen: 'books' | 'events' | 'accounts' | 'analytics') => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const menuItems = [
    {
      id: 'books' as const,
      title: 'Управление книгами',
      description: 'Добавление, редактирование и удаление книг из каталога',
      icon: BookOpen,
      color: '#aac0a7',
    },
    {
      id: 'events' as const,
      title: 'Управление мероприятиями',
      description: 'Создание и редактирование библиотечных мероприятий',
      icon: Calendar,
      color: '#aac0a7',
    },
    {
      id: 'accounts' as const,
      title: 'Управление учетными записями',
      description: 'Просмотр и управление аккаунтами читателей',
      icon: Users,
      color: '#aac0a7',
    },
    {
      id: 'analytics' as const,
      title: 'Статистика',
      description: 'Аналитика и отчеты по работе библиотеки',
      icon: BarChart3,
      color: '#aac0a7',
    },
  ];

  return (
    <div className="min-h-screen bg-[#636363]">
      {/* Header */}
      <div className="bg-[#2a2a2a] border-b border-[#4a4a4a] px-6 py-6">
        <h1 className="text-[#aac0a7] mb-2">Панель администратора</h1>
        <p className="text-[#888888]">Городская библиотека #14</p>
      </div>

      {/* Menu Cards */}
      <div className="px-6 py-6 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="bg-[#2a2a2a] rounded-xl p-6 border border-[#4a4a4a] hover:border-[#aac0a7] transition-all hover:shadow-lg group text-left"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: item.color + '20' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-[#aac0a7]">{item.title}</h3>
                      <ArrowRight className="w-5 h-5 text-[#888888] group-hover:text-[#aac0a7] group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                    <p className="text-[#888888] text-sm">{item.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-6 max-w-3xl mx-auto">
        <h2 className="text-[#aac0a7] mb-4">Быстрая статистика</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#4a4a4a] rounded-lg p-4 border border-[#4a4a4a]">
            <p className="text-[#888888] text-sm mb-1">Всего книг</p>
            <p className="text-[#aac0a7]">2,345</p>
          </div>
          <div className="bg-[#4a4a4a] rounded-lg p-4 border border-[#4a4a4a]">
            <p className="text-[#888888] text-sm mb-1">Выдано</p>
            <p className="text-[#aac0a7]">187</p>
          </div>
          <div className="bg-[#4a4a4a] rounded-lg p-4 border border-[#4a4a4a]">
            <p className="text-[#888888] text-sm mb-1">Читателей</p>
            <p className="text-[#aac0a7]">1,523</p>
          </div>
          <div className="bg-[#4a4a4a] rounded-lg p-4 border border-[#4a4a4a]">
            <p className="text-[#888888] text-sm mb-1">Запросы</p>
            <p className="text-[#ffd700]">5</p>
          </div>
        </div>
      </div>
    </div>
  );
}