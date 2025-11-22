import { ArrowLeft, Clock, BookOpen, Calendar, Globe, Building, ShoppingCart, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { type Book, type Review } from '../lib/mockData';
import { ReviewSection } from './ReviewSection';

interface BookDetailProps {
  book: Book;
  onBack: () => void;
  onReserve: () => void;
  onAddToCart: (book: Book) => void;
  isInCart: boolean;
  reviews: Review[];
  onAddReview: (bookId: string, rating: number, comment: string) => void;
}

export function BookDetail({ book, onBack, onReserve, onAddToCart, isInCart, reviews, onAddReview }: BookDetailProps) {
  return (
    <div className="min-h-screen bg-[#636363]">
      {/* Header */}
      <div className="bg-[#2a2a2a] border-b border-[#4a4a4a] px-6 py-4">
        <button
          onClick={onBack}
          className="text-[#aac0a7] hover:text-[#c5d4c2] transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Назад к каталогу</span>
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book Cover */}
          <div className="md:col-span-1">
            <div className="aspect-[2/3] rounded-lg overflow-hidden border border-[#4a4a4a] shadow-xl sticky top-8">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Book Info */}
          <div className="md:col-span-2">
            {/* Title and Author */}
            <div className="mb-6">
              <h1 className="text-[#aac0a7] mb-2">{book.title}</h1>
              <p className="text-[#888888] mb-4">Автор: {book.author}</p>
              <Badge
                className={`${
                  book.available
                    ? 'bg-[#aac0a7] text-[#000000]'
                    : 'bg-[#4a4a4a] text-[#888888]'
                }`}
              >
                {book.available ? 'Доступна' : 'Выдана'}
              </Badge>
            </div>

            {/* Book Details */}
            <div className="bg-[#2a2a2a] rounded-lg p-6 border border-[#4a4a4a] mb-6">
              <h2 className="text-[#aac0a7] mb-4">Информация о книге</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-[#888888] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#888888] text-sm">Жанр</p>
                    <p className="text-[#aac0a7]">{book.genre}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#888888] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#888888] text-sm">Год издания</p>
                    <p className="text-[#aac0a7]">{book.year}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-[#888888] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#888888] text-sm">Язык</p>
                    <p className="text-[#aac0a7]">{book.language}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-[#888888] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#888888] text-sm">Издательство</p>
                    <p className="text-[#aac0a7]">{book.publisher}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-[#888888] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#888888] text-sm">Страниц</p>
                    <p className="text-[#aac0a7]">{book.pages}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reservation Section */}
            {book.available && (
              <div className="bg-[#4a4a4a] rounded-lg p-6 border border-[#4a4a4a] mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#aac0a7] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#000000]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#aac0a7] mb-2">Бронирование на 1 час</h3>
                    <p className="text-[#888888] text-sm mb-4">
                      Добавьте книгу в корзину и забронируйте её для быстрого получения в библиотеке.
                      Бронирование действительно в течение 1 часа.
                    </p>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => onAddToCart(book)}
                        disabled={isInCart}
                        className={`flex-1 h-12 ${
                          isInCart
                            ? 'bg-[#636363] text-[#aac0a7] cursor-not-allowed'
                            : 'bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]'
                        }`}
                      >
                        {isInCart ? (
                          <>
                            <Check className="w-5 h-5 mr-2" />
                            В корзине
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Добавить в корзину
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#636363] rounded-lg p-4">
                  <p className="text-[#888888] text-xs">
                    <strong className="text-[#aac0a7]">Как это работает:</strong><br />
                    1. Добавьте книгу в корзину<br />
                    2. Подтвердите бронирование всех книг<br />
                    3. Получите QR-код для каждой книги<br />
                    4. Покажите код сотруднику библиотеки в течение 1 часа<br />
                    5. Заберите книгу
                  </p>
                </div>
              </div>
            )}

            {!book.available && (
              <div className="bg-[#4a4a4a] rounded-lg p-6 border border-[#4a4a4a]">
                <p className="text-[#888888] text-center">
                  Эта книга сейчас недоступна. Ожидаемая дата возврата: 15 декабря 2025
                </p>
              </div>
            )}

            {/* Description */}
            <div className="bg-[#2a2a2a] rounded-lg p-6 border border-[#4a4a4a] mb-6">
              <h3 className="text-[#aac0a7] mb-3">Описание</h3>
              <p className="text-[#888888] text-sm leading-relaxed">
                Захватывающее литературное произведение, которое заслуживает внимания каждого читателя.
                Эта книга предлагает уникальный взгляд на тему и раскрывает её через призму мастерского
                повествования автора. Идеально подходит как для увлечённых читателей, так и для тех,
                кто только начинает знакомство с произведениями {book.author}.
              </p>
            </div>

            {/* Reviews Section */}
            <ReviewSection
              bookId={book.id}
              reviews={reviews}
              onAddReview={onAddReview}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
