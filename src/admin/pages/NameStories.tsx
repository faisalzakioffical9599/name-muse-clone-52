
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Save, Trash, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock initial data - would be fetched from API in real app
const mockStories = [
  {
    id: "1",
    name: "Dawood Ibrahim",
    country: "India",
    category: "Notable Figures",
    shortDescription: "A figure known in the underworld of Mumbai",
    story: "Dawood Ibrahim Kaskar is an Indian gangster and drug kingpin from Dongri, Mumbai. He reportedly heads the Indian organised crime syndicate D-Company founded in Mumbai.",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Al Capone",
    country: "United States",
    category: "Historical Figures",
    shortDescription: "American gangster who led a Prohibition-era crime syndicate",
    story: "Alphonse Gabriel Capone was an American gangster and businessman who attained notoriety during the Prohibition era as the co-founder and boss of the Chicago Outfit.",
    imageUrl: "/placeholder.svg"
  }
];

// Type definitions
interface NameStory {
  id: string;
  name: string;
  country: string;
  category: string;
  shortDescription: string;
  story: string;
  imageUrl: string;
}

interface SearchProps {
  searchQuery: string;
  searchFilters: {
    [key: string]: string;
  };
}

const NameStories = ({ searchProps }: { searchProps?: SearchProps }) => {
  const { toast } = useToast();
  const [stories, setStories] = useState<NameStory[]>(mockStories);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<NameStory>({
    id: "",
    name: "",
    country: "",
    category: "Notable Figures",
    shortDescription: "",
    story: "",
    imageUrl: "/placeholder.svg"
  });

  // List of available categories
  const categories = [
    "Notable Figures",
    "Historical Figures",
    "Leaders",
    "Cultural Icons",
    "Religious Figures",
    "Literary Characters"
  ];

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle select changes
  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // In a real app, you would upload the file to a server and get back a URL
      // For now, we'll fake it with a local URL
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, imageUrl });
    }
  };

  // Add new story
  const handleAddStory = () => {
    setIsAdding(true);
    setIsEditing(false);
    setEditId(null);
    setFormData({
      id: Date.now().toString(),
      name: "",
      country: "",
      category: "Notable Figures",
      shortDescription: "",
      story: "",
      imageUrl: "/placeholder.svg"
    });
  };

  // Edit story
  const handleEditStory = (story: NameStory) => {
    setIsAdding(false);
    setIsEditing(true);
    setEditId(story.id);
    setFormData(story);
  };

  // Delete story
  const handleDeleteStory = (id: string) => {
    setStories(stories.filter(story => story.id !== id));
    toast({
      title: "Story Deleted",
      description: "The story has been deleted successfully.",
    });
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing story
      setStories(stories.map(story => 
        story.id === editId ? formData : story
      ));
      toast({
        title: "Story Updated",
        description: "The story has been updated successfully.",
      });
    } else {
      // Add new story
      setStories([...stories, formData]);
      toast({
        title: "Story Added",
        description: "New story has been added successfully.",
      });
    }
    
    // Reset form
    setIsAdding(false);
    setIsEditing(false);
    setEditId(null);
    setFormData({
      id: "",
      name: "",
      country: "",
      category: "Notable Figures",
      shortDescription: "",
      story: "",
      imageUrl: "/placeholder.svg"
    });
  };

  // Reset form
  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditId(null);
  };

  // Filter stories based on search query
  const filteredStories = stories.filter(story => {
    if (!searchProps || !searchProps.searchQuery) return true;
    
    const query = searchProps.searchQuery.toLowerCase();
    return (
      story.name.toLowerCase().includes(query) ||
      story.country.toLowerCase().includes(query) ||
      story.category.toLowerCase().includes(query) ||
      story.shortDescription.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Name Stories</h1>
        {!isAdding && !isEditing && (
          <Button onClick={handleAddStory}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Story
          </Button>
        )}
      </div>

      {(isAdding || isEditing) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Story" : "Add New Story"}</CardTitle>
            <CardDescription>
              {isEditing 
                ? "Update the details of this name story" 
                : "Add a new name story with details and category"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter country"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <Input 
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <img 
                        src={formData.imageUrl} 
                        alt={formData.name} 
                        className="h-20 w-20 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input 
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Brief description (1-2 sentences)"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="story">Full Story</Label>
                <Textarea 
                  id="story"
                  name="story"
                  value={formData.story}
                  onChange={handleChange}
                  placeholder="Enter the full story or biography"
                  rows={6}
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {isEditing ? "Update Story" : "Save Story"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Name Stories List</CardTitle>
          <CardDescription>
            Manage and organize stories about notable people and their names
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredStories.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStories.map((story) => (
                  <TableRow key={story.id}>
                    <TableCell className="font-medium">{story.name}</TableCell>
                    <TableCell>{story.country}</TableCell>
                    <TableCell>{story.category}</TableCell>
                    <TableCell className="max-w-md truncate">{story.shortDescription}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditStory(story)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteStory(story.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {searchProps && searchProps.searchQuery 
                ? "No stories found matching your search." 
                : "No stories have been added yet."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NameStories;
