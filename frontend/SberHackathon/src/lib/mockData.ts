export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  available: boolean;
  genre: string;
  pages: number;
  year: number;
  publisher: string;
  language: string;
}

export interface Review {
  id: string;
  bookId: string;
  userName: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: string[];
  isRegistered: boolean;
}

export interface Loan {
  id: string;
  bookId: string;
  bookTitle: string;
  bookCover: string;
  dueDate: string;
  renewed: boolean;
}

export interface RenewalRequest {
  id: string;
  loanId: string;
  bookId: string;
  bookTitle: string;
  bookCover: string;
  userId: string;
  userName: string;
  memberId: string;
  currentDueDate: string;
  requestedDate: string;
  requestDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface User {
  id: string;
  name: string;
  memberId: string;
  email: string;
  fines: number;
}

export const mockUser: User = {
  id: '1',
  name: 'Sarah Mitchell',
  memberId: 'LIB14-2024-5892',
  email: 'sarah.mitchell@email.com',
  fines: 0,
};

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: 'https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBtb2RrbiJTIwZmWN0aW9ufGVufDF8fHx8MTc2MzU3MDczMXww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    genre: 'Fiction',
    pages: 304,
    year: 2020,
    publisher: 'Penguin Books',
    language: 'English',
  },
  {
    id: '2',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    cover: 'https://images.unsplash.com/photo-1748712576539-d40bab99b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBzY2llbmNlJTIwZmFudGFzeXxlbnwxfHx8fDE3NjM2NDk4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    genre: 'Science Fiction',
    pages: 384,
    year: 2021,
    publisher: 'Ballantine Books',
    language: 'English',
  },
  {
    id: '3',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    cover: 'https://images.unsplash.com/photo-1760696473709-a7da66ee87a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBteXN0ZXJ5JTIwdGhyaWxsZXJ8ZW58MXx8fHwxNzYzNjQ5ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: false,
    genre: 'Mystery',
    pages: 352,
    year: 2018,
    publisher: 'Celadon Books',
    language: 'English',
  },
  {
    id: '4',
    title: 'Educated',
    author: 'Tara Westover',
    cover: 'https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBjbGFzc2ljJTIwbGl0ZXJhdHVyZXxlbnwxfHx8fDE3NjM2MDA2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    genre: 'Biography',
    pages: 464,
    year: 2018,
    publisher: 'Random House',
    language: 'English',
  },
  {
    id: '5',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    cover: 'https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBtb2RrbiJTIwZmWN0aW9ufGVufDF8fHx8MTc2MzU3MDczMXww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    genre: 'Fiction',
    pages: 368,
    year: 2018,
    publisher: 'William Morrow',
    language: 'English',
  },
  {
    id: '6',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.unsplash.com/photo-1748712576539-d40bab99b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBzY2llbmNlJTIwZmFudGFzeXxlbnwxfHx8fDE3NjM2NDk4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    available: false,
    genre: 'Self-Help',
    pages: 320,
    year: 2018,
    publisher: 'Penguin Books',
    language: 'English',
  },
  {
    id: '7',
    title: '1984',
    author: 'George Orwell',
    cover: 'https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBtb2RrbiJTIwZmWN0aW9ufGVufDF8fHx8MTc2MzU3MDczMXww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    genre: 'Dystopian',
    pages: 328,
    year: 1949,
    publisher: 'Secker & Warburg',
    language: 'English',
  },
  {
    id: '8',
    title: 'Война и мир',
    author: 'Лев Толстой',
    cover: 'https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBjbGFzc2ljJTIwbGl0ZXJhdHVyZXxlbnwxfHx8fDE3NjM2MDA2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    genre: 'Historical Fiction',
    pages: 1225,
    year: 1869,
    publisher: 'The Russian Messenger',
    language: 'Russian',
  },
  {
    id: '9',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    cover: 'https://images.unsplash.com/photo-1760696473709-a7da66ee87a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBteXN0ZXJ5JTIwdGhyaWxsZXJ8ZW58MXx8fHwxNzYzNjQ5ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    genre: 'History',
    pages: 443,
    year: 2011,
    publisher: 'Harper',
    language: 'English',
  },
  {
    id: '10',
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    cover: 'https://images.unsplash.com/photo-1748712576539-d40bab99b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBzY2llbmNlJTIwZmFudGFzeXxlbnwxfHx8fDE3NjM2NDk4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    available: false,
    genre: 'Fantasy',
    pages: 223,
    year: 1997,
    publisher: 'Bloomsbury',
    language: 'English',
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    bookId: '1',
    userName: 'John Doe',
    userId: '2',
    rating: 5,
    comment: 'A beautifully written and thought-provoking book. Highly recommend!',
    date: '2025-10-10',
  },
  {
    id: '2',
    bookId: '2',
    userName: 'Jane Smith',
    userId: '3',
    rating: 4,
    comment: 'An engaging and thrilling science fiction novel. Loved the plot!',
    date: '2025-11-15',
  },
  {
    id: '3',
    bookId: '3',
    userName: 'Mike Johnson',
    userId: '4',
    rating: 3,
    comment: 'A bit slow-paced, but still an interesting mystery.',
    date: '2025-11-20',
  },
  {
    id: '4',
    bookId: '4',
    userName: 'Emily Brown',
    userId: '5',
    rating: 5,
    comment: 'Inspirational and well-researched biography. A must-read!',
    date: '2025-11-25',
  },
  {
    id: '5',
    bookId: '5',
    userName: 'Sarah Mitchell',
    userId: '1',
    rating: 4,
    comment: 'A captivating story with rich characters and settings.',
    date: '2025-12-01',
  },
  {
    id: '6',
    bookId: '6',
    userName: 'David Lee',
    userId: '6',
    rating: 4,
    comment: 'Practical advice on forming good habits. Very useful!',
    date: '2025-12-05',
  },
  {
    id: '7',
    bookId: '7',
    userName: 'Lisa Anderson',
    userId: '7',
    rating: 5,
    comment: 'A classic dystopian novel that still holds relevance today.',
    date: '2025-12-10',
  },
  {
    id: '8',
    bookId: '8',
    userName: 'Amy Wilson',
    userId: '8',
    rating: 5,
    comment: 'A monumental work of historical fiction. Truly epic!',
    date: '2025-12-15',
  },
  {
    id: '9',
    bookId: '9',
    userName: 'Tom Harris',
    userId: '9',
    rating: 4,
    comment: 'Fascinating insights into human history and evolution.',
    date: '2025-12-20',
  },
  {
    id: '10',
    bookId: '10',
    userName: 'Rachel Green',
    userId: '10',
    rating: 5,
    comment: 'A magical and enchanting fantasy novel. Perfect for all ages!',
    date: '2025-12-25',
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Digital Literacy Workshop',
    date: '2025-11-25',
    time: '2:00 PM - 4:00 PM',
    location: 'Community Room A',
    description: 'Learn essential digital skills including internet safety, email management, and online research techniques. Perfect for beginners and seniors looking to improve their digital confidence.',
    attendees: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Emily Brown'],
    isRegistered: false,
  },
  {
    id: '2',
    title: 'Author Meet & Greet: Local Writers',
    date: '2025-11-28',
    time: '6:00 PM - 8:00 PM',
    location: 'Main Hall',
    description: 'Meet local authors and learn about their writing process. Book signing and Q&A session included. Light refreshments will be served.',
    attendees: ['Sarah Mitchell', 'David Lee', 'Lisa Anderson'],
    isRegistered: true,
  },
  {
    id: '3',
    title: 'Kids Story Time',
    date: '2025-11-22',
    time: '10:00 AM - 11:00 AM',
    location: 'Children\'s Section',
    description: 'Interactive story time for children ages 3-7. Includes reading, songs, and craft activities. Parents are welcome to join!',
    attendees: ['Amy Wilson', 'Tom Harris', 'Rachel Green'],
    isRegistered: false,
  },
  {
    id: '4',
    title: 'Book Club: Modern Fiction',
    date: '2025-12-01',
    time: '7:00 PM - 9:00 PM',
    location: 'Reading Lounge',
    description: 'Monthly book club discussion focusing on contemporary fiction. This month we\'re reading "The Midnight Library" by Matt Haig. All are welcome!',
    attendees: ['Sarah Mitchell', 'Chris Martinez', 'Nina Patel', 'Alex Turner'],
    isRegistered: true,
  },
];

