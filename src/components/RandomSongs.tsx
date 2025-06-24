import React, { useState, useEffect, useRef } from 'react'
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
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(`Key pressed: ${e.key}`);
      if (e.key === 'Escape') {
        console.log('Escape key pressed, closing modal.');
        closeModal();
      }
      if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        console.log('F key pressed. Iframe ref:', iframeRef.current);
        if (iframeRef.current) {
          iframeRef.current.focus();
          console.log('Focus method called on iframe.');
        } else {
          console.log('Iframe ref not found.');
        }
      }
    };
    if (modalSong) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalSong]);

  // Modal close handler
  const closeModal = () => setModalSong(null);

  return (
    <div className="w-full mx-auto p-2">
      {/* Header */}
        <div className="flex items-center justify-start gap-2 mb-8">
            <button className='py-2 px-6 bg-[#06f050] hover:bg-[#1af306de] text-slate-600 P-14 md:P-18 font-[500] rounded-[18px] transition-all duration-300'>All</button>
            {/* <button className='py-2 px-6 bg-[#06f050] hover:bg-[#1af306de] text-slate-600 P-14 md:P-18 font-[500] rounded-[20px] transition-all duration-300'>artist</button> */}
        </div>

      {/* Songs Grid */}
      <div className={`grid gap-3 ${isSmallMobile ? 'grid-cols-2' : isMobile ? 'grid-cols-3' : ''} md:grid-cols-4 xl:grid-cols-5 transition-all duration-300`}>
        {allSongs.map((song, index) => (
          <motion.div
            key={index}
            className='hover:shadow-lg p-2 rounded-[10px] transition-all duration-300'
          >
            <a href={song.url} onClick={e => { e.preventDefault(); setModalSong(song); }}>
                <div
                className={`group relative bg-transparent rounded-lg overflow-hidden transition-all duration-500`}
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
                    className="w-full object-cover rounded-t-lg shadow-lg transition-all duration-300"
                    />
                </div>
                </div>

                {/* Song Info */}
                <div className="flex flex-col justify-start py-2 px-1 transition-all duration-300">
                  <h3 className="font-bold P-16 lg:h-24-120 moodText-custom-color-text mb-1 truncate transition-all duration-300">
                      {song.name}
                  </h3>
                  <p className=".moodText-custom-color-text opacity-50 P-14 lg:h-20-120 mb-2 truncate transition-all duration-300">
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
          <div className="auth-custom-bg rounded-xl shadow-2xl px-6 py-6 max-w-xs md:max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-4 moodText-custom-color-text text-2xl" onClick={closeModal}>&times;</button>
            <h2 className="font-bold text-lg mb-2 text-center">{modalSong.name}</h2>
            <p className="text-center text-gray-500 mb-4">{modalSong.artist}</p>
            {/* Spotify Embed */}
            {modalSong.url && getSpotifyEmbedUrl(modalSong.url) && (
              <iframe
                ref={iframeRef}
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