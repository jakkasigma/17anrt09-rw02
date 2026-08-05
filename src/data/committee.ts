export interface CommitteeMember {
  role: string;
  name: string;
  phone: string;
  waNumber: string;
  address: string;
  emoji: string;
  bgColor: string;
}

export const COMMITTEE: CommitteeMember[] = [
  {
    role: 'Kontak Person Sekretariat',
    name: 'Irgi',
    phone: '0878-1710-9749',
    waNumber: '6287817109749',
    address: 'Sekretariat RT 09',
    emoji: '🙋‍♂️',
    bgColor: 'bg-emerald-200'
  },
  {
    role: 'Kontak Person Panitia',
    name: 'Satya',
    phone: '0813-2510-6276',
    waNumber: '6281325106276',
    address: 'Panitia HUT RI ke-81',
    emoji: '👨‍💼',
    bgColor: 'bg-amber-200'
  }
];

export const WA_SEKRETARIAT = '6287817109749';

export const MAP_COORDINATES = {
  lat: -7.8097414,
  lng: 110.3631928
};

export const MAP_LINK = 'https://maps.app.goo.gl/RMPwvB4mhmJLN5cA9';
