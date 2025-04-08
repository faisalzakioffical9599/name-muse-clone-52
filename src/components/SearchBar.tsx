
import { useState, useEffect } from "react";
import EnhancedSearchBar, { EnhancedSearchBarProps } from "./EnhancedSearchBar";

// Re-export the props type but make onSearch optional
export interface SearchBarProps extends Omit<EnhancedSearchBarProps, 'onSearch'> {
  onSearch?: EnhancedSearchBarProps['onSearch'];
}

const SearchBar = ({ 
  className, 
  placeholder = "Search names...",
  onSearch,
  initialSearchTerm,
  initialFilters
}: SearchBarProps) => {
  // We're now just wrapping the EnhancedSearchBar component for backward compatibility
  return (
    <EnhancedSearchBar
      className={className}
      placeholder={placeholder}
      onSearch={onSearch || (() => {})}
      initialSearchTerm={initialSearchTerm}
      initialFilters={initialFilters}
    />
  );
};

export default SearchBar;
