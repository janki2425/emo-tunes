'use client';

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleSignUp = () => {
    router.push('/auth/register');
  }

  const handleSignIn = () => {
    router.push('/auth/login');
  }

  return (
    <div className='w-full h-[72px] bg-[#F2F0EA] dark:bg-[#4d4d4d] shadow'>
      <nav className='h-full flex items-center justify-between px-4'>
        <div className='h-full flex items-center'>
            <Image src={'/EmoTunes-logo.png'} width={120} height={70} alt='EmoTunes' className='w-[150px] h-[50px]'/>
        </div>
        <ul className='flex items-center justify-center gap-4'>
            <Link href={'/'} className='p-2 rounded-[10px]'><li className='text-[#265767] dark:text-[#DDD0C8] h-24-120 font-[600]'>Home</li></Link>
            <Link href={'#'} className='p-2 rounded-[10px]'><li className='text-[#265767] dark:text-[#DDD0C8] h-24-120 font-[600]'>Search</li></Link>
            <Link href={'#'} className='p-2 rounded-[10px]'><li className='text-[#265767] dark:text-[#DDD0C8] h-24-120 font-[600]'>Your PlayList</li></Link>
        </ul>
        <div className='flex items-center justify-center gap-4'>
            <button 
              onClick={toggleTheme}
              className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
            >
              {theme === 'light' ? (
                <Image src={'/dark-mode.svg'} width={40} height={40} alt='dark'/>
              ) : (
                <Image src={'/light-mode.svg'} width={40} height={40} alt='light'/>
              )}
            </button>
            <button 
            onClick={handleSignUp}
            className='px-3 py-2 border-[2px] border-[#265767] dark:border-[#DDD0C8] rounded-[16px] text-[#265767] dark:text-[#DDD0C8] P-20 font-[600]'>Sign Up</button>
            <button 
            onClick={handleSignIn}
            className='px-3 py-2 border-[2px] border-[#265767] bg-[#265767] dark:bg-[#DDD0C8] dark:text-[#265767] text-white P-20 font-[600] rounded-[16px]'>Sign In</button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
