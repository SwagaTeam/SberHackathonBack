import { useState } from 'react';
import { ArrowLeft, Check, X, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Badge } from './ui/badge';

interface BookedBook {
  id: string;
  title: string;
  author: string;
  cover: string;
}

interface BookingConfirmationProps {
  userData: {
    memberId: string;
    name: string;
    passport: string;
  };
  bookedBooks: BookedBook[];
  bookingExpiry: string;
  onConfirm: () => void;
  onReject: () => void;
  onBack: () => void;
}

export function BookingConfirmation({
  userData,
  bookedBooks,
  bookingExpiry,
  onConfirm,
  onReject,
  onBack,
}: BookingConfirmationProps) {
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(
    new Set(bookedBooks.map((b) => b.id))
  );

  const handleToggleBook = (id: string) => {
    const newSelected = new Set(selectedBooks);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedBooks(newSelected);
  };

  return (
    <div className="min-h-screen bg-[#636363] flex flex-col">
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
            <h1 className="text-[#aac0a7]">Подтверждение бронирования</h1>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4 text-[#888888]" />
              <p className="text-[#888888] text-sm">
                Действительно до: {new Date(bookingExpiry).toLocaleString('ru-RU')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* User Data Section */}
        <div className="bg-[#4a4a4a] px-6 py-6 border-b border-[#4a4a4a]">
          <h2 className="text-[#aac0a7] mb-4">Данные читателя</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-[#888888] text-sm">ФИО</Label>
              <p className="text-[#aac0a7]">{userData.name}</p>
            </div>
            <div>
              <Label className="text-[#888888] text-sm">Номер читательского билета</Label>
              <p className="text-[#aac0a7]">{userData.memberId}</p>
            </div>
            <div>
              <Label className="text-[#888888] text-sm">Паспортные данные</Label>
              <p className="text-[#aac0a7]">{userData.passport}</p>
            </div>
          </div>
        </div>

        {/* Booking Alert */}
        <div className="px-6 py-4 bg-[#4a4a4a] border-b border-[#4a4a4a]">
          <div className="bg-[#2a2a2a] rounded-lg p-4 border-l-4 border-[#aac0a7]">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#aac0a7] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#aac0a7] mb-1">Активное бронирование</p>
                <p className="text-[#888888] text-sm">
                  Читатель забронировал книги через приложение. Подтвердите выдачу или отклоните бронирование.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Book List Section */}
        <div className="px-6 py-6">
          <h2 className="text-[#aac0a7] mb-4">Забронированные книги</h2>

          <div className="space-y-3">
            {bookedBooks.map((book) => (
              <div
                key={book.id}
                className={`bg-[#2a2a2a] rounded-lg p-4 border transition-all cursor-pointer ${
                  selectedBooks.has(book.id)
                    ? 'border-[#aac0a7]'
                    : 'border-[#4a4a4a]'
                }`}
                onClick={() => handleToggleBook(book.id)}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-16 h-24 object-cover rounded border border-[#4a4a4a] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#aac0a7] mb-1">{book.title}</h3>
                    <p className="text-[#888888] text-sm mb-3">{book.author}</p>
                    {selectedBooks.has(book.id) ? (
                      <Badge className="bg-[#aac0a7] text-[#000000]">
                        <Check className="w-3 h-3 mr-1" />
                        К выдаче
                      </Badge>
                    ) : (
                      <Badge className="bg-[#4a4a4a] text-[#888888]">
                        <X className="w-3 h-3 mr-1" />
                        Исключено
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedBooks.size === 0 && (
            <div className="bg-[#4a4a4a] rounded-lg p-4 mt-4 border border-[#4a4a4a]">
              <p className="text-[#888888] text-center text-sm">
                Выберите хотя бы одну книгу для выдачи
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#2a2a2a] border-t border-[#4a4a4a] px-6 py-4">
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex gap-3">
            <Button
              onClick={onReject}
              variant="secondary"
              className="flex-1 bg-[#4a4a4a] text-[#aac0a7] hover:bg-[#636363] h-12"
            >
              <X className="w-5 h-5 mr-2" />
              Не выдавать
            </Button>
            <Button
              onClick={onConfirm}
              disabled={selectedBooks.size === 0}
              className="flex-1 bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2] h-12"
            >
              <Check className="w-5 h-5 mr-2" />
              Выдать книги ({selectedBooks.size})
            </Button>
          </div>
          <p className="text-[#888888] text-xs text-center">
            Бронирование будет автоматически отменено при отклонении
          </p>
        </div>
      </div>
    </div>
  );
}
