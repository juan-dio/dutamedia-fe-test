import { ref } from "vue";
import type { Product } from "../types/product";
import { getProductById } from "../services/productService";

export function useProductDetail() {
  const product = ref<Product | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  async function fetchProduct(id: number | string) {
    loading.value = true;
    error.value = null;
    try {
      product.value = await getProductById(id);
    } catch (err: any) {
      error.value = err.message || "Failed to load product details.";
      product.value = null;
    } finally {
      loading.value = false;
    }
  }

  return {
    product,
    loading,
    error,
    fetchProduct,
  };
}
