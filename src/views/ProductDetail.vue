<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductDetail } from "../composables/useProductDetail";
import { useFavorites } from "../composables/useFavorites";
import ErrorMessage from "../components/ErrorMessage.vue";

const route = useRoute();
const router = useRouter();
const { product, loading, error, fetchProduct } = useProductDetail();
const { isFavorite: checkIsFavorite, toggleFavorite: toggleFav } =
  useFavorites();

const selectedImageIndex = ref<number>(0);
const isFavorite = computed(() =>
  product.value ? checkIsFavorite(product.value.id) : false,
);

const currentImage = computed(() => {
  if (!product.value) return "";
  if (product.value.images && product.value.images.length > 0) {
    return (
      product.value.images[selectedImageIndex.value] || product.value.thumbnail
    );
  }
  return product.value.thumbnail;
});

const formattedPrice = computed(() => {
  if (!product.value) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.value.price);
});

const discountedPrice = computed(() => {
  if (!product.value || !product.value.discountPercentage) return null;
  const discounted =
    product.value.price * (1 - product.value.discountPercentage / 100);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(discounted);
});

function toggleFavorite() {
  if (!product.value) return;
  toggleFav(product.value.id);
}

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src =
    "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80";
}

function loadData() {
  const id = route.params.id as string;
  if (id) {
    fetchProduct(id).then(() => {
      selectedImageIndex.value = 0;
    });
  }
}

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadData();
    }
  },
);

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="w-full">
    <!-- Back Button -->
    <div class="mb-6">
      <button
        @click="router.back()"
        class="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 mr-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back
      </button>
    </div>

    <!-- Error State -->
    <ErrorMessage v-if="error" :message="error" @retry="loadData" />

    <!-- Loading State -->
    <div
      v-else-if="loading && !product"
      class="bg-white rounded-xl border border-gray-300 p-6 md:p-8"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="w-full h-96 bg-gray-100 animate-pulse rounded-lg"></div>
        <div class="space-y-4">
          <div class="h-6 bg-gray-100 animate-pulse rounded w-1/4"></div>
          <div class="h-10 bg-gray-100 animate-pulse rounded w-3/4"></div>
          <div class="h-6 bg-gray-100 animate-pulse rounded w-1/3"></div>
          <div class="h-24 bg-gray-100 animate-pulse rounded w-full"></div>
        </div>
      </div>
    </div>

    <!-- Not Found State -->
    <div
      v-else-if="!loading && !product"
      class="text-center py-16 bg-white rounded-xl border border-gray-200"
    >
      <h3 class="text-lg font-medium text-gray-900 mb-1">Product Not Found</h3>
      <p class="text-sm text-gray-500 mb-4">
        Product you are looking for is not available or has been deleted.
      </p>
      <router-link
        to="/"
        class="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition text-sm inline-block"
      >
        Back to Home
      </router-link>
    </div>

    <!-- Success Detail Card -->
    <div
      v-else-if="product"
      class="bg-white rounded-xl border border-gray-300 p-6 md:p-8"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div class="space-y-4">
          <div
            class="w-full h-96 bg-gray-50 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center"
          >
            <img
              :src="currentImage"
              :alt="product.title"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
          </div>
          <div
            v-if="product.images && product.images.length > 1"
            class="flex gap-3 overflow-x-auto pb-2"
          >
            <button
              v-for="(img, idx) in product.images"
              :key="idx"
              @click="selectedImageIndex = idx"
              class="w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 bg-gray-50 transition cursor-pointer"
              :class="
                selectedImageIndex === idx
                  ? 'border-emerald-600'
                  : 'border-gray-200 hover:border-gray-300'
              "
            >
              <img
                :src="img"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </button>
          </div>
        </div>

        <div class="flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span
                class="px-3 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full capitalize"
              >
                {{ product.category }}
              </span>
              <button
                @click="toggleFavorite"
                class="p-2.5 rounded-full border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition cursor-pointer"
                :class="{
                  'text-red-500! border-red-200 bg-red-50': isFavorite,
                }"
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
            </div>

            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {{ product.title }}
            </h1>

            <div class="flex items-center gap-4 mb-4 text-sm">
              <div class="flex items-center text-amber-500 font-medium">
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
              <span class="text-gray-300">|</span>
              <span
                class="font-medium"
                :class="product.stock > 0 ? 'text-emerald-600' : 'text-red-600'"
              >
                {{
                  product.stock > 0
                    ? `In Stock (${product.stock})`
                    : "Out of Stock"
                }}
              </span>
            </div>

            <div class="flex items-baseline gap-3 mb-6">
              <span class="text-3xl font-bold text-gray-900">
                {{ discountedPrice || formattedPrice }}
              </span>
              <span
                v-if="discountedPrice"
                class="text-lg text-gray-400 line-through font-medium"
              >
                {{ formattedPrice }}
              </span>
              <span
                v-if="product.discountPercentage"
                class="px-2 py-0.5 text-xs font-bold text-red-600 bg-red-50 rounded-md"
              >
                -{{ product.discountPercentage }}%
              </span>
            </div>

            <p class="text-gray-600 leading-relaxed mb-6">
              {{ product.description }}
            </p>
          </div>

          <div class="pt-6 space-y-3 text-sm text-gray-500">
            <div v-if="product.brand" class="flex justify-between">
              <span class="font-medium text-gray-700">Brand</span>
              <span>{{ product.brand }}</span>
            </div>
            <div
              v-if="product.warrantyInformation"
              class="flex justify-between"
            >
              <span class="font-medium text-gray-700">Warranty</span>
              <span>{{ product.warrantyInformation }}</span>
            </div>
            <div
              v-if="product.shippingInformation"
              class="flex justify-between"
            >
              <span class="font-medium text-gray-700">Shipping</span>
              <span>{{ product.shippingInformation }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
