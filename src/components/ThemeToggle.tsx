'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
    onClick={() => {
      const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      console.log('Switching to:', newTheme, 'Current resolvedTheme:', resolvedTheme);
    }}
      className='p-2 rounded-full'
    >
      {resolvedTheme === 'dark' ? (
        <Image
          src='/light-mode.svg'
          width={40}
          height={40}
          alt='Switch to light mode'
          priority
        />
      ) : (
        <Image
          src='/dark-mode.svg'
          width={40}
          height={40}
          alt='Switch to dark mode'
          priority
        />
      )}
    </button>
  );
}
