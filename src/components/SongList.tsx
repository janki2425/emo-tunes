import React from 'react'
import { SongListProps } from '@/types/songs';
import Image from 'next/image';

const SongList: React.FC<SongListProps> = ({ songs }) => {

  if (!songs || songs.length === 0) return null;
  return (
    <div className="w-full max-w-[1400px] mx-auto">
      <div className='flex flex-col gap-6'>
        {songs.slice(1,10).map((song, idx) => (
          <a key={idx}  href={song.spotifyUrl}>
            <div className="w-full bg-white rounded-lg shadow p-4 flex items-center gap-4">
            {song.albumArt ? (
              <Image src={song.albumArt} alt={song.name} width={16} height={16} className="w-10 md:w-16 h-10 md:h-16 rounded object-cover transition-all duration-300" />
            ) : (
              <Image src={'/EmoTunes-logo1.png'} alt={song.name} width={16} height={16} className="w-10 md:w-16 h-10 md:h-16 rounded object-cover transition-all duration-300" />
            )}
            <div className="flex-1">
              <div className="font-semibold text-gray-600 P-12 md:P-18 transition-all duration-300">{song.name}</div>
              <div className="text-gray-500 P-10 md:P-14 transition-all duration-300">{song.artist}</div>
            </div>
          </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SongList;
