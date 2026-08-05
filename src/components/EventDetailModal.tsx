import React, { useRef } from 'react';
import { TimelineEvent, PhotoDocumentation } from '../types';
import { getEventStatus } from '../utils/eventStatus';
import { useModalA11y } from '../utils/useModalA11y';
import { Calendar, Clock, MapPin, CheckCircle2, Hourglass, Camera, X, Sparkles, Eye } from 'lucide-react';
import { triggerMerdekaConfetti } from '../utils/confetti';

interface EventDetailModalProps {
  event: TimelineEvent | null;
  onClose: () => void;
  onOpenPhoto: (photo: PhotoDocumentation, allPhotos: PhotoDocumentation[]) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onOpenPhoto,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalA11y(!!event, onClose, dialogRef);

  const isPast = event ? getEventStatus(event.dateIso, event.timeStart) === 'selesai' : false;

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={event.title}
        className="bg-white border-4 border-black rounded-3xl max-w-2xl w-full shadow-[12px_12px_0px_#000] overflow-hidden max-h-[90vh] flex flex-col"
      >
        
        {/* Header Bar */}
        <div className={`p-5 border-b-4 border-black flex items-center justify-between ${event.bgColor}`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl border-3 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-3xl">
              {event.emoji}
            </div>
            <div>
              <span className="bg-black text-white text-[11px] font-black px-2.5 py-0.5 rounded-lg">
                POS ROADMAP {event.stepNumber}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-black leading-tight">
                {event.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="bg-white hover:bg-red-200 text-black font-black p-2 rounded-xl border-2 border-black text-base cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-left">
          
          {/* Status & Category */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="bg-sky-200 text-black text-xs font-black px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
              Kategori: {event.category}
            </span>

            {isPast ? (
              <span className="bg-emerald-300 text-black text-xs font-black px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-900" /> Status: Selesai Terlaksana
              </span>
            ) : (
              <span className="bg-amber-300 text-stone-900 text-xs font-black px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
                <Hourglass className="w-3.5 h-3.5 text-amber-900" /> Status: Mendatang
              </span>
            )}
          </div>

          {/* Time & Location Box */}
          <div className="bg-stone-100 border-3 border-black rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-black">
              <Calendar className="w-4 h-4 text-red-600" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-800">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-800">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-black text-stone-500 uppercase tracking-wider mb-1">
              Deskripsi Lengkap Pos Kegiatan
            </h4>
            <p className="text-stone-800 font-medium text-sm leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-xs font-black text-stone-500 uppercase tracking-wider mb-2">
              Agenda & Sorotan Kegiatan
            </h4>
            <div className="space-y-1.5">
              {event.highlights.map((h, idx) => (
                <div key={idx} className="bg-amber-100 border-2 border-black p-2.5 rounded-xl text-xs font-bold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Gallery Grid inside Detail */}
          {event.photos.length > 0 && (
            <div>
              <h4 className="text-xs font-black text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-black" /> Dokumentasi Foto Acara Ini
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {event.photos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => onOpenPhoto(photo, event.photos)}
                    className="relative h-32 sm:h-40 rounded-2xl overflow-hidden border-2 border-black shadow-[3px_3px_0px_#000] hover:scale-105 transition-transform cursor-pointer bg-stone-200 group"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || 'Dokumentasi kegiatan RT 09'}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Eye className="w-5 h-5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-100 border-t-3 border-black flex items-center justify-between">
          <button
            onClick={() => {
              triggerMerdekaConfetti();
            }}
            className="bg-amber-300 hover:bg-amber-400 text-black font-black text-xs px-4 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-red-600" />
            <span>Semangati Pos Ini!</span>
          </button>

          <button
            onClick={onClose}
            className="bg-black hover:bg-stone-800 text-white font-black text-xs px-5 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            Tutup Modal
          </button>
        </div>

      </div>
    </div>
  );
};
