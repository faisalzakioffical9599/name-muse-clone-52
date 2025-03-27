
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ placeholder = "Search for names...", className = "" }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [country, setCountry] = useState("");
  const [religion, setReligion] = useState("");
  const [language, setLanguage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Searching for:", query, { country, religion, language });
      // Handle search submission (e.g. redirect to search results page)
    }
  };

  // Mock data for filter options
  const countries = [
    { value: "indian", label: "Indian" },
    { value: "arabic", label: "Arabic" },
    { value: "english", label: "English" },
    { value: "hebrew", label: "Hebrew" },
    { value: "greek", label: "Greek" },
  ];

  const religions = [
    { value: "islam", label: "Islamic" },
    { value: "christianity", label: "Christian" },
    { value: "hinduism", label: "Hindu" },
    { value: "judaism", label: "Jewish" },
    { value: "buddhism", label: "Buddhist" },
  ];

  const languages = [
    { value: "arabic", label: "Arabic" },
    { value: "english", label: "English" },
    { value: "sanskrit", label: "Sanskrit" },
    { value: "hebrew", label: "Hebrew" },
    { value: "greek", label: "Greek" },
  ];

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <form 
        onSubmit={handleSubmit}
        className="relative w-full"
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
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 text-gray-500 hover:text-gray-700"
            aria-label="Toggle filters"
          >
            <Filter size={20} />
          </button>
          <button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-4 h-full flex items-center justify-center transition-colors duration-200"
          >
            <Search size={20} />
            <span className="ml-2 font-medium">Search</span>
          </button>
        </div>
        
        {/* Filters section */}
        {showFilters && (
          <div className="mt-3 p-4 bg-white rounded-xl shadow-md animate-fade-in grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">Country</label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any country</SelectItem>
                  {countries.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">Religion</label>
              <Select value={religion} onValueChange={setReligion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a religion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any religion</SelectItem>
                  {religions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any language</SelectItem>
                  {languages.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
