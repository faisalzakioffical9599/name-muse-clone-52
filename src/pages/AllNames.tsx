
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Header from "../components/Header";
import EnhancedAlphabetNav from "../components/EnhancedAlphabetNav";
import NameCard from "../components/NameCard";
import { Button } from "../components/ui/button";
import SearchFilter, { FilterOptions } from "../components/SearchFilter";
import EnhancedSidebar from "../components/EnhancedSidebar";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const AllNames = () => {
  const [selectedLetter, setSelectedLetter] = useState<string>("A");
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({
    gender: "all",
    countries: [],
    religions: [],
    languages: [],
    sortBy: "alphabetical-asc"
  });
  const itemsPerPage = 12;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Reset to page 1 when letter changes
    setCurrentPage(1);
  }, [selectedLetter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Mock letter counts for the alphabet navigation
  const letterCounts = {
    'A': 34, 'B': 28, 'C': 30, 'D': 25, 'E': 22, 'F': 15, 'G': 19, 'H': 21,
    'I': 14, 'J': 26, 'K': 24, 'L': 29, 'M': 35, 'N': 18, 'O': 13, 'P': 17,
    'Q': 6, 'R': 23, 'S': 31, 'T': 22, 'U': 8, 'V': 12, 'W': 9, 'X': 4,
    'Y': 11, 'Z': 7
  };

  // Generate mock names for the selected letter - would be replaced by API call
  const generateMockNames = (letter: string, count: number = 36) => {
    const names = [];
    const genders = ["boy", "girl", "unisex"] as const;
    const origins = ["Arabic", "English", "Hebrew", "Greek", "Indian", "Latin", "French", "Irish", "Italian", "Spanish"];
    const religions = ["Islam", "Christianity", "Judaism", "Hinduism", "Buddhism", "Sikhism"];
    const languages = ["Arabic", "English", "Hebrew", "Hindi", "Greek", "Latin", "French", "Gaelic", "Italian", "Spanish"];
    
    const meaningPrefixes = ["One who is", "Bringer of", "Child of", "Blessed with", "Giver of"];
    const meaningNouns = ["light", "strength", "wisdom", "grace", "peace", "joy", "love", "hope", "courage", "faith"];

    for (let i = 1; i <= count; i++) {
      // Generate a name starting with the given letter
      const randomNameLength = Math.floor(Math.random() * 5) + 3; // 3 to 7 characters
      let name = letter;
      for (let j = 1; j < randomNameLength; j++) {
        const charCode = Math.floor(Math.random() * 26) + 97; // lowercase a-z
        name += String.fromCharCode(charCode);
      }
      // Capitalize first letter
      name = name.charAt(0).toUpperCase() + name.slice(1);
      
      // Generate random meaning
      const meaningPrefix = meaningPrefixes[Math.floor(Math.random() * meaningPrefixes.length)];
      const meaningNoun = meaningNouns[Math.floor(Math.random() * meaningNouns.length)];
      const meaning = `${meaningPrefix} ${meaningNoun}`;
      
      // Random gender, origin, religion, language
      const gender = genders[Math.floor(Math.random() * genders.length)];
      const origin = origins[Math.floor(Math.random() * origins.length)];
      const religion = religions[Math.floor(Math.random() * religions.length)];
      const language = languages[Math.floor(Math.random() * languages.length)];
      
      names.push({
        id: `${letter.toLowerCase()}-${i}`,
        name,
        meaning,
        gender,
        origin,
        religion,
        language
      });
    }
    
    return names;
  };

  // Generate mock names for the selected letter
  const allNamesByLetter = generateMockNames(selectedLetter);

  // Filter names based on selected filters
  const filterNames = (names: any[]) => {
    return names.filter(name => {
      // Gender filter
      if (filters.gender && filters.gender !== "all" && name.gender !== filters.gender) {
        return false;
      }
      
      // Country/origin filter
      if (filters.countries && filters.countries.length > 0 && !filters.countries.includes(name.origin)) {
        return false;
      }
      
      // Religion filter
      if (filters.religions && filters.religions.length > 0 && !filters.religions.includes(name.religion)) {
        return false;
      }
      
      // Language filter
      if (filters.languages && filters.languages.length > 0 && !filters.languages.includes(name.language)) {
        return false;
      }
      
      return true;
    });
  };

  // Sort names based on the selected sort option
  const sortNames = (names: any[]) => {
    const sorted = [...names];
    
    switch (filters.sortBy) {
      case "alphabetical-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "alphabetical-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "popularity":
        // Mocking popularity by using a random value for demo purposes
        sorted.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }
    
    return sorted;
  };

  const filteredNames = filterNames(allNamesByLetter);
  const sortedNames = sortNames(filteredNames);
  
  // Get current page names
  const indexOfLastName = currentPage * itemsPerPage;
  const indexOfFirstName = indexOfLastName - itemsPerPage;
  const currentNames = sortedNames.slice(indexOfFirstName, indexOfLastName);
  
  const totalPages = Math.ceil(sortedNames.length / itemsPerPage);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 md:pt-32 pb-16 md:pb-24 px-4">
        <div className="container mx-auto max-w-7xl">
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
                <BreadcrumbPage>All Names</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              {/* Page Header */}
              <div className="text-center mb-6 animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Explore All Baby Names
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Browse our complete collection of beautiful baby names, sorted alphabetically for your convenience.
                </p>
              </div>
              
              {/* Filter and Alphabet Navigation */}
              <div className="mb-8">
                <SearchFilter 
                  onFilterChange={handleFilterChange} 
                  className="mb-6" 
                />
                
                <EnhancedAlphabetNav 
                  onLetterSelect={setSelectedLetter} 
                  selectedLetter={selectedLetter}
                  showCount={true}
                  letterCounts={letterCounts}
                />
              </div>
              
              {/* Names Section */}
              <section className="mt-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">
                    Names Starting With '{selectedLetter}'
                  </h2>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="hidden sm:flex"
                  >
                    <Link to="/">
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      Back to Home
                    </Link>
                  </Button>
                </div>
                
                {currentNames.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 animate-fade-in">
                    {currentNames.map((name) => (
                      <NameCard key={name.id} {...name} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <p className="text-lg text-gray-600">No names found with the current filters.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={resetFilters}
                    >
                      Reset Filters
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
              </section>
            </div>
            
            {/* Enhanced Sidebar */}
            <EnhancedSidebar className="hidden lg:block" />
          </div>
        </div>
      </main>
      
      {/* Footer - simplified for the subpage */}
      <footer className="py-8 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-7xl text-center">
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

export default AllNames;
