
import React, { useState } from "react";
import Header from "../components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Minus, BarChart3, TrendingUp, Map, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for trending names
const trendingBoyNames = [
  { id: "1", name: "Liam", rank: 1, change: "same", region: "United States", popularity: 95 },
  { id: "2", name: "Noah", rank: 2, change: "up", region: "United States", popularity: 92 },
  { id: "3", name: "Oliver", rank: 3, change: "up", region: "United States", popularity: 90 },
  { id: "4", name: "Elijah", rank: 4, change: "up", region: "United States", popularity: 87 },
  { id: "5", name: "William", rank: 5, change: "down", region: "United States", popularity: 85 },
  { id: "6", name: "James", rank: 6, change: "down", region: "United States", popularity: 84 },
  { id: "7", name: "Benjamin", rank: 7, change: "same", region: "United States", popularity: 82 },
  { id: "8", name: "Lucas", rank: 8, change: "up", region: "United States", popularity: 80 },
  { id: "9", name: "Henry", rank: 9, change: "up", region: "United States", popularity: 78 },
  { id: "10", name: "Alexander", rank: 10, change: "down", region: "United States", popularity: 76 },
];

const trendingGirlNames = [
  { id: "1", name: "Olivia", rank: 1, change: "same", region: "United States", popularity: 96 },
  { id: "2", name: "Emma", rank: 2, change: "down", region: "United States", popularity: 94 },
  { id: "3", name: "Charlotte", rank: 3, change: "up", region: "United States", popularity: 91 },
  { id: "4", name: "Amelia", rank: 4, change: "up", region: "United States", popularity: 88 },
  { id: "5", name: "Ava", rank: 5, change: "down", region: "United States", popularity: 86 },
  { id: "6", name: "Sophia", rank: 6, change: "down", region: "United States", popularity: 84 },
  { id: "7", name: "Isabella", rank: 7, change: "same", region: "United States", popularity: 82 },
  { id: "8", name: "Mia", rank: 8, change: "up", region: "United States", popularity: 80 },
  { id: "9", name: "Evelyn", rank: 9, change: "up", region: "United States", popularity: 78 },
  { id: "10", name: "Harper", rank: 10, change: "down", region: "United States", popularity: 76 },
];

// Regions for filtering
const regions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "nz", label: "New Zealand" },
  { value: "ie", label: "Ireland" },
];

const TrendingNames = () => {
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState("us");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string, name: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
    
    toast({
      title: favorites.includes(id) ? "Removed from favorites" : "Added to favorites",
      description: favorites.includes(id)
        ? `${name} has been removed from your favorites.`
        : `${name} has been added to your favorites.`,
    });
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    
    toast({
      title: "Region changed",
      description: `Now showing trending names for ${regions.find(r => r.value === region)?.label}.`,
    });
  };

  const getTrendIcon = (change: string) => {
    switch (change) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Trending Baby Names</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the most popular and fast-rising baby names in different regions around the world.
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Trending Names
                  </CardTitle>
                  <CardDescription>
                    The most popular baby names based on recent data
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Map className="h-4 w-4 text-gray-500" />
                  <Select value={selectedRegion} onValueChange={handleRegionChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map(region => (
                        <SelectItem key={region.value} value={region.value}>
                          {region.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="boy" className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-2">
                  <TabsTrigger value="boy">Boy Names</TabsTrigger>
                  <TabsTrigger value="girl">Girl Names</TabsTrigger>
                </TabsList>
                
                <TabsContent value="boy" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {trendingBoyNames.map(name => (
                      <div 
                        key={name.id}
                        className="flex items-center justify-between p-3 border rounded-lg bg-white hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center">
                          <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-medium text-gray-700">
                            {name.rank}
                          </div>
                          <div>
                            <h3 className="font-semibold">{name.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-0.5">
                              {getTrendIcon(name.change)}
                              <span className="ml-1">
                                {name.change === "up" 
                                  ? "Rising" 
                                  : name.change === "down" 
                                    ? "Falling" 
                                    : "Stable"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{name.popularity}%</Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(name.id, name.name)}
                            className={favorites.includes(name.id) ? "text-red-500" : "text-gray-400 hover:text-red-500"}
                          >
                            <Heart className="h-4 w-4" fill={favorites.includes(name.id) ? "currentColor" : "none"} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="girl" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {trendingGirlNames.map(name => (
                      <div 
                        key={name.id}
                        className="flex items-center justify-between p-3 border rounded-lg bg-white hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center">
                          <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-medium text-gray-700">
                            {name.rank}
                          </div>
                          <div>
                            <h3 className="font-semibold">{name.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-0.5">
                              {getTrendIcon(name.change)}
                              <span className="ml-1">
                                {name.change === "up" 
                                  ? "Rising" 
                                  : name.change === "down" 
                                    ? "Falling" 
                                    : "Stable"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{name.popularity}%</Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(name.id, name.name)}
                            className={favorites.includes(name.id) ? "text-red-500" : "text-gray-400 hover:text-red-500"}
                          >
                            <Heart className="h-4 w-4" fill={favorites.includes(name.id) ? "currentColor" : "none"} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Fastest Rising
                </CardTitle>
                <CardDescription>
                  Names gaining popularity quickly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Theo</span>
                    <Badge className="bg-green-500">+32</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Luna</span>
                    <Badge className="bg-green-500">+28</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Mateo</span>
                    <Badge className="bg-green-500">+25</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Nova</span>
                    <Badge className="bg-green-500">+22</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Atlas</span>
                    <Badge className="bg-green-500">+20</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary rotate-180" />
                  Declining Fastest
                </CardTitle>
                <CardDescription>
                  Names decreasing in popularity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Karen</span>
                    <Badge variant="destructive">-45</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Jeffrey</span>
                    <Badge variant="destructive">-30</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Alexa</span>
                    <Badge variant="destructive">-28</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Donald</span>
                    <Badge variant="destructive">-25</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Deborah</span>
                    <Badge variant="destructive">-20</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  New Entries
                </CardTitle>
                <CardDescription>
                  First time in top 100 this year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Kai</span>
                    <Badge className="bg-blue-500">New</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Wren</span>
                    <Badge className="bg-blue-500">New</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Onyx</span>
                    <Badge className="bg-blue-500">New</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Zion</span>
                    <Badge className="bg-blue-500">New</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Aurelia</span>
                    <Badge className="bg-blue-500">New</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingNames;
