import React, { useState, useEffect, useRef } from 'react';
import { TimelineEvent, PhotoDocumentation } from '../types';
import { getEventStatus } from '../utils/eventStatus';
import { toEventMsWib } from '../utils/date';
import { Calendar, MapPin, Clock, Camera, CheckCircle2, Hourglass, Filter, ChevronRight, Compass, Flag, MousePointerClick } from 'lucide-react';

interface TimelineMapProps {
  events: TimelineEvent[];
  onOpenPhoto: (photo: PhotoDocumentation, allPhotos: PhotoDocumentation[]) => void;
  onOpenEventDetail: (event: TimelineEvent) => void;
}

interface Pt {
  x: number;
  y: number;
}

const bezierPoint = (p0: Pt, c1: Pt, c2: Pt, p3: Pt, t: number): Pt => {
  const mt = 1 - t;
  const a = mt * mt * mt;
  const b = 3 * mt * mt * t;
  const c = 3 * mt * t * t;
  const d = t * t * t;
  return {
    x: a * p0.x + b * c1.x + c * c2.x + d * p3.x,
    y: a * p0.y + b * c1.y + c * c2.y + d * p3.y
  };
};

const buildPathD = (pts: Pt[]) => {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p = pts[i];
    const n = pts[i + 1];
    const midY = (p.y + n.y) / 2;
    d += ` C ${n.x} ${midY}, ${p.x} ${midY}, ${n.x} ${n.y}`;
  }
  return d;
};

const pathPoint = (pts: Pt[], i: number, t: number): Pt => {
  const p = pts[i];
  const n = pts[i + 1];
  const midY = (p.y + n.y) / 2;
  return bezierPoint(p, { x: n.x, y: midY }, { x: p.x, y: midY }, n, t);
};

const MAP_ICONS: { emoji: string; fx: number; fy: number; cls: string }[] = [
  { emoji: '❌', fx: 0.24, fy: 0.06, cls: 'text-xl' },
  { emoji: '🏝️', fx: 0.78, fy: 0.12, cls: 'text-xl' },
  { emoji: '⚓', fx: 0.35, fy: 0.22, cls: 'text-xl' },
  { emoji: '🏴‍☠️', fx: 0.88, fy: 0.28, cls: 'text-xl' },
  { emoji: '🌴', fx: 0.18, fy: 0.35, cls: 'text-2xl' },
  { emoji: '💎', fx: 0.42, fy: 0.43, cls: 'text-xl' },
  { emoji: '🏆', fx: 0.7, fy: 0.41, cls: 'text-xl' },
  { emoji: '🗺️', fx: 0.83, fy: 0.49, cls: 'text-xl' },
  { emoji: '🚩', fx: 0.12, fy: 0.55, cls: 'text-sm' },
  { emoji: '⭐', fx: 0.2, fy: 0.6, cls: 'text-xl' },
  { emoji: '🎈', fx: 0.86, fy: 0.7, cls: 'text-xl' },
  { emoji: '🎁', fx: 0.3, fy: 0.73, cls: 'text-xl' }
];

const formatIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const TimelineMap: React.FC<TimelineMapProps> = ({
  events,
  onOpenPhoto,
  onOpenEventDetail,
}) => {
  const [filterStatus, setFilterStatus] = useState<'semua' | 'selesai' | 'mendatang' | 'anak'>('semua');

  const mapAreaRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<Pt[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Measure real card positions so the path aligns with the grid at any breakpoint
  useEffect(() => {
    const el = mapAreaRef.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const pts: Pt[] = [];
      el.querySelectorAll<HTMLButtonElement>('button[data-idx]').forEach((b) => {
        const br = b.getBoundingClientRect();
        pts.push({ x: br.left + br.width / 2 - r.left, y: br.top + br.height / 2 - r.top });
      });
      pts.sort((a, b) => a.y - b.y);
      setPoints(pts);
      setSize({ w: r.width, h: r.height });
    };
    const t1 = window.setTimeout(measure, 120);
    const t2 = window.setTimeout(measure, 600);
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    });
    ro.observe(el);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [filterStatus]);

  // Today marker: refresh every minute
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const nowMs = now.getTime();
  const todayIso = formatIso(now);

  if (events.length === 0) {
    return (
      <section className="py-12 bg-[#fefae0] relative overflow-hidden border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight">Peta Acara</h2>
          <p className="text-stone-800 font-bold">Belum ada acara yang dijadwalkan.</p>
        </div>
      </section>
    );
  }

  let marker: Pt = { x: 0, y: 0 };
  let markerIsToday = false;
  const mapPathD = buildPathD(points);

  const firstMs = toEventMsWib(events[0].dateIso, events[0].timeStart);
  const lastMs = toEventMsWib(events[events.length - 1].dateIso, events[events.length - 1].timeStart);

  if (points.length > 0) {
    if (nowMs < firstMs) {
      marker = points[0];
    } else if (nowMs >= lastMs) {
      marker = points[points.length - 1];
      markerIsToday = todayIso === events[events.length - 1].dateIso;
    } else {
      const nextIdx = events.findIndex((e) => toEventMsWib(e.dateIso, e.timeStart) > nowMs);
      const prevIdx = nextIdx - 1;
      const prevMs = toEventMsWib(events[prevIdx].dateIso, events[prevIdx].timeStart);
      const nextMs = toEventMsWib(events[nextIdx].dateIso, events[nextIdx].timeStart);
      const fraction = (nowMs - prevMs) / (nextMs - prevMs);
      if (fraction <= 0) {
        marker = points[prevIdx];
      } else if (fraction >= 1) {
        marker = points[nextIdx];
      } else {
        marker = pathPoint(points, prevIdx, fraction);
      }
      markerIsToday = events[prevIdx].dateIso === todayIso || events[nextIdx].dateIso === todayIso;
    }
  }

  // Filter events
  const filteredEvents = events.filter((evt) => {
    if (filterStatus === 'selesai') return getEventStatus(evt.dateIso, evt.timeStart, evt.timeEnd) === 'selesai';
    if (filterStatus === 'mendatang')
      return getEventStatus(evt.dateIso, evt.timeStart, evt.timeEnd) !== 'selesai';
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
              <span>Selesai ({events.filter(e => getEventStatus(e.dateIso, e.timeStart, e.timeEnd) === 'selesai').length})</span>
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
              <span>Mendatang ({events.filter(e => getEventStatus(e.dateIso, e.timeStart, e.timeEnd) !== 'selesai').length})</span>
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
        <div className="relative py-2" ref={mapAreaRef}>

          {/* SVG WINDING TREASURE MAP DASHED PATH */}
          {size.w > 0 && size.h > 0 && (
            <div className="absolute inset-0 pointer-events-none block z-0">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox={`0 0 ${size.w} ${size.h}`}>
                <path
                  d={mapPathD}
                  fill="none"
                  stroke="#000"
                  strokeWidth={Math.max(3, size.w / 100)}
                  strokeDasharray={`${Math.max(6, size.w / 42)} ${Math.max(5, size.w / 55)}`}
                  strokeLinecap="round"
                />
                <path
                  d={mapPathD}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth={Math.max(1.5, size.w / 250)}
                  strokeDasharray={`${Math.max(6, size.w / 42)} ${Math.max(5, size.w / 55)}`}
                  strokeLinecap="round"
                />
                <g>
                  <text x={size.w / 2} y={Math.max(14, size.w / 60)} className="text-xl sm:text-2xl font-black" textAnchor="middle">🚩</text>
                  {MAP_ICONS.map((ic, i) => (
                    <text key={i} x={ic.fx * size.w} y={ic.fy * size.h} className={`${ic.cls} font-black`} textAnchor="middle">
                      {ic.emoji}
                    </text>
                  ))}
                  {points.length > 0 && (
                    <text x={points[points.length - 1].x} y={points[points.length - 1].y + Math.max(14, size.w / 60)} className="text-xl sm:text-2xl font-black" textAnchor="middle">🏆</text>
                  )}
                </g>
              </svg>
            </div>
          )}

          {/* TODAY POSITION MARKER ON THE PATH */}
          {size.w > 0 && size.h > 0 && points.length > 0 && (
          <div
            className="absolute z-20 pointer-events-none"
            style={{ left: `${(marker.x / size.w) * 100}%`, top: `${(marker.y / size.h) * 100}%` }}
          >
            <div className="absolute -translate-x-1/2 -translate-y-1/2">
              <span className="relative block w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-600 border-2 border-black shadow-[2px_2px_0px_#000]">
                <span className="absolute inset-0 rounded-full bg-red-600 animate-ping"></span>
              </span>
            </div>

            <div className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap ${marker.y < size.h * 0.18 ? 'top-4' : '-top-9'}`}>
              <span className="bg-black text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-lg border-2 border-white shadow-[2px_2px_0px_#000] flex items-center gap-1 animate-pulse">
                📍 {markerIsToday ? 'HARI INI' : 'KITA DI SINI'}
              </span>
            </div>
          </div>
          )}

          {/* EVENT CARDS - SAME LAYOUT ALL BREAKPOINTS */}
          <div className="space-y-6 lg:space-y-14 relative z-10">
            {filteredEvents.map((evt, index) => {
              const status = getEventStatus(evt.dateIso, evt.timeStart, evt.timeEnd);
              const isPast = status === 'selesai';
              const isOngoing = status === 'berlangsung';
              const isEven = index % 2 === 0;
              const rotationClass = getRotationAngle(index);

              {/* Desktop Full Card Content */}
              const desktopCardContent = (
                <button
                  type="button"
                  data-idx={index}
                  disabled={evt.isLocked}
                  onClick={evt.isLocked ? undefined : () => onOpenEventDetail(evt)}
                  aria-label={evt.isLocked ? 'Pos terkunci - belum bisa dibuka' : `Lihat detail ${evt.title}`}
                  className={`w-full max-w-[150px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[340px] ${evt.isLocked ? '' : getOffsetX(index)} rounded-2xl p-2 sm:p-4 transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-[1.02] group text-left ${evt.isLocked ? 'relative overflow-hidden cursor-not-allowed bg-zinc-900 border-3 border-black shadow-[4px_4px_0px_#000]' : `cursor-pointer ${rotationClass} ${
                    isPast
                      ? `${evt.bgColor} border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[7px_7px_0px_#000]`
                      : `bg-white ${evt.bgColor}/30 border-3 border-dashed border-stone-800 opacity-95 shadow-[4px_4px_0px_rgba(0,0,0,0.8)] hover:shadow-[7px_7px_0px_#000]`
                  }`}`}
                >
                  {/* Locked fog overlay - fog of war */}
                  {evt.isLocked && (
                    <div className="absolute inset-0 z-30 bg-gradient-to-b from-black/70 via-black/50 to-black/80 flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                      <span className="text-3xl sm:text-4xl drop-shadow-[2px_2px_0px_#000]">🔒</span>
                      <span className="bg-red-600 text-white text-[8px] sm:text-[10px] font-black px-2 sm:px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">
                        AREA TERKUNCI
                      </span>
                      <span className="text-white/70 text-[7px] sm:text-[10px] font-bold text-center px-2 leading-tight animate-pulse">
                        ??? • Belum Terpetakan
                      </span>
                    </div>
                  )}
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

                    {isOngoing ? (
                      <span className="bg-red-500 text-white text-[7px] sm:text-[10px] font-black px-1 py-0.5 sm:px-2 rounded-lg border border-black flex items-center gap-0.5 shrink-0 animate-pulse">
                        <Hourglass className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-200" />
                        <span>BERLANGSUNG</span>
                      </span>
                    ) : isPast ? (
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

                    <span className="bg-black text-white hover:bg-stone-800 font-black text-[8px] sm:text-[10px] px-1.5 sm:px-2.5 py-1 rounded-lg border border-black shadow-[1.5px_1.5px_0px_#000] flex items-center gap-0.5 sm:gap-1 pointer-events-none">
                        <span>Buka Detail</span>
                        <ChevronRight className="w-2 h-2 sm:w-3 sm:h-3 text-amber-300" />
                      </span>
                  </div>
                </button>
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


