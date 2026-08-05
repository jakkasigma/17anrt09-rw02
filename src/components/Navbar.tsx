import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Calendar, Trophy, PhoneCall, MapPin, Flag, Images } from 'lucide-react';
import { triggerPestaFireworks } from '../utils/confetti';
import { MAP_LINK } from '../data/committee';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Flag },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'lomba', label: 'Jadwal Lomba', icon: Trophy },
    { id: 'galeri', label: 'Galeri', icon: Images },
    { id: 'kontak', label: 'Kontak', icon: PhoneCall },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    <header className="sticky top-0 z-40 bg-[#fafaf9] border-b-4 border-black shadow-[0_4px_0_#000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / RT Badge */}
          <button 
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none min-w-0"
          >
            <div className="w-12 h-12 bg-red-500 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-2xl transform group-hover:-rotate-6 transition-transform shrink-0">
              🇮🇩
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-extrabold text-lg sm:text-xl text-black tracking-tight font-sans truncate">
                  RT 09 <span className="text-red-600">Ngadisuryan</span>
                </span>
                <span className="bg-amber-300 text-black text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-black shadow-[1px_1px_0px_#000] uppercase shrink-0">
                  HUT RI 81
                </span>
              </div>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                title="Buka lokasi di Google Maps"
                className="text-xs text-stone-600 font-bold flex items-center gap-1 hover:text-red-600 hover:underline cursor-pointer"
              >
                <MapPin className="w-3 h-3 text-red-500 inline" /> Ngadisuryan
              </a>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2.5 rounded-2xl font-bold text-sm border-3 border-black transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-amber-300 shadow-[4px_4px_0px_#000] -translate-y-0.5 text-black'
                      : 'bg-white hover:bg-sky-100 shadow-[2px_2px_0px_#000] text-stone-800 hover:-translate-y-0.5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-600' : 'text-stone-600'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Button: Fireworks */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => triggerPestaFireworks()}
              className="bg-red-500 hover:bg-red-600 text-white font-extrabold px-4 py-2.5 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 animate-bounce" />
              <span>Sorak Merdeka!</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-11 h-11 rounded-xl border-2 border-black bg-white text-black shadow-[3px_3px_0px_#000] hover:bg-amber-300 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all focus:outline-none"
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="navbar-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div id="navbar-mobile-menu" className="md:hidden bg-red-600 border-t-4 border-white shadow-[0_8px_0_#991b1b] px-4 py-3 space-y-2 max-h-[calc(100dvh-5rem)] overflow-y-auto animate-[menu-in_0.18s_ease-out]">
          <p className="text-[10px] font-black text-white/90 uppercase tracking-widest px-2 pt-0.5 pb-1">
            Menu · RT 09 Ngadisuryan
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl font-black text-base border-2 border-black text-left transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                  isActive
                    ? 'bg-amber-300 text-black shadow-[4px_4px_0px_#000]'
                    : 'bg-white text-black shadow-[2px_2px_0px_#000] hover:bg-sky-100'
                }`}
              >
                <div className={`p-2 rounded-xl border-2 border-black ${isActive ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="border-t-2 border-white/30 pt-2.5 space-y-2">
            <button
              onClick={() => {
                triggerPestaFireworks();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl font-black text-base border-2 border-black bg-red-700 text-white shadow-[4px_4px_0px_#000] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              Sorak Merdeka!
            </button>
          </div>
        </div>
      )}
    </header>

    {/* Mobile backdrop */}
    {mobileMenuOpen && (
      <div
        className="fixed inset-0 z-30 bg-black/25"
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
    )}
  </>
  );
};
