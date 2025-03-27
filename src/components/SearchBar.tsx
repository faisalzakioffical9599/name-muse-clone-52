
import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ placeholder = "Search for names...", className = "" }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Searching for:", query);
      // Handle search submission (e.g. redirect to search results page)
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative w-full max-w-2xl mx-auto ${className}`}
    >
      <div 
        className={`flex items-center bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
          isFocused 
            ? "shadow-lg border-primary/20" 
            : "shadow-md hover:shadow-lg border-transparent"
        }`}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 py-4 px-6 outline-none text-foreground placeholder:text-muted-foreground bg-transparent"
          placeholder={placeholder}
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-4 h-full flex items-center justify-center transition-colors duration-200"
        >
          <Search size={20} />
          <span className="ml-2 font-medium">Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
