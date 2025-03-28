
import React, { useState } from "react";
import Header from "../components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  PlusCircle, 
  Save, 
  Trash, 
  FileText, 
  User, 
  Settings, 
  Database, 
  PanelLeft, 
  HelpCircle, 
  Home
} from "lucide-react";

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const { toast } = useToast();

  // Form states
  const [nameDetails, setNameDetails] = useState({
    name: "",
    meaning: "",
    gender: "",
    origin: "",
    religion: "",
    language: "",
    description: ""
  });

  const [faqDetails, setFaqDetails] = useState({
    question: "",
    answer: ""
  });

  // Handle form submission for adding a new name
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

  // Handle form submission for adding a new FAQ
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 md:pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Sidebar */}
              <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Admin Panel</h2>
                  <p className="text-sm text-gray-500">Manage your content</p>
                </div>
                
                <nav className="p-2">
                  <ul className="space-y-1">
                    <li>
                      <Button 
                        variant={selectedTab === "dashboard" ? "secondary" : "ghost"} 
                        className="w-full justify-start"
                        onClick={() => setSelectedTab("dashboard")}
                      >
                        <Home className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant={selectedTab === "names" ? "secondary" : "ghost"} 
                        className="w-full justify-start"
                        onClick={() => setSelectedTab("names")}
                      >
                        <Database className="h-4 w-4 mr-2" />
                        Manage Names
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant={selectedTab === "content" ? "secondary" : "ghost"} 
                        className="w-full justify-start"
                        onClick={() => setSelectedTab("content")}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Page Content
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant={selectedTab === "faqs" ? "secondary" : "ghost"} 
                        className="w-full justify-start"
                        onClick={() => setSelectedTab("faqs")}
                      >
                        <HelpCircle className="h-4 w-4 mr-2" />
                        FAQs
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant={selectedTab === "users" ? "secondary" : "ghost"} 
                        className="w-full justify-start"
                        onClick={() => setSelectedTab("users")}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Users
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant={selectedTab === "settings" ? "secondary" : "ghost"} 
                        className="w-full justify-start"
                        onClick={() => setSelectedTab("settings")}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </li>
                  </ul>
                </nav>
              </div>
              
              {/* Main Content */}
              <div className="flex-1 p-6">
                {selectedTab === "dashboard" && (
                  <div>
                    <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Total Names</CardTitle>
                          <CardDescription>All names in database</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold">1,245</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Categories</CardTitle>
                          <CardDescription>Origins, religions, etc.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold">32</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Users</CardTitle>
                          <CardDescription>Registered accounts</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold">87</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Action
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Added new name "Alexander"
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              admin@example.com
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Today, 10:45 AM
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Updated name "Emma"
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              admin@example.com
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Yesterday, 3:22 PM
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Added new FAQ
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              admin@example.com
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Yesterday, 1:15 PM
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {selectedTab === "names" && (
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
                )}
                
                {selectedTab === "faqs" && (
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
                )}
                
                {selectedTab === "content" && (
                  <div>
                    <h1 className="text-2xl font-bold mb-6">Page Content</h1>
                    <p className="text-gray-600 mb-6">Manage content for various pages on your website.</p>
                    
                    <Tabs defaultValue="home">
                      <TabsList className="mb-4">
                        <TabsTrigger value="home">Home Page</TabsTrigger>
                        <TabsTrigger value="about">About</TabsTrigger>
                        <TabsTrigger value="name-details">Name Details</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="home">
                        <Card>
                          <CardHeader>
                            <CardTitle>Home Page Content</CardTitle>
                            <CardDescription>
                              Edit the main content sections of your homepage
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="hero-title">Hero Title</Label>
                                <Input 
                                  id="hero-title" 
                                  defaultValue="Find the Perfect Name for Your Baby"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="hero-description">Hero Description</Label>
                                <Textarea 
                                  id="hero-description" 
                                  rows={3}
                                  defaultValue="Explore thousands of beautiful baby names from various cultures, origins, and meanings to find the perfect name for your child."
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="featured-section-title">Featured Section Title</Label>
                                <Input 
                                  id="featured-section-title" 
                                  defaultValue="Popular Baby Names"
                                />
                              </div>
                              
                              <div className="flex justify-end">
                                <Button>
                                  <Save className="h-4 w-4 mr-2" />
                                  Save Changes
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="about">
                        <Card>
                          <CardHeader>
                            <CardTitle>About Page Content</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="about-content">Page Content</Label>
                                <Textarea 
                                  id="about-content" 
                                  rows={10}
                                  defaultValue="NameMuse is dedicated to helping parents find the perfect name for their children. Our extensive database includes names from various cultures, religions, and origins."
                                />
                              </div>
                              
                              <div className="flex justify-end">
                                <Button>
                                  <Save className="h-4 w-4 mr-2" />
                                  Save Changes
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
                
                {selectedTab === "users" && (
                  <div>
                    <h1 className="text-2xl font-bold mb-6">User Management</h1>
                    <p className="text-gray-600 mb-6">Manage user accounts and permissions.</p>
                    
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">Admin User</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">admin@example.com</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                Admin
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                                Edit
                              </Button>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">John Doe</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">john@example.com</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                Editor
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                                Edit
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {selectedTab === "settings" && (
                  <div>
                    <h1 className="text-2xl font-bold mb-6">Website Settings</h1>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>
                          Manage general website configuration
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="site-name">Website Name</Label>
                            <Input id="site-name" defaultValue="NameMuse" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="site-description">Website Description</Label>
                            <Textarea 
                              id="site-description" 
                              rows={3}
                              defaultValue="Your complete guide to baby names, meanings, and origins from around the world."
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="contact-email">Contact Email</Label>
                            <Input id="contact-email" type="email" defaultValue="contact@namemuse.com" />
                          </div>
                          
                          <div className="flex justify-end">
                            <Button>
                              <Save className="h-4 w-4 mr-2" />
                              Save Settings
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>SEO Settings</CardTitle>
                        <CardDescription>
                          Optimize your website for search engines
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="meta-title">Default Meta Title</Label>
                            <Input 
                              id="meta-title" 
                              defaultValue="NameMuse | Find the Perfect Baby Name" 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="meta-description">Default Meta Description</Label>
                            <Textarea 
                              id="meta-description" 
                              rows={3}
                              defaultValue="Explore thousands of baby names with meanings, origins, and popularity. Find the perfect name for your baby with NameMuse."
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="keywords">Keywords (comma separated)</Label>
                            <Input 
                              id="keywords" 
                              defaultValue="baby names, name meanings, boy names, girl names, name origins" 
                            />
                          </div>
                          
                          <div className="flex justify-end">
                            <Button>
                              <Save className="h-4 w-4 mr-2" />
                              Save SEO Settings
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
