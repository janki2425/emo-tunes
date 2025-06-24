'use client'

import { useEffect, useState, ReactNode } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import { Providers } from "@/context/ThemeContext";
import { SearchProvider } from "@/context/SearchContext";
import { usePathname } from "next/navigation";
import SplashScreen from '@/components/SplashScreen';
import { useIsMobile } from '@/hooks/useIsMobile'; 
import WebNavbar from '@/components/WebNavbar';
import { useTheme } from 'next-themes';
import { useSearch } from '@/context/SearchContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function LayoutContent({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const { isMobile } = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const { resolvedTheme, setTheme } = useTheme();
  const { setIsSearchOpen } = useSearch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      
      if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [resolvedTheme, setTheme, setIsSearchOpen]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isLoading && <SplashScreen />}
      {!isLoading && (
        <>
          {pathName !== '/auth/register' && pathName !== '/auth/login' && (
            <>
              <WebNavbar />
              {isMobile && <Navbar />}
            </>
          )}
          {children}
        </>
      )}
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}>
        <Providers>
          <SearchProvider>
            <LayoutContent>{children}</LayoutContent>
          </SearchProvider>
        </Providers>
      </body>
    </html>
  );
}