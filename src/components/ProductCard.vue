<script setup lang="ts">
import { computed } from "vue";
import type { Product } from "../types/product";
import { useFavorites } from "../composables/useFavorites";

const props = defineProps<{
  product: Product;
}>();

const { isFavorite: checkIsFavorite, toggleFavorite: toggleFav } = useFavorites();
const isFavorite = computed(() => checkIsFavorite(props.product.id));

function toggleFavorite() {
  toggleFav(props.product.id);
}

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src = "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80";
}
</script>

<template>
  <div
    class="bg-white rounded-xl border border-gray-300 overflow-hidden flex flex-col relative"
  >
    <button
      @click="toggleFavorite"
      class="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition z-10 cursor-pointer"
      :class="{ 'text-red-500!': isFavorite }"
      aria-label="Toggle favorite"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :fill="isFavorite ? 'currentColor' : 'none'"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>

    <div
      class="w-full h-48 bg-gray-50 flex items-center justify-center overflow-hidden"
    >
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-full w-full object-cover"
        @error="handleImageError"
      />
    </div>

    <div class="p-4 flex-1 flex flex-col justify-between">
      <div>
        <span
          class="inline-block px-2.5 py-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full capitalize mb-2"
        >
          {{ product.category }}
        </span>
        <h3
          class="font-semibold text-gray-900 text-lg line-clamp-1 mb-1"
          :title="product.title"
        >
          {{ product.title }}
        </h3>
        <p class="text-sm text-gray-500 line-clamp-2 mb-3">
          {{ product.description }}
        </p>
      </div>

      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-xl font-bold text-gray-900"
            >${{ product.price.toFixed(2) }}</span
          >
          <div class="flex items-center text-amber-500 text-sm font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-4 h-4 mr-1"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clip-rule="evenodd"
              />
            </svg>
            {{ product.rating }}
          </div>
        </div>

        <router-link
          :to="`/products/${product.id}`"
          class="block w-full text-center py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition"
        >
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>
