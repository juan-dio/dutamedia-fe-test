import { ref, computed } from "vue";
import type { Product, CategoryItem } from "../types/product";
import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
} from "../services/productService";

export function useProducts() {
  const products = ref<Product[]>([]);
  const categories = ref<(CategoryItem | string)[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const limit = ref<number>(12);
  const searchQuery = ref<string>("");
  const selectedCategory = ref<string>("");

  const totalPages = computed(() => Math.ceil(total.value / limit.value) || 1);

  async function fetchCategories() {
    try {
      categories.value = await getCategories();
    } catch (err: any) {
      console.error("Failed to load categories:", err);
    }
  }

  async function fetchProducts() {
    loading.value = true;
    error.value = null;

    try {
      const skip = (currentPage.value - 1) * limit.value;
      let response;

      if (searchQuery.value.trim()) {
        response = await searchProducts(searchQuery.value.trim(), {
          limit: limit.value,
          skip,
        });
      } else if (selectedCategory.value) {
        response = await getProductsByCategory(selectedCategory.value, {
          limit: limit.value,
          skip,
        });
      } else {
        response = await getProducts({
          limit: limit.value,
          skip,
        });
      }

      products.value = response.products;
      total.value = response.total;
    } catch (err: any) {
      error.value = err.message || "Failed to load products.";
      products.value = [];
      total.value = 0;
    } finally {
      loading.value = false;
    }
  }

  function setSearch(query: string) {
    searchQuery.value = query;
    if (query) {
      selectedCategory.value = "";
    }
    currentPage.value = 1;
    fetchProducts();
  }

  function setCategory(category: string) {
    selectedCategory.value = category;
    if (category) {
      searchQuery.value = "";
    }
    currentPage.value = 1;
    fetchProducts();
  }

  function changePage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      fetchProducts();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return {
    products,
    categories,
    loading,
    error,
    total,
    currentPage,
    limit,
    totalPages,
    searchQuery,
    selectedCategory,
    fetchProducts,
    fetchCategories,
    setSearch,
    setCategory,
    changePage,
  };
}
