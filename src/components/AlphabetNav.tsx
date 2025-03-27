
import { useState } from "react";

interface AlphabetNavProps {
  onLetterSelect: (letter: string) => void;
  selectedLetter?: string;
}

const AlphabetNav = ({ onLetterSelect, selectedLetter }: AlphabetNavProps) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  return (
    <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-8">
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => onLetterSelect(letter)}
          className={`h-9 w-9 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 ${
            selectedLetter === letter
              ? "bg-primary text-primary-foreground shadow-md" 
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default AlphabetNav;
