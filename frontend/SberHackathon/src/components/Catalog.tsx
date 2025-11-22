import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { mockBooks, type Book } from '../lib/mockData';
import { FilterModal, type FilterOptions } from './FilterModal';

interface CatalogProps {
  onBookClick: (book: Book) => void;
}

export function Catalog({ onBookClick }: CatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState('all');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FilterOptions>({
    genres: [],
    pagesMin: 0,
    pagesMax: 1000,
    yearMin: 1900,
    yearMax: new Date().getFullYear(),
    languages: [],
    publishers: [],
  });

  // Get unique values for filter options
  const availableGenres = Array.from(new Set(mockBooks.map((book) => book.genre)));
  const availableLanguages = Array.from(new Set(mockBooks.map((book) => book.language)));
  const availablePublishers = Array.from(new Set(mockBooks.map((book) => book.publisher)));

  const filteredBooks = mockBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterTab === 'all' ||
      (filterTab === 'available' && book.available) ||
      (filterTab === 'fiction' && book.genre === 'Fiction') ||
      (filterTab === 'nonfiction' && book.genre !== 'Fiction');

    // Advanced filters
    const matchesGenre =
      advancedFilters.genres.length === 0 ||
      advancedFilters.genres.includes(book.genre);

    const matchesPages =
      book.pages >= advancedFilters.pagesMin &&
      book.pages <= advancedFilters.pagesMax;

    const matchesYear =
      book.year >= advancedFilters.yearMin &&
      book.year <= advancedFilters.yearMax;

    const matchesLanguage =
      advancedFilters.languages.length === 0 ||
      advancedFilters.languages.includes(book.language);

    const matchesPublisher =
      advancedFilters.publishers.length === 0 ||
      advancedFilters.publishers.includes(book.publisher);

    return (
      matchesSearch &&
      matchesFilter &&
      matchesGenre &&
      matchesPages &&
      matchesYear &&
      matchesLanguage &&
      matchesPublisher
    );
  });

  return (
    <div className="min-h-screen bg-[#636363]">
      {/* Header */}
      <div className="bg-[#636363] border-b border-[#4a4a4a] px-6 py-4">
        <h1 className="text-[#aac0a7]">Catalog</h1>
      </div>

      {/* Search Bar */}
      <div className="bg-[#4a4a4a] px-6 py-4 border-b border-[#4a4a4a]">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888888]" />
          <Input
            type="text"
            placeholder="Search books, authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-[#636363] border-[#4a4a4a] rounded-lg text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <Tabs value={filterTab} onValueChange={setFilterTab} className="flex-1">
            <TabsList className="w-full grid grid-cols-4 h-10 bg-[#636363] border border-[#4a4a4a]">
              <TabsTrigger
                value="all"
                className="text-xs text-[#888888] data-[state=active]:bg-[#aac0a7] data-[state=active]:text-[#000000]"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="available"
                className="text-xs text-[#888888] data-[state=active]:bg-[#aac0a7] data-[state=active]:text-[#000000]"
              >
                Available
              </TabsTrigger>
              <TabsTrigger
                value="fiction"
                className="text-xs text-[#888888] data-[state=active]:bg-[#aac0a7] data-[state=active]:text-[#000000]"
              >
                Fiction
              </TabsTrigger>
              <TabsTrigger
                value="nonfiction"
                className="text-xs text-[#888888] data-[state=active]:bg-[#aac0a7] data-[state=active]:text-[#000000]"
              >
                Non-Fiction
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            variant="outline"
            size="icon"
            className="flex-shrink-0 h-10 w-10 border-[#4a4a4a] bg-[#636363] text-[#aac0a7] hover:bg-[#4a4a4a]"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Book Grid */}
      <div className="px-6 py-6">
        <p className="text-sm text-[#aac0a7] mb-4">
          {filteredBooks.length} {filteredBooks.length === 1 ? 'result' : 'results'} found
        </p>

        <div className="grid grid-cols-2 gap-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-[#2a2a2a] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onBookClick(book)}
            >
              <div className="aspect-[2/3] overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <Badge
                  variant={book.available ? 'default' : 'secondary'}
                  className={`mb-2 text-xs ${
                    book.available 
                      ? 'bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]' 
                      : 'bg-[#4a4a4a] text-[#888888]'
                  }`}
                >
                  {book.available ? 'Available' : 'Checked Out'}
                </Badge>
                <h3 className="text-sm text-[#aac0a7] line-clamp-2 mb-1">{book.title}</h3>
                <p className="text-xs text-[#888888] mb-2">{book.author}</p>
                <p className="text-xs text-[#888888]">{book.genre}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#888888]">No books found matching your search.</p>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={advancedFilters}
        onApply={setAdvancedFilters}
        availableGenres={availableGenres}
        availableLanguages={availableLanguages}
        availablePublishers={availablePublishers}
      />
    </div>
  );
}
