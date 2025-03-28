
import React, { useState } from "react";
import Header from "../components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, RefreshCw } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const LoveCalculator = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const { toast } = useToast();

  // Function to calculate "love percentage" (Just for fun, not scientific!)
  const calculateLove = () => {
    if (!firstName.trim() || !secondName.trim()) {
      toast({
        title: "Please enter both names",
        description: "We need two names to calculate compatibility.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Simple algorithm that generates a consistent result for the same name pairs
      // This is just for fun and has no scientific basis
      const combinedNames = (firstName + secondName).toLowerCase().replace(/\s/g, '');
      let sum = 0;
      for (let i = 0; i < combinedNames.length; i++) {
        sum += combinedNames.charCodeAt(i);
      }
      
      // Ensure we get a value between 0-100
      const loveScore = sum % 101;
      setResult(loveScore);
      
      // Set analysis based on score
      if (loveScore > 80) {
        setAnalysis("Amazing compatibility! Your names suggest a harmonious and passionate connection.");
      } else if (loveScore > 60) {
        setAnalysis("Good compatibility! Your names indicate a balanced and supportive relationship.");
      } else if (loveScore > 40) {
        setAnalysis("Moderate compatibility. Your relationship may require work but has potential.");
      } else {
        setAnalysis("Your names suggest you might be better as friends than romantic partners.");
      }
      
      setLoading(false);
    }, 1500);
  };

  const resetCalculator = () => {
    setFirstName("");
    setSecondName("");
    setResult(null);
    setAnalysis("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 px-4 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Love Name Calculator
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Calculate the compatibility between two names for fun
          </p>
          
          <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Heart className="h-5 w-5 text-pink-500 fill-pink-500" />
                Name Compatibility
              </CardTitle>
              <CardDescription>
                Enter two names to calculate their compatibility score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1.5">First Name</label>
                  <Input
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Second Name</label>
                  <Input
                    placeholder="Enter second name"
                    value={secondName}
                    onChange={(e) => setSecondName(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                className="w-full" 
                onClick={calculateLove}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4 mr-2" />
                    Calculate Compatibility
                  </>
                )}
              </Button>
              
              {result !== null && (
                <div className="w-full space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Compatibility Score:</span>
                    <span className="text-lg font-bold">{result}%</span>
                  </div>
                  <Progress value={result} className="h-2" 
                    style={{
                      background: "linear-gradient(to right, #fee2e2, #fecaca, #fca5a5, #f87171, #ef4444)",
                    }}
                  />
                  <p className="text-sm text-gray-600 mt-2">{analysis}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3" 
                    onClick={resetCalculator}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose max-w-none">
            <h2>About the Love Calculator</h2>
            <p>
              Our Name Compatibility Calculator is a fun tool that analyzes the letters in two 
              names to generate a compatibility percentage. While not based on scientific 
              principles, many people enjoy using name calculators for entertainment or as a 
              lighthearted way to explore relationship potential.
            </p>
            
            <div className="bg-pink-50 p-6 rounded-lg my-6">
              <h3 className="text-pink-700">How the Calculator Works</h3>
              <p className="text-gray-700">
                The calculator uses a special algorithm that analyzes the patterns and 
                numerical values of letters in both names. It considers factors like letter 
                frequency, name length, and character combinations to generate a compatibility 
                percentage between 0-100%.
              </p>
              <p className="text-sm italic">
                Remember: This calculator is meant for entertainment purposes only and should not 
                be used as a basis for making serious relationship decisions!
              </p>
            </div>
            
            <h3>The History of Name Compatibility</h3>
            <p>
              The idea that names can predict compatibility has roots in various cultural traditions:
            </p>
            <ul>
              <li>Numerology assigns numerical values to letters and uses these to assess compatibility</li>
              <li>Some Chinese traditions analyze the number of strokes in written characters</li>
              <li>Ancient Greek and Hebrew traditions assigned mystical significance to names</li>
            </ul>
            
            <h3>Tips for Finding Compatible Names</h3>
            <p>
              If you're curious about name compatibility beyond our calculator, consider these factors:
            </p>
            <ul>
              <li>Names with complementary sounds often work well together</li>
              <li>Names with balanced syllable counts can create harmony</li>
              <li>Names that share cultural or linguistic roots may feel naturally connected</li>
              <li>Names with similar meanings can reflect shared values</li>
            </ul>
            
            <p>
              Whether you're checking compatibility with a romantic partner, a friend, or even 
              considering how your name might pair with a potential baby name, our Love Calculator 
              offers a fun way to explore these connections.
            </p>
            
            <p className="text-center italic mt-8">
              <em>
                Share your results with friends and see if they match your real-life experience!
              </em>
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

export default LoveCalculator;
