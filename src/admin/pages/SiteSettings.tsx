
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

const SiteSettings = () => {
  return (
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
  );
};

export default SiteSettings;
