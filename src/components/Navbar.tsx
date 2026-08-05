import React, { useState } from 'react';
import { Sparkles, Menu, X, Calendar, Trophy, PhoneCall, MapPin, Flag, Images } from 'lucide-react';
import { triggerPestaFireworks } from '../utils/confetti';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-40 bg-[#fafaf9] border-b-4 border-black shadow-[0_4px_0_#000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / RT Badge */}
          <button 
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-12 h-12 bg-red-500 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-2xl transform group-hover:-rotate-6 transition-transform">
              🇮🇩
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl text-black tracking-tight font-sans">
                  RT 09 <span className="text-red-600">Ngadisuryan</span>
                </span>
                <span className="bg-amber-300 text-black text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-black shadow-[1px_1px_0px_#000] uppercase">
                  HUT RI 81
                </span>
              </div>
              <p className="text-xs text-stone-600 font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-500 inline" /> Ngadisuryan
              </p>
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
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => triggerPestaFireworks()}
              className="bg-red-600 text-white p-2.5 rounded-xl border-3 border-black shadow-[2px_2px_0px_#000]"
              title="Sorak Merdeka"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-amber-300 p-2.5 rounded-xl border-3 border-black shadow-[3px_3px_0px_#000] text-black font-bold focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-red-600 border-t-4 border-black p-4 space-y-3 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-black text-base border-3 border-black text-left ${
                  isActive
                    ? 'bg-amber-300 text-black shadow-[4px_4px_0px_#000]'
                    : 'bg-white text-black shadow-[2px_2px_0px_#000]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border-2 border-black ${isActive ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
