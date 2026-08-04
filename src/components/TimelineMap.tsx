import React, { useState, useEffect } from 'react';
import { TimelineEvent, PhotoDocumentation } from '../types';
import { Calendar, MapPin, Clock, Camera, CheckCircle2, Hourglass, Filter, ChevronRight, Compass, Flag, MousePointerClick } from 'lucide-react';

interface TimelineMapProps {
  events: TimelineEvent[];
  onOpenPhoto: (photo: PhotoDocumentation, allPhotos: PhotoDocumentation[]) => void;
  onOpenEventDetail: (event: TimelineEvent) => void;
}

const WAVE_X: [number, number][] = [
  [60, 80], [950, 920], [380, 340], [980, 940], [40, 90], [880, 850],
  [120, 150], [940, 900], [300, 260], [970, 930], [80, 130]
];

const buildPathD = () => {
  let d = 'M 500 60';
  WAVE_X.forEach(([x1, x2], i) => {
    const y0 = 60 + i * 180;
    const y1 = y0 + 180;
    d += ` C ${x1} ${y0}, ${x2} ${y1}, 500 ${y1}`;
  });
  return d;
};

const MAP_PATH_D = buildPathD();

const getMarkerPoint = (index: number) => {
  const [x1, x2] = WAVE_X[index % WAVE_X.length];
  const y = 60 + index * 180 + 90;
  const x = (1000 + 3 * (x1 + x2)) / 8;
  return { x, y };
};

const bezierPoint = (x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, t: number) => {
  const mt = 1 - t;
  const a = mt * mt * mt;
  const b = 3 * mt * mt * t;
  const c = 3 * mt * t * t;
  const d = t * t * t;
  return {
    x: a * x0 + b * x1 + c * x2 + d * x3,
    y: a * y0 + b * y1 + c * y2 + d * y3
  };
};

const getPathPointBetween = (i: number, fraction: number) => {
  const y0 = 60 + i * 180;
  const [x1, x2] = WAVE_X[i % WAVE_X.length];
  const [xn1, xn2] = WAVE_X[(i + 1) % WAVE_X.length];
  if (fraction <= 0.5) {
    const t = 0.5 + fraction;
    return bezierPoint(500, y0, x1, y0, x2, y0 + 180, 500, y0 + 180, t);
  }
  const t = 2 * fraction - 1;
  return bezierPoint(500, y0 + 180, xn1, y0 + 180, xn2, y0 + 360, 500, y0 + 360, t);
};

const formatIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const toMs = (dateIso: string, timeStart: string) =>
  new Date(`${dateIso}T${timeStart}:00`).getTime();

