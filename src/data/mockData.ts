import { TimelineEvent, LombaItem, PhotoDocumentation, Announcement } from '../types';

interface LombaMaster extends LombaItem {
  stepNumber: number;
  subtitle: string;
  dateIso: string;
  timeStart: string;
  timeEnd?: string;
  accentColor: string;
  description: string;
  highlights: string[];
  photos: PhotoDocumentation[];
  isKidFriendly?: boolean;
}

export const INITIAL_PENGUMUMAN: Announcement[] = [
  {
    id: 'a-1',
    title: 'Malam Sarasehan & Tasyakuran 16 Agustus',
    message: 'Wajib membawa snack masing-masing per KK (minimal senilai @Rp5.000, boleh lebih sesuai kemampuan panjenengan).',
    date: '5 Agustus 2026',
    tag: 'Penting',
    emoji: '🍚',
    pinned: true
  },
  {
    id: 'a-2',
    title: 'Jalan Sehat CarNavaL',
    message: 'Jalan Sehat CarNavaL mulai jam 06.00 WIB! Kostum bebas (lucu, sport, badut), kritik membangun monggo. Ada sarapan gratis — tapi menu masih rahasia, kira-kira apa yaa??🤔 Pokoknya meriah!',
    date: '5 Agustus 2026',
    tag: 'Info',
    emoji: '🎉'
  },
  {
    id: 'a-3',
    title: 'Semarakkan 17-an Bersama Keluarga',
    message: 'Mari kita semarakkan acara 17-an di warga RT 09! Ikuti & ramaikan, ajak anak cucu cicit mengikuti lomba-lomba. Hanya setahun sekali, pokoknya meriahkan.',
    date: '5 Agustus 2026',
    tag: 'Pengumuman',
    emoji: '📢'
  }
];

