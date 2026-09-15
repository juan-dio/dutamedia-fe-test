# DutaMedia Frontend Test - E-Commerce Product Catalog

Aplikasi web e-commerce modern berbasis Vue 3 untuk menampilkan katalog produk, pencarian dengan debounce, filter kategori, detail produk, dan manajemen favorit.

## Teknologi yang Digunakan

- **Framework:** Vue 3 (Composition API, `<script setup lang="ts">`)
- **Build Tool:** Vite (`@vitejs/plugin-vue`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing:** Vue Router 4
- **Language:** TypeScript

## Instruksi Penggunaan

1. **Instalasi Dependencies:**

   ```bash
   npm install
   ```

2. **Menjalankan Server Development:**

   ```bash
   npm run dev
   ```

3. **Build Produksi:**

   ```bash
   npm run build
   ```

4. **Preview Build Lokal:**
   ```bash
   npm run preview
   ```

## Struktur / Arsitektur Project

- `src/views/`: Main page views (`ProductList.vue`, `ProductDetail.vue`, `Favorites.vue`)
- `src/router/`: Vue Router configuration (`index.ts`)
- `src/components/`: Reusable components (`ProductCard.vue`, `SearchInput.vue`, `CategoryFilter.vue`, `ProductSkeleton.vue`, `ErrorMessage.vue`)
- `src/composables/`: Reusable reactive state logic (`useProducts.ts`, `useProductDetail.ts`, `useFavorites.ts`)
- `src/services/`: API integration and services (`productService.ts`, `apiClient.ts`)
- `src/types/`: TypeScript definitions (`product.ts`)

## Daftar Fitur yang Selesai

- Product List dengan Pagination
- Search dengan Debounce
- Filter Kategori Produk
- Product Detail View
- Favorites Management dengan LocalStorage
- Loading Skeletons & Error Handling
- Responsive Design

## Daftar Fitur yang Belum Selesai

- WebRTC P2P Chat

## Known Issues / Limitations

- Fetch produk di halaman Favorites lambat karena di-fetch satu per satu berdasarkan ID product.

## Dokumentasi Penggunaan AI Assistant

- **AI Tool:** OpenCode (menggunakan model Gemini)
- **Bagian yang Dibantu:** Penyiapan struktur awal project, implementasi composables & utility, serta penyusunan dokumentasi dan verifikasi build.
