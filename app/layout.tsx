import type { Metadata } from "next";
import "./globals.css";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
import { Josefin_Sans, Nova_Mono } from "next/font/google";
import { Toaster } from "sonner";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
});

const nova = Nova_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-nova-mono",
});

export const metadata: Metadata = {
  title: "Sotta Souvenir",
  description:
    "Sotta Souvenir merupakan pusat kerajinan souvenir logam yang berada di Yogyakarta.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${josefin.variable} ${nova.variable}`}>
      <body className="bg-white text-neutral-900 antialiased font-sans">
        <Toaster richColors closeButton position="top-center" />
        {/* <Header /> */}
        <main className="flex-1">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
