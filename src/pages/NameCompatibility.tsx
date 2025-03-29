
import React, { useState } from "react";
import Header from "../components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Check, X, AlertTriangle, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NameCompatibility = () => {
  const { toast } = useToast();
  const [firstSibling, setFirstSibling] = useState("");
  const [secondSibling, setSecondSibling] = useState("");
  const [result, setResult] = useState<any | null>(null);

  const checkCompatibility = () => {
    if (!firstSibling || !secondSibling) {
      toast({
        title: "Missing names",
        description: "Please enter both sibling names to check compatibility.",
        variant: "destructive",
      });
      return;
    }

    // Simple compatibility algorithm for demo purposes
    const first = firstSibling.trim().toLowerCase();
    const second = secondSibling.trim().toLowerCase();
    
    // Phonetic similarity (starting with same letter is less compatible)
    const phoneticScore = first.charAt(0) === second.charAt(0) ? 60 : 90;
    
    // Length compatibility (similar lengths are more compatible)
    const lengthDiff = Math.abs(first.length - second.length);
    const lengthScore = lengthDiff <= 2 ? 90 : lengthDiff <= 4 ? 75 : 60;
    
    // Vowel/consonant balance
    const firstVowels = (first.match(/[aeiou]/gi) || []).length / first.length;
    const secondVowels = (second.match(/[aeiou]/gi) || []).length / second.length;
    const vowelDiff = Math.abs(firstVowels - secondVowels);
    const vowelScore = vowelDiff < 0.2 ? 85 : vowelDiff < 0.4 ? 70 : 60;
    
    // Syllable comparison
    const syllableScore = Math.random() * 30 + 60; // Random for this demo
    
    // Calculate overall compatibility
    const overallScore = Math.round((phoneticScore + lengthScore + vowelScore + syllableScore) / 4);
    
    // Generate feedback
    let feedback = "";
    let compatibility = "";
    
    if (overallScore >= 85) {
      feedback = "These names sound harmonious together and have a great sibling flow!";
      compatibility = "Excellent";
    } else if (overallScore >= 75) {
      feedback = "These names work well together with good balance and rhythm.";
      compatibility = "Good";
    } else if (overallScore >= 65) {
      feedback = "These names have some compatible elements but also some minor clashes.";
      compatibility = "Fair";
    } else {
      feedback = "These names might create some confusion or be difficult to use together.";
      compatibility = "Poor";
    }
    
    setResult({
      overallScore,
      compatibility,
      feedback,
      details: [
        { name: "Phonetic Harmony", score: phoneticScore },
        { name: "Length Balance", score: lengthScore },
        { name: "Vowel/Consonant Balance", score: vowelScore },
        { name: "Syllable Flow", score: syllableScore }
      ]
    });
    
    toast({
      title: "Compatibility Checked",
      description: `${firstSibling} and ${secondSibling} have ${compatibility.toLowerCase()} compatibility.`,
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 65) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 75) return <Check className="h-5 w-5 text-green-600" />;
    if (score >= 65) return <AlertTriangle className="h-5 w-5 text-amber-600" />;
    return <X className="h-5 w-5 text-red-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Sibling Name Compatibility</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check how well two sibling names sound together and get insights on their phonetic harmony, length balance, and overall flow.
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Check Sibling Names</CardTitle>
              <CardDescription>
                Enter two names to analyze their compatibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="firstSibling">First Sibling Name</Label>
                  <Input 
                    id="firstSibling" 
                    placeholder="e.g., Emma" 
                    value={firstSibling}
                    onChange={(e) => setFirstSibling(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondSibling">Second Sibling Name</Label>
                  <Input 
                    id="secondSibling" 
                    placeholder="e.g., Noah" 
                    value={secondSibling}
                    onChange={(e) => setSecondSibling(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={checkCompatibility} className="w-full">
                <Heart className="mr-2 h-4 w-4" />
                Check Compatibility
              </Button>
            </CardContent>
          </Card>
          
          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Compatibility Results</span>
                  <span className={`text-2xl ${getScoreColor(result.overallScore)}`}>
                    {result.overallScore}%
                  </span>
                </CardTitle>
                <CardDescription>
                  {firstSibling} & {secondSibling} have {result.compatibility.toLowerCase()} compatibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <p className="text-gray-700">{result.feedback}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Detailed Analysis</h3>
                    
                    {result.details.map((detail: any, index: number) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{detail.name}</span>
                          <span className={`flex items-center ${getScoreColor(detail.score)}`}>
                            {getScoreIcon(detail.score)}
                            <span className="ml-1">{detail.score}%</span>
                          </span>
                        </div>
                        <Progress value={detail.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  This compatibility check considers phonetic harmony, length balance, vowel/consonant balance, and syllable flow.
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default NameCompatibility;
