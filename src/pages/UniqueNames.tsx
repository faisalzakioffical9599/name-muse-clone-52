
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import NameCard from "../components/NameCard";
import { Button } from "@/components/ui/button";
import { Sparkles, Filter } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const UniqueNames = () => {
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock data for unique names
  const uniqueNames = [
    {
      id: "u1",
      name: "Zephyr",
      meaning: "West wind; gentle breeze",
      gender: "unisex" as const,
      origin: "Greek",
      religion: "Hellenism",
      language: "Greek"
    },
    {
      id: "u2",
      name: "Aurora",
      meaning: "Dawn; goddess of the dawn",
      gender: "girl" as const,
      origin: "Latin",
      religion: "Roman",
      language: "Latin"
    },
    {
      id: "u3",
      name: "Orion",
      meaning: "Rising in the sky; hunter",
      gender: "boy" as const,
      origin: "Greek",
      religion: "Hellenism",
      language: "Greek"
    },
    {
      id: "u4",
      name: "Lyra",
      meaning: "Lyre; musical instrument",
      gender: "girl" as const,
      origin: "Greek",
      religion: "Hellenism",
      language: "Greek"
    },
    {
      id: "u5",
      name: "Phoenix",
      meaning: "Mythical bird that rises from ashes",
      gender: "unisex" as const,
      origin: "Greek",
      religion: "Multiple",
      language: "Greek"
    },
    {
      id: "u6",
      name: "Nova",
      meaning: "New; a star showing a sudden increase in brightness",
      gender: "girl" as const,
      origin: "Latin",
      religion: "Multiple",
      language: "Latin"
    },
    {
      id: "u7",
      name: "Atlas",
      meaning: "Bearer of the heavens",
      gender: "boy" as const,
      origin: "Greek",
      religion: "Hellenism",
      language: "Greek"
    },
    {
      id: "u8",
      name: "Caspian",
      meaning: "From the ancient land of Caspia",
      gender: "boy" as const,
      origin: "Persian",
      religion: "Multiple",
      language: "Persian"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-8 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Unique Baby Names
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover unusual and distinctive names that will make your child stand out
            </p>
            
            {/* Search Bar */}
            <SearchBar className="mb-8" />
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Filters and Sorting */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
              Unique Names
            </h2>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Names</SheetTitle>
                  <SheetDescription>
                    Refine names by gender, origin, and more
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  {/* Gender Filter */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Gender</h3>
                    <RadioGroup defaultValue="all">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="gender-all" />
                        <Label htmlFor="gender-all">All</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="boy" id="gender-boy" />
                        <Label htmlFor="gender-boy">Boy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="girl" id="gender-girl" />
                        <Label htmlFor="gender-girl">Girl</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unisex" id="gender-unisex" />
                        <Label htmlFor="gender-unisex">Unisex</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {/* Origin Filter */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Origin</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="origin-greek" />
                        <Label htmlFor="origin-greek">Greek</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="origin-latin" />
                        <Label htmlFor="origin-latin">Latin</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="origin-persian" />
                        <Label htmlFor="origin-persian">Persian</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="origin-celtic" />
                        <Label htmlFor="origin-celtic">Celtic</Label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Length Filter */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Name Length</h3>
                    <RadioGroup defaultValue="any">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="any" id="length-any" />
                        <Label htmlFor="length-any">Any length</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="short" id="length-short" />
                        <Label htmlFor="length-short">Short (1-4 letters)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="length-medium" />
                        <Label htmlFor="length-medium">Medium (5-7 letters)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="long" id="length-long" />
                        <Label htmlFor="length-long">Long (8+ letters)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button>Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Name Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueNames.map(name => (
              <NameCard key={name.id} {...name} />
            ))}
          </div>
          
          {/* SEO Content */}
          <div className="mt-16 prose max-w-none">
            <h2>What Makes a Name Unique?</h2>
            <p>
              Unique baby names are those that stand out from popular trends and conventional choices. 
              These distinctive names often have unusual origins, rare spellings, or uncommon 
              pronunciations. While unique names can come from any culture or tradition, they 
              often share the quality of being relatively uncommon in current naming statistics.
            </p>
            
            <h3>Benefits of Choosing a Unique Name</h3>
            <p>
              Selecting a unique name for your child can offer several advantages:
            </p>
            <ul>
              <li>Distinction in school and professional settings</li>
              <li>A strong sense of identity and individuality</li>
              <li>A memorable name that people are likely to remember</li>
              <li>A conversation starter with an interesting story or meaning</li>
            </ul>
            
            <h3>Finding the Perfect Balance</h3>
            <p>
              While unique names can be wonderful, it's important to consider how the name 
              will serve your child throughout their life. The best unique names are those 
              that are distinctive without being difficult to spell or pronounce. They 
              should feel special without creating unnecessary challenges.
            </p>
            
            <h3>Unique Name Inspiration</h3>
            <p>
              If you're seeking a unique name for your child, consider these sources of inspiration:
            </p>
            <ul>
              <li>Mythology and folklore from around the world</li>
              <li>Nature-inspired names from astronomy, botany, or geography</li>
              <li>Literary characters and authors</li>
              <li>Family surnames or ancestral names</li>
              <li>Words from other languages that have beautiful meanings</li>
            </ul>
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

export default UniqueNames;
