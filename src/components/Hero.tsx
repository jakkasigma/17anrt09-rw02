import React, { useState, useEffect } from 'react';
import { Calendar, Trophy, Compass, Sparkles, Heart, Users, ShieldCheck, Megaphone } from 'lucide-react';
import { triggerMerdekaConfetti } from '../utils/confetti';

interface HeroProps {
  setActiveTab: (tab: string) => void;
  stats: { nodes: number; lomba: number };
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, stats }) => {
  // Countdown to 17 August 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-08-17T07:00:00+07:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-stone-50 pt-8 pb-12 border-b-4 border-black">
      {/* Background playful dotted pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Floating Stickers & Announcement Banner */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="bg-red-600 text-white font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-full border-3 border-black shadow-[3px_3px_0px_#000] rotate-[-2deg] flex items-center gap-1.5">
            <span>🇮🇩</span>
            <span>HUT RI KE-81 TH 2026</span>
          </div>

          <div className="bg-white text-red-600 font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-full border-3 border-black shadow-[3px_3px_0px_#000] rotate-[1deg] flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600 inline" />
            <span>MERAH PUTIH KITA</span>
          </div>

          <div className="bg-amber-300 text-black font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-full border-3 border-black shadow-[3px_3px_0px_#000] rotate-[-1deg] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 inline text-black" />
            <span>GAYUNG BERSAMBUT RT 09 NGADISURYAN</span>
          </div>
        </div>

        {/* Main Headline Card Neubrutalism */}
        <div className="bg-red-600 border-4 border-black rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#000] relative mb-10 overflow-hidden text-white">
          
          {/* Decorative Corner Badge */}
          <div className="absolute -top-3 -right-3 bg-amber-300 text-black text-xs font-black px-4 py-2 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] rotate-12 hidden sm:block">
            Nusantara Baru! 🇮🇩
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-block bg-white text-red-600 font-extrabold px-4 py-1.5 rounded-xl border-3 border-black shadow-[3px_3px_0px_#000] text-sm">
                🎉 Pesta Rakyat & Peta Jalan Ceria
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight font-sans">
                Gelora <span className="bg-amber-300 text-black px-3 py-1 rounded-2xl border-3 border-black inline-block shadow-[4px_4px_0px_#000] -rotate-1">81 Tahun</span> Kemerdekaan RI
              </h1>

              <p className="text-white font-extrabold text-base sm:text-xl leading-relaxed opacity-95">
                Selamat datang di portal resmi kegiatan perayaan HUT RI ke-81 warga Ngadisuryan RT 09. Ikuti keseruan peta jalan acara, jadwal lomba anak & keluarga, serta kirim pesan semangat!
              </p>

              {/* Ajakan Semarak dari Pak RT */}
              <div className="bg-black/20 border-2 border-white/80 rounded-2xl px-4 py-3 flex items-start gap-2">
                <Megaphone className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5 animate-bounce" />
                <p className="text-white font-black text-sm sm:text-base leading-snug">
                  Ajak anak cucu cicit ikut lomba-lomba — hanya setahun sekali, pokoknya meriahkan! 🇮🇩
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    triggerMerdekaConfetti();
                    setActiveTab('timeline');
                  }}
                  className="bg-amber-300 hover:bg-amber-400 text-black font-black text-base px-6 py-3.5 rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer flex items-center gap-2.5"
                >
                  <Compass className="w-5 h-5 text-red-600 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Jelajahi Peta Acara</span>
                </button>

                <button
                  onClick={() => setActiveTab('lomba')}
                  className="bg-white hover:bg-red-50 text-black font-black text-base px-6 py-3.5 rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <span>Daftar Lomba</span>
                </button>
              </div>
            </div>

            {/* Right Column: Countdown Box Neubrutalism */}
            <div className="lg:col-span-5">
              <div className="bg-white border-4 border-black rounded-3xl p-5 sm:p-6 shadow-[6px_6px_0px_#000] text-center space-y-4 relative text-black">
                <div className="bg-red-600 text-white font-black text-sm py-2 px-4 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] inline-flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  Hitung Mundur Proklamasi 17 Agustus
                </div>

                <div className="grid grid-cols-4 gap-2 text-center pt-2">
                  <div className="bg-red-100 border-3 border-black p-2 sm:p-3 rounded-2xl shadow-[3px_3px_0px_#000]">
                    <span className="block text-2xl sm:text-4xl font-black text-red-700 font-mono">{timeLeft.days}</span>
                    <span className="text-[11px] sm:text-xs font-black text-stone-700 uppercase">Hari</span>
                  </div>
                  <div className="bg-amber-100 border-3 border-black p-2 sm:p-3 rounded-2xl shadow-[3px_3px_0px_#000]">
                    <span className="block text-2xl sm:text-4xl font-black text-amber-800 font-mono">{timeLeft.hours}</span>
                    <span className="text-[11px] sm:text-xs font-black text-stone-700 uppercase">Jam</span>
                  </div>
                  <div className="bg-red-50 border-3 border-black p-2 sm:p-3 rounded-2xl shadow-[3px_3px_0px_#000]">
                    <span className="block text-2xl sm:text-4xl font-black text-red-700 font-mono">{timeLeft.minutes}</span>
                    <span className="text-[11px] sm:text-xs font-black text-stone-700 uppercase">Menit</span>
                  </div>
                  <div className="bg-amber-200 border-3 border-black p-2 sm:p-3 rounded-2xl shadow-[3px_3px_0px_#000]">
                    <span className="block text-2xl sm:text-4xl font-black text-amber-900 font-mono">{timeLeft.seconds}</span>
                    <span className="text-[11px] sm:text-xs font-black text-stone-700 uppercase">Detik</span>
                  </div>
                </div>

                <div className="bg-stone-50 border-2 border-black rounded-xl p-3 text-xs font-bold text-stone-800 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Pos Ronda RT 09 Siap Menyambut Warga</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Highlights / Stats Grid Neubrutalism */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-red-100 border-3 border-black rounded-2xl p-4 shadow-[4px_4px_0px_#000] flex items-center gap-3">
            <div className="w-12 h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000]">
              🗺️
            </div>
            <div>
              <span className="block font-black text-2xl text-black">{stats.nodes} Node</span>
              <span className="text-xs font-extrabold text-stone-700">Peta Acara Ceria</span>
            </div>
          </div>

          <div className="bg-amber-100 border-3 border-black rounded-2xl p-4 shadow-[4px_4px_0px_#000] flex items-center gap-3">
            <div className="w-12 h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000]">
              🏆
            </div>
            <div>
              <span className="block font-black text-2xl text-black">{stats.lomba} Lomba</span>
              <span className="text-xs font-extrabold text-stone-700">Anak & Dewasa</span>
            </div>
          </div>

          <div className="bg-red-50 border-3 border-black rounded-2xl p-4 shadow-[4px_4px_0px_#000] flex items-center gap-3">
            <div className="w-12 h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000]">
              🍚
            </div>
            <div>
              <span className="block font-black text-2xl text-black">81 Tumpeng</span>
              <span className="text-xs font-extrabold text-stone-700">Malam Tasyakuran</span>
            </div>
          </div>

          <div className="bg-amber-200 border-3 border-black rounded-2xl p-4 shadow-[4px_4px_0px_#000] flex items-center gap-3">
            <div className="w-12 h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000]">
              🎁
            </div>
            <div>
              <span className="block font-black text-2xl text-black">Doorprize</span>
              <span className="text-xs font-extrabold text-stone-700">Sepeda & Alat Masak</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
