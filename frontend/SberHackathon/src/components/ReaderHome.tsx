import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { mockUser, mockBooks, mockEvents } from '../lib/mockData';
import QRCode from 'react-qr-code';

export function ReaderHome() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const recommendedBooks = mockBooks.slice(0, 4);
  const upcomingEvents = mockEvents.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#636363]">
      {/* Header */}
      <div className="bg-[#636363] border-b border-[#4a4a4a] px-6 py-4">
        <p className="text-[#888888] text-sm">Welcome back,</p>
        <h1 className="text-[#aac0a7]">{mockUser.name}</h1>
      </div>

      {/* QR Code Section */}
      <div className="bg-[#4a4a4a] px-6 py-10 border-b border-[#4a4a4a]">
        <div className="text-center">
          <p className="text-[#aac0a7] text-sm mb-4 uppercase tracking-wide">Your Library Pass</p>
          <div className="bg-[#2a2a2a] rounded-lg p-6 inline-block shadow-lg">
            <QRCode value={mockUser.memberId} size={200} />
          </div>
          <p className="text-[#888888] text-xs mt-4 tracking-wide">ID: {mockUser.memberId}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-6 bg-[#636363] border-b border-[#4a4a4a]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888888]" />
          <Input
            type="text"
            placeholder="Search books, authors, genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-[#4a4a4a] border-[#4a4a4a] rounded-lg text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7]"
          />
        </div>
      </div>

      {/* Recommended Books */}
      <div className="px-6 py-6 bg-[#636363]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#aac0a7]">Recommended for You</h2>
          <button className="text-[#aac0a7] text-sm flex items-center gap-1 hover:text-[#c5d4c2] transition-colors">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          {recommendedBooks.map((book) => (
            <div key={book.id} className="flex-shrink-0 w-32">
              <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2 border border-[#4a4a4a] shadow-md">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-[#aac0a7] line-clamp-2 mb-1">{book.title}</p>
              <p className="text-xs text-[#888888]">{book.author}</p>
              <Badge
                variant={book.available ? 'default' : 'secondary'}
                className={`mt-2 text-xs ${
                  book.available 
                    ? 'bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]' 
                    : 'bg-[#4a4a4a] text-[#888888]'
                }`}
              >
                {book.available ? 'Available' : 'Checked Out'}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="px-6 py-6 bg-[#4a4a4a] border-t border-[#4a4a4a]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#aac0a7]">Upcoming Events</h2>
          <button className="text-[#aac0a7] text-sm flex items-center gap-1 hover:text-[#c5d4c2] transition-colors">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-[#2a2a2a] rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-[#aac0a7] rounded-lg px-3 py-2 text-center">
                  <p className="text-[#000000] text-xs uppercase">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </p>
                  <p className="text-[#000000]">
                    {new Date(event.date).getDate()}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#aac0a7] mb-1">{event.title}</h3>
                  <p className="text-sm text-[#888888] mb-3">{event.time}</p>
                  <Button
                    size="sm"
                    variant={event.isRegistered ? 'secondary' : 'default'}
                    className={`h-8 ${
                      event.isRegistered 
                        ? 'bg-[#4a4a4a] text-[#888888]' 
                        : 'bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]'
                    }`}
                  >
                    {event.isRegistered ? 'Registered' : 'Register'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}