const NON_LOMBA_EVENTS: TimelineEvent[] = [
  {
    id: 'evt-1',
    stepNumber: 1,
    title: 'Kerja Bakti Warga & Pemasangan Bendera',
    subtitle: 'Gotong Royong Bersih-bersih & Hias Area RT 09',
    date: 'Minggu, 2 Agustus 2026',
    dateIso: '2026-08-02',
    time: '06.30 - Selesai WIB',
    timeStart: '06:30',
    timeEnd: '10:00',
    location: 'Area Lingkungan RT 09',
    category: 'Pra-Acara',
    emoji: '🧹',
    bgColor: 'bg-red-100',
    accentColor: 'border-red-600',
    description: 'Seluruh warga Ngadisuryan RT 09 bahu-membahu membersihkan lingkungan, merapikan serta memotong rumput di sepanjang jalan, membersihkan area pos ronda, dan memasang dekorasi serta bendera merah putih untuk menyemarakkan suasana 17 Agustus.',
    highlights: ['Membersihkan Lingkungan & Area Umum Warga', 'Merapikan Serta Memotong Rumput Sepanjang Jalan', 'Membersihkan Area Pos Ronda', 'Pemasangan Dekorasi & Bendera Merah Putih'],
    photos: [
      {
        id: 'kb-1',
        url: './foto-galeri/kerjabakti/719080.jpg',
        caption: '',
        photographer: 'Dokumentasi Panitia'
      },
      {
        id: 'kb-2',
        url: './foto-galeri/kerjabakti/719101.jpg',
        caption: '',
        photographer: 'Dokumentasi Panitia'
      },
      {
        id: 'kb-3',
        url: './foto-galeri/kerjabakti/719107.jpg',
        caption: '',
        photographer: 'Dokumentasi Panitia'
      },
      {
        id: 'kb-4',
        url: './foto-galeri/kerjabakti/719122.jpg',
        caption: '',
        photographer: 'Dokumentasi Panitia'
      },
      {
        id: 'kb-5',
        url: './foto-galeri/kerjabakti/719132.jpg',
        caption: '',
        photographer: 'Dokumentasi Panitia'
      },
      {
        id: 'kb-6',
        url: './foto-galeri/kerjabakti/719145.jpg',
        caption: '',
        photographer: 'Dokumentasi Panitia'
      },
      {
        id: 'kb-7',
        url: './foto-galeri/kerjabakti/kb-7.jpg',
        caption: '',
        photographer: 'Dokumentasi Panitia'
      },
      {
        id: 'kb-8',
        url: './foto-galeri/kerjabakti/kb-8.jpg',
        caption: '',
        photographer: 'Dokumentasi Panitia'
      },
      {
        id: 'kb-9',
        url: './foto-galeri/kerjabakti/kb-9.jpg',
        caption: '',
        photographer: 'Dokumentasi Panitia'
      }
    ],
    isKidFriendly: true
  },
  {
    id: 'evt-11',
    stepNumber: 11,
    title: 'Malam Tasyakuran HUT RI ke-81',
    subtitle: 'Renungan, Doa Bersama, Potong Tumpeng & Pembagian Hadiah',
    date: 'Minggu, 16 Agustus 2026',
    dateIso: '2026-08-16',
    time: '19.30 - Selesai WIB',
    timeStart: '19:30',
    timeEnd: '22:00',
    location: 'Pos Ronda / Area Fasilitas Umum RT 09',
    category: 'Puncak Acara',
    emoji: '🍚',
    bgColor: 'bg-red-200',
    accentColor: 'border-red-700',
    description: 'Puncak acara penutup rangkaian kemeriahan kemerdekaan. Panitia mengundang seluruh warga Ngadisuryan RT 09 hadir pada malam tasyakuran HUT RI ke-81 dengan susunan acara yang khidmat dan meriah. Sesuai pesan Pak RT, setiap KK wajib membawa snack masing-masing dengan nilai minimal @Rp5.000 (boleh lebih sesuai kemampuan) untuk dinikmati bersama.',
    highlights: ['Pembukaan & Menyanyikan Lagu Indonesia Raya', 'Sambutan Ketua RT 09 & Ketua Panitia', 'Renungan Kemerdekaan & Doa Bersama', 'Pemotongan Tumpeng Simbolis Rasa Syukur', 'Pengumuman Pemenang & Pembagian Hadiah', 'Ramah Tamah & Hiburan', 'Bawa Snack Masing-masing/KK (minimal @Rp5.000)'],
    photos: [],
    isKidFriendly: true
  },
  {
    id: 'evt-12',
    stepNumber: 12,
    title: 'Jalan Sehat CarNavaL',
    subtitle: 'Kostum Bebas & Karnaval Meriah',
    date: 'Minggu, 23 Agustus 2026',
    dateIso: '2026-08-23',
    time: '06.00 - Selesai WIB',
    timeStart: '06:00',
    location: 'Lapangan Badminton RT 09',
    category: 'Umum',
    emoji: '🎉',
    bgColor: 'bg-fuchsia-100',
    accentColor: 'border-fuchsia-600',
    description: 'Jalan Sehat CarNavaL warga RT 09 dengan kostum bebas sesuai kreativitas: lucu, sport, badut, hingga tema kritis membangun. Sesuai ajakan Pak RT, ajak seluruh keluarga anak cucu cicit, pokoknya meriah! Doorprize menanti para peserta. Oh iya, ada sarapan gratis! Tapi menu masih rahasia... kira-kira apa yaa??🤔 Pas hari-H baru dibuka, tebak-tebakan warga dibuka mulai sekarang!',
    highlights: ['🍽️ Ada sarapan gratis! Menu masih rahasia — kira-kira apa yaa?? 🤔', 'Kostum bebas: lucu, sport, badut, kritis membangun', 'Ajak keluarga: anak cucu cicit', 'Doorprize menanti — pengumuman menyusul'],
    photos: [],
    isKidFriendly: true
  }
];

