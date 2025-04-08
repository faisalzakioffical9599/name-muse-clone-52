
import { useState } from "react";
import { Heart, Info, Globe, Church, Languages, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NameCardProps {
  id: string | number;  // Changed to accept either string or number
  name: string;
  meaning: string;
  gender: "boy" | "girl" | "unisex";
  popularity?: number;
  origin?: string;
  religion?: string;
  language?: string;
  featured?: boolean;
  trending?: boolean;
}

const NameCard = ({ 
  id, 
  name, 
  meaning, 
  gender, 
  popularity, 
  origin, 
  religion, 
  language,
  featured = false,
  trending = false
}: NameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const genderColors = {
    boy: "bg-blue-50 border-blue-100",
    girl: "bg-pink-50 border-pink-100",
    unisex: "bg-purple-50 border-purple-100"
  };

  const genderTextColors = {
    boy: "text-blue-600",
    girl: "text-pink-600",
    unisex: "text-purple-600"
  };

  return (
    <div 
      className={cn(
        "relative rounded-xl overflow-hidden bg-white transition-all duration-300 border shadow-sm",
        isHovered ? "translate-y-[-4px] shadow-md border-primary/20" : "border-gray-100",
        featured ? "ring-2 ring-primary/30 ring-offset-2" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Star className="h-3 w-3 mr-1 fill-white" />
            Featured
          </span>
        </div>
      )}
      
      {/* Trending Badge */}
      {trending && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Star className="h-3 w-3 mr-1" />
            Trending
          </span>
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsFavorited(!isFavorited);
        }}
        className={cn(
          "absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-200 z-10",
          isFavorited 
            ? "bg-red-50 text-red-500" 
            : "bg-gray-100 text-gray-400 hover:text-gray-500"
        )}
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart 
          size={16} 
          className={isFavorited ? "fill-red-500" : ""} 
        />
      </button>

      <Link to={`/name/${id}`} className="block p-5">
        {/* Gender Badge */}
        <div className={cn(
          "inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide mb-3",
          genderColors[gender],
          genderTextColors[gender]
        )}>
          {gender}
        </div>
        
        {/* Name */}
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{name}</h3>
        
        {/* Meaning */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{meaning}</p>
        
        {/* Details */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
          {origin && (
            <span className="bg-gray-100 px-2 py-1 rounded-md flex items-center">
              <Globe className="h-3 w-3 mr-1" />
              {origin}
            </span>
          )}
          {religion && (
            <span className="bg-gray-100 px-2 py-1 rounded-md flex items-center">
              <Church className="h-3 w-3 mr-1" />
              {religion}
            </span>
          )}
          {language && (
            <span className="bg-gray-100 px-2 py-1 rounded-md flex items-center">
              <Languages className="h-3 w-3 mr-1" />
              {language}
            </span>
          )}
          {popularity && (
            <span className="bg-gray-100 px-2 py-1 rounded-md">
              Popularity: {popularity}
            </span>
          )}
        </div>
      </Link>
      
      {/* View Details Button */}
      <div 
        className={cn(
          "p-3 border-t border-gray-100 flex justify-center transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-70"
        )}
      >
        <Link 
          to={`/name/${id}`}
          className="text-primary text-sm font-medium flex items-center hover:underline"
        >
          <Info size={14} className="mr-1" />
          View full details
        </Link>
      </div>
    </div>
  );
};

export default NameCard;

export type { NameCardProps };
