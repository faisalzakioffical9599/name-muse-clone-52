
import { useState, useEffect } from "react";
import { Filter, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose,
  SheetFooter
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface FilterOptions {
  gender?: string;
  countries?: string[];
  religions?: string[];
  languages?: string[];
  sortBy?: string;
}

interface SearchFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
}

const SearchFilter = ({ onFilterChange, className }: SearchFilterProps) => {
  // Sample data - in a real app, these would come from an API
  const countries = [
    { id: "c1", name: "Indian" },
    { id: "c2", name: "Arabic" },
    { id: "c3", name: "French" },
    { id: "c4", name: "Greek" },
    { id: "c5", name: "Latin" },
  ];
  
  const religions = [
    { id: "r1", name: "Hinduism" },
    { id: "r2", name: "Islam" },
    { id: "r3", name: "Christianity" },
    { id: "r4", name: "Buddhism" },
    { id: "r5", name: "Judaism" },
  ];
  
  const languages = [
    { id: "l1", name: "Sanskrit" },
    { id: "l2", name: "Arabic" },
    { id: "l3", name: "Hebrew" },
    { id: "l4", name: "Latin" },
    { id: "l5", name: "Greek" },
  ];

  const [filters, setFilters] = useState<FilterOptions>({
    gender: "all",
    countries: [],
    religions: [],
    languages: [],
    sortBy: "alphabetical-asc"
  });
  
  const sortOptions = [
    { id: "alphabetical-asc", name: "A to Z" },
    { id: "alphabetical-desc", name: "Z to A" },
    { id: "popularity", name: "Most Popular" },
  ];

  // Apply filters when they change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleGenderChange = (value: string) => {
    setFilters({ ...filters, gender: value });
  };

  const handleSortByChange = (value: string) => {
    setFilters({ ...filters, sortBy: value });
  };

  const handleCountryChange = (countryName: string, checked: boolean) => {
    const updatedCountries = checked
      ? [...(filters.countries || []), countryName]
      : (filters.countries || []).filter(c => c !== countryName);
    setFilters({ ...filters, countries: updatedCountries });
  };

  const handleReligionChange = (religionName: string, checked: boolean) => {
    const updatedReligions = checked
      ? [...(filters.religions || []), religionName]
      : (filters.religions || []).filter(r => r !== religionName);
    setFilters({ ...filters, religions: updatedReligions });
  };

  const handleLanguageChange = (languageName: string, checked: boolean) => {
    const updatedLanguages = checked
      ? [...(filters.languages || []), languageName]
      : (filters.languages || []).filter(l => l !== languageName);
    setFilters({ ...filters, languages: updatedLanguages });
  };

  const resetFilters = () => {
    setFilters({
      gender: "all",
      countries: [],
      religions: [],
      languages: [],
      sortBy: "alphabetical-asc"
    });
  };

  // Count active filters for the badge
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.gender && filters.gender !== "all") count++;
    if (filters.countries && filters.countries.length > 0) count++;
    if (filters.religions && filters.religions.length > 0) count++;
    if (filters.languages && filters.languages.length > 0) count++;
    if (filters.sortBy && filters.sortBy !== "alphabetical-asc") count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className={`flex items-center space-x-2 ${className || ""}`}>
      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <span className="hidden sm:inline">Sort</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-white">
          {sortOptions.map(option => (
            <DropdownMenuItem 
              key={option.id}
              className="flex items-center justify-between"
              onClick={() => handleSortByChange(option.id)}
            >
              {option.name}
              {filters.sortBy === option.id && (
                <Check className="h-4 w-4 ml-2" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filters Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 rounded-full bg-primary text-primary-foreground text-xs min-w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filter Names</SheetTitle>
            <SheetDescription>
              Refine names by gender, origin, and more
            </SheetDescription>
          </SheetHeader>
          <div className="py-4 space-y-6">
            {/* Gender Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Gender</h3>
              <RadioGroup 
                defaultValue={filters.gender} 
                value={filters.gender}
                onValueChange={handleGenderChange}
              >
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
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unisex" id="gender-unisex" />
                  <Label htmlFor="gender-unisex">Unisex</Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Country Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Origin/Country</h3>
              <div className="space-y-2">
                {countries.map(country => (
                  <div key={country.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`country-${country.id}`} 
                      checked={(filters.countries || []).includes(country.name)}
                      onCheckedChange={(checked) => 
                        handleCountryChange(country.name, checked === true)
                      }
                    />
                    <Label htmlFor={`country-${country.id}`}>{country.name}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Religion Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Religion</h3>
              <div className="space-y-2">
                {religions.map(religion => (
                  <div key={religion.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`religion-${religion.id}`}
                      checked={(filters.religions || []).includes(religion.name)}
                      onCheckedChange={(checked) => 
                        handleReligionChange(religion.name, checked === true)
                      }
                    />
                    <Label htmlFor={`religion-${religion.id}`}>{religion.name}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Language Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Language</h3>
              <div className="space-y-2">
                {languages.map(language => (
                  <div key={language.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`language-${language.id}`}
                      checked={(filters.languages || []).includes(language.name)}
                      onCheckedChange={(checked) => 
                        handleLanguageChange(language.name, checked === true)
                      }
                    />
                    <Label htmlFor={`language-${language.id}`}>{language.name}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <SheetFooter className="flex justify-between pt-4 border-t border-gray-200">
            <Button
              variant="ghost" 
              onClick={resetFilters}
              className="text-destructive hover:text-destructive/80"
            >
              Reset
            </Button>
            <SheetClose asChild>
              <Button>Apply Filters</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SearchFilter;
