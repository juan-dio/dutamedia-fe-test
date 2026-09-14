import { ApiClientError } from '../types/product';

const BASE_URL = 'https://dummyjson.com';

export async function apiGet<T>(
  path: string,
  params?: Record<string, any>
): Promise<T> {
  const url = new URL(path, BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  let response: Response;
  try {
    response = await fetch(url.toString());
  } catch (err) {
    throw new Error(`Network error: ${(err as Error).message}`);
  }

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }
    throw new ApiClientError(response.status, errorMessage);
  }

  try {
    return (await response.json()) as T;
  } catch (err) {
    throw new Error(`Failed to parse response: ${(err as Error).message}`);
  }
}
