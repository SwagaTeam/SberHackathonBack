import { useState } from 'react';
import { Search, Plus, MoreVertical, Mail, Phone, Shield, Clock, Edit, Trash2 } from 'lucide-react';
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

interface StaffMember {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  role: 'librarian' | 'assistant' | 'manager';
  hireDate: string;
  status: 'active' | 'on-leave' | 'inactive';
  shift: 'morning' | 'afternoon' | 'evening';
}

export function StaffManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'librarian' | 'assistant' | 'manager'>('all');
  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: '1',
      employeeId: 'EMP-001',
      name: 'Анна Петрова',
      email: 'anna.petrova@library14.ru',
      phone: '+7 (999) 111-2233',
      role: 'manager',
      hireDate: '2020-03-15',
      status: 'active',
      shift: 'morning',
    },
    {
      id: '2',
      employeeId: 'EMP-002',
      name: 'Дмитрий Соколов',
      email: 'dmitry.sokolov@library14.ru',
      phone: '+7 (999) 222-3344',
      role: 'librarian',
      hireDate: '2021-06-20',
      status: 'active',
      shift: 'morning',
    },
    {
      id: '3',
      employeeId: 'EMP-003',
      name: 'Мария Иванова',
      email: 'maria.ivanova@library14.ru',
      phone: '+7 (999) 333-4455',
      role: 'librarian',
      hireDate: '2022-01-10',
      status: 'active',
      shift: 'afternoon',
    },
    {
      id: '4',
      employeeId: 'EMP-004',
      name: 'Алексей Волков',
      email: 'alexey.volkov@library14.ru',
      phone: '+7 (999) 444-5566',
      role: 'assistant',
      hireDate: '2023-04-05',
      status: 'active',
      shift: 'evening',
    },
    {
      id: '5',
      employeeId: 'EMP-005',
      name: 'Ольга Смирнова',
      email: 'olga.smirnova@library14.ru',
      phone: '+7 (999) 555-6677',
      role: 'assistant',
      hireDate: '2023-09-12',
      status: 'on-leave',
      shift: 'afternoon',
    },
  ]);

  const [deleteStaff, setDeleteStaff] = useState<StaffMember | null>(null);

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.employeeId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = filterRole === 'all' || member.role === filterRole;

    return matchesSearch && matchesRole;
  });

  const handleDeleteStaff = () => {
    if (deleteStaff) {
      setStaff(staff.filter(s => s.id !== deleteStaff.id));
      toast.success('Сотрудник удален', {
        description: `${deleteStaff.name} был удален из системы`,
      });
      setDeleteStaff(null);
    }
  };

  const getRoleBadge = (role: StaffMember['role']) => {
    switch (role) {
      case 'manager':
        return <Badge className="bg-purple-500 hover:bg-purple-600">Менеджер</Badge>;
      case 'librarian':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Библиотекарь</Badge>;
      case 'assistant':
        return <Badge className="bg-green-500 hover:bg-green-600">Помощник</Badge>;
    }
  };

  const getStatusBadge = (status: StaffMember['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Активен</Badge>;
      case 'on-leave':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">В отпуске</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500 hover:bg-gray-600">Неактивен</Badge>;
    }
  };

  const getShiftLabel = (shift: StaffMember['shift']) => {
    switch (shift) {
      case 'morning': return 'Утро';
      case 'afternoon': return 'День';
      case 'evening': return 'Вечер';
    }
  };

  const stats = {
    total: staff.length,
    active: staff.filter(s => s.status === 'active').length,
    managers: staff.filter(s => s.role === 'manager').length,
    librarians: staff.filter(s => s.role === 'librarian').length,
  };

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      {/* Header */}
      <div className="bg-[#4a4a4a] border-b border-[#636363] px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[#aac0a7] mb-2">Управление персоналом</h1>
            <p className="text-[#888888]">Просмотр и управление сотрудниками библиотеки</p>
          </div>
          <Button className="bg-[#aac0a7] text-[#000000] hover:bg-[#8fa88d]">
            <Plus className="w-4 h-4 mr-2" />
            Добавить сотрудника
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-[#2a2a2a] border-[#636363] p-4">
            <p className="text-sm text-[#888888] mb-1">Всего сотрудников</p>
            <p className="text-2xl text-[#aac0a7]">{stats.total}</p>
          </Card>
          <Card className="bg-[#2a2a2a] border-[#636363] p-4">
            <p className="text-sm text-[#888888] mb-1">Активных</p>
            <p className="text-2xl text-green-400">{stats.active}</p>
          </Card>
          <Card className="bg-[#2a2a2a] border-[#636363] p-4">
            <p className="text-sm text-[#888888] mb-1">Менеджеров</p>
            <p className="text-2xl text-purple-400">{stats.managers}</p>
          </Card>
          <Card className="bg-[#2a2a2a] border-[#636363] p-4">
            <p className="text-sm text-[#888888] mb-1">Библиотекарей</p>
            <p className="text-2xl text-blue-400">{stats.librarians}</p>
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
              placeholder="Поиск по имени, email или ID сотрудника..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#4a4a4a] border border-[#636363] rounded-lg text-[#aac0a7] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-[#aac0a7]"
            />
          </div>

          {/* Role Filter */}
          <div className="flex gap-2">
            {(['all', 'manager', 'librarian', 'assistant'] as const).map((role) => (
              <Button
                key={role}
                variant={filterRole === role ? 'default' : 'outline'}
                onClick={() => setFilterRole(role)}
                className={
                  filterRole === role
                    ? 'bg-[#aac0a7] text-[#000000] hover:bg-[#8fa88d]'
                    : 'border-[#636363] text-[#aac0a7] hover:bg-[#4a4a4a]'
                }
              >
                {role === 'all' && 'Все'}
                {role === 'manager' && 'Менеджеры'}
                {role === 'librarian' && 'Библиотекари'}
                {role === 'assistant' && 'Помощники'}
              </Button>
            ))}
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-[#4a4a4a] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#636363]">
                <th className="text-left px-6 py-4 text-[#888888]">Сотрудник</th>
                <th className="text-left px-6 py-4 text-[#888888]">Контакты</th>
                <th className="text-left px-6 py-4 text-[#888888]">Должность</th>
                <th className="text-left px-6 py-4 text-[#888888]">Смена</th>
                <th className="text-left px-6 py-4 text-[#888888]">Дата найма</th>
                <th className="text-left px-6 py-4 text-[#888888]">Статус</th>
                <th className="text-right px-6 py-4 text-[#888888]">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((member) => (
                <tr key={member.id} className="border-b border-[#636363] hover:bg-[#636363] transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-[#aac0a7]">{member.name}</p>
                      <div className="flex items-center gap-1 text-xs text-[#888888] mt-1">
                        <Shield className="w-3 h-3" />
                        <span>{member.employeeId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-[#aac0a7]">
                        <Mail className="w-3 h-3 text-[#888888]" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#888888]">
                        <Phone className="w-3 h-3" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getRoleBadge(member.role)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#aac0a7]">{getShiftLabel(member.shift)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-[#aac0a7]">
                      <Clock className="w-4 h-4 text-[#888888]" />
                      <span>{new Date(member.hireDate).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(member.status)}
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
                          onClick={() => setDeleteStaff(member)}
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

          {filteredStaff.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#888888]">Сотрудники не найдены</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteStaff} onOpenChange={(open) => !open && setDeleteStaff(null)}>
        <AlertDialogContent className="bg-[#2a2a2a] border-[#4a4a4a]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#aac0a7]">Подтвердите удаление</AlertDialogTitle>
            <AlertDialogDescription className="text-[#888888]">
              Вы уверены, что хотите удалить сотрудника{' '}
              <span className="text-[#aac0a7]">{deleteStaff?.name}</span>?
              Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#4a4a4a] text-[#aac0a7] border-[#636363] hover:bg-[#636363]">
              Отмена
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteStaff}
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
