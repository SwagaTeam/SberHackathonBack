import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { type Loan } from '../lib/mockData';

interface RenewalRequestModalProps {
  loan: Loan | null;
  onClose: () => void;
  onSubmit: (requestedDate: string, reason: string) => void;
}

export function RenewalRequestModal({ loan, onClose, onSubmit }: RenewalRequestModalProps) {
  const [requestedDate, setRequestedDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (requestedDate && reason.trim()) {
      onSubmit(requestedDate, reason);
      setRequestedDate('');
      setReason('');
      onClose();
    }
  };

  // Calculate minimum date (current due date + 1 day)
  const minDate = loan ? new Date(loan.dueDate) : new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateString = minDate.toISOString().split('T')[0];

  // Calculate maximum date (current due date + 30 days)
  const maxDate = loan ? new Date(loan.dueDate) : new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <Dialog open={!!loan} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#2a2a2a] border-[#4a4a4a] text-[#aac0a7]">
        <DialogHeader>
          <DialogTitle className="text-[#aac0a7]">Запрос на продление аренды</DialogTitle>
          <DialogDescription className="text-[#888888]">
            {loan && (
              <>
                Вы запрашиваете продление аренды книги{' '}
                <span className="text-[#aac0a7]">"{loan.bookTitle}"</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Current Due Date */}
          {loan && (
            <div className="p-3 bg-[#4a4a4a] rounded-lg">
              <p className="text-xs text-[#888888] mb-1">Текущий срок возврата</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#aac0a7]" />
                <span className="text-[#aac0a7]">
                  {new Date(loan.dueDate).toLocaleDateString('ru-RU')}
                </span>
              </div>
            </div>
          )}

          {/* Requested Date */}
          <div className="space-y-2">
            <Label htmlFor="requested-date" className="text-[#aac0a7]">
              Желаемая дата возврата *
            </Label>
            <input
              id="requested-date"
              type="date"
              value={requestedDate}
              onChange={(e) => setRequestedDate(e.target.value)}
              min={minDateString}
              max={maxDateString}
              className="w-full px-3 py-2 bg-[#4a4a4a] border border-[#636363] rounded-lg text-[#aac0a7] focus:outline-none focus:ring-2 focus:ring-[#aac0a7]"
            />
            <p className="text-xs text-[#888888]">
              Вы можете продлить аренду на срок до 30 дней
            </p>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-[#aac0a7]">
              Причина продления *
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Укажите причину запроса на продление..."
              className="bg-[#4a4a4a] border-[#636363] text-[#aac0a7] placeholder:text-[#888888] min-h-[100px] resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#636363] text-[#aac0a7] hover:bg-[#4a4a4a]"
          >
            Отмена
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!requestedDate || !reason.trim()}
            className="bg-[#aac0a7] text-[#2a2a2a] hover:bg-[#8fa88d]"
          >
            Отправить запрос
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
