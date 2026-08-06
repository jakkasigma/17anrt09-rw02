export type EventStatus = 'selesai' | 'berlangsung' | 'mendatang';

export interface PhotoDocumentation {
  id: string;
  url: string;
  caption: string;
  photographer?: string;
}

export interface TimelineEvent {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  date: string;
  dateIso: string;
  time: string;
  timeStart: string;
  timeEnd?: string;
  location: string;
  category: 'Pra-Acara' | 'Lomba' | 'Religi/Budaya' | 'Puncak Acara' | 'Umum';
  emoji: string;
  bgColor: string; // e.g., 'bg-sky-200', 'bg-amber-200', 'bg-emerald-200', 'bg-rose-200'
  accentColor: string;
  description: string;
  highlights: string[];
  photos: PhotoDocumentation[];
  isKidFriendly?: boolean;
  rules?: string[];
  prizes?: string[];
  picName?: string;
  picPhone?: string;
  status?: 'Pendaftaran Dibuka' | 'Segera' | 'Selesai';
  isLocked?: boolean;
}

export interface LombaItem {
  id: string;
  title: string;
  category: 'Anak-Anak' | 'Remaja' | 'Ibu-Ibu' | 'Bapak-Bapak' | 'Umum';
  emoji: string;
  date: string;
  time: string;
  location: string;
  picName: string;
  picPhone: string;
  maxParticipants?: number;
  registeredCount: number;
  prizes: string[];
  rules: string[];
  bgColor: string;
  status: 'Pendaftaran Dibuka' | 'Segera' | 'Selesai';
  isLocked?: boolean;
}

export type AnnouncementTag = 'Penting' | 'Info' | 'Pengumuman';

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  tag: AnnouncementTag;
  emoji: string;
  pinned?: boolean;
}
