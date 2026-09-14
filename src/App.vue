<script setup lang="ts"></script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900">
    <!-- Header / Navbar -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        <RouterLink
          to="/"
          class="text-xl font-bold text-emerald-600 hover:text-emerald-700"
        >
          ProductStore
        </RouterLink>

        <nav class="flex items-center space-x-6">
          <RouterLink
            to="/"
            class="text-sm font-medium hover:text-emerald-600 transition-colors"
            active-class="text-emerald-600 font-semibold"
          >
            Products
          </RouterLink>
          <RouterLink
            to="/favorites"
            class="text-sm font-medium hover:text-emerald-600 transition-colors flex items-center space-x-1"
            active-class="text-emerald-600 font-semibold"
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
