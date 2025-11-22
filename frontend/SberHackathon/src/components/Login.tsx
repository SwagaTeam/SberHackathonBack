import { useState } from 'react';
import { Library, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LoginProps {
  onLogin: (userType: 'reader' | 'staff') => void;
}

export function Login({ onLogin }: LoginProps) {
  const [staffId, setStaffId] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [showStaffPassword, setShowStaffPassword] = useState(false);

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock validation - in production, this would call an API
    if (staffId && staffPassword) {
      onLogin('staff');
    }
  };

  return (
    <div className="min-h-screen bg-[#636363] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#aac0a7] rounded-2xl mb-4">
            <Library className="w-10 h-10 text-[#000000]" />
          </div>
          <h1 className="text-[#aac0a7] mb-2 ">Городская библиотека #14</h1>
          <p className="text-[#888888]">Админ-панель</p>
        </div>

            <div className="bg-[#2a2a2a] rounded-xl p-6 border border-[#4a4a4a]">
              <form onSubmit={handleStaffLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="staff-id" className="text-[#aac0a7]">
                    ID сотрудника
                  </Label>
                  <Input
                    id="staff-id"
                    type="text"
                    placeholder="LIB-####"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    className="bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="staff-password" className="text-[#aac0a7]">
                    Пароль
                  </Label>
                  <div className="relative">
                    <Input
                      id="staff-password"
                      type={showStaffPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={staffPassword}
                      onChange={(e) => setStaffPassword(e.target.value)}
                      className="bg-[#4a4a4a] border-[#4a4a4a] text-[#aac0a7] placeholder:text-[#888888] focus:border-[#aac0a7] focus:ring-[#aac0a7] pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowStaffPassword(!showStaffPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#aac0a7] transition-colors"
                    >
                      {showStaffPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-[#888888] cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#4a4a4a] bg-[#4a4a4a] text-[#aac0a7] focus:ring-[#aac0a7] focus:ring-offset-0"
                    />
                    Запомнить меня
                  </label>
                  <button
                    type="button"
                    className="text-[#aac0a7] hover:text-[#c5d4c2] transition-colors"
                  >
                    Забыли пароль?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2] h-12"
                >
                  Войти
                </Button>
              </form>
            </div>
      </div>
    </div>
  );
}
