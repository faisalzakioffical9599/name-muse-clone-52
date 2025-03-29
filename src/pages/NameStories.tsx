
import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { FilterOptions } from "../components/SearchFilter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Globe } from "lucide-react";

// Mock data - would come from an API in a real application
const mockStories = [
  {
    id: "1",
    name: "Dawood Ibrahim",
    country: "India",
    category: "Notable Figures",
    shortDescription: "A figure known in the underworld of Mumbai",
    story: "Dawood Ibrahim Kaskar is an Indian gangster and drug kingpin from Dongri, Mumbai. He reportedly heads the Indian organised crime syndicate D-Company founded in Mumbai. He is currently believed to be residing in Pakistan, though his exact location is unknown.",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Al Capone",
    country: "United States",
    category: "Historical Figures",
    shortDescription: "American gangster who led a Prohibition-era crime syndicate",
    story: "Alphonse Gabriel Capone was an American gangster and businessman who attained notoriety during the Prohibition era as the co-founder and boss of the Chicago Outfit. His seven-year reign as a crime boss ended when he went to prison at the age of 33.",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Pablo Escobar",
    country: "Colombia",
    category: "Notable Figures",
    shortDescription: "Colombian drug lord and narcoterrorist",
    story: "Pablo Emilio Escobar Gaviria was a Colombian drug lord and narcoterrorist who was the founder and sole leader of the Medellín Cartel. Dubbed 'The King of Cocaine,' Escobar is the wealthiest criminal in history.",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Yakuza Bosses",
    country: "Japan",
    category: "Cultural Icons",
    shortDescription: "Leaders of Japan's organized crime syndicates",
    story: "The Yakuza are members of transnational organized crime syndicates originating in Japan. The Japanese police, and media by request of the police, call them 'bōryokudan', while the yakuza call themselves 'ninkyō dantai'.",
    imageUrl: "/placeholder.svg"
  }
];

// Available categories and countries for filtering
const categories = [
  "All Categories",
  "Notable Figures",
  "Historical Figures",
  "Leaders",
  "Cultural Icons",
  "Religious Figures",
  "Literary Characters"
];

const countries = [
  "All Countries",
  "India",
  "United States",
  "Colombia",
  "Japan",
  "Italy",
  "Russia",
  "Mexico"
];

const NameStories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<FilterOptions>({});
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const handleSearch = (searchTerm: string, filters: FilterOptions) => {
    setSearchQuery(searchTerm);
    setSearchFilters(filters);
    console.log("Searching:", searchTerm, filters);
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Name Stories</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the fascinating stories behind names of notable figures throughout history and across different cultures.
            </p>
          </div>
          
          <div className="mb-8">
            <SearchBar
              placeholder="Search name stories..."
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
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Badge 
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="country" className="border rounded-md p-4">
                <div className="flex flex-wrap gap-2">
                  {countries.map(country => (
                    <Badge 
                      key={country}
                      variant={selectedCountry === country ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCountry(country)}
                    >
                      {country}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {filteredStories.length > 0 ? (
            <div className="space-y-6">
              {filteredStories.map(story => (
                <Card key={story.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{story.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{story.category}</Badge>
                          <Badge variant="secondary">{story.country}</Badge>
                        </CardDescription>
                      </div>
                      <img 
                        src={story.imageUrl} 
                        alt={story.name} 
                        className="h-16 w-16 object-cover rounded-md"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      {expandedStory === story.id ? story.story : story.shortDescription}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      onClick={() => toggleStoryExpansion(story.id)}
                    >
                      {expandedStory === story.id ? "Show Less" : "Read More"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow border">
              <h3 className="text-lg font-medium text-gray-700 mb-2">No stories found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NameStories;
