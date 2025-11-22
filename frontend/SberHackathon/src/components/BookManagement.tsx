import { useState } from 'react';
import { ArrowLeft, Plus, Upload, Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { mockBooks, type Book } from '../lib/mockData';

interface BookManagementProps {
  onBack: () => void;
  onAddBook: () => void;
  onEditBook: (book: Book) => void;
  onBulkImport: () => void;
}

export function BookManagement({ onBack, onAddBook, onEditBook, onBulkImport }: BookManagementProps) {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteBook = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#636363]">
      {/* Header */}
      <div className="bg-[#2a2a2a] border-b border-[#4a4a4a] px-6 py-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="text-[#aac0a7] hover:text-[#c5d4c2] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[#aac0a7]">Управление книгами</h1>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={onAddBook}
            className="bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить книгу
          </Button>
          <Button
            onClick={onBulkImport}
            variant="secondary"
            className="bg-[#4a4a4a] text-[#aac0a7] hover:bg-[#636363]"
          >
            <Upload className="w-4 h-4 mr-2" />
            Добавить из файла
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-[#4a4a4a] border-b border-[#4a4a4a] px-6 py-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888888]" />
          <Input
            type="text"
            placeholder="Поиск по названию, автору, жанру..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-[#636363] border-[#636363] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7]"
          />
        </div>
      </div>

      {/* Books Table */}
      <div className="px-6 py-6">
        <div className="bg-[#2a2a2a] rounded-lg border border-[#4a4a4a] overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 bg-[#4a4a4a] px-4 py-3 border-b border-[#4a4a4a]">
            <div className="col-span-3 text-[#888888] text-sm">Название</div>
            <div className="col-span-2 text-[#888888] text-sm">Автор</div>
            <div className="col-span-2 text-[#888888] text-sm">Жанр</div>
            <div className="col-span-2 text-[#888888] text-sm">Издатель</div>
            <div className="col-span-1 text-[#888888] text-sm">Год</div>
            <div className="col-span-1 text-[#888888] text-sm">Статус</div>
            <div className="col-span-1 text-[#888888] text-sm text-right">Действия</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#4a4a4a]">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-4 hover:bg-[#4a4a4a] transition-colors"
              >
                {/* Mobile/Desktop: Book Info */}
                <div className="col-span-1 md:col-span-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded border border-[#4a4a4a] flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[#aac0a7] line-clamp-2">{book.title}</p>
                      <p className="text-[#888888] text-sm md:hidden">{book.author}</p>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block md:col-span-2">
                  <p className="text-[#aac0a7]">{book.author}</p>
                </div>

                <div className="hidden md:block md:col-span-2">
                  <Badge className="bg-[#4a4a4a] text-[#aac0a7]">
                    {book.genre}
                  </Badge>
                </div>

                <div className="hidden md:block md:col-span-2">
                  <p className="text-[#888888] text-sm">{book.publisher}</p>
                </div>

                <div className="hidden md:block md:col-span-1">
                  <p className="text-[#888888] text-sm">{book.year}</p>
                </div>

                <div className="col-span-1 md:col-span-1">
                  {book.available ? (
                    <div className="flex items-center gap-1 text-[#aac0a7] text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span className="hidden md:inline">Доступно</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[#d4183d] text-sm">
                      <XCircle className="w-4 h-4" />
                      <span className="hidden md:inline">Выдано</span>
                    </div>
                  )}
                </div>

                <div className="col-span-1 md:col-span-1 flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEditBook(book)}
                    className="p-2 text-[#aac0a7] hover:bg-[#636363] rounded transition-colors"
                    title="Редактировать"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="p-2 text-[#d4183d] hover:bg-[#636363] rounded transition-colors"
                    title="Удалить"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#888888]">Книги не найдены</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 flex gap-4 flex-wrap">
          <div className="bg-[#4a4a4a] rounded-lg px-4 py-3 border border-[#4a4a4a]">
            <p className="text-[#888888] text-sm">Всего книг</p>
            <p className="text-[#aac0a7]">{books.length}</p>
          </div>
          <div className="bg-[#4a4a4a] rounded-lg px-4 py-3 border border-[#4a4a4a]">
            <p className="text-[#888888] text-sm">Доступно</p>
            <p className="text-[#aac0a7]">
              {books.filter((b) => b.available).length}
            </p>
          </div>
          <div className="bg-[#4a4a4a] rounded-lg px-4 py-3 border border-[#4a4a4a]">
            <p className="text-[#888888] text-sm">Выдано</p>
            <p className="text-[#aac0a7]">
              {books.filter((b) => !b.available).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
