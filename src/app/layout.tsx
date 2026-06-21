import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Courier_Prime } from "next/font/google";
import PunkKid from "next/font/local"
import TungstenCondBook from "next/font/local"
import GlobalAudio from "@/components/GlobalAudio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const courierPrime = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: "400"
});

const punkKid = PunkKid({
  src: [
    {
      path: '../../public/fonts/punkKid.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-punk',
})

const TungstenCBook = TungstenCondBook({
  src: [
    {
      path: '../../public/fonts/TungstenCondBook.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-tungstenC',
})

export const metadata: Metadata = {
  title: "NC NUGS",
  description: "NC NUGS website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${courierPrime.variable} ${punkKid.variable} ${TungstenCBook.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GlobalAudio />
        {children}
      </body>
    </html>
  );
}
