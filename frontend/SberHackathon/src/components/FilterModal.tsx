import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

export interface FilterOptions {
  genres: string[];
  pagesMin: number;
  pagesMax: number;
  yearMin: number;
  yearMax: number;
  languages: string[];
  publishers: string[];
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onApply: (filters: FilterOptions) => void;
  availableGenres: string[];
  availableLanguages: string[];
  availablePublishers: string[];
}

export function FilterModal({
  isOpen,
  onClose,
  filters,
  onApply,
  availableGenres,
  availableLanguages,
  availablePublishers,
}: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const handleGenreToggle = (genre: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }));
  };

  const handlePublisherToggle = (publisher: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      publishers: prev.publishers.includes(publisher)
        ? prev.publishers.filter((p) => p !== publisher)
        : [...prev.publishers, publisher],
    }));
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      genres: [],
      pagesMin: 0,
      pagesMax: 1000,
      yearMin: 1900,
      yearMax: new Date().getFullYear(),
      languages: [],
      publishers: [],
    };
    setLocalFilters(resetFilters);
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-[#2a2a2a] rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#4a4a4a]">
          <h2 className="text-[#aac0a7]">Filters</h2>
          <button
            onClick={onClose}
            className="text-[#888888] hover:text-[#aac0a7] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Genres */}
          <div>
            <Label className="text-[#aac0a7] mb-3 block">Genre</Label>
            <div className="space-y-3">
              {availableGenres.map((genre) => (
                <div key={genre} className="flex items-center space-x-3">
                  <Checkbox
                    id={`genre-${genre}`}
                    checked={localFilters.genres.includes(genre)}
                    onCheckedChange={() => handleGenreToggle(genre)}
                    className="border-[#4a4a4a] data-[state=checked]:bg-[#aac0a7] data-[state=checked]:border-[#aac0a7]"
                  />
                  <Label
                    htmlFor={`genre-${genre}`}
                    className="text-[#888888] cursor-pointer"
                  >
                    {genre}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Pages Range */}
          <div>
            <Label className="text-[#aac0a7] mb-3 block">
              Pages: {localFilters.pagesMin} - {localFilters.pagesMax}
            </Label>
            <Slider
              value={[localFilters.pagesMin, localFilters.pagesMax]}
              onValueChange={([min, max]) => {
                setLocalFilters((prev) => ({
                  ...prev,
                  pagesMin: min,
                  pagesMax: max,
                }));
              }}
              min={0}
              max={1000}
              step={50}
              className="w-full"
            />
          </div>

          {/* Year Range */}
          <div>
            <Label className="text-[#aac0a7] mb-3 block">
              Year: {localFilters.yearMin} - {localFilters.yearMax}
            </Label>
            <Slider
              value={[localFilters.yearMin, localFilters.yearMax]}
              onValueChange={([min, max]) => {
                setLocalFilters((prev) => ({
                  ...prev,
                  yearMin: min,
                  yearMax: max,
                }));
              }}
              min={1900}
              max={new Date().getFullYear()}
              step={1}
              className="w-full"
            />
          </div>

          {/* Languages */}
          <div>
            <Label className="text-[#aac0a7] mb-3 block">Language</Label>
            <div className="space-y-3">
              {availableLanguages.map((language) => (
                <div key={language} className="flex items-center space-x-3">
                  <Checkbox
                    id={`language-${language}`}
                    checked={localFilters.languages.includes(language)}
                    onCheckedChange={() => handleLanguageToggle(language)}
                    className="border-[#4a4a4a] data-[state=checked]:bg-[#aac0a7] data-[state=checked]:border-[#aac0a7]"
                  />
                  <Label
                    htmlFor={`language-${language}`}
                    className="text-[#888888] cursor-pointer"
                  >
                    {language}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Publishers */}
          <div>
            <Label className="text-[#aac0a7] mb-3 block">Publisher</Label>
            <div className="space-y-3">
              {availablePublishers.map((publisher) => (
                <div key={publisher} className="flex items-center space-x-3">
                  <Checkbox
                    id={`publisher-${publisher}`}
                    checked={localFilters.publishers.includes(publisher)}
                    onCheckedChange={() => handlePublisherToggle(publisher)}
                    className="border-[#4a4a4a] data-[state=checked]:bg-[#aac0a7] data-[state=checked]:border-[#aac0a7]"
                  />
                  <Label
                    htmlFor={`publisher-${publisher}`}
                    className="text-[#888888] cursor-pointer"
                  >
                    {publisher}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#4a4a4a] flex gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1 border-[#4a4a4a] bg-transparent text-[#aac0a7] hover:bg-[#4a4a4a]"
          >
            Reset
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
