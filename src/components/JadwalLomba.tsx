import React from 'react';
import { LombaItem } from '../types';
import { Trophy, Calendar, MapPin, ChevronRight } from 'lucide-react';

interface JadwalLombaProps {
  lombaList: LombaItem[];
  onOpenDetail: (lomba: LombaItem) => void;
}

export const JadwalLomba: React.FC<JadwalLombaProps> = ({ lombaList, onOpenDetail }) => {
  const lombaAnak = lombaList.filter((item) => item.category === 'Anak-Anak');
  const lombaUmum = lombaList.filter((item) => item.category === 'Umum');

  const groups = [
    {
      title: 'Lomba Anak-Anak',
      emoji: '🎈',
      desc: 'Lomba seru untuk putra-putri warga RT 09. Yuk ajak si kecil ikut meramaikan!',
      items: lombaAnak,
      pill: 'bg-sky-300',
      highlight: 'bg-sky-400',
      underline: 'border-sky-500',
      rotate: 'rotate-[-1deg]'
    },
    {
      title: 'Lomba Umum',
      emoji: '👥',
      desc: 'Ajang kekompakan untuk seluruh warga RT 09. Ajak keluarga dan tetangga ikut meramaikan!',
      items: lombaUmum,
      pill: 'bg-emerald-300',
      highlight: 'bg-emerald-400',
      underline: 'border-emerald-600',
      rotate: 'rotate-[1deg]'
    }
  ].filter((g) => g.items.length > 0);

  return (
    <section className="py-12 bg-stone-50 border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Neubrutalism */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-rose-300 text-black font-black text-xs sm:text-sm px-4 py-1.5 rounded-full border-3 border-black shadow-[3px_3px_0px_#000] rotate-[1deg]">
            <Trophy className="w-4 h-4 text-red-600 inline" />
            <span>PAPAN PENGUMUMAN LOMBA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight font-sans">
            Jadwal Lomba <span className="bg-amber-300 text-black px-3 py-1 rounded-2xl border-3 border-black inline-block shadow-[4px_4px_0px_#000] -rotate-1">17-an</span>
          </h2>

          <p className="text-stone-700 font-bold text-base sm:text-lg">
            Simak jadwal lomba kemerdekaan HUT RI ke-81 RT 09. Klik kartu pengumuman untuk melihat detail lengkap tiap lomba!
          </p>
        </div>

        {/* LOMBA GROUPS */}
        {groups.map((group) => (
          <div key={group.title} className="mb-12">
            {/* Group Header */}
            <div className={`mb-6 sm:mb-8 border-b-8 ${group.underline} pb-4 sm:pb-6`}>
              <div className={`inline-flex items-center gap-1.5 sm:gap-2 ${group.pill} text-black font-black text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full border-3 border-black shadow-[3px_3px_0px_#000] ${group.rotate}`}>
                <span className="text-base sm:text-xl">{group.emoji}</span>
                <span>{group.title.toUpperCase()}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-black tracking-tight mt-3 sm:mt-4">
                {group.title}{' '}
                <span className={`${group.highlight} text-black px-2.5 sm:px-3 py-0.5 rounded-xl border-2 sm:border-3 border-black inline-block shadow-[3px_3px_0px_#000] rotate-1`}>
                  {group.items.length} Lomba
                </span>
              </h3>

              <p className="text-stone-600 font-bold text-xs sm:text-sm mt-2 sm:mt-3 max-w-2xl">
                {group.desc}
              </p>
            </div>

            {/* ANNOUNCEMENT BOARD GRID - 3 columns all sizes */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
              {group.items.map((lomba) => (
                <button
                  type="button"
                  key={lomba.id}
                  disabled={lomba.isLocked}
                  onClick={lomba.isLocked ? undefined : () => onOpenDetail(lomba)}
                  aria-label={lomba.isLocked ? 'Lomba terkunci - belum bisa dibuka' : `Lihat detail ${lomba.title}`}
                  className={`bg-white border-2 sm:border-4 border-black rounded-2xl sm:rounded-3xl p-2 sm:p-4 shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:-translate-y-1 hover:rotate-[-0.5deg] transition-all flex flex-col group text-left ${
                    lomba.isLocked
                      ? 'bg-zinc-900 cursor-not-allowed hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0 hover:rotate-0 relative overflow-hidden'
                      : 'cursor-pointer'
                  }`}
                >
                  {/* Locked fog overlay */}
                  {lomba.isLocked && (
                    <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/75 via-black/60 to-black/80 flex flex-col items-center justify-center gap-1 pointer-events-none">
                      <span className="text-3xl sm:text-5xl drop-shadow-[2px_2px_0px_#000]">🔒</span>
                      <span className="bg-red-600 text-white text-[8px] sm:text-xs font-black px-2 sm:px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">
                        TERKUNCI
                      </span>
                      <span className="text-white/70 text-[7px] sm:text-[11px] font-bold text-center px-2 leading-tight">
                        Masih Misteri • Buka Hari-H
                      </span>
                    </div>
                  )}

                  {/* Pin & Emoji */}
                  <div className={`flex items-start justify-between mb-1.5 sm:mb-3 ${lomba.isLocked ? 'opacity-30 blur-[2px]' : ''}`}>
                    <span className="text-2xl sm:text-5xl group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      {lomba.emoji}
                    </span>
                    <span className="text-[9px] sm:text-xs font-black text-amber-700 flex items-center gap-0.5">
                      📌 Pengumuman
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className={`text-[11px] sm:text-lg font-black text-black leading-tight truncate group-hover:text-red-600 transition-colors ${lomba.isLocked ? 'text-zinc-300 group-hover:text-zinc-300 opacity-40 blur-[1px]' : ''}`}>
                    {lomba.title}
                  </h4>

                  {/* Date & Time */}
                  <div className={`text-[8px] sm:text-xs font-bold text-red-600 flex items-center gap-0.5 sm:gap-1 mt-0.5 truncate ${lomba.isLocked ? 'opacity-40 blur-[1px]' : ''}`}>
                    <Calendar className="w-2 h-2 sm:w-3.5 sm:h-3.5 inline shrink-0" />
                    <span className="truncate">{lomba.date} ({lomba.time})</span>
                  </div>

                  {/* Category & Status Badges */}
                  <div className={`flex items-center justify-between gap-1 mt-1.5 sm:mt-3 ${lomba.isLocked ? 'opacity-40 blur-[1px]' : ''}`}>
                    <span className="bg-sky-200 text-stone-900 text-[7px] sm:text-xs font-black px-1 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg border border-black sm:border-2 truncate max-w-[60%]">
                      {lomba.category}
                    </span>
                    <span className="bg-amber-300 text-black text-[7px] sm:text-xs font-black px-1 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg border border-black sm:border-2 shrink-0 truncate">
                      {lomba.status}
                    </span>
                  </div>

                  {/* Location + Click hint */}
                  <div className={`mt-1.5 sm:mt-3 space-y-1 ${lomba.isLocked ? 'opacity-30 blur-[1px]' : ''}`}>
                    <div className="text-[8px] sm:text-[11px] font-bold text-stone-700 flex items-center gap-1 truncate">
                      <MapPin className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-red-600 shrink-0" />
                      <span className="truncate">{lomba.location}</span>
                    </div>
                    <div className={`text-[8px] sm:text-[11px] font-black border border-black sm:border-2 rounded-lg text-center py-0.5 sm:py-1.5 flex items-center justify-center gap-1 ${
                      lomba.isLocked ? 'bg-zinc-700 text-zinc-400' : 'bg-amber-200'
                    }`}>
                      {lomba.isLocked ? (
                        <>🔒 Terkunci <span className="animate-pulse">...</span></>
                      ) : (
                        <>
                          Klik untuk detail
                          <ChevronRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                        </>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};
