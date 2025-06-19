import React, { useRef, useState } from 'react'
import { SongListProps } from '@/types/songs';
import Image from 'next/image';

const SongList: React.FC<SongListProps> = ({ songs }) => {
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const handlePlay = (idx: number) => {
    // Pause any other playing audio
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== idx) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    // Play selected audio
    const audio = audioRefs.current[idx];
    if (audio) {
      audio.play();
      setPlayingIdx(idx);
    }
  };

  const handlePause = (idx: number) => {
    const audio = audioRefs.current[idx];
    if (audio) {
      audio.pause();
      setPlayingIdx(null);
    }
  };

  if (!songs || songs.length === 0) return null;
  return (
    <div className="w-full max-w-[1400px] mt-8 mx-auto">
      <div className='flex flex-col gap-6'>
        {songs.map((song, idx) => (
          <div key={idx} className="w-full bg-white rounded-lg shadow p-4 flex items-center gap-4">
            {song.albumArt ? (
              <img src={song.albumArt} alt={song.name} className="w-16 h-16 rounded object-cover" />
            ) : (
              <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center text-gray-400">
                <span>No Art</span>
              </div>
            )}
            <div className="flex-1">
              <div className="font-semibold text-gray-600 text-lg">{song.name}</div>
              <div className="text-gray-500 text-sm">{song.artist}</div>
              {/* {song.spotifyUrl && (
                    <a href={song.spotifyUrl} target="_blank" rel="noopener noreferrer">
                    <span className="text-green-600 text-sm underline mt-1 inline-block">Listen on Spotify</span>
                    </a>
                )} */}
            </div>
            <div className='p-2 items-center flex'>
              {song.previewUrl && (
                <>
                  <audio
                    ref={el => { audioRefs.current[idx] = el; }}
                    src={song.previewUrl}
                    onEnded={() => setPlayingIdx(null)}
                    style={{ display: 'none' }}
                  />
                  <button
                    onClick={() =>
                      playingIdx === idx
                        ? handlePause(idx)
                        : handlePlay(idx)
                    }
                    className="focus:outline-none transition-all duration-300"
                  >
                    <Image
                      src={
                        playingIdx === idx
                          ? '/moods/songs/pause.svg'
                          : '/moods/songs/play.svg'
                      }
                      width={32}
                      height={32}
                      alt={playingIdx === idx ? 'Pause' : 'Play'}
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
