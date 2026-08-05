import React, { useState, useRef } from 'react';
import { LombaItem } from '../types';
import { useModalA11y } from '../utils/useModalA11y';
import { Trophy, Calendar, MapPin, UserCheck, Gift, Phone, X } from 'lucide-react';

interface JadwalLombaProps {
  lombaList: LombaItem[];
}

export const JadwalLomba: React.FC<JadwalLombaProps> = ({ lombaList }) => {
  const [selected, setSelected] = useState<LombaItem | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalA11y(!!selected, () => setSelected(null), dialogRef);

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

  const statusClass = (status: string) =>
    status === 'Selesai'
      ? 'bg-emerald-300 text-black'
      : status === 'Pendaftaran Dibuka'
      ? 'bg-amber-300 text-black'
      : 'bg-stone-200 text-stone-700';

  return (
    <section className="py-12 bg-stone-50 border-b-4 border-black min-h-screen">
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
                <div
                  key={lomba.id}
                  onClick={() => setSelected(lomba)}
                  className="bg-white border-2 sm:border-4 border-black rounded-2xl sm:rounded-3xl p-2 sm:p-4 shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:-translate-y-1 hover:rotate-[-0.5deg] transition-all flex flex-col cursor-pointer group"
                >
                  {/* Pin & Emoji */}
                  <div className="flex items-start justify-between mb-1.5 sm:mb-3">
                    <span className="text-2xl sm:text-5xl group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      {lomba.emoji}
                    </span>
                    <span className="text-[9px] sm:text-xs font-black text-amber-700 flex items-center gap-0.5">
                      📌 Pengumuman
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-[11px] sm:text-lg font-black text-black leading-tight truncate group-hover:text-red-600 transition-colors">
                    {lomba.title}
                  </h4>

                  {/* Date & Time */}
                  <div className="text-[8px] sm:text-xs font-bold text-red-600 flex items-center gap-0.5 sm:gap-1 mt-0.5 truncate">
                    <Calendar className="w-2 h-2 sm:w-3.5 sm:h-3.5 inline shrink-0" />
                    <span className="truncate">{lomba.date} ({lomba.time})</span>
                  </div>

                  {/* Category & Status Badges */}
                  <div className="flex items-center justify-between gap-1 mt-1.5 sm:mt-3">
                    <span className="bg-sky-200 text-stone-900 text-[7px] sm:text-xs font-black px-1 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg border border-black sm:border-2 truncate max-w-[60%]">
                      {lomba.category}
                    </span>
                    <span className={`${statusClass(lomba.status)} text-[7px] sm:text-xs font-black px-1 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg border border-black sm:border-2 shrink-0 truncate`}>
                      {lomba.status}
                    </span>
                  </div>

                  {/* Click hint */}
                  <div className="mt-1.5 sm:mt-3 text-[8px] sm:text-[11px] font-black bg-amber-200 border border-black sm:border-2 rounded-lg text-center py-0.5 sm:py-1.5">
                    Klik untuk detail 👉
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* DETAIL POPUP */}
        {selected && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setSelected(null)}
          >
            <div
              ref={dialogRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label={`Detail Lomba: ${selected.title}`}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-4 border-black rounded-3xl max-w-lg w-full shadow-[10px_10px_0px_#000] relative max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b-4 border-black flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-4xl p-2 bg-amber-200 rounded-2xl border-2 border-black shrink-0">
                    {selected.emoji}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-black text-black leading-tight">
                      {selected.title}
                    </h3>
                    <span className="inline-block bg-sky-200 text-stone-900 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-lg border border-black mt-1">
                      {selected.category}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="bg-stone-200 hover:bg-red-200 font-black text-black px-3 py-1 rounded-xl border-2 border-black text-sm cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 space-y-4">
                {/* Status */}
                <span className={`inline-block ${statusClass(selected.status)} text-xs font-black px-3 py-1 rounded-xl border-2 border-black`}>
                  {selected.status === 'Selesai' ? '✅ Telah Selesai' : selected.status === 'Pendaftaran Dibuka' ? '🔓 Pendaftaran Dibuka' : '🔒 Pendaftaran Ditutup'}
                </span>

                {/* Jadwal & Lokasi */}
                <div className="bg-stone-100 border-3 border-black rounded-2xl p-4 space-y-2 text-xs sm:text-sm font-bold">
                  <div className="flex items-center gap-2 text-black">
                    <Calendar className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{selected.date} - {selected.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-800">
                    <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{selected.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-800">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>PIC: {selected.picName} ({selected.picPhone})</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-800">
                    <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Peserta: {selected.registeredCount}{selected.maxParticipants ? ` / ${selected.maxParticipants}` : ''} Orang</span>
                  </div>
                </div>

                {/* Rules */}
                <div>
                  <h4 className="text-xs font-black text-stone-500 uppercase tracking-wider mb-2">Aturan Main & Syarat</h4>
                  <div className="space-y-1.5">
                    {selected.rules.map((rule, idx) => (
                      <div key={idx} className="bg-amber-100 border-2 border-black p-2.5 rounded-xl text-xs font-bold text-stone-900 flex items-start gap-2">
                        <span className="text-red-600 font-black shrink-0">•</span>
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prizes */}
                <div className="bg-emerald-100 border-3 border-black rounded-2xl p-4">
                  <h4 className="text-xs font-black text-emerald-900 flex items-center gap-1.5 mb-1.5">
                    <Gift className="w-4 h-4 text-emerald-700" /> Hadiah Pemenang
                  </h4>
                  <p className="text-sm font-black text-emerald-800">
                    🎁 Rahasia & Kejutan! Akan diumumkan panitia nanti ya.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-stone-100 border-t-3 border-black flex justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="bg-black hover:bg-stone-800 text-white font-black text-xs px-5 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
