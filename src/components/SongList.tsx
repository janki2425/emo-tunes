import React, { useState } from 'react'
import { SongListProps } from '@/types/songs';
import Image from 'next/image';

const getSpotifyEmbedUrl = (url: string): string | null => {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  if (match) {
    return `https://open.spotify.com/embed/track/${match[1]}`;
  }
  return null;
};

const SongList: React.FC<SongListProps> = ({ songs }) => {
  const [modalSong, setModalSong] = useState<any | null>(null);
  if (!songs || songs.length === 0) return null;
  const closeModal = () => setModalSong(null);
  return (
    <div className="w-full max-w-[1400px] mx-auto">
      <div className='flex flex-col gap-6'>
        {songs.slice(1,10).map((song, idx) => (
          <a key={idx} href={song.spotifyUrl} onClick={e => { e.preventDefault(); setModalSong(song); }}>
            <div className="moodText-custom-color-bg w-full rounded-lg shadow p-4 flex items-center gap-4 transition-all duration-300">
            {song.albumArt ? (
              <Image src={song.albumArt} alt={song.name} width={16} height={16} className="w-10 md:w-16 h-10 md:h-16 rounded object-cover transition-all duration-300" />
            ) : (
              <Image src={'/EmoTunes-logo1.png'} alt={song.name} width={16} height={16} className="w-10 md:w-16 h-10 md:h-16 rounded object-cover transition-all duration-300" />
            )}
            <div className="flex-1">
              <div className="moodText-custom-color-text font-semibold P-12 md:P-18 transition-all duration-300">{song.name}</div>
              <div className="moodText-custom-color-text P-10 md:P-14 transition-all duration-300">{song.artist}</div>
            </div>
          </div> 
          </a>
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
            {modalSong.spotifyUrl && getSpotifyEmbedUrl(modalSong.spotifyUrl) && (
              <iframe
                src={getSpotifyEmbedUrl(modalSong.spotifyUrl) as string}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded mb-4"
                title="Spotify Player"
              ></iframe>
            )}
            {modalSong.spotifyUrl && !getSpotifyEmbedUrl(modalSong.spotifyUrl) && (
              <div className="text-center text-gray-400 mb-4">No Spotify preview available.</div>
            )}
            <a
              href={modalSong.spotifyUrl}
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
  );
};

export default SongList;
