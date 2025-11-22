import { CheckCircle2, XCircle, Home } from 'lucide-react';
import { Button } from './ui/button';

interface ConfirmationResultProps {
  type: 'success' | 'error';
  message: string;
  description?: string;
  onDone: () => void;
}

export function ConfirmationResult({
  type,
  message,
  description,
  onDone,
}: ConfirmationResultProps) {
  return (
    <div className="min-h-screen bg-[#636363] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          {type === 'success' ? (
            <div className="w-24 h-24 rounded-full bg-[#aac0a7] flex items-center justify-center">
              <CheckCircle2 className="w-16 h-16 text-[#000000]" />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#d4183d] flex items-center justify-center">
              <XCircle className="w-16 h-16 text-[#2a2a2a]" />
            </div>
          )}
        </div>

        {/* Message */}
        <div className="bg-[#2a2a2a] rounded-xl p-8 border border-[#4a4a4a] mb-6">
          <h1
            className={`mb-4 ${
              type === 'success' ? 'text-[#aac0a7]' : 'text-[#d4183d]'
            }`}
          >
            {message}
          </h1>
          {description && (
            <p className="text-[#888888]">{description}</p>
          )}
        </div>

        {/* Action Button */}
        <Button
          onClick={onDone}
          className="w-full bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2] h-12"
        >
          <Home className="w-5 h-5 mr-2" />
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
}
