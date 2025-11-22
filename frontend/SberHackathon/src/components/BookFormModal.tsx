import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { type Book } from '../lib/mockData';

interface BookFormModalProps {
  book?: Book;
  onSave: (bookData: Partial<Book>) => void;
  onCancel: () => void;
}

export function BookFormModal({ book, onSave, onCancel }: BookFormModalProps) {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    genre: book?.genre || '',
    pages: book?.pages?.toString() || '',
    year: book?.year?.toString() || '',
    publisher: book?.publisher || '',
    language: book?.language || 'Russian',
    description: '',
    cover: book?.cover || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      pages: parseInt(formData.pages),
      year: parseInt(formData.year),
    });
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
            {book ? 'Редактировать книгу' : 'Добавить новую книгу'}
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
            <Label htmlFor="title" className="text-[#aac0a7]">
              Название <span className="text-[#d4183d]">*</span>
            </Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7]"
              placeholder="Введите название книги"
              required
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author" className="text-[#aac0a7]">
              Автор <span className="text-[#d4183d]">*</span>
            </Label>
            <Input
              id="author"
              type="text"
              value={formData.author}
              onChange={(e) => handleChange('author', e.target.value)}
              className="bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7]"
              placeholder="Введите имя автора"
              required
            />
          </div>

          {/* Genre and Language */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genre" className="text-[#aac0a7]">
                Жанр <span className="text-[#d4183d]">*</span>
              </Label>
              <Input
                id="genre"
                type="text"
                value={formData.genre}
                onChange={(e) => handleChange('genre', e.target.value)}
                className="bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7]"
                placeholder="Например: Fiction, История"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language" className="text-[#aac0a7]">
                Язык
              </Label>
              <Select value={formData.language} onValueChange={(value) => handleChange('language', value)}>
                <SelectTrigger className="bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#4a4a4a]">
                  <SelectItem value="Russian" className="text-[#aac0a7]">Русский</SelectItem>
                  <SelectItem value="English" className="text-[#aac0a7]">English</SelectItem>
                  <SelectItem value="Other" className="text-[#aac0a7]">Другой</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Publisher */}
          <div className="space-y-2">
            <Label htmlFor="publisher" className="text-[#aac0a7]">
              Издательство
            </Label>
            <Input
              id="publisher"
              type="text"
              value={formData.publisher}
              onChange={(e) => handleChange('publisher', e.target.value)}
              className="bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7]"
              placeholder="Название издательства"
            />
          </div>

          {/* Pages and Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pages" className="text-[#aac0a7]">
                Количество страниц
              </Label>
              <Input
                id="pages"
                type="number"
                value={formData.pages}
                onChange={(e) => handleChange('pages', e.target.value)}
                className="bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7]"
                placeholder="320"
                min="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year" className="text-[#aac0a7]">
                Год издания
              </Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => handleChange('year', e.target.value)}
                className="bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7]"
                placeholder="2024"
                min="1000"
                max="2100"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#aac0a7]">
              Описание
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7] min-h-[100px]"
              placeholder="Краткое описание книги..."
            />
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <Label htmlFor="cover" className="text-[#aac0a7]">
              Обложка
            </Label>
            <div className="flex gap-3">
              <Input
                id="cover"
                type="text"
                value={formData.cover}
                onChange={(e) => handleChange('cover', e.target.value)}
                className="flex-1 bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7]"
                placeholder="URL обложки"
              />
              <Button
                type="button"
                variant="secondary"
                className="bg-[#4a4a4a] text-[#aac0a7] hover:bg-[#636363]"
              >
                <Upload className="w-4 h-4 mr-2" />
                Загрузить
              </Button>
            </div>
            {formData.cover && (
              <div className="mt-3">
                <img
                  src={formData.cover}
                  alt="Preview"
                  className="w-24 h-32 object-cover rounded border border-[#4a4a4a]"
                />
              </div>
            )}
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
              {book ? 'Сохранить изменения' : 'Добавить книгу'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
