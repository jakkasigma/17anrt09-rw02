import { TimelineEvent, LombaItem, ResidentWish } from '../types';

export const INITIAL_EVENTS: TimelineEvent[] = [
  {
    id: 'evt-1',
    stepNumber: 1,
    title: 'Kerja Bakti Warga & Pemasangan Bendera',
    subtitle: 'Gotong Royong Bersih-bersih & Hias Area RT 09',
    date: 'Minggu, 2 Agustus 2026',
    dateIso: '2026-08-02',
    time: '06.30 - Selesai WIB',
    timeStart: '06:30',
    location: 'Area Lingkungan RT 09',
    category: 'Pra-Acara',
    status: 'selesai',
    emoji: '🧹🇮🇩',
    bgColor: 'bg-red-100',
    accentColor: 'border-red-600',
    description: 'Seluruh warga Ngadisuryan RT 09 bahu-membahu membersihkan lingkungan, merapikan serta memotong rumput di sepanjang jalan, membersihkan area pos ronda, dan memasang dekorasi serta bendera merah putih untuk menyemarakkan suasana 17 Agustus.',
    highlights: ['Membersihkan Lingkungan & Area Umum Warga', 'Merapikan Serta Memotong Rumput Sepanjang Jalan', 'Membersihkan Area Pos Ronda', 'Pemasangan Dekorasi & Bendera Merah Putih'],
    photos: [
      {
        id: 'p1',
        url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
        caption: 'Warga semangat merapikan lingkungan RT 09 dengan tema HUT RI 81',
        photographer: 'Dokumentasi Panitia'
      },
      {
        id: 'p2',
        url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
        caption: 'Pemasangan bendera & umbul-umbul di sepanjang jalan RT 09',
        photographer: 'Karang Taruna'
      },
      {
        id: 'p3',
        url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
        caption: 'Makan bareng setelah kerja bakti bersama warga RT 09',
        photographer: 'Panitia 17-an'
      }
    ],
    isKidFriendly: true
  },
  {
    id: 'evt-2',
    stepNumber: 2,
    title: 'Lomba Makan Kerupuk',
    subtitle: 'Khusus Anak-anak - Sore Hari',
    date: 'Jumat, 7 Agustus 2026',
    dateIso: '2026-08-07',
    time: '16.00 WIB',
    timeStart: '16:00',
    location: 'Area RT 09',
    category: 'Lomba',
    status: 'mendatang',
    emoji: '🥨',
    bgColor: 'bg-amber-100',
    accentColor: 'border-amber-600',
    description: 'Lomba makan kerupuk khusus anak-anak sebagai pembuka rangkaian lomba kemerdekaan. Siapa paling cepat menghabiskan kerupuk jumbo tanpa bantuan tangan, dialah juaranya!',
    highlights: ['Kategori usia 4 - 10 tahun', 'Tangan wajib diikat ke belakang', 'Paling cepat jadi pemenang'],
    photos: [
      {
        id: 'p4',
        url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
        caption: 'Anak-anak riang gembira mengikuti lomba makan kerupuk RT 09',
        photographer: 'Karang Taruna'
      }
    ],
    isKidFriendly: true
  },
  {
    id: 'evt-3',
    stepNumber: 3,
    title: 'Lomba Memasukkan Pensil ke Botol',
    subtitle: 'Khusus Anak-anak - Malam Hari',
    date: 'Jumat, 7 Agustus 2026',
    dateIso: '2026-08-07',
    time: '19.00 WIB',
    timeStart: '19:00',
    location: 'Area RT 09',
    category: 'Lomba',
    status: 'mendatang',
    emoji: '✏️',
    bgColor: 'bg-sky-100',
    accentColor: 'border-sky-600',
    description: 'Lomba seru memasukkan pensil yang digantung di belakang ke dalam botol. Butuh fokus, keseimbangan, dan ketelitian untuk jadi juara!',
    highlights: ['Kategori usia 4 - 10 tahun', 'Pensil digantung tali di belakang', 'Tidak boleh menggunakan tangan untuk membantu'],
    photos: [
      {
        id: 'p5',
        url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
        caption: 'Keseruan anak-anak RT 09 dalam lomba ketangkasan',
        photographer: 'Panitia Lomba'
      }
    ],
    isKidFriendly: true
  },
  {
    id: 'evt-4',
    stepNumber: 4,
    title: 'Lomba Pukul Air',
    subtitle: 'Khusus Anak-anak - Sore Hari',
    date: 'Sabtu, 8 Agustus 2026',
    dateIso: '2026-08-08',
    time: '16.00 WIB',
    timeStart: '16:00',
    location: 'Area RT 09',
    category: 'Lomba',
    status: 'mendatang',
    emoji: '💧',
    bgColor: 'bg-cyan-100',
    accentColor: 'border-cyan-600',
    description: 'Lomba memukul balon air dengan mata tertutup. Pecahnya balon air jadi penanda kemenangan sekaligus momen basah-basahan yang menghibur!',
    highlights: ['Kategori usia 6 - 12 tahun', 'Mata ditutup kain saat memukul balon air', 'Dilarang membuka penutup mata sebelum aba-aba'],
    photos: [
      {
        id: 'p6',
        url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80',
        caption: 'Momen seru lomba pukul air anak-anak RT 09',
        photographer: 'Dokumentasi Panitia'
      }
    ],
    isKidFriendly: true
  },
  {
    id: 'evt-5',
    stepNumber: 5,
    title: 'Lomba Lari Kelereng',
    subtitle: 'Khusus Anak-anak - Malam Hari',
    date: 'Sabtu, 8 Agustus 2026',
    dateIso: '2026-08-08',
    time: '19.00 WIB',
    timeStart: '19:00',
    location: 'Area RT 09',
    category: 'Lomba',
    status: 'mendatang',
    emoji: '🏃',
    bgColor: 'bg-emerald-100',
    accentColor: 'border-emerald-600',
    description: 'Lomba lari membawa kelereng di atas sendok. Kelereng tak boleh jatuh, siapa paling cepat sampai garis finish jadi pemenang!',
    highlights: ['Kategori usia 6 - 12 tahun', 'Kelereng di atas sendok tanpa boleh jatuh', 'Tercepat sampai garis finish jadi pemenang'],
    photos: [
      {
        id: 'p7',
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
        caption: 'Sorak semangat menyaksikan lomba lari kelereng RT 09',
        photographer: 'Karang Taruna'
      }
    ],
    isKidFriendly: true
  },
  {
    id: 'evt-6',
    stepNumber: 6,
    title: 'Lomba Mewarnai & Menggambar',
    subtitle: 'Kategori TK s.d. 1 SMP',
    date: 'Minggu, 9 Agustus 2026',
    dateIso: '2026-08-09',
    time: '08.00 WIB',
    timeStart: '08:00',
    location: 'Area RT 09',
    category: 'Lomba',
    status: 'mendatang',
    emoji: '🎨',
    bgColor: 'bg-pink-100',
    accentColor: 'border-pink-600',
    description: 'Ajang kreativitas seni anak-anak! Lomba mewarnai untuk TK s.d. Kelas 3 SD dan lomba menggambar untuk Kelas 4 SD s.d. 1 SMP, dengan tema yang ditentukan panitia saat lomba.',
    highlights: ['Mewarnai: TK s.d. Kelas 3 SD', 'Menggambar: Kelas 4 SD s.d. 1 SMP', 'Peserta membawa peralatan sendiri'],
    photos: [
      {
        id: 'p8',
        url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
        caption: 'Anak-anak TK & SD asyik mewarnai di RT 09',
        photographer: 'Panitia Lomba'
      },
      {
        id: 'p11',
        url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
        caption: 'Persiapan anak-anak mengikuti lomba menggambar',
        photographer: 'Dokumentasi Panitia'
      }
    ],
    isKidFriendly: true
  },
  {
    id: 'evt-7',
    stepNumber: 7,
    title: 'Lomba Tiup Bola Pingpong',
    subtitle: 'Khusus Anak-anak - Sore Hari',
    date: 'Jumat, 14 Agustus 2026',
    dateIso: '2026-08-14',
    time: '16.00 WIB',
    timeStart: '16:00',
    location: 'Area RT 09',
    category: 'Lomba',
    status: 'mendatang',
    emoji: '🏓',
    bgColor: 'bg-amber-100',
    accentColor: 'border-amber-600',
    description: 'Lomba meniup bola pingpong melewati deretan gelas berisi air. Butuh nafas panjang dan strategi agar bola cepat berpindah ke gelas terakhir!',
    highlights: ['Kategori usia 6 - 12 tahun', 'Bola pingpong ditiup melewati gelas berisi air', 'Tangan tidak boleh menyentuh gelas'],
    photos: [
      {
        id: 'p12',
        url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
        caption: 'Ilustrasi suasana lomba tiup bola pingpong RT 09',
        photographer: 'Panitia 17-an'
      }
    ],
    isKidFriendly: true
  },
  {
    id: 'evt-8',
    stepNumber: 8,
    title: 'Lomba Domino',
    subtitle: 'Kategori Umum Warga - Malam Hari',
    date: 'Jumat, 14 Agustus 2026',
    dateIso: '2026-08-14',
    time: '19.00 WIB',
    timeStart: '19:00',
    location: 'Area RT 09',
    category: 'Lomba',
    status: 'mendatang',
    emoji: '🎲',
    bgColor: 'bg-stone-200',
    accentColor: 'border-stone-600',
    description: 'Lomba domino kategori umum warga RT 09 dengan sistem gugur berundian. Adrenalin dan strategi jadi kunci menuju puncak klasemen!',
    highlights: ['Kategori umum warga RT 09', 'Sistem gugur dengan undian', 'Keputusan juri panitia bersifat mutlak'],
    photos: [
      {
        id: 'p10',
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
        caption: 'Suasana seru lomba domino warga RT 09',
        photographer: 'Arsip RT 09'
      }
    ],
    isKidFriendly: false
  },
  {
    id: 'evt-9',
    stepNumber: 9,
    title: 'Lomba Estafet Air',
    subtitle: 'Kategori Umum - Kelompok Diacak Panitia',
    date: 'Sabtu, 15 Agustus 2026',
    dateIso: '2026-08-15',
    time: '16.00 WIB',
    timeStart: '16:00',
    location: 'Area RT 09',
    category: 'Lomba',
    status: 'mendatang',
    emoji: '💦',
    bgColor: 'bg-sky-100',
    accentColor: 'border-sky-600',
    description: 'Lomba estafet air untuk umum. Kelompok peserta diacak langsung oleh panitia di tempat untuk menambah keseruan! Tim paling cepat dan paling sedikit menumpahkan air jadi juara.',
    highlights: ['Kelompok diacak panitia di tempat', 'Memindahkan air tanpa tumpah di garis finish', 'Waktu tercepat menentukan pemenang'],
    photos: [
      {
        id: 'p13',
        url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
        caption: 'Keseruan lomba estafet air warga RT 09',
        photographer: 'Karang Taruna'
      }
    ],
    isKidFriendly: false
  },
  {
    id: 'evt-10',
    stepNumber: 10,
    title: 'Lomba Estafet Pakai Domino',
    subtitle: 'Kategori Umum Warga - Malam Hari',
    date: 'Sabtu, 15 Agustus 2026',
    dateIso: '2026-08-15',
    time: '19.00 WIB',
    timeStart: '19:00',
    location: 'Area RT 09',
    category: 'Lomba',
    status: 'mendatang',
    emoji: '🁣',
    bgColor: 'bg-emerald-100',
    accentColor: 'border-emerald-600',
    description: 'Lomba menyusun domino secara berjajar secara estafet untuk umum. Kompak dan cekatan tim jadi kunci agar susunan domino tidak roboh sebelum garis finish!',
    highlights: ['Kategori umum warga RT 09', 'Susun domino berjajar secara estafet', 'Jatuh sebelum garis finish dihitung ulang'],
    photos: [
      {
        id: 'p14',
        url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
        caption: 'Ilustrasi lomba estafet domino warga RT 09',
        photographer: 'Panitia 17-an'
      }
    ],
    isKidFriendly: false
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
    location: 'Pos Ronda / Area Fasilitas Umum RT 09',
    category: 'Puncak Acara',
    status: 'mendatang',
    emoji: '🍚✨',
    bgColor: 'bg-red-200',
    accentColor: 'border-red-700',
    description: 'Puncak acara penutup rangkaian kemeriahan kemerdekaan. Panitia mengundang seluruh warga Ngadisuryan RT 09 hadir pada malam tasyakuran HUT RI ke-81 dengan susunan acara yang khidmat dan meriah.',
    highlights: ['Pembukaan & Menyanyikan Lagu Indonesia Raya', 'Sambutan Ketua RT 09 & Ketua Panitia', 'Renungan Kemerdekaan & Doa Bersama', 'Pemotongan Tumpeng Simbolis Rasa Syukur', 'Pengumuman Pemenang & Pembagian Hadiah', 'Ramah Tamah & Hiburan'],
    photos: [
      {
        id: 'p9',
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        caption: 'Ilustrasi persiapan Tumpeng Merah Putih malam tasyakuran RT 09',
        photographer: 'Panitia Tasyakuran'
      },
      {
        id: 'p15',
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
        caption: 'Suasana kehangatan kumpul warga di malam tasyakuran',
        photographer: 'Arsip RT 09'
      }
    ],
    isKidFriendly: true
  }
];