const LOMBA_MASTER: LombaMaster[] = [
  {
    id: 'l-1',
    stepNumber: 2,
    title: 'Makan Kerupuk',
    subtitle: 'Khusus Anak-anak - Sore Hari',
    category: 'Anak-Anak',
    emoji: '🥨',
    date: 'Jumat, 7 Agustus 2026',
    dateIso: '2026-08-07',
    time: '16.00 WIB',
    timeStart: '16:00',
    location: 'Lapangan Badminton RT 09',
    picName: 'Irgi',
    picPhone: '0878-1710-9749',
    registeredCount: 14,
    maxParticipants: 20,
    prizes: ['Trofi Juara 1 + Set Alat Tulis', 'Trofi Juara 2 + Tas Sekolah', 'Trofi Juara 3 + Botol Minum'],
    rules: ['Kategori usia 4 - 10 tahun', 'Tangan wajib diikat ke belakang', 'Dilarang menyentuh tali kerupuk dengan sengaja'],
    bgColor: 'bg-amber-100',
    accentColor: 'border-amber-600',
    status: 'Pendaftaran Dibuka',
    description: 'Lomba makan kerupuk khusus anak-anak sebagai pembuka rangkaian lomba kemerdekaan. Siapa paling cepat menghabiskan kerupuk jumbo tanpa bantuan tangan, dialah juaranya!',
    highlights: ['Kategori usia 4 - 10 tahun', 'Tangan wajib diikat ke belakang', 'Paling cepat jadi pemenang'],
    photos: [],
    isKidFriendly: true
  },
  {
    id: 'l-2',
    stepNumber: 3,
    title: 'Memasukkan Pensil ke Botol',
    subtitle: 'Khusus Anak-anak - Malam Hari',
    category: 'Anak-Anak',
    emoji: '✏️',
    date: 'Jumat, 7 Agustus 2026',
    dateIso: '2026-08-07',
    time: '19.00 WIB',
    timeStart: '19:00',
    location: 'Lapangan Badminton RT 09',
    picName: 'Irgi',
    picPhone: '0878-1710-9749',
    registeredCount: 12,
    maxParticipants: 20,
    prizes: ['Piala Juara 1 + Paket Alat Tulis', 'Piala Juara 2 + Buku Gambar', 'Piala Juara 3 + Set Mewarnai'],
    rules: ['Kategori usia 4 - 10 tahun', 'Pensil digantung tali di belakang', 'Tidak boleh menggunakan tangan untuk membantu'],
    bgColor: 'bg-sky-100',
    accentColor: 'border-sky-600',
    status: 'Pendaftaran Dibuka',
    description: 'Lomba seru memasukkan pensil yang digantung di belakang ke dalam botol. Butuh fokus, keseimbangan, dan ketelitian untuk jadi juara!',
    highlights: ['Kategori usia 4 - 10 tahun', 'Pensil digantung tali di belakang', 'Tidak boleh menggunakan tangan untuk membantu'],
    photos: [],
    isKidFriendly: true
  },
  {
    id: 'l-3',
    stepNumber: 4,
    title: 'Lomba Pukul Air',
    subtitle: 'Khusus Anak-anak - Sore Hari',
    category: 'Anak-Anak',
    emoji: '💧',
    date: 'Sabtu, 8 Agustus 2026',
    dateIso: '2026-08-08',
    time: '16.00 WIB',
    timeStart: '16:00',
    location: 'Lapangan Badminton RT 09',
    picName: 'Irgi',
    picPhone: '0878-1710-9749',
    registeredCount: 15,
    maxParticipants: 24,
    prizes: ['Trofi Juara 1 + Sepatu Roda', 'Trofi Juara 2 + Helm Lucu', 'Trofi Juara 3 + Botol Minum Tumbler'],
    rules: ['Kategori usia 6 - 12 tahun', 'Mata ditutup kain saat memukul balon air', 'Dilarang membuka penutup mata sebelum aba-aba'],
    bgColor: 'bg-cyan-100',
    accentColor: 'border-cyan-600',
    status: 'Pendaftaran Dibuka',
    description: 'Lomba memukul balon air dengan mata tertutup. Pecahnya balon air jadi penanda kemenangan sekaligus momen basah-basahan yang menghibur!',
    highlights: ['Kategori usia 6 - 12 tahun', 'Mata ditutup kain saat memukul balon air', 'Dilarang membuka penutup mata sebelum aba-aba'],
    photos: [],
    isKidFriendly: true
  },
  {
    id: 'l-4',
    stepNumber: 5,
    title: 'Lari Kelereng',
    subtitle: 'Khusus Anak-anak - Malam Hari',
    category: 'Anak-Anak',
    emoji: '🏃',
    date: 'Sabtu, 8 Agustus 2026',
    dateIso: '2026-08-08',
    time: '19.00 WIB',
    timeStart: '19:00',
    location: 'Lapangan Badminton RT 09',
    picName: 'Irgi',
    picPhone: '0878-1710-9749',
    registeredCount: 13,
    maxParticipants: 20,
    prizes: ['Piala Juara 1 + Sepeda Mini', 'Piala Juara 2 + Sepatu Olahraga', 'Piala Juara 3 + Set Alat Tulis'],
    rules: ['Kategori usia 6 - 12 tahun', 'Kelereng di atas sendok tanpa boleh jatuh', 'Tercepat sampai garis finish jadi pemenang'],
    bgColor: 'bg-emerald-100',
    accentColor: 'border-emerald-600',
    status: 'Pendaftaran Dibuka',
    description: 'Lomba lari membawa kelereng di atas sendok. Kelereng tak boleh jatuh, siapa paling cepat sampai garis finish jadi pemenang!',
    highlights: ['Kategori usia 6 - 12 tahun', 'Kelereng di atas sendok tanpa boleh jatuh', 'Tercepat sampai garis finish jadi pemenang'],
    photos: [],
    isKidFriendly: true
  },
  {
    id: 'l-5',
    stepNumber: 6,
    title: 'Mewarnai & Menggambar',
    subtitle: 'Kategori TK s.d. 1 SMP',
    category: 'Anak-Anak',
    emoji: '🎨',
    date: 'Minggu, 9 Agustus 2026',
    dateIso: '2026-08-09',
    time: '08.00 WIB',
    timeStart: '08:00',
    location: 'Lapangan Badminton RT 09',
    picName: 'Satya',
    picPhone: '0813-2510-6276',
    registeredCount: 28,
    maxParticipants: 50,
    prizes: ['Trofi Juara 1 + Peralatan Seni Komplit', 'Trofi Juara 2 + Set Crayon & Buku Gambar', 'Trofi Juara 3 + Kotak Pensil Warna'],
    rules: [
      'Lomba Mewarnai: kategori TK s.d. Kelas 3 SD',
      'Lomba Menggambar: kategori Kelas 4 SD s.d. 1 SMP',
      'Kedua kategori dinilai juri dari kerapian & kreativitas',
      'Peserta membawa alat mewarnai/menggambar sendiri, tema ditentukan panitia saat lomba'
    ],
    bgColor: 'bg-pink-100',
    accentColor: 'border-pink-600',
    status: 'Pendaftaran Dibuka',
    description: 'Ajang kreativitas seni anak-anak! Lomba mewarnai untuk TK s.d. Kelas 3 SD dan lomba menggambar untuk Kelas 4 SD s.d. 1 SMP, dengan tema yang ditentukan panitia saat lomba.',
    highlights: ['Mewarnai: TK s.d. Kelas 3 SD', 'Menggambar: Kelas 4 SD s.d. 1 SMP', 'Peserta membawa peralatan sendiri'],
    photos: [],
    isKidFriendly: true
  },
  {
    id: 'l-7',
    stepNumber: 7,
    title: 'Tiup Bola Pingpong',
    subtitle: 'Khusus Anak-anak - Sore Hari',
    category: 'Anak-Anak',
    emoji: '🏓',
    date: 'Jumat, 14 Agustus 2026',
    dateIso: '2026-08-14',
    time: '16.00 WIB',
    timeStart: '16:00',
    location: 'Lapangan Badminton RT 09',
    picName: 'Satya',
    picPhone: '0813-2510-6276',
    registeredCount: 11,
    maxParticipants: 20,
    prizes: ['Trofi Juara 1 + Raket Pingpong', 'Trofi Juara 2 + Sepatu Olahraga', 'Trofi Juara 3 + Botol Minum'],
    rules: ['Kategori usia 6 - 12 tahun', 'Bola pingpong ditiup melewati gelas berisi air', 'Tangan tidak boleh menyentuh gelas'],
    bgColor: 'bg-amber-100',
    accentColor: 'border-amber-600',
    status: 'Pendaftaran Dibuka',
    description: 'Lomba meniup bola pingpong melewati deretan gelas berisi air. Butuh nafas panjang dan strategi agar bola cepat berpindah ke gelas terakhir!',
    highlights: ['Kategori usia 6 - 12 tahun', 'Bola pingpong ditiup melewati gelas berisi air', 'Tangan tidak boleh menyentuh gelas'],
    photos: [],
    isKidFriendly: true
  },
  {
    id: 'l-8',
    stepNumber: 8,
    title: 'Lomba ??? 🔒',
    subtitle: 'Nama Lomba Terkunci - Segera Terungkap',
    category: 'Umum',
    emoji: '🔒',
    date: 'Jumat, 14 Agustus 2026',
    dateIso: '2026-08-14',
    time: '19.00 WIB',
    timeStart: '19:00',
    location: 'Lapangan Badminton RT 09',
    picName: 'Satya',
    picPhone: '0813-2510-6276',
    registeredCount: 0,
    maxParticipants: 12,
    prizes: ['Dirahasiakan panitia - kejutan menanti di hari-H!'],
    rules: ['Nama lomba & aturan main masih dikunci panitia', 'Jenis lomba masih jadi teka-teki - tebak-tebakan warga dibuka!', 'Pantau pengumuman panitia untuk info lanjutan'],
    bgColor: 'bg-stone-200',
    accentColor: 'border-stone-700',
    status: 'Segera',
    description: 'Masih ada satu lomba lagi yang dirahasiakan panitia! Nama dan jenisnya masih terkunci gembok 🔒 sampai hari-H. Kira-kira lombanya apa yaa?? Siap-siap tebak, kejutan menanti!',
    highlights: ['🔒 Nama lomba masih terkunci rahasia', '🤔 Kira-kira lombanya apa yaa?', 'Kejutan hadiah dirahasiakan panitia'],
    photos: [],
    isKidFriendly: false,
    isLocked: true
  },
  {
    id: 'l-9',
    stepNumber: 9,
    title: 'Estafet Air',
    subtitle: 'Kategori Umum - Kelompok Diacak Panitia',
    category: 'Umum',
    emoji: '💦',
    date: 'Sabtu, 15 Agustus 2026',
    dateIso: '2026-08-15',
    time: '16.00 WIB',
    timeStart: '16:00',
    location: 'Lapangan Badminton RT 09',
    picName: 'Satya',
    picPhone: '0813-2510-6276',
    registeredCount: 8,
    maxParticipants: 12,
    prizes: ['Hadiah Tunai + Parcel Raksasa Juara 1', 'Parcel Sembako Juara 2', 'Paket Snack Komplek Juara 3'],
    rules: ['Kategori umum - kelompok diacak panitia di tempat', 'Memindahkan air tanpa tumpah di garis finish', 'Waktu tercepat menentukan pemenang'],
    bgColor: 'bg-sky-100',
    accentColor: 'border-sky-600',
    status: 'Pendaftaran Dibuka',
    description: 'Lomba estafet air untuk umum. Kelompok peserta diacak langsung oleh panitia di tempat untuk menambah keseruan! Tim paling cepat dan paling sedikit menumpahkan air jadi juara.',
    highlights: ['Kelompok diacak panitia di tempat', 'Memindahkan air tanpa tumpah di garis finish', 'Waktu tercepat menentukan pemenang'],
    photos: [],
    isKidFriendly: false
  },
  {
    id: 'l-10',
    stepNumber: 10,
    title: 'Lomba ??? 🔒',
    subtitle: 'Nama Lomba Terkunci - Segera Terungkap',
    category: 'Umum',
    emoji: '🔒',
    date: 'Sabtu, 15 Agustus 2026',
    dateIso: '2026-08-15',
    time: '19.00 WIB',
    timeStart: '19:00',
    location: 'Lapangan Badminton RT 09',
    picName: 'Satya',
    picPhone: '0813-2510-6276',
    registeredCount: 0,
    maxParticipants: 12,
    prizes: ['Dirahasiakan panitia - kejutan menanti di hari-H!'],
    rules: ['Nama lomba & aturan main masih dikunci panitia', 'Jenis lomba masih jadi teka-teki - tebak-tebakan warga dibuka!', 'Pantau pengumuman panitia untuk info lanjutan'],
    bgColor: 'bg-stone-200',
    accentColor: 'border-stone-700',
    status: 'Segera',
    description: 'Masih ada satu lomba lagi yang dirahasiakan panitia! Nama dan jenisnya masih terkunci gembok 🔒 sampai hari-H. Kira-kira lombanya apa yaa?? Siap-siap tebak, kejutan menanti!',
    highlights: ['🔒 Nama lomba masih terkunci rahasia', '🤔 Kira-kira lombanya apa yaa?', 'Kejutan hadiah dirahasiakan panitia'],
    photos: [],
    isKidFriendly: false,
    isLocked: true
  }
];

