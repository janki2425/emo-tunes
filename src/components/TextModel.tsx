'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

type Props = {
  onTextSubmit: (text: string) => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
};

const MoodTextInput: React.FC<Props> = ({ onTextSubmit, text, setText, onClose }) => {
  const {theme} = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (text.trim()) {
        onTextSubmit(text);
      }
    }
  };

  return (
    <div className="relativ w-full flex mx-auto bg-transparent rounded-xl transition-all duration-300">
      <textarea
        placeholder="I'm feeling excited about the weekend... or maybe a bit nostalgic about old memories..."
        className={`w-full p-2 h-[100px] moodText-custom-color-bg rounded-xl border-2 transition-all duration-200 outline-none resize-none `}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        maxLength={500}
      />
      <button 
        onClick={onClose}
        className=" w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        aria-label="Close"
      >
        <Image src={'/close.svg'} width={16} height={16} alt='close' className={`${theme === 'dark' ? 'invert' : ''}`}/>
      </button>
    </div>
  );
};

export default MoodTextInput;
