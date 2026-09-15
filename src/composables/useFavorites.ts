import { ref } from "vue";

const FAVORITES_KEY = "favorite_product_ids";

const favoriteIds = ref<number[]>([]);

export function useFavorites() {
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

  return {
    favoriteIds,
    loadFavorites,
    isFavorite,
    toggleFavorite,
  };
}
