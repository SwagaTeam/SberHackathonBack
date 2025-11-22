import { useState } from 'react';
import { Scan, X, CheckCircle, XCircle, User, CreditCard, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { mockUser, mockLoans } from '../lib/mockData';

export function StaffScanner({ onNavigateToRenewals }: { onNavigateToRenewals?: () => void }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedUser, setScannedUser] = useState<typeof mockUser | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setScannedUser(mockUser);
      setIsScanning(false);
    }, 1500);
  };

  const handleCheckOut = () => {
    setActionMessage({ type: 'success', text: 'Book checked out successfully' });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleCheckIn = () => {
    setActionMessage({ type: 'success', text: 'Book returned successfully' });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleClose = () => {
    setScannedUser(null);
    setActionMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#4a4a4a]">
      {/* Header */}
      <div className="bg-[#636363] border-b border-[#4a4a4a] px-6 py-4">
        <h1 className="text-[#aac0a7]">Staff Portal</h1>
        <p className="text-sm text-[#888888]">City Library #14</p>
      </div>

      {/* Action Message */}
      {actionMessage && (
        <div className="px-6 py-4">
          <div
            className={`rounded-lg p-4 flex items-center gap-3 ${
              actionMessage.type === 'success'
                ? 'bg-[#aac0a7] text-[#000000]'
                : 'bg-red-500 bg-opacity-90 text-white'
            }`}
          >
            {actionMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{actionMessage.text}</span>
          </div>
        </div>
      )}

      {/* Scanner View */}
      <div className="px-6 py-8">
        {!scannedUser ? (
          <div className="text-center">
            <div className="bg-[#636363] rounded-lg p-12 mb-6 border-2 border-dashed border-[#888888]">
              {isScanning ? (
                <div className="space-y-4">
                  <div className="w-24 h-24 mx-auto bg-[#aac0a7] bg-opacity-30 rounded-full flex items-center justify-center animate-pulse">
                    <Scan className="w-12 h-12 text-[#aac0a7]" />
                  </div>
                  <p className="text-[#aac0a7]">Scanning QR Code...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-24 h-24 mx-auto bg-[#4a4a4a] rounded-full flex items-center justify-center">
                    <Scan className="w-12 h-12 text-[#aac0a7]" />
                  </div>
                  <p className="text-[#aac0a7]">Ready to Scan</p>
                  <p className="text-sm text-[#888888]">Position the member's QR code in view</p>
                </div>
              )}
            </div>

            <Button
              size="lg"
              onClick={handleScan}
              disabled={isScanning}
              className="w-full max-w-sm h-14 bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2] mb-3"
            >
              <Scan className="w-5 h-5 mr-2" />
              {isScanning ? 'Scanning...' : 'Start Scan'}
            </Button>

            {onNavigateToRenewals && (
              <Button
                size="lg"
                variant="outline"
                onClick={onNavigateToRenewals}
                className="w-full max-w-sm h-14 border-[#aac0a7] text-[#aac0a7] hover:bg-[#636363]"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Запросы на продление (5)
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* User Profile Card */}
            <div className="bg-[#2a2a2a] rounded-lg p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#aac0a7] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-[#000000]" />
                  </div>
                  <div>
                    <h2 className="text-[#aac0a7] mb-1">{scannedUser.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-[#888888]">
                      <CreditCard className="w-4 h-4" />
                      <span>{scannedUser.memberId}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-[#888888] hover:text-[#aac0a7] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {scannedUser.fines > 0 && (
                <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200 mb-4">
                  <p className="text-sm text-yellow-800">
                    Outstanding Fines: ${scannedUser.fines.toFixed(2)}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#888888]">Email</span>
                  <span className="text-[#aac0a7]">{scannedUser.email}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#888888]">Active Loans</span>
                  <Badge className="bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]">
                    {mockLoans.length}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Current Loans */}
            {mockLoans.length > 0 && (
              <div className="bg-[#2a2a2a] rounded-lg p-6 shadow-lg">
                <h3 className="text-[#aac0a7] mb-4">Current Loans</h3>
                <div className="space-y-3">
                  {mockLoans.map((loan) => (
                    <div
                      key={loan.id}
                      className="flex items-center gap-3 p-3 bg-[#4a4a4a] rounded-lg"
                    >
                      <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={loan.bookCover}
                          alt={loan.bookTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#aac0a7] text-sm line-clamp-1">{loan.bookTitle}</p>
                        <p className="text-xs text-[#888888]">
                          Due: {new Date(loan.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                size="lg"
                onClick={handleCheckOut}
                className="h-14 bg-[#aac0a7] hover:bg-[#c5d4c2] text-[#000000]"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Check Out
              </Button>
              <Button
                size="lg"
                onClick={handleCheckIn}
                variant="outline"
                className="h-14 border-white bg-[#636363] text-[#aac0a7] hover:bg-[#4a4a4a]"
              >
                <XCircle className="w-5 h-5 mr-2" />
                Check In
              </Button>
            </div>

            <Button
              variant="ghost"
              onClick={handleClose}
              className="w-full text-[#888888] hover:text-[#aac0a7] hover:bg-[#636363]"
            >
              Scan Another Member
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}