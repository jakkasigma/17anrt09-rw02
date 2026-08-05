import React from 'react';
import { TimelineEvent, PhotoDocumentation } from '../types';
import { Camera, Images, Eye } from 'lucide-react';

interface GaleriProps {
  events: TimelineEvent[];
  onOpenPhoto: (photo: PhotoDocumentation, allPhotos: PhotoDocumentation[]) => void;
}

const ROTATION_CLASSES = [
  'rotate-[-1.5deg]',
  'rotate-[1.5deg]',
  'rotate-[-2deg]',
  'rotate-[2deg]',
  'rotate-[-1deg]'
];

export const Galeri: React.FC<GaleriProps> = ({ events, onOpenPhoto }) => {
  const groups = events.filter((e) => e.photos.length > 0);
  const totalPhotos = events.reduce((sum, e) => sum + e.photos.length, 0);

  return (
    <section className="py-12 bg-stone-50 border-b-4 border-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-sky-300 text-black font-black text-xs sm:text-sm px-4 py-1.5 rounded-full border-3 border-black shadow-[3px_3px_0px_#000] rotate-[1deg]">
            <Camera className="w-4 h-4 text-black inline" />
            <span>GALERI DOKUMENTASI</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight font-sans">
            Galeri Foto <span className="bg-amber-300 text-black px-3 py-1 rounded-2xl border-3 border-black inline-block shadow-[4px_4px_0px_#000] -rotate-1">17-an</span>
          </h2>

          <p className="text-stone-700 font-bold text-base sm:text-lg">
            Kumpulan dokumentasi seluruh kegiatan HUT RI ke-81 RT 09. Klik foto untuk melihat lebih besar.
          </p>
        </div>

        {groups.length === 0 ? (
          <div className="text-center bg-white border-4 border-black rounded-3xl p-10 shadow-[8px_8px_0px_#000]">
            <Images className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <p className="text-stone-600 font-black">Belum ada foto yang diunggah.</p>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="bg-amber-100 border-2 border-black rounded-xl px-4 py-2 inline-flex items-center gap-2 text-xs font-black text-stone-900 shadow-[2px_2px_0px_#000]">
              <Camera className="w-4 h-4 text-red-600" />
              {groups.length} Kegiatan • {totalPhotos} Foto
            </div>

            {groups.map((event) => (
              <div key={event.id}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{event.emoji}</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight">
                      {event.title}
                    </h3>
                    <span className="text-xs font-bold text-stone-600">
                      {event.date} • {event.photos.length} foto
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 items-start">
                  {event.photos.map((photo, index) => (
                    <button
                      key={photo.id}
                      onClick={() => onOpenPhoto(photo, event.photos)}
                      className={`group relative block w-full ${ROTATION_CLASSES[index % ROTATION_CLASSES.length]} rounded-none overflow-hidden border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] hover:shadow-[7px_7px_0px_#000] sm:hover:shadow-[9px_9px_0px_#000] hover:-translate-y-0.5 transition-all cursor-pointer bg-stone-200`}
                      aria-label="Lihat foto lebih besar"
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption || 'Dokumentasi kegiatan RT 09'}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-40 sm:h-56 object-cover block"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Eye className="w-6 h-6" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
