import type { Metadata } from "next";
import "./globals.css";
import NavbarMain from "@/components/common/navbar/NavbarMain";
import { Inter } from 'next/font/google'
import Footer from "@/components/common/footer/Footer";
import  {QueryProvider} from "@/providers/query-provider"
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
    title: "DevalShoppingCart | Excellent Shopping Experience",
    description: "Discover unbeatable deals and a seamless shopping experience at DevalShoppingCart. Shop a wide range of high-quality products, enjoy secure payments, and fast shipping. Join our community of satisfied customers and elevate your shopping experience today!"
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <QueryProvider>
        <NavbarMain/>
                {children}
        <Footer/>
        </QueryProvider>
      </body>
    </html>
  );
}
