
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Book,
  Search,
  ChevronsRight
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NameMeanings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  
  // Mock popular search categories
  const popularCategories = [
    { name: "Strong", description: "Names meaning strength or power" },
    { name: "Light", description: "Names meaning light or brightness" },
    { name: "Love", description: "Names meaning love or beloved" },
    { name: "Wisdom", description: "Names meaning wisdom or knowledge" },
    { name: "Peace", description: "Names meaning peace or tranquility" },
    { name: "Beauty", description: "Names meaning beauty or grace" }
  ];
  
  // Mock name meanings data - in a real app would come from an API
  const nameMeaningsByCategory = {
    strong: [
      { id: "s1", name: "Ethan", meaning: "Strong, firm, enduring", gender: "boy" as const, origin: "Hebrew" },
      { id: "s2", name: "Valerie", meaning: "Strong, brave", gender: "girl" as const, origin: "Latin" },
      { id: "s3", name: "Brian", meaning: "Strong, virtuous, honorable", gender: "boy" as const, origin: "Irish" },
      { id: "s4", name: "Gabriella", meaning: "God is my strength", gender: "girl" as const, origin: "Hebrew" },
    ],
    light: [
      { id: "l1", name: "Lucia", meaning: "Light", gender: "girl" as const, origin: "Latin" },
      { id: "l2", name: "Noor", meaning: "Light", gender: "unisex" as const, origin: "Arabic" },
      { id: "l3", name: "Elinor", meaning: "Shining light", gender: "girl" as const, origin: "Greek" },
      { id: "l4", name: "Apollo", meaning: "God of light and the sun", gender: "boy" as const, origin: "Greek" },
    ]
  };

  // Function to handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate search results (in a real app would query API/DB)
    if (searchTerm.trim() !== "") {
      setSearchResults([
        "Strength/Power", 
        "Protector/Guardian", 
        "Love/Beloved", 
        "Wisdom/Knowledge",
        "Beauty/Grace",
        "Light/Brightness"
      ]);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-8 px-4 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Name Meanings
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover the origins and meanings behind thousands of names
            </p>
          </div>
          
          {/* Search by Meaning Form */}
          <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-sm mb-8">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <Book className="h-5 w-5 mr-2 text-amber-500" />
              Search Names by Meaning
            </h2>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input 
                placeholder="Enter a meaning (e.g., 'strong', 'love')" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
            
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium mb-2">Meaning Categories:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {searchResults.map((result, index) => (
                    <Link 
                      key={index}
                      to={`/meaning/${result.toLowerCase().split('/')[0]}`}
                      className="text-sm flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                      <ChevronsRight className="h-3 w-3 mr-1 text-amber-500" />
                      {result}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Popular Meaning Categories */}
          <h2 className="text-2xl font-bold mb-6">Popular Meaning Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {popularCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link 
                    to={`/meaning/${category.name.toLowerCase()}`}
                    className="text-sm text-primary flex items-center"
                  >
                    View names <ChevronsRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Preview of Names by Meaning */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
            <h2 className="text-xl font-bold mb-6">Explore Names by Meaning</h2>
            
            <Tabs defaultValue="strong">
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="strong">Strength</TabsTrigger>
                <TabsTrigger value="light">Light</TabsTrigger>
              </TabsList>
              
              <TabsContent value="strong">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {nameMeaningsByCategory.strong.map(name => (
                    <Link key={name.id} to={`/name/${name.id}`}>
                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{name.name}</h3>
                            <p className="text-sm text-gray-600">{name.meaning}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            name.gender === "boy" ? "bg-blue-100 text-blue-800" : 
                            name.gender === "girl" ? "bg-pink-100 text-pink-800" : 
                            "bg-purple-100 text-purple-800"
                          }`}>
                            {name.gender}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Origin: {name.origin}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link 
                    to="/meaning/strong"
                    className="text-primary hover:underline text-sm font-medium inline-flex items-center"
                  >
                    View all names meaning strength
                    <ChevronsRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </TabsContent>
              
              <TabsContent value="light">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {nameMeaningsByCategory.light.map(name => (
                    <Link key={name.id} to={`/name/${name.id}`}>
                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{name.name}</h3>
                            <p className="text-sm text-gray-600">{name.meaning}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            name.gender === "boy" ? "bg-blue-100 text-blue-800" : 
                            name.gender === "girl" ? "bg-pink-100 text-pink-800" : 
                            "bg-purple-100 text-purple-800"
                          }`}>
                            {name.gender}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Origin: {name.origin}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link 
                    to="/meaning/light"
                    className="text-primary hover:underline text-sm font-medium inline-flex items-center"
                  >
                    View all names meaning light
                    <ChevronsRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* SEO Content */}
          <div className="prose max-w-none">
            <h2>The Importance of Name Meanings</h2>
            <p>
              Names carry powerful meanings that can shape perceptions and even influence personality. 
              Throughout history, cultures around the world have placed great significance on the 
              meanings behind names, often choosing names that reflect desired qualities, honor 
              family traditions, or connect to cultural heritage.
            </p>
            
            <h3>How to Choose a Name Based on Meaning</h3>
            <p>
              When selecting a name based on its meaning, consider these approaches:
            </p>
            <ul>
              <li>Identify qualities you wish for your child (strength, kindness, wisdom)</li>
              <li>Consider family values or cultural traditions you want to honor</li>
              <li>Look for names related to nature, spirituality, or other personal interests</li>
              <li>Research the etymology of names you already like to discover deeper meanings</li>
            </ul>
            
            <h3>Name Meanings Across Cultures</h3>
            <p>
              Different cultures approach name meanings in unique ways:
            </p>
            <ul>
              <li>Hebrew names often have religious significance or describe divine qualities</li>
              <li>Arabic names frequently express spiritual virtues or praise divine attributes</li>
              <li>Celtic names often connect to nature, mythology, or noble characteristics</li>
              <li>Indian names typically have Sanskrit roots with profound spiritual meanings</li>
              <li>East Asian names are often chosen for their auspicious meanings or symbolic characters</li>
            </ul>
            
            <p>
              Whether you're seeking a name with a specific meaning or curious about the history 
              behind your own name, exploring name meanings can provide fascinating insights into 
              language, culture, and human values.
            </p>
          </div>
        </div>
      </section>
      
      {/* Simplified Footer */}
      <footer className="py-8 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NameMuse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NameMeanings;
