import React, { useState } from 'react';
import { LombaItem } from '../types';
import { Trophy, Calendar, MapPin, UserCheck, Gift, PlusCircle, CheckCircle2, Sparkles, Phone } from 'lucide-react';
import { triggerMerdekaConfetti } from '../utils/confetti';

interface JadwalLombaProps {
  lombaList: LombaItem[];
  onRegister: (lombaId: string, name: string, house: string, phone: string) => void;
}

export const JadwalLomba: React.FC<JadwalLombaProps> = ({ lombaList, onRegister }) => {
  const [activeRegisterModal, setActiveRegisterModal] = useState<LombaItem | null>(null);

  // Form State
  const [participantName, setParticipantName] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);

  const lombaAnak = lombaList.filter((item) => item.category === 'Anak-Anak');
  const lombaUmum = lombaList.filter((item) => item.category === 'Umum');

  const groups = [
    {
      title: 'Lomba Anak-Anak',
      emoji: '🎈',
      desc: 'Lomba seru untuk putra-putri warga RT 09. Yuk ajak si kecil ikut meramaikan!',
      items: lombaAnak,
      pill: 'bg-sky-300',
      highlight: 'bg-sky-400',
      underline: 'border-sky-500',
      rotate: 'rotate-[-1deg]'
    },
    {
      title: 'Lomba Umum',
      emoji: '👥',
      desc: 'Ajang kekompakan untuk seluruh warga RT 09. Daftarkan dirimu dan keluarga!',
      items: lombaUmum,
      pill: 'bg-emerald-300',
      highlight: 'bg-emerald-400',
      underline: 'border-emerald-600',
      rotate: 'rotate-[1deg]'
    }
  ].filter((g) => g.items.length > 0);

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!participantName || !activeRegisterModal) return;

    onRegister(activeRegisterModal.id, participantName, houseNumber, phoneNumber);
    triggerMerdekaConfetti();
    setRegistrationSubmitted(true);

    setTimeout(() => {
      setRegistrationSubmitted(false);
      setActiveRegisterModal(null);
      setParticipantName('');
      setHouseNumber('');
      setPhoneNumber('');
    }, 2000);
  };

  return (
    <section className="py-12 bg-stone-50 border-b-4 border-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Neubrutalism */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-rose-300 text-black font-black text-xs sm:text-sm px-4 py-1.5 rounded-full border-3 border-black shadow-[3px_3px_0px_#000] rotate-[1deg]">
            <Trophy className="w-4 h-4 text-red-600 inline" />
            <span>ARENA ADU KETANGKASAN & GELAK TAWA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight font-sans">
            Jadwal & Pendaftaran <span className="bg-amber-300 text-black px-3 py-1 rounded-2xl border-3 border-black inline-block shadow-[4px_4px_0px_#000] -rotate-1">Lomba 17-an</span>
          </h2>

          <p className="text-stone-700 font-bold text-base sm:text-lg">
            Ayo daftarkan diri, putra-putri, dan tetangga untuk memeriahkan lomba kemerdekaan RT 09! Banyak piala, hadiah hiburan, dan kenangan indah menanti.
          </p>
        </div>

        {/* LOMBA GROUPS */}
        {groups.map((group) => (
          <div key={group.title} className="mb-12">
            {/* Group Header */}
            <div className={`mb-6 sm:mb-8 border-b-8 ${group.underline} pb-4 sm:pb-6`}>
              <div className={`inline-flex items-center gap-1.5 sm:gap-2 ${group.pill} text-black font-black text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full border-3 border-black shadow-[3px_3px_0px_#000] ${group.rotate}`}>
                <span className="text-base sm:text-xl">{group.emoji}</span>
                <span>{group.title.toUpperCase()}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-black tracking-tight mt-3 sm:mt-4">
                {group.title}{' '}
                <span className={`${group.highlight} text-black px-2.5 sm:px-3 py-0.5 rounded-xl border-2 sm:border-3 border-black inline-block shadow-[3px_3px_0px_#000] rotate-1`}>
                  {group.items.length} Lomba
                </span>
              </h3>

              <p className="text-stone-600 font-bold text-xs sm:text-sm mt-2 sm:mt-3 max-w-2xl">
                {group.desc}
              </p>
            </div>

            {/* LOMBA GRID - 3 columns all sizes */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
              {group.items.map((lomba) => {
                const isFull = lomba.maxParticipants ? lomba.registeredCount >= lomba.maxParticipants : false;
                const isOpen = lomba.status === 'Pendaftaran Dibuka';

                return (
                  <div
                    key={lomba.id}
                    className={`bg-white border-2 sm:border-4 border-black rounded-2xl sm:rounded-3xl p-2 sm:p-6 shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:-translate-y-1 transition-all flex flex-col justify-between relative ${
                      !isOpen ? 'opacity-90 bg-stone-50/90' : ''
                    }`}
                  >
                    
                    <div>
                      {/* Category & Status Badge */}
                      <div className="flex items-center justify-between gap-1 mb-1.5 sm:mb-3">
                        <span className="bg-sky-200 text-stone-900 text-[7px] sm:text-xs font-black px-1 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-xl border border-black sm:border-2 shadow-[1px_1px_0px_#000] sm:shadow-[2px_2px_0px_#000] truncate max-w-[64px] sm:max-w-none">
                          {lomba.category}
                        </span>

                        <span className={`text-[7px] sm:text-xs font-black px-1 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-xl border border-black sm:border-2 shadow-[1px_1px_0px_#000] sm:shadow-[2px_2px_0px_#000] shrink-0 ${
                          lomba.status === 'Selesai'
                            ? 'bg-emerald-300 text-black'
                            : lomba.status === 'Pendaftaran Dibuka'
                            ? 'bg-amber-300 text-black'
                            : 'bg-stone-200 text-stone-700'
                        }`}>
                          {lomba.status}
                        </span>
                      </div>

                      {/* Icon & Title */}
                      <div className="flex items-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-3">
                        <div className="w-8 h-8 sm:w-14 sm:h-14 bg-amber-100 rounded-lg sm:rounded-2xl border-2 sm:border-3 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-base sm:text-3xl shrink-0">
                          {lomba.emoji}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[11px] sm:text-xl font-black text-black leading-tight truncate">
                            {lomba.title}
                          </h4>
                          <p className="text-[8px] sm:text-xs font-extrabold text-red-600 mt-0.5 flex items-center gap-0.5 sm:gap-1">
                            <Calendar className="w-2 h-2 sm:w-3.5 sm:h-3.5 inline shrink-0" />
                            <span className="truncate">{lomba.date} ({lomba.time})</span>
                          </p>
                        </div>
                      </div>

                      {/* Location & PIC */}
                      <div className="bg-stone-100 border border-black sm:border-2 rounded-lg sm:rounded-xl p-1.5 sm:p-3 text-[8px] sm:text-xs font-bold space-y-0.5 sm:space-y-1 mb-1.5 sm:mb-4">
                        <div className="flex items-center gap-1 sm:gap-1.5 text-stone-800 truncate">
                          <MapPin className="w-2 h-2 sm:w-3.5 sm:h-3.5 text-red-600 shrink-0" />
                          <span className="truncate">{lomba.location}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 text-stone-700 truncate">
                          <Phone className="w-2 h-2 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">PIC: {lomba.picName}</span>
                        </div>
                      </div>

                      {/* Rules list */}
                      <div className="space-y-0.5 sm:space-y-1.5 mb-1.5 sm:mb-4">
                        <span className="text-[8px] sm:text-xs font-black text-black block">Aturan:</span>
                        <ul className="text-[7px] sm:text-xs font-medium text-stone-700 space-y-0.5 sm:space-y-1">
                          {lomba.rules.map((rule, idx) => (
                            <li key={idx} className="flex items-start gap-0.5 sm:gap-1.5">
                              <span className="text-red-500 font-black">•</span>
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Prizes */}
                      <div className="bg-emerald-100 border border-black sm:border-2 rounded-lg sm:rounded-xl p-1.5 sm:p-3 mb-1.5 sm:mb-4">
                        <span className="text-[8px] sm:text-xs font-black text-emerald-900 flex items-center gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
                          <Gift className="w-2 h-2 sm:w-3.5 sm:h-3.5 text-emerald-700" /> Hadiah:
                        </span>
                        <div className="text-[7px] sm:text-xs font-bold text-stone-800 space-y-0 sm:space-y-0.5">
                          {lomba.prizes.map((p, pIdx) => (
                            <div key={pIdx} className="truncate">
                              🏆 {p}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Bottom Registration Info & Button */}
                    <div className="pt-1.5 sm:pt-3 border-t-2 border-black/20">
                      <div className="flex items-center justify-between mb-1.5 sm:mb-3 text-[8px] sm:text-xs font-bold text-stone-700">
                        <span className="flex items-center gap-0.5 sm:gap-1">
                          <UserCheck className="w-2 h-2 sm:w-3.5 sm:h-3.5 text-blue-600" />
                          Peserta:
                        </span>
                        <span className="bg-sky-200 text-black px-1 py-0.5 sm:px-2 sm:py-0.5 rounded-md sm:rounded-lg border border-black font-black shrink-0">
                          {lomba.registeredCount} {lomba.maxParticipants ? `/ ${lomba.maxParticipants}` : ''}
                        </span>
                      </div>

                      {isOpen ? (
                        <button
                          onClick={() => setActiveRegisterModal(lomba)}
                          className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-[8px] sm:text-sm py-1 sm:py-2.5 rounded-lg sm:rounded-2xl border-2 sm:border-3 border-black shadow-[2px_2px_0px_#000] sm:shadow-[4px_4px_0px_#000] hover:shadow-[1px_1px_0px_#000] sm:hover:shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-0.5 sm:gap-2 cursor-pointer"
                        >
                          <PlusCircle className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                          <span>Daftar</span>
                        </button>
                      ) : (
                        <div className="bg-stone-200 text-stone-700 font-bold text-[7px] sm:text-xs py-1 sm:py-2 px-1 sm:px-3 rounded-lg sm:rounded-xl border border-black sm:border-2 text-center">
                          {lomba.status === 'Selesai' ? '✅ Selesai' : '🔒 Ditutup'}
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* REGISTRATION FORM MODAL NEUBRUTALISM */}
        {activeRegisterModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[10px_10px_0px_#000] relative">
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl p-2 bg-amber-200 rounded-2xl border-2 border-black">
                    {activeRegisterModal.emoji}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-black">
                      Formulir Pendaftaran
                    </h3>
                    <p className="text-xs font-bold text-red-600">
                      {activeRegisterModal.title} ({activeRegisterModal.category})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveRegisterModal(null)}
                  className="bg-stone-200 hover:bg-red-200 font-black text-black px-3 py-1 rounded-xl border-2 border-black text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {registrationSubmitted ? (
                <div className="bg-emerald-100 border-3 border-black rounded-2xl p-6 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="text-xl font-black text-black">
                    Pendaftaran Berhasil! 🎉
                  </h4>
                  <p className="text-xs font-bold text-stone-700">
                    Terima kasih <span className="text-black underline">{participantName}</span>! Namamu telah terdaftar di perlombaan {activeRegisterModal.title}. Sampai jumpa di lapangan!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitRegistration} className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-black mb-1">
                      Nama Lengkap Peserta *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso / Dik Alya"
                      value={participantName}
                      onChange={(e) => setParticipantName(e.target.value)}
                      className="w-full bg-stone-50 text-black px-4 py-2.5 rounded-xl border-3 border-black text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-black mb-1">
                      Nomor Rumah / Gang *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: No. 12 Gang Merpati"
                      value={houseNumber}
                      onChange={(e) => setHouseNumber(e.target.value)}
                      className="w-full bg-stone-50 text-black px-4 py-2.5 rounded-xl border-3 border-black text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-black mb-1">
                      Nomor WhatsApp / Kontak (Opsional)
                    </label>
                    <input
                      type="tel"
                      placeholder="Contoh: 081234567890"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-stone-50 text-black px-4 py-2.5 rounded-xl border-3 border-black text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveRegisterModal(null)}
                      className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-extrabold px-4 py-2.5 rounded-xl border-2 border-black text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="bg-red-500 hover:bg-red-600 text-white font-black px-6 py-2.5 rounded-xl border-3 border-black shadow-[4px_4px_0px_#000] text-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                      <span>Kirim Pendaftaran</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
