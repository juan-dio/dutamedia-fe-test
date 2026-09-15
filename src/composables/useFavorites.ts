import { ref, watch } from "vue";
import type { Product } from "../types/product";
import { getProductById } from "../services/productService";

const FAVORITES_KEY = "favorite_product_ids";

const favoriteIds = ref<number[]>([]);

export function useFavorites() {
  const products = ref<Product[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  function loadFavorites() {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      try {
        favoriteIds.value = JSON.parse(saved);
      } catch {
        favoriteIds.value = [];
      }
    } else {
      favoriteIds.value = [];
    }
  }

  // Initial load when module is evaluated
  loadFavorites();

  function saveFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds.value));
  }

  function isFavorite(id: number): boolean {
    return favoriteIds.value.includes(id);
  }

  function toggleFavorite(id: number) {
    loadFavorites();
    if (isFavorite(id)) {
      favoriteIds.value = favoriteIds.value.filter((favId) => favId !== id);
    } else {
      favoriteIds.value.push(id);
    }
    saveFavorites();
  }

  async function fetchFavoriteProducts() {
    loadFavorites();
    if (favoriteIds.value.length === 0) {
      products.value = [];
      return;
    }

    loading.value = true;
    error.value = null;

    const fetched: Product[] = [];
    try {
      for (const id of favoriteIds.value) {
        const product = await getProductById(id);
        if (product) {
          fetched.push(product);
        }
      }
      products.value = fetched;
    } catch (err: any) {
      error.value = err.message || "Failed to load favorite products.";
      products.value = [];
    } finally {
      loading.value = false;
    }
  }

  // Watch for changes in favoriteIds and update products accordingly
  watch(favoriteIds, (newIds) => {
    products.value = products.value.filter((p) => newIds.includes(p.id));
  });

  return {
    favoriteIds,
    products,
    loading,
    error,
    loadFavorites,
    isFavorite,
    toggleFavorite,
    fetchFavoriteProducts,
  };
}
