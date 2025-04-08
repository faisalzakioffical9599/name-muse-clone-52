
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import NameCard from "../components/NameCard";
import EnhancedSearchBar from "../components/EnhancedSearchBar";
import PopularNamesSidebar from "../components/PopularNamesSidebar";
import EnhancedAlphabetNav from "../components/EnhancedAlphabetNav";
import { FilterOptions } from "../components/SearchFilter";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const GirlNames = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string>("A");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    gender: "girl",
    sortBy: "alphabetical-asc"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 8;

  // Mock letter counts for the alphabet navigation
  const letterCounts = {
    'A': 22, 'B': 18, 'C': 20, 'D': 15, 'E': 12, 'F': 10, 'G': 14, 'H': 12,
    'I': 8, 'J': 15, 'K': 14, 'L': 17, 'M': 20, 'N': 12, 'O': 8, 'P': 11,
    'Q': 3, 'R': 14, 'S': 18, 'T': 12, 'U': 4, 'V': 8, 'W': 5, 'X': 2,
    'Y': 6, 'Z': 4
  };

  // Mock data for girl names - would be replaced by API call
  const girlNames = [
    {
      id: "g1",
      name: "Olivia",
      meaning: "Olive tree",
      gender: "girl" as const,
      origin: "Latin",
      religion: "Christianity",
      language: "Latin"
    },
    {
      id: "g2",
      name: "Emma",
      meaning: "Universal",
      gender: "girl" as const,
      origin: "Germanic",
      religion: "Christianity",
      language: "German"
    },
    {
      id: "g3",
      name: "Charlotte",
      meaning: "Free woman",
      gender: "girl" as const,
      origin: "French",
      religion: "Christianity",
      language: "French"
    },
    {
      id: "g4",
      name: "Amelia",
      meaning: "Work",
      gender: "girl" as const,
      origin: "Germanic",
      religion: "Christianity",
      language: "German"
    },
    {
      id: "g5",
      name: "Sophia",
      meaning: "Wisdom",
      gender: "girl" as const,
      origin: "Greek",
      religion: "Christianity",
      language: "Greek"
    },
    {
      id: "g6",
      name: "Isabella",
      meaning: "Pledged to God",
      gender: "girl" as const,
      origin: "Italian",
      religion: "Christianity",
      language: "Italian"
    },
    {
      id: "g7",
      name: "Ava",
      meaning: "Life, living one",
      gender: "girl" as const,
      origin: "Latin",
      religion: "Christianity",
      language: "Latin"
    },
    {
      id: "g8",
      name: "Mia",
      meaning: "Mine",
      gender: "girl" as const,
      origin: "Italian",
      religion: "Christianity",
      language: "Italian"
    },
    {
      id: "g9",
      name: "Ella",
      meaning: "Fairy maiden",
      gender: "girl" as const,
      origin: "Germanic",
      religion: "Christianity",
      language: "German"
    },
    {
      id: "g10",
      name: "Elizabeth",
      meaning: "God is my oath",
      gender: "girl" as const,
      origin: "Hebrew",
      religion: "Christianity",
      language: "Hebrew"
    },
    {
      id: "g11",
      name: "Scarlett",
      meaning: "Red",
      gender: "girl" as const,
      origin: "English",
      religion: "Christianity",
      language: "English"
    },
    {
      id: "g12",
      name: "Grace",
      meaning: "Elegance or divine grace",
      gender: "girl" as const,
      origin: "Latin",
      religion: "Christianity",
      language: "Latin"
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Reset page when letter or filters change
    setCurrentPage(1);
  }, [selectedLetter, searchQuery, filters]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleSearch = (searchTerm: string, searchFilters: FilterOptions) => {
    setSearchQuery(searchTerm);
    setFilters(searchFilters);
    // In a real implementation, this would trigger an API call
  };

  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter);
    // In a real implementation, this would trigger an API call
  };

  // Filter and paginate names
  const filteredNames = girlNames.filter(name => {
    // Filter by search query
    if (searchQuery && !name.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by letter if no search query
    if (!searchQuery && name.name.charAt(0).toUpperCase() !== selectedLetter) {
      return false;
    }
    
    return true;
  });
  
  // Sort names
  const sortedNames = [...filteredNames].sort((a, b) => {
    if (filters.sortBy === 'alphabetical-asc') {
      return a.name.localeCompare(b.name);
    } else if (filters.sortBy === 'alphabetical-desc') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });
  
  // Get current page names
  const indexOfLastName = currentPage * itemsPerPage;
  const indexOfFirstName = indexOfLastName - itemsPerPage;
  const currentNames = sortedNames.slice(indexOfFirstName, indexOfLastName);
  const totalPages = Math.ceil(sortedNames.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 md:pt-32 pb-16 md:pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Girl Names</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Page Header */}
              <div className="text-center mb-8 animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Girl Names
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover meaningful and beautiful girl names from around the world
                </p>
              </div>
              
              {/* Search Bar */}
              <EnhancedSearchBar 
                className="mb-8" 
                placeholder="Search for girl names..." 
                onSearch={handleSearch}
                initialFilters={{ gender: "girl", sortBy: "alphabetical-asc" }}
              />
              
              {/* Alphabet Navigation */}
              {!searchQuery && (
                <EnhancedAlphabetNav
                  selectedLetter={selectedLetter}
                  onLetterSelect={handleLetterSelect}
                  showCount={true}
                  letterCounts={letterCounts}
                  className="mb-8"
                />
              )}
              
              {/* Names Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {[...Array(itemsPerPage)].map((_, i) => (
                    <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-md"></div>
                  ))}
                </div>
              ) : currentNames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 animate-fade-in">
                  {currentNames.map((name) => (
                    <NameCard key={name.id} {...name} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <p className="text-lg text-gray-600 mb-4">
                    No girl names found matching your criteria.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setFilters({ gender: "girl", sortBy: "alphabetical-asc" });
                      setSelectedLetter("A");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="my-8">
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
            <PopularNamesSidebar className="hidden lg:block" />
          </div>
        </div>
      </main>
      
      {/* Simplified Footer */}
      <footer className="py-8 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NameMuse. All rights reserved.
          </p>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 h-12 w-12 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center animate-fade-in hover:bg-primary/90 transition-colors"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default GirlNames;
