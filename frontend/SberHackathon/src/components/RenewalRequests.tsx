import { useState } from 'react';
import { ArrowLeft, Check, X, Clock, User, Calendar, AlertCircle } from 'lucide-react';
import { type RenewalRequest } from '../lib/mockData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { toast } from 'sonner';
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

interface RenewalRequestsProps {
  onBack: () => void;
}

export function RenewalRequests({ onBack }: RenewalRequestsProps) {
  const [requests, setRequests] = useState<RenewalRequest[]>([
    {
      id: 'REN-001',
      loanId: '1',
      bookId: '2',
      bookTitle: 'Project Hail Mary',
      bookCover: 'https://images.unsplash.com/photo-1748712576539-d40bab99b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBzY2llbmNlJTIwZmFudGFzeXxlbnwxfHx8fDE3NjM2NDk4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      userId: '1',
      userName: 'Sarah Mitchell',
      memberId: 'LIB14-2024-5892',
      currentDueDate: '2025-12-05',
      requestedDate: '2025-12-19',
      requestDate: '2025-11-20',
      reason: 'Еще не закончила читать книгу, очень интересная!',
      status: 'pending',
    },
    {
      id: 'REN-002',
      loanId: '5',
      bookId: '7',
      bookTitle: '1984',
      bookCover: 'https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBtb2RrbiJTIwZmWN0aW9ufGVufDF8fHx8MTc2MzU3MDczMXww&ixlib=rb-4.1.0&q=80&w=1080',
      userId: '3',
      userName: 'Jane Smith',
      memberId: 'LIB14-2024-4523',
      currentDueDate: '2025-11-28',
      requestedDate: '2025-12-15',
      requestDate: '2025-11-21',
      reason: 'Нужна книга для подготовки к экзамену',
      status: 'pending',
    },
    {
      id: 'REN-003',
      loanId: '6',
      bookId: '9',
      bookTitle: 'Sapiens',
      bookCover: 'https://images.unsplash.com/photo-1760696473709-a7da66ee87a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBteXN0ZXJ5JTIwdGhyaWxsZXJ8ZW58MXx8fHwxNzYzNjQ5ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      userId: '5',
      userName: 'Emily Brown',
      memberId: 'LIB14-2024-7821',
      currentDueDate: '2025-11-30',
      requestedDate: '2025-12-20',
      requestDate: '2025-11-22',
      reason: 'Использую для дипломной работы',
      status: 'pending',
    },
    {
      id: 'REN-004',
      loanId: '7',
      bookId: '1',
      bookTitle: 'The Midnight Library',
      bookCover: 'https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBtb2RrbiJTIwZmWN0aW9ufGVufDF8fHx8MTc2MzU3MDczMXww&ixlib=rb-4.1.0&q=80&w=1080',
      userId: '7',
      userName: 'Lisa Anderson',
      memberId: 'LIB14-2024-3421',
      currentDueDate: '2025-12-01',
      requestedDate: '2025-12-10',
      requestDate: '2025-11-19',
      reason: 'Хочу перечитать некоторые главы',
      status: 'pending',
    },
    {
      id: 'REN-005',
      loanId: '8',
      bookId: '4',
      bookTitle: 'Educated',
      bookCover: 'https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBjbGFzc2ljJTIwbGl0ZXJhdHVyZXxlbnwxfHx8fDE3NjM2MDA2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      userId: '9',
      userName: 'Tom Harris',
      memberId: 'LIB14-2024-9012',
      currentDueDate: '2025-12-03',
      requestedDate: '2025-12-25',
      requestDate: '2025-11-18',
      reason: 'Буду в командировке, не успею вернуть вовремя',
      status: 'pending',
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<RenewalRequest | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  const handleApprove = (request: RenewalRequest) => {
    setSelectedRequest(request);
    setActionType('approve');
  };

  const handleReject = (request: RenewalRequest) => {
    setSelectedRequest(request);
    setActionType('reject');
  };

  const confirmAction = () => {
    if (!selectedRequest || !actionType) return;

    setRequests(
      requests.map((req) =>
        req.id === selectedRequest.id
          ? { ...req, status: actionType === 'approve' ? 'approved' : 'rejected' }
          : req
      )
    );

    toast.success(
      actionType === 'approve'
        ? `Запрос на продление для ${selectedRequest.userName} одобрен`
        : `Запрос на продление для ${selectedRequest.userName} отклонен`
    );

    setSelectedRequest(null);
    setActionType(null);
  };

  const filteredRequests = requests.filter((req) => {
    if (filterStatus === 'all') return true;
    return req.status === filterStatus;
  });

  const pendingCount = requests.filter((r) => r.status === 'pending').length;
  const approvedCount = requests.filter((r) => r.status === 'approved').length;
  const rejectedCount = requests.filter((r) => r.status === 'rejected').length;

  const calculateNewDueDate = (currentDate: string) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + 14); // Add 14 days
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <div className="min-h-screen bg-[#636363]">
      {/* Header */}
      <div className="bg-[#2a2a2a] border-b border-[#4a4a4a] px-6 py-6 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#4a4a4a] flex items-center justify-center hover:bg-[#636363] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#aac0a7]" />
          </button>
          <div>
            <h1 className="text-[#aac0a7]">Запросы на продление</h1>
            <p className="text-[#888888] text-sm">Управление запросами читателей</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={() => setFilterStatus('all')}
            className={`p-3 rounded-lg border transition-all ${
              filterStatus === 'all'
                ? 'bg-[#4a4a4a] border-[#aac0a7]'
                : 'bg-[#4a4a4a] border-[#4a4a4a] hover:border-[#636363]'
            }`}
          >
            <p className="text-[#888888] text-xs mb-1">Всего</p>
            <p className="text-[#aac0a7]">{requests.length}</p>
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`p-3 rounded-lg border transition-all ${
              filterStatus === 'pending'
                ? 'bg-[#4a4a4a] border-[#aac0a7]'
                : 'bg-[#4a4a4a] border-[#4a4a4a] hover:border-[#636363]'
            }`}
          >
            <p className="text-[#888888] text-xs mb-1">Ожидают</p>
            <p className="text-[#ffd700]">{pendingCount}</p>
          </button>
          <button
            onClick={() => setFilterStatus('approved')}
            className={`p-3 rounded-lg border transition-all ${
              filterStatus === 'approved'
                ? 'bg-[#4a4a4a] border-[#aac0a7]'
                : 'bg-[#4a4a4a] border-[#4a4a4a] hover:border-[#636363]'
            }`}
          >
            <p className="text-[#888888] text-xs mb-1">Одобрено</p>
            <p className="text-[#4ade80]">{approvedCount}</p>
          </button>
          <button
            onClick={() => setFilterStatus('rejected')}
            className={`p-3 rounded-lg border transition-all ${
              filterStatus === 'rejected'
                ? 'bg-[#4a4a4a] border-[#aac0a7]'
                : 'bg-[#4a4a4a] border-[#4a4a4a] hover:border-[#636363]'
            }`}
          >
            <p className="text-[#888888] text-xs mb-1">Отклонено</p>
            <p className="text-[#ef4444]">{rejectedCount}</p>
          </button>
        </div>
      </div>

      {/* Requests List */}
      <div className="px-6 py-6 max-w-4xl mx-auto">
        {filteredRequests.length === 0 ? (
          <div className="bg-[#2a2a2a] rounded-xl p-8 border border-[#4a4a4a] text-center">
            <AlertCircle className="w-12 h-12 text-[#888888] mx-auto mb-4" />
            <p className="text-[#888888]">
              {filterStatus === 'pending' && 'Нет новых запросов на продление'}
              {filterStatus === 'approved' && 'Нет одобренных запросов'}
              {filterStatus === 'rejected' && 'Нет отклоненных запросов'}
              {filterStatus === 'all' && 'Нет запросов'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <Card
                key={request.id}
                className="bg-[#2a2a2a] border-[#4a4a4a] p-5 hover:border-[#aac0a7] transition-all"
              >
                <div className="flex gap-4">
                  {/* Book Cover */}
                  <div className="flex-shrink-0">
                    <img
                      src={request.bookCover}
                      alt={request.bookTitle}
                      className="w-20 h-28 object-cover rounded-lg"
                    />
                  </div>

                  {/* Request Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[#aac0a7] mb-1 truncate">{request.bookTitle}</h3>
                        <div className="flex items-center gap-2 text-sm text-[#888888] mb-2">
                          <User className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{request.userName}</span>
                          <span className="text-[#636363]">•</span>
                          <span className="truncate">{request.memberId}</span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          request.status === 'pending'
                            ? 'default'
                            : request.status === 'approved'
                            ? 'default'
                            : 'destructive'
                        }
                        className={
                          request.status === 'pending'
                            ? 'bg-[#ffd700] text-[#2a2a2a]'
                            : request.status === 'approved'
                            ? 'bg-[#4ade80] text-[#2a2a2a]'
                            : ''
                        }
                      >
                        {request.status === 'pending' && 'Ожидает'}
                        {request.status === 'approved' && 'Одобрено'}
                        {request.status === 'rejected' && 'Отклонено'}
                      </Badge>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-[#888888] flex-shrink-0" />
                        <div>
                          <p className="text-[#888888] text-xs">Текущий срок</p>
                          <p className="text-[#aac0a7]">
                            {new Date(request.currentDueDate).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-[#888888] flex-shrink-0" />
                        <div>
                          <p className="text-[#888888] text-xs">Запрос от</p>
                          <p className="text-[#aac0a7]">
                            {new Date(request.requestDate).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* New due date if approved */}
                    {request.status === 'approved' && (
                      <div className="mb-3 p-3 bg-[#4ade80]/10 rounded-lg border border-[#4ade80]/20">
                        <p className="text-xs text-[#888888] mb-1">Новый срок возврата</p>
                        <p className="text-[#4ade80]">
                          {calculateNewDueDate(request.currentDueDate)}
                        </p>
                      </div>
                    )}

                    {/* Reason */}
                    <div className="mb-3 p-3 bg-[#4a4a4a] rounded-lg">
                      <p className="text-xs text-[#888888] mb-1">Причина продления</p>
                      <p className="text-[#aac0a7] text-sm">{request.reason}</p>
                    </div>

                    {/* Action Buttons */}
                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(request)}
                          className="flex-1 bg-[#4ade80] hover:bg-[#4ade80]/80 text-[#2a2a2a]"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Одобрить
                        </Button>
                        <Button
                          onClick={() => handleReject(request)}
                          variant="destructive"
                          className="flex-1"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Отклонить
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <AlertDialogContent className="bg-[#2a2a2a] border-[#4a4a4a]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#aac0a7]">
              {actionType === 'approve' ? 'Одобрить запрос?' : 'Отклонить запрос?'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#888888]">
              {actionType === 'approve' ? (
                <>
                  Запрос на продление для читателя{' '}
                  <span className="text-[#aac0a7]">{selectedRequest?.userName}</span> будет
                  одобрен. Срок возврата книги{' '}
                  <span className="text-[#aac0a7]">"{selectedRequest?.bookTitle}"</span> будет
                  продлен на 14 дней.
                  <div className="mt-3 p-3 bg-[#4a4a4a] rounded-lg">
                    <p className="text-xs mb-1">Новый срок возврата:</p>
                    <p className="text-[#4ade80]">
                      {selectedRequest &&
                        calculateNewDueDate(selectedRequest.currentDueDate)}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  Вы собираетесь отклонить запрос на продление для читателя{' '}
                  <span className="text-[#aac0a7]">{selectedRequest?.userName}</span>. Читатель
                  будет уведомлен об отклонении.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#4a4a4a] border-[#636363] text-[#aac0a7] hover:bg-[#636363]">
              Отмена
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              className={
                actionType === 'approve'
                  ? 'bg-[#4ade80] hover:bg-[#4ade80]/80 text-[#2a2a2a]'
                  : 'bg-[#ef4444] hover:bg-[#ef4444]/80 text-white'
              }
            >
              {actionType === 'approve' ? 'Одобрить' : 'Отклонить'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
