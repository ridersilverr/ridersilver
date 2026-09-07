import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { LiveSupportProvider } from "@/context/LiveSupportContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LiveSupportDrawer } from "@/components/support/LiveSupportDrawer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FCFBF9",
};

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.slogan}`,
  description: siteConfig.description,
  keywords: ["rider silver", "motorcu kolye", "kask kolye", "gümüş kolye", "925 ayar", "senin sürüşün senin hikayen", "mücevher"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased min-h-screen flex flex-col selection:bg-gold-500 selection:text-white bg-[#FCFBF9] text-neutral-900">
        <AuthProvider>
          <CartProvider>
            <LiveSupportProvider>
              <Navbar />
              <CartDrawer />
              <main className="flex-1 pb-16 lg:pb-0">
                {children}
              </main>
              <Footer />
              <MobileBottomNav />
              <LiveSupportDrawer />
            </LiveSupportProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
