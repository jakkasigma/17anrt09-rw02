import React, { useState } from 'react';
import { PhoneCall, MapPin, MessageSquare, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
import { COMMITTEE, WA_SEKRETARIAT, MAP_COORDINATES, MAP_LINK } from '../data/committee';
import { triggerMerdekaConfetti } from '../utils/confetti';

export const KontakPanitia: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderMsg, setSenderMsg] = useState('');
  const [sent, setSent] = useState(false);

  const infoPenting = [
    {
      emoji: '🏃',
      title: 'Daftar Lomba On The Spot',
      desc: 'Pendaftaran lomba dilakukan langsung di tempat saat lomba berlangsung di Area RT 09.',
      accent: 'bg-amber-200 border-amber-500'
    },
    {
      emoji: '🍚',
      title: 'Tasyakuran Bawa Snack',
      desc: 'Malam Tasyakuran 16 Agustus 2026, setiap KK membawa snack minimal @Rp5.000 sesuai kemampuan.',
      accent: 'bg-rose-200 border-rose-500'
    },
    {
      emoji: '🗺️',
      title: 'Lokasi Acara',
      desc: 'Semua kegiatan di Area RT 09 Ngadisuryan. Lihat peta atau buka Google Maps di bawah.',
      accent: 'bg-sky-200 border-sky-500'
    },
    {
      emoji: '💬',
      title: 'Butuh Bantuan?',
      desc: 'Hubungi kontak person di bawah atau kirim pesan langsung via WhatsApp.',
      accent: 'bg-emerald-200 border-emerald-500'
    }
  ];

  const handleSendToPanitia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderMsg) return;

    const text = encodeURIComponent(
      `Halo Panitia HUT RI ke-81 RT 09 Ngadisuryan,\nSaya: ${senderName}\n\n${senderMsg}`
    );
    window.open(`https://wa.me/${WA_SEKRETARIAT}?text=${text}`, '_blank');

    triggerMerdekaConfetti();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setSenderName('');
      setSenderMsg('');
    }, 3000);
  };

  return (
    <section className="py-12 bg-stone-50 border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-300 text-black font-black text-xs sm:text-sm px-4 py-1.5 rounded-full border-3 border-black shadow-[3px_3px_0px_#000] rotate-[-1deg]">
            <PhoneCall className="w-4 h-4 text-emerald-800 inline" />
            <span>SEKRETARIAT & KONTAK PANITIA RT 09</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight font-sans">
            Hubungi Panitia & <span className="bg-amber-300 text-black px-3 py-1 rounded-2xl border-3 border-black inline-block shadow-[4px_4px_0px_#000] rotate-1">Info Sekretariat</span>
          </h2>

          <p className="text-stone-700 font-bold text-base sm:text-lg">
            Ada pertanyaan seputar acara, sumbangan sukarela, atau pendaftaran? Pengurus RT dan Panitia Karang Taruna siap melayani warga!
          </p>
        </div>

        {/* INFO PENTING STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infoPenting.map((info, idx) => (
            <div
              key={idx}
              className={`bg-white border-3 border-black rounded-2xl p-4 shadow-[5px_5px_0px_#000] flex items-start gap-3 hover:-translate-y-1 transition-all ${info.accent.split(' ')[1]}`}
            >
              <div className={`text-2xl p-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] ${info.accent.split(' ')[0]}`}>
                {info.emoji}
              </div>
              <div>
                <h4 className="font-black text-black text-sm leading-tight">
                  {info.title}
                </h4>
                <p className="text-[11px] font-bold text-stone-700 leading-relaxed mt-1">
                  {info.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* COMMITTEE CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMMITTEE.map((item, idx) => (
            <div
              key={idx}
              className={`${item.bgColor} border-4 border-black rounded-3xl p-6 shadow-[6px_6px_0px_#000] space-y-3 hover:-translate-y-1 transition-all`}
            >
              <div className="text-4xl p-2 bg-white rounded-2xl border-2 border-black w-14 h-14 flex items-center justify-center shadow-[2px_2px_0px_#000]">
                {item.emoji}
              </div>
              <div>
                <span className="bg-black text-white text-[11px] font-black px-2.5 py-0.5 rounded-md uppercase">
                  {item.role}
                </span>
                <h3 className="text-lg font-black text-black mt-1">
                  {item.name}
                </h3>
              </div>

              <div className="space-y-1 text-xs font-bold text-stone-800 pt-2 border-t-2 border-black/20">
                <div className="flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{item.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>{item.address}</span>
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

        {/* MAP & MESSAGE SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Location Box (6 cols) */}
          <div className="lg:col-span-6 bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_#000] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-black">
                <MapPin className="w-6 h-6 text-red-600" />
                <h3 className="text-2xl font-black text-black">
                  Lokasi Pos Ronda & Sekretariat
                </h3>
              </div>

              <p className="text-stone-700 font-bold text-sm leading-relaxed mb-4">
                Pos Ronda Utama RT 09, Ngadisuryan. Menjadi pusat informasi sekaligus titik kumpul seluruh kegiatan warga.
              </p>

              {/* Google Maps Embed */}
              <div className="bg-stone-100 border-3 border-black rounded-2xl p-2 shadow-[4px_4px_0px_#000] mb-4">
                <iframe
                  title="Peta Lokasi RT 09 Ngadisuryan"
                  src={`https://www.google.com/maps?q=${MAP_COORDINATES.lat},${MAP_COORDINATES.lng}&z=16&output=embed`}
                  className="w-full h-64 sm:h-72 border-2 border-black rounded-xl"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-300 hover:bg-amber-400 text-black text-xs font-black px-4 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[2px_2px_0px_#000] transition-all"
              >
                <ExternalLink className="w-4 h-4 text-red-600" />
                Buka Lokasi di Google Maps
              </a>
            </div>

            <div className="mt-4 bg-amber-100 border-2 border-black rounded-2xl p-4 text-xs font-bold text-stone-800 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>Pos Ronda Buka 24 Jam untuk Kemanan & Pusat Informasi Warga</span>
            </div>
          </div>

          {/* Send Message Box (6 cols) */}
          <div className="lg:col-span-6 bg-amber-200 border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_#000]">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-black">
              <MessageSquare className="w-6 h-6 text-black" />
              <h3 className="text-2xl font-black text-black">
                Pesan Langsung ke Panitia
              </h3>
            </div>

            <div className="bg-white/60 border-2 border-black rounded-xl px-3.5 py-2 text-[11px] font-black text-stone-700 flex items-center gap-2 mb-4">
              <span className="text-base">💬</span>
              Pesan akan terkirim langsung ke WhatsApp Panitia ({WA_SEKRETARIAT})
            </div>

            {sent ? (
              <div className="bg-emerald-100 border-3 border-black rounded-2xl p-6 text-center space-y-3 my-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="text-xl font-black text-black">
                  WhatsApp Terbuka!
                </h4>
                <p className="text-xs font-bold text-stone-700">
                  Pesan dari <span className="underline">{senderName}</span> sudah disiapkan di WhatsApp. Tinggal tekan kirim!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendToPanitia} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-black mb-1">
                    Nama Warga / Pengirim *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pak Herman Gang 3"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-white text-black px-4 py-2.5 rounded-xl border-3 border-black text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-black mb-1">
                    Isi Pertanyaan / Masukan *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan pertanyaan seputar lomba, usulan acara, atau informasi lainnya..."
                    value={senderMsg}
                    onChange={(e) => setSenderMsg(e.target.value)}
                    className="w-full bg-white text-black px-4 py-2.5 rounded-xl border-3 border-black text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm py-3 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Kirim via WhatsApp
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
