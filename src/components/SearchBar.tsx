
import { useState } from "react";
import EnhancedSearchBar, { EnhancedSearchBarProps } from "./EnhancedSearchBar";
import { FilterOptions } from "./SearchFilter";

// Re-export the props type but make onSearch optional
export interface SearchBarProps extends Omit<EnhancedSearchBarProps, 'onSearch'> {
  onSearch?: (searchTerm: string, filters: FilterOptions) => void;
}

const SearchBar = ({ 
  className, 
  placeholder = "Search names...",
  onSearch,
  initialSearchTerm,
  initialFilters = {
    gender: "all",
    countries: [],
    religions: [],
    languages: [],
    sortBy: "alphabetical-asc"
  }
}: SearchBarProps) => {
  // Handle the case where onSearch is not provided
  const handleSearch = (searchTerm: string, filters: FilterOptions) => {
    if (onSearch) {
      onSearch(searchTerm, filters);
    } else {
      console.log("Search callback not provided", { searchTerm, filters });
    }
  };
  
  return (
    <EnhancedSearchBar
      className={className}
      placeholder={placeholder}
      onSearch={handleSearch}
      initialSearchTerm={initialSearchTerm}
      initialFilters={initialFilters}
    />
  );
};

export default SearchBar;