export const mockLoans: Loan[] = [
  {
    id: '1',
    bookId: '2',
    bookTitle: 'Project Hail Mary',
    bookCover: 'https://images.unsplash.com/photo-1748712576539-d40bab99b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBzY2llbmNlJTIwZmFudGFzeXxlbnwxfHx8fDE3NjM2NDk4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    dueDate: '2025-12-05',
    renewed: false,
  },
  {
    id: '2',
    bookId: '4',
    bookTitle: 'Educated',
    bookCover: 'https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBjbGFzc2ljJTIwbGl0ZXJhdHVyZXxlbnwxfHx8fDE3NjM2MDA2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    dueDate: '2025-11-30',
    renewed: true,
  },
];

export const mockLoanHistory: Loan[] = [
  {
    id: '3',
    bookId: '1',
    bookTitle: 'The Midnight Library',
    bookCover: 'https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBtb2RrbiJTIwZmWN0aW9ufGVufDF8fHx8MTc2MzU3MDczMXww&ixlib=rb-4.1.0&q=80&w=1080',
    dueDate: '2025-10-15',
    renewed: false,
  },
  {
    id: '4',
    bookId: '3',
    bookTitle: 'The Silent Patient',
    bookCover: 'https://images.unsplash.com/photo-1760696473709-a7da66ee87a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBteXN0ZXJ5JTIwdGhyaWxsZXJ8ZW58MXx8fHwxNzYzNjQ5ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    dueDate: '2025-09-20',
    renewed: false,
  },
];

