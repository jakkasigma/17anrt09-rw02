import React, { useState } from 'react';
import { PhoneCall, MapPin, Mail, Users, MessageSquare, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { triggerMerdekaConfetti } from '../utils/confetti';

export const KontakPanitia: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderMsg, setSenderMsg] = useState('');
  const [sent, setSent] = useState(false);

  const committee = [
    {
      role: 'Ketua RT 09',
      name: 'Bapak H. Budi Santoso',
      phone: '0812-3456-7890',
      address: 'Rumah No. 12',
      emoji: '👨‍💼',
      bgColor: 'bg-amber-200'
    },
    {
      role: 'Ketua Panitia HUT RI 81',
      name: 'Mas Rizky Farhan (Karang Taruna)',
      phone: '0813-9876-5432',
      address: 'Rumah No. 18',
      emoji: '🙋‍♂️',
      bgColor: 'bg-emerald-200'
    },
    {
      role: 'Bendahara Acara',
      name: 'Ibu Hj. Endang Rahayu',
      phone: '0811-2233-4455',
      address: 'Rumah No. 05',
      emoji: '👩‍💼',
      bgColor: 'bg-rose-200'
    },
    {
      role: 'Koordinator Lomba Anak',
      name: 'Mba Alya & Kak Doni',
      phone: '0857-1122-3344',
      address: 'Rumah No. 04',
      emoji: '🎈',
      bgColor: 'bg-sky-200'
    }
  ];

  const faqs = [
    {
      q: 'Bagaimana cara mendaftar Lomba 17-an?',
      a: 'Warga dapat mendaftar langsung secara online melalui menu "Jadwal Lomba" di website ini atau menghubungi Panitia Karang Taruna di Pos Ronda.'
    },
    {
      q: 'Siapa saja yang boleh mengikuti perlombaan?',
      a: 'Seluruh warga RT 09 Ngadisuryan (Anak-anak, Remaja, Bapak-bapak, dan Ibu-ibu) diperbolehkan berpartisipasi gratis tanpa dipungut biaya!'
    },
    {
      q: 'Kapan dan di mana Malam Puncak Tasyakuran diadakan?',
      a: 'Malam Tasyakuran dilaksanakan pada Minggu, 16 Agustus 2026 mulai jam 19.30 WIB di Pos Ronda / Area Fasilitas Umum RT 09.'
    }
  ];

  const handleSendToPanitia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderMsg) return;

    triggerMerdekaConfetti();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setSenderName('');
      setSenderMsg('');
    }, 3000);
  };

  return (
    <section className="py-12 bg-stone-50 border-b-4 border-black min-h-screen">
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

        {/* COMMITTEE CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {committee.map((item, idx) => (
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

              {/* Map Illustration Placeholder Neubrutalism */}
              <div className="bg-sky-100 border-3 border-black rounded-2xl p-6 shadow-[4px_4px_0px_#000] text-center space-y-3 mb-4">
                <div className="text-5xl">🗺️📍</div>
                <span className="font-black text-black text-base block">
                  Peta Wilayah RT 09 Ngadisuryan
                </span>
                <p className="text-xs font-bold text-stone-600">
                  Seluruh Area Wilayah RT 09 Ngadisuryan
                </p>
              </div>
            </div>

            <div className="bg-amber-100 border-2 border-black rounded-2xl p-4 text-xs font-bold text-stone-800 flex items-center gap-2">
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

            {sent ? (
              <div className="bg-emerald-100 border-3 border-black rounded-2xl p-6 text-center space-y-3 my-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="text-xl font-black text-black">
                  Pesan Terkirim!
                </h4>
                <p className="text-xs font-bold text-stone-700">
                  Terima kasih <span className="underline">{senderName}</span>, panitia akan segera merespons pertanyaanmu.
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
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-sm py-3 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                >
                  Kirim Pesan Ke Panitia
                </button>
              </form>
            )}
          </div>

        </div>

        {/* FAQ SECTION */}
        <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#000]">
          <div className="flex items-center gap-2 mb-6 pb-3 border-b-2 border-black">
            <HelpCircle className="w-6 h-6 text-amber-500" />
            <h3 className="text-2xl font-black text-black">
              Tanya Jawab Seputar Acara (FAQ)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((f, i) => (
              <div key={i} className="bg-stone-50 border-3 border-black rounded-2xl p-4 shadow-[4px_4px_0px_#000]">
                <h4 className="font-black text-black text-sm mb-2 flex items-start gap-1.5">
                  <span className="text-red-600">Q:</span>
                  <span>{f.q}</span>
                </h4>
                <p className="text-xs font-bold text-stone-700 leading-relaxed">
                  <span className="text-emerald-700 font-black">A:</span> {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
