
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Save, Trash, Edit, Check, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const ManageFAQs = () => {
  const [faqs, setFaqs] = useState([
    { 
      id: 1, 
      question: "What does the name Alexander mean?", 
      answer: "Alexander is a name of Greek origin meaning 'defender of men' or 'protector of mankind'.", 
      relatedName: "Alexander",
      category: "meaning"
    },
    { 
      id: 2, 
      question: "How popular is the name Emma?", 
      answer: "Emma has been one of the most popular girl names in many countries for the past decade, often ranking in the top 5.", 
      relatedName: "Emma",
      category: "popularity"
    },
  ]);

  const [faqDetails, setFaqDetails] = useState({
    id: 0,
    question: "",
    answer: "",
    relatedName: "",
    category: ""
  });

  const [showFaqDialog, setShowFaqDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [editingFaq, setEditingFaq] = useState(null);

  const { toast } = useToast();

  const handleAddFaq = () => {
    if (faqDetails.question && faqDetails.answer) {
      if (dialogMode === "add") {
        // Add new FAQ
        const newFaq = {
          ...faqDetails,
          id: faqs.length ? Math.max(...faqs.map(faq => faq.id)) + 1 : 1
        };
        setFaqs([...faqs, newFaq]);
      } else {
        // Update existing FAQ
        setFaqs(faqs.map(faq => 
          faq.id === editingFaq ? { ...faqDetails } : faq
        ));
        setEditingFaq(null);
      }
      
      // Reset form and close dialog
      setFaqDetails({
        id: 0,
        question: "",
        answer: "",
        relatedName: "",
        category: ""
      });
      setShowFaqDialog(false);
      
      toast({
        title: dialogMode === "add" ? "FAQ Added" : "FAQ Updated",
        description: dialogMode === "add" ? "Your FAQ has been added successfully." : "Your FAQ has been updated successfully.",
      });
    }
  };

  const handleDeleteFaq = (id) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
    toast({
      title: "FAQ Deleted",
      description: "The FAQ has been deleted successfully.",
    });
  };

  const handleEditFaq = (faq) => {
    setDialogMode("edit");
    setEditingFaq(faq.id);
    setFaqDetails({ ...faq });
    setShowFaqDialog(true);
  };

  const openAddFaqDialog = () => {
    setDialogMode("add");
    setFaqDetails({
      id: 0,
      question: "",
      answer: "",
      relatedName: "",
      category: ""
    });
    setShowFaqDialog(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage FAQs</h1>
        <Button onClick={openAddFaqDialog}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New FAQ
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>FAQs List</CardTitle>
          <CardDescription>
            Manage frequently asked questions for names and categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No FAQs yet. Add your first FAQ!</p>
            ) : (
              faqs.map((faq) => (
                <Card key={faq.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-base">{faq.question}</CardTitle>
                        {faq.relatedName && (
                          <CardDescription>Related to: {faq.relatedName}</CardDescription>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditFaq(faq)}>
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteFaq(faq.id)}>
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{faq.answer}</p>
                    {faq.category && (
                      <div className="mt-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {faq.category}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Dialog */}
      <Dialog open={showFaqDialog} onOpenChange={setShowFaqDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{dialogMode === "add" ? "Add New FAQ" : "Edit FAQ"}</DialogTitle>
            <DialogDescription>
              Create or update frequently asked questions and answers
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="related-name">Related Name (Optional)</Label>
                <Input 
                  id="related-name" 
                  value={faqDetails.relatedName}
                  onChange={(e) => setFaqDetails({...faqDetails, relatedName: e.target.value})}
                  placeholder="e.g. Alexander"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category (Optional)</Label>
                <Select 
                  value={faqDetails.category}
                  onValueChange={(value) => setFaqDetails({...faqDetails, category: value})}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meaning">Meaning</SelectItem>
                    <SelectItem value="origin">Origin</SelectItem>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="pronunciation">Pronunciation</SelectItem>
                    <SelectItem value="numerology">Numerology</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFaqDialog(false)}>Cancel</Button>
            <Button onClick={handleAddFaq}>
              <Save className="h-4 w-4 mr-2" />
              {dialogMode === "add" ? "Save FAQ" : "Update FAQ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageFAQs;
