import React from 'react';
import { PhoneCall, MapPin, ChevronRight, Users, MessageSquare } from 'lucide-react';
import { COMMITTEE } from '../data/committee';

interface KontakSingkatProps {
  setActiveTab: (tab: string) => void;
}

const ACCENTS = [
  { accent: 'border-amber-500', shadow: 'shadow-[5px_5px_0px_#f59e0b]' },
  { accent: 'border-emerald-500', shadow: 'shadow-[5px_5px_0px_#16a34a]' }
];

export const KontakSingkat: React.FC<KontakSingkatProps> = ({ setActiveTab }) => {
  return (
    <section className="py-12 bg-sky-100 border-b-4 border-black relative overflow-hidden">
      {/* Dotted pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0369a1_2px,transparent_2px)] [background-size:26px_26px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white border-4 border-black rounded-3xl p-5 sm:p-7 shadow-[8px_8px_0px_#000] relative">
          {/* Washi tape sticker */}
          <div className="absolute -top-4 right-6 bg-emerald-400 text-black text-[11px] font-black px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] rotate-2">
            🆘 BUTUH BANTUAN?
          </div>

          <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-black">
            <div className="bg-emerald-300 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] p-2 -rotate-3">
              <Users className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-black leading-tight">
                Kontak Pengurus & Panitia
              </h2>
              <p className="text-xs font-bold text-stone-600">
                Siap melayani pertanyaan warga seputar acara & pendaftaran
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COMMITTEE.slice(0, 2).map((item, idx) => (
              <div
                key={idx}
                className={`${item.bgColor} border-3 border-black rounded-2xl p-4 space-y-2 relative overflow-hidden ${ACCENTS[idx % ACCENTS.length].accent} ${ACCENTS[idx % ACCENTS.length].shadow}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white rounded-xl border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000] rotate-[-2deg]">
                    {item.emoji}
                  </div>
                  <div>
                    <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                      {item.role}
                    </span>
                    <h3 className="text-sm font-black text-black leading-tight mt-0.5">
                      {item.name}
                    </h3>
                  </div>
                </div>
                <div className="space-y-1 text-xs font-bold text-stone-800">
                  <div className="flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-700" /> {item.phone}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-600" /> {item.address}
                  </div>
                </div>
                <a
                  href={`https://wa.me/${item.waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-black hover:bg-stone-800 text-white text-[11px] font-black px-3 py-1.5 rounded-lg border border-black shadow-[2px_2px_0px_#000] transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                  Chat WhatsApp
                </a>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={() => setActiveTab('kontak')}
              className="bg-black hover:bg-stone-800 text-white font-black text-xs px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_#0ea5e9] hover:shadow-[2px_2px_0px_#0ea5e9] transition-all cursor-pointer flex items-center gap-1.5"
            >
              Hubungi Panitia Lengkap
              <ChevronRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
