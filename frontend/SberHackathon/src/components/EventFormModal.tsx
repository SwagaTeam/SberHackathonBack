import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { type Event } from '../lib/mockData';

interface EventFormModalProps {
  event?: Event;
  onSave: (eventData: Partial<Event>) => void;
  onCancel: () => void;
}

export function EventFormModal({ event, onSave, onCancel }: EventFormModalProps) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    date: event?.date || '',
    time: event?.time || '',
    location: event?.location || '',
    description: event?.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#2a2a2a] rounded-xl border border-[#4a4a4a] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#4a4a4a] sticky top-0 bg-[#2a2a2a] z-10">
          <h2 className="text-[#aac0a7]">
            {event ? 'Редактировать мероприятие' : 'Создать новое мероприятие'}
          </h2>
          <button
            onClick={onCancel}
            className="text-[#888888] hover:text-[#aac0a7] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="event-title" className="text-[#aac0a7]">
              Название мероприятия <span className="text-[#d4183d]">*</span>
            </Label>
            <Input
              id="event-title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7]"
              placeholder="Введите название мероприятия"
              required
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event-date" className="text-[#aac0a7]">
                Дата <span className="text-[#d4183d]">*</span>
              </Label>
              <Input
                id="event-date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-time" className="text-[#aac0a7]">
                Время <span className="text-[#d4183d]">*</span>
              </Label>
              <Input
                id="event-time"
                type="text"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7]"
                placeholder="Например: 14:00 - 16:00"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="event-location" className="text-[#aac0a7]">
              Место прове��ения <span className="text-[#d4183d]">*</span>
            </Label>
            <Input
              id="event-location"
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7]"
              placeholder="Например: Главный зал"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="event-description" className="text-[#aac0a7]">
              Описание <span className="text-[#d4183d]">*</span>
            </Label>
            <Textarea
              id="event-description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7] min-h-[120px]"
              placeholder="Подробное описание мероприятия..."
              required
            />
          </div>

          {/* Additional Options */}
          <div className="bg-[#4a4a4a] rounded-lg p-4 space-y-3">
            <h3 className="text-[#aac0a7] text-sm">Дополнительные настройки</h3>
            <label className="flex items-center gap-2 text-[#888888] cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-[#636363] bg-[#636363] text-[#aac0a7] focus:ring-[#aac0a7] focus:ring-offset-0"
              />
              <span className="text-sm">Требуется регистрация</span>
            </label>
            <label className="flex items-center gap-2 text-[#888888] cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-[#636363] bg-[#636363] text-[#aac0a7] focus:ring-[#aac0a7] focus:ring-offset-0"
              />
              <span className="text-sm">Ограниченное количество мест</span>
            </label>
            <label className="flex items-center gap-2 text-[#888888] cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-[#636363] bg-[#636363] text-[#aac0a7] focus:ring-[#aac0a7] focus:ring-offset-0"
              />
              <span className="text-sm">Отправить уведомление читателям</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[#4a4a4a]">
            <Button
              type="button"
              onClick={onCancel}
              variant="secondary"
              className="flex-1 bg-[#4a4a4a] text-[#aac0a7] hover:bg-[#636363]"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]"
            >
              {event ? 'Сохранить изменения' : 'Создать мероприятие'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
