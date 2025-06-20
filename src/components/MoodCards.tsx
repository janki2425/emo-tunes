'use client'
import React from 'react';
import Image from 'next/image';

type Props = {
  onSelectMood: (mood: string) => void;
};

const MoodCards: React.FC<Props> = ({ onSelectMood }) => {
  // same mood array and color map...
  type MoodName = 'happy' | 'sad' | 'angry' | 'calm' | 'energetic' | 'motivation' | 'romantic' | 'travel';

    const moods: { id: number; name: MoodName; image: string; description:string }[] = [
    {
        id: 1,
        name: 'happy',
        image: '/moods/happy2.jpg',
        description: 'Uplifting rhythms and cheerful beats to brighten your day.',
    },
    {
        id:2,
        name: 'sad',
        image: '/moods/sad.jpg',
        description: 'Soft, emotional melodies for reflection and comfort.',
    },
    {
        id:3,
        name: 'angry',
        image: '/moods/angry2.jpg',
        description: 'Intense sounds to channel your frustration and release energy.',
    },
    {
        id:4,
        name: 'calm',
        image: '/moods/calm2.jpg',
        description: 'Soothing tunes to help you relax and unwind.',
    },
    {
        id:5,
        name: 'energetic',
        image: '/moods/energetic.jpg',
        description: 'High-energy tracks to boost your motivation and mood.',
    },
    {
        id:6,
        name: 'motivation',
        image: '/moods/motivation.jpg',
        description: 'Inspiring anthems to push you forward with confidence.',
    },
    {
        id:7,
        name: 'romantic',
        image: '/moods/romantic1.jpg',
        description: 'Passionate melodies to set the mood for love.',
    },
    {
        id:8,
        name: 'travel',
        image: '/moods/travel.jpg',
        description: 'Feel-good music for your next road trip or adventure.',
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

  return (
    <div className="flex overflow-x-auto gap-2 sm:gap-4 scroll-smooth no-scrollbar py-2 sm:py-4 px-2 sm:px-4">
      {moods.map((mood) => {
        const color = colors[mood.name];
        return (
          <div
            key={mood.id}
            onClick={() => onSelectMood(mood.name)}
            style={{
              background: `linear-gradient(135deg, ${color.color_from}, ${color.color_via}, ${color.color_to})`
            }}
            className={
              'relative flex-shrink-0 w-[90vw] max-w-[400px] sm:w-[350px] md:w-[400px] lg:w-[450px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-[16px] overflow-hidden cursor-pointer transition-all duration-300'
            }
          >
            <div className='flex h-full relative'>
              <div className='w-full relative opacity-40'>
                <Image
                  src={mood.image}
                  fill
                  alt={mood.name}
                  className='object-cover aspect-auto rounded-[16px]'
                />
              </div>
              <div className="absolute z-15 p-3 sm:p-6 flex flex-col justify-end h-full text-white w-full">
                <h2 className="h-24-140 sm:h-36-140 md:h-48-120 font-bold capitalize mb-1 sm:mb-2">{mood.name}</h2>
                <p className="P-14 sm:P-16 md:P-20 font-medium">{mood.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MoodCards;
