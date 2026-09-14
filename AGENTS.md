# AGENTS.md

## Commands
- **Dev Server**: `npm run dev`
- **Build & Typecheck**: `npm run build` (runs `vue-tsc -b && vite build`)

## Tech Stack
- **Framework**: Vue 3 (Composition API, `<script setup lang="ts">`)
- **Build Tool**: Vite with `@vitejs/plugin-vue`
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing**: Vue Router 4

## Architecture
- `src/views/`: Main page views (`ProductList.vue`, `ProductDetail.vue`, `Favorites.vue`)
- `src/router/`: Vue Router configuration (`index.ts`)
- `src/components/`: Reusable common and domain components
- `src/composables/`: Reusable reactive state logic
- `src/services/`: API integration and services
