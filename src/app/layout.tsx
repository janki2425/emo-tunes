'use client'
import { useEffect, useState } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import { Providers } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";
import AuthUser from "@/components/WebNavbar";
import SplashScreen from '@/components/SplashScreen';
import { useIsMobile } from '@/hooks/useIsMobile'; 

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const {isMobile} = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}>
        <Providers>
          {isLoading && <SplashScreen/>}
          {!isLoading && (
          <>
          {pathName !== '/auth/register' && pathName !== '/auth/login' && (
            <>
            <AuthUser/>
            {isMobile && (
              <Navbar/>
            )}
            </>
          )}
          
          {children}
          </>
        )}
        </Providers>
      </body>
    </html>
  );
}