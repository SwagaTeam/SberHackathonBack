import { CheckCircle2, Clock, Home } from 'lucide-react';
import { Button } from './ui/button';
import QRCode from 'react-qr-code';
import { type Book } from '../lib/mockData';

interface ReservationSuccessProps {
  book: Book;
  reservationId: string;
  expiryTime: string;
  onDone: () => void;
}

export function ReservationSuccess({
  book,
  reservationId,
  expiryTime,
  onDone,
}: ReservationSuccessProps) {
  return (
    <div className="min-h-screen bg-[#636363] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#aac0a7] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-[#000000]" />
          </div>
          <h1 className="text-[#aac0a7] mb-2">Бронирование подтверждено!</h1>
          <p className="text-[#888888]">Книга зарезервирована для вас</p>
        </div>

        {/* Book Info */}
        <div className="bg-[#2a2a2a] rounded-xl p-4 border border-[#4a4a4a] mb-6">
          <div className="flex gap-4">
            <img
              src={book.cover}
              alt={book.title}
              className="w-20 h-28 object-cover rounded border border-[#4a4a4a] flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-[#aac0a7] mb-1 line-clamp-2">{book.title}</h3>
              <p className="text-[#888888] text-sm mb-2">{book.author}</p>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-[#888888]" />
                <span className="text-[#888888]">До: {expiryTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="bg-[#2a2a2a] rounded-xl p-8 border border-[#4a4a4a] mb-6">
          <p className="text-[#aac0a7] text-center mb-6">
            Покажите этот QR-код сотруднику для получения книг
          </p>
          <div className="bg-[#ffffff] rounded-lg p-6 inline-block w-full">
            <div className="flex justify-center">
              <QRCode value={reservationId} size={220} />
            </div>
          </div>
          <p className="text-[#888888] text-xs text-center mt-4 tracking-wide">
            ID бронирования: {reservationId}
          </p>
        </div>

        {/* Important Info */}
        <div className="bg-[#4a4a4a] rounded-lg p-4 border-l-4 border-[#aac0a7] mb-6">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#aac0a7] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-[#aac0a7] mb-2">Важно!</h3>
              <p className="text-[#888888] text-sm">
                Бронь действительна 1 час. После истечения срока книга станет доступна другим читателям.
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-[#2a2a2a] rounded-lg p-6 border border-[#4a4a4a] mb-6">
          <h3 className="text-[#aac0a7] mb-4">Как получить книгу</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#aac0a7] flex items-center justify-center flex-shrink-0 text-[#000000] text-xs">
                1
              </div>
              <p className="text-[#888888] text-sm">
                Приходите в библиотеку в течение 1 часа
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#aac0a7] flex items-center justify-center flex-shrink-0 text-[#000000] text-xs">
                2
              </div>
              <p className="text-[#888888] text-sm">
                Покажите QR-код сотруднику на стойке выдачи
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#aac0a7] flex items-center justify-center flex-shrink-0 text-[#000000] text-xs">
                3
              </div>
              <p className="text-[#888888] text-sm">
                Предъявите паспорт или читательский билет
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#aac0a7] flex items-center justify-center flex-shrink-0 text-[#000000] text-xs">
                4
              </div>
              <p className="text-[#888888] text-sm">
                Получите книгу и наслаждайтесь чтением!
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={onDone}
          className="w-full bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2] h-12"
        >
          <Home className="w-5 h-5 mr-2" />
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
}
