
import React, { useState, useEffect } from "react";
import { Filter, Trash, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FilterOptions {
  gender?: "all" | "boy" | "girl" | "unisex";
  countries?: string[];
  religions?: string[];
  languages?: string[];
  sortBy?: string;
  [key: string]: any;
}

interface SearchFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
  initialValues?: FilterOptions;
  showResetButton?: boolean;
}

const SearchFilter = ({
  onFilterChange,
  className,
  initialValues = {
    gender: "all",
    countries: [],
    religions: [],
    languages: [],
    sortBy: "alphabetical-asc",
  },
  showResetButton = false,
}: SearchFilterProps) => {
  const [filters, setFilters] = useState<FilterOptions>(initialValues);
  const [isFilterSheet, setIsFilterSheet] = useState(false);

  // Update filters if initialValues changes
  useEffect(() => {
    setFilters(initialValues);
  }, [initialValues]);

  const activeFiltersCount = Object.entries(filters).reduce((count, [key, value]) => {
    if (key === "gender" && value !== "all") return count + 1;
    if (Array.isArray(value) && value.length > 0) return count + 1;
    if (key === "sortBy" && value !== "alphabetical-asc") return count + 1;
    return count;
  }, 0);

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      gender: "all",
      countries: [],
      religions: [],
      languages: [],
      sortBy: "alphabetical-asc",
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const toggleArrayFilter = (key: string, value: string) => {
    const currentValues = filters[key] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value];
    updateFilter(key, newValues);
  };

  // Mock data for filter options
  const countryOptions = [
    "Arabic", "English", "French", "Greek", "Germanic", 
    "Hebrew", "Indian", "Irish", "Italian", "Japanese", 
    "Latin", "Nordic", "Persian", "Russian", "Spanish"
  ];
  
  const religionOptions = [
    "Buddhism", "Christianity", "Hinduism", "Islam", 
    "Judaism", "Sikhism", "Secular"
  ];
  
  const languageOptions = [
    "Arabic", "English", "French", "Gaelic", "German", 
    "Greek", "Hebrew", "Hindi", "Italian", "Japanese", 
    "Latin", "Persian", "Russian", "Sanskrit", "Spanish"
  ];

  const sortOptions = [
    { label: "A to Z", value: "alphabetical-asc" },
    { label: "Z to A", value: "alphabetical-desc" },
    { label: "Popularity: High to Low", value: "popularity-desc" },
    { label: "Popularity: Low to High", value: "popularity-asc" }
  ];

  // Dropdown version for desktop
  const FilterDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 text-xs"
        >
          <Filter className="h-3.5 w-3.5" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge
              variant="secondary"
              className="h-5 w-5 rounded-full p-0 flex items-center justify-center ml-1 text-xs"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Gender Filter */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span className="flex items-center gap-2">
              Gender
              {filters.gender !== "all" && <Check className="h-3.5 w-3.5 text-primary" />}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={filters.gender}
              onValueChange={(value) => updateFilter("gender", value)}
            >
              <DropdownMenuRadioItem value="all">All Genders</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="boy">Boy</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="girl">Girl</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="unisex">Unisex</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        {/* Country Filter */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span className="flex items-center gap-2">
              Origin
              {(filters.countries?.length || 0) > 0 && (
                <Badge variant="secondary" className="h-5 px-1 text-xs">
                  {filters.countries?.length}
                </Badge>
              )}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="max-h-60 overflow-y-auto">
            {countryOptions.map((country) => (
              <DropdownMenuItem
                key={country}
                onSelect={(e) => {
                  e.preventDefault();
                  toggleArrayFilter("countries", country);
                }}
              >
                <div className="flex items-center gap-2">
                  {filters.countries?.includes(country) ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <div className="w-3.5" />
                  )}
                  {country}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        {/* Religion Filter */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span className="flex items-center gap-2">
              Religion
              {(filters.religions?.length || 0) > 0 && (
                <Badge variant="secondary" className="h-5 px-1 text-xs">
                  {filters.religions?.length}
                </Badge>
              )}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {religionOptions.map((religion) => (
              <DropdownMenuItem
                key={religion}
                onSelect={(e) => {
                  e.preventDefault();
                  toggleArrayFilter("religions", religion);
                }}
              >
                <div className="flex items-center gap-2">
                  {filters.religions?.includes(religion) ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <div className="w-3.5" />
                  )}
                  {religion}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        {/* Language Filter */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span className="flex items-center gap-2">
              Language
              {(filters.languages?.length || 0) > 0 && (
                <Badge variant="secondary" className="h-5 px-1 text-xs">
                  {filters.languages?.length}
                </Badge>
              )}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="max-h-60 overflow-y-auto">
            {languageOptions.map((language) => (
              <DropdownMenuItem
                key={language}
                onSelect={(e) => {
                  e.preventDefault();
                  toggleArrayFilter("languages", language);
                }}
              >
                <div className="flex items-center gap-2">
                  {filters.languages?.includes(language) ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <div className="w-3.5" />
                  )}
                  {language}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        <DropdownMenuSeparator />
        
        {/* Sort Options */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span className="flex items-center gap-2">
              Sort By
              {filters.sortBy !== "alphabetical-asc" && <Check className="h-3.5 w-3.5 text-primary" />}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={filters.sortBy}
              onValueChange={(value) => updateFilter("sortBy", value)}
            >
              {sortOptions.map((option) => (
                <DropdownMenuRadioItem key={option.value} value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        {activeFiltersCount > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive flex items-center gap-2"
              onSelect={(e) => {
                e.preventDefault();
                resetFilters();
              }}
            >
              <Trash className="h-3.5 w-3.5" />
              Clear All Filters
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Sheet version for mobile and when shown as main filter
  const FilterSheet = () => (
    <Sheet open={isFilterSheet} onOpenChange={setIsFilterSheet}>
      <SheetTrigger asChild>
        <Button
          variant={className ? "default" : "outline"}
          size="sm"
          className={`h-8 gap-1 ${className ? "w-full" : "text-xs"}`}
        >
          <Filter className="h-3.5 w-3.5" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge
              variant="secondary"
              className="h-5 w-5 rounded-full p-0 flex items-center justify-center ml-1 text-xs"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter Options</SheetTitle>
          <SheetDescription>
            Narrow down your name search with these filters.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {/* Gender Filter */}
            <AccordionItem value="gender">
              <AccordionTrigger className="text-sm">
                Gender
                {filters.gender !== "all" && (
                  <Badge variant="secondary" className="h-5 px-2 text-xs ml-2">
                    {filters.gender}
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                {["all", "boy", "girl", "unisex"].map((gender) => (
                  <div key={gender} className="flex items-center gap-2">
                    <Button
                      variant={filters.gender === gender ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => updateFilter("gender", gender)}
                    >
                      {gender === "all" ? "All Genders" : gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </Button>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            
            {/* Origin Filter */}
            <AccordionItem value="origin">
              <AccordionTrigger className="text-sm">
                Origin
                {(filters.countries?.length || 0) > 0 && (
                  <Badge variant="secondary" className="h-5 px-2 text-xs ml-2">
                    {filters.countries?.length}
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent className="space-y-2 max-h-60 overflow-y-auto">
                {countryOptions.map((country) => (
                  <div key={country} className="flex items-center gap-2">
                    <Button
                      variant={filters.countries?.includes(country) ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => toggleArrayFilter("countries", country)}
                    >
                      {filters.countries?.includes(country) && (
                        <Check className="h-3.5 w-3.5 mr-2" />
                      )}
                      {country}
                    </Button>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            
            {/* Religion Filter */}
            <AccordionItem value="religion">
              <AccordionTrigger className="text-sm">
                Religion
                {(filters.religions?.length || 0) > 0 && (
                  <Badge variant="secondary" className="h-5 px-2 text-xs ml-2">
                    {filters.religions?.length}
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                {religionOptions.map((religion) => (
                  <div key={religion} className="flex items-center gap-2">
                    <Button
                      variant={filters.religions?.includes(religion) ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => toggleArrayFilter("religions", religion)}
                    >
                      {filters.religions?.includes(religion) && (
                        <Check className="h-3.5 w-3.5 mr-2" />
                      )}
                      {religion}
                    </Button>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            
            {/* Language Filter */}
            <AccordionItem value="language">
              <AccordionTrigger className="text-sm">
                Language
                {(filters.languages?.length || 0) > 0 && (
                  <Badge variant="secondary" className="h-5 px-2 text-xs ml-2">
                    {filters.languages?.length}
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent className="space-y-2 max-h-60 overflow-y-auto">
                {languageOptions.map((language) => (
                  <div key={language} className="flex items-center gap-2">
                    <Button
                      variant={filters.languages?.includes(language) ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => toggleArrayFilter("languages", language)}
                    >
                      {filters.languages?.includes(language) && (
                        <Check className="h-3.5 w-3.5 mr-2" />
                      )}
                      {language}
                    </Button>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            
            {/* Sort Options */}
            <AccordionItem value="sort">
              <AccordionTrigger className="text-sm">
                Sort By
                {filters.sortBy !== "alphabetical-asc" && (
                  <Badge variant="secondary" className="h-5 px-2 text-xs ml-2">
                    {sortOptions.find(option => option.value === filters.sortBy)?.label}
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                {sortOptions.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <Button
                      variant={filters.sortBy === option.value ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => updateFilter("sortBy", option.value)}
                    >
                      {option.label}
                    </Button>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <SheetFooter className="flex-col sm:flex-row gap-3 sm:justify-between">
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              className="sm:w-auto w-full"
              onClick={resetFilters}
            >
              <Trash className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          )}
          <SheetClose asChild>
            <Button className="sm:w-auto w-full">
              Apply Filters
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className={className || ""}>
      {className ? <FilterSheet /> : <FilterDropdown />}
      {showResetButton && activeFiltersCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          className="ml-2 h-8 text-xs"
          onClick={resetFilters}
        >
          <Trash className="h-3.5 w-3.5 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
};

export default SearchFilter;