export const INITIAL_LOMBA: LombaItem[] = [
  {
    id: 'l-1',
    title: 'Makan Kerupuk',
    category: 'Anak-Anak',
    emoji: '🥨',
    date: 'Jumat, 7 Agustus 2026',
    time: '16.00 WIB',
    location: 'Area RT 09',
    picName: 'Kak Rizky',
    picPhone: '0812-3456-7890',
    registeredCount: 14,
    maxParticipants: 20,
    prizes: ['Trofi Juara 1 + Set Alat Tulis', 'Trofi Juara 2 + Tas Sekolah', 'Trofi Juara 3 + Botol Minum'],
    rules: ['Kategori usia 4 - 10 tahun', 'Tangan wajib diikat ke belakang', 'Dilarang menyentuh tali kerupuk dengan sengaja'],
    bgColor: 'bg-amber-100',
    status: 'Pendaftaran Dibuka'
  },
  {
    id: 'l-2',
    title: 'Memasukkan Pensil ke Botol',
    category: 'Anak-Anak',
    emoji: '✏️',
    date: 'Jumat, 7 Agustus 2026',
    time: '19.00 WIB',
    location: 'Area RT 09',
    picName: 'Kak Rizky',
    picPhone: '0812-3456-7890',
    registeredCount: 12,
    maxParticipants: 20,
    prizes: ['Piala Juara 1 + Paket Alat Tulis', 'Piala Juara 2 + Buku Gambar', 'Piala Juara 3 + Set Mewarnai'],
    rules: ['Kategori usia 4 - 10 tahun', 'Pensil digantung tali di belakang', 'Tidak boleh menggunakan tangan untuk membantu'],
    bgColor: 'bg-sky-100',
    status: 'Pendaftaran Dibuka'
  },
  {
    id: 'l-3',
    title: 'Lomba Pukul Air',
    category: 'Anak-Anak',
    emoji: '💧',
    date: 'Sabtu, 8 Agustus 2026',
    time: '16.00 WIB',
    location: 'Area RT 09',
    picName: 'Mba Sinta',
    picPhone: '0813-9876-5432',
    registeredCount: 15,
    maxParticipants: 24,
    prizes: ['Trofi Juara 1 + Sepatu Roda', 'Trofi Juara 2 + Helm Lucu', 'Trofi Juara 3 + Botol Minum Tumbler'],
    rules: ['Kategori usia 6 - 12 tahun', 'Mata ditutup kain saat memukul balon air', 'Dilarang membuka penutup mata sebelum aba-aba'],
    bgColor: 'bg-cyan-100',
    status: 'Pendaftaran Dibuka'
  },
  {
    id: 'l-4',
    title: 'Lari Kelereng',
    category: 'Anak-Anak',
    emoji: '🏃',
    date: 'Sabtu, 8 Agustus 2026',
    time: '19.00 WIB',
    location: 'Area RT 09',
    picName: 'Mba Sinta',
    picPhone: '0813-9876-5432',
    registeredCount: 13,
    maxParticipants: 20,
    prizes: ['Piala Juara 1 + Sepeda Mini', 'Piala Juara 2 + Sepatu Olahraga', 'Piala Juara 3 + Set Alat Tulis'],
    rules: ['Kategori usia 6 - 12 tahun', 'Kelereng di atas sendok tanpa boleh jatuh', 'Tercepat sampai garis finish jadi pemenang'],
    bgColor: 'bg-emerald-100',
    status: 'Pendaftaran Dibuka'
  },
  {
    id: 'l-5',
    title: 'Mewarnai & Menggambar',
    category: 'Anak-Anak',
    emoji: '🎨',
    date: 'Minggu, 9 Agustus 2026',
    time: '08.00 WIB',
    location: 'Area RT 09',
    picName: 'Bu Sri',
    picPhone: '0811-2233-4455',
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
    status: 'Pendaftaran Dibuka'
  },
  {
    id: 'l-7',
    title: 'Tiup Bola Pingpong',
    category: 'Anak-Anak',
    emoji: '🏓',
    date: 'Jumat, 14 Agustus 2026',
    time: '16.00 WIB',
    location: 'Area RT 09',
    picName: 'Pak Yanto',
    picPhone: '0857-1122-3344',
    registeredCount: 11,
    maxParticipants: 20,
    prizes: ['Trofi Juara 1 + Raket Pingpong', 'Trofi Juara 2 + Sepatu Olahraga', 'Trofi Juara 3 + Botol Minum'],
    rules: ['Kategori usia 6 - 12 tahun', 'Bola pingpong ditiup melewati gelas berisi air', 'Tangan tidak boleh menyentuh gelas'],
    bgColor: 'bg-amber-100',
    status: 'Pendaftaran Dibuka'
  },
  {
    id: 'l-8',
    title: 'Lomba Domino',
    category: 'Umum',
    emoji: '🎲',
    date: 'Jumat, 14 Agustus 2026',
    time: '19.00 WIB',
    location: 'Area RT 09',
    picName: 'Pak Yanto',
    picPhone: '0857-1122-3344',
    registeredCount: 16,
    maxParticipants: 32,
    prizes: ['Hadiah Tunai Juara 1', 'Parcel Sembako Juara 2', 'Paket Snack Juara 3'],
    rules: ['Kategori umum warga RT 09', 'Sistem gugur dengan undian', 'Keputusan juri panitia bersifat mutlak'],
    bgColor: 'bg-stone-200',
    status: 'Pendaftaran Dibuka'
  },
  {
    id: 'l-9',
    title: 'Estafet Air',
    category: 'Umum',
    emoji: '💦',
    date: 'Sabtu, 15 Agustus 2026',
    time: '16.00 WIB',
    location: 'Area RT 09',
    picName: 'Mba Wulan',
    picPhone: '0818-5566-7788',
    registeredCount: 8,
    maxParticipants: 12,
    prizes: ['Hadiah Tunai + Parcel Raksasa Juara 1', 'Parcel Sembako Juara 2', 'Paket Snack Komplek Juara 3'],
    rules: ['Kategori umum - kelompok diacak panitia di tempat', 'Memindahkan air tanpa tumpah di garis finish', 'Waktu tercepat menentukan pemenang'],
    bgColor: 'bg-sky-100',
    status: 'Pendaftaran Dibuka'
  },
  {
    id: 'l-10',
    title: 'Estafet Pakai Domino',
    category: 'Umum',
    emoji: '🁣',
    date: 'Sabtu, 15 Agustus 2026',
    time: '19.00 WIB',
    location: 'Area RT 09',
    picName: 'Mba Wulan',
    picPhone: '0818-5566-7788',
    registeredCount: 8,
    maxParticipants: 12,
    prizes: ['Hadiah Tunai + Parcel Raksasa Juara 1', 'Parcel Sembako Juara 2', 'Paket Snack Komplek Juara 3'],
    rules: ['Kategori umum warga RT 09', 'Susun domino berjajar secara estafet', 'Jatuh sebelum garis finish dihitung ulang'],
    bgColor: 'bg-emerald-100',
    status: 'Pendaftaran Dibuka'
  }
];

