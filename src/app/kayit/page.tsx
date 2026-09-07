"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { siteConfig } from "@/config/site";
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Calendar, 
  CreditCard, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from "lucide-react";

// T.C. Kimlik Numarası Algoritması Doğrulaması
function validateTCKimlik(tc: string): boolean {
  if (!/^[1-9]\d{10}$/.test(tc)) return false;

  const digits = tc.split("").map(Number);
  const d = digits;

  // 1, 3, 5, 7, 9. basamaklar toplamı
  const oddSum = d[0] + d[2] + d[4] + d[6] + d[8];
  // 2, 4, 6, 8. basamaklar toplamı
  const evenSum = d[1] + d[3] + d[5] + d[7];

  // 10. basamak kuralı: ((oddSum * 7) - evenSum) % 10
  const tenthCheck = ((oddSum * 7 - evenSum) % 10 + 10) % 10;
  if (tenthCheck !== d[9]) return false;

  // 11. basamak kuralı: İlk 10 basamağın toplamının mod 10'u
  const first10Sum = d.slice(0, 10).reduce((acc, val) => acc + val, 0);
  if (first10Sum % 10 !== d[10]) return false;

  return true;
}

// Telefon Numarası Formatlayıcı: 0 (5XX) XXX XX XX
function formatPhoneNumber(rawInput: string): string {
  let digits = rawInput.replace(/\D/g, "");
  
  // Eğer hiç rakam yoksa veya kullanıcı silerse varsayılan 0
  if (!digits.startsWith("0")) {
    digits = "0" + digits;
  }

  // Maksimum 11 hane (05XXXXXXXXX)
  digits = digits.substring(0, 11);

  if (digits.length <= 1) return "0";
  if (digits.length <= 4) return `0 (${digits.substring(1)}`;
  if (digits.length <= 7) return `0 (${digits.substring(1, 4)}) ${digits.substring(4)}`;
  if (digits.length <= 9) return `0 (${digits.substring(1, 4)}) ${digits.substring(4, 7)} ${digits.substring(7)}`;
  return `0 (${digits.substring(1, 4)}) ${digits.substring(4, 7)} ${digits.substring(7, 9)} ${digits.substring(9, 11)}`;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [tcKimlik, setTcKimlik] = useState("");
  const [phone, setPhone] = useState("0");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Telefon Giriş Olayı
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  // T.C. Kimlik Giriş Olayı (Yalnızca Rakam ve 11 Hane)
  const handleTcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "").substring(0, 11);
    setTcKimlik(cleaned);
  };

  // T.C. Durumu
  const isTcComplete = tcKimlik.length === 11;
  const isTcValid = isTcComplete && validateTCKimlik(tcKimlik);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1. T.C. Kimlik Doğrulaması
    if (!isTcValid) {
      setError("Lütfen geçerli bir T.C. Kimlik Numarası giriniz (Kontrol hanesi matematiksel olarak hatalı).");
      return;
    }

    // 2. Telefon Doğrulaması
    const rawPhoneDigits = phone.replace(/\D/g, "");
    if (rawPhoneDigits.length < 11) {
      setError("Lütfen 11 haneli telefon numaranızı eksiksiz giriniz.");
      return;
    }

    // 3. Şifre Eşleşme Doğrulaması
    if (password.length < 6) {
      setError("Şifreniz en az 6 karakterden oluşmalıdır.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Girdiğiniz şifreler birbiriyle uyuşmuyor. Lütfen iki şifreyi de aynı giriniz.");
      return;
    }

    // 4. Doğum Tarihi Kontrolü
    if (!birthDate) {
      setError("Lütfen doğum tarihinizi seçiniz.");
      return;
    }

    setLoading(true);

    const success = await register(fullName, email, password, {
      phone,
      tcKimlik,
      birthDate,
      address,
    });

    if (success) {
      router.push("/hesabim");
    } else {
      setError("Kayıt oluşturulamadı. Lütfen bilgilerinizi kontrol ediniz.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FCFBF9] text-neutral-900 flex flex-col justify-center py-14 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center space-y-2">
        <span className="font-serif text-3xl font-bold tracking-[0.25em] text-neutral-900 uppercase">
          {siteConfig.name}
        </span>
        <span className="block font-mono text-[10px] uppercase tracking-[0.35em] text-gold-700 font-bold">
          Ayrıcalıklı Müşteri Kaydı
        </span>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 sm:px-0">
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-xl space-y-6">
          
          <form className="space-y-4 text-xs font-mono" onSubmit={handleRegister}>
            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Ad Soyad */}
              <div className="sm:col-span-2">
                <label className="block text-neutral-800 font-bold mb-1.5">Adınız Soyadınız *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ayşe Yılmaz"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* T.C. Kimlik No (Algoritmik Kontrol) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-neutral-800 font-bold">T.C. Kimlik No *</label>
                  {isTcComplete && (
                    <span className={`text-[10px] font-bold flex items-center gap-1 ${
                      isTcValid ? "text-emerald-700" : "text-rose-600"
                    }`}>
                      {isTcValid ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Geçerli
                        </>
                      ) : (
                        "Hatalı T.C."
                      )}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={11}
                    value={tcKimlik}
                    onChange={handleTcChange}
                    placeholder="11 haneli T.C. No"
                    className={`w-full pl-10 pr-4 py-2.5 bg-neutral-50 border rounded-xl text-neutral-900 tracking-wider font-bold focus:outline-none focus:bg-white ${
                      isTcComplete
                        ? isTcValid
                          ? "border-emerald-500 focus:border-emerald-500"
                          : "border-rose-400 focus:border-rose-400 bg-rose-50/20"
                        : "border-neutral-300 focus:border-gold-500"
                    }`}
                  />
                </div>
              </div>

              {/* Doğum Tarihi */}
              <div>
                <label className="block text-neutral-800 font-bold mb-1.5">Doğum Tarihi *</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    required
                    max={new Date().toISOString().split("T")[0]}
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500 focus:bg-white cursor-pointer"
                  />
                </div>
              </div>

              {/* Telefon Numarası (Otomatik 0 ve Format) */}
              <div>
                <label className="block text-neutral-800 font-bold mb-1.5">Telefon Numarası *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="0 (5XX) XXX XX XX"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 tracking-wider font-bold focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* E-Posta */}
              <div>
                <label className="block text-neutral-800 font-bold mb-1.5">E-Posta Adresiniz *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@mail.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Şifre 1 */}
              <div>
                <label className="block text-neutral-800 font-bold mb-1.5">Şifre (En az 6 karakter) *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Şifre 2 (Tekrar Doğrulama) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-neutral-800 font-bold">Şifre Tekrarı *</label>
                  {passwordConfirm && (
                    <span className={`text-[10px] font-bold ${
                      password === passwordConfirm ? "text-emerald-700" : "text-rose-600"
                    }`}>
                      {password === passwordConfirm ? "Eşleşti ✓" : "Uyuşmuyor ✕"}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-4 py-2.5 bg-neutral-50 border rounded-xl text-neutral-900 focus:outline-none focus:bg-white ${
                      passwordConfirm
                        ? password === passwordConfirm
                          ? "border-emerald-500 focus:border-emerald-500"
                          : "border-rose-400 focus:border-rose-400 bg-rose-50/20"
                        : "border-neutral-300 focus:border-gold-500"
                    }`}
                  />
                </div>
              </div>

              {/* Açık Adres */}
              <div className="sm:col-span-2">
                <label className="block text-neutral-800 font-bold mb-1.5">Teslimat Adresiniz *</label>
                <div className="relative">
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Siparişlerinizin ulaştırılacağı mahalle, cadde, sokak, bina ve kapı no..."
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500 focus:bg-white resize-none"
                  />
                </div>
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 bg-neutral-900 hover:bg-gold-600 text-white rounded-full font-mono font-bold uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>{loading ? "Kaydınız Oluşturuluyor..." : "Kayıt Ol ve Giriş Yap"}</span>
            </button>
          </form>

          <div className="text-center text-xs font-mono text-neutral-500 pt-2 border-t border-neutral-100">
            <span>Zaten bir hesabınız var mı? </span>
            <Link href="/giris" className="text-gold-700 hover:underline font-bold">
              Giriş Yapın
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
