'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const updateTheme = (newTheme: Theme) => {
    // Update Tailwind dark mode
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    // Update CSS variables
    if (newTheme === 'dark') {
      document.documentElement.style.setProperty('--background', '#2d2d2d');
      document.documentElement.style.setProperty('--foreground', '#DDD0C8');
    } else {
      document.documentElement.style.setProperty('--background', '#F2F0EA');
      document.documentElement.style.setProperty('--foreground', '#265767');
    }
  };

  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      updateTheme(savedTheme);
    } else {
      // Check system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
      updateTheme(systemTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    updateTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 