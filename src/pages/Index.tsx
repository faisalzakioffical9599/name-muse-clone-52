import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Baby, HeartHandshake } from "lucide-react";
import Header from "../components/Header";
import SearchBar from "@/components/SearchBar";
import AlphabetNav from "../components/AlphabetNav";
import FeaturedNames from "../components/FeaturedNames";
import RegionalCategories from "../components/RegionalCategories";
import NameCard from "../components/NameCard";
import AdminLink from "@/components/AdminLink";

const Index = () => {
  const [selectedLetter, setSelectedLetter] = useState<string | undefined>(undefined);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 500);
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

  const mockNamesByLetter = [
    {
      id: "a1",
      name: "Aiden",
      meaning: "Fiery one",
      gender: "boy" as const,
      origin: "Irish",
      religion: "Christianity",
      language: "Gaelic"
    },
    {
      id: "a2",
      name: "Amara",
      meaning: "Grace, eternal",
      gender: "girl" as const,
      origin: "African",
      religion: "Christianity",
      language: "Igbo"
    },
    {
      id: "a3",
      name: "Atlas",
      meaning: "Bearer of the heavens",
      gender: "boy" as const,
      origin: "Greek",
      religion: "Hellenism",
      language: "Greek"
    },
    {
      id: "a4",
      name: "Aria",
      meaning: "Song or melody",
      gender: "girl" as const,
      origin: "Italian",
      religion: "Christianity",
      language: "Italian"
    },
    {
      id: "a5",
      name: "Asher",
      meaning: "Fortunate, blessed, happy one",
      gender: "boy" as const,
      origin: "Hebrew",
      religion: "Judaism",
      language: "Hebrew"
    },
    {
      id: "a6",
      name: "Avery",
      meaning: "Ruler of the elves",
      gender: "unisex" as const,
      origin: "English",
      religion: "Christianity",
      language: "English"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header>
        <div className="ml-auto">
          <AdminLink />
        </div>
      </Header>
      
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Find the Perfect Name for Your Baby
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore thousands of beautiful names with meanings, origins, and traditions.
            </p>
            
            <SearchBar 
              className="mb-6"
              onSearch={(query) => {
                console.log("Searching:", query);
              }}
            />
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/boy-names"
                className="px-6 py-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200 flex items-center font-medium"
              >
                <Baby size={18} className="mr-2" />
                Boy Names
              </Link>
              <Link 
                to="/girl-names"
                className="px-6 py-3 rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors duration-200 flex items-center font-medium"
              >
                <Baby size={18} className="mr-2" />
                Girl Names
              </Link>
              <Link 
                to="/unisex-names"
                className="px-6 py-3 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors duration-200 flex items-center font-medium"
              >
                <HeartHandshake size={18} className="mr-2" />
                Unisex Names
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Browse Names by Region</h2>
            <p className="text-muted-foreground">
              Discover beautiful names from different cultures and traditions
            </p>
          </div>
          
          <RegionalCategories />
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <FeaturedNames 
            title="Popular Names" 
            subtitle="Trending names loved by parents around the world"
            type="popular"
          />
        </div>
      </section>
      
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Browse Names by Letter</h2>
            <p className="text-muted-foreground">
              Explore names alphabetically and find the perfect one
            </p>
          </div>
          
          <AlphabetNav 
            onLetterSelect={(letter) => setSelectedLetter(letter)} 
            selectedLetter={selectedLetter}
          />
          
          {selectedLetter ? (
            <div className="animate-scale-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  Names Starting With '{selectedLetter}'
                </h3>
                <Link 
                  to={`/names/${selectedLetter.toLowerCase()}`}
                  className="text-primary flex items-center hover:underline text-sm font-medium"
                >
                  View all
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockNamesByLetter.map((name) => (
                  <NameCard key={name.id} {...name} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Select a letter to see name suggestions
            </div>
          )}
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <FeaturedNames 
            title="Recently Added Names" 
            subtitle="New additions to our extensive name collection"
            type="recent"
          />
          
          <div className="text-center mt-10">
            <Link 
              to="/all-names"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              Explore All Names
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      <footer className="py-12 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Name Categories</h3>
              <ul className="space-y-2">
                <li><Link to="/boy-names" className="text-gray-600 hover:text-primary transition-colors">Boy Names</Link></li>
                <li><Link to="/girl-names" className="text-gray-600 hover:text-primary transition-colors">Girl Names</Link></li>
                <li><Link to="/unisex-names" className="text-gray-600 hover:text-primary transition-colors">Unisex Names</Link></li>
                <li><Link to="/unique-names" className="text-gray-600 hover:text-primary transition-colors">Unique Names</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Origins</h3>
              <ul className="space-y-2">
                <li><Link to="/arabic-names" className="text-gray-600 hover:text-primary transition-colors">Arabic Names</Link></li>
                <li><Link to="/english-names" className="text-gray-600 hover:text-primary transition-colors">English Names</Link></li>
                <li><Link to="/hebrew-names" className="text-gray-600 hover:text-primary transition-colors">Hebrew Names</Link></li>
                <li><Link to="/indian-names" className="text-gray-600 hover:text-primary transition-colors">Indian Names</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/name-meanings" className="text-gray-600 hover:text-primary transition-colors">Name Meanings</Link></li>
                <li><Link to="/naming-tips" className="text-gray-600 hover:text-primary transition-colors">Naming Tips</Link></li>
                <li><Link to="/baby-naming-traditions" className="text-gray-600 hover:text-primary transition-colors">Naming Traditions</Link></li>
                <li><Link to="/popular-trends" className="text-gray-600 hover:text-primary transition-colors">Popular Trends</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-10 pt-6 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} NameMuse. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
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

export default Index;
