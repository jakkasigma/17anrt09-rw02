import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TimelineMap } from './components/TimelineMap';
import { JadwalLomba } from './components/JadwalLomba';
import { PapanUcapan } from './components/PapanUcapan';
import { KontakPanitia } from './components/KontakPanitia';
import { GaleriModal } from './components/GaleriModal';
import { EventDetailModal } from './components/EventDetailModal';
import { Footer } from './components/Footer';

import { INITIAL_EVENTS, INITIAL_LOMBA, INITIAL_WISHES } from './data/mockData';
import { TimelineEvent, LombaItem, ResidentWish, PhotoDocumentation } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [events] = useState<TimelineEvent[]>(INITIAL_EVENTS);
  const [lombaList, setLombaList] = useState<LombaItem[]>(INITIAL_LOMBA);
  const [wishes, setWishes] = useState<ResidentWish[]>(INITIAL_WISHES);

  // Modal States
  const [currentPhoto, setCurrentPhoto] = useState<PhotoDocumentation | null>(null);
  const [activePhotoList, setActivePhotoList] = useState<PhotoDocumentation[]>([]);
  const [selectedDetailEvent, setSelectedDetailEvent] = useState<TimelineEvent | null>(null);

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

  // Register for Lomba Handler
  const handleRegisterLomba = (lombaId: string) => {
    setLombaList((prev) =>
      prev.map((item) => {
        if (item.id === lombaId) {
          return {
            ...item,
            registeredCount: item.registeredCount + 1
          };
        }
        return item;
      })
    );
  };

  // Add Wish Handler
  const handleAddWish = (newWish: Omit<ResidentWish, 'id' | 'timestamp' | 'likes'>) => {
    const createdWish: ResidentWish = {
      ...newWish,
      id: `w-${Date.now()}`,
      timestamp: 'Baru saja',
      likes: 1
    };
    setWishes([createdWish, ...wishes]);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans antialiased selection:bg-amber-300 selection:text-black">
      
      {/* Top Neubrutalism Sticky Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Render */}
      <main>
        {activeTab === 'beranda' && (
          <>
            <Hero setActiveTab={setActiveTab} />
            <TimelineMap
              events={events}
              onOpenPhoto={handleOpenPhoto}
              onOpenEventDetail={setSelectedDetailEvent}
            />
            <JadwalLomba lombaList={lombaList} onRegister={handleRegisterLomba} />
            <PapanUcapan wishes={wishes} onAddWish={handleAddWish} />
            <KontakPanitia />
          </>
        )}

        {activeTab === 'timeline' && (
          <div className="pt-4">
            <TimelineMap
              events={events}
              onOpenPhoto={handleOpenPhoto}
              onOpenEventDetail={setSelectedDetailEvent}
            />
            <PapanUcapan wishes={wishes} onAddWish={handleAddWish} />
          </div>
        )}

        {activeTab === 'lomba' && (
          <div className="pt-4">
            <JadwalLomba lombaList={lombaList} onRegister={handleRegisterLomba} />
            <PapanUcapan wishes={wishes} onAddWish={handleAddWish} />
          </div>
        )}

        {activeTab === 'kontak' && (
          <div className="pt-4">
            <KontakPanitia />
            <PapanUcapan wishes={wishes} onAddWish={handleAddWish} />
          </div>
        )}
      </main>

      {/* Neubrutalism Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Lightbox Photo Modal */}
      <GaleriModal
        currentPhoto={currentPhoto}
        allPhotos={activePhotoList}
        onClose={handleClosePhoto}
        onNavigate={handleNavigatePhoto}
      />

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedDetailEvent}
        onClose={() => setSelectedDetailEvent(null)}
        onOpenPhoto={handleOpenPhoto}
      />

    </div>
  );
}
