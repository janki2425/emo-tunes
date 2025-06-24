'use client'
import React, { useState } from 'react'
import RandomSongs from './RandomSongs'
import MoodRecommender from './MoodRecommender'
import MoodTextInput from './TextModel'

const Dashboard = () => {
  const [isResultShown, setIsResultShown] = useState(false);
  const [searchMode, setSearchMode] = useState<'card' | 'text' | null>(null);
  const [noResults, setNoResults] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  return (
    <div className='w-full min-h-auto'>
      <div className='w-full min-h-dvh max-w-[1440px] mx-auto'>
        <MoodRecommender
          isResultShown={isResultShown}
          setIsResultShown={setIsResultShown}
          searchMode={searchMode}
          setSearchMode={setSearchMode}
          noResults={noResults}
          setNoResults={setNoResults}
        />
        <RandomSongs />
     
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-700 z-10"
            >
              &times;
            </button>
            <div className="pt-8">
              <MoodTextInput
                onTextSubmit={(t) => {setSearchOpen(false)}}
                text={searchText}
                setText={setSearchText}
                onClose={() => setSearchOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Dashboard
