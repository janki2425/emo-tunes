'use client'
import React from 'react'
import MoodCards from './MoodCards'
import MoodText from './MoodText'

const Dashboard = () => {
  return (
    <div className='w-full min-h-auto'>
      <div className='w-full min-h-dvh max-w-[1440px] mx-auto'>
        <MoodCards/>
        <MoodText/>
      </div>
    </div>
  )
}

export default Dashboard
