'use client';
import React, { useState } from 'react';
import axiosInstance from '@/app/api/axiosInstance';
import MoodCards from './MoodCards';
import MoodText from './TextModel';
import SongList from './SongList';
import SkeletonLoader from './SkeletonLoader';
import { MoodRecommenderProps } from '@/types/songs'; 
import { useRouter } from 'next/navigation';
import { useSearch } from '@/context/SearchContext';

const MIN_LOADING_TIME = 1000;

const MoodRecommender: React.FC<MoodRecommenderProps> = ({
  isResultShown,
  setIsResultShown,
  searchMode,
  setSearchMode,
  noResults,
  setNoResults,
}) => {
  const router = useRouter();
  const { isSearchOpen, setIsSearchOpen } = useSearch();
  const [songs, setSongs] = useState<any[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);

  const getMoodMusic = (mood: string) => {
    router.push(`/songs?mood=${encodeURIComponent(mood)}`);
  };

  const handleTextSearch = (inputText: string) => {
    if (!inputText.trim()) return;
    router.push(`/songs?q=${encodeURIComponent(inputText)}`);
    setIsSearchOpen(false);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchMode(null);
    setResetSignal(rs => rs + 1);
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto mt-[35px] md:mt-[50px] pb-[40px] px-2 sm:px-4 space-y-4 sm:space-y-6">
      <div className={isResultShown ? 'hidden' : 'block'}>

        {isSearchOpen && (
          <div className="mb-8">
            <MoodText
              onTextSubmit={handleTextSearch}
              text={text}
              setText={setText}
              onClose={handleCloseSearch}
            />
          </div>
        )}

        <h3 className='P-18 md:h-24-120 font-[600] pt-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent'>
          CHOOSE YOUR MOOD {'~'}
        </h3>
        <MoodCards onSelectMood={getMoodMusic} resetSignal={resetSignal} />
      </div>

      {/* Mobile: show SongList full screen with back button */}
      {(searchMode === 'card' || searchMode === 'text') && (
        <div className="block md:hidden">
          {songs.length > 0 && (
            <button
              className="my-4 px-4 py-2 P-12 md:P-18 rounded-lg bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              onClick={() => { setSongs([]); setSearchMode(null); setSelectedMood(null); setText(''); setIsResultShown(false); setNoResults(false); setResetSignal(rs => rs + 1); }}
            >
              ← Back to Search
            </button>
          )}
          {loading ? (
            <SkeletonLoader count={5} />
          ) : songs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <span className="text-5xl mb-4">😕</span>
              <p className="text-lg font-semibold">No songs found for your search.</p>
              <p className="text-sm">Try a different mood or description!</p>
            </div>
          ) : (
            <SongList songs={songs} />
          )}
        </div>
      )}

      {/* Add a reset button if either mode is active (desktop only) */}
      {searchMode && songs.length > 0 && (
        <div className="justify-center pt-4 hidden md:flex">
          <button
            className="px-6 py-2 rounded-lg P-12 md:P-18 bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            onClick={() => { setSearchMode(null); setSelectedMood(null); setSongs([]); setText(''); setIsResultShown(false); setNoResults(false); setResetSignal(rs => rs + 1); }}
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default MoodRecommender;