export const INITIAL_WISHES: ResidentWish[] = [
  {
    id: 'w-1',
    name: 'Keluarga Pak Herman',
    houseNumber: 'Rumah No. 12',
    message: 'Dirgahayu Republik Indonesia ke-81! Bangga jadi warga RT 09 Ngadisuryan yang selalu kompak dan rukun. Merdeka!! 🇮🇩✨',
    sticker: '🇮🇩',
    timestamp: '2 jam yang lalu',
    likes: 12
  },
  {
    id: 'w-2',
    name: 'Kak Alya & Adik Dito',
    houseNumber: 'Rumah No. 04',
    message: 'Nggak sabar ikutan Lomba Pukul Air besok sore! Udah siap basah-basahan nih 🎈💦',
    sticker: '🎈',
    timestamp: '4 jam yang lalu',
    likes: 9
  },
  {
    id: 'w-3',
    name: 'Bu Hajah Nunung',
    houseNumber: 'Rumah No. 25',
    message: 'Semoga acara HUT RI ke-81 RT 09 lancar, berkah, dan makin mempererat tali silaturahmi antar tetangga. Bravo Panitia!',
    sticker: '👏',
    timestamp: 'Kemarin',
    likes: 18
  },
  {
    id: 'w-4',
    name: 'Mas Farhan (Karang Taruna)',
    houseNumber: 'Rumah No. 18',
    message: 'Jangan lupa hadir ya bapak ibu dan adik-adik di Malam Tasyakuran Potong Tumpeng tanggal 16 Agustus! Ada pembagian hadiah untuk semua juara lomba!',
    sticker: '🍚',
    timestamp: '2 hari lalu',
    likes: 15
  }
];
