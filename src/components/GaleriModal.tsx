import React from 'react';
import { PhotoDocumentation } from '../types';
import { X, ChevronLeft, ChevronRight, Camera, User } from 'lucide-react';

interface GaleriModalProps {
  currentPhoto: PhotoDocumentation | null;
  allPhotos: PhotoDocumentation[];
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
}

export const GaleriModal: React.FC<GaleriModalProps> = ({
  currentPhoto,
  allPhotos,
  onClose,
  onNavigate,
}) => {
  if (!currentPhoto) return null;

  const currentIndex = allPhotos.findIndex((p) => p.id === currentPhoto.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative max-w-4xl w-full bg-stone-900 border-4 border-black rounded-3xl overflow-hidden shadow-[12px_12px_0px_#000]">
        
        {/* Top Header */}
        <div className="bg-amber-300 border-b-4 border-black p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-black" />
            <span className="font-black text-black text-sm sm:text-base">
              Galeri Dokumentasi RT 09 ({currentIndex + 1} / {allPhotos.length})
            </span>
          </div>

          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white font-black px-3.5 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] text-sm cursor-pointer"
          >
            ✕ Tutup
          </button>
        </div>

        {/* Main Photo Area */}
        <div className="relative aspect-16/9 bg-black flex items-center justify-center overflow-hidden">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption}
            referrerPolicy="no-referrer"
            className="max-h-[60vh] w-auto max-w-full object-contain"
          />

          {/* Navigation Arrows */}
          {allPhotos.length > 1 && (
            <>
              <button
                onClick={() => onNavigate('prev')}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-amber-300 hover:bg-amber-400 text-black p-3 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] cursor-pointer"
                title="Foto Sebelumnya"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => onNavigate('next')}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-amber-300 hover:bg-amber-400 text-black p-3 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] cursor-pointer"
                title="Foto Selanjutnya"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Caption & Photographer */}
        <div className="bg-stone-800 p-5 text-white border-t-3 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-stone-100">
              "{currentPhoto.caption}"
            </p>
          </div>

          {currentPhoto.photographer && (
            <div className="shrink-0 bg-stone-700 px-3 py-1.5 rounded-xl border border-stone-600 text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>Foto: {currentPhoto.photographer}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
