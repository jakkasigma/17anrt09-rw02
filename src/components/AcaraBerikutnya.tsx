import React from 'react';
import { TimelineEvent } from '../types';
import { getEventStatus } from '../utils/eventStatus';
import { Calendar, Clock, MapPin, ChevronRight, Rocket } from 'lucide-react';

interface AcaraBerikutnyaProps {
  events: TimelineEvent[];
  onOpenEventDetail: (event: TimelineEvent) => void;
}

const toMs = (dateIso: string, timeStart: string) =>
  new Date(`${dateIso}T${timeStart}:00`).getTime();

export const AcaraBerikutnya: React.FC<AcaraBerikutnyaProps> = ({ events, onOpenEventDetail }) => {
  const nowMs = Date.now();
  const upcoming = events
    .filter((e) => getEventStatus(e.dateIso, e.timeStart) === 'mendatang')
    .sort((a, b) => toMs(a.dateIso, a.timeStart) - toMs(b.dateIso, b.timeStart));
  const next = upcoming[0];

  if (!next) {
    return (
      <section className="py-12 bg-sky-100 border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0369a1_2px,transparent_2px)] [background-size:26px_26px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-emerald-200 border-4 border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#059669] text-center space-y-2">
            <div className="text-4xl">🎆</div>
            <h2 className="text-xl sm:text-2xl font-black text-black">
              Seluruh rangkaian acara telah selesai!
            </h2>
            <p className="text-sm font-bold text-stone-800">
              Terima kasih atas partisipasi dan semangat warga RT 09 Ngadisuryan. Merdeka!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const daysLeft = Math.ceil((toMs(next.dateIso, next.timeStart) - nowMs) / (1000 * 60 * 60 * 24));

  return (
    <section className="py-12 bg-sky-100 border-b-4 border-black relative overflow-hidden">
      {/* Dotted pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0369a1_2px,transparent_2px)] [background-size:26px_26px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-black rounded-xl border-2 border-black shadow-[3px_3px_0px_#fff] p-2 rotate-[-2deg]">
            <Rocket className="w-5 h-5 text-yellow-300 animate-bounce" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-black">
            Acara Berikutnya
          </h2>
          <span className="bg-white text-black text-[10px] font-black px-2.5 py-1 rounded-full border-2 border-black rotate-1">
            NEXT UP ➜
          </span>
        </div>

        <div className={`bg-white border-4 border-black rounded-3xl p-5 sm:p-7 shadow-[8px_8px_0px_#dc2626] flex flex-col sm:flex-row items-start sm:items-center gap-5 relative ${next.bgColor}`}>
          {/* Inner dashed frame */}
          <div className="absolute inset-3 rounded-2xl border-2 border-dashed border-black/30 pointer-events-none"></div>

          <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-4xl sm:text-5xl shrink-0 rotate-[-3deg]">
            {next.emoji}
          </div>

          <div className="relative z-10 flex-1 min-w-0 space-y-2 text-left">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                POS ROADMAP {next.stepNumber}
              </span>
              <span className="bg-white text-black text-[10px] font-black px-2 py-0.5 rounded-md border border-black">
                {next.category}
              </span>
              <span
                className={`text-[10px] font-black px-2.5 py-0.5 rounded-md border-2 border-black shadow-[2px_2px_0px_#000] ${
                  daysLeft <= 0 ? 'bg-red-500 text-white rotate-[-1deg] animate-pulse' : 'bg-amber-300 text-black rotate-1'
                }`}
              >
                {daysLeft <= 0 ? 'HARI INI!' : `⏳ Tinggal ${daysLeft} hari lagi`}
              </span>
            </div>

            <h3 className="text-lg sm:text-2xl font-black text-black leading-tight">
              {next.title}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-stone-700">
              {next.subtitle}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm font-bold text-stone-800 bg-white/70 border border-black rounded-xl px-3 py-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-red-600" /> {next.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-amber-600" /> {next.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-emerald-600" /> {next.location}
              </span>
            </div>
          </div>

          <button
            onClick={() => onOpenEventDetail(next)}
            className="relative z-10 bg-black hover:bg-stone-800 text-white font-black text-sm px-5 py-3 rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000] hover:shadow-[3px_3px_0px_#000] transition-all cursor-pointer flex items-center gap-2 shrink-0"
          >
            Buka Detail Pos
            <ChevronRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
