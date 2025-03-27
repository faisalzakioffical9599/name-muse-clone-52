
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Header from "../components/Header";
import AlphabetNav from "../components/AlphabetNav";
import NameCard from "../components/NameCard";
import { Button } from "../components/ui/button";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

const AllNames = () => {
  const [selectedLetter, setSelectedLetter] = useState<string>("A");
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

  // Mock data for names by letter - would be replaced by API call
  const generateMockNames = (letter: string, count: number = 12) => {
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
  const namesByLetter = generateMockNames(selectedLetter);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 md:pt-32 pb-16 md:pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
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

          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Explore All Baby Names
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our complete collection of beautiful baby names, sorted alphabetically for your convenience.
            </p>
          </div>
          
          {/* Alphabet Navigation */}
          <AlphabetNav 
            onLetterSelect={setSelectedLetter} 
            selectedLetter={selectedLetter} 
          />
          
          {/* Names Section */}
          <section className="mt-12">
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12 animate-fade-in">
              {namesByLetter.map((name) => (
                <NameCard key={name.id} {...name} />
              ))}
            </div>
            
            {/* Load More Button - would be implemented with pagination in a real app */}
            <div className="text-center mt-8">
              <Button className="w-full sm:w-auto">
                Load More Names
              </Button>
            </div>
          </section>
        </div>
      </main>
      
      {/* Footer - simplified for the subpage */}
      <footer className="py-8 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-5xl text-center">
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
