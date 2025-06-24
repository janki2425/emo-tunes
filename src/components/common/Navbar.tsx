'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import ThemeToggle from '../ThemeToggle';
import { useIsMobile } from '@/hooks/useIsMobile';

const Navbar = () => {
    const {isMobile} = useIsMobile();
    const [activeTab, setActiveTab] = useState('Home');
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    
    const navItems = [
        { 
            name: 'Home', 
            icon: '/navbar/home.svg', 
            href: '/',
            gradient: 'from-purple-500 to-pink-500'
        },
        { 
            name: 'Search', 
            icon: '/navbar/search.svg', 
            href: '#',
            gradient: 'from-blue-500 to-cyan-500'
        },
        { 
            name: 'PlayList', 
            icon: '/navbar/playlist.svg', 
            href: '#',
            gradient: 'from-green-500 to-emerald-500'
        },
        { 
            name: 'Premium', 
            icon: '/EmoTunes-logo-white.png', 
            href: '#',
            gradient: 'from-yellow-500 to-orange-500'
        }
    ];

    // Auto-hide navbar on scroll
    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
                setLastScrollY(window.scrollY);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
            return () => window.removeEventListener('scroll', controlNavbar);
        }
    }, [lastScrollY]);
    
    return (
        <div className={`w-full h-[80px] z-50 fixed bottom-0 transition-all duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/30">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent dark:from-white/5"></div>
                
                {/* Animated background particles */}
                {/* <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-2 left-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-30 animate-pulse"></div>
                    <div className="absolute top-4 right-1/3 w-0.5 h-0.5 bg-pink-400 rounded-full opacity-40 animate-pulse delay-100"></div>
                    <div className="absolute bottom-4 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-20 animate-pulse delay-200"></div>
                </div> */}
            </div>

            <nav className='relative h-full flex items-center justify-center px-4'>
                {/* Active tab indicator */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60"></div>
                
                <div className='flex items-center justify-around w-full max-w-md'>
                    {navItems.map((item) => (
                        <Link 
                            key={item.name} 
                            href={item.href}
                            className="group relative"
                            onClick={() => setActiveTab(item.name)}
                        >
                            <div className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                                activeTab === item.name 
                                    ? 'bg-white/20 dark:bg-gray-800/40 shadow-lg scale-105' 
                                    : 'hover:bg-white/10 dark:hover:bg-gray-800/20'
                            }`}>
                                
                                {/* Active tab glow effect */}
                                {activeTab === item.name && (
                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-20 blur-sm animate-pulse`}></div>
                                )}
                                
                                {/* Icon container */}
                                <div className="relative z-10">
                                    {activeTab === item.name ? (
                                        <div className={`p-2 rounded-xl bg-gradient-to-r ${item.gradient} shadow-lg`}>
                                            <Image 
                                                src={item.icon} 
                                                width={20} 
                                                height={20} 
                                                alt={item.name} 
                                                className={item.name === 'Premium' ? '' : 'invert'}
                                            />
                                        </div>
                                    ) : (
                                        <div className="p-2 rounded-xl bg-gray-200/20 dark:bg-gray-700/20 group-hover:bg-gray-200/40 dark:group-hover:bg-gray-700/40 transition-colors">
                                            <Image 
                                                src={item.icon} 
                                                width={20} 
                                                height={20} 
                                                alt={item.name} 
                                                className={`transition-all duration-300 ${
                                                    item.name === 'Premium' 
                                                        ? 'group-hover:brightness-110' 
                                                        : 'invert opacity-70 group-hover:opacity-100'
                                                }`}
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                {/* Label */}
                                <p className={`text-xs font-medium transition-all duration-300 ${
                                    activeTab === item.name 
                                        ? 'text-white dark:text-white font-semibold' 
                                        : 'text-gray-300 dark:text-gray-400 group-hover:text-white dark:group-hover:text-gray-200'
                                }`}>
                                    {item.name}
                                </p>
                                
                                {/* Active dot indicator */}
                                {activeTab === item.name && (
                                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                                )}
                            </div>
                            
                            {/* Ripple effect */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-active:opacity-30 bg-white transition-opacity duration-150 pointer-events-none"></div>
                        </Link>
                    ))}
                </div>
                
                {/* Theme toggle in corner */}
               {/* {!isMobile && (
                 <div className="flex absolute right-4 top-8 transform -translate-y-1/2 transition-all duration-300">
                    <div className="rounded-full backdrop-blur-sm transition-colors">
                        <ThemeToggle />
                    </div>
                </div>
               )} */}
            </nav>
            
            {/* Bottom safe area for phones with home indicators */}
            <div className="h-2 bg-gradient-to-t from-black/10 to-transparent dark:from-white/5"></div>
        </div>
    )
}

export default Navbar