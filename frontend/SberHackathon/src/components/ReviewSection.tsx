import { useState } from 'react';
import { Star, MessageSquare, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import type { Review } from '../lib/mockData';

interface ReviewSectionProps {
  bookId: string;
  reviews: Review[];
  onAddReview: (bookId: string, rating: number, comment: string) => void;
}

export function ReviewSection({ bookId, reviews, onAddReview }: ReviewSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bookReviews = reviews.filter((r) => r.bookId === bookId);
  const averageRating = bookReviews.length > 0
    ? (bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length).toFixed(1)
    : '0.0';

  const handleSubmit = () => {
    if (rating === 0 || comment.trim() === '') {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onAddReview(bookId, rating, comment);
      setRating(0);
      setComment('');
      setShowReviewForm(false);
      setIsSubmitting(false);
    }, 500);
  };

  const renderStars = (count: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && setRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'} transition-colors`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= (interactive ? (hoverRating || rating) : count)
                  ? 'fill-[#aac0a7] text-[#aac0a7]'
                  : 'fill-none text-[#888888]'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-[#2a2a2a] rounded-lg p-6 border border-[#4a4a4a]">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-[#aac0a7] mb-2">Отзывы читателей</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {renderStars(Math.round(parseFloat(averageRating)))}
              <span className="text-[#aac0a7]">{averageRating}</span>
            </div>
            <span className="text-[#888888] text-sm">
              ({bookReviews.length} {bookReviews.length === 1 ? 'отзыв' : bookReviews.length < 5 ? 'отзыва' : 'отзывов'})
            </span>
          </div>
        </div>
        <Button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Написать отзыв
        </Button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-[#4a4a4a] rounded-lg p-5 mb-6 border border-[#636363]">
          <h4 className="text-[#aac0a7] mb-4">Ваш отзыв</h4>
          
          {/* Rating Input */}
          <div className="mb-4">
            <label className="text-sm text-[#888888] mb-2 block">
              Оценка *
            </label>
            {renderStars(rating, true)}
            {rating === 0 && (
              <p className="text-xs text-[#888888] mt-1">Выберите оценку от 1 до 5 звёзд</p>
            )}
          </div>

          {/* Comment Input */}
          <div className="mb-4">
            <label className="text-sm text-[#888888] mb-2 block">
              Комментарий *
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Поделитесь своим мнением о книге..."
              className="min-h-[120px] bg-[#636363] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] resize-none"
              maxLength={500}
            />
            <p className="text-xs text-[#888888] mt-1">
              {comment.length}/500 символов
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={rating === 0 || comment.trim() === '' || isSubmitting}
              className="flex-1 bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2] disabled:bg-[#636363] disabled:text-[#888888]"
            >
              {isSubmitting ? (
                'Отправка...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Опубликовать
                </>
              )}
            </Button>
            <Button
              onClick={() => {
                setShowReviewForm(false);
                setRating(0);
                setComment('');
              }}
              className="bg-[#636363] text-[#888888] hover:bg-[#4a4a4a]"
            >
              Отмена
            </Button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {bookReviews.length === 0 && !showReviewForm && (
        <div className="text-center py-8">
          <MessageSquare className="w-12 h-12 text-[#888888] mx-auto mb-3" />
          <p className="text-[#888888]">Пока нет отзывов</p>
          <p className="text-sm text-[#888888] mt-1">
            Станьте первым, кто поделится мнением об этой книге
          </p>
        </div>
      )}

      <div className="space-y-4">
        {bookReviews.map((review) => (
          <div
            key={review.id}
            className="bg-[#4a4a4a] rounded-lg p-5 border border-[#636363]"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#aac0a7] flex items-center justify-center">
                  <span className="text-[#000000]">
                    {review.userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-[#aac0a7]">{review.userName}</p>
                  <p className="text-xs text-[#888888]">{formatDate(review.date)}</p>
                </div>
              </div>
              <Badge className="bg-[#aac0a7] text-[#000000]">
                {review.rating} ★
              </Badge>
            </div>

            {/* Rating Stars */}
            <div className="mb-3">
              {renderStars(review.rating)}
            </div>

            {/* Review Comment */}
            <p className="text-[#888888] text-sm leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}