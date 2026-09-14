# Design Spec: Issue 1 - Project Initialization, Vite + Vue 3 Setup, Styling, & Vue Router

## Overview
This spec covers Issue 1: setting up the Vue 3 + Vite + TypeScript foundation with Tailwind CSS v4 and Vue Router for the Mini E-Commerce Product Browser application.

## Stack & Core Dependencies
- **Framework**: Vue 3 (Composition API, `<script setup lang="ts">`)
- **Build Tool**: Vite with `@vitejs/plugin-vue`
- **Language**: TypeScript (`vue-ts`)
- **Routing**: `vue-router` v4
- **Styling**: Tailwind CSS v4 using `@tailwindcss/vite`

## Directory Structure
```text
src/
├── assets/
│   └── main.css         # Tailwind v4 import (@import "tailwindcss";)
├── components/
│   ├── common/          # Reusable UI components (Button, Loading, Modal, etc.)
│   └── product/         # Product domain components
├── composables/         # Reusable composables (state & business logic)
├── router/
│   └── index.ts         # Vue Router setup with route definitions
├── services/            # API abstraction and network requests
├── types/               # TypeScript interfaces & types
├── views/
│   ├── ProductList.vue  # Route: /
│   ├── ProductDetail.vue # Route: /products/:id
│   └── Favorites.vue    # Route: /favorites
├── App.vue              # Main app container with Navbar, RouterView, Footer
└── main.ts              # Entry point mounting app & router
```

## Route Definitions
1. `/` -> `ProductList.vue`
2. `/products/:id` -> `ProductDetail.vue`
3. `/favorites` -> `Favorites.vue`

## Base Layout (`App.vue`)
- Header / Navigation bar containing:
  - Brand / App Logo link to `/`
  - Link to `/` (Products)
  - Link to `/favorites` (Favorites)
- `<main>` container rendering `<RouterView />`
- Footer component / section

## Testing & Verification Strategy
- `npm run dev` starts dev server without errors.
- Navigating between `/`, `/products/1`, and `/favorites` works smoothly via router links.
