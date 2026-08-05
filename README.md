# Pesta Merdeka RT 09 - HUT RI ke-81

Website interaktif perayaan HUT RI ke-81 warga Ngadisuryan RT 09. Dibangun dengan React 19, Vite, dan Tailwind CSS 4 bergaya neubrutalism.

## Fitur

- **Peta Acara** - timeline bergaya peta harta karun dengan marker posisi "kita di sini" yang diperbarui otomatis, filter status, dan kartu detail per acara
- **Jadwal Lomba** - papan pengumuman lomba anak & umum dengan detail, aturan, hadiah, dan kontak PIC
- **Papan Ucapan** - warga mengirim ucapan & doa kemerdekaan
- **Galeri Dokumentasi** - lightbox foto seluruh kegiatan
- **Kontak Panitia** - kartu pengurus, info sekretariat, dan FAQ
- **Deploy otomatis** ke GitHub Pages via GitHub Actions

## Menjalankan Lokal

1. Install dependensi:
   `npm install`
2. Jalankan dev server:
   `npm run dev`
   Buka `http://localhost:3000`.

## Perintah Lainnya

- `npm run build` - build produksi ke `dist/`
- `npm run preview` - preview hasil build
- `npm run lint` - type-check TypeScript (`tsc --noEmit`)
- `npm run test` - jalankan tes (Vitest)
- `npm run clean` - hapus folder `dist/`

## Struktur

```
src/
  components/   - komponen UI (Navbar, Hero, TimelineMap, dll)
  data/         - data acara, lomba, dan ucapan (mock)
  types.ts      - tipe TypeScript
  utils/        - helper (confetti, status acara, modal a11y)
public/         - favicon
```

Catatan: situs ini statis. Data ucapan & pendaftaran tersimpan di state aplikasi dan akan hilang saat halaman dimuat ulang.
