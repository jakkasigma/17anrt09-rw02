import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import { triggerPestaFireworks } from '../utils/confetti';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-red-600 border-t-4 border-black text-white py-10 relative overflow-hidden">
      
      {/* Background Flag Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        <div className="bg-white text-black border-4 border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#000] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-16 h-16 bg-red-600 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-3xl shrink-0">
              🇮🇩
            </div>
            <div>
              <span className="bg-amber-300 text-black text-xs font-black px-2.5 py-0.5 rounded-lg border border-black uppercase">
                HUT RI ke-81 Tahun 2026
              </span>
              <h3 className="text-2xl font-black text-black mt-1">
                RT 09 Ngadisuryan
              </h3>
              <p className="text-xs font-bold text-stone-600 mt-0.5">
                Nusantara Baru, Indonesia Maju! Mari Jaga Kerukunan & Kekompakan Warga.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                triggerPestaFireworks();
              }}
              className="bg-amber-300 hover:bg-amber-400 text-black font-black text-sm px-5 py-3 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>Pesta Kembang Api</span>
            </button>

            <button
              onClick={scrollToTop}
              className="bg-amber-300 hover:bg-amber-400 text-black p-3 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] cursor-pointer"
              title="Kembali ke Atas"
            >
              <ArrowUp className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>

        {/* Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-black text-stone-100 gap-4 pt-4 border-t-2 border-white/30">
          <div className="flex items-center gap-2">
            <span>🇮🇩 Dibuat dengan</span>
            <Heart className="w-4 h-4 text-yellow-300 fill-yellow-300 inline animate-bounce" />
            <span>untuk Warga RT 09 Ngadisuryan</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('beranda')} className="hover:underline cursor-pointer">
              Beranda
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('timeline')} className="hover:underline cursor-pointer">
              Timeline
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('lomba')} className="hover:underline cursor-pointer">
              Jadwal Lomba
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('galeri')} className="hover:underline cursor-pointer">
              Galeri
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('kontak')} className="hover:underline cursor-pointer">
              Kontak
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
