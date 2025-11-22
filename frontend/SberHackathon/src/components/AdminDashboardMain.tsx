import { BookOpen, Users, Calendar, TrendingUp, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';

export function AdminDashboardMain() {
  const stats = [
    {
      title: 'Всего книг',
      value: '12,458',
      change: '+127',
      changeLabel: 'за месяц',
      icon: BookOpen,
      color: '#aac0a7',
      trend: 'up',
    },
    {
      title: 'Активных читателей',
      value: '2,847',
      change: '+89',
      changeLabel: 'за неделю',
      icon: Users,
      color: '#6eb5ff',
      trend: 'up',
    },
    {
      title: 'Аренды книг',
      value: '5,234',
      change: '+234',
      changeLabel: 'за месяц',
      icon: TrendingUp,
      color: '#ffa726',
      trend: 'up',
    },
    {
      title: 'Предстоящие события',
      value: '18',
      change: '+3',
      changeLabel: 'новых',
      icon: Calendar,
      color: '#ab47bc',
      trend: 'up',
    },
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'loan',
      user: 'Sarah Mitchell',
      book: 'Project Hail Mary',
      time: '5 минут назад',
      icon: BookOpen,
    },
    {
      id: '2',
      type: 'registration',
      user: 'John Anderson',
      book: 'зарегистрирован в системе',
      time: '12 минут назад',
      icon: Users,
    },
    {
      id: '3',
      type: 'return',
      user: 'Emily Brown',
      book: '1984',
      time: '23 минуты назад',
      icon: CheckCircle,
    },
    {
      id: '4',
      type: 'renewal',
      user: 'Michael Chen',
      book: 'запросил продление аренды',
      time: '1 час назад',
      icon: Clock,
    },
    {
      id: '5',
      type: 'overdue',
      user: 'Lisa Johnson',
      book: 'просрочена аренда - Sapiens',
      time: '2 часа назад',
      icon: AlertCircle,
    },
  ];

  const alerts = [
    {
      id: '1',
      type: 'warning',
      message: '5 запросов на продление ожидают подтверждения',
      count: 5,
    },
    {
      id: '2',
      type: 'error',
      message: '12 книг с истекшим сроком аренды',
      count: 12,
    },
    {
      id: '3',
      type: 'info',
      message: '3 события требуют модерации',
      count: 3,
    },
  ];

  const topBooks = [
    { id: '1', title: 'The Midnight Library', loans: 234, trend: '+12%' },
    { id: '2', title: 'Project Hail Mary', loans: 198, trend: '+8%' },
    { id: '3', title: '1984', loans: 187, trend: '+15%' },
    { id: '4', title: 'Educated', loans: 156, trend: '+5%' },
    { id: '5', title: 'Sapiens', loans: 142, trend: '+3%' },
  ];

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      {/* Header */}
      <div className="bg-[#4a4a4a] border-b border-[#636363] px-8 py-6">
        <h1 className="text-[#aac0a7] mb-2">Панель управления</h1>
        <p className="text-[#888888]">Обзор работы библиотеки</p>
      </div>

      <div className="px-8 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="bg-[#4a4a4a] border-[#636363] p-6">
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}33` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-400">{stat.change}</p>
                    <p className="text-xs text-[#888888]">{stat.changeLabel}</p>
                  </div>
                </div>
                <p className="text-3xl text-[#aac0a7] mb-1">{stat.value}</p>
                <p className="text-sm text-[#888888]">{stat.title}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="col-span-2 bg-[#4a4a4a] border-[#636363] p-6">
            <h2 className="text-[#aac0a7] mb-4">Последняя активность</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-[#2a2a2a] rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-[#aac0a7] bg-opacity-20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#aac0a7]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#aac0a7] text-sm">
                        <span className="font-medium">{activity.user}</span>
                        {' — '}
                        {activity.book}
                      </p>
                      <p className="text-xs text-[#888888] mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Top Books */}
          <Card className="bg-[#4a4a4a] border-[#636363] p-6">
            <h2 className="text-[#aac0a7] mb-4">Популярные книги</h2>
            <div className="space-y-3">
              {topBooks.map((book, index) => (
                <div key={book.id} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#aac0a7] bg-opacity-20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-[#aac0a7]">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#aac0a7] truncate">{book.title}</p>
                    <p className="text-xs text-[#888888]">{book.loans} аренд</p>
                  </div>
                  <span className="text-xs text-green-400">{book.trend}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Alerts */}
        <Card className="bg-[#4a4a4a] border-[#636363] p-6">
          <h2 className="text-[#aac0a7] mb-4">Требуют внимания</h2>
          <div className="grid grid-cols-3 gap-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-2 ${
                  alert.type === 'error'
                    ? 'bg-red-500 bg-opacity-10 border-red-500'
                    : alert.type === 'warning'
                    ? 'bg-yellow-500 bg-opacity-10 border-yellow-500'
                    : 'bg-blue-500 bg-opacity-10 border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <AlertCircle
                    className={`w-5 h-5 ${
                      alert.type === 'error'
                        ? 'text-red-400'
                        : alert.type === 'warning'
                        ? 'text-yellow-400'
                        : 'text-blue-400'
                    }`}
                  />
                  <span
                    className={`text-xl ${
                      alert.type === 'error'
                        ? 'text-red-400'
                        : alert.type === 'warning'
                        ? 'text-yellow-400'
                        : 'text-blue-400'
                    }`}
                  >
                    {alert.count}
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    alert.type === 'error'
                      ? 'text-red-300'
                      : alert.type === 'warning'
                      ? 'text-yellow-300'
                      : 'text-blue-300'
                  }`}
                >
                  {alert.message}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
