import React from 'react';
import { TimelineEvent, PhotoDocumentation } from '../types';
import { Camera, Images, ChevronRight } from 'lucide-react';

interface FotoKilasProps {
  events: TimelineEvent[];
  onOpenPhoto: (photo: PhotoDocumentation, allPhotos: PhotoDocumentation[]) => void;
  setActiveTab: (tab: string) => void;
}

const ROTATION_CLASSES = [
  'rotate-[-1.5deg]',
  'rotate-[1.5deg]',
  'rotate-[-2deg]',
  'rotate-[2deg]',
  'rotate-[-1deg]'
];

const SHADOW_CLASSES = [
  'shadow-[4px_4px_0px_#dc2626]',
  'shadow-[4px_4px_0px_#f59e0b]',
  'shadow-[4px_4px_0px_#0ea5e9]',
  'shadow-[4px_4px_0px_#16a34a]',
  'shadow-[4px_4px_0px_#dc2626]'
];

export const FotoKilas: React.FC<FotoKilasProps> = ({ events, onOpenPhoto, setActiveTab }) => {
  const photos = events
    .slice()
    .sort((a, b) => (a.dateIso < b.dateIso ? 1 : -1))
    .flatMap((e) => e.photos.map((p) => ({ ...p, event: e })))
    .slice(0, 6);

  if (photos.length === 0) return null;

  return (
    <section className="py-12 bg-rose-100 border-b-4 border-black relative overflow-hidden">
      {/* Dotted pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#be123c_2px,transparent_2px)] [background-size:26px_26px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <div className="bg-sky-300 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] p-2 -rotate-3">
              <Camera className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-black leading-tight">
                  Foto Kilas Terbaru
                </h2>
                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md border-2 border-black shadow-[2px_2px_0px_#000] rotate-1">
                  📸 BARU!
                </span>
              </div>
              <p className="text-xs font-bold text-stone-600">
                Dokumentasi terkini kegiatan warga RT 09
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('galeri')}
            className="bg-black hover:bg-stone-800 text-white font-black text-xs px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_#0ea5e9] hover:shadow-[2px_2px_0px_#0ea5e9] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Images className="w-4 h-4 text-sky-300" />
            Buka Galeri Lengkap
            <ChevronRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {photos.map(({ id, url, caption, event }, index) => (
            <button
              key={id}
              onClick={() => onOpenPhoto({ id, url, caption }, event.photos)}
              className={`group relative block w-full h-28 sm:h-44 rounded-none overflow-hidden border-2 sm:border-4 border-black hover:translate-y-[-3px] transition-all cursor-pointer bg-stone-200 ${ROTATION_CLASSES[index % ROTATION_CLASSES.length]} ${SHADOW_CLASSES[index % SHADOW_CLASSES.length]}`}
              aria-label="Lihat foto lebih besar"
            >
              <img
                src={url}
                alt={caption || 'Dokumentasi kegiatan RT 09'}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover block"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
