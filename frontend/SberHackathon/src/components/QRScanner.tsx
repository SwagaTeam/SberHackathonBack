import { useState } from 'react';
import { QrCode, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface QRScannerProps {
  title: string;
  helperText: string;
  onScanSuccess: (data: string) => void;
  onBack: () => void;
}

export function QRScanner({ title, helperText, onScanSuccess, onBack }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(true);

  // Mock scan function - in production, this would use device camera
  const handleMockScan = () => {
    setIsScanning(false);
    // Simulate scanning delay
    setTimeout(() => {
      // Mock QR code data
      onScanSuccess('LIB-2024-001234');
    }, 1500);
  };

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
        <h1 className="text-[#aac0a7]">{title}</h1>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Camera Viewfinder */}
        <div className="relative w-full max-w-sm aspect-square bg-[#2a2a2a] rounded-2xl border-2 border-[#4a4a4a] overflow-hidden mb-6">
          {/* Mock camera view */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Scanning animation */}
              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-4 border-[#aac0a7] rounded-2xl animate-pulse"></div>
                </div>
              )}
              
              <QrCode className="w-32 h-32 text-[#4a4a4a]" />
            </div>
          </div>

          {/* Scanning corners */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-[#aac0a7] rounded-tl-lg"></div>
          <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-[#aac0a7] rounded-tr-lg"></div>
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-[#aac0a7] rounded-bl-lg"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-[#aac0a7] rounded-br-lg"></div>

          {/* Scanning line animation */}
          {isScanning && (
            <div className="absolute inset-x-0 top-0 h-1 bg-[#aac0a7] animate-scan"></div>
          )}
        </div>

        {/* Helper Text */}
        <div className="text-center mb-8">
          <p className="text-[#aac0a7] mb-2">{helperText}</p>
          <p className="text-[#888888] text-sm">
            Убедитесь, что QR-код находится в рамке
          </p>
        </div>

        {/* Mock scan button for demo */}
        <Button
          onClick={handleMockScan}
          disabled={!isScanning}
          className="bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2] px-8"
        >
          {isScanning ? 'Симулировать сканирование' : 'Сканирование...'}
        </Button>
      </div>

      {/* Instructions */}
      <div className="bg-[#4a4a4a] border-t border-[#4a4a4a] px-6 py-6">
        <div className="max-w-sm mx-auto space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#aac0a7] flex items-center justify-center flex-shrink-0 text-[#000000] text-xs">
              1
            </div>
            <p className="text-[#888888] text-sm">
              Попросите читателя показать QR-код читательского билета
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#aac0a7] flex items-center justify-center flex-shrink-0 text-[#000000] text-xs">
              2
            </div>
            <p className="text-[#888888] text-sm">
              Разместите QR-код в центре рамки для автоматического сканирования
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#aac0a7] flex items-center justify-center flex-shrink-0 text-[#000000] text-xs">
              3
            </div>
            <p className="text-[#888888] text-sm">
              После успешного сканирования появятся данные читателя
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(400px); }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
