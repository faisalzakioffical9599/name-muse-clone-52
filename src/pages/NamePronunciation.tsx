
import React, { useState } from "react";
import Header from "../components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Upload, Headphones, Volume2, Search, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for difficult names
const difficultNames = [
  { id: "1", name: "Aoife", pronunciation: "EE-fa", origin: "Irish", audioUrl: "#" },
  { id: "2", name: "Siobhan", pronunciation: "shi-VAWN", origin: "Irish", audioUrl: "#" },
  { id: "3", name: "Nguyen", pronunciation: "nwin", origin: "Vietnamese", audioUrl: "#" },
  { id: "4", name: "Xochitl", pronunciation: "SO-cheel", origin: "Nahuatl", audioUrl: "#" },
  { id: "5", name: "Saoirse", pronunciation: "SEER-sha", origin: "Irish", audioUrl: "#" },
  { id: "6", name: "Caoimhe", pronunciation: "KEE-va", origin: "Irish", audioUrl: "#" },
  { id: "7", name: "Joaquin", pronunciation: "wah-KEEN", origin: "Spanish", audioUrl: "#" },
  { id: "8", name: "Niamh", pronunciation: "NEEV", origin: "Irish", audioUrl: "#" },
  { id: "9", name: "Mhairi", pronunciation: "VAH-ree", origin: "Scottish", audioUrl: "#" },
  { id: "10", name: "Tadgh", pronunciation: "TYG", origin: "Irish", audioUrl: "#" },
  { id: "11", name: "Xiomara", pronunciation: "see-oh-MAH-rah", origin: "Spanish", audioUrl: "#" },
  { id: "12", name: "Eilidh", pronunciation: "AY-lee", origin: "Scottish", audioUrl: "#" },
];

// Languages for pronunciation
const languages = [
  { value: "english-us", label: "English (US)" },
  { value: "english-uk", label: "English (UK)" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "italian", label: "Italian" },
  { value: "japanese", label: "Japanese" },
  { value: "mandarin", label: "Mandarin" },
  { value: "hindi", label: "Hindi" },
];

const NamePronunciation = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [searchName, setSearchName] = useState("");
  const [language, setLanguage] = useState("english-us");

  // Filter names based on search query
  const filteredNames = difficultNames.filter(name => 
    name.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    name.origin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const playPronunciation = (id: string) => {
    // In a real app, this would play the audio file
    setIsPlaying(isPlaying === id ? null : id);
    
    if (isPlaying !== id) {
      toast({
        title: "Playing pronunciation",
        description: `Now playing the pronunciation for ${difficultNames.find(name => name.id === id)?.name}.`,
      });
      
      // Simulate audio playback ending after 2 seconds
      setTimeout(() => {
        setIsPlaying(null);
      }, 2000);
    }
  };

  const searchPronunciation = () => {
    if (!searchName) {
      toast({
        title: "Missing name",
        description: "Please enter a name to search for pronunciation.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would search for the name in a database
    toast({
      title: "Pronunciation searched",
      description: `Showing pronunciation results for "${searchName}" in ${languages.find(lang => lang.value === language)?.label}.`,
    });
    
    setSearchQuery(searchName);
  };

  const uploadPronunciation = () => {
    // In a real app, this would open a file picker
    toast({
      title: "Upload feature",
      description: "Custom pronunciation upload would be implemented here.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Name Pronunciation Guide</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn how to correctly pronounce difficult or unique names from around the world with our audio pronunciation guide.
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Find Name Pronunciation</CardTitle>
              <CardDescription>
                Search for a name to hear its correct pronunciation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="md:col-span-2">
                  <div className="space-y-2">
                    <Label htmlFor="searchName">Name</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input 
                        id="searchName" 
                        placeholder="e.g., Siobhan, Nguyen, Joaquin" 
                        className="pl-8"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map(lang => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={uploadPronunciation}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Custom
                </Button>
                <Button onClick={searchPronunciation}>
                  <Headphones className="mr-2 h-4 w-4" />
                  Find Pronunciation
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pronunciation Library</CardTitle>
              <CardDescription>
                Explore pronunciation guides for difficult-to-pronounce names
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4 grid w-full grid-cols-3">
                  <TabsTrigger value="all">All Origins</TabsTrigger>
                  <TabsTrigger value="irish">Irish</TabsTrigger>
                  <TabsTrigger value="international">International</TabsTrigger>
                </TabsList>
                
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Filter names..." 
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                {["all", "irish", "international"].map(tabValue => (
                  <TabsContent key={tabValue} value={tabValue} className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredNames
                        .filter(name => 
                          tabValue === "all" || 
                          (tabValue === "irish" && name.origin === "Irish") ||
                          (tabValue === "international" && name.origin !== "Irish")
                        )
                        .map(name => (
                          <div 
                            key={name.id}
                            className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold">{name.name}</h3>
                                <div className="flex items-center mt-1">
                                  <Globe className="h-3.5 w-3.5 text-gray-500 mr-1" />
                                  <span className="text-sm text-gray-500">{name.origin}</span>
                                </div>
                                <p className="mt-2 font-medium">{name.pronunciation}</p>
                              </div>
                              <Button 
                                variant={isPlaying === name.id ? "default" : "outline"} 
                                size="icon"
                                onClick={() => playPronunciation(name.id)}
                                className={isPlaying === name.id ? "bg-primary text-primary-foreground" : ""}
                              >
                                {isPlaying === name.id ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    
                    {filteredNames.filter(name => 
                      tabValue === "all" || 
                      (tabValue === "irish" && name.origin === "Irish") ||
                      (tabValue === "international" && name.origin !== "Irish")
                    ).length === 0 && (
                      <div className="text-center py-8">
                        <Volume2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-700">No names found</h3>
                        <p className="text-gray-500 mt-1">
                          {searchQuery 
                            ? "Try a different search term" 
                            : "No names available in this category"}
                        </p>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NamePronunciation;
