import type {
  Product,
  ProductsResponse,
  CategoryItem,
  GetProductsParams,
} from "../types/product";
import { apiGet } from "./apiClient";

export async function getProducts(
  params?: GetProductsParams,
): Promise<ProductsResponse> {
  return apiGet<ProductsResponse>("/products", params);
}

export async function searchProducts(
  query: string,
  params?: GetProductsParams,
): Promise<ProductsResponse> {
  return apiGet<ProductsResponse>("/products/search", { q: query, ...params });
}

export async function getCategories(): Promise<CategoryItem[]> {
  return apiGet<CategoryItem[]>("/products/categories");
}

export async function getProductsByCategory(
  category: string,
  params?: GetProductsParams,
): Promise<ProductsResponse> {
  return apiGet<ProductsResponse>(
    `/products/category/${encodeURIComponent(category)}`,
    params,
  );
}

export async function getProductById(id: number | string): Promise<Product> {
  return apiGet<Product>(`/products/${id}`);
}
