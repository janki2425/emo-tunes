import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import axiosInstance from '@/app/api/axiosInstance';
import { useIsMobile } from '@/hooks/useIsMobile'; 

const RandomSongs = () => {
  const [allSongs, setAllSongs] = useState<any[]>([]);
  const [currentSongs, setCurrentSongs] = useState<any[]>([]);
  const {isMobile,isSmallMobile} = useIsMobile();

  useEffect(() => {
    const fetchSongs = async () => {
      try{
        const res = await axiosInstance.get('api/get-tracks');
        setAllSongs(res.data.tracks || []);
      }
      catch{
        console.log("songs not found");
      }
      
    };
    fetchSongs();
  }, []);

  return (
    <div className="w-full mx-auto p-2 md:p-6">
      {/* Header */}
        <div className="flex items-center justify-start gap-2 mb-8">
            <button className='py-2 px-6 bg-[#06f050] hover:bg-[#1af306de] text-slate-600 P-18 font-[500] rounded-[20px]'>All</button>
            <button className='py-2 px-6 bg-[#06f050] hover:bg-[#1af306de] text-slate-600 P-18 font-[500] rounded-[20px]'>artist</button>
        </div>

      {/* Songs Grid */}
      <div className={`grid gap-6 ${isSmallMobile ? 'grid-cols-1' : isMobile ? 'grid-cols-2' : ''} md:grid-cols-3 lg:grid-cols-4 transition-all duration-300`}>
        {allSongs.map((song, index) => (
          <div key={index}>
            <a href={song.url}>
                <div
                className={`group relative bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
                style={{ animationDelay: `${index * 100}ms` }}
            >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Album Cover */}
                <div className="relative">
                {/* Placeholder for album cover */}
                <div className="w-full h-full flex items-center justify-center">
                    <Image
                    src={song.albumArt}
                    width={192}
                    height={192}
                    alt={song.name}
                    className="w-full object-cover rounded-t-2xl shadow-lg"
                    />
                </div>
                </div>

                {/* Song Info */}
                <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 truncate">
                    {song.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2 truncate">
                    {song.artist}
                </p>
                </div>

                {/* Animated border on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r opacity-20 blur-sm`}></div>
                </div>
            </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RandomSongs