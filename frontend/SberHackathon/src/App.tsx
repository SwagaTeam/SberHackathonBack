import { useState } from 'react';
import { Login } from './components/Login';
import { ReaderHome } from './components/ReaderHome';
import { Catalog } from './components/Catalog';
import { Events } from './components/Events';
import { Profile } from './components/Profile';
import { StaffScanner } from './components/StaffScanner';
import { BottomNav } from './components/BottomNav';
import { QRScanner } from './components/QRScanner';
import { RegistrationConfirmation } from './components/RegistrationConfirmation';
import { BookingConfirmation } from './components/BookingConfirmation';
import { ConfirmationResult } from './components/ConfirmationResult';
import { AdminLayout } from './components/AdminLayout';
import { AdminDashboardMain } from './components/AdminDashboardMain';
import { UserManagement } from './components/UserManagement';
import { StaffManagement } from './components/StaffManagement';
import { BookManagement } from './components/BookManagement';
import { BookFormModal } from './components/BookFormModal';
import { BulkImport } from './components/BulkImport';
import { EventManagement } from './components/EventManagement';
import { EventFormModal } from './components/EventFormModal';
import { BookDetail } from './components/BookDetail';
import { ReservationSuccess } from './components/ReservationSuccess';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { BookCart } from './components/BookCart';
import { RenewalRequests } from './components/RenewalRequests';
import { type Book, type Event, type Review, mockReviews } from './lib/mockData';
import { Toaster } from './components/ui/sonner';

