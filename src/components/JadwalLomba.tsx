import React, { useState } from 'react';
import { LombaItem } from '../types';
import { Trophy, Users, Calendar, MapPin, UserCheck, Gift, FileText, PlusCircle, CheckCircle2, Sparkles, Search, Phone } from 'lucide-react';
import { triggerMerdekaConfetti } from '../utils/confetti';

interface JadwalLombaProps {
  lombaList: LombaItem[];
  onRegister: (lombaId: string, name: string, house: string, phone: string) => void;
}

export const JadwalLomba: React.FC<JadwalLombaProps> = ({ lombaList, onRegister }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRegisterModal, setActiveRegisterModal] = useState<LombaItem | null>(null);

  // Form State
  const [participantName, setParticipantName] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);

  const categories = ['Semua', 'Anak-Anak', 'Ibu-Ibu', 'Bapak-Bapak', 'Umum'];

  const filteredLomba = lombaList.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.rules.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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

        {/* Filter & Search Bar Neubrutalism */}
        <div className="bg-amber-200 border-4 border-black rounded-3xl p-5 shadow-[6px_6px_0px_#000] mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-black text-xs sm:text-sm border-3 border-black transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-red-500 text-white shadow-[3px_3px_0px_#000] -translate-y-0.5'
                      : 'bg-white text-black hover:bg-stone-100 shadow-[2px_2px_0px_#000]'
                  }`}
                >
                  {cat === 'Anak-Anak' ? '🎈 Anak-Anak' : cat === 'Ibu-Ibu' ? '👑 Ibu-Ibu' : cat === 'Bapak-Bapak' ? '💪 Bapak-Bapak' : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-500" />
              <input
                type="text"
                placeholder="Cari nama lomba..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-black pl-10 pr-4 py-2.5 rounded-xl border-3 border-black shadow-[2px_2px_0px_#000] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

          </div>
        </div>

        {/* LOMBA GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLomba.map((lomba) => {
            const isFull = lomba.maxParticipants ? lomba.registeredCount >= lomba.maxParticipants : false;
            const isOpen = lomba.status === 'Pendaftaran Dibuka';

            return (
              <div
                key={lomba.id}
                className={`bg-white border-4 border-black rounded-3xl p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-1 transition-all flex flex-col justify-between relative ${
                  !isOpen ? 'opacity-90 bg-stone-50/90' : ''
                }`}
              >
                
                <div>
                  {/* Category & Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-sky-200 text-stone-900 text-xs font-black px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                      {lomba.category}
                    </span>

                    <span className={`text-xs font-black px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] ${
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
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 bg-amber-100 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-3xl shrink-0">
                      {lomba.emoji}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-black leading-tight">
                        {lomba.title}
                      </h3>
                      <p className="text-xs font-extrabold text-red-600 mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 inline" /> {lomba.date} ({lomba.time})
                      </p>
                    </div>
                  </div>

                  {/* Location & PIC */}
                  <div className="bg-stone-100 border-2 border-black rounded-xl p-3 text-xs font-bold space-y-1 mb-4">
                    <div className="flex items-center gap-1.5 text-stone-800">
                      <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>{lomba.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-700">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>PIC: {lomba.picName} ({lomba.picPhone})</span>
                    </div>
                  </div>

                  {/* Rules list */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-xs font-black text-black block">Aturan Main & Syarat:</span>
                    <ul className="text-xs font-medium text-stone-700 space-y-1">
                      {lomba.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-red-500 font-black">•</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prizes */}
                  <div className="bg-emerald-100 border-2 border-black rounded-xl p-3 mb-4">
                    <span className="text-xs font-black text-emerald-900 flex items-center gap-1 mb-1">
                      <Gift className="w-3.5 h-3.5 text-emerald-700" /> Hadiah Pemenang:
                    </span>
                    <div className="text-xs font-bold text-stone-800 space-y-0.5">
                      {lomba.prizes.map((p, pIdx) => (
                        <div key={pIdx} className="text-[11px] truncate">
                          🏆 {p}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom Registration Info & Button */}
                <div className="pt-3 border-t-2 border-black/20">
                  <div className="flex items-center justify-between mb-3 text-xs font-bold text-stone-700">
                    <span className="flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                      Peserta Terdaftar:
                    </span>
                    <span className="bg-sky-200 text-black px-2 py-0.5 rounded-lg border border-black font-black">
                      {lomba.registeredCount} {lomba.maxParticipants ? `/ ${lomba.maxParticipants}` : ''} Orang
                    </span>
                  </div>

                  {isOpen ? (
                    <button
                      onClick={() => setActiveRegisterModal(lomba)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-sm py-2.5 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Daftar Lomba Ini</span>
                    </button>
                  ) : (
                    <div className="bg-stone-200 text-stone-700 font-bold text-xs py-2 px-3 rounded-xl border-2 border-black text-center">
                      {lomba.status === 'Selesai' ? '✅ Lomba Telah Selesai' : '🔒 Pendaftaran Ditutup'}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

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
