
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

const PageContent = () => {
  return (
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
        
        <TabsContent value="name-details">
          <Card>
            <CardHeader>
              <CardTitle>Name Details Templates</CardTitle>
              <CardDescription>
                Customize how name detail pages appear
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-detail-template">Detail Page Template</Label>
                  <Textarea 
                    id="name-detail-template" 
                    rows={8}
                    defaultValue="The name {name} originates from {origin} culture and means '{meaning}'. It is traditionally a {gender} name and has connections to {religion} religious traditions."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="related-names-title">Related Names Section Title</Label>
                  <Input 
                    id="related-names-title" 
                    defaultValue="Names Similar to {name}"
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
  );
};

export default PageContent;
