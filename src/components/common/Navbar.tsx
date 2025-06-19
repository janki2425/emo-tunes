'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleSignUp = () => {
        router.push('/auth/register');
    }

    const handleSignIn = () => {
        router.push('/auth/login');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/');
    }

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    return (
        <div className="w-full h-[72px] bg-gradient-to-br from-black via-blue-400 to-indigo-400 dark:from-gray-700 dark:via-blue-900 dark:to-indigo-900 shadow">
            <nav className='h-full flex items-center justify-between px-4'>
                <div className='h-full flex items-center'>
                    <Image src={'/EmoTunes-logo.png'} width={120} height={70} alt='EmoTunes' className='w-[150px] h-[50px]'/>
                </div>
                <ul className='flex items-center justify-center gap-4'>
                    <Link href={'/'} className='p-2 rounded-[10px]'><li className='text-[#DDD0C8] h-24-120 font-[600]'>Home</li></Link>
                    <Link href={'#'} className='p-2 rounded-[10px]'><li className='text-[#DDD0C8] h-24-120 font-[600]'>Search</li></Link>
                    <Link href={'#'} className='p-2 rounded-[10px]'><li className='text-[#DDD0C8] h-24-120 font-[600]'>Your PlayList</li></Link>
                </ul>
                <div className='flex items-center justify-center gap-4'>
                    <ThemeToggle/>
                    {!isLoggedIn ? (
                        <>
                            <button
                                onClick={handleSignUp}
                                className='px-3 py-2 border-[2px] border-[#265767] dark:border-[#DDD0C8] rounded-[16px] text-[#265767] dark:text-[#DDD0C8] P-20 font-[600]'
                            >
                                Sign Up
                            </button>
                            <button 
                                onClick={handleSignIn}
                                className='px-3 py-2 border-[2px] border-[#DDD0C8] bg-[#265767] dark:bg-[#DDD0C8] dark:text-[#265767] text-white P-20 font-[600] rounded-[16px]'
                            >
                                Sign In
                            </button>
                        </>
                    ) : (
                        <div className="relative">
                            <button 
                                onClick={toggleDropdown}
                                className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
                            >
                                <Image src={'/user-icon.svg'} width={40} height={40} alt='user'/>
                            </button>
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#4d4d4d] rounded-xl shadow-lg py-2 z-10">
                                    <button
                                        onClick={() => {
                                            // router.push('/profile');
                                            setShowDropdown(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-[#265767] dark:text-[#DDD0C8] hover:bg-gray-100 dark:hover:bg-gray-700 P-14"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            // router.push('/settings');
                                            setShowDropdown(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-[#265767] dark:text-[#DDD0C8] hover:bg-gray-100 dark:hover:bg-gray-700 P-14"
                                    >
                                        Settings
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 P-14"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar
