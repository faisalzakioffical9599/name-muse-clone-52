
import { useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AlphabetNav from "./AlphabetNav";

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className = "" }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string>("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger search functionality
    console.log("Searching for:", searchTerm);
  };
  
  const handleClear = () => {
    setSearchTerm("");
  };
  
  // Handle letter selection from AlphabetNav
  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter);
    setSearchTerm(prev => `${letter}`);
  };

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="flex">
          <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
            <PopoverTrigger asChild>
              <Button 
                type="button" 
                variant="outline" 
                className="rounded-r-none border-r-0"
                aria-label="Filter search"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h3 className="font-medium">Filter By</h3>
                
                {/* Gender Filter */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Gender</h4>
                  <RadioGroup defaultValue="all">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="gender-all" />
                      <Label htmlFor="gender-all">All</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="boy" id="gender-boy" />
                      <Label htmlFor="gender-boy">Boy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="girl" id="gender-girl" />
                      <Label htmlFor="gender-girl">Girl</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Religion Filter */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Religion</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="religion-christian" />
                      <Label htmlFor="religion-christian">Christian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="religion-muslim" />
                      <Label htmlFor="religion-muslim">Muslim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="religion-hindu" />
                      <Label htmlFor="religion-hindu">Hindu</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="religion-jewish" />
                      <Label htmlFor="religion-jewish">Jewish</Label>
                    </div>
                  </div>
                </div>
                
                {/* Origin Filter */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Origin</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="origin-arabic" />
                      <Label htmlFor="origin-arabic">Arabic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="origin-english" />
                      <Label htmlFor="origin-english">English</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="origin-indian" />
                      <Label htmlFor="origin-indian">Indian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="origin-hebrew" />
                      <Label htmlFor="origin-hebrew">Hebrew</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Apply Filters</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search for names..."
              className="rounded-l-none h-10 pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={handleClear}
              >
                <X size={16} />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </form>
      
      <div className="mt-4">
        <AlphabetNav onLetterSelect={handleLetterSelect} selectedLetter={selectedLetter} />
      </div>
    </div>
  );
};

export default SearchBar;
