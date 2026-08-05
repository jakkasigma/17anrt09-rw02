import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PapanPengumuman } from './components/PapanPengumuman';
import { AcaraBerikutnya } from './components/AcaraBerikutnya';
import { FotoKilas } from './components/FotoKilas';
import { RingkasanLomba } from './components/RingkasanLomba';
import { KontakSingkat } from './components/KontakSingkat';
import { TimelineMap } from './components/TimelineMap';
import { JadwalLomba } from './components/JadwalLomba';
import { KontakPanitia } from './components/KontakPanitia';
import { Galeri } from './components/Galeri';
import { GaleriModal } from './components/GaleriModal';
import { EventDetailPage } from './components/EventDetailPage';
import { Footer } from './components/Footer';

import { INITIAL_EVENTS, INITIAL_LOMBA, INITIAL_PENGUMUMAN } from './data/mockData';
import { TimelineEvent, LombaItem, PhotoDocumentation, Announcement } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [events] = useState<TimelineEvent[]>(INITIAL_EVENTS);
  const [lombaList] = useState<LombaItem[]>(INITIAL_LOMBA);
  const [announcements] = useState<Announcement[]>(INITIAL_PENGUMUMAN);

  // Modal States
  const [currentPhoto, setCurrentPhoto] = useState<PhotoDocumentation | null>(null);
  const [activePhotoList, setActivePhotoList] = useState<PhotoDocumentation[]>([]);
  const [selectedDetailEvent, setSelectedDetailEvent] = useState<TimelineEvent | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedDetailEvent(null);
  };

  // Photo Lightbox handlers
  const handleOpenPhoto = (photo: PhotoDocumentation, allPhotos: PhotoDocumentation[]) => {
    setCurrentPhoto(photo);
    setActivePhotoList(allPhotos);
  };

  const handleClosePhoto = () => {
    setCurrentPhoto(null);
    setActivePhotoList([]);
  };

  const handleNavigatePhoto = (direction: 'next' | 'prev') => {
    if (!currentPhoto || activePhotoList.length === 0) return;
    const currentIndex = activePhotoList.findIndex((p) => p.id === currentPhoto.id);
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % activePhotoList.length;
      setCurrentPhoto(activePhotoList[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + activePhotoList.length) % activePhotoList.length;
      setCurrentPhoto(activePhotoList[prevIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans antialiased selection:bg-amber-300 selection:text-black">
      
      {/* Top Neubrutalism Sticky Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main Tab Render */}
      <main>
        {selectedDetailEvent && (
          <EventDetailPage
            event={selectedDetailEvent}
            onBack={() => setSelectedDetailEvent(null)}
            onOpenPhoto={handleOpenPhoto}
          />
        )}

        {!selectedDetailEvent && activeTab === 'beranda' && (
          <>
            <Hero setActiveTab={handleTabChange} stats={{ nodes: events.length, lomba: lombaList.length }} />
            <PapanPengumuman announcements={announcements} />
            <AcaraBerikutnya events={events} onOpenEventDetail={setSelectedDetailEvent} />
            <FotoKilas events={events} onOpenPhoto={handleOpenPhoto} setActiveTab={handleTabChange} />
            <RingkasanLomba
              lombaList={lombaList}
              setActiveTab={handleTabChange}
              onOpenEventDetail={(lomba) => {
                const evt = events.find((e) => e.id === lomba.id);
                if (evt) setSelectedDetailEvent(evt);
              }}
            />
            <KontakSingkat setActiveTab={handleTabChange} />
          </>
        )}

        {!selectedDetailEvent && activeTab === 'timeline' && (
          <div className="pt-4">
            <TimelineMap
              events={events}
              onOpenPhoto={handleOpenPhoto}
              onOpenEventDetail={setSelectedDetailEvent}
            />
          </div>
        )}

        {!selectedDetailEvent && activeTab === 'lomba' && (
          <div className="pt-4">
            <JadwalLomba
              lombaList={lombaList}
              onOpenDetail={(lomba) => {
                const evt = events.find((e) => e.id === lomba.id);
                if (evt) setSelectedDetailEvent(evt);
              }}
            />
          </div>
        )}

        {!selectedDetailEvent && activeTab === 'galeri' && (
          <div className="pt-4">
            <Galeri events={events} onOpenPhoto={handleOpenPhoto} />
          </div>
        )}

        {!selectedDetailEvent && activeTab === 'kontak' && (
          <div className="pt-4">
            <KontakPanitia />
          </div>
        )}
      </main>

      {/* Neubrutalism Footer */}
      <Footer setActiveTab={handleTabChange} />

      {/* Lightbox Photo Modal */}
      <GaleriModal
        currentPhoto={currentPhoto}
        allPhotos={activePhotoList}
        onClose={handleClosePhoto}
        onNavigate={handleNavigatePhoto}
      />

    </div>
  );
}
