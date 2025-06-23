import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import axiosInstance from '@/app/api/axiosInstance';
import { useIsMobile } from '@/hooks/useIsMobile'; 
import { motion } from "framer-motion";

const getSpotifyEmbedUrl = (url: string): string | null => {
  // Extract Spotify track ID from URL
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  if (match) {
    return `https://open.spotify.com/embed/track/${match[1]}`;
  }
  return null;
};

const RandomSongs = () => {
  const [allSongs, setAllSongs] = useState<any[]>([]);
  const [currentSongs, setCurrentSongs] = useState<any[]>([]);
  const {isMobile,isSmallMobile} = useIsMobile();
  const [modalSong, setModalSong] = useState<any | null>(null);

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

  // Modal close handler
  const closeModal = () => setModalSong(null);

  return (
    <div className="w-full mx-auto p-2 md:p-6">
      {/* Header */}
        <div className="flex items-center justify-start gap-2 mb-8">
            <button className='py-2 px-6 bg-[#06f050] hover:bg-[#1af306de] text-slate-600 P-14 md:P-18 font-[500] rounded-[20px] transition-all duration-300'>All</button>
            {/* <button className='py-2 px-6 bg-[#06f050] hover:bg-[#1af306de] text-slate-600 P-14 md:P-18 font-[500] rounded-[20px] transition-all duration-300'>artist</button> */}
        </div>

      {/* Songs Grid */}
      <div className={`grid gap-6 ${isSmallMobile ? 'grid-cols-2' : isMobile ? 'grid-cols-3' : ''} md:grid-cols-4 xl:grid-cols-5 transition-all duration-300`}>
        {allSongs.map((song, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            // animate={{ opacity: 1, scale: 1 }}
            whileInView={{opacity:1}}
            // whileHover={{ scale: 1.0005 }}
            transition={{ duration: 1, delay: index * 0.05 }}
          >
            <a href={song.url} onClick={e => { e.preventDefault(); setModalSong(song); }}>
                <div
                className={`group relative bg-white dark:bg-gray-900 rounded-lg lg:rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 hover:scale-102 hover:shadow-2xl`}
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
                    className="w-full object-cover lg:rounded-t-2xl rounded-t-lg shadow-lg transition-all duration-300"
                    />
                </div>
                </div>

                {/* Song Info */}
                <div className="p-2 md:p-4 lg:p-6 transition-all duration-300">
                <h3 className="font-bold P-16 lg:h-24-120 text-gray-900 dark:text-white mb-1 truncate transition-all duration-300">
                    {song.name}
                </h3>
                <p className="text-gray-600 P-14 lg:h-20-120 dark:text-gray-400 mb-2 truncate transition-all duration-300">
                    {song.artist}
                </p>
                </div>

                {/* Animated border on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r opacity-20 blur-sm`}></div>
                </div>
            </div>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Modal Popup */}
      {modalSong && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl px-6 py-8 max-w-xs md:max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl" onClick={closeModal}>&times;</button>
            <h2 className="font-bold text-lg mb-2 text-center">{modalSong.name}</h2>
            <p className="text-center text-gray-500 mb-4">{modalSong.artist}</p>
            {/* Spotify Embed */}
            {modalSong.url && getSpotifyEmbedUrl(modalSong.url) && (
              <iframe
                src={getSpotifyEmbedUrl(modalSong.url) as string}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded mb-4"
                title="Spotify Player"
              ></iframe>
            )}
            {modalSong.url && !getSpotifyEmbedUrl(modalSong.url) && (
              <div className="text-center text-gray-400 mb-4">No Spotify preview available.</div>
            )}
            <a
              href={modalSong.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-all duration-200"
            >
              Play on Spotify
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default RandomSongs