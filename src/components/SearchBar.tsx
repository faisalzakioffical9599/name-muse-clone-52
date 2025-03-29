
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import SearchFilter, { FilterOptions } from "./SearchFilter";

export interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (searchTerm: string, filters: FilterOptions) => void;
}

const SearchBar = ({ 
  className, 
  placeholder = "Search names...",
  onSearch 
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    gender: "all",
    sortBy: "alphabetical-asc"
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search logic would be implemented here
    console.log("Searching for:", searchTerm, "with filters:", filters);
    if (onSearch) {
      onSearch(searchTerm, filters);
    }
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    console.log("Filters updated:", newFilters);
    // Could trigger search automatically if desired
    if (onSearch && searchTerm) {
      onSearch(searchTerm, newFilters);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSearch} className="flex flex-col space-y-2">
        <div className="relative">
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-12"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-0 top-0 h-full rounded-l-none"
            aria-label="Search"
          >
            <Search size={18} />
          </Button>
        </div>
        <div className="flex justify-end">
          <SearchFilter onFilterChange={handleFilterChange} />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
