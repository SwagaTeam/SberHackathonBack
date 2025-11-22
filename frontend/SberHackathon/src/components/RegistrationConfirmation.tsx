import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

interface Book {
  id: string;
  title: string;
  author: string;
  quantity: number;
  selected: boolean;
}

interface RegistrationConfirmationProps {
  userData: {
    memberId: string;
    name: string;
    passport: string;
  };
  onConfirm: (books: Book[]) => void;
  onReject: () => void;
  onBack: () => void;
}

export function RegistrationConfirmation({
  userData,
  onConfirm,
  onReject,
  onBack,
}: RegistrationConfirmationProps) {
  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      title: 'Война и мир',
      author: 'Лев Толстой',
      quantity: 1,
      selected: true,
    },
    {
      id: '2',
      title: 'Преступление и наказание',
      author: 'Федор Достоевский',
      quantity: 1,
      selected: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleBook = (id: string) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, selected: !book.selected } : book
    ));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0 && quantity <= 10) {
      setBooks(books.map(book => 
        book.id === id ? { ...book, quantity } : book
      ));
    }
  };

  const handleRemoveBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const handleAddBook = () => {
    // Mock add book - in production, this would search the catalog
    if (searchQuery) {
      const newBook: Book = {
        id: Date.now().toString(),
        title: searchQuery,
        author: 'Автор неизвестен',
        quantity: 1,
        selected: true,
      };
      setBooks([...books, newBook]);
      setSearchQuery('');
    }
  };

  const selectedBooks = books.filter(book => book.selected);

  return (
    <div className="min-h-screen bg-[#636363] flex flex-col">
      {/* Header */}
      <div className="bg-[#2a2a2a] border-b border-[#4a4a4a] px-6 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-[#aac0a7] hover:text-[#c5d4c2] transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[#aac0a7]">Подтверждение регистрации</h1>
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

        {/* Book List Section */}
        <div className="px-6 py-6">
          <h2 className="text-[#aac0a7] mb-4">Книги к выдаче</h2>

          {/* Add Book */}
          <div className="bg-[#2a2a2a] rounded-lg p-4 mb-4 border border-[#4a4a4a]">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Поиск книги для добавления..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7]"
              />
              <Button
                onClick={handleAddBook}
                disabled={!searchQuery}
                className="bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]"
              >
                <Plus className="w-5 h-5 mr-1" />
                Добавить
              </Button>
            </div>
          </div>

          {/* Books List */}
          <div className="space-y-3">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-[#2a2a2a] rounded-lg p-4 border border-[#4a4a4a]"
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={book.selected}
                    onCheckedChange={() => handleToggleBook(book.id)}
                    className="mt-1 border-[#4a4a4a] data-[state=checked]:bg-[#aac0a7] data-[state=checked]:border-[#aac0a7]"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#aac0a7] mb-1">{book.title}</h3>
                    <p className="text-[#888888] text-sm mb-3">{book.author}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label className="text-[#888888] text-sm">Количество:</Label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(book.id, book.quantity - 1)}
                            className="w-8 h-8 rounded bg-[#4a4a4a] text-[#aac0a7] hover:bg-[#636363] transition-colors"
                            disabled={book.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="text-[#aac0a7] w-8 text-center">{book.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(book.id, book.quantity + 1)}
                            className="w-8 h-8 rounded bg-[#4a4a4a] text-[#aac0a7] hover:bg-[#636363] transition-colors"
                            disabled={book.quantity >= 10}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveBook(book.id)}
                        className="text-[#d4183d] hover:text-[#ff1744] transition-colors ml-auto"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {books.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#888888]">Книги не добавлены</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#2a2a2a] border-t border-[#4a4a4a] px-6 py-4">
        <div className="max-w-md mx-auto flex gap-3">
          <Button
            onClick={onReject}
            variant="secondary"
            className="flex-1 bg-[#4a4a4a] text-[#aac0a7] hover:bg-[#636363] h-12"
          >
            <X className="w-5 h-5 mr-2" />
            Отклонить
          </Button>
          <Button
            onClick={() => onConfirm(selectedBooks)}
            disabled={selectedBooks.length === 0}
            className="flex-1 bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2] h-12"
          >
            <Check className="w-5 h-5 mr-2" />
            Подтвердить и выдать
          </Button>
        </div>
      </div>
    </div>
  );
}
