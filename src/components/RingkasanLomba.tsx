import React from 'react';
import { LombaItem } from '../types';
import { Trophy, Calendar, Clock, Users, ChevronRight, Lock } from 'lucide-react';

interface RingkasanLombaProps {
  lombaList: LombaItem[];
  setActiveTab: (tab: string) => void;
  onOpenEventDetail: (lomba: LombaItem) => void;
}

const ROTATION_CLASSES = ['rotate-[-1deg]', 'rotate-[1deg]', 'rotate-[-1.5deg]'];

export const RingkasanLomba: React.FC<RingkasanLombaProps> = ({ lombaList, setActiveTab, onOpenEventDetail }) => {
  const active = lombaList.filter((l) => l.status === 'Pendaftaran Dibuka').slice(0, 3);
  const shown = active.length > 0 ? active : lombaList.slice(0, 3);

  if (lombaList.length === 0) return null;

  return (
    <section className="py-12 bg-emerald-100 border-b-4 border-black relative overflow-hidden">
      {/* Dotted pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#166534_2px,transparent_2px)] [background-size:26px_26px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <div className="bg-amber-300 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] p-2 rotate-[-2deg]">
              <Trophy className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-black leading-tight">
                Lomba Seru 17-an
              </h2>
              <p className="text-xs font-bold text-stone-600">
                Ajak anak cucu cicit ikut meramaikan!
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('lomba')}
            className="bg-black hover:bg-stone-800 text-white font-black text-xs px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_#16a34a] hover:shadow-[2px_2px_0px_#16a34a] transition-all cursor-pointer flex items-center gap-1.5"
          >
            Lihat Semua Lomba
            <ChevronRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {shown.map((lomba, index) => (
            <button
              type="button"
              key={lomba.id}
              disabled={lomba.isLocked}
              onClick={lomba.isLocked ? undefined : () => onOpenEventDetail(lomba)}
              aria-label={lomba.isLocked ? 'Lomba terkunci - belum bisa dibuka' : `Lihat detail ${lomba.title}`}
              className={`border-4 border-black rounded-3xl p-5 shadow-[7px_7px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-y-1.5 transition-all relative overflow-hidden text-left ${
                lomba.isLocked
                  ? 'bg-zinc-900 cursor-not-allowed hover:shadow-[7px_7px_0px_#000] hover:-translate-y-0'
                  : `${lomba.bgColor} cursor-pointer ${ROTATION_CLASSES[index % ROTATION_CLASSES.length]}`
              }`}
            >
              {/* Locked fog overlay */}
              {lomba.isLocked && (
                <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/75 via-black/60 to-black/80 flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                  <span className="text-4xl drop-shadow-[2px_2px_0px_#000]">🔒</span>
                  <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">
                    TERKUNCI
                  </span>
                  <span className="text-white/70 text-xs font-bold text-center px-2 leading-tight">
                    Masih Misteri • Buka Hari-H
                  </span>
                </div>
              )}

              {/* Corner badge */}
              {!lomba.isLocked && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md border-2 border-black shadow-[2px_2px_0px_#000] rotate-6">
                  #{index + 1} 🔥
                </span>
              )}

              <div className={`flex items-center justify-between gap-2 ${lomba.isLocked ? 'opacity-30 blur-[2px]' : ''}`}>
                <div className="w-12 h-12 bg-white rounded-xl border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000]">
                  {lomba.emoji}
                </div>
                <span className="bg-emerald-300 text-black text-[10px] font-black px-2 py-0.5 rounded-md border border-black">
                  {lomba.status}
                </span>
              </div>

              <div className={lomba.isLocked ? 'opacity-40 blur-[1px] mt-2' : ''}>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-wider">
                  {lomba.category}
                </span>
                <h3 className={`text-base font-black leading-tight ${lomba.isLocked ? 'text-zinc-300' : 'text-black'}`}>
                  {lomba.title}
                </h3>
              </div>

              <div className={`space-y-1 text-xs font-bold text-stone-800 ${lomba.isLocked ? 'opacity-40 blur-[1px]' : ''}`}>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-red-600" /> {lomba.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> {lomba.time}
                </div>
              </div>

              <div className={`mt-3 pt-2 border-t-2 border-black/20 ${lomba.isLocked ? 'opacity-30 blur-[1px]' : ''}`}>
                <span className={`inline-flex items-center gap-1.5 text-[11px] font-black px-2.5 py-1 rounded-lg border border-black shadow-[2px_2px_0px_#000] ${
                  lomba.isLocked ? 'bg-zinc-700 text-zinc-400' : 'bg-black text-white'
                }`}>
                  {lomba.isLocked ? (
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-red-400" />
                      Terkunci 🔒
                    </span>
                  ) : (
                    <>
                      <Users className="w-3.5 h-3.5 text-amber-300" />
                      {lomba.registeredCount} peserta{lomba.maxParticipants ? ` / ${lomba.maxParticipants}` : ''}
                    </>
                  )}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
