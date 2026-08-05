import React, { useState } from 'react';
import { ResidentWish } from '../types';
import { MessageSquareHeart, Send, Heart, Sparkles } from 'lucide-react';
import { triggerMerdekaConfetti } from '../utils/confetti';

interface PapanUcapanProps {
  wishes: ResidentWish[];
  onAddWish: (wish: Omit<ResidentWish, 'id' | 'timestamp' | 'likes'>) => void;
}

export const PapanUcapan: React.FC<PapanUcapanProps> = ({ wishes, onAddWish }) => {
  const [name, setName] = useState('');
  const [house, setHouse] = useState('');
  const [message, setMessage] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('🇮🇩');

  const stickers = ['🇮🇩', '🎉', '🎈', '🏆', '❤️', '🍚', '🚲', '✨'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    onAddWish({
      name,
      houseNumber: house || 'RT 09',
      message,
      sticker: selectedSticker
    });

    triggerMerdekaConfetti();
    setName('');
    setHouse('');
    setMessage('');
  };

  return (
    <section id="papan-ucapan" className="py-12 bg-stone-100 border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-300 text-black font-black text-xs sm:text-sm px-4 py-1.5 rounded-full border-3 border-black shadow-[3px_3px_0px_#000] rotate-[-1deg]">
            <MessageSquareHeart className="w-4 h-4 text-red-600 inline" />
            <span>PAPAN DINDING SORAK SEMANGAT WARGA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight font-sans">
            Kirim Pesan & <span className="bg-red-600 text-white px-3 py-1 rounded-2xl border-3 border-black inline-block shadow-[4px_4px_0px_#000] rotate-1">Ucapan Kemerdekaan</span>
          </h2>

          <p className="text-stone-800 font-bold text-base sm:text-lg">
            Tulis ucapan, doa, dan kesan pesanmu untuk kemeriahan perayaan HUT RI ke-81 di lingkungan RT 09 Ngadisuryan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Write Wish (5 cols) */}
          <div className="lg:col-span-5 bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_#000]">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-black">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="text-xl font-black text-black">
                Tulis Ucapan Warga
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-black mb-1">
                  Nama Anda / Keluarga *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Keluarga Pak Budi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 text-black px-4 py-2.5 rounded-xl border-3 border-black text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-black mb-1">
                  Nomor Rumah / Gang
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Rumah No. 12"
                  value={house}
                  onChange={(e) => setHouse(e.target.value)}
                  className="w-full bg-stone-50 text-black px-4 py-2.5 rounded-xl border-3 border-black text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-black mb-1">
                  Pilih Stiker Reaksi
                </label>
                <div className="flex flex-wrap gap-2">
                  {stickers.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSticker(s)}
                      className={`text-2xl p-2 rounded-xl border-2 border-black transition-all cursor-pointer ${
                        selectedSticker === s
                          ? 'bg-amber-300 scale-110 shadow-[2px_2px_0px_#000]'
                          : 'bg-stone-100 hover:bg-stone-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-black mb-1">
                  Pesan & Sorakan *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tulis ucapan kemerdekaan, kesan, atau semangat untuk warga RT 09..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-stone-50 text-black px-4 py-2.5 rounded-xl border-3 border-black text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-sm py-3 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Ucapan Ke Dinding</span>
              </button>
            </form>
          </div>

          {/* Display Wishes Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-4 max-h-[550px] overflow-y-auto pr-2">
            {wishes.map((w) => (
              <div
                key={w.id}
                className="bg-white border-3 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all relative"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl p-1.5 bg-amber-100 border border-black rounded-xl">
                      {w.sticker}
                    </span>
                    <div>
                      <h4 className="font-black text-black text-sm sm:text-base leading-tight">
                        {w.name}
                      </h4>
                      <span className="text-[11px] font-bold text-stone-600">
                        {w.houseNumber} • {w.timestamp}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 bg-rose-100 border border-black rounded-lg px-2 py-1 text-[11px] font-black text-rose-700 shrink-0">
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                    {w.likes}
                  </span>
                </div>

                <p className="text-stone-800 text-xs sm:text-sm font-medium leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-300">
                  "{w.message}"
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
