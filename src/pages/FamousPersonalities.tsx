
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Star, Award, Film, Trophy, User, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SearchBar from "../components/SearchBar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import EnhancedSidebar from "../components/EnhancedSidebar";

interface Celebrity {
  id: string;
  name: string;
  category: string;
  description: string;
  nationality: string;
  birthYear?: number;
  image?: string;
  achievements?: string[];
}

const FamousPersonalities = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNationality, setSelectedNationality] = useState<string>("all");
  const itemsPerPage = 9;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedNationality, searchTerm]);

  // Expanded mock data for famous personalities
  const celebrities: Celebrity[] = [
    {
      id: "c1",
      name: "Dwayne Johnson",
      category: "actor",
      description: "Known as The Rock, former WWE wrestler turned Hollywood actor",
      nationality: "American",
      birthYear: 1972,
      image: "/placeholder.svg",
      achievements: ["Highest-paid actor", "Multiple blockbuster films"]
    },
    {
      id: "c2",
      name: "Elon Musk",
      category: "businessperson",
      description: "Entrepreneur and businessman, founder of Tesla and SpaceX",
      nationality: "South African/American",
      birthYear: 1971,
      image: "/placeholder.svg",
      achievements: ["Tesla CEO", "SpaceX founder", "One of the world's richest people"]
    },
    {
      id: "c3",
      name: "Lionel Messi",
      category: "sportsperson",
      description: "Professional footballer, considered one of the greatest players of all time",
      nationality: "Argentinian",
      birthYear: 1987,
      image: "/placeholder.svg",
      achievements: ["Multiple Ballon d'Or awards", "World Cup winner", "Olympic gold medalist"]
    },
    {
      id: "c4",
      name: "Priyanka Chopra",
      category: "actor",
      description: "Actress, model, and singer who has worked in both Bollywood and Hollywood",
      nationality: "Indian",
      birthYear: 1982,
      image: "/placeholder.svg",
      achievements: ["Miss World 2000", "National Film Award winner", "International acting career"]
    },
    {
      id: "c5",
      name: "Mike Tyson",
      category: "sportsperson",
      description: "Former professional boxer who is considered one of the greatest heavyweight boxers",
      nationality: "American",
      birthYear: 1966,
      image: "/placeholder.svg",
      achievements: ["Youngest heavyweight champion", "Boxing Hall of Fame"]
    },
    {
      id: "c6",
      name: "Jeff Bezos",
      category: "businessperson",
      description: "Entrepreneur and founder of Amazon",
      nationality: "American",
      birthYear: 1964,
      image: "/placeholder.svg",
      achievements: ["Founded Amazon", "Blue Origin founder", "One of the world's richest people"]
    },
    {
      id: "c7",
      name: "Emma Watson",
      category: "actor",
      description: "Actress known for her role as Hermione Granger in Harry Potter series",
      nationality: "British",
      birthYear: 1990,
      image: "/placeholder.svg",
      achievements: ["UN Women Goodwill Ambassador", "Brown University graduate", "HeForShe campaign founder"]
    },
    {
      id: "c8",
      name: "Cristiano Ronaldo",
      category: "sportsperson",
      description: "Professional footballer, one of the greatest players of all time",
      nationality: "Portuguese",
      birthYear: 1985,
      image: "/placeholder.svg",
      achievements: ["Multiple Ballon d'Or awards", "Euro Championship winner", "Most followed person on Instagram"]
    },
    {
      id: "c9",
      name: "Bill Gates",
      category: "businessperson",
      description: "Co-founder of Microsoft and philanthropist",
      nationality: "American",
      birthYear: 1955,
      image: "/placeholder.svg",
      achievements: ["Microsoft co-founder", "Bill & Melinda Gates Foundation", "Tech pioneer"]
    },
    {
      id: "c10",
      name: "Shah Rukh Khan",
      category: "actor",
      description: "Indian actor known as King of Bollywood",
      nationality: "Indian",
      birthYear: 1965,
      image: "/placeholder.svg",
      achievements: ["King of Bollywood", "Padma Shri award", "Legion of Honor"]
    },
    {
      id: "c11",
      name: "Serena Williams",
      category: "sportsperson",
      description: "Former professional tennis player, one of the greatest of all time",
      nationality: "American",
      birthYear: 1981,
      image: "/placeholder.svg",
      achievements: ["23 Grand Slam singles titles", "Olympic gold medals", "Successful entrepreneur"]
    },
    {
      id: "c12",
      name: "Jack Ma",
      category: "businessperson",
      description: "Founder of Alibaba Group",
      nationality: "Chinese",
      birthYear: 1964,
      image: "/placeholder.svg",
      achievements: ["Alibaba founder", "China's richest person", "Philanthropy"]
    },
    {
      id: "c13",
      name: "Jackie Chan",
      category: "actor",
      description: "Actor, martial artist, and filmmaker known for action comedy films",
      nationality: "Chinese",
      birthYear: 1954,
      image: "/placeholder.svg",
      achievements: ["International film star", "Martial arts expert", "Multiple honorary awards"]
    },
    {
      id: "c14",
      name: "Virat Kohli",
      category: "sportsperson",
      description: "Indian cricketer, former captain of the Indian national team",
      nationality: "Indian",
      birthYear: 1988,
      image: "/placeholder.svg",
      achievements: ["ICC Cricketer of the Year", "Padma Shri", "Record breaking batsman"]
    },
    {
      id: "c15",
      name: "Oprah Winfrey",
      category: "businessperson",
      description: "Media executive, actress, talk show host, and philanthropist",
      nationality: "American",
      birthYear: 1954,
      image: "/placeholder.svg",
      achievements: ["The Oprah Winfrey Show", "First black female billionaire", "Presidential Medal of Freedom"]
    },
    {
      id: "c16",
      name: "Tom Cruise",
      category: "actor",
      description: "Hollywood actor known for action movies and stunts",
      nationality: "American",
      birthYear: 1962,
      image: "/placeholder.svg",
      achievements: ["Three-time Golden Globe winner", "Mission Impossible franchise", "Top Gun movies"]
    },
    {
      id: "c17",
      name: "Simone Biles",
      category: "sportsperson",
      description: "Artistic gymnast, one of the most decorated gymnasts of all time",
      nationality: "American",
      birthYear: 1997,
      image: "/placeholder.svg",
      achievements: ["Olympic gold medals", "World championships", "Innovative gymnastics skills"]
    },
    {
      id: "c18",
      name: "Mark Zuckerberg",
      category: "businessperson",
      description: "Co-founder and CEO of Meta Platforms (formerly Facebook)",
      nationality: "American",
      birthYear: 1984,
      image: "/placeholder.svg",
      achievements: ["Facebook founder", "Meta CEO", "Philanthropist through Chan Zuckerberg Initiative"]
    }
  ];

  // Extract all nationalities
  const nationalities = ["all", ...new Set(celebrities.map(celeb => celeb.nationality))];

  // Filter celebrities based on category, nationality, and search term
  const filteredCelebrities = celebrities.filter(celeb => {
    const matchesCategory = selectedCategory === "all" || celeb.category === selectedCategory;
    const matchesNationality = selectedNationality === "all" || celeb.nationality === selectedNationality;
    const matchesSearch = !searchTerm || 
      celeb.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      celeb.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesNationality && matchesSearch;
  });

  // Get current page celebrities
  const indexOfLastCeleb = currentPage * itemsPerPage;
  const indexOfFirstCeleb = indexOfLastCeleb - itemsPerPage;
  const currentCelebrities = filteredCelebrities.slice(indexOfFirstCeleb, indexOfLastCeleb);
  const totalPages = Math.ceil(filteredCelebrities.length / itemsPerPage);

  // Handle search from SearchBar component
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-8 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Famous Personalities
            </h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explore names of famous actors, business leaders, sportspeople, and more
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto mb-8">
              <SearchBar placeholder="Search famous personalities..." onSearch={handleSearch} className="w-full" />
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              {/* Filters */}
              <div className="mb-6 flex flex-wrap gap-2 justify-center">
                {/* Category Filters */}
                <Tabs defaultValue={selectedCategory} value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                  <TabsList className="w-full justify-start mb-4 bg-white p-1 shadow-sm border rounded-full overflow-x-auto flex-nowrap">
                    <TabsTrigger value="all" className="rounded-full">All</TabsTrigger>
                    <TabsTrigger value="actor" className="rounded-full">Actors</TabsTrigger>
                    <TabsTrigger value="businessperson" className="rounded-full">Business Leaders</TabsTrigger>
                    <TabsTrigger value="sportsperson" className="rounded-full">Sports Stars</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                {/* Nationality Filter */}
                <div className="w-full flex flex-wrap gap-2 justify-center mb-4">
                  {nationalities.map(nationality => (
                    <Badge 
                      key={nationality}
                      variant={selectedNationality === nationality ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedNationality(nationality)}
                    >
                      {nationality === "all" ? "All Nationalities" : nationality}
                    </Badge>
                  ))}
                </div>
                
                {/* Active Filters */}
                {(selectedCategory !== "all" || selectedNationality !== "all" || searchTerm) && (
                  <div className="w-full flex items-center gap-2 mb-4 flex-wrap">
                    <span className="text-sm text-gray-500">Active filters:</span>
                    {selectedCategory !== "all" && (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1">
                        {selectedCategory === "actor" ? "Actor" : 
                         selectedCategory === "businessperson" ? "Business Leader" : 
                         "Sports Star"}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => setSelectedCategory("all")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {selectedNationality !== "all" && (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1">
                        {selectedNationality}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => setSelectedNationality("all")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {searchTerm && (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1">
                        Search: {searchTerm}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => setSearchTerm("")}
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
                        setSelectedCategory("all");
                        setSelectedNationality("all");
                        setSearchTerm("");
                      }}
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Celebrities Grid */}
              {currentCelebrities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentCelebrities.map((celebrity) => (
                    <Card key={celebrity.id} className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                            {celebrity.image && (
                              <img 
                                src={celebrity.image} 
                                alt={celebrity.name} 
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-xl">{celebrity.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1 text-sm">
                              <Globe className="h-3 w-3" /> {celebrity.nationality}
                              {celebrity.birthYear && (
                                <span className="ml-2">· b. {celebrity.birthYear}</span>
                              )}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4 flex-grow">
                        <p className="text-gray-700 mb-3">{celebrity.description}</p>
                        {celebrity.achievements && (
                          <div className="mt-2">
                            <p className="text-sm font-medium mb-1 flex items-center gap-1">
                              <Award className="h-3 w-3 text-purple-500" /> Notable Achievements:
                            </p>
                            <ul className="text-xs text-gray-600 list-disc list-inside">
                              {celebrity.achievements.map((achievement, index) => (
                                <li key={index}>{achievement}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="pt-0 mt-auto">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full text-purple-600 border-purple-200 hover:bg-purple-50"
                        >
                          View Full Profile
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow border">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No personalities found</h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedNationality("all");
                      setSearchTerm("");
                    }}
                  >
                    Clear filters
                  </Button>
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
      </section>
      
      {/* Simplified Footer */}
      <footer className="py-8 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NameMuse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FamousPersonalities;
