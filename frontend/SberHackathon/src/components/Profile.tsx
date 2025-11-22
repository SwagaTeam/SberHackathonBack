import { useState } from 'react';
import { Calendar, Mail, CreditCard, ChevronRight, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { mockUser, mockLoans, mockLoanHistory, type Loan } from '../lib/mockData';
import { RenewalRequestModal } from './RenewalRequestModal';
import { toast } from 'sonner';
import QRCode from 'react-qr-code';

export function Profile() {
  const [renewedLoans, setRenewedLoans] = useState<string[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const handleRenew = (loan: Loan) => {
    setSelectedLoan(loan);
  };

  const handleSubmitRenewalRequest = (requestedDate: string, reason: string) => {
    // In real app, this would send the request to the backend
    toast.success('Запрос на продление отправлен!', {
      description: 'Персонал библиотеки рассмотрит ваш запрос в ближайшее время.',
    });
    setRenewedLoans((prev) => [...prev, selectedLoan?.id || '']);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-[#636363]">
      {/* Header */}
      <div className="bg-[#636363] border-b border-[#4a4a4a] px-6 py-4">
        <h1 className="text-[#aac0a7]">Profile</h1>
      </div>

      {/* User Info Card */}
      <div className="px-6 py-6">
        <div className="bg-[#4a4a4a] rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-[#aac0a7] mb-1">{mockUser.name}</h2>
              <p className="text-[#888888] text-sm">Member since 2024</p>
            </div>
            <div className="bg-[#2a2a2a] rounded-lg p-3 shadow-lg">
              <QRCode value={mockUser.memberId} size={80} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#aac0a7] text-sm">
              <CreditCard className="w-4 h-4" />
              <span>ID: {mockUser.memberId}</span>
            </div>
            <div className="flex items-center gap-2 text-[#aac0a7] text-sm">
              <Mail className="w-4 h-4" />
              <span>{mockUser.email}</span>
            </div>
          </div>

          {mockUser.fines > 0 && (
            <div className="mt-4 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
              <p className="text-sm text-yellow-800">Outstanding Fines: ${mockUser.fines.toFixed(2)}</p>
            </div>
          )}
        </div>

        {/* Loans Section */}
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4 bg-[#4a4a4a] border border-[#4a4a4a]">
            <TabsTrigger
              value="current"
              className="text-[#888888] data-[state=active]:bg-[#aac0a7] data-[state=active]:text-[#000000]"
            >
              My Loans
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="text-[#888888] data-[state=active]:bg-[#aac0a7] data-[state=active]:text-[#000000]"
            >
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-3">
            {mockLoans.length === 0 ? (
              <div className="bg-[#4a4a4a] rounded-lg p-8 text-center">
                <p className="text-[#888888]">No active loans</p>
                <p className="text-sm text-[#888888] mt-1">Visit the catalog to borrow books</p>
              </div>
            ) : (
              mockLoans.map((loan) => {
                const daysUntilDue = getDaysUntilDue(loan.dueDate);
                const isOverdue = daysUntilDue < 0;
                const isDueSoon = daysUntilDue >= 0 && daysUntilDue <= 3;
                const isRenewed = renewedLoans.includes(loan.id);

                return (
                  <div
                    key={loan.id}
                    className="bg-[#2a2a2a] rounded-lg p-4 shadow-md"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-16 h-24 rounded-lg overflow-hidden">
                        <img
                          src={loan.bookCover}
                          alt={loan.bookTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[#aac0a7] mb-2 line-clamp-2">{loan.bookTitle}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-4 h-4 text-[#888888]" />
                          <span className="text-sm text-[#888888]">
                            Due: {new Date(loan.dueDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        {isOverdue && (
                          <Badge variant="destructive" className="mb-2">
                            Overdue
                          </Badge>
                        )}
                        {isDueSoon && !isOverdue && (
                          <Badge className="mb-2 bg-yellow-100 text-yellow-800 border border-yellow-200 hover:bg-yellow-100">
                            Due Soon
                          </Badge>
                        )}
                        {loan.renewed && (
                          <Badge className="mb-2 bg-[#4a4a4a] text-[#888888]">
                            Renewed
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRenew(loan)}
                          disabled={loan.renewed || isRenewed}
                          className={`h-8 border-[#636363] ${
                            loan.renewed || isRenewed
                              ? 'text-[#636363]'
                              : 'text-[#aac0a7] hover:bg-[#f5f5f5] hover:text-[#8fa88d]'
                          }`}
                        >
                          <RefreshCw className="w-3 h-3 mr-1" />
                          {loan.renewed || isRenewed ? 'Already Renewed' : 'Renew'}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-3">
            {mockLoanHistory.map((loan) => (
              <div
                key={loan.id}
                className="bg-[#2a2a2a] rounded-lg p-4 shadow-md"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-16 h-24 rounded-lg overflow-hidden">
                    <img
                      src={loan.bookCover}
                      alt={loan.bookTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#aac0a7] mb-2 line-clamp-2">{loan.bookTitle}</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#888888]" />
                      <span className="text-sm text-[#888888]">
                        Returned: {new Date(loan.dueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Account Settings */}
        <div className="mt-6 bg-[#4a4a4a] rounded-lg overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 hover:bg-[#636363] transition-colors">
            <span className="text-[#aac0a7]">Account Settings</span>
            <ChevronRight className="w-5 h-5 text-[#888888]" />
          </button>
          <div className="border-t border-[#636363]" />
          <button className="w-full flex items-center justify-between p-4 hover:bg-[#636363] transition-colors">
            <span className="text-[#aac0a7]">Notification Preferences</span>
            <ChevronRight className="w-5 h-5 text-[#888888]" />
          </button>
          <div className="border-t border-[#636363]" />
          <button className="w-full flex items-center justify-between p-4 hover:bg-[#636363] transition-colors text-red-400">
            <span>Sign Out</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Renewal Request Modal */}
      {selectedLoan && (
        <RenewalRequestModal
          loan={selectedLoan}
          onSubmit={handleSubmitRenewalRequest}
          onClose={() => setSelectedLoan(null)}
        />
      )}
    </div>
  );
}
