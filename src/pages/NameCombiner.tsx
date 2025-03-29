
import React, { useState } from "react";
import Header from "../components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Heart, Shuffle, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NameCombiner = () => {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [combinations, setCombinations] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generateCombinations = () => {
    if (!firstName || !secondName) {
      toast({
        title: "Missing names",
        description: "Please enter both parent names to generate combinations.",
        variant: "destructive",
      });
      return;
    }

    // Simple combination algorithm
    const first = firstName.trim();
    const second = secondName.trim();
    
    const firstHalf = first.substring(0, Math.ceil(first.length / 2));
    const secondHalf = second.substring(Math.floor(second.length / 2));
    
    const firstPart = first.substring(0, 2);
    const secondPart = second.substring(0, 2);
    
    const secondFirstPart = second.substring(0, 2);
    const firstLastPart = first.substring(first.length - 2);
    
    // Generate various combinations
    const result = [
      firstHalf + secondHalf,
      secondHalf + firstHalf,
      firstPart + second.toLowerCase(),
      secondPart + first.toLowerCase(),
      first + secondFirstPart.toLowerCase(),
      secondFirstPart + firstLastPart,
      first.charAt(0) + second,
      second.charAt(0) + first,
    ].filter(name => name.length >= 3 && name.length <= 12);
    
    // Ensure unique names and proper capitalization
    const uniqueNames = [...new Set(result)].map(
      name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    );
    
    setCombinations(uniqueNames);
    
    toast({
      title: "Combinations Generated",
      description: `Created ${uniqueNames.length} unique name combinations.`,
    });
  };

  const toggleFavorite = (name: string) => {
    setFavorites(prev => 
      prev.includes(name) 
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
    
    toast({
      title: favorites.includes(name) ? "Removed from favorites" : "Added to favorites",
      description: favorites.includes(name) 
        ? `${name} has been removed from your favorites.`
        : `${name} has been added to your favorites.`,
    });
  };

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopied(name);
    
    toast({
      title: "Copied to clipboard",
      description: `${name} has been copied to your clipboard.`,
    });
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Name Combiner</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create unique baby names by combining parts of two parent names. Perfect for couples wanting a meaningful blend of their identities.
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Combine Parent Names</CardTitle>
              <CardDescription>
                Enter two names to create unique combinations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Parent Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="e.g., Michael" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondName">Second Parent Name</Label>
                  <Input 
                    id="secondName" 
                    placeholder="e.g., Elizabeth" 
                    value={secondName}
                    onChange={(e) => setSecondName(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={generateCombinations} className="w-full">
                <Shuffle className="mr-2 h-4 w-4" />
                Generate Combinations
              </Button>
            </CardContent>
          </Card>
          
          {combinations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Name Combinations</CardTitle>
                <CardDescription>
                  {combinations.length} unique combinations created from {firstName} and {secondName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {combinations.map((name, index) => (
                    <div key={index} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-medium">{name}</span>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(name)}
                            className={favorites.includes(name) ? "text-red-500" : "text-gray-400 hover:text-red-500"}
                          >
                            <Heart className="h-4 w-4" fill={favorites.includes(name) ? "currentColor" : "none"} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(name)}
                          >
                            {copied === name ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">Combination</Badge>
                        {name.length <= 5 && <Badge variant="outline" className="text-xs">Short</Badge>}
                        {name.length >= 8 && <Badge variant="outline" className="text-xs">Long</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default NameCombiner;
