
import React, { useState } from "react";
import Header from "../components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Star, Award, Film, Trophy, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import SearchBar from "../components/SearchBar";

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
  const { toast } = useToast();

  // Mock data for famous personalities
  const celebrities: Celebrity[] = [
    {
      id: "c1",
      name: "Dwayne Johnson",
      category: "actor",
      description: "Known as The Rock, former WWE wrestler turned Hollywood actor",
      nationality: "American",
      birthYear: 1972,
      achievements: ["Highest-paid actor", "Multiple blockbuster films"]
    },
    {
      id: "c2",
      name: "Elon Musk",
      category: "businessperson",
      description: "Entrepreneur and businessman, founder of Tesla and SpaceX",
      nationality: "South African/American",
      birthYear: 1971,
      achievements: ["Tesla CEO", "SpaceX founder", "One of the world's richest people"]
    },
    {
      id: "c3",
      name: "Lionel Messi",
      category: "sportsperson",
      description: "Professional footballer, considered one of the greatest players of all time",
      nationality: "Argentinian",
      birthYear: 1987,
      achievements: ["Multiple Ballon d'Or awards", "World Cup winner", "Olympic gold medalist"]
    },
    {
      id: "c4",
      name: "Priyanka Chopra",
      category: "actor",
      description: "Actress, model, and singer who has worked in both Bollywood and Hollywood",
      nationality: "Indian",
      birthYear: 1982,
      achievements: ["Miss World 2000", "National Film Award winner", "International acting career"]
    },
    {
      id: "c5",
      name: "Mike Tyson",
      category: "sportsperson",
      description: "Former professional boxer who is considered one of the greatest heavyweight boxers",
      nationality: "American",
      birthYear: 1966,
      achievements: ["Youngest heavyweight champion", "Boxing Hall of Fame"]
    },
    {
      id: "c6",
      name: "Jeff Bezos",
      category: "businessperson",
      description: "Entrepreneur and founder of Amazon",
      nationality: "American",
      birthYear: 1964,
      achievements: ["Founded Amazon", "Blue Origin founder", "One of the world's richest people"]
    }
  ];

  // Filter celebrities based on selected category
  const filteredCelebrities = selectedCategory === "all" 
    ? celebrities 
    : celebrities.filter(celeb => celeb.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Famous Personalities
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore names of famous actors, business leaders, sportspeople, and more
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto mb-10">
              <SearchBar placeholder="Search famous personalities..." className="w-full" />
            </div>
          </div>
          
          {/* Category Tabs */}
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
            <TabsList className="w-full justify-start mb-6 bg-white p-1 shadow-sm border rounded-full">
              <TabsTrigger value="all" className="rounded-full">All</TabsTrigger>
              <TabsTrigger value="actor" className="rounded-full">Actors</TabsTrigger>
              <TabsTrigger value="businessperson" className="rounded-full">Business Leaders</TabsTrigger>
              <TabsTrigger value="sportsperson" className="rounded-full">Sports Stars</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCelebrities.map((celebrity) => (
                  <Card key={celebrity.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl">{celebrity.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 text-sm">
                        <Globe className="h-3 w-3" /> {celebrity.nationality}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
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
                    <CardFooter className="pt-0">
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
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Explore by Category</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Film className="h-5 w-5 text-blue-500" /> Actors & Actresses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Explore names of famous actors and actresses from Hollywood, Bollywood, and global cinema.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setSelectedCategory("actor")}
                >
                  Browse Actors
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" /> Business Leaders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Discover the names of influential entrepreneurs, CEOs, and business visionaries.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setSelectedCategory("businessperson")}
                >
                  Browse Business Leaders
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" /> Sports Stars
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Explore names of legendary athletes from various sports around the world.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setSelectedCategory("sportsperson")}
                >
                  Browse Sports Stars
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-red-500" /> Historical Figures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Learn about the names of influential historical figures who shaped our world.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                >
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>
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
