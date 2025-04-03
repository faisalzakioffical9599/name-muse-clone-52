
import { useState, useEffect } from "react";
import { Filter, Check, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

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
    { id: "c6", name: "Chinese" },
    { id: "c7", name: "Japanese" },
    { id: "c8", name: "Spanish" },
    { id: "c9", name: "Portuguese" },
    { id: "c10", name: "Italian" },
    // In real app, there would be 200+ countries here
  ];
  
  const religions = [
    { id: "r1", name: "Hinduism" },
    { id: "r2", name: "Islam" },
    { id: "r3", name: "Christianity" },
    { id: "r4", name: "Buddhism" },
    { id: "r5", name: "Judaism" },
    // In real app, there would be many more religions here
  ];
  
  const languages = [
    { id: "l1", name: "Sanskrit" },
    { id: "l2", name: "Arabic" },
    { id: "l3", name: "Hebrew" },
    { id: "l4", name: "Latin" },
    { id: "l5", name: "Greek" },
    // In real app, there would be many more languages here
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

  // Search states for filtering the lists
  const [countrySearch, setCountrySearch] = useState("");
  const [religionSearch, setReligionSearch] = useState("");
  const [languageSearch, setLanguageSearch] = useState("");

  // Pagination states
  const [countryPage, setCountryPage] = useState(1);
  const [religionPage, setReligionPage] = useState(1);
  const [languagePage, setLanguagePage] = useState(1);
  const itemsPerPage = 10;

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
    setCountrySearch("");
    setReligionSearch("");
    setLanguageSearch("");
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

  // Filter the lists based on search
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );
  
  const filteredReligions = religions.filter(religion => 
    religion.name.toLowerCase().includes(religionSearch.toLowerCase())
  );
  
  const filteredLanguages = languages.filter(language => 
    language.name.toLowerCase().includes(languageSearch.toLowerCase())
  );

  // Paginate the lists
  const paginatedCountries = filteredCountries.slice(
    (countryPage - 1) * itemsPerPage, 
    countryPage * itemsPerPage
  );
  
  const paginatedReligions = filteredReligions.slice(
    (religionPage - 1) * itemsPerPage, 
    religionPage * itemsPerPage
  );
  
  const paginatedLanguages = filteredLanguages.slice(
    (languagePage - 1) * itemsPerPage, 
    languagePage * itemsPerPage
  );

  const totalCountryPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const totalReligionPages = Math.ceil(filteredReligions.length / itemsPerPage);
  const totalLanguagePages = Math.ceil(filteredLanguages.length / itemsPerPage);

  const activeFilterCount = getActiveFilterCount();

  // Render selected filters as badges
  const renderSelectedFilters = () => {
    const selected = [];
    
    if (filters.gender && filters.gender !== "all") {
      selected.push(
        <Badge key="gender" variant="outline" className="mr-1 mb-1">
          {filters.gender === "boy" ? "Boy" : filters.gender === "girl" ? "Girl" : "Unisex"}
        </Badge>
      );
    }
    
    (filters.countries || []).forEach(country => {
      selected.push(
        <Badge key={`country-${country}`} variant="outline" className="mr-1 mb-1">
          {country}
        </Badge>
      );
    });
    
    (filters.religions || []).forEach(religion => {
      selected.push(
        <Badge key={`religion-${religion}`} variant="outline" className="mr-1 mb-1">
          {religion}
        </Badge>
      );
    });
    
    (filters.languages || []).forEach(language => {
      selected.push(
        <Badge key={`language-${language}`} variant="outline" className="mr-1 mb-1">
          {language}
        </Badge>
      );
    });
    
    return selected.length > 0 ? (
      <div className="flex flex-wrap mt-2">
        {selected}
      </div>
    ) : null;
  };

  return (
    <div className={`flex flex-col ${className || ""}`}>
      <div className="flex items-center space-x-2 mb-2">
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
          <SheetContent className="overflow-y-auto w-full sm:max-w-md">
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
              <Accordion type="single" collapsible defaultValue="country">
                <AccordionItem value="country">
                  <AccordionTrigger className="text-sm font-medium">Origin/Country</AccordionTrigger>
                  <AccordionContent>
                    <div className="mb-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="Search countries..." 
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto py-2">
                      {paginatedCountries.map(country => (
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
                    {totalCountryPages > 1 && (
                      <Pagination className="mt-2">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => setCountryPage(p => Math.max(1, p - 1))}
                              className={countryPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                          {countryPage > 1 && (
                            <PaginationItem>
                              <PaginationLink onClick={() => setCountryPage(1)}>1</PaginationLink>
                            </PaginationItem>
                          )}
                          {countryPage > 2 && (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}
                          <PaginationItem>
                            <PaginationLink isActive>{countryPage}</PaginationLink>
                          </PaginationItem>
                          {countryPage < totalCountryPages - 1 && (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}
                          {countryPage < totalCountryPages && (
                            <PaginationItem>
                              <PaginationLink onClick={() => setCountryPage(totalCountryPages)}>
                                {totalCountryPages}
                              </PaginationLink>
                            </PaginationItem>
                          )}
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => setCountryPage(p => Math.min(totalCountryPages, p + 1))}
                              className={countryPage === totalCountryPages ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              {/* Religion Filter */}
              <Accordion type="single" collapsible>
                <AccordionItem value="religion">
                  <AccordionTrigger className="text-sm font-medium">Religion</AccordionTrigger>
                  <AccordionContent>
                    <div className="mb-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="Search religions..." 
                          value={religionSearch}
                          onChange={(e) => setReligionSearch(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto py-2">
                      {paginatedReligions.map(religion => (
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
                    {totalReligionPages > 1 && (
                      <Pagination className="mt-2">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => setReligionPage(p => Math.max(1, p - 1))}
                              className={religionPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink isActive>{religionPage}</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => setReligionPage(p => Math.min(totalReligionPages, p + 1))}
                              className={religionPage === totalReligionPages ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              {/* Language Filter */}
              <Accordion type="single" collapsible>
                <AccordionItem value="language">
                  <AccordionTrigger className="text-sm font-medium">Language</AccordionTrigger>
                  <AccordionContent>
                    <div className="mb-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="Search languages..." 
                          value={languageSearch}
                          onChange={(e) => setLanguageSearch(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto py-2">
                      {paginatedLanguages.map(language => (
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
                    {totalLanguagePages > 1 && (
                      <Pagination className="mt-2">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => setLanguagePage(p => Math.max(1, p - 1))}
                              className={languagePage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink isActive>{languagePage}</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => setLanguagePage(p => Math.min(totalLanguagePages, p + 1))}
                              className={languagePage === totalLanguagePages ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Render selected filters */}
            {renderSelectedFilters()}
            
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
    </div>
  );
};

export default SearchFilter;
