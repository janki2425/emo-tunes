import React, { useState, useEffect } from 'react'
import Image from 'next/image'
// import Link from 'next/link'
import { useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const AuthUser = () => {

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
    <div className="w-full h-[72px] fixed top-0 bg-[#464848] z-20">
        <div className='h-full flex items-center justify-between md:justify-end px-4 gap-4 transition-all duration-300'>
            <div className="flex md:hidden rounded-full bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-gray-800/40 transition-all duration-300">
                <ThemeToggle />
            </div>  
            <div className='flex items-center justify-center gap-4'>        
                {!isLoggedIn ? (
                    <>
                        <button
                            onClick={handleSignUp}
                            className='px-3 py-2 border-[2px] border-[#DDD0C8] rounded-[16px] text-[#DDD0C8] hover:text-[#d9b49d] hover:border-[#d9b49d] P-16 md:P-20 font-[600] transition-all duration-300'
                        >
                            Sign Up
                        </button>
                        <button 
                            onClick={handleSignIn}
                            className='px-3 py-2 border-[2px] border-[#DDD0C8] bg-[#DDD0C8] hover:bg-[#d6bdad] text-[#265767] P-16 md:P-20 font-[600] rounded-[16px] transition-all duration-300'
                        >
                            Sign In
                        </button>
                    </>
                ) : (
                    <div className="relative">
                        <button 
                            onClick={toggleDropdown}
                            className='p-2 rounded-full hover:bg-gray-700 transition-colors'
                        >
                            <Image src={'/user-icon.svg'} width={40} height={40} alt='user'/>
                        </button>
                        {showDropdown && (
                            <div className="absolute left-0 mt-2 w-48 bg-[#4d4d4d] rounded-xl shadow-lg py-2 z-10">
                                <button
                                    onClick={() => {
                                        // router.push('/profile');
                                        setShowDropdown(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-[#DDD0C8] hover:bg-gray-700 P-14"
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={() => {
                                        // router.push('/settings');
                                        setShowDropdown(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-[#DDD0C8] hover:bg-gray-700 P-14"
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
        </div>
    </div>
  )
}

export default AuthUser
