
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
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
import SearchBar from "../components/SearchBar";
import PopularNamesSidebar from "../components/PopularNamesSidebar";
import { clientApi } from "../services/clientApi";
import { FilterOptions } from "../components/SearchFilter";

interface NameData {
  id: string | number;
  name: string;
  meaning: string;
  gender: "boy" | "girl" | "unisex";
  origin: string;
  religion?: string;
  language?: string;
}

const BoyNames = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [boyNames, setBoyNames] = useState<NameData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<FilterOptions>({});

  // Fetch boy names from API
  useEffect(() => {
    const fetchBoyNames = async () => {
      setIsLoading(true);
      try {
        const response = await clientApi.names.getBoyNames({
          page,
          limit: 9,
          search: searchQuery,
          ...searchFilters
        });
        
        if (response && response.data) {
          if (page === 1) {
            setBoyNames(response.data);
          } else {
            setBoyNames(prev => [...prev, ...response.data]);
          }
          
          // Check if there are more pages
          setHasMore(response.meta.page < response.meta.totalPages);
        }
      } catch (error) {
        console.error("Error fetching boy names:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBoyNames();
  }, [page, searchQuery, searchFilters]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const handleSearch = (query: string, filters: FilterOptions) => {
    setSearchQuery(query);
    setSearchFilters(filters);
    setPage(1);
  };

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
                <BreadcrumbPage>Boy Names</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Page Header */}
              <div className="text-center mb-8 animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Boy Names
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover meaningful and beautiful boy names from around the world
                </p>
              </div>
              
              {/* Search Bar */}
              <SearchBar 
                className="mb-12" 
                placeholder="Search for boy names..." 
                onSearch={handleSearch}
              />
              
              {/* Names Grid */}
              {isLoading && page === 1 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-md"></div>
                  ))}
                </div>
              ) : boyNames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 animate-fade-in">
                  {boyNames.map((name) => (
                    <NameCard key={name.id} {...name} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <p className="text-lg text-gray-500">No names found matching your search criteria.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => handleSearch("", {})}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
              
              {/* Load More Button */}
              {boyNames.length > 0 && (
                <div className="text-center mt-8">
                  <Button 
                    className="w-full sm:w-auto" 
                    onClick={handleLoadMore}
                    disabled={isLoading || !hasMore}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Loading...
                      </span>
                    ) : hasMore ? (
                      "Load More Names"
                    ) : (
                      "No More Names"
                    )}
                  </Button>
                </div>
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

export default BoyNames;
