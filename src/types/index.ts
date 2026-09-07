export type CategorySlug = 'kolyeler' | 'bileklikler' | 'yuzukler' | 'kupeler' | 'ozel-tasarim';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug | string;
  description: string;
  imageUrl: string;
  orderIndex: number;
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  isApproved: boolean;
  verifiedBuyer?: boolean;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  category: CategorySlug | string;
  images: string[];
  stock: number;
  isFeatured?: boolean;
  isNew?: boolean;
  material: string; // e.g., '14K Altın Kaplama', '925 Ayar Gümüş'
  stone?: string;   // e.g., 'Zirkon Taşı', 'Doğal İnci', 'Pırlanta'
  carat?: string;
  weight?: string;  // e.g., '4.20 gr'
  badge?: string;   // e.g., 'Çok Satan', '%20 İndirim'
  rating: number;
  reviewCount: number;
  reviews?: Review[];
  createdAt: string;
}

export interface CustomDesignConfig {
  template: 'pist_kask' | 'motocross_kask' | 'marka_logo' | 'oto_asmalik' | 'anahtarlik' | string;
  templateName: string;
  bodyColor: string;
  visorColor?: string;
  mainText: string;
  numberPlate: string;
  helmetBrand?: string;
  symbol?: string;
  backText?: string;
  chainType: string;
  brand?: string;
  plateText?: string;
  material?: string;
  accessoryType?: string;
}

export interface CartItem {
  id?: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedMaterial?: string;
  customDesign?: CustomDesignConfig;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  address: string;
  orderNotes?: string;
  tcNumber?: string;
  birthDate?: string;
}

export type PaymentMethod = 'credit_card' | 'havale_eft';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  trackingCompany?: string;
  havaleReceiptUrl?: string;
}
