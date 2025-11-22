import { ArrowLeft, ShoppingCart, Trash2, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { type Book } from '../lib/mockData';
import { useState } from 'react';

interface BookCartProps {
  books: Book[];
  onBack: () => void;
  onRemoveBook: (bookId: string) => void;
  onConfirmBooking: () => void;
}

export function BookCart({ books, onBack, onRemoveBook, onConfirmBooking }: BookCartProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      onConfirmBooking();
      setIsConfirming(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#636363]">
      {/* Header */}
      <div className="bg-[#2a2a2a] border-b border-[#4a4a4a] px-6 py-4">
        <button
          onClick={onBack}
          className="text-[#aac0a7] hover:text-[#c5d4c2] transition-colors flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Назад</span>
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#aac0a7] flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-[#000000]" />
            </div>
            <div>
              <h1 className="text-[#aac0a7]">Моя корзина</h1>
              <p className="text-sm text-[#888888]">
                {books.length} {books.length === 1 ? 'книга' : books.length < 5 ? 'книги' : 'книг'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {books.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <div className="w-24 h-24 rounded-full bg-[#4a4a4a] flex items-center justify-center mb-6">
            <ShoppingCart className="w-12 h-12 text-[#888888]" />
          </div>
          <h2 className="text-xl text-[#aac0a7] mb-3">Корзина пуста</h2>
          <p className="text-[#888888] text-center mb-6 max-w-sm">
            Добавьте книги из каталога, чтобы забронировать их для получения в библиотеке
          </p>
          <Button
            onClick={onBack}
            className="bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]"
          >
            Перейти в каталог
          </Button>
        </div>
      )}

      {/* Book List */}
      {books.length > 0 && (
        <div className="px-6 py-6 pb-32">
          {/* Booking Info */}
          <div className="bg-[#4a4a4a] rounded-lg p-5 mb-6 border border-[#636363]">
            <div className="flex items-start gap-3 mb-4">
              <Clock className="w-5 h-5 text-[#aac0a7] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[#aac0a7] mb-1">Бронирование на 1 час</h3>
                <p className="text-sm text-[#888888]">
                  После подтверждения у вас будет 1 час, чтобы забрать книги
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#aac0a7] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[#aac0a7] mb-1">Пункт выдачи</h3>
                <p className="text-sm text-[#888888]">
                  Городская библиотека #14, стойка информации
                </p>
              </div>
            </div>
          </div>

          {/* Books */}
          <div className="space-y-4">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-[#2a2a2a] rounded-lg overflow-hidden border border-[#4a4a4a] hover:border-[#aac0a7] transition-colors"
              >
                <div className="flex gap-4 p-4">
                  {/* Book Cover */}
                  <div className="w-20 h-28 flex-shrink-0 rounded overflow-hidden">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Book Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#aac0a7] mb-1 line-clamp-2">{book.title}</h3>
                    <p className="text-sm text-[#888888] mb-2">{book.author}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="text-xs bg-[#636363] text-[#aac0a7]">
                        {book.genre}
                      </Badge>
                      <Badge className="text-xs bg-[#aac0a7] text-[#000000]">
                        {book.year}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#888888]">{book.pages} стр.</p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveBook(book.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#4a4a4a] hover:bg-[#636363] transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-5 h-5 text-[#888888] hover:text-[#aac0a7]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-[#2a2a2a] rounded-lg p-5 mt-6 border border-[#4a4a4a]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#888888]">Всего книг:</span>
              <span className="text-[#aac0a7]">{books.length}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#888888]">Срок бронирования:</span>
              <span className="text-[#aac0a7]">1 час</span>
            </div>
            <div className="border-t border-[#4a4a4a] pt-4 mb-4">
              <p className="text-xs text-[#888888] mb-3">
                <strong className="text-[#aac0a7]">Как это работает:</strong><br />
                1. Подтвердите бронирование книг<br />
                2. Получите QR-код для каждой книги<br />
                3. Покажите QR-коды сотруднику библиотеки<br />
                4. Заберите свои книги в течение 1 часа
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Button */}
      {books.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 bg-[#4a4a4a] border-t border-[#636363] p-4 safe-area-inset-bottom">
          <div className="max-w-md mx-auto">
            <Button
              onClick={handleConfirm}
              disabled={isConfirming}
              className="w-full bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2] h-14"
            >
              {isConfirming ? (
                <>
                  <Clock className="w-5 h-5 mr-2 animate-spin" />
                  Подтверждение...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Подтвердить бронирование ({books.length})
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
