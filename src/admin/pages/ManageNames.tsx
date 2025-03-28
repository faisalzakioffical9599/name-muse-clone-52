
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Save } from "lucide-react";

const ManageNames = () => {
  const [nameDetails, setNameDetails] = useState({
    name: "",
    meaning: "",
    gender: "",
    origin: "",
    religion: "",
    language: "",
    description: ""
  });

  const { toast } = useToast();

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would connect to your backend in a real application
    console.log("Name submitted:", nameDetails);
    
    toast({
      title: "Name Added",
      description: `"${nameDetails.name}" has been added successfully.`,
    });
    
    // Reset form
    setNameDetails({
      name: "",
      meaning: "",
      gender: "",
      origin: "",
      religion: "",
      language: "",
      description: ""
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Names</h1>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Name
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Name</CardTitle>
          <CardDescription>
            Fill in the details to add a new name to the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={nameDetails.name}
                  onChange={(e) => setNameDetails({...nameDetails, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meaning">Meaning</Label>
                <Input 
                  id="meaning" 
                  value={nameDetails.meaning}
                  onChange={(e) => setNameDetails({...nameDetails, meaning: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select 
                  value={nameDetails.gender}
                  onValueChange={(value) => setNameDetails({...nameDetails, gender: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boy">Boy</SelectItem>
                    <SelectItem value="girl">Girl</SelectItem>
                    <SelectItem value="unisex">Unisex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input 
                  id="origin" 
                  value={nameDetails.origin}
                  onChange={(e) => setNameDetails({...nameDetails, origin: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="religion">Religion</Label>
                <Input 
                  id="religion" 
                  value={nameDetails.religion}
                  onChange={(e) => setNameDetails({...nameDetails, religion: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input 
                  id="language" 
                  value={nameDetails.language}
                  onChange={(e) => setNameDetails({...nameDetails, language: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                rows={4}
                value={nameDetails.description}
                onChange={(e) => setNameDetails({...nameDetails, description: e.target.value})}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline">Cancel</Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Save Name
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageNames;
