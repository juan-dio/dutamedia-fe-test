# Issue 1: Project Setup & Base Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize Vue 3 + Vite + TypeScript project, set up Tailwind CSS v4 and Vue Router 4, define directory structure, and implement base layout.

**Architecture:** Modern Vue 3 SPA using TypeScript, Tailwind v4 Vite plugin, modular directory layout (`components/`, `views/`, `router/`, `services/`, `types/`, `composables/`), with top navbar navigation and placeholder view pages.

**Tech Stack:** Vue 3, Vite, TypeScript, Vue Router 4, `@tailwindcss/vite` (Tailwind CSS v4).

## Global Constraints
- Node.js environment on Windows.
- Standard Vue 3 Composition API with `<script setup lang="ts">`.
- Strict separation of concerns.

---

### Task 1: Initialize Vite Vue 3 TypeScript project and install dependencies

**Files:**
- Create/Modify: `package.json`, `vite.config.ts`, `tsconfig.json`, `src/main.ts`, `src/assets/main.css`

**Interfaces:**
- Consumes: None
- Produces: Installed dependencies (`vue`, `vue-router`, `tailwindcss`, `@tailwindcss/vite`) and Vite build config.

- [ ] **Step 1: Scaffolding files in workspace root**

Run:
```powershell
npm create vite@latest . -- --template vue-ts --force
```

- [ ] **Step 2: Install dependencies**

Run:
```powershell
npm install
npm install vue-router@4
npm install -D @tailwindcss/vite tailwindcss
```

- [ ] **Step 3: Configure Vite for Tailwind CSS v4**

Modify `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
})
```

- [ ] **Step 4: Set up CSS entry point**

Modify `src/assets/main.css`:
```css
@import "tailwindcss";
```

- [ ] **Step 5: Verify build script**

Run: `npm run build`
Expected: Build succeeds without errors.

- [ ] **Step 6: Commit**

```powershell
git add package.json package-lock.json vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json src/assets/main.css src/main.ts src/App.vue index.html
git commit -m "feat: initialize Vite Vue 3 TypeScript project with Tailwind CSS v4"
```

---

### Task 2: Create directory structure, placeholder views, and Vue Router configuration

**Files:**
- Create:
  - `src/views/ProductList.vue`
  - `src/views/ProductDetail.vue`
  - `src/views/Favorites.vue`
  - `src/router/index.ts`
  - `src/components/common/.gitkeep`
  - `src/components/product/.gitkeep`
  - `src/composables/.gitkeep`
  - `src/services/.gitkeep`
  - `src/types/.gitkeep`
- Modify: `src/main.ts`

**Interfaces:**
- Consumes: `vue-router`
- Produces: Router instance with routes (`/`, `/products/:id`, `/favorites`) mounted in `main.ts`.

- [ ] **Step 1: Create placeholder views**

Create `src/views/ProductList.vue`:
```vue
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Product List</h1>
    <p class="text-gray-600">Product list content will be loaded here.</p>
  </div>
</template>

<script setup lang="ts">
</script>
```

Create `src/views/ProductDetail.vue`:
```vue
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Product Detail</h1>
    <p class="text-gray-600">Product detail view for ID: {{ $route.params.id }}</p>
  </div>
</template>

<script setup lang="ts">
</script>
```

Create `src/views/Favorites.vue`:
```vue
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Favorites</h1>
    <p class="text-gray-600">Favorite products will be listed here.</p>
  </div>
</template>

<script setup lang="ts">
</script>
```

- [ ] **Step 2: Create Vue Router configuration**

Create `src/router/index.ts`:
```typescript
import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Favorites from '../views/Favorites.vue'

const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

- [ ] **Step 3: Update `src/main.ts` to register router and import CSS**

Modify `src/main.ts`:
```typescript
import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

- [ ] **Step 4: Verify router build**

Run: `npm run build`
Expected: Build succeeds without TypeScript or bundling errors.

- [ ] **Step 5: Commit**

```powershell
git add src/views/ src/router/ src/main.ts
git commit -m "feat: setup Vue Router and placeholder views"
```

---

### Task 3: Build base application layout in `App.vue`

**Files:**
- Modify: `src/App.vue`

**Interfaces:**
- Consumes: `RouterLink`, `RouterView` from `vue-router`
- Produces: Complete base layout (Navbar, Main container, Footer).

- [ ] **Step 1: Update `src/App.vue`**

Modify `src/App.vue`:
```vue
<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900">
    <!-- Header / Navbar -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <RouterLink to="/" class="text-xl font-bold text-blue-600 hover:text-blue-700">
          ProductStore
        </RouterLink>

        <nav class="flex items-center space-x-6">
          <RouterLink
            to="/"
            class="text-sm font-medium hover:text-blue-600 transition-colors"
            active-class="text-blue-600 font-semibold"
          >
            Products
          </RouterLink>
          <RouterLink
            to="/favorites"
            class="text-sm font-medium hover:text-blue-600 transition-colors flex items-center space-x-1"
            active-class="text-blue-600 font-semibold"
          >
            <span>Favorites</span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 py-6">
      <div class="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
        &copy; 2026 E-Commerce Product Browser. Built with Vue 3 & Vite.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>
```

- [ ] **Step 2: Test production build**

Run: `npm run build`
Expected: Build succeeds without errors.

- [ ] **Step 3: Commit**

```powershell
git add src/App.vue
git commit -m "feat: implement base layout in App.vue"
```
