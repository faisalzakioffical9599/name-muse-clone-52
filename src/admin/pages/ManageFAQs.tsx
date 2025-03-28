
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Save, Trash } from "lucide-react";

const ManageFAQs = () => {
  const [faqDetails, setFaqDetails] = useState({
    question: "",
    answer: ""
  });

  const { toast } = useToast();

  const handleFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would connect to your backend in a real application
    console.log("FAQ submitted:", faqDetails);
    
    toast({
      title: "FAQ Added",
      description: "Your FAQ has been added successfully.",
    });
    
    // Reset form
    setFaqDetails({
      question: "",
      answer: ""
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage FAQs</h1>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New FAQ
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New FAQ</CardTitle>
          <CardDescription>
            Create frequently asked questions and answers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFaqSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input 
                id="question" 
                value={faqDetails.question}
                onChange={(e) => setFaqDetails({...faqDetails, question: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="answer">Answer</Label>
              <Textarea 
                id="answer" 
                rows={4}
                value={faqDetails.answer}
                onChange={(e) => setFaqDetails({...faqDetails, answer: e.target.value})}
                required
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline">Cancel</Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Save FAQ
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Existing FAQs</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-base">What does the name Alexander mean?</CardTitle>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Alexander is a name of Greek origin meaning "defender of men" or "protector of mankind".</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-base">How popular is the name Emma?</CardTitle>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Emma has been one of the most popular girl names in many countries for the past decade, often ranking in the top 5.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageFAQs;
