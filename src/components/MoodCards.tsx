'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import axiosInstance from '@/app/api/axiosInstance';
import SongList from './SongList';

type MoodName = 'happy' | 'sad' | 'angry' | 'calm' | 'energetic' | 'motivation' | 'romantic' | 'travel';

const moods: { id: number; name: MoodName; image: string }[] = [
  {
    id: 1,
    name: 'happy',
    image: '/moods/happy.jpg',
  },
  {
    id:2,
    name: 'sad',
    image: '/moods/sad.jpg',
  },
  {
    id:3,
    name: 'angry',
    image: '/moods/angry2.jpg',
  },
  {
    id:4,
    name: 'calm',
    image: '/moods/calm2.jpg',
  },
  {
    id:5,
    name: 'energetic',
    image: '/moods/energetic.jpg',
  },
  {
    id:6,
    name: 'motivation',
    image: '/moods/motivation.jpg',
  },
  {
    id:7,
    name: 'romantic',
    image: '/moods/romantic1.jpg',
  },
  {
    id:8,
    name: 'travel',
    image: '/moods/travel.jpg',
  },
];

const colors: Record<MoodName, { color_from: string; color_via: string; color_to: string }> = {
    happy:{
        color_from:'#f68103',
        color_via:'#c79425',
        color_to:'#dcbe64',
    },
    sad:{
        color_from:'#2f2e2e',
        color_via:'#91908e',
        color_to:'#f4f3f2',
    },
    angry:{
        color_from:'#ed0f0f',
        color_via:'#fa5032',
        color_to:'#f48b7d',
    },
    calm:{
        color_from:'#584748',
        color_via:'#7d7373',
        color_to:'#b0afaf',
    },
    energetic:{
        color_from:'#00249e',
        color_via:'#5c14b5',
        color_to:'#c4319f',
    },
    motivation:{
        color_from:'#36365e',
        color_via:'#36575e',
        color_to:'#5e79a0',
    },
    romantic:{
        color_from:'#0785b7',
        color_via:'#c10b9f',
        color_to:'#da0642',
    },
    travel:{
        color_from:'#143255',
        color_via:'#769ABE',
        color_to:'#DCD5DC',
    }
}

const MoodCards = () => {
    const [songs, setSongs] = useState<any[]>([]);

    const [emblaRef, embla] = useEmblaCarousel({
        loop:true,
        align:'start',
        slidesToScroll:1
    })
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

    const onSelect = useCallback(() => {
      if (!embla) return
      setPrevBtnEnabled(embla.canScrollPrev())
      setNextBtnEnabled(embla.canScrollNext())
    }, [embla])

    useEffect(() => {
      if (!embla) return
      onSelect()
      embla.on('select', onSelect)
      embla.on('reInit', onSelect)
      return () => {
        embla.off('select', onSelect)
        embla.off('reInit', onSelect)
      }
    }, [embla, onSelect])

    const getMoodMusic = async (mood: MoodName) => {
      try {
        const response = await axiosInstance.get(`/api/suggest-songs/${mood}`);
        if (response && response.data) {
          setSongs(response.data.tracks);
          console.log('song type : ',response.data.tracks);
          console.log('song preview : ----------',response.data.tracks.previewUrl);
          
          
        }
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className='w-full max-w-[1440px] h-[550px] mx-auto'>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {moods.map((mood) => {
            const color = colors[mood.name];
            return (
              <div
                key={mood.id}
                onClick={() => getMoodMusic(mood.name)}
                style={{
                  background: `linear-gradient(135deg, ${color.color_from}, ${color.color_via}, ${color.color_to})`
                }}
                className={
                  'relative flex-[0_0_100%] min-w-0 h-[550px]'
                }
              >
                <div className='flex h-full'>
                    {/* <div className='absolute top-1/2 left-1/8 flex items-center justify-center'>
                        <h2 className='text-4xl font-bold capitalize'>{mood.name}</h2>
                    </div> */}
                  <div className='w-full relative opacity-40'>
                    <Image
                      src={mood.image}
                      fill
                      alt={mood.name}
                      className='object-cover aspect-auto'
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white/40 rounded-full p-2 shadow hover:bg-white dark:hover:bg-black transition disabled:opacity-40"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        aria-label="Previous slide"
      >
        <Image src={'moods/navigate/prev.svg'} width={24} height={24} alt='prev'/>
      </button>
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white/40 rounded-full p-2 shadow hover:bg-white dark:hover:bg-black transition disabled:opacity-40"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        aria-label="Next slide"
      >
        <Image src={'moods/navigate/next.svg'} width={24} height={24} alt='next'/>
      </button>

      {/* Song List */}
      <SongList songs={songs} />
    </div>
  )
}

export default MoodCards
