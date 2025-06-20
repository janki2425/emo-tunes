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
              <Image src={song.albumArt} alt={song.name} width={16} height={16} className="w-16 h-16 rounded object-cover" />
            ) : (
              // <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center text-gray-400">
              //   <span>No Art</span>
              // </div>
              <Image src={'/EmoTunes-logo1.png'} alt={song.name} width={16} height={16} className="w-16 h-16 rounded object-cover" />
            )}
            <div className="flex-1">
              <div className="font-semibold text-gray-600 text-lg">{song.name}</div>
              <div className="text-gray-500 text-sm">{song.artist}</div>
            </div>
          </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SongList;
