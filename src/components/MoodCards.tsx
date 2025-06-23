'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

type Props = {
  onSelectMood: (mood: string) => void;
  resetSignal?: any;
};

const MoodCards: React.FC<Props> = ({ onSelectMood, resetSignal }) => {
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolling, setScrolling] = useState(true);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [frontIndex, setFrontIndex] = useState(0);
  const x = useMotionValue(0);

  type MoodName = 'happy' | 'sad' | 'angry' | 'calm' | 'energetic' | 'motivation' | 'romantic' | 'travel';

  const moods: { id: number; name: MoodName; image: string; description: string }[] = [
    {
      id: 1,
      name: 'happy',
      image: '/moods/happy2.jpg',
      description: 'Uplifting rhythms and cheerful beats to brighten your day.',
    },
    {
      id: 2,
      name: 'sad',
      image: '/moods/sad.jpg',
      description: 'Soft, emotional melodies for reflection and comfort.',
    },
    {
      id: 3,
      name: 'angry',
      image: '/moods/angry2.jpg',
      description: 'Intense sounds to channel your frustration and release energy.',
    },
    {
      id: 4,
      name: 'calm',
      image: '/moods/calm2.jpg',
      description: 'Soothing tunes to help you relax and unwind.',
    },
    {
      id: 5,
      name: 'energetic',
      image: '/moods/energetic.jpg',
      description: 'High-energy tracks to boost your motivation and mood.',
    },
    {
      id: 6,
      name: 'motivation',
      image: '/moods/motivation.jpg',
      description: 'Inspiring anthems to push you forward with confidence.',
    },
    {
      id: 7,
      name: 'romantic',
      image: '/moods/romantic1.jpg',
      description: 'Passionate melodies to set the mood for love.',
    },
    {
      id: 8,
      name: 'travel',
      image: '/moods/travel.jpg',
      description: 'Feel-good music for your next road trip or adventure.',
    },
  ];

  const colors: Record<MoodName, { color_from: string; color_via: string; color_to: string }> = {
    happy: {
      color_from: '#f68103',
      color_via: '#c79425',
      color_to: '#dcbe64',
    },
    sad: {
      color_from: '#2f2e2e',
      color_via: '#91908e',
      color_to: '#f4f3f2',
    },
    angry: {
      color_from: '#ed0f0f',
      color_via: '#fa5032',
      color_to: '#f48b7d',
    },
    calm: {
      color_from: '#584748',
      color_via: '#7d7373',
      color_to: '#b0afaf',
    },
    energetic: {
      color_from: '#00249e',
      color_via: '#5c14b5',
      color_to: '#c4319f',
    },
    motivation: {
      color_from: '#36365e',
      color_via: '#36575e',
      color_to: '#5e79a0',
    },
    romantic: {
      color_from: '#0785b7',
      color_via: '#c10b9f',
      color_to: '#da0642',
    },
    travel: {
      color_from: '#143255',
      color_via: '#769ABE',
      color_to: '#DCD5DC',
    }
  };

  // Duplicate the moods array to create seamless loop
  const duplicatedMoods = [...moods, ...moods];

  // Card width (should match the width in className)
  const CARD_WIDTH = 350 + 16; // 350px + gap (sm:gap-4 = 16px)

  // Auto-scroll functionality
  useEffect(() => {
    if (!containerRef.current) return;
    let isMounted = true;
    const container = containerRef.current;
    const scrollWidth = container.scrollWidth / 2;

    const scroll = async () => {
      while (isMounted) {
        await controls.start({
          x: direction === 'left' ? -scrollWidth : 0,
          transition: {
            duration: 50,
            ease: 'linear',
          },
        });
        controls.set({ x: direction === 'left' ? 0 : -scrollWidth });
      }
    };
    if (scrolling) scroll();
    return () => { isMounted = false; };
  }, [controls, direction, scrolling]);

  // Track the current front card index based on x
  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      // latest is negative as we scroll left
      const index = Math.abs(Math.round(latest / CARD_WIDTH)) % moods.length;
      setFrontIndex(index);
    });
    return () => unsubscribe();
  }, [x, moods.length]);

  // User control handlers
  const handleLeft = () => {
    setDirection('left');
  };
  const handleRight = () => {
    setDirection('right');
  };

  // Handle card click
  const handleSelectMood = (moodName: string) => {
    setSelectedMood(moodName);
    onSelectMood(moodName);
  };

  // Clear selectedMood when resetSignal changes
  useEffect(() => {
    setSelectedMood(null);
  }, [resetSignal]);

  return (
    <div className="relative">
      {/* Control buttons */}
      <div className="w-full justify-between absolute top-1/2 left-2 z-20 flex gap-2 px-4">
        <button
          onClick={handleLeft}
          className="bg-black/50 hover:bg-black/70 text-white px-2 py-1 rounded-full text-sm transition-all duration-200"
        >
          ◀
        </button>
        <button
          onClick={handleRight}
          className="bg-black/50 hover:bg-black/70 text-white px-2 py-1 rounded-full text-sm transition-all duration-200"
        >
          ▶
        </button>
      </div>
      <div className="overflow-hidden py-2 sm:py-4 px-2 sm:px-4">
        <motion.div
          ref={containerRef}
          animate={controls}
          className="flex gap-2 sm:gap-4"
          style={{ width: 'max-content', x }}
        >
          {duplicatedMoods.map((mood, index) => {
            const color = colors[mood.name];
            const isSelected = selectedMood === mood.name;
            return (
              <motion.div
                key={`${mood.id}-${index}`}
                onClick={() => handleSelectMood(mood.name)}
                style={{
                  background: `linear-gradient(135deg, ${color.color_from}, ${color.color_via}, ${color.color_to})`
                }}
                className={`relative flex-shrink-0 w-[90vw] max-w-[400px] sm:w-[350px] h-[300px] sm:h-[300px] rounded-[16px] overflow-hidden cursor-pointer transition-all duration-300 ${isSelected ? 'ring-2 ring-green-400 shadow-2xl' : ''}`}
                whileHover={{ 
                  scale: 1.001,
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
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
                    <motion.h2 
                      className="h-20-140 md:h-28-120 font-bold capitalize mb-1 sm:mb-2"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {mood.name}
                    </motion.h2>
                    <motion.p 
                      className="P-12 md:P-14 font-medium"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {mood.description}
                    </motion.p>
                  </div>
                </div>
                {isSelected && (
                  <div className="absolute inset-0 rounded-[16px] border-4 border-green-400 pointer-events-none"></div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      {/* Progress indicator */}
      <div className="flex justify-center mt-2">
        <div className="flex gap-1 items-center">
          {moods.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${frontIndex === index ? 'bg-green-500' : 'bg-gray-300'}`}
              animate={frontIndex === index ? { scale: 1.4, opacity: 1 } : { scale: 1, opacity: 0.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodCards;