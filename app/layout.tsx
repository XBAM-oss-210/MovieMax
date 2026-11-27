import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { FavoritesProvider } from "@/context/FavoritesContext";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const title = "MovieMax – Le cinéma, chez vous";
const description =
    "Blockbusters, séries addictives et grands classiques : tout le cinéma réuni sur MovieMax. Installez-vous, la séance commence.";


export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title,
        description,
        url: "/",
        siteName: "MovieMax",
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#090909] text-white">
            <FavoritesProvider>
              <Navbar />

              <main className="min-w-0 flex-1 pt-36 md:ml-64 md:pt-20">
                
                {children}
              </main>

              <Footer/>
            </FavoritesProvider>




      </body>
    </html>
  );
}