export const TimelineMap: React.FC<TimelineMapProps> = ({
  events,
  onOpenPhoto,
  onOpenEventDetail,
}) => {
  const [filterStatus, setFilterStatus] = useState<'semua' | 'selesai' | 'mendatang' | 'anak'>('semua');

  // Today marker: refresh every minute
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const nowMs = now.getTime();
  const todayIso = formatIso(now);

  let marker: { x: number; y: number };
  let markerIsToday = false;

  const firstMs = toMs(events[0].dateIso, events[0].timeStart);
  const lastMs = toMs(events[events.length - 1].dateIso, events[events.length - 1].timeStart);

  if (nowMs < firstMs) {
    marker = { x: 500, y: 60 };
  } else if (nowMs >= lastMs) {
    marker = { x: 500, y: 2040 };
    markerIsToday = todayIso === events[events.length - 1].dateIso;
  } else {
    const nextIdx = events.findIndex((e) => toMs(e.dateIso, e.timeStart) > nowMs);
    const prevIdx = nextIdx - 1;
    const prevMs = toMs(events[prevIdx].dateIso, events[prevIdx].timeStart);
    const nextMs = toMs(events[nextIdx].dateIso, events[nextIdx].timeStart);
    const fraction = (nowMs - prevMs) / (nextMs - prevMs);
    if (fraction <= 0) {
      marker = getMarkerPoint(prevIdx);
    } else if (fraction >= 1) {
      marker = getMarkerPoint(nextIdx);
    } else {
      marker = getPathPointBetween(prevIdx, fraction);
    }
    markerIsToday = events[prevIdx].dateIso === todayIso || events[nextIdx].dateIso === todayIso;
  }

  // Filter events
  const filteredEvents = events.filter((evt) => {
    if (filterStatus === 'selesai') return evt.status === 'selesai';
    if (filterStatus === 'mendatang') return evt.status === 'mendatang';
    if (filterStatus === 'anak') return evt.isKidFriendly === true;
    return true;
  });

  const getRotationAngle = (index: number) => {
    const angles = [
      'rotate-[-2deg]', 'rotate-[1.5deg]', 'rotate-[-3deg]', 'rotate-[2.5deg]',
      'rotate-[-1deg]', 'rotate-[3deg]', 'rotate-[-2.5deg]', 'rotate-[1deg]',
      'rotate-[-1.5deg]', 'rotate-[2deg]', 'rotate-[-3deg]', 'rotate-[1.5deg]',
      'rotate-[-2deg]', 'rotate-[2.5deg]'
    ];
    return angles[index % angles.length];
  };

  const getOffsetX = (index: number) => {
    const offsets = [
      'lg:-translate-x-[240px]', 'lg:translate-x-[260px]', 'lg:translate-x-2', 'lg:translate-x-[300px]',
      'lg:-translate-x-[300px]', 'lg:translate-x-[180px]', 'lg:-translate-x-[180px]', 'lg:translate-x-[280px]',
      'lg:translate-x-12', 'lg:translate-x-[290px]', 'lg:-translate-x-[220px]', 'lg:translate-x-[240px]',
      'lg:-translate-x-[280px]', 'lg:translate-x-[140px]'
    ];
    return offsets[index % offsets.length];
  };

  return (
    <section id="timeline-section" className="py-12 bg-[#fefae0] relative overflow-hidden border-b-4 border-black">
      {/* Background treasure map grid pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#854d0e_2px,transparent_2px)] [background-size:28px_28px]"></div>

      {/* Decorative Compass & Map Accents */}
      <div className="absolute top-8 right-8 text-amber-900/15 pointer-events-none hidden md:block rotate-12">
        <Compass className="w-32 h-32" />
      </div>
      <div className="absolute bottom-12 left-6 text-amber-900/10 pointer-events-none hidden md:block -rotate-12">
        <Flag className="w-24 h-24" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-[1440px] relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-300 text-black font-black text-xs sm:text-sm px-4 py-1.5 rounded-full border-3 border-black shadow-[3px_3px_0px_#000] rotate-[-1deg]">
            <Compass className="w-4 h-4 text-red-600 animate-spin" />
            <span>PETA HARTA KARUN ACARA 🏴‍☠️</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight font-sans">
            Rute Jejak <span className="bg-red-600 text-white px-3 py-1 rounded-2xl border-3 border-black inline-block shadow-[4px_4px_0px_#000] rotate-1">Peta Petualangan</span>
          </h2>

          <p className="text-stone-800 font-bold text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Garis berliku menghubungkan setiap pos acara layaknya peta harta karun! Klik <span className="text-red-600 font-black underline">kartu kecil pos</span> untuk melihat detail kegiatan.
          </p>

          {/* Interactive Hint Banner */}
          <div className="inline-flex items-center gap-2 bg-amber-200 border-2 border-black rounded-xl px-3.5 py-1 text-xs font-black text-stone-900 shadow-[2px_2px_0px_#000]">
            <MousePointerClick className="w-4 h-4 text-red-600 animate-bounce" />
            <span>Klik kartu event untuk melihat detail & foto dokumentasi!</span>
          </div>

          {/* Filter Bar Neubrutalism */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setFilterStatus('semua')}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs border-2 border-black transition-all cursor-pointer flex items-center gap-1.5 ${
                filterStatus === 'semua'
                  ? 'bg-amber-400 shadow-[3px_3px_0px_#000] text-black -translate-y-0.5'
                  : 'bg-white hover:bg-stone-100 shadow-[2px_2px_0px_#000] text-stone-700'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Semua ({events.length})</span>
            </button>

            <button
              onClick={() => setFilterStatus('selesai')}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs border-2 border-black transition-all cursor-pointer flex items-center gap-1.5 ${
                filterStatus === 'selesai'
                  ? 'bg-emerald-300 shadow-[3px_3px_0px_#000] text-black -translate-y-0.5'
                  : 'bg-white hover:bg-emerald-50 shadow-[2px_2px_0px_#000] text-stone-700'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Selesai ({events.filter(e => e.status === 'selesai').length})</span>
            </button>

            <button
              onClick={() => setFilterStatus('mendatang')}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs border-2 border-black transition-all cursor-pointer flex items-center gap-1.5 ${
                filterStatus === 'mendatang'
                  ? 'bg-sky-300 shadow-[3px_3px_0px_#000] text-black -translate-y-0.5'
                  : 'bg-white hover:bg-sky-50 shadow-[2px_2px_0px_#000] text-stone-700'
              }`}
            >
              <Hourglass className="w-3.5 h-3.5 text-sky-700" />
              <span>Mendatang ({events.filter(e => e.status === 'mendatang').length})</span>
            </button>

            <button
              onClick={() => setFilterStatus('anak')}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs border-2 border-black transition-all cursor-pointer flex items-center gap-1.5 ${
                filterStatus === 'anak'
                  ? 'bg-rose-300 shadow-[3px_3px_0px_#000] text-black -translate-y-0.5'
                  : 'bg-white hover:bg-rose-50 shadow-[2px_2px_0px_#000] text-stone-700'
              }`}
            >
              <span>🎈 Ramah Anak</span>
            </button>
          </div>
        </div>

        {/* ROADMAP ADVENTURE MAP AREA */}
        <div className="relative py-2">

          {/* SVG WINDING TREASURE MAP DASHED PATH */}
          <div className="absolute inset-0 pointer-events-none block z-0">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 2100">
              {/* Outer Thick Black Dash Outline connecting central axis S-curve */}
              <path
                d={MAP_PATH_D}
                fill="none"
                stroke="#000"
                strokeWidth="10"
                strokeDasharray="16 12"
                strokeLinecap="round"
              />
              {/* Inner Crimson Red Treasure Path */}
              <path
                d={MAP_PATH_D}
                fill="none"
                stroke="#dc2626"
                strokeWidth="4"
                strokeDasharray="16 12"
                strokeLinecap="round"
              />
              {/* Decorative Treasure Map Icons scattered irregularly */}
              <g>
                {/* Start marker */}
                <text x="500" y="48" className="text-3xl font-black">🚩</text>
                <text x="240" y="150" className="text-2xl font-black">❌</text>
                <text x="780" y="300" className="text-2xl font-black">🏝️</text>
                <text x="350" y="540" className="text-2xl font-black">⚓</text>
                <text x="880" y="690" className="text-2xl font-black">🏴‍☠️</text>
                <text x="180" y="880" className="text-3xl font-black">🌴</text>
                <text x="420" y="1080" className="text-2xl font-black">💎</text>
                <text x="700" y="1020" className="text-2xl font-black">🏆</text>
                <text x="830" y="1230" className="text-2xl font-black">🗺️</text>
                <text x="120" y="1380" className="text-xl font-black">🚩</text>
                <text x="200" y="1500" className="text-2xl font-black">⭐</text>
                <text x="860" y="1750" className="text-2xl font-black">🎈</text>
                <text x="300" y="1830" className="text-2xl font-black">🎁</text>
                {/* End marker */}
                <text x="500" y="2052" className="text-3xl font-black">🏆</text>
              </g>
            </svg>
          </div>

          {/* TODAY POSITION MARKER ON THE PATH */}
          <div
            className="absolute z-20 pointer-events-none"
            style={{ left: `${(marker.x / 1000) * 100}%`, top: `${(marker.y / 2100) * 100}%` }}
          >
            <div className="absolute -translate-x-1/2 -translate-y-1/2">
              <span className="relative block w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-600 border-2 border-black shadow-[2px_2px_0px_#000]">
                <span className="absolute inset-0 rounded-full bg-red-600 animate-ping"></span>
              </span>
            </div>

            <div className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap ${marker.y < 300 ? 'top-4' : '-top-9'}`}>
              <span className="bg-black text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-lg border-2 border-white shadow-[2px_2px_0px_#000] flex items-center gap-1 animate-pulse">
                📍 {markerIsToday ? 'HARI INI' : 'KITA DI SINI'}
              </span>
            </div>
          </div>

          {/* EVENT CARDS - SAME LAYOUT ALL BREAKPOINTS */}
          <div className="space-y-6 lg:space-y-14 relative z-10">
            {filteredEvents.map((evt, index) => {
              const isPast = evt.status === 'selesai';
              const isEven = index % 2 === 0;
              const rotationClass = getRotationAngle(index);

              {/* Desktop Full Card Content */}
              const desktopCardContent = (
                <div
                  onClick={() => onOpenEventDetail(evt)}
                  className={`w-full max-w-[150px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[340px] ${getOffsetX(index)} rounded-2xl p-2 sm:p-4 transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-[1.02] cursor-pointer group ${rotationClass} ${
                    isPast
                      ? `${evt.bgColor} border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[7px_7px_0px_#000]`
                      : `bg-white ${evt.bgColor}/30 border-3 border-dashed border-stone-800 opacity-95 shadow-[4px_4px_0px_rgba(0,0,0,0.8)] hover:shadow-[7px_7px_0px_#000]`
                  }`}
                >
                  {/* CARD HEADER BADGES */}
                  <div className="flex items-center justify-between gap-1 sm:gap-1.5 mb-1.5 sm:mb-2">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <span className="bg-black text-white text-[7px] sm:text-[10px] font-black px-1 py-0.5 sm:px-2 rounded-lg border border-black shadow-[1px_1px_0px_#fff]">
                        POS {evt.stepNumber}
                      </span>
                      <span className="bg-white text-black text-[7px] sm:text-[10px] font-extrabold px-1 py-0.5 sm:px-2 rounded-lg border border-black shadow-[1px_1px_0px_#000] truncate max-w-[70px] sm:max-w-[100px]">
                        {evt.category}
                      </span>
                    </div>

                    {isPast ? (
                      <span className="bg-emerald-400 text-black text-[7px] sm:text-[10px] font-black px-1 py-0.5 sm:px-2 rounded-lg border border-black flex items-center gap-0.5 shrink-0">
                        <CheckCircle2 className="w-2 h-2 sm:w-3 sm:h-3 text-emerald-950 fill-emerald-200" />
                        <span>SELESAI</span>
                      </span>
                    ) : (
                      <span className="bg-amber-300 text-stone-900 text-[7px] sm:text-[10px] font-black px-1 py-0.5 sm:px-2 rounded-lg border border-black flex items-center gap-0.5 shrink-0">
                        <Hourglass className="w-2 h-2 sm:w-3 sm:h-3 text-amber-900" />
                        <span>MENDATANG</span>
                      </span>
                    )}
                  </div>

                  {/* EMOJI & TITLE */}
                  <div className="flex items-start gap-1.5 sm:gap-2.5 mb-1.5 sm:mb-2">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-white rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-sm sm:text-xl lg:text-2xl shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      {evt.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[7px] sm:text-[10px] font-black text-red-600 uppercase tracking-wider flex items-center gap-0.5 sm:gap-1">
                        <Calendar className="w-2 h-2 sm:w-3 sm:h-3 inline shrink-0" />
                        <span>{evt.date}</span>
                      </div>

                      <h3 className="text-[10px] sm:text-sm lg:text-base font-black text-black leading-tight group-hover:text-red-600 transition-colors mt-0.5 truncate">
                        {evt.title}
                      </h3>

                      <p className="text-[8px] sm:text-[11px] font-bold text-stone-700 truncate">
                        {evt.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* TIME & LOCATION */}
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[10px] font-bold text-stone-800 bg-white/90 px-1.5 sm:px-2 py-1 rounded-lg border border-black mb-1.5 sm:mb-2">
                    <span className="flex items-center gap-0.5 shrink-0">
                      <Clock className="w-2 h-2 sm:w-3 sm:h-3 text-amber-600" />
                      {evt.time}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 truncate">
                      <MapPin className="w-2 h-2 sm:w-3 sm:h-3 text-red-600 shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </span>
                  </div>

                  {/* FOOTER ACTION */}
                  <div className="pt-1.5 sm:pt-2 border-t border-black/20 flex items-center justify-between text-[8px] sm:text-[11px]">
                    {evt.photos.length > 0 ? (
                      <div className="flex items-center gap-1 text-[8px] sm:text-[10px] font-black text-stone-800">
                        <Camera className="w-2 h-2 sm:w-3 sm:h-3 text-stone-700" />
                        <span>{evt.photos.length} Foto</span>
                      </div>
                    ) : (
                      <span className="text-[8px] sm:text-[10px] font-bold text-stone-500">
                        📷 Info Pos
                      </span>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenEventDetail(evt);
                      }}
                      className="bg-black text-white hover:bg-stone-800 font-black text-[8px] sm:text-[10px] px-1.5 sm:px-2.5 py-1 rounded-lg border border-black shadow-[1.5px_1.5px_0px_#000] flex items-center gap-0.5 sm:gap-1 cursor-pointer group-hover:scale-105 transition-transform"
                    >
                      <span>Buka Detail</span>
                      <ChevronRight className="w-2 h-2 sm:w-3 sm:h-3 text-amber-300" />
                    </button>
                  </div>
                </div>
              );

              return (
                <React.Fragment key={evt.id}>
                  {/* MAP ROW - SAME LAYOUT ALL BREAKPOINTS */}
                  <div className="grid grid-cols-2 items-center gap-1.5 sm:gap-4 lg:gap-10 relative z-10">
                    {/* LEFT COLUMN */}
                    <div className="w-full flex justify-end">
                      {isEven ? desktopCardContent : <div className="w-full max-w-[150px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[340px] pointer-events-none opacity-0"></div>}
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="w-full flex justify-start">
                      {!isEven ? desktopCardContent : <div className="w-full max-w-[150px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[340px] pointer-events-none opacity-0"></div>}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};


