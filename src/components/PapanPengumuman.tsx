import React from 'react';
import { Announcement } from '../types';
import { Pin, Megaphone } from 'lucide-react';

interface PapanPengumumanProps {
  announcements: Announcement[];
}

const TAG_STYLE: Record<string, { badge: string; tile: string; border: string; shadow: string }> = {
  Penting: {
    badge: 'bg-red-500 text-white',
    tile: 'bg-red-500 text-white',
    border: 'border-red-500',
    shadow: 'shadow-[4px_4px_0px_#dc2626]'
  },
  Info: {
    badge: 'bg-sky-300 text-black',
    tile: 'bg-sky-300 text-black',
    border: 'border-sky-400',
    shadow: 'shadow-[4px_4px_0px_#0ea5e9]'
  },
  Pengumuman: {
    badge: 'bg-amber-300 text-black',
    tile: 'bg-amber-300 text-black',
    border: 'border-amber-400',
    shadow: 'shadow-[4px_4px_0px_#f59e0b]'
  }
};

export const PapanPengumuman: React.FC<PapanPengumumanProps> = ({ announcements }) => {
  const sorted = [...announcements].sort((a, b) => Number(b.pinned ?? false) - Number(a.pinned ?? false));

  if (announcements.length === 0) return null;

  return (
    <section className="py-12 bg-amber-100 border-b-4 border-black relative overflow-hidden">
      {/* Dotted pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#b45309_2px,transparent_2px)] [background-size:26px_26px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white border-4 border-black rounded-3xl p-5 sm:p-7 shadow-[8px_8px_0px_#000] relative">
          {/* Washi tape sticker */}
          <div className="absolute -top-4 left-6 bg-red-500 text-white text-[11px] font-black px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">
            📌 INFO TERBARU
          </div>

          <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-black">
            <div className="bg-red-500 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] p-2 -rotate-3">
              <Megaphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-black leading-tight">
                Papan Pengumuman
              </h2>
              <p className="text-xs font-bold text-stone-600">
                Informasi terbaru seputar acara HUT RI ke-81 dari Pengurus RT 09
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {sorted.map((a) => {
              const style = TAG_STYLE[a.tag] ?? TAG_STYLE.Pengumuman;
              return (
                <div
                  key={a.id}
                  className={`bg-white border-2 border-black rounded-2xl p-3.5 sm:p-4 flex items-start gap-3 relative overflow-hidden ${style.border} ${style.shadow}`}
                >
                  <div className={`text-3xl sm:text-4xl shrink-0 p-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] ${style.tile}`}>
                    {a.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border border-black ${style.badge}`}>
                        {a.tag}
                      </span>
                      {a.pinned && (
                        <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 rotate-1">
                          <Pin className="w-3 h-3 text-yellow-300" /> DIPIN
                        </span>
                      )}
                      <span className="text-[10px] font-bold text-stone-500">{a.date}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-black leading-snug">
                      {a.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-stone-700 leading-relaxed mt-1">
                      {a.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
