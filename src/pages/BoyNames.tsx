
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

const BoyNames = () => {
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

  // Mock data for boy names - would be replaced by API call
  const boyNames = [
    {
      id: "n1",
      name: "Noah",
      meaning: "Rest, comfort",
      gender: "boy" as const,
      origin: "Hebrew",
      religion: "Judaism",
      language: "Hebrew"
    },
    {
      id: "n2",
      name: "Liam",
      meaning: "Strong-willed warrior",
      gender: "boy" as const,
      origin: "Irish",
      religion: "Christianity",
      language: "Gaelic"
    },
    {
      id: "n3",
      name: "Oliver",
      meaning: "Olive tree",
      gender: "boy" as const,
      origin: "Latin",
      religion: "Christianity",
      language: "Latin"
    },
    {
      id: "n4",
      name: "Elijah",
      meaning: "My God is Yahweh",
      gender: "boy" as const,
      origin: "Hebrew",
      religion: "Judaism",
      language: "Hebrew"
    },
    {
      id: "n5",
      name: "William",
      meaning: "Resolute protector",
      gender: "boy" as const,
      origin: "Germanic",
      religion: "Christianity",
      language: "German"
    },
    {
      id: "n6",
      name: "James",
      meaning: "Supplanter",
      gender: "boy" as const,
      origin: "Hebrew",
      religion: "Christianity",
      language: "Hebrew"
    },
    {
      id: "n7",
      name: "Benjamin",
      meaning: "Son of the right hand",
      gender: "boy" as const,
      origin: "Hebrew",
      religion: "Judaism",
      language: "Hebrew"
    },
    {
      id: "n8",
      name: "Lucas",
      meaning: "Bringer of light",
      gender: "boy" as const,
      origin: "Latin",
      religion: "Christianity",
      language: "Latin"
    },
    {
      id: "n9",
      name: "Henry",
      meaning: "Ruler of the home",
      gender: "boy" as const,
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
              <SearchBar className="mb-12" placeholder="Search for boy names..." />
              
              {/* Names Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 animate-fade-in">
                {boyNames.map((name) => (
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

export default BoyNames;
