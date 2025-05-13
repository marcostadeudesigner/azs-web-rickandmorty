import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ApolloProviderWrapper} from "@/src/providers/ApolloProviderWrapper";
import { Header } from "@/src/components/Header/Header";
import { Footer } from "@/src/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloProviderWrapper>
          <Header />
              {children}
          <Footer />
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
