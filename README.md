# SIM-CİLA | Lüks Mücevherat & Takı E-Ticaret Platformu

Bu proje; kolyeler, bileklikler, yüzükler ve küpeler gibi özel zanaat takıların sergilendiği, müşteri yorumları, sepet, Havale/EFT ve kredi kartı (iyzico hazır mimari) ödeme akışları barındıran; satıcı için ürün ekleme/çıkarma admin paneline ve müşteri kayıt sistemine sahip modern bir web uygulamasıdır.

---

## 💎 Temel Özellikler

1. **Lüks & Sinematik Vitrin (Hero & Koleksiyonlar):**
   - Altın, şampanya ve obsidyen renk paleti ile üst düzey mücevherat tasarımı.
   - Kolye, Bileklik, Yüzük ve Küpe kategorileri için özel görsel vitrinler.
   - İki aşamalı görsel önizleme (kart üzerine gelindiğinde ikinci açı görünümü).

2. **Ürün Detayı & Müşteri Yorumları:**
   - Çoklu görsel galerisi, yakınlaştırma ve ölçü seçimi.
   - Kullanıcıların ürün altına yıldızlı puan ve yorum bırakabilmesi.
   - Canlı onaylı yorum gösterimi ve ortalama puan hesaplama.

3. **Gelişmiş Sepet & Ödeme Akışı:**
   - Sağdan pürüzsüzce açılan sepet çekmecesi (`CartDrawer`).
   - "1.000 TL üzeri Ücretsiz Kargo" canlı ilerleme çubuğu.
   - İndirim kuponu desteği (Örnek: `SIMCILA10`).
   - **Havale / EFT ile %5 Ek İndirim**: Banka IBAN bilgileri, tek tıkla kopyalama, sipariş referans numarası oluşturma.
   - **Kredi Kartı (iyzico Entegrasyonuna Hazır)**: Canlı kart numarası formatlama, interaktif kart önizleme, 3D Secure altyapısı hazır form.

4. **Satıcı / Yönetici (Admin) Paneli (`/admin`):**
   - Ciro, sipariş ve stok durumu KPI özet kartları.
   - **Ürün Yönetimi**: Yeni takı tasarımı ekleme (başlık, kategori, fiyat, indirim, stok, maden/ayar, taş türü, görsel URL'si), ürün düzenleme ve silme.
   - **Sipariş Yönetimi**: Havale/EFT ödemelerini onaylama, kargo takip durumu güncelleme.

5. **Marka İsmi Kolaylığı:**
   - Şimdilik `sim-cila` olan marka ismi `src/config/site.ts` dosyası üzerinden tek bir satırla dilediğiniz zaman değiştirilebilir.

6. **Supabase & Hibrit Mimari:**
   - `supabase/schema.sql` dosyasında PostgreSQL tabloları ve RLS politikaları hazır.
   - Supabase anahtarları henüz girilmemiş olsa bile yerel modda tüm özellikler çalışır; `.env.local` girildiğinde otomatik olarak canlı Supabase'e bağlanır.

---

## 🚀 Visual Studio Code ile Test Etme ve Çalıştırma

Bilgisayarınızda test etmek için aşağıdaki basit adımları takip edebilirsiniz:

1. **Visual Studio Code'u açın.**
2. Menüden **File -> Open Folder...** (Dosya -> Klasör Aç) seçeneğine tıklayın.
3. Şu klasörü seçin:
   ```
   C:\Users\erayy\.gemini\antigravity\scratch\sim-cila
   ```
4. VS Code içerisinde entegre terminali açın (`Ctrl + \`` kısayolu veya üst menüden `Terminal -> New Terminal`).
5. Bağımlılıkları yüklemek için şu komutu çalıştırın:
   ```bash
   npm install
   ```
6. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
7. Tarayıcınızda açın:
   ```
   http://localhost:3000
   ```

---

## 🛠️ Yönetici (Admin) Paneline Giriş

- Menüdeki "Admin Paneli" linkine tıklayabilir veya doğrudan `http://localhost:3000/admin` adresine gidebilirsiniz.
- Test için `/giris` sayfasındaki **"Yönetici (Admin) Olarak Hızlı Test Girişi"** butonuna basarak tek tıkla admin yetkisiyle paneli deneyimleyebilirsiniz.

---

## 🌐 Vercel Üzerinde Canlıya Alma (Yayınlama)

1. Projeyi bir GitHub reposuna yükleyin (`git init`, `git add .`, `git commit -m "sim-cila initial commit"`).
2. [Vercel](https://vercel.com) hesabınıza giriş yapın ve **"Add New Project"** butonuna basın.
3. GitHub reponuzu seçin.
4. Framework olarak **Next.js** otomatik seçilecektir.
5. **Deploy** butonuna tıklayın. 1-2 dakika içinde siteniz dünya genelinde yayında olacaktır!

---

## 🗄️ Supabase Kurulumu (İsteğe Bağlı)

1. [Supabase](https://supabase.com) üzerinde ücretsiz bir proje oluşturun.
2. Sol menüden **SQL Editor** kısmına gidin.
3. Projedeki `supabase/schema.sql` dosyasının içeriğini yapıştırıp **RUN** butonuna basın.
4. **Project Settings -> API** bölümündeki URL ve Anon Key değerlerini projenizdeki `.env.local` dosyasına yapıştırın:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://proje-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=anon-key-buraya
   ```
