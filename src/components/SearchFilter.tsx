
import React, { useState, useEffect } from "react";
import { Filter, Trash, Check, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    gender: "all" as "all",
    countries: [],
    religions: [],
    languages: [],
    sortBy: "alphabetical-asc",
  },
  showResetButton = false,
}: SearchFilterProps) => {
  const [filters, setFilters] = useState<FilterOptions>(initialValues);
  const [isFilterSheet, setIsFilterSheet] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [religionSearch, setReligionSearch] = useState("");
  const [languageSearch, setLanguageSearch] = useState("");

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
    const defaultFilters: FilterOptions = {
      gender: "all" as "all",
      countries: [],
      religions: [],
      languages: [],
      sortBy: "alphabetical-asc",
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
    setCountrySearch("");
    setReligionSearch("");
    setLanguageSearch("");
  };

  const toggleArrayFilter = (key: string, value: string) => {
    const currentValues = filters[key] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value];
    updateFilter(key, newValues);
  };

  // Extended country options (200+)
  const countryOptions = [
    "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Arabic", 
    "Argentine", "Armenian", "Australian", "Austrian", "Azerbaijani", "Bahamian", 
    "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian", "Belizean", 
    "Beninese", "Bhutanese", "Bolivian", "Bosnian", "Botswanan", "Brazilian", 
    "British", "Bruneian", "Bulgarian", "Burkinabe", "Burmese", "Burundian", 
    "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Central African", 
    "Chadian", "Chilean", "Chinese", "Colombian", "Comoran", "Congolese", 
    "Costa Rican", "Croatian", "Cuban", "Cypriot", "Czech", "Danish", 
    "Djibouti", "Dominican", "Dutch", "East Timorese", "Ecuadorian", "Egyptian", 
    "Emirian", "English", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian", 
    "Fijian", "Filipino", "Finnish", "French", "Gabonese", "Gambian", "Georgian", 
    "German", "Ghanaian", "Greek", "Grenadian", "Guatemalan", "Guinean", 
    "Guinea-Bissauan", "Guyanese", "Haitian", "Herzegovinian", "Honduran", 
    "Hungarian", "Icelandic", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", 
    "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", 
    "Kazakhstani", "Kenyan", "Kittian and Nevisian", "Kuwaiti", "Kyrgyz", "Laotian", 
    "Latvian", "Lebanese", "Liberian", "Libyan", "Liechtensteiner", "Lithuanian", 
    "Luxembourger", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivan", 
    "Malian", "Maltese", "Marshallese", "Mauritanian", "Mauritian", "Mexican", 
    "Micronesian", "Moldovan", "Monacan", "Mongolian", "Moroccan", "Mosotho", 
    "Motswana", "Mozambican", "Namibian", "Nauruan", "Nepalese", "New Zealander", 
    "Nicaraguan", "Nigerian", "Nigerien", "North Korean", "Northern Irish", "Norwegian", 
    "Omani", "Pakistani", "Palauan", "Panamanian", "Papua New Guinean", "Paraguayan", 
    "Peruvian", "Polish", "Portuguese", "Qatari", "Romanian", "Russian", "Rwandan", 
    "Saint Lucian", "Salvadoran", "Samoan", "San Marinese", "Sao Tomean", "Saudi", 
    "Scottish", "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean", 
    "Slovakian", "Slovenian", "Solomon Islander", "Somali", "South African", 
    "South Korean", "Spanish", "Sri Lankan", "Sudanese", "Surinamer", "Swazi", 
    "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik", "Tanzanian", "Thai", 
    "Togolese", "Tongan", "Trinidadian or Tobagonian", "Tunisian", "Turkish", 
    "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan", "Uzbekistani", "Venezuelan", 
    "Vietnamese", "Welsh", "Yemenite", "Zambian", "Zimbabwean", "Nordic", "Germanic", 
    "Slavic", "Baltic", "Celtic", "Finno-Ugric", "Latin", "Polynesian", "Aztec", "Incan", 
    "Mayan", "Native American", "Aboriginal", "Maori", "Hindi", "Sanskrit", "Persian", 
    "Hebrew", "Aramaic", "Turkish", "Mongolian", "Cherokee", "Navajo", "Zulu", "Xhosa"
  ];
  
  const religionOptions = [
    "Buddhism", "Christianity", "Hinduism", "Islam", "Jainism", "Judaism", 
    "Sikhism", "Secular", "Baha'i", "Confucianism", "Shinto", "Taoism", 
    "Zoroastrianism", "Traditional/Folk", "Rastafari", "Pagan", "Wiccan"
  ];
  
  const languageOptions = [
    "Arabic", "Bengali", "Chinese", "Dutch", "English", "French", "Gaelic", 
    "German", "Greek", "Hebrew", "Hindi", "Italian", "Japanese", "Korean", 
    "Latin", "Malay", "Mandarin", "Norwegian", "Persian", "Polish", "Portuguese", 
    "Punjabi", "Russian", "Sanskrit", "Spanish", "Swahili", "Swedish", "Tamil", 
    "Telugu", "Thai", "Turkish", "Urdu", "Vietnamese", "Welsh", "Yiddish", "Zulu",
    "Albanian", "Amharic", "Armenian", "Azerbaijani", "Basque", "Belarusian",
    "Bulgarian", "Catalan", "Croatian", "Czech", "Danish", "Estonian", "Finnish",
    "Georgian", "Hawaiian", "Hungarian", "Icelandic", "Indonesian", "Irish",
    "Javanese", "Kazakh", "Khmer", "Kurdish", "Lao", "Latvian", "Lithuanian",
    "Macedonian", "Malagasy", "Maltese", "Maori", "Marathi", "Mongolian",
    "Nepali", "Pashto", "Romanian", "Serbian", "Slovak", "Slovenian", "Somali", 
    "Tagalog", "Tajik", "Tibetan", "Ukrainian", "Uzbek"
  ];

  const sortOptions = [
    { label: "A to Z", value: "alphabetical-asc" },
    { label: "Z to A", value: "alphabetical-desc" },
    { label: "Popularity: High to Low", value: "popularity-desc" },
    { label: "Popularity: Low to High", value: "popularity-asc" }
  ];

  const filteredCountries = countrySearch
    ? countryOptions.filter(country => 
        country.toLowerCase().includes(countrySearch.toLowerCase())
      )
    : countryOptions;

  const filteredReligions = religionSearch
    ? religionOptions.filter(religion => 
        religion.toLowerCase().includes(religionSearch.toLowerCase())
      )
    : religionOptions;

  const filteredLanguages = languageSearch
    ? languageOptions.filter(language => 
        language.toLowerCase().includes(languageSearch.toLowerCase())
      )
    : languageOptions;

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
              onValueChange={(value: "all" | "boy" | "girl" | "unisex") => updateFilter("gender", value)}
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
            <div className="p-2">
              <Input 
                placeholder="Search origins..." 
                value={countrySearch} 
                onChange={e => setCountrySearch(e.target.value)} 
                className="mb-2"
              />
            </div>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
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
              ))
            ) : (
              <div className="px-2 py-1 text-sm text-muted-foreground">No origins found</div>
            )}
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
            <div className="p-2">
              <Input 
                placeholder="Search religions..." 
                value={religionSearch} 
                onChange={e => setReligionSearch(e.target.value)} 
                className="mb-2"
              />
            </div>
            {filteredReligions.length > 0 ? (
              filteredReligions.map((religion) => (
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
              ))
            ) : (
              <div className="px-2 py-1 text-sm text-muted-foreground">No religions found</div>
            )}
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
            <div className="p-2">
              <Input 
                placeholder="Search languages..." 
                value={languageSearch} 
                onChange={e => setLanguageSearch(e.target.value)} 
                className="mb-2"
              />
            </div>
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((language) => (
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
              ))
            ) : (
              <div className="px-2 py-1 text-sm text-muted-foreground">No languages found</div>
            )}
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
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
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
                      onClick={() => updateFilter("gender", gender as "all" | "boy" | "girl" | "unisex")}
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
              <AccordionContent className="space-y-2">
                <div className="relative mb-2">
                  <Input 
                    placeholder="Search origins..." 
                    value={countrySearch} 
                    onChange={e => setCountrySearch(e.target.value)}
                    className="pr-8"
                  />
                  <Search className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {filteredCountries.map((country) => (
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
                  {filteredCountries.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-2">No origins found</p>
                  )}
                </div>
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
                <div className="relative mb-2">
                  <Input 
                    placeholder="Search religions..." 
                    value={religionSearch} 
                    onChange={e => setReligionSearch(e.target.value)}
                    className="pr-8"
                  />
                  <Search className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {filteredReligions.map((religion) => (
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
                  {filteredReligions.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-2">No religions found</p>
                  )}
                </div>
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
              <AccordionContent className="space-y-2">
                <div className="relative mb-2">
                  <Input 
                    placeholder="Search languages..." 
                    value={languageSearch} 
                    onChange={e => setLanguageSearch(e.target.value)}
                    className="pr-8"
                  />
                  <Search className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {filteredLanguages.map((language) => (
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
                  {filteredLanguages.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-2">No languages found</p>
                  )}
                </div>
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
