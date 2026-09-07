-- ==============================================================================
-- SIM-CİLA LÜKS TAKI & MÜCEVHERAT - SUPABASE VERİTABANI ŞEMASI VE POLİTİKALARI
-- ==============================================================================

-- 1. PROFİLLER TABLOSU (Müşteri & Admin Rolleri)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  district TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. KATEGORİLER TABLOSU
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ÜRÜNLER TABLOSU
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  sale_price NUMERIC(10, 2),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  images TEXT[] DEFAULT '{}',
  stock INT DEFAULT 10,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  material TEXT DEFAULT '925 Ayar Gümüş',
  carat TEXT,
  stone TEXT,
  weight TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ÜRÜN YORUMLARI TABLOSU
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SİPARİŞLER TABLOSU
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_district TEXT NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('credit_card', 'havale_eft')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  order_status TEXT DEFAULT 'processing' CHECK (order_status IN ('processing', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  subtotal NUMERIC(10, 2) NOT NULL,
  discount NUMERIC(10, 2) DEFAULT 0,
  total_amount NUMERIC(10, 2) NOT NULL,
  items JSONB NOT NULL,
  havale_receipt_url TEXT,
  order_notes TEXT,
  tracking_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. HAVALE/EFT BANKA HESAPLARI TABLOSU
CREATE TABLE IF NOT EXISTS public.bank_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_name TEXT NOT NULL,
  account_holder TEXT NOT NULL,
  iban TEXT NOT NULL,
  branch TEXT,
  account_number TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- RLS (ROW LEVEL SECURITY) POLİTİKALARI
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;

-- Kategoriler ve Ürünler: Herkes görüntüleyebilir, sadece admin yönetebilir
CREATE POLICY "Public categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public products are viewable by everyone" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can manage products" ON public.products FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Admin can manage categories" ON public.categories FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Yorumlar: Onaylı yorumlar herkese açık, kullanıcı kendi yorumunu ekleyebilir
CREATE POLICY "Approved reviews viewable by everyone" ON public.reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Authenticated users can submit review" ON public.reviews FOR INSERT WITH CHECK (true);

-- Banka Hesapları: Aktif hesaplar herkese açık
CREATE POLICY "Active bank accounts viewable by everyone" ON public.bank_accounts FOR SELECT USING (is_active = true);

-- Siparişler: Kullanıcı kendi siparişini görebilir, Admin hepsini görebilir
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (
  auth.uid() = user_id OR
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Anyone can create order" ON public.orders FOR INSERT WITH CHECK (true);

-- ==============================================================================
-- BAŞLANGIÇ VERİLERİ (SEED)
-- ==============================================================================
INSERT INTO public.categories (name, slug, description, image_url, order_index) VALUES
  ('Kolyeler', 'kolyeler', 'Zarif pırlanta, altın ve gümüş kolye tasarımları', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800', 1),
  ('Bileklikler', 'bileklikler', 'İncelikle işlenmiş su yolu, kelepçe ve zincir bileklikler', 'https://images.unsplash.com/photo-1611591475883-9b9c940b3c76?q=80&w=800', 2),
  ('Yüzükler', 'yuzukler', 'Tektaş, baget ve tasarım yüzük koleksiyonu', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800', 3),
  ('Küpeler', 'kupeler', 'Işıltılı halka, sallantılı ve minimal küpe modelleri', 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800', 4)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.bank_accounts (bank_name, account_holder, iban, branch) VALUES
  ('Garanti BBVA', 'SİM CİLA MÜCEVHERAT VE KUYUMCULUK LTD. ŞTİ.', 'TR45 0006 2000 1234 5678 9012 34', 'Nişantaşı Şubesi (1234)'),
  ('İş Bankası', 'SİM CİLA MÜCEVHERAT VE KUYUMCULUK LTD. ŞTİ.', 'TR12 0006 4000 9876 5432 1098 76', 'Karaköy Şubesi (4567)')
ON CONFLICT DO NOTHING;
