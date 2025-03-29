import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import NameCard from "../components/NameCard";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { FilterOptions } from "../components/SearchFilter";

const UniqueNames = () => {
  const allUniqueNames = [
    {
      id: "u1",
      name: "Zephyr",
      meaning: "West wind; gentle breeze",
      gender: "unisex" as const,
      origin: "Greek",
      religion: "Hellenism",
      language: "Greek"
    },
    {
      id: "u2",
      name: "Aurora",
      meaning: "Dawn; goddess of the dawn",
      gender: "girl" as const,
      origin: "Latin",
      religion: "Roman",
      language: "Latin"
    },
    {
      id: "u3",
      name: "Orion",
      meaning: "Rising in the sky; hunter",
      gender: "boy" as const,
      origin: "Greek",
      religion: "Hellenism",
      language: "Greek"
    },
    {
      id: "u4",
      name: "Lyra",
      meaning: "Lyre; musical instrument",
      gender: "girl" as const,
      origin: "Greek",
      religion: "Hellenism",
      language: "Greek"
    },
    {
      id: "u5",
      name: "Phoenix",
      meaning: "Mythical bird that rises from ashes",
      gender: "unisex" as const,
      origin: "Greek",
      religion: "Multiple",
      language: "Greek"
    },
    {
      id: "u6",
      name: "Nova",
      meaning: "New; a star showing a sudden increase in brightness",
      gender: "girl" as const,
      origin: "Latin",
      religion: "Multiple",
      language: "Latin"
    },
    {
      id: "u7",
      name: "Atlas",
      meaning: "Bearer of the heavens",
      gender: "boy" as const,
      origin: "Greek",
      religion: "Hellenism",
      language: "Greek"
    },
    {
      id: "u8",
      name: "Caspian",
      meaning: "From the ancient land of Caspia",
      gender: "boy" as const,
      origin: "Persian",
      religion: "Multiple",
      language: "Persian"
    },
  ];

  const [displayedNames, setDisplayedNames] = useState(allUniqueNames);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});

  const handleSearch = (searchTerm: string, filters: FilterOptions) => {
    let filteredNames = [...allUniqueNames];
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredNames = filteredNames.filter(name => 
        name.name.toLowerCase().includes(searchLower) || 
        name.meaning.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.gender && filters.gender !== "all") {
      filteredNames = filteredNames.filter(name => name.gender === filters.gender);
    }
    
    if (filters.countries && filters.countries.length > 0) {
      filteredNames = filteredNames.filter(name => 
        filters.countries!.includes(name.origin)
      );
    }
    
    if (filters.religions && filters.religions.length > 0) {
      filteredNames = filteredNames.filter(name => 
        filters.religions!.includes(name.religion)
      );
    }
    
    if (filters.languages && filters.languages.length > 0) {
      filteredNames = filteredNames.filter(name => 
        filters.languages!.includes(name.language)
      );
    }
    
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "alphabetical-asc":
          filteredNames.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "alphabetical-desc":
          filteredNames.sort((a, b) => b.name.localeCompare(a.name));
          break;
      }
    }
    
    setDisplayedNames(filteredNames);
    setActiveFilters(filters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 md:pt-32 pb-8 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Unique Baby Names
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover unusual and distinctive names that will make your child stand out
            </p>
            
            <SearchBar 
              className="mb-8" 
              placeholder="Search for unique names..."
              onSearch={handleSearch}
            />
          </div>
        </div>
      </section>
      
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
              Unique Names
              {displayedNames.length < allUniqueNames.length && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({displayedNames.length} results)
                </span>
              )}
            </h2>
          </div>

          {displayedNames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedNames.map(name => (
                <NameCard key={name.id} {...name} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No names found matching your search criteria.</p>
              <Button onClick={() => handleSearch("", {})}>Clear Filters</Button>
            </div>
          )}
          
          <div className="mt-16 prose max-w-none">
            <h2>What Makes a Name Unique?</h2>
            <p>
              Unique baby names are those that stand out from popular trends and conventional choices. 
              These distinctive names often have unusual origins, rare spellings, or uncommon 
              pronunciations. While unique names can come from any culture or tradition, they 
              often share the quality of being relatively uncommon in current naming statistics.
            </p>
            
            <h3>Benefits of Choosing a Unique Name</h3>
            <p>
              Selecting a unique name for your child can offer several advantages:
            </p>
            <ul>
              <li>Distinction in school and professional settings</li>
              <li>A strong sense of identity and individuality</li>
              <li>A memorable name that people are likely to remember</li>
              <li>A conversation starter with an interesting story or meaning</li>
            </ul>
            
            <h3>Finding the Perfect Balance</h3>
            <p>
              While unique names can be wonderful, it's important to consider how the name 
              will serve your child throughout their life. The best unique names are those 
              that are distinctive without being difficult to spell or pronounce. They 
              should feel special without creating unnecessary challenges.
            </p>
            
            <h3>Unique Name Inspiration</h3>
            <p>
              If you're seeking a unique name for your child, consider these sources of inspiration:
            </p>
            <ul>
              <li>Mythology and folklore from around the world</li>
              <li>Nature-inspired names from astronomy, botany, or geography</li>
              <li>Literary characters and authors</li>
              <li>Family surnames or ancestral names</li>
              <li>Words from other languages that have beautiful meanings</li>
            </ul>
          </div>
        </div>
      </section>
      
      <footer className="py-8 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NameMuse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UniqueNames;