const toEvent = (l: LombaMaster): TimelineEvent => ({
  id: l.id,
  stepNumber: l.stepNumber,
  title: l.title,
  subtitle: l.subtitle,
  date: l.date,
  dateIso: l.dateIso,
  time: l.time,
  timeStart: l.timeStart,
  timeEnd: l.timeEnd,
  location: l.location,
  category: 'Lomba',
  emoji: l.emoji,
  bgColor: l.bgColor,
  accentColor: l.accentColor,
  description: l.description,
  highlights: l.highlights,
  photos: l.photos,
  rules: l.rules,
  prizes: l.prizes,
  picName: l.picName,
  picPhone: l.picPhone,
  status: l.status,
  ...(l.isKidFriendly !== undefined ? { isKidFriendly: l.isKidFriendly } : {}),
  ...(l.isLocked ? { isLocked: true } : {})
});

export const INITIAL_LOMBA: LombaItem[] = LOMBA_MASTER.map(
  ({ stepNumber, subtitle, dateIso, timeStart, accentColor, description, highlights, photos, isKidFriendly, ...lomba }) => lomba
);

export const INITIAL_EVENTS: TimelineEvent[] = [
  ...NON_LOMBA_EVENTS,
  ...LOMBA_MASTER.map(toEvent)
].sort((a, b) => a.stepNumber - b.stepNumber);