export const mockRenewalRequests: RenewalRequest[] = [
  {
    id: 'REN-001',
    loanId: '1',
    bookId: '2',
    bookTitle: 'Project Hail Mary',
    bookCover: 'https://images.unsplash.com/photo-1748712576539-d40bab99b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBzY2llbmNlJTIwZmFudGFzeXxlbnwxfHx8fDE3NjM2NDk4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    userId: '1',
    userName: 'Sarah Mitchell',
    memberId: 'LIB14-2024-5892',
    currentDueDate: '2025-12-05',
    requestedDate: '2025-11-20',
    requestDate: '2025-11-20',
    reason: 'Еще не закончила читать книгу, очень интересная!',
    status: 'pending',
  },
  {
    id: 'REN-002',
    loanId: '5',
    bookId: '7',
    bookTitle: '1984',
    bookCover: 'https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBtb2RrbiJTIwZmWN0aW9ufGVufDF8fHx8MTc2MzU3MDczMXww&ixlib=rb-4.1.0&q=80&w=1080',
    userId: '3',
    userName: 'Jane Smith',
    memberId: 'LIB14-2024-4523',
    currentDueDate: '2025-11-28',
    requestedDate: '2025-11-21',
    requestDate: '2025-11-21',
    reason: 'Нужна книга для подготовки к экзамену',
    status: 'pending',
  },
  {
    id: 'REN-003',
    loanId: '6',
    bookId: '9',
    bookTitle: 'Sapiens',
    bookCover: 'https://images.unsplash.com/photo-1760696473709-a7da66ee87a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBteXN0ZXJ5JTIwdGhyaWxsZXJ8ZW58MXx8fHwxNzYzNjQ5ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    userId: '5',
    userName: 'Emily Brown',
    memberId: 'LIB14-2024-7821',
    currentDueDate: '2025-11-30',
    requestedDate: '2025-11-22',
    requestDate: '2025-11-22',
    reason: 'Использую для дипломной работы',
    status: 'pending',
  },
  {
    id: 'REN-004',
    loanId: '7',
    bookId: '1',
    bookTitle: 'The Midnight Library',
    bookCover: 'https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBtb2RrbiJTIwZmWN0aW9ufGVufDF8fHx8MTc2MzU3MDczMXww&ixlib=rb-4.1.0&q=80&w=1080',
    userId: '7',
    userName: 'Lisa Anderson',
    memberId: 'LIB14-2024-3421',
    currentDueDate: '2025-12-01',
    requestedDate: '2025-11-19',
    requestDate: '2025-11-19',
    reason: 'Хочу перечитать некоторые главы',
    status: 'pending',
  },
  {
    id: 'REN-005',
    loanId: '8',
    bookId: '4',
    bookTitle: 'Educated',
    bookCover: 'https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBjbGFzc2ljJTIwbGl0ZXJhdHVyZXxlbnwxfHx8fDE3NjM2MDA2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    userId: '9',
    userName: 'Tom Harris',
    memberId: 'LIB14-2024-9012',
    currentDueDate: '2025-12-03',
    requestedDate: '2025-11-18',
    requestDate: '2025-11-18',
    reason: 'Буду в командировке, не успею вернуть вовремя',
    status: 'pending',
  },
];