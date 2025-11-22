import { useState } from 'react';
import { ArrowLeft, Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

interface BulkImportProps {
  onBack: () => void;
  onImportComplete: (count: number) => void;
}

export function BulkImport({ onBack, onImportComplete }: BulkImportProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState('');
  const [importedCount, setImportedCount] = useState(0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    const validTypes = ['.csv', '.xlsx', '.xls', '.json'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!validTypes.includes(fileExtension)) {
      setUploadStatus('error');
      return;
    }

    setFileName(file.name);
    setUploadStatus('uploading');

    // Simulate upload and processing
    setTimeout(() => {
      const mockImportCount = Math.floor(Math.random() * 50) + 10;
      setImportedCount(mockImportCount);
      setUploadStatus('success');
    }, 2000);
  };

  const handleComplete = () => {
    onImportComplete(importedCount);
  };

  return (
    <div className="min-h-screen bg-[#636363]">
      {/* Header */}
      <div className="bg-[#2a2a2a] border-b border-[#4a4a4a] px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-[#aac0a7] hover:text-[#c5d4c2] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-[#aac0a7]">Массовый импорт книг</h1>
            <p className="text-[#888888] text-sm">Загрузите файл CSV, Excel или JSON</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-3xl mx-auto">
        {uploadStatus === 'idle' && (
          <>
            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                isDragging
                  ? 'border-[#aac0a7] bg-[#4a4a4a]'
                  : 'border-[#4a4a4a] bg-[#2a2a2a]'
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#4a4a4a] flex items-center justify-center">
                  <Upload className="w-8 h-8 text-[#aac0a7]" />
                </div>
                <div>
                  <p className="text-[#aac0a7] mb-2">
                    Перетащите файл сюда
                  </p>
                  <p className="text-[#888888] text-sm">или</p>
                </div>
                <label>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls,.json"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      (e.currentTarget.previousElementSibling as HTMLInputElement)?.click();
                    }}
                    className="bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]"
                  >
                    Выбрать файл
                  </Button>
                </label>
                <p className="text-[#888888] text-xs mt-2">
                  Поддерживаемые форматы: CSV, XLSX, XLS, JSON
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 bg-[#4a4a4a] rounded-lg p-6 border border-[#4a4a4a]">
              <h3 className="text-[#aac0a7] mb-4">Инструкции по импорту</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#aac0a7] flex items-center justify-center flex-shrink-0 text-[#000000] text-xs">
                    1
                  </div>
                  <p className="text-[#888888] text-sm">
                    Убедитесь, что файл содержит следующие столбцы: Название, Автор, Жанр, ISBN
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#aac0a7] flex items-center justify-center flex-shrink-0 text-[#000000] text-xs">
                    2
                  </div>
                  <p className="text-[#888888] text-sm">
                    Опциональные поля: Издательство, Год, Количество страниц, Описание, URL обложки
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#aac0a7] flex items-center justify-center flex-shrink-0 text-[#000000] text-xs">
                    3
                  </div>
                  <p className="text-[#888888] text-sm">
                    Система автоматически проверит дубликаты по ISBN
                  </p>
                </div>
              </div>

              {/* Download Template */}
              <div className="mt-6 pt-6 border-t border-[#636363]">
                <p className="text-[#888888] text-sm mb-3">Скачать шаблон:</p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    className="bg-[#636363] text-[#aac0a7] hover:bg-[#2a2a2a] text-sm"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    CSV шаблон
                  </Button>
                  <Button
                    variant="secondary"
                    className="bg-[#636363] text-[#aac0a7] hover:bg-[#2a2a2a] text-sm"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Excel шаблон
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {uploadStatus === 'uploading' && (
          <div className="bg-[#2a2a2a] rounded-xl p-12 text-center border border-[#4a4a4a]">
            <div className="w-16 h-16 rounded-full bg-[#4a4a4a] flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Upload className="w-8 h-8 text-[#aac0a7]" />
            </div>
            <p className="text-[#aac0a7] mb-2">Обработка файла...</p>
            <p className="text-[#888888] text-sm">{fileName}</p>
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="bg-[#2a2a2a] rounded-xl p-12 text-center border border-[#4a4a4a]">
            <div className="w-16 h-16 rounded-full bg-[#aac0a7] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#000000]" />
            </div>
            <h2 className="text-[#aac0a7] mb-2">Импорт завершен успешно!</h2>
            <p className="text-[#888888] mb-6">
              Импортировано {importedCount} книг из файла {fileName}
            </p>
            <Button
              onClick={handleComplete}
              className="bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]"
            >
              Вернуться к управлению книгами
            </Button>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="bg-[#2a2a2a] rounded-xl p-12 text-center border border-[#4a4a4a]">
            <div className="w-16 h-16 rounded-full bg-[#d4183d] flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-[#2a2a2a]" />
            </div>
            <h2 className="text-[#d4183d] mb-2">Ошибка импорта</h2>
            <p className="text-[#888888] mb-6">
              Неподдерживаемый формат файла. Пожалуйста, используйте CSV, Excel или JSON.
            </p>
            <Button
              onClick={() => setUploadStatus('idle')}
              className="bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]"
            >
              Попробовать снова
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
