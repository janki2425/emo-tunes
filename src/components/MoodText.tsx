'use client'
import React, { useState } from 'react';

type Props = {
  onTextSubmit: (text: string) => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const MoodTextInput: React.FC<Props> = ({ onTextSubmit, text, setText }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full">
      <div className="mb-6 text-center"> 
        <h2 className="h-20-120 md:h-24-120 font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2 transition-all duration-300">
          How are you feeling?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 P-12 md:P-14 px-4 md:px-0 transition-all duration-300">
          Share your mood and discover music that matches your vibe
        </p>
      </div>
      <div className="relative group">
        {/* Animated border gradient */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 ${isFocused ? 'opacity-100' : ''} transition-opacity duration-300 blur-sm`}></div>
        
        {/* Main input container */}
        <div className="relative moodText-custom-color-bg rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300">
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-4 left-4 w-2 h-2 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-8 right-6 w-1 h-1 bg-pink-400 rounded-full opacity-30 animate-pulse delay-100"></div>
            <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-25 animate-pulse delay-200"></div>
          </div>

          <textarea
            placeholder="I'm feeling excited about the weekend... or maybe a bit nostalgic about old memories..."
            className={`w-full h-[120px] md:h-[180px] p-6 bg-transparent moodText-custom-color-text moodText-custom-color-bg border-none outline-none resize-none P-16 md:P-18 leading-relaxed transition-all duration-300 ${isFocused ? 'placeholder-gray-400 dark:placeholder-gray-500' : ''}`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={500}
          />

          {/* Character count */}
          <div className="absolute bottom-4 right-6 text-xs text-gray-400 dark:text-gray-500">
            {text.length}/500
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 relative">
        <button
          onClick={() => onTextSubmit(text)}
          disabled={!text.trim()}
          className={`w-full py-3 md:py-4 px-8 rounded-2xl font-semibold P-12 md:P-18 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
            text.trim() 
              ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25' 
              : 'moodText-custom-color-text moodText-custom-color-bg moodText-custom-border cursor-not-allowed'
          }`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span>🎵</span>
            Find My Perfect Songs
            <span>🎵</span>
          </span>
          
          {/* Button glow effect */}
          {text.trim() && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
          )}
        </button>
      </div>
      {/* <textarea
        placeholder="Describe how you're feeling..."
        className="w-full h-[150px] p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => onTextSubmit(text)}
        className="mt-2 w-full py-2 px-4 rounded-lg bg-[#265767] text-white font-semibold hover:bg-[#1a3d4a] transition"
      >
        Find Songs
      </button> */}
    </div>
  );
};

export default MoodTextInput;
