import React, { useEffect, useRef } from 'react';
import { PhotoDocumentation } from '../types';
import { useModalA11y } from '../utils/useModalA11y';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalA11y(!!currentPhoto, onClose, dialogRef);

  const hasNavigation = allPhotos.length > 1;

  useEffect(() => {
    if (!currentPhoto) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onNavigate('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNavigate('next');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentPhoto, onNavigate]);

  if (!currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Galeri Dokumentasi"
        className="relative max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentPhoto.url}
          alt={currentPhoto.caption || 'Dokumentasi kegiatan RT 09'}
          referrerPolicy="no-referrer"
          className="block max-w-full max-h-[80vh] sm:max-h-[84vh] rounded-none border-4 sm:border-[5px] border-stone-200 shadow-[7px_7px_0px_#000] bg-black object-contain"
        />

        {hasNavigation && (
          <>
            <button
              onClick={() => onNavigate('prev')}
              className="absolute left-2 sm:left-[-64px] top-1/2 -translate-y-1/2 w-11 h-11 sm:w-[46px] sm:h-[46px] rounded-none border-3 border-black bg-amber-300 text-black shadow-[4px_4px_0px_#000] flex items-center justify-center cursor-pointer hover:bg-amber-400 hover:shadow-[2px_2px_0px_#000] transition-all"
              title="Foto Sebelumnya"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => onNavigate('next')}
              className="absolute right-2 sm:right-[-64px] top-1/2 -translate-y-1/2 w-11 h-11 sm:w-[46px] sm:h-[46px] rounded-none border-3 border-black bg-amber-300 text-black shadow-[4px_4px_0px_#000] flex items-center justify-center cursor-pointer hover:bg-amber-400 hover:shadow-[2px_2px_0px_#000] transition-all"
              title="Foto Selanjutnya"
              aria-label="Foto selanjutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 sm:top-[-24px] sm:right-[-24px] w-11 h-11 sm:w-[46px] sm:h-[46px] rounded-none border-3 border-black bg-red-600 text-white shadow-[4px_4px_0px_#000] flex items-center justify-center cursor-pointer hover:bg-red-700 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] transition-all"
          title="Tutup"
          aria-label="Tutup galeri"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
