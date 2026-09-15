<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useProducts } from "../composables/useProducts";
import ProductCard from "../components/ProductCard.vue";
import SearchInput from "../components/SearchInput.vue";
import CategoryFilter from "../components/CategoryFilter.vue";
import ProductSkeleton from "../components/ProductSkeleton.vue";
import ErrorMessage from "../components/ErrorMessage.vue";

const {
  products,
  categories,
  loading,
  error,
  currentPage,
  totalPages,
  searchQuery,
  selectedCategory,
  fetchProducts,
  fetchCategories,
  setSearch,
  setCategory,
  changePage,
} = useProducts();

const displayedPages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  const pages: (number | string)[] = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (current > 3) {
      pages.push("...");
    }
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (current < total - 2) {
      pages.push("...");
    }
    pages.push(total);
  }
  return pages;
});

function resetFilters() {
  setSearch("");
  setCategory("");
}

onMounted(async () => {
  await fetchCategories();
  await fetchProducts();
});
</script>

<template>
  <div class="w-full">
    <!-- Header Title -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Products</h1>
    </div>

    <!-- Filter & Search Bar -->
    <div class="flex flex-col md:flex-row gap-4 mb-8 items-center">
      <div class="w-full md:w-96">
        <SearchInput
          :model-value="searchQuery"
          @update:model-value="setSearch"
        />
      </div>
      <div class="w-full md:w-auto">
        <CategoryFilter
          :model-value="selectedCategory"
          :categories="categories"
          :disabled="loading"
          @update:model-value="setCategory"
        />
      </div>
    </div>

    <!-- Error State -->
    <ErrorMessage v-if="error" :message="error" @retry="fetchProducts" />

    <!-- Loading State -->
    <div
      v-if="loading && products.length === 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <ProductSkeleton v-for="n in 8" :key="n" />
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!loading && products.length === 0"
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
      <h3 class="text-lg font-medium text-gray-900 mb-1">No products found</h3>
      <p class="text-sm text-gray-500 mb-4">
        Try changing your search keyword or filter category.
      </p>
      <button
        @click="resetFilters"
        class="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition text-sm"
      >
        Reset Filters
      </button>
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

      <!-- Pagination Controls -->
      <div
        v-if="totalPages > 1"
        class="mt-12 flex items-center justify-between pt-6"
      >
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1 || loading"
          class="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition"
        >
          <span class="inline">&larr;</span>
          <span class="hidden sm:inline">Previous</span>
        </button>

        <div class="flex items-center gap-1 sm:gap-2">
          <template v-for="(page, index) in displayedPages" :key="index">
            <span
              v-if="page === '...'"
              class="px-2 sm:px-3 py-1 text-gray-500 text-sm select-none"
            >
              ...
            </span>
            <button
              v-else
              @click="changePage(Number(page))"
              :disabled="loading"
              class="px-2.5 sm:px-3.5 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer"
              :class="
                currentPage === page
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              "
            >
              {{ page }}
            </button>
          </template>
        </div>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages || loading"
          class="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition"
        >
          <span class="hidden sm:inline">Next</span>
          <span class="inline">&rarr;</span>
        </button>
      </div>
    </div>
  </div>
</template>
