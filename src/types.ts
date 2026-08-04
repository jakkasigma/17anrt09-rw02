export type EventStatus = 'selesai' | 'mendatang';

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
  time: string;
  location: string;
  category: 'Pra-Acara' | 'Lomba' | 'Religi/Budaya' | 'Puncak Acara';
  status: EventStatus;
  emoji: string;
  bgColor: string; // e.g., 'bg-sky-200', 'bg-amber-200', 'bg-emerald-200', 'bg-rose-200'
  accentColor: string;
  description: string;
  highlights: string[];
  photos: PhotoDocumentation[];
  isKidFriendly?: boolean;
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
}

export interface ResidentWish {
  id: string;
  name: string;
  houseNumber: string;
  message: string;
  sticker: string;
  timestamp: string;
  likes: number;
}
