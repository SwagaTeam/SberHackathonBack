import { useState } from 'react';
import { Search, Plus, MoreVertical, Mail, CreditCard, Clock, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { toast } from 'sonner';

interface User {
  id: string;
  memberId: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  activeLoans: number;
  fines: number;
  status: 'active' | 'suspended' | 'expired';
}

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended' | 'expired'>('all');
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      memberId: 'LIB14-2024-5892',
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@email.com',
      phone: '+7 (999) 123-4567',
      joinDate: '2024-01-15',
      activeLoans: 3,
      fines: 0,
      status: 'active',
    },
    {
      id: '2',
      memberId: 'LIB14-2024-3421',
      name: 'John Anderson',
      email: 'john.anderson@email.com',
      phone: '+7 (999) 234-5678',
      joinDate: '2024-03-20',
      activeLoans: 1,
      fines: 5.50,
      status: 'active',
    },
    {
      id: '3',
      memberId: 'LIB14-2023-8765',
      name: 'Emily Brown',
      email: 'emily.brown@email.com',
      phone: '+7 (999) 345-6789',
      joinDate: '2023-08-10',
      activeLoans: 5,
      fines: 0,
      status: 'active',
    },
    {
      id: '4',
      memberId: 'LIB14-2024-1234',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+7 (999) 456-7890',
      joinDate: '2024-05-12',
      activeLoans: 0,
      fines: 15.00,
      status: 'suspended',
    },
    {
      id: '5',
      memberId: 'LIB14-2022-9876',
      name: 'Lisa Johnson',
      email: 'lisa.johnson@email.com',
      phone: '+7 (999) 567-8901',
      joinDate: '2022-11-30',
      activeLoans: 0,
      fines: 0,
      status: 'expired',
    },
  ]);

  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.memberId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleDeleteUser = () => {
    if (deleteUser) {
      setUsers(users.filter(u => u.id !== deleteUser.id));
      toast.success('Пользователь удален', {
        description: `${deleteUser.name} был удален из системы`,
      });
      setDeleteUser(null);
    }
  };

  const handleSuspendUser = (user: User) => {
    setUsers(users.map(u =>
      u.id === user.id
        ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' as const }
        : u
    ));
    toast.success(
      user.status === 'suspended' ? 'Пользователь активирован' : 'Пользователь заблокирован'
    );
  };

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Активен</Badge>;
      case 'suspended':
        return <Badge className="bg-red-500 hover:bg-red-600">Заблокирован</Badge>;
      case 'expired':
        return <Badge className="bg-gray-500 hover:bg-gray-600">Истек</Badge>;
    }
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    withFines: users.filter(u => u.fines > 0).length,
  };

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      {/* Header */}
      <div className="bg-[#4a4a4a] border-b border-[#636363] px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[#aac0a7] mb-2">Управление читателями</h1>
            <p className="text-[#888888]">Просмотр и управление учетными записями читателей</p>
          </div>
          <Button className="bg-[#aac0a7] text-[#000000] hover:bg-[#8fa88d]">
            <Plus className="w-4 h-4 mr-2" />
            Добавить читателя
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-[#2a2a2a] border-[#636363] p-4">
            <p className="text-sm text-[#888888] mb-1">Всего читателей</p>
            <p className="text-2xl text-[#aac0a7]">{stats.total}</p>
          </Card>
          <Card className="bg-[#2a2a2a] border-[#636363] p-4">
            <p className="text-sm text-[#888888] mb-1">Активных</p>
            <p className="text-2xl text-green-400">{stats.active}</p>
          </Card>
          <Card className="bg-[#2a2a2a] border-[#636363] p-4">
            <p className="text-sm text-[#888888] mb-1">Заблокировано</p>
            <p className="text-2xl text-red-400">{stats.suspended}</p>
          </Card>
          <Card className="bg-[#2a2a2a] border-[#636363] p-4">
            <p className="text-sm text-[#888888] mb-1">С штрафами</p>
            <p className="text-2xl text-yellow-400">{stats.withFines}</p>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="px-8 py-6">
        <div className="flex gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
            <input
              type="text"
              placeholder="Поиск по имени, email или ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#4a4a4a] border border-[#636363] rounded-lg text-[#aac0a7] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-[#aac0a7]"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {(['all', 'active', 'suspended', 'expired'] as const).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                onClick={() => setFilterStatus(status)}
                className={
                  filterStatus === status
                    ? 'bg-[#aac0a7] text-[#000000] hover:bg-[#8fa88d]'
                    : 'border-[#636363] text-[#aac0a7] hover:bg-[#4a4a4a]'
                }
              >
                {status === 'all' && 'Все'}
                {status === 'active' && 'Активные'}
                {status === 'suspended' && 'Заблокированные'}
                {status === 'expired' && 'Истекшие'}
              </Button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#4a4a4a] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#636363]">
                <th className="text-left px-6 py-4 text-[#888888]">Читатель</th>
                <th className="text-left px-6 py-4 text-[#888888]">Контакты</th>
                <th className="text-left px-6 py-4 text-[#888888]">Дата регистрации</th>
                <th className="text-left px-6 py-4 text-[#888888]">Аренды</th>
                <th className="text-left px-6 py-4 text-[#888888]">Штрафы</th>
                <th className="text-left px-6 py-4 text-[#888888]">Статус</th>
                <th className="text-right px-6 py-4 text-[#888888]">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-[#636363] hover:bg-[#636363] transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-[#aac0a7]">{user.name}</p>
                      <div className="flex items-center gap-1 text-xs text-[#888888] mt-1">
                        <CreditCard className="w-3 h-3" />
                        <span>{user.memberId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-[#aac0a7]">
                        <Mail className="w-3 h-3 text-[#888888]" />
                        <span>{user.email}</span>
                      </div>
                      <p className="text-xs text-[#888888]">{user.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-[#aac0a7]">
                      <Clock className="w-4 h-4 text-[#888888]" />
                      <span>{new Date(user.joinDate).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-[#aac0a7] text-[#000000] hover:bg-[#8fa88d]">
                      {user.activeLoans}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {user.fines > 0 ? (
                      <div className="flex items-center gap-1 text-yellow-400">
                        <AlertCircle className="w-4 h-4" />
                        <span>${user.fines.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span className="text-[#888888]">$0.00</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-[#aac0a7] hover:bg-[#2a2a2a]">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#2a2a2a] border-[#636363]">
                        <DropdownMenuItem className="text-[#aac0a7] focus:bg-[#4a4a4a] focus:text-[#aac0a7]">
                          <Edit className="w-4 h-4 mr-2" />
                          Редактировать
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleSuspendUser(user)}
                          className="text-[#aac0a7] focus:bg-[#4a4a4a] focus:text-[#aac0a7]"
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {user.status === 'suspended' ? 'Активировать' : 'Заблокировать'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeleteUser(user)}
                          className="text-red-400 focus:bg-[#4a4a4a] focus:text-red-400"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#888888]">Пользователи не найдены</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteUser} onOpenChange={(open) => !open && setDeleteUser(null)}>
        <AlertDialogContent className="bg-[#2a2a2a] border-[#4a4a4a]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#aac0a7]">Подтвердите удаление</AlertDialogTitle>
            <AlertDialogDescription className="text-[#888888]">
              Вы уверены, что хотите удалить пользователя{' '}
              <span className="text-[#aac0a7]">{deleteUser?.name}</span>?
              Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#4a4a4a] text-[#aac0a7] border-[#636363] hover:bg-[#636363]">
              Отмена
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