type UserRole = 'reader' | 'staff' | 'admin';
type StaffScreen = 'scanner' | 'qr-scanner' | 'registration-confirm' | 'booking-confirm' | 'result' | 'renewals';
type AdminScreen = 'dashboard' | 'users' | 'staff-management' | 'books' | 'events' | 'renewals' | 'analytics' | 'bulk-import';
type ReaderScreen = 'home' | 'catalog' | 'events' | 'profile' | 'book-detail' | 'reservation-success' | 'cart';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ReaderScreen>('home');
  const [staffScreen, setStaffScreen] = useState<StaffScreen>('scanner');
  const [adminScreen, setAdminScreen] = useState<AdminScreen>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('reader');

  // Modal states
  const [showBookForm, setShowBookForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>();
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();

  // Cart state
  const [cartBooks, setCartBooks] = useState<Book[]>([]);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  // Mock data for confirmations
  const mockUserData = {
    memberId: 'LIB-2024-001234',
    name: 'Иванов Иван Иванович',
    passport: '4512 123456',
  };

  const handleLogin = (userType: 'reader' | 'staff') => {
    setIsLoggedIn(true);
    if (userType === 'staff') {
      // For demo purposes, staff login opens admin dashboard
      setUserRole('admin');
    } else {
      setUserRole(userType);
    }
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('reader');
    setCurrentScreen('home');
    setStaffScreen('scanner');
    setAdminScreen('dashboard');
    setCartBooks([]);
  };

  const handleAddToCart = (book: Book) => {
    if (!cartBooks.find((b) => b.id === book.id)) {
      setCartBooks([...cartBooks, book]);
    }
  };

  const handleRemoveFromCart = (bookId: string) => {
    setCartBooks(cartBooks.filter((b) => b.id !== bookId));
  };

  const handleConfirmBooking = () => {
    // In a real app, this would create reservations
    setCurrentScreen('reservation-success');
    setCartBooks([]);
  };

  const isBookInCart = (bookId: string) => {
    return cartBooks.some((b) => b.id === bookId);
  };

  const handleAddReview = (bookId: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      bookId,
      userName: 'Sarah Mitchell', // In real app, use actual logged-in user
      userId: '1',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews([...reviews, newReview]);
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Admin screens
  if (userRole === 'admin') {
    return (
      <>\
        <Toaster />
        <AdminLayout
          currentScreen={adminScreen}
          onNavigate={(screen) => setAdminScreen(screen as AdminScreen)}
          onLogout={handleLogout}
        >
          {adminScreen === 'dashboard' && <AdminDashboardMain />}

          {adminScreen === 'users' && <UserManagement />}

          {adminScreen === 'staff-management' && <StaffManagement />}

          {adminScreen === 'books' && (
            <BookManagement
              onBack={() => setAdminScreen('dashboard')}
              onAddBook={() => {
                setEditingBook(undefined);
                setShowBookForm(true);
              }}
              onEditBook={(book) => {
                setEditingBook(book);
                setShowBookForm(true);
              }}
              onBulkImport={() => setAdminScreen('bulk-import')}
            />
          )}

          {adminScreen === 'bulk-import' && (
            <BulkImport
              onBack={() => setAdminScreen('books')}
              onImportComplete={() => setAdminScreen('books')}
            />
          )}

          {adminScreen === 'events' && (
            <EventManagement
              onBack={() => setAdminScreen('dashboard')}
              onCreateEvent={() => {
                setEditingEvent(undefined);
                setShowEventForm(true);
              }}
              onEditEvent={(event) => {
                setEditingEvent(event);
                setShowEventForm(true);
              }}
            />
          )}

          {adminScreen === 'renewals' && (
            <RenewalRequests onBack={() => setAdminScreen('dashboard')} />
          )}

          {adminScreen === 'analytics' && (
            <AnalyticsDashboard onBack={() => setAdminScreen('dashboard')} />
          )}

          {showBookForm && (
            <BookFormModal
              book={editingBook}
              onSave={() => {
                setShowBookForm(false);
                setEditingBook(undefined);
              }}
              onCancel={() => {
                setShowBookForm(false);
                setEditingBook(undefined);
              }}
            />
          )}

          {showEventForm && (
            <EventFormModal
              event={editingEvent}
              onSave={() => {
                setShowEventForm(false);
                setEditingEvent(undefined);
              }}
              onCancel={() => {
                setShowEventForm(false);
                setEditingEvent(undefined);
              }}
            />
          )}
        </AdminLayout>
      </>
    );
  }

  // Staff screens
  if (userRole === 'staff') {
    return (
      <>
        <Toaster />
        <div className="min-h-screen bg-[#636363]">
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-[#4a4a4a] border border-[#636363] rounded-full text-xs shadow-lg text-[#aac0a7] hover:bg-[#636363] transition-colors"
            >
              Logout
            </button>
          </div>

          {staffScreen === 'scanner' && (
            <StaffScanner onNavigateToRenewals={() => setStaffScreen('renewals')} />
          )}

          {staffScreen === 'renewals' && (
            <RenewalRequests onBack={() => setStaffScreen('scanner')} />
          )}

          {staffScreen === 'qr-scanner' && (
            <QRScanner
              title="Сканирование QR-кода"
              helperText="Наведите камеру на QR-код читателя"
              onScanSuccess={() => setStaffScreen('registration-confirm')}
              onBack={() => setStaffScreen('scanner')}
            />
          )}

          {staffScreen === 'registration-confirm' && (
            <RegistrationConfirmation
              userData={mockUserData}
              onConfirm={() => setStaffScreen('result')}
              onReject={() => setStaffScreen('result')}
              onBack={() => setStaffScreen('qr-scanner')}
            />
          )}

          {staffScreen === 'booking-confirm' && (
            <BookingConfirmation
              userData={mockUserData}
              bookedBooks={[
                {
                  id: '1',
                  title: 'Война и мир',
                  author: 'Лев Толстой',
                  cover: 'https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?w=400',
                },
              ]}
              bookingExpiry={new Date(Date.now() + 3600000).toISOString()}
              onConfirm={() => setStaffScreen('result')}
              onReject={() => setStaffScreen('result')}
              onBack={() => setStaffScreen('scanner')}
            />
          )}

          {staffScreen === 'result' && (
            <ConfirmationResult
              type="success"
              message="Книги успешно выданы!"
              description="Операция завершена успешно"
              onDone={() => setStaffScreen('scanner')}
            />
          )}
        </div>
      </>
    );
  }

  // Reader screens
  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-[#636363]">
        {/* Mode Toggle - Hidden in production, useful for demo */}
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <button
            onClick={() => {
              setUserRole('admin');
              setAdminScreen('dashboard');
            }}
            className="px-3 py-1.5 bg-[#4a4a4a] border border-[#636363] rounded-full text-xs shadow-lg text-[#aac0a7] hover:bg-[#636363] transition-colors"
          >
            Admin View
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-[#4a4a4a] border border-[#636363] rounded-full text-xs shadow-lg text-[#aac0a7] hover:bg-[#636363] transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="pb-20 max-w-md mx-auto">
          {currentScreen === 'home' && <ReaderHome />}
          {currentScreen === 'catalog' && (
            <Catalog onBookClick={(book) => {
              setSelectedBook(book);
              setCurrentScreen('book-detail');
            }} />
          )}
          {currentScreen === 'events' && <Events />}
          {currentScreen === 'profile' && <Profile />}
          {currentScreen === 'cart' && (
            <BookCart
              books={cartBooks}
              onBack={() => setCurrentScreen('catalog')}
              onRemoveBook={handleRemoveFromCart}
              onConfirmBooking={handleConfirmBooking}
            />
          )}
          {currentScreen === 'book-detail' && selectedBook && (
            <BookDetail
              book={selectedBook}
              onBack={() => setCurrentScreen('catalog')}
              onReserve={() => setCurrentScreen('reservation-success')}
              onAddToCart={handleAddToCart}
              isInCart={isBookInCart(selectedBook.id)}
              reviews={reviews}
              onAddReview={handleAddReview}
            />
          )}
          {currentScreen === 'reservation-success' && selectedBook && (
            <ReservationSuccess
              book={selectedBook}
              reservationId={`RES-${Date.now()}`}
              expiryTime={new Date(Date.now() + 3600000).toLocaleString('ru-RU')}
              onDone={() => setCurrentScreen('home')}
            />
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          cartCount={cartBooks.length}
        />
      </div>
    </>
  );
}
