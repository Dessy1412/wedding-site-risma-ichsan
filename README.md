# Undangan Risma & Ikhsan

Website undangan pernikahan digital yang dibangun menggunakan React, Vite, Tailwind CSS v4, dan Motion for React. Proyek ini dirancang dengan tampilan elegan, responsif, animasi yang halus, dan performa yang optimal untuk perangkat mobile.

## Tech Stack

- **React** — membangun antarmuka berbasis komponen.
- **Vite** — development server dan build tool.
- **JavaScript** — bahasa pemrograman utama.
- **Tailwind CSS v4** — styling dan responsive design.
- **Motion for React** — animasi dan transisi.
- **pnpm** — package manager.
- **ESLint** — pemeriksaan kualitas kode.

## Prerequisites

Pastikan perangkat sudah memiliki:

- Node.js versi yang kompatibel dengan Vite.
- pnpm.
- Visual Studio Code (disarankan).

Periksa instalasi melalui terminal:

```bash
node -v
pnpm -v
```

Jika pnpm belum tersedia, aktifkan melalui Corepack jika didukung oleh instalasi Node.js kamu:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

## 1. Membuat Proyek

Buat proyek React menggunakan Vite:

```bash
pnpm create vite undangan-rismaikhsan --template react
```

Masuk ke folder proyek:

```bash
cd undangan-rismaikhsan
```

Instal semua dependency:

```bash
pnpm install
```

Buka proyek di Visual Studio Code:

```bash
code .
```

## 2. Instalasi Tailwind CSS v4

Instal Tailwind CSS dan plugin Vite:

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

### Konfigurasi Vite

Buka file `vite.config.js` di folder utama proyek.

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### Konfigurasi CSS

Buka file `src/index.css`. Hapus CSS bawaan yang tidak diperlukan, lalu tambahkan:

```css
@import "tailwindcss";

:root {
  font-family: Georgia, serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}
```

Tailwind CSS v4 menggunakan `@import "tailwindcss";` untuk memuat framework. Konfigurasi dasar ini tidak memerlukan `tailwind.config.js`.

### Pastikan CSS diimpor

Periksa file `src/main.jsx`:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

## 3. Instalasi Motion

Instal library animasi:

```bash
pnpm add motion
```

Contoh penggunaan di React:

```jsx
import { motion } from "motion/react";

export default function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f1ed]">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl text-[#76564e]"
      >
        Risma & Ikhsan
      </motion.h1>
    </main>
  );
}
```

Animasi tersebut membuat teks muncul perlahan sambil bergerak dari bawah.

## 4. Menjalankan Proyek

Jalankan development server:

```bash
pnpm dev
```

Buka URL yang ditampilkan di terminal, biasanya:

```text
http://localhost:5173/
```

Vite akan memperbarui tampilan secara otomatis saat file disimpan.

## 5. Perintah Penting

| Perintah                | Fungsi                          |
| ----------------------- | ------------------------------- |
| `pnpm install`          | Instal dependency proyek        |
| `pnpm dev`              | Jalankan development server     |
| `pnpm build`            | Build untuk produksi            |
| `pnpm preview`          | Pratinjau hasil build           |
| `pnpm lint`             | Periksa kode menggunakan ESLint |
| `pnpm list tailwindcss` | Periksa instalasi Tailwind CSS  |
| `pnpm list motion`      | Periksa instalasi Motion        |

Perintah `pnpm lint` tersedia jika script `lint` sudah terdaftar di `package.json`.

## 6. Struktur Folder

Struktur awal proyek:

```text
undangan-rismaikhsan/
├── public/
│   └── images/
├── src/
│   ├── assets/
│   ├── components/
│   ├── sections/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── pnpm-lock.yaml
├── vite.config.js
└── README.md
```

Folder `components/` dapat digunakan untuk komponen yang dipakai berulang, sedangkan `sections/` dapat digunakan untuk bagian undangan seperti opening, profil pengantin, acara, galeri, dan RSVP.

Folder `public/images/` cocok untuk aset gambar yang ingin diakses melalui URL statis. Untuk foto prewedding, gunakan format WebP atau AVIF jika sesuai.

## 7. Optimasi Performa

Untuk menjaga undangan tetap ringan di perangkat mobile:

- Kompres gambar sebelum digunakan.
- Gunakan lazy loading untuk gambar yang berada di bawah halaman.
- Utamakan animasi CSS dengan `transform` dan `opacity`.
- Batasi jumlah elemen dekoratif yang terus bergerak.
- Hindari menjalankan animasi berat pada seluruh halaman secara bersamaan.
- Periksa ukuran bundle hasil build.
- Uji website pada perangkat mobile, bukan hanya desktop.

## 8. Build dan Deployment

Buat build produksi:

```bash
pnpm build
```

Hasil build akan disimpan di folder `dist/`.

Untuk memeriksa hasil build secara lokal:

```bash
pnpm preview
```

Folder `dist/` dapat digunakan sebagai direktori publikasi ketika melakukan deployment ke Netlify.

## Catatan

- Gunakan versi dependency yang tercatat di `package.json` dan `pnpm-lock.yaml`.
- Jalankan `pnpm install` setelah mengambil proyek dari repository.
- Jangan mengunggah file rahasia atau kredensial Firebase ke repository publik.
- Instalasi dependency tidak otomatis menjamin website ringan; optimasi aset dan rendering tetap diperlukan.

---

**Undangan Risma & Ikhsan**

_An elegant digital wedding invitation, crafted with love._
