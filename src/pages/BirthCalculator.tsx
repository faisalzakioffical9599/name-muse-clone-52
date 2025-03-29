
import React, { useState } from "react";
import Header from "../components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calculator, Star, Sun, Moon, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for zodiac-associated names
const zodiacNames = {
  aries: [
    { name: "Aries", gender: "unisex", meaning: "Ram constellation", origin: "Latin" },
    { name: "Blaze", gender: "unisex", meaning: "Flame, fire", origin: "English" },
    { name: "Ash", gender: "unisex", meaning: "Ash tree", origin: "English" },
    { name: "Ember", gender: "girl", meaning: "Spark, glowing fragment", origin: "English" },
    { name: "Leo", gender: "boy", meaning: "Lion", origin: "Latin" },
    { name: "Ruby", gender: "girl", meaning: "Deep red precious stone", origin: "Latin" },
  ],
  taurus: [
    { name: "Taurus", gender: "unisex", meaning: "Bull constellation", origin: "Latin" },
    { name: "Adam", gender: "boy", meaning: "Earth, ground", origin: "Hebrew" },
    { name: "Amber", gender: "girl", meaning: "Fossilized tree resin", origin: "Arabic" },
    { name: "Terra", gender: "girl", meaning: "Earth, land", origin: "Latin" },
    { name: "Jasper", gender: "boy", meaning: "Precious stone", origin: "Persian" },
    { name: "Emerald", gender: "girl", meaning: "Green gemstone", origin: "Greek" },
  ],
  gemini: [
    { name: "Gemini", gender: "unisex", meaning: "Twins constellation", origin: "Latin" },
    { name: "Castor", gender: "boy", meaning: "One of the Gemini twins", origin: "Greek" },
    { name: "Pollux", gender: "boy", meaning: "One of the Gemini twins", origin: "Greek" },
    { name: "Airy", gender: "girl", meaning: "Light as air", origin: "English" },
    { name: "Mercury", gender: "boy", meaning: "Roman messenger god", origin: "Latin" },
    { name: "Zephyr", gender: "unisex", meaning: "West wind", origin: "Greek" },
  ],
  cancer: [
    { name: "Cancer", gender: "unisex", meaning: "Crab constellation", origin: "Latin" },
    { name: "Selene", gender: "girl", meaning: "Moon goddess", origin: "Greek" },
    { name: "Luna", gender: "girl", meaning: "Moon", origin: "Latin" },
    { name: "Pearl", gender: "girl", meaning: "Precious gem from the sea", origin: "Latin" },
    { name: "Dylan", gender: "boy", meaning: "Son of the sea", origin: "Welsh" },
    { name: "Marina", gender: "girl", meaning: "From the sea", origin: "Latin" },
  ],
  leo: [
    { name: "Leo", gender: "boy", meaning: "Lion", origin: "Latin" },
    { name: "Leona", gender: "girl", meaning: "Lioness", origin: "Latin" },
    { name: "Sunshine", gender: "girl", meaning: "Light of the sun", origin: "English" },
    { name: "Apollo", gender: "boy", meaning: "Greek sun god", origin: "Greek" },
    { name: "Orion", gender: "boy", meaning: "Hunter constellation", origin: "Greek" },
    { name: "Soleil", gender: "girl", meaning: "Sun", origin: "French" },
  ],
  virgo: [
    { name: "Virgo", gender: "girl", meaning: "Virgin, maiden", origin: "Latin" },
    { name: "Ceres", gender: "girl", meaning: "Goddess of agriculture", origin: "Latin" },
    { name: "Demetria", gender: "girl", meaning: "Goddess of harvest", origin: "Greek" },
    { name: "Virgil", gender: "boy", meaning: "Staff bearer", origin: "Latin" },
    { name: "Sage", gender: "unisex", meaning: "Wise", origin: "Latin" },
    { name: "Prudence", gender: "girl", meaning: "Careful, practical wisdom", origin: "Latin" },
  ],
};

