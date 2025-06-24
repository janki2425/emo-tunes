'use client';
import React, { useState } from 'react';
import axiosInstance from '@/app/api/axiosInstance';
import MoodCards from './MoodCards';
import MoodText from './MoodText';
import SongList from './SongList';
import SkeletonLoader from './SkeletonLoader';
import { MoodRecommenderProps } from '@/types/songs'; 

const MIN_LOADING_TIME = 1000;

const MoodRecommender: React.FC<MoodRecommenderProps> = ({
  isResultShown,
  setIsResultShown,
  searchMode,
  setSearchMode,
  noResults,
  setNoResults,
}) => {
  const [songs, setSongs] = useState<any[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);

  const getMoodMusic = async (mood: string) => {
    setSearchMode('card');
    setSelectedMood(mood);
    setSongs([]);
    setLoading(true);
    const start = Date.now();

    try {
      const res = await axiosInstance.get(`/api/suggest-songs/${mood}`);
      setSongs(res.data.tracks || []);
      setIsResultShown((res.data.tracks || []).length > 0);
      if (res.data.tracks && res.data.tracks.length > 0) {
        console.log(res.data.tracks[0].artist);
      }
      if ((res.data.tracks || []).length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (error) {
      setSongs([]);
      setIsResultShown(false);
      setNoResults(true);
    }

    const elapsed = Date.now() - start;
    if (elapsed < MIN_LOADING_TIME) {
      setTimeout(() => setLoading(false), MIN_LOADING_TIME - elapsed);
    } else {
      setLoading(false);
    }
  };

  const getTextBasedMusic = async (inputText: string) => {
    if (!inputText.trim()) return;
    setSearchMode('text');
    setSelectedMood(null);
    setSongs([]);
    setLoading(true);
    const start = Date.now();

    try {
      const res = await axiosInstance.post(`/api/suggest-songs-by-text`, { text: inputText });
      setSongs(res.data.tracks || []);
      setIsResultShown((res.data.tracks || []).length > 0);
      if (res.data.tracks && res.data.tracks.length > 0) {
        console.log(res.data.tracks[0].artist);
      }
      if ((res.data.tracks || []).length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (error) {
      setSongs([]); // No results
      setIsResultShown(false);
      setNoResults(true);
    }

    const elapsed = Date.now() - start;
    if (elapsed < MIN_LOADING_TIME) {
      setTimeout(() => setLoading(false), MIN_LOADING_TIME - elapsed);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto mt-[50px] pb-[40px] px-2 sm:px-4 space-y-4 sm:space-y-6">
      {/* Desktop & tablet: show cards and text input as before */}
      <div className={isResultShown ? 'hidden md:block' : ''}>
        <h3 className='P-18 md:h-24-120 font-[600] pt-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent'>CHOOSE YOUR MOOD {'~'}</h3>
        <MoodCards onSelectMood={getMoodMusic} resetSignal={resetSignal} />
      </div>

      <div className={`flex-col md:flex-row gap-4 sm:gap-6 ${isResultShown ? 'hidden md:flex' : 'flex'}`}>
        <div className={`${isResultShown ? 'md:w-1/4' : 'w-full'} transition-all duration-300`}>
          <MoodText onTextSubmit={getTextBasedMusic} text={text} setText={setText} />
        </div>
        {/* Desktop/tablet: show results in split view */}
        {(searchMode === 'card' || searchMode === 'text') && (
          <div className="md:w-3/4 transition-all duration-300 hidden md:block">
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
