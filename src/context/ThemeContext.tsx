'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      // defaultTheme="light" 
      // enableSystem
      disableTransitionOnChange={false} // Enable smooth transitions
    >
      {children}
    </ThemeProvider>
  )
}