const BirthCalculator = () => {
  const { toast } = useToast();
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [includeChineseZodiac, setIncludeChineseZodiac] = useState(true);
  const [includeNumerology, setIncludeNumerology] = useState(true);
  const [calculatedZodiac, setCalculatedZodiac] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const calculateZodiac = () => {
    if (!birthDate) {
      toast({
        title: "Missing birth date",
        description: "Please enter a birth date to calculate zodiac sign.",
        variant: "destructive",
      });
      return;
    }
    
    // Simple zodiac calculation for demo purposes
    const date = new Date(birthDate);
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    const day = date.getDate();
    
    let zodiacSign = "";
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      zodiacSign = "aries";
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      zodiacSign = "taurus";
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      zodiacSign = "gemini";
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      zodiacSign = "cancer";
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      zodiacSign = "leo";
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      zodiacSign = "virgo";
    } else {
      // For demo purposes, we'll default to Aries for other dates
      zodiacSign = "aries";
    }
    
    setCalculatedZodiac(zodiacSign);
    
    toast({
      title: "Zodiac calculated",
      description: `Your zodiac sign is ${zodiacSign.charAt(0).toUpperCase() + zodiacSign.slice(1)}.`,
    });
  };

  const toggleFavorite = (name: string) => {
    setFavorites(prev => 
      prev.includes(name) ? prev.filter(favName => favName !== name) : [...prev, name]
    );
    
    toast({
      title: favorites.includes(name) ? "Removed from favorites" : "Added to favorites",
      description: favorites.includes(name)
        ? `${name} has been removed from your favorites.`
        : `${name} has been added to your favorites.`,
    });
  };

  const formatZodiacName = (zodiac: string) => {
    return zodiac.charAt(0).toUpperCase() + zodiac.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Birth Date Name Calculator</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect name for your baby based on their zodiac sign, birth date numerology, and astrological alignments.
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-primary" />
                Calculate Birth Names
              </CardTitle>
              <CardDescription>
                Enter a birth date to discover names that align with that astrological sign
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input 
                    id="birthDate" 
                    type="date" 
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthTime">Birth Time (Optional)</Label>
                  <Input 
                    id="birthTime" 
                    type="time" 
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="chineseZodiac" 
                    checked={includeChineseZodiac}
                    onCheckedChange={(checked) => setIncludeChineseZodiac(checked as boolean)}
                  />
                  <Label htmlFor="chineseZodiac">Include Chinese Zodiac</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="numerology" 
                    checked={includeNumerology}
                    onCheckedChange={(checked) => setIncludeNumerology(checked as boolean)}
                  />
                  <Label htmlFor="numerology">Include Numerology</Label>
                </div>
              </div>
              
              <Button onClick={calculateZodiac} className="w-full">
                <Star className="mr-2 h-4 w-4" />
                Calculate Names
              </Button>
            </CardContent>
          </Card>
          
          {calculatedZodiac && (
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="flex items-center">
                      {calculatedZodiac === "aries" && <span className="mr-2">♈</span>}
                      {calculatedZodiac === "taurus" && <span className="mr-2">♉</span>}
                      {calculatedZodiac === "gemini" && <span className="mr-2">♊</span>}
                      {calculatedZodiac === "cancer" && <span className="mr-2">♋</span>}
                      {calculatedZodiac === "leo" && <span className="mr-2">♌</span>}
                      {calculatedZodiac === "virgo" && <span className="mr-2">♍</span>}
                      {formatZodiacName(calculatedZodiac)} Names
                    </CardTitle>
                    <CardDescription>
                      Names that align with the {formatZodiacName(calculatedZodiac)} zodiac sign traits
                    </CardDescription>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Filter by gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genders</SelectItem>
                      <SelectItem value="boy">Boy Names</SelectItem>
                      <SelectItem value="girl">Girl Names</SelectItem>
                      <SelectItem value="unisex">Unisex Names</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="western" className="w-full">
                  <TabsList className="mb-6 grid w-full grid-cols-3">
                    <TabsTrigger value="western" className="flex items-center">
                      <Sun className="h-4 w-4 mr-2" />
                      Western Zodiac
                    </TabsTrigger>
                    {includeChineseZodiac && (
                      <TabsTrigger value="chinese" className="flex items-center">
                        <Moon className="h-4 w-4 mr-2" />
                        Chinese Zodiac
                      </TabsTrigger>
                    )}
                    {includeNumerology && (
                      <TabsTrigger value="numerology" className="flex items-center">
                        <Calculator className="h-4 w-4 mr-2" />
                        Numerology
                      </TabsTrigger>
                    )}
                  </TabsList>
                  
                  <TabsContent value="western" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {zodiacNames[calculatedZodiac as keyof typeof zodiacNames].map((nameData, index) => (
                        <div 
                          key={index}
                          className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold">{nameData.name}</h3>
                              <Badge 
                                variant="outline" 
                                className={`mt-1 ${
                                  nameData.gender === "boy" ? "text-blue-600" : 
                                  nameData.gender === "girl" ? "text-pink-600" : 
                                  "text-purple-600"
                                }`}
                              >
                                {nameData.gender}
                              </Badge>
                              <p className="text-sm text-gray-500 mt-1">{nameData.origin}</p>
                              <p className="mt-2 text-sm">{nameData.meaning}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleFavorite(nameData.name)}
                              className={favorites.includes(nameData.name) ? "text-red-500" : "text-gray-400 hover:text-red-500"}
                            >
                              <Heart className="h-4 w-4" fill={favorites.includes(nameData.name) ? "currentColor" : "none"} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {includeChineseZodiac && (
                    <TabsContent value="chinese" className="mt-0">
                      <div className="text-center py-8 bg-white rounded-lg border">
                        <h3 className="text-lg font-medium text-gray-700">Chinese Zodiac Names</h3>
                        <p className="text-gray-500 mt-1">
                          Enter a valid birth date to see Chinese zodiac name suggestions.
                        </p>
                      </div>
                    </TabsContent>
                  )}
                  
                  {includeNumerology && (
                    <TabsContent value="numerology" className="mt-0">
                      <div className="text-center py-8 bg-white rounded-lg border">
                        <h3 className="text-lg font-medium text-gray-700">Numerology Names</h3>
                        <p className="text-gray-500 mt-1">
                          Enter a valid birth date to see numerology name suggestions.
                        </p>
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  These name suggestions align with traits commonly associated with {formatZodiacName(calculatedZodiac)} individuals: 
                  {calculatedZodiac === "aries" && " passionate, motivated, and confident"}
                  {calculatedZodiac === "taurus" && " reliable, practical, and devoted"}
                  {calculatedZodiac === "gemini" && " adaptable, outgoing, and clever"}
                  {calculatedZodiac === "cancer" && " intuitive, emotional, and caring"}
                  {calculatedZodiac === "leo" && " creative, passionate, and generous"}
                  {calculatedZodiac === "virgo" && " analytical, hardworking, and practical"}
                  .
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BirthCalculator;
