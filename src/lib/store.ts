import { Product, Review, Order } from '@/types';
import { initialProducts, initialCategories } from './mock-data';
import { supabase, isSupabaseConfigured } from './supabase/client';

const PRODUCTS_STORAGE_KEY = 'simcila_products_v6';
const ORDERS_STORAGE_KEY = 'simcila_orders_v1';

// Tarayıcı ortamında yerel ürünleri al
export function getLocalProducts(): Product[] {
  if (typeof window === 'undefined') return initialProducts;
  try {
    const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(initialProducts));
      return initialProducts;
    }
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(initialProducts));
      return initialProducts;
    }
    // Tüm varsayılan ve yeni mücevherlerin varlığını garantiye al
    const existingIds = new Set(parsed.map((p: Product) => p.id));
    const missing = initialProducts.filter((p) => !existingIds.has(p.id));
    if (missing.length > 0) {
      const merged = [...parsed, ...missing];
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(merged));
      return merged;
    }
    return parsed;
  } catch (err) {
    console.error("Local storage error:", err);
    return initialProducts;
  }
}

// Ürünleri kaydet
export function saveLocalProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (err) {
    console.error("Local storage save error:", err);
  }
}

// Tek bir ürünü slug ile getir
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from('products')
      .select('*, reviews(*)')
      .eq('slug', slug)
      .single();
    
    if (data && !error) {
      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: Number(data.price),
        salePrice: data.sale_price ? Number(data.sale_price) : undefined,
        category: data.category_id || 'kolyeler',
        images: data.images || [],
        stock: data.stock || 0,
        isFeatured: data.is_featured,
        material: data.material || '925 Ayar Gümüş',
        stone: data.stone,
        carat: data.carat,
        weight: data.weight,
        rating: 5,
        reviewCount: data.reviews?.length || 0,
        reviews: data.reviews || [],
        createdAt: data.created_at,
      };
    }
  }

  // Fallback to local
  const products = getLocalProducts();
  return products.find((p) => p.slug === slug) || null;
}

// Tüm ürünleri getir
export async function getAllProducts(): Promise<Product[]> {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from('products')
      .select('*, reviews(*)');

    if (data && !error && data.length > 0) {
      return data.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        description: item.description,
        price: Number(item.price),
        salePrice: item.sale_price ? Number(item.sale_price) : undefined,
        category: item.category_id || 'kolyeler',
        images: item.images || [],
        stock: item.stock || 0,
        isFeatured: item.is_featured,
        material: item.material || '925 Ayar Gümüş',
        stone: item.stone,
        carat: item.carat,
        weight: item.weight,
        rating: 4.9,
        reviewCount: item.reviews?.length || 0,
        reviews: item.reviews || [],
        createdAt: item.created_at,
      }));
    }
  }

  return getLocalProducts();
}

// Ürün Ekle
export async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>): Promise<Product> {
  const newProduct: Product = {
    ...product,
    id: 'prod-' + Date.now(),
    createdAt: new Date().toISOString(),
    rating: 5,
    reviewCount: 0,
    reviews: [],
  };

  if (isSupabaseConfigured() && supabase) {
    await supabase.from('products').insert({
      title: product.title,
      slug: product.slug,
      description: product.description,
      price: product.price,
      sale_price: product.salePrice,
      images: product.images,
      stock: product.stock,
      is_featured: product.isFeatured || false,
      material: product.material,
      stone: product.stone,
      weight: product.weight,
    });
  }

  const current = getLocalProducts();
  const updated = [newProduct, ...current];
  saveLocalProducts(updated);
  return newProduct;
}

// Ürün Düzenle
export async function updateProduct(product: Product): Promise<Product> {
  if (isSupabaseConfigured() && supabase) {
    await supabase
      .from('products')
      .update({
        title: product.title,
        slug: product.slug,
        description: product.description,
        price: product.price,
        sale_price: product.salePrice,
        images: product.images,
        stock: product.stock,
        is_featured: product.isFeatured,
        material: product.material,
        stone: product.stone,
        weight: product.weight,
        badge: product.badge,
        category_id: product.category,
      })
      .eq('id', product.id);
  }

  const current = getLocalProducts();
  const updated = current.map((p) => (p.id === product.id ? product : p));
  saveLocalProducts(updated);
  return product;
}

// Ürün Sil
export async function deleteProduct(productId: string): Promise<void> {
  if (isSupabaseConfigured() && supabase) {
    await supabase.from('products').delete().eq('id', productId);
  }

  const current = getLocalProducts();
  const updated = current.filter((p) => p.id !== productId);
  saveLocalProducts(updated);
}

// Yorum Ekle
export async function addProductReview(productId: string, review: Omit<Review, 'id' | 'date' | 'isApproved'>): Promise<Review> {
  const newReview: Review = {
    ...review,
    id: 'rev-' + Date.now(),
    date: new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()),
    isApproved: true,
    verifiedBuyer: true,
  };

  const current = getLocalProducts();
  const updated = current.map((p) => {
    if (p.id === productId) {
      const revs = p.reviews ? [newReview, ...p.reviews] : [newReview];
      const avgRating = revs.reduce((acc, r) => acc + r.rating, 0) / revs.length;
      return {
        ...p,
        reviews: revs,
        reviewCount: revs.length,
        rating: Math.round(avgRating * 10) / 10,
      };
    }
    return p;
  });

  saveLocalProducts(updated);
  return newReview;
}

// Siparişleri Getir
export function getLocalOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Orders load error:", err);
    return [];
  }
}

// Sipariş Kaydet
export function saveOrder(order: Order): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalOrders();
    const updated = [order, ...current];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Order save error:", err);
  }
}

// Sipariş Durumu Güncelle (Admin)
export function updateOrderStatus(orderId: string, status: Order['orderStatus']): void {
  if (typeof window === 'undefined') return;
  const orders = getLocalOrders();
  const updated = orders.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o));
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
}

// Siparişi Kargoya Ver (Kargo Firması & Takip No ile)
export function shipOrder(orderId: string, trackingCompany: string, trackingNumber: string): void {
  if (typeof window === 'undefined') return;
  const orders = getLocalOrders();
  const updated = orders.map((o) => 
    o.id === orderId 
      ? { ...o, orderStatus: 'shipped' as const, trackingCompany, trackingNumber } 
      : o
  );
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
}

