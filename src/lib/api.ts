
const BASE_URL = "https://dummyjson.com/products";

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
  images: string[];
  brand?: string;
  discountPercentage: number;
  stock: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function getProducts({
    search = "",
    category = "",
    limit = 12,
    skip = 0,
  }: {
    search?: string;
    category?: string;
    limit?: number;
    skip?: number;
  }): Promise<ProductsResponse> {
    const params = new URLSearchParams({
      limit: String(limit),
      skip: String(skip),
    });
  
    let url = BASE_URL;
  
    if (search.trim()) {
      url += `/search?q=${encodeURIComponent(search.trim())}&${params}`;
    } else if (category) {
      url += `/category/${encodeURIComponent(category)}?${params}`;
    } else {
      url += `?${params}`;
    }
  
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error("Failed to fetch products. Please try again.");
    }
  
    return response.json();
  }

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product details.");
  }

  return response.json();
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/category-list`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories.");
  }

  return response.json();
}
