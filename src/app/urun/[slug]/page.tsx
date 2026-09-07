"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getProductBySlug, addProductReview, getAllProducts } from "@/lib/store";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";
import { ProductCard } from "@/components/product/ProductCard";
import { 
  Star, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Package, 
  ArrowLeft,
  CheckCircle2,
  MessageSquarePlus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!product || product.images.length <= 1) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !product || product.images.length <= 1) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
    } else if (diff < -40) {
      setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
    touchStartX.current = null;
  };
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("Standart (45 cm)");
  const [loading, setLoading] = useState(true);

  // Yorum Formu
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [isAdded, setIsAdded] = useState(false);


  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      const current = await getProductBySlug(slug);
      setProduct(current);
      
      const all = await getAllProducts();
      setRelatedProducts(all.filter((p) => p.slug !== slug).slice(0, 4));
      setLoading(false);
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFBF9] flex items-center justify-center text-neutral-900">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Mücevher Yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FCFBF9] text-neutral-900 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl font-bold">Mücevher Bulunamadı</h2>
        <p className="text-xs text-neutral-500 mt-2 mb-6">Aradığınız tasarım yayından kaldırılmış olabilir.</p>
        <Link
          href="/katalog"
          className="px-6 py-3 bg-neutral-900 text-white font-mono text-xs uppercase font-bold rounded-full hover:bg-gold-600 transition"
        >
          Kataloğa Dön
        </Link>
      </div>
    );
  }

  const activePrice = product.salePrice ?? product.price;
  const havalePrice = activePrice * (1 - siteConfig.havaleDiscountRate);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    setSubmittingReview(true);
    const newRev = await addProductReview(product.id, {
      productId: product.id,
      authorName: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
    });

    setProduct((prev) => {
      if (!prev) return prev;
      const updatedReviews = prev.reviews ? [newRev, ...prev.reviews] : [newRev];
      return {
        ...prev,
        reviews: updatedReviews,
        reviewCount: updatedReviews.length,
      };
    });

    setReviewName("");
    setReviewComment("");
    setReviewSubmitted(true);
    setSubmittingReview(false);
  };

  return (
    <div className="bg-[#FCFBF9] min-h-screen text-neutral-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Geri Dön Linki */}
        <div className="mb-6">
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 font-mono text-xs text-neutral-500 hover:text-gold-700 uppercase tracking-widest transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kataloğa Geri Dön</span>
          </Link>
        </div>

        {/* Ana Ürün Kartı */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-6 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-sm">
          
          {/* Sol: Görsel Galerisi (7 Kolon) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Küçük Resimler */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? "border-gold-500 shadow-md"
                      : "border-neutral-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`${product.title} ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Büyük Ana Görsel (Sağa-Sola Kayan Slider Efekti) */}
            <div 
              className="relative flex-1 aspect-square rounded-3xl overflow-hidden bg-neutral-50 border border-neutral-200 shadow-inner group"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div
                className="flex w-full h-full"
                animate={{ x: `-${selectedImageIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              >
                {product.images.map((img, idx) => (
                  <div key={idx} className="relative w-full h-full shrink-0 flex-none aspect-square">
                    <Image
                      src={img}
                      alt={`${product.title} - ${idx + 1}`}
                      fill
                      priority={idx === 0}
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                ))}
              </motion.div>

              {product.badge && (
                <span className="absolute top-4 left-4 bg-neutral-900/90 text-gold-300 font-mono text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md z-10">
                  {product.badge}
                </span>
              )}

              {/* Sağa / Sola Görsel Değiştirme Butonları */}
              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)}
                    aria-label="Önceki Görsel"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-neutral-800 hover:text-gold-700 shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 z-20"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedImageIndex((prev) => (prev + 1) % product.images.length)}
                    aria-label="Sonraki Görsel"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-neutral-800 hover:text-gold-700 shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 z-20"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  <div className="absolute top-4 right-4 bg-neutral-900/75 backdrop-blur-sm text-white font-mono text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                    {selectedImageIndex + 1} / {product.images.length}
                  </div>
                </>
              )}
            </div>

          </div>

          {/* Sağ: Satın Alma ve Bilgiler (5 Kolon) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              {/* Kategori ve Puan */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-gold-700 font-bold">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1 rounded-full text-xs font-mono">
                  <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  <span className="text-neutral-900 font-bold">{product.rating}</span>
                  <span className="text-neutral-500">({product.reviewCount})</span>
                </div>
              </div>

              {/* Başlık */}
              <h1 className="font-serif text-2xl sm:text-4xl font-normal text-neutral-900 leading-tight">
                {product.title}
              </h1>

              {/* Fiyat Kartı */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-neutral-200 space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-neutral-950">
                    {activePrice.toLocaleString("tr-TR")} ₺
                  </span>
                  {product.salePrice && (
                    <span className="font-mono text-sm text-neutral-400 line-through">
                      {product.price.toLocaleString("tr-TR")} ₺
                    </span>
                  )}
                </div>

                {/* Havale Avantajı */}
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-900 px-3.5 py-2.5 rounded-xl border border-emerald-200 font-mono">
                  <span className="flex items-center gap-2 font-medium">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Havale/EFT ile %5 İndirimli:
                  </span>
                  <span className="font-bold text-emerald-700 text-sm">
                    {havalePrice.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
              </div>

              {/* Açıklama */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Boyut / Ölçü Seçimi */}
              <div className="space-y-2 pt-1">
                <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                  Uzunluk / Ölçü:
                </label>
                <div className="flex flex-wrap gap-2">
                  {["40 cm", "Standart (45 cm)", "50 cm"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono transition ${
                        selectedSize === size
                          ? "bg-neutral-900 text-white font-bold shadow-sm"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Adet ve Sepete Ekle */}
              <div className="flex items-center gap-3 pt-4">
                <div className="flex items-center border border-neutral-300 rounded-2xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded-xl transition"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-sm text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded-xl transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-widest shadow-lg transition-all transform hover:-translate-y-0.5 ${
                    isAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-neutral-900 hover:bg-gold-600 text-white"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Çantaya Eklendi ✓</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Sepete Ekle</span>
                    </>
                  )}
                </button>
              </div>

              {/* Güvenceler */}
              <div className="pt-4 border-t border-neutral-100 grid grid-cols-2 gap-3 text-[11px] text-neutral-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>1.000 TL Üzeri Ücretsiz Kargo</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Ömür Boyu Cila Garantisi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Özel Mühürlü Kadife Kutu</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>925 Ayar Gümüş Sertifikası</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Teknik Özellikler Paneli */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm">
          <h3 className="font-serif text-xl font-normal text-neutral-900 mb-6">Maden & Taş Spesifikasyonları</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-stone-50 border border-neutral-100">
              <span className="text-neutral-500 block mb-1">Maden / Ayar</span>
              <strong className="text-neutral-900">{product.material}</strong>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 border border-neutral-100">
              <span className="text-neutral-500 block mb-1">Taş Türü</span>
              <strong className="text-neutral-900">{product.stone || "Pırlanta Kesim Zirkon"}</strong>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 border border-neutral-100">
              <span className="text-neutral-500 block mb-1">Ağırlık</span>
              <strong className="text-neutral-900">{product.weight || "3.85 gr (±%5)"}</strong>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 border border-neutral-100">
              <span className="text-neutral-500 block mb-1">Koruma</span>
              <strong className="text-neutral-900">Kararmaz Koruyucu Cila</strong>
            </div>
          </div>
        </div>

        {/* Müşteri Yorumları */}
        <div className="mt-10 p-6 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-neutral-200 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-gold-700 block mb-1 font-semibold">
                Kullanıcı Deneyimleri
              </span>
              <h3 className="font-serif text-2xl font-normal text-neutral-900">
                Müşteri Yorumları ({product.reviews?.length || 0})
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="font-mono text-3xl font-bold text-neutral-900">{product.rating}</span>
                <span className="font-mono text-[10px] text-neutral-500 block">5 üzerinden</span>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
            
            {/* Yorumlar Listesi */}
            <div className="lg:col-span-7 space-y-4">
              {!product.reviews || product.reviews.length === 0 ? (
                <div className="p-10 text-center rounded-2xl bg-stone-50 border border-dashed border-neutral-300 text-neutral-500 text-xs">
                  Bu ürün için henüz bir yorum bulunmuyor. İlk değerlendirmeyi siz yapın!
                </div>
              ) : (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="p-5 rounded-2xl bg-stone-50 border border-neutral-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-neutral-900">{rev.authorName}</span>
                        {rev.verifiedBuyer && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            Doğrulanmış Alıcı
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">{rev.date}</span>
                    </div>

                    <div className="flex gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                      ))}
                    </div>

                    <p className="text-xs text-neutral-700 font-light leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Yorum Formu */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-stone-50 border border-neutral-200">
              <div className="flex items-center gap-2 mb-4 text-neutral-900">
                <MessageSquarePlus className="w-5 h-5 text-gold-600" />
                <h4 className="font-serif text-base font-semibold">Değerlendirme Bırakın</h4>
              </div>

              {reviewSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2">
                  <p className="font-bold">Yorumunuz başarıyla yayınlandı!</p>
                  <p>Deneyiminizi paylaştığınız için teşekkür ederiz.</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-neutral-700 mb-1.5 font-semibold">Puanınız:</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1 hover:scale-110 transition"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewRating ? "fill-gold-500 text-gold-500" : "text-neutral-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-700 mb-1 font-semibold">Adınız Soyadınız:</label>
                    <input
                      type="text"
                      required
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="Örn: Ayşe Yılmaz"
                      className="w-full px-3.5 py-2.5 bg-white text-neutral-900 border border-neutral-300 rounded-xl focus:outline-none focus:border-gold-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 mb-1 font-semibold">Yorumunuz:</label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Işıltısı, taş parlaklığı ve paketlemesi nasıldı?"
                      className="w-full px-3.5 py-2.5 bg-white text-neutral-900 border border-neutral-300 rounded-xl focus:outline-none focus:border-gold-500 text-xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="w-full py-3 bg-neutral-900 hover:bg-gold-600 text-white rounded-xl font-bold uppercase tracking-wider text-xs transition shadow-sm"
                  >
                    {submittingReview ? "Gönderiliyor..." : "Yorumu Yayınla"}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Kombin Önerileri */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-10">
              <span className="font-mono text-xs text-gold-700 uppercase tracking-widest block mb-1 font-semibold">
                Kombin Önerisi
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-neutral-900">
                Bu Parçayla Eşleşen Mücevherler
              </h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Mobil Sabit Satın Alma Çubuğu (Dokunmatik Cihazlar İçin) */}
        <div className="lg:hidden fixed bottom-[50px] inset-x-0 bg-white/95 backdrop-blur-2xl border-t border-neutral-200 p-3 z-30 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div>
            <span className="text-[10px] font-mono text-neutral-500 block">Ödenecek Tutar</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-base font-bold text-neutral-950">
                {activePrice.toLocaleString("tr-TR")} ₺
              </span>
              {product.salePrice && (
                <span className="font-mono text-[10px] text-neutral-400 line-through">
                  {product.price.toLocaleString("tr-TR")} ₺
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-neutral-900 active:bg-gold-600 text-white"
            }`}
          >
            {isAdded ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Eklendi ✓</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Sepete Ekle</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
