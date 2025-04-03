
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

interface EnhancedAlphabetNavProps {
  selectedLetter: string;
  onLetterSelect: (letter: string) => void;
  className?: string;
  showCount?: boolean;
  letterCounts?: Record<string, number>;
}

const EnhancedAlphabetNav = ({ 
  selectedLetter,
  onLetterSelect,
  className,
  showCount = false,
  letterCounts = {}
}: EnhancedAlphabetNavProps) => {
  // Array of alphabets
  const alphabets = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  return (
    <nav className={cn("overflow-x-auto", className)}>
      <div className="flex justify-center mb-6 flex-wrap">
        <TooltipProvider>
          {alphabets.map(letter => {
            const count = letterCounts[letter] || 0;
            const isActive = selectedLetter === letter;
            const hasNames = count > 0 || !showCount;
            
            return (
              <Tooltip key={letter}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => hasNames && onLetterSelect(letter)}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mx-1 mb-2 transition-colors text-sm font-medium",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : hasNames
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-gray-50 text-gray-400 cursor-not-allowed"
                    )}
                    disabled={!hasNames}
                  >
                    {letter}
                  </button>
                </TooltipTrigger>
                {showCount && (
                  <TooltipContent>
                    <p className="text-xs">{count} names</p>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default EnhancedAlphabetNav;
