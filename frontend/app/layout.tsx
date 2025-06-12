import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/header";
import { headerData } from "@/data/GlobalData";
import Providers from "./providers/provider";
import CartSidebar from "@/components/CartSidebar/cartSidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Welcome to RandoStore – Quality Products, Seamless Shopping",
  description: "Explore top-quality products with a smooth shopping experience at RandoStore. Discover deals, enjoy secure checkout, and fast delivery.",
  icons: {
    icon: '/favicon.png',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Providers>
          <Header {...headerData} />
          <CartSidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
