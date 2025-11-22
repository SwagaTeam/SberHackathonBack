import { ArrowLeft, BookOpen, TrendingUp, Users, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AnalyticsDashboardProps {
  onBack: () => void;
}

export function AnalyticsDashboard({ onBack }: AnalyticsDashboardProps) {
  // Mock data for popular books
  const popularBooksData = [
    { title: 'Война и мир', loans: 45 },
    { title: 'The Midnight Library', loans: 38 },
    { title: 'Sapiens', loans: 32 },
    { title: '1984', loans: 28 },
    { title: 'Educated', loans: 25 },
  ];

  // Mock data for loans over time
  const loansOverTimeData = [
    { date: '1 нояб', loans: 23 },
    { date: '3 нояб', loans: 28 },
    { date: '5 нояб', loans: 25 },
    { date: '7 нояб', loans: 32 },
    { date: '9 нояб', loans: 30 },
    { date: '11 нояб', loans: 35 },
    { date: '13 нояб', loans: 38 },
    { date: '15 нояб', loans: 33 },
    { date: '17 нояб', loans: 40 },
    { date: '19 нояб', loans: 37 },
    { date: '21 нояб', loans: 42 },
  ];

  return (
    <div className="min-h-screen bg-[#636363]">
      {/* Header */}
      <div className="bg-[#2a2a2a] border-b border-[#4a4a4a] px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-[#aac0a7] hover:text-[#c5d4c2] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-[#aac0a7]">Статистика и аналитика</h1>
            <p className="text-[#888888] text-sm">Данные за последние 30 дней</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 max-w-7xl mx-auto">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#2a2a2a] rounded-lg p-6 border border-[#4a4a4a]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#aac0a7]/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#aac0a7]" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#aac0a7]" />
            </div>
            <p className="text-[#888888] text-sm mb-1">Всего книг в фонде</p>
            <p className="text-[#aac0a7]">2,345</p>
            <p className="text-[#888888] text-xs mt-2">+23 за месяц</p>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 border border-[#4a4a4a]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#aac0a7]/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#aac0a7]" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#aac0a7]" />
            </div>
            <p className="text-[#888888] text-sm mb-1">Книг выдано</p>
            <p className="text-[#aac0a7]">187</p>
            <p className="text-[#888888] text-xs mt-2">+12% от прошлого месяца</p>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 border border-[#4a4a4a]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#aac0a7]/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#aac0a7]" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#aac0a7]" />
            </div>
            <p className="text-[#888888] text-sm mb-1">Активных бронирований</p>
            <p className="text-[#aac0a7]">24</p>
            <p className="text-[#888888] text-xs mt-2">В ожидании выдачи</p>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 border border-[#4a4a4a]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#aac0a7]/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#aac0a7]" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#aac0a7]" />
            </div>
            <p className="text-[#888888] text-sm mb-1">Активных читателей</p>
            <p className="text-[#aac0a7]">1,523</p>
            <p className="text-[#888888] text-xs mt-2">+45 новых за месяц</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Popular Books Chart */}
          <div className="bg-[#2a2a2a] rounded-lg p-6 border border-[#4a4a4a]">
            <h2 className="text-[#aac0a7] mb-6">Популярные книги (рейтинг)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={popularBooksData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
                <XAxis type="number" stroke="#888888" />
                <YAxis type="category" dataKey="title" stroke="#888888" width={150} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #4a4a4a',
                    borderRadius: '8px',
                    color: '#aac0a7',
                  }}
                />
                <Bar dataKey="loans" fill="#aac0a7" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Loans Over Time Chart */}
          <div className="bg-[#2a2a2a] rounded-lg p-6 border border-[#4a4a4a]">
            <h2 className="text-[#aac0a7] mb-6">Выдачи за последние 30 дней</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={loansOverTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
                <XAxis dataKey="date" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #4a4a4a',
                    borderRadius: '8px',
                    color: '#aac0a7',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="loans"
                  stroke="#aac0a7"
                  strokeWidth={3}
                  dot={{ fill: '#aac0a7', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#2a2a2a] rounded-lg p-6 border border-[#4a4a4a]">
            <h3 className="text-[#aac0a7] mb-4">Статистика по жанрам</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[#888888] text-sm">Fiction</span>
                <span className="text-[#aac0a7]">487</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888] text-sm">History</span>
                <span className="text-[#aac0a7]">324</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888] text-sm">Science Fiction</span>
                <span className="text-[#aac0a7]">256</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888] text-sm">Biography</span>
                <span className="text-[#aac0a7]">189</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888] text-sm">Self-Help</span>
                <span className="text-[#aac0a7]">145</span>
              </div>
            </div>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 border border-[#4a4a4a]">
            <h3 className="text-[#aac0a7] mb-4">Средние показатели</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[#888888] text-sm">Выдач в день</span>
                <span className="text-[#aac0a7]">35</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888] text-sm">Срок аренды</span>
                <span className="text-[#aac0a7]">14 дней</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888] text-sm">Возвратов в срок</span>
                <span className="text-[#aac0a7]">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888] text-sm">Новых читателей</span>
                <span className="text-[#aac0a7]">1.5 в день</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888] text-sm">Активность брони</span>
                <span className="text-[#aac0a7]">18%</span>
              </div>
            </div>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 border border-[#4a4a4a]">
            <h3 className="text-[#aac0a7] mb-4">Топ авторы</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[#888888] text-sm">Лев Толстой</span>
                <span className="text-[#aac0a7]">67</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888] text-sm">Matt Haig</span>
                <span className="text-[#aac0a7]">52</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888] text-sm">Yuval Noah Harari</span>
                <span className="text-[#aac0a7]">48</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888] text-sm">George Orwell</span>
                <span className="text-[#aac0a7]">43</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888] text-sm">Tara Westover</span>
                <span className="text-[#aac0a7]">38</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
