
import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { FilterOptions } from "../components/SearchFilter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Star, Globe, Book, Heart } from "lucide-react";
import NameCard from "../components/NameCard";

// Mock data for unisex names
const unisexNames = [
  {
    id: "u1",
    name: "Avery",
    meaning: "Ruler of the elves",
    gender: "unisex",
    origin: "English",
    religion: "Christianity",
    language: "English"
  },
  {
    id: "u2",
    name: "Riley",
    meaning: "Valiant, courageous",
    gender: "unisex",
    origin: "Irish",
    religion: "Christianity",
    language: "Gaelic"
  },
  {
    id: "u3",
    name: "Jordan",
    meaning: "To flow down, descend",
    gender: "unisex",
    origin: "Hebrew",
    religion: "Judaism",
    language: "Hebrew"
  },
  {
    id: "u4",
    name: "Quinn",
    meaning: "Counsel, wisdom",
    gender: "unisex",
    origin: "Irish",
    religion: "Christianity",
    language: "Gaelic"
  },
  {
    id: "u5",
    name: "Morgan",
    meaning: "Sea circle",
    gender: "unisex",
    origin: "Welsh",
    religion: "Christianity",
    language: "Welsh"
  },
  {
    id: "u6",
    name: "Taylor",
    meaning: "Tailor, one who makes clothes",
    gender: "unisex",
    origin: "English",
    religion: "Christianity",
    language: "English"
  },
  {
    id: "u7",
    name: "Reese",
    meaning: "Ardor, enthusiasm",
    gender: "unisex",
    origin: "Welsh",
    religion: "Christianity",
    language: "Welsh"
  },
  {
    id: "u8",
    name: "Dakota",
    meaning: "Friend, ally",
    gender: "unisex",
    origin: "Native American",
    religion: "Indigenous",
    language: "Sioux"
  },
  {
    id: "u9",
    name: "Rowan",
    meaning: "Little red one",
    gender: "unisex",
    origin: "Scottish",
    religion: "Christianity",
    language: "Gaelic"
  },
  {
    id: "u10",
    name: "Finley",
    meaning: "Fair warrior",
    gender: "unisex",
    origin: "Scottish",
    religion: "Christianity",
    language: "Gaelic"
  },
  {
    id: "u11",
    name: "Sage",
    meaning: "Wise one",
    gender: "unisex",
    origin: "Latin",
    religion: "Christianity",
    language: "Latin"
  },
  {
    id: "u12",
    name: "Phoenix",
    meaning: "Dark red, mythical bird that rose from ashes",
    gender: "unisex",
    origin: "Greek",
    religion: "Hellenism",
    language: "Greek"
  }
];

// Available origins for filtering
const origins = [
  "All Origins",
  "English",
  "Irish",
  "Hebrew",
  "Welsh",
  "Scottish",
  "Native American",
  "Latin",
  "Greek"
];

// Available letters for alphabetical filtering
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const UnisexNames = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<FilterOptions>({});
  const [selectedOrigin, setSelectedOrigin] = useState("All Origins");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleSearch = (searchTerm: string, filters: FilterOptions) => {
    setSearchQuery(searchTerm);
    setSearchFilters(filters);
    // Reset letter filter when searching
    setSelectedLetter(null);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  // Filter names based on search criteria, origin, and letter
  const filteredNames = unisexNames.filter(name => {
    // Search query filter
    if (searchQuery && !name.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Origin filter
    if (selectedOrigin !== "All Origins" && name.origin !== selectedOrigin) {
      return false;
    }
    
    // Letter filter
    if (selectedLetter && !name.name.startsWith(selectedLetter)) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Unisex Names</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our collection of versatile and modern unisex names that work beautifully for any child.
            </p>
          </div>
          
          <div className="mb-8">
            <SearchBar
              placeholder="Search unisex names..."
              onSearch={handleSearch}
              className="max-w-xl mx-auto"
            />
          </div>
          
          <div className="mb-8">
            <Tabs defaultValue="origin" className="w-full">
              <TabsList className="mb-4 grid grid-cols-2 w-full">
                <TabsTrigger value="origin" className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  By Origin
                </TabsTrigger>
                <TabsTrigger value="alphabet" className="flex items-center">
                  <Book className="w-4 h-4 mr-2" />
                  Alphabetical
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="origin" className="border rounded-md p-4">
                <div className="flex flex-wrap gap-2">
                  {origins.map(origin => (
                    <Badge 
                      key={origin}
                      variant={selectedOrigin === origin ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedOrigin(origin)}
                    >
                      {origin}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="alphabet" className="border rounded-md p-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  {letters.map(letter => (
                    <Badge 
                      key={letter}
                      variant={selectedLetter === letter ? "default" : "outline"}
                      className="cursor-pointer min-w-[2rem] text-center"
                      onClick={() => setSelectedLetter(prev => prev === letter ? null : letter)}
                    >
                      {letter}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {filteredNames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNames.map(name => (
                <Card key={name.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{name.name}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-purple-600">Unisex</Badge>
                          <Badge variant="secondary">{name.origin}</Badge>
                        </div>
                        <p className="text-gray-700 mb-4">{name.meaning}</p>
                        <div className="text-sm text-gray-500">
                          <span className="block">Religion: {name.religion}</span>
                          <span className="block">Language: {name.language}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(name.id)}
                        className={favorites.includes(name.id) ? "text-red-500" : "text-gray-400 hover:text-red-500"}
                      >
                        <Heart className="h-5 w-5" fill={favorites.includes(name.id) ? "currentColor" : "none"} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow border">
              <h3 className="text-lg font-medium text-gray-700 mb-2">No names found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnisexNames;
