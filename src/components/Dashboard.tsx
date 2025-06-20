'use client'
import React, { useState } from 'react'
import RandomSongs from './RandomSongs'
import MoodRecommender from './MoodRecommender'



const Dashboard = () => {
  const [isResultShown, setIsResultShown] = useState(false);
  const [searchMode, setSearchMode] = useState<'card' | 'text' | null>(null);
  const [noResults, setNoResults] = useState(false);
  

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
        {((!isResultShown && !searchMode) || noResults) && <RandomSongs />}
      </div>
    </div>
  )
}

export default Dashboard
