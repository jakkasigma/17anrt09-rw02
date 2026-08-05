import React, { useEffect } from 'react';
import { TimelineEvent, PhotoDocumentation } from '../types';
import { getEventStatus } from '../utils/eventStatus';
import { Calendar, Clock, MapPin, CheckCircle2, Hourglass, Camera, Sparkles, Eye, ArrowLeft, UserCheck, ListChecks, Gift, MessageSquare, Activity } from 'lucide-react';
import { COMMITTEE, MAP_LINK } from '../data/committee';
import { triggerMerdekaConfetti } from '../utils/confetti';

const ROTATION_CLASSES = [
  'rotate-[-1.5deg]',
  'rotate-[1.5deg]',
  'rotate-[-2deg]',
  'rotate-[2deg]',
  'rotate-[-1deg]'
];

interface EventDetailPageProps {
  event: TimelineEvent | null;
  onBack: () => void;
  onOpenPhoto: (photo: PhotoDocumentation, allPhotos: PhotoDocumentation[]) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  event,
  onBack,
  onOpenPhoto,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  if (!event) return null;

  const isLomba = !!event.status;
  const dateStatus = getEventStatus(event.dateIso, event.timeStart, event.timeEnd);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900">
      <div className={`border-b-4 border-black ${event.bgColor}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-3xl sm:text-4xl shrink-0">
              {event.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <span className="bg-black text-white text-[11px] font-black px-2.5 py-0.5 rounded-lg">
                POS ROADMAP {event.stepNumber}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-black leading-tight mt-1.5">
                {event.title}
              </h1>
              <p className="text-sm sm:text-base font-bold text-stone-800 mt-0.5">
                {event.subtitle}
              </p>
            </div>
            <button
              onClick={onBack}
              className="bg-white hover:bg-red-200 text-black font-black p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer shrink-0"
              aria-label="Kembali"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
        {/* Status & Category */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="bg-sky-200 text-black text-xs font-black px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
            Kategori: {event.category}
          </span>

          {isLomba ? (
            event.status === 'Selesai' || dateStatus === 'selesai' ? (
              <span className="bg-emerald-300 text-black text-xs font-black px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-900" /> Status: Selesai
              </span>
            ) : dateStatus === 'berlangsung' ? (
              <span className="bg-red-500 text-white text-xs font-black px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 animate-pulse">
                <Activity className="w-3.5 h-3.5 text-yellow-200" /> Status: Sedang Berlangsung
              </span>
            ) : event.status === 'Segera' ? (
              <span className="bg-amber-300 text-stone-900 text-xs font-black px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
                <Hourglass className="w-3.5 h-3.5 text-amber-900" /> Status: Segera
              </span>
            ) : (
              <span className="bg-emerald-300 text-black text-xs font-black px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-emerald-900" /> Daftar On The Spot
              </span>
            )
          ) : dateStatus === 'selesai' ? (
            <span className="bg-emerald-300 text-black text-xs font-black px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-900" /> Status: Selesai Terlaksana
            </span>
          ) : dateStatus === 'berlangsung' ? (
            <span className="bg-red-500 text-white text-xs font-black px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 animate-pulse">
              <Activity className="w-3.5 h-3.5 text-yellow-200" /> Status: Sedang Berlangsung
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
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            title="Buka lokasi di Google Maps"
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-800 hover:text-red-600 hover:underline cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{event.location}</span>
          </a>
        </div>

        {/* Lomba: daftar on the spot */}
        {isLomba && event.status === 'Pendaftaran Dibuka' && dateStatus !== 'selesai' && (
          <div className="bg-emerald-200 border-3 border-black rounded-2xl p-4 flex items-start gap-3 shadow-[4px_4px_0px_#000]">
            <div className="text-3xl">🏃</div>
            <div>
              <h4 className="text-sm font-black text-black">
                Pendaftaran On The Spot
              </h4>
              <p className="text-xs font-bold text-stone-800 leading-relaxed mt-1">
                Tidak ada pendaftaran online. Datang lebih awal ke lokasi <span className="font-black underline">{event.location}</span> saat lomba berlangsung untuk didaftarkan panitia.
              </p>
            </div>
          </div>
        )}

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

        {/* Lomba: Rules */}
        {event.rules && event.rules.length > 0 && (
          <div>
            <h4 className="text-xs font-black text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <ListChecks className="w-3.5 h-3.5 text-black" /> Aturan Main & Syarat
            </h4>
            <div className="space-y-1.5">
              {event.rules.map((rule, idx) => (
                <div key={idx} className="bg-amber-100 border-2 border-black p-2.5 rounded-xl text-xs font-bold text-stone-900 flex items-start gap-2">
                  <span className="text-red-600 font-black shrink-0">•</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lomba: Prizes (secret teaser) */}
        {isLomba && (
          <div className="bg-emerald-100 border-3 border-dashed border-emerald-700 rounded-2xl p-4 shadow-[4px_4px_0px_#000] flex items-start gap-3">
            <div className="text-3xl">🎁</div>
            <div>
              <h4 className="text-sm font-black text-emerald-900 flex items-center gap-1">
                <Gift className="w-4 h-4 text-emerald-700" /> Hadiah Pemenang
              </h4>
              <p className="text-xs font-black text-emerald-800 leading-relaxed mt-1">
                🤫 Rahasia & kejutan! Hadiah pemenang dirahasiakan panitia — datang & ikut lombanya, buktikan kemampuanmu!
              </p>
            </div>
          </div>
        )}

        {/* Lomba: Kontak Person */}
        {isLomba && (
          <div>
            <h4 className="text-xs font-black text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-black" /> Kontak Person Lomba
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMMITTEE.map((person) => (
                <div key={person.waNumber} className="bg-sky-100 border-3 border-black rounded-2xl p-4 flex items-center justify-between gap-3 shadow-[4px_4px_0px_#000]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white rounded-xl border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000]">
                      {person.emoji}
                    </div>
                    <div>
                      <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                        {person.role}
                      </span>
                      <p className="text-sm font-black text-black mt-0.5">
                        {person.name}
                      </p>
                      <p className="text-xs font-bold text-stone-700">
                        {person.phone}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${person.waNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black hover:bg-stone-800 text-white font-black text-xs px-3.5 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[2px_2px_0px_#000] transition-all inline-flex items-center gap-1.5 shrink-0"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-300" />
                    Chat
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photo Gallery Grid inside Detail */}
        <div>
          <h4 className="text-xs font-black text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Camera className="w-3.5 h-3.5 text-black" /> Dokumentasi Foto Acara Ini
          </h4>
          {event.photos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {event.photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => onOpenPhoto(photo, event.photos)}
                  className={`relative h-40 sm:h-52 rounded-none overflow-hidden border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] hover:shadow-[6px_6px_0px_#000] sm:hover:shadow-[8px_8px_0px_#000] hover:-translate-y-0.5 transition-all cursor-pointer bg-stone-200 group ${ROTATION_CLASSES[index % ROTATION_CLASSES.length]}`}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || 'Dokumentasi kegiatan RT 09'}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {photo.caption && (
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[11px] font-bold px-2.5 py-1.5 text-left">
                      {photo.caption}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Eye className="w-6 h-6" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-stone-200 border-3 border-dashed border-stone-500 rounded-3xl p-8 text-center space-y-3">
              <div className="w-14 h-14 mx-auto bg-white rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center rotate-[-3deg]">
                <Camera className="w-7 h-7 text-stone-500" />
              </div>
              <h4 className="text-base sm:text-lg font-black text-black">
                Belum Ada Foto Dokumentasi
              </h4>
              <p className="text-xs sm:text-sm font-bold text-stone-700 max-w-md mx-auto leading-relaxed">
                Dokumentasi kegiatan ini akan diunggah panitia setelah acara berlangsung. Pantau terus Papan Pengumuman di beranda untuk info terbaru!
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-stone-100 border-3 border-black rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
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
            onClick={onBack}
            className="bg-black hover:bg-stone-800 text-white font-black text-xs px-5 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
        </div>
      </div>
    </div>
  );
};
