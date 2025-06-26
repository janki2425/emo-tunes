import React, { useState } from 'react';
import { useSearch } from '@/context/SearchContext';
import MoodTextInput from './TextModel';
import { useRouter } from 'next/navigation';

const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen } = useSearch();
  const [text, setText] = useState('');
  const router = useRouter();

  if (!isSearchOpen) return null;

  const handleTextSubmit = (inputText: string) => {
    if (inputText.trim()) {
      router.push(`/songs?q=${encodeURIComponent(inputText)}`);
    }
    setIsSearchOpen(false);
    setText('');
  };

  return (
    <div className="fixed w-full inset-0 z-[9999] flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="relative w-full max-w-lg mx-auto">
        {/* <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-2 right-2 text-2xl text-gray-700 z-10"
        >
          &times;
        </button> */}
        <div className="pt-8">
          <MoodTextInput
            onTextSubmit={handleTextSubmit}
            text={text}
            setText={setText}
            onClose={() => setIsSearchOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchModal; 