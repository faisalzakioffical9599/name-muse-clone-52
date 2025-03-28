
import React, { useState } from "react";
import Header from "../components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Baby, ArrowRight, Search } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import NameCard from "../components/NameCard";

interface Name {
  id: string;
  name: string;
  meaning: string;
  gender: "boy" | "girl" | "unisex";
  origin: string;
  religion: string;
  language: string;
}

const BabyNameMatcher = () => {
  const [motherName, setMotherName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [gender, setGender] = useState<"boy" | "girl" | "either">("either");
  const [showResults, setShowResults] = useState(false);
  const [suggestedNames, setSuggestedNames] = useState<Name[]>([]);
  const { toast } = useToast();

  // Function to generate name suggestions based on parent names
  const generateSuggestions = () => {
    if (!motherName.trim() || !fatherName.trim()) {
      toast({
        title: "Please enter both parent names",
        description: "We need both names to generate suggestions.",
        variant: "destructive"
      });
      return;
    }

    // This would use an API in a real app, but here we'll generate dummy data
    // The logic tries to create names that have elements from both parents
    
    // Simulate generating names based on parent names and gender
    let generatedNames: Name[] = [];
    
    // Very simple mock algorithm - in a real app would be much more sophisticated
    const mom = motherName.toLowerCase();
    const dad = fatherName.toLowerCase();
    
    // Mock boy names
    const boyNames: Name[] = [
      {
        id: "mn1",
        name: dad.charAt(0).toUpperCase() + mom.substring(1, 3) + dad.substring(dad.length - 2),
        meaning: "Derived from parents' names",
        gender: "boy",
        origin: "Hybrid",
        religion: "Various",
        language: "English"
      },
      {
        id: "mn2",
        name: "Mason",
        meaning: "Stone worker or craftsman",
        gender: "boy",
        origin: "English",
        religion: "Christianity",
        language: "English"
      },
      {
        id: "mn3",
        name: "Daniel",
        meaning: "God is my judge",
        gender: "boy",
        origin: "Hebrew",
        religion: "Judaism/Christianity",
        language: "Hebrew"
      },
      {
        id: "mn4",
        name: "Ethan",
        meaning: "Strong, firm, enduring",
        gender: "boy",
        origin: "Hebrew",
        religion: "Judaism/Christianity",
        language: "Hebrew"
      }
    ];
    
    // Mock girl names
    const girlNames: Name[] = [
      {
        id: "mn5",
        name: mom.charAt(0).toUpperCase() + dad.substring(1, 2) + mom.substring(mom.length - 3),
        meaning: "Derived from parents' names",
        gender: "girl",
        origin: "Hybrid",
        religion: "Various",
        language: "English"
      },
      {
        id: "mn6",
        name: "Sophia",
        meaning: "Wisdom",
        gender: "girl",
        origin: "Greek",
        religion: "Christianity",
        language: "Greek"
      },
      {
        id: "mn7",
        name: "Ava",
        meaning: "Life, living one",
        gender: "girl",
        origin: "Latin/Hebrew",
        religion: "Christianity",
        language: "Latin"
      },
      {
        id: "mn8",
        name: "Isabella",
        meaning: "Pledged to God",
        gender: "girl",
        origin: "Italian/Spanish",
        religion: "Christianity",
        language: "Italian"
      }
    ];
    
    // Filter based on gender selection
    if (gender === "boy") {
      generatedNames = boyNames;
    } else if (gender === "girl") {
      generatedNames = girlNames;
    } else {
      // For "either", mix boy and girl names
      generatedNames = [...boyNames.slice(0, 2), ...girlNames.slice(0, 2)];
    }
    
    setSuggestedNames(generatedNames);
    setShowResults(true);
  };

  const resetForm = () => {
    setMotherName("");
    setFatherName("");
    setGender("either");
    setShowResults(false);
    setSuggestedNames([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Baby Name Matcher
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Generate baby name suggestions based on parents' names
          </p>
          
          {!showResults ? (
            <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-xl">
                  <Baby className="h-5 w-5 text-blue-500" />
                  Find Your Perfect Baby Name
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Mother's Name</label>
                    <Input
                      placeholder="Enter mother's name"
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Father's Name</label>
                    <Input
                      placeholder="Enter father's name"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Baby's Gender</h3>
                    <RadioGroup 
                      value={gender} 
                      onValueChange={(value) => setGender(value as "boy" | "girl" | "either")}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="boy" id="gender-boy" />
                        <Label htmlFor="gender-boy">Boy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="girl" id="gender-girl" />
                        <Label htmlFor="gender-girl">Girl</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="either" id="gender-either" />
                        <Label htmlFor="gender-either">Either</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={generateSuggestions}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Generate Name Suggestions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-left">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Name Suggestions</h2>
                <Button variant="outline" size="sm" onClick={resetForm}>
                  Try Different Names
                </Button>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Based on {motherName} (mother) and {fatherName} (father), here are some name suggestions for your {
                  gender === "either" ? "baby" : gender
                }:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {suggestedNames.map(name => (
                  <NameCard key={name.id} {...name} />
                ))}
              </div>
              
              <div className="text-center pt-2">
                <Button onClick={resetForm} variant="outline">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Try Different Names
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose max-w-none">
            <h2>How the Baby Name Matcher Works</h2>
            <p>
              Our Baby Name Matcher is a creative tool designed to help expectant parents find the 
              perfect name for their child by considering both parents' names. The tool analyzes 
              the characteristics of the parents' names and suggests baby names that may share 
              elements with both, creating a meaningful connection.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h3 className="text-blue-700">Our Name Matching Process</h3>
              <p className="text-gray-700">
                When you enter the mother's and father's names, our algorithm looks at factors such as:
              </p>
              <ul className="text-gray-700">
                <li>Sound patterns and phonetics shared between the parents' names</li>
                <li>Letter combinations that appear in both names</li>
                <li>Cultural and origin connections between the names</li>
                <li>Potential for creating hybrid names using elements from both parents</li>
              </ul>
              <p className="text-sm italic">
                The suggested names are carefully selected to honor both parents while creating 
                a distinct identity for your child.
              </p>
            </div>
            
            <h3>The Tradition of Family-Inspired Names</h3>
            <p>
              The practice of connecting a child's name to their parents or family has deep roots across cultures:
            </p>
            <ul>
              <li>In many cultures, children receive names that incorporate elements from both parents</li>
              <li>Some traditions pass down first letters (e.g., all children's names start with the same letter as the father)</li>
              <li>In certain cultures, syllables from both parents' names are combined to create a new, unique name</li>
              <li>Modern families often create new traditions by finding creative ways to honor both parents</li>
            </ul>
            
            <h3>Tips for Choosing a Name</h3>
            <p>
              When considering names suggested by our matcher or any other source, keep these factors in mind:
            </p>
            <ul>
              <li>How the name sounds when spoken aloud</li>
              <li>Potential nicknames or shortened versions</li>
              <li>The meaning behind the name and its origins</li>
              <li>How the name pairs with your family surname</li>
              <li>Cultural significance and whether it honors your heritage</li>
            </ul>
            
            <p>
              Remember that while our tool provides suggestions, the perfect name is ultimately one that 
              resonates with you and your family. Feel free to use these suggestions as inspiration or 
              as a starting point in your naming journey.
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

export default BabyNameMatcher;
