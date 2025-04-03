
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { FilterOptions } from "../components/SearchFilter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Globe, Search, Filter, ArrowUpRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import EnhancedSidebar from "../components/EnhancedSidebar";

// Mock data - would come from an API in a real application
const generateMockStories = (count: number = 50) => {
  const stories = [];
  
  const names = [
    "Alexander", "Isabella", "Mohammed", "Olivia", "Chen", "Fatima", "Santiago", "Sophia",
    "Raj", "Emma", "Hiroshi", "Maria", "Ethan", "Zara", "Liam", "Aisha", "Mateo", "Ava",
    "Noah", "Chloe", "William", "Elizabeth", "James", "Amelia", "Benjamin", "Harper"
  ];
  
  const countries = [
    "Greece", "Italy", "Egypt", "United Kingdom", "China", "Saudi Arabia", "Spain", "Russia",
    "India", "France", "Japan", "Brazil", "United States", "Pakistan", "Mexico", "Australia",
    "Germany", "South Africa", "Nigeria", "Canada", "Argentina", "Netherlands", "Sweden", "Ireland"
  ];
  
  const categories = [
    "Historical Figures", "Mythology", "Literary Characters", "Famous Personalities", 
    "Religious Figures", "Cultural Icons", "Folklore Heroes", "Legendary Figures",
    "Ancient Names", "Royal Names", "Pioneer Names", "Warrior Names"
  ];
  
  for (let i = 1; i <= count; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    stories.push({
      id: i.toString(),
      name: randomName,
      country: randomCountry,
      category: randomCategory,
      shortDescription: `A brief overview of the name ${randomName} and its cultural significance.`,
      story: `${randomName} is a name with deep roots in ${randomCountry}. The name has been passed down through generations and carries significant meaning in the culture. It is associated with qualities like strength, wisdom, and courage. Throughout history, many notable figures named ${randomName} have made significant contributions to science, art, literature, and politics. The name continues to be popular today and is chosen by parents who value its rich heritage and cultural significance.`,
      imageUrl: `/placeholder.svg`
    });
  }
  
  return stories;
};

const mockStories = generateMockStories();

// Available categories and countries for filtering
const extractCategories = (stories: any[]) => {
  const categoriesSet = new Set(["All Categories"]);
  stories.forEach(story => categoriesSet.add(story.category));
  return Array.from(categoriesSet);
};

const extractCountries = (stories: any[]) => {
  const countriesSet = new Set(["All Countries"]);
  stories.forEach(story => countriesSet.add(story.country));
  return Array.from(countriesSet);
};

const categories = extractCategories(mockStories);
const countries = extractCountries(mockStories);

const NameStories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<FilterOptions>({});
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [expandedStory, setExpandedStory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categorySearch, setCategorySearch] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const itemsPerPage = 6;

  useEffect(() => {
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [selectedCategory, selectedCountry, searchQuery]);

  const handleSearch = (searchTerm: string, filters: FilterOptions) => {
    setSearchQuery(searchTerm);
    setSearchFilters(filters);
  };

  // Filter stories based on search criteria and selected tabs
  const filteredStories = mockStories.filter(story => {
    // Search query filter
    if (searchQuery && !story.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !story.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== "All Categories" && story.category !== selectedCategory) {
      return false;
    }
    
    // Country filter
    if (selectedCountry !== "All Countries" && story.country !== selectedCountry) {
      return false;
    }
    
    return true;
  });

  // Filter categories and countries based on search
  const filteredCategories = categories.filter(category => 
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredCountries = countries.filter(country => 
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Get current page stories
  const indexOfLastStory = currentPage * itemsPerPage;
  const indexOfFirstStory = indexOfLastStory - itemsPerPage;
  const currentStories = filteredStories.slice(indexOfFirstStory, indexOfLastStory);
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);

  const toggleStoryExpansion = (id: string) => {
    if (expandedStory === id) {
      setExpandedStory(null);
    } else {
      setExpandedStory(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Name Articles</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore the fascinating stories and articles about names of notable figures throughout history and across different cultures.
              </p>
            </div>
            
            <div className="mb-8">
              <SearchBar
                placeholder="Search articles by name or content..."
                onSearch={handleSearch}
                className="max-w-xl mx-auto"
              />
            </div>
            
            <div className="mb-8">
              <Tabs defaultValue="category" className="w-full">
                <TabsList className="mb-4 grid grid-cols-2 w-full">
                  <TabsTrigger value="category" className="flex items-center">
                    <Book className="w-4 h-4 mr-2" />
                    Categories
                  </TabsTrigger>
                  <TabsTrigger value="country" className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Countries
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="category" className="border rounded-md p-4">
                  <div className="mb-3 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search categories..." 
                      value={categorySearch}
                      onChange={(e) => setCategorySearch(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto py-2">
                    {filteredCategories.map(category => (
                      <Badge 
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="cursor-pointer mb-2"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="country" className="border rounded-md p-4">
                  <div className="mb-3 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search countries..." 
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto py-2">
                    {filteredCountries.map(country => (
                      <Badge 
                        key={country}
                        variant={selectedCountry === country ? "default" : "outline"}
                        className="cursor-pointer mb-2"
                        onClick={() => setSelectedCountry(country)}
                      >
                        {country}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Applied filters */}
            <div className="flex items-center gap-2 mb-4">
              {(selectedCategory !== "All Categories" || selectedCountry !== "All Countries" || searchQuery) && (
                <>
                  <p className="text-sm font-medium text-gray-700">Active filters:</p>
                  {selectedCategory !== "All Categories" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {selectedCategory}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => setSelectedCategory("All Categories")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                  {selectedCountry !== "All Countries" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {selectedCountry}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => setSelectedCountry("All Countries")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                  {searchQuery && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Search: {searchQuery}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => setSearchQuery("")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setSelectedCategory("All Categories");
                      setSelectedCountry("All Countries");
                      setSearchQuery("");
                    }}
                  >
                    Clear all
                  </Button>
                </>
              )}
            </div>
            
            {currentStories.length > 0 ? (
              <div className="space-y-6">
                {currentStories.map(story => (
                  <Card key={story.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{story.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="cursor-pointer" onClick={() => setSelectedCategory(story.category)}>
                              {story.category}
                            </Badge>
                            <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCountry(story.country)}>
                              {story.country}
                            </Badge>
                          </CardDescription>
                        </div>
                        <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                          <img 
                            src={story.imageUrl} 
                            alt={story.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        {expandedStory === story.id ? story.story : story.shortDescription}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <Button
                        variant="ghost"
                        onClick={() => toggleStoryExpansion(story.id)}
                      >
                        {expandedStory === story.id ? "Show Less" : "Read More"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        Full Article <ArrowUpRight className="h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow border">
                <h3 className="text-lg font-medium text-gray-700 mb-2">No articles found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
                    </PaginationItem>
                  )}
                  
                  {currentPage > 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  
                  <PaginationItem>
                    <PaginationLink isActive>{currentPage}</PaginationLink>
                  </PaginationItem>
                  
                  {currentPage < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
          
          {/* Sidebar */}
          <EnhancedSidebar className="hidden lg:block" />
        </div>
      </div>
    </div>
  );
};

export default NameStories;

// X icon component
function X(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
