<script setup lang="ts">
import { onMounted } from "vue";
import { useFavorites } from "../composables/useFavorites";
import ProductCard from "../components/ProductCard.vue";
import ProductSkeleton from "../components/ProductSkeleton.vue";
import ErrorMessage from "../components/ErrorMessage.vue";

const { favoriteIds, products, loading, error, fetchFavoriteProducts } =
  useFavorites();

onMounted(() => {
  fetchFavoriteProducts();
});
</script>

<template>
  <div class="w-full">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Favorites</h1>
    </div>

    <!-- Error State -->
    <ErrorMessage
      v-if="error"
      :message="error"
      @retry="fetchFavoriteProducts"
    />

    <!-- Loading State -->
    <div
      v-if="loading && products.length === 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <ProductSkeleton v-for="n in 4" :key="n" />
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!loading && favoriteIds.length === 0"
      class="text-center py-16 bg-white rounded-xl border border-gray-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mx-auto h-12 w-12 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-1">
        No favorite products
      </h3>
      <p class="text-sm text-gray-500 mb-4">
        Add products to favorites from the products list.
      </p>
      <router-link
        to="/"
        class="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition text-sm inline-block"
      >
        Explore Products
      </router-link>
    </div>

    <!-- Success Grid -->
    <div v-else>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>
