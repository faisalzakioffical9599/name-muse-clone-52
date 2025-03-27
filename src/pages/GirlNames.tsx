
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
import SearchBar from "../components/SearchBar";
import PopularNamesSidebar from "../components/PopularNamesSidebar";

const GirlNames = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

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
  ];

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
              <SearchBar className="mb-12" placeholder="Search for girl names..." />
              
              {/* Names Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 animate-fade-in">
                {girlNames.map((name) => (
                  <NameCard key={name.id} {...name} />
                ))}
              </div>
              
              {/* Load More Button */}
              <div className="text-center mt-8">
                <Button className="w-full sm:w-auto">
                  Load More Names
                </Button>
              </div>
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
