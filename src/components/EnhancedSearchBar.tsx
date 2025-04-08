
import { useState, useEffect } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchFilter, { FilterOptions } from "./SearchFilter";

export interface EnhancedSearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch: (searchTerm: string, filters: FilterOptions) => void;
  initialSearchTerm?: string;
  initialFilters?: FilterOptions;
}

const EnhancedSearchBar = ({ 
  className, 
  placeholder = "Search names...",
  onSearch,
  initialSearchTerm = "",
  initialFilters = {
    gender: "all",
    sortBy: "alphabetical-asc"
  }
}: EnhancedSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Update search term if initialSearchTerm changes
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  useEffect(() => {
    // Update filters if initialFilters changes
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, filters);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    // Don't trigger search automatically when filters change
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch("", filters);
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSearch} className="relative mb-4">
        <div className="relative">
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-24"
          />
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-12 top-0 h-10"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X size={18} />
            </Button>
          )}
          <Button
            type="submit"
            size="icon"
            className="absolute right-0 top-0 h-10 rounded-l-none"
            aria-label="Search"
          >
            <Search size={18} />
          </Button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center text-xs"
              >
                <SlidersHorizontal size={14} className="mr-1" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="mb-4">
                <SheetTitle>Search Filters</SheetTitle>
              </SheetHeader>
              <SearchFilter 
                onFilterChange={(newFilters) => {
                  handleFilterChange(newFilters);
                  setIsFilterOpen(false);
                  onSearch(searchTerm, newFilters);
                }} 
                initialValues={filters}
                showResetButton
              />
            </SheetContent>
          </Sheet>
          
          <Button 
            type="submit" 
            size="sm"
            variant="default"
            className="text-xs"
          >
            Apply Filters
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EnhancedSearchBar;
