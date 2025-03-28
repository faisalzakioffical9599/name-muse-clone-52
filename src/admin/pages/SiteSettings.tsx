
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const SiteSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  
  // Regional categories state
  const [countries, setCountries] = useState([
    { id: "india", name: "Indian", count: 1250 },
    { id: "arabic", name: "Arabic", count: 980 },
    { id: "english", name: "English", count: 875 },
  ]);
  
  const [religions, setReligions] = useState([
    { id: "islam", name: "Islamic", count: 1450 },
    { id: "christianity", name: "Christian", count: 1320 },
    { id: "hinduism", name: "Hindu", count: 980 },
  ]);
  
  const [languages, setLanguages] = useState([
    { id: "arabic", name: "Arabic", count: 1150 },
    { id: "english", name: "English", count: 1080 },
    { id: "sanskrit", name: "Sanskrit", count: 920 },
  ]);
  
  // New category form states
  const [newCountry, setNewCountry] = useState({ id: "", name: "", count: 0 });
  const [newReligion, setNewReligion] = useState({ id: "", name: "", count: 0 });
  const [newLanguage, setNewLanguage] = useState({ id: "", name: "", count: 0 });

  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "Your general settings have been updated successfully.",
    });
  };

  const handleSaveSEO = () => {
    toast({
      title: "SEO Settings Saved",
      description: "Your SEO settings have been updated successfully.",
    });
  };
  
  const addCountry = () => {
    if (newCountry.id && newCountry.name) {
      setCountries([...countries, newCountry]);
      setNewCountry({ id: "", name: "", count: 0 });
      toast({
        title: "Country Added",
        description: `${newCountry.name} has been added to countries list.`,
      });
    }
  };
  
  const addReligion = () => {
    if (newReligion.id && newReligion.name) {
      setReligions([...religions, newReligion]);
      setNewReligion({ id: "", name: "", count: 0 });
      toast({
        title: "Religion Added",
        description: `${newReligion.name} has been added to religions list.`,
      });
    }
  };
  
  const addLanguage = () => {
    if (newLanguage.id && newLanguage.name) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage({ id: "", name: "", count: 0 });
      toast({
        title: "Language Added",
        description: `${newLanguage.name} has been added to languages list.`,
      });
    }
  };
  
  const removeCategory = (type, id) => {
    if (type === "country") {
      setCountries(countries.filter(item => item.id !== id));
    } else if (type === "religion") {
      setReligions(religions.filter(item => item.id !== id));
    } else if (type === "language") {
      setLanguages(languages.filter(item => item.id !== id));
    }
    
    toast({
      title: "Category Removed",
      description: `The category has been removed successfully.`,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Website Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="attributes">Name Attributes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
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
                  <Button onClick={handleSaveGeneral}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo">
          <Card>
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
                  <Button onClick={handleSaveSEO}>
                    <Save className="h-4 w-4 mr-2" />
                    Save SEO Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <div className="grid grid-cols-1 gap-6">
            {/* Countries Management */}
            <Card>
              <CardHeader>
                <CardTitle>Countries</CardTitle>
                <CardDescription>
                  Manage countries for name origins
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col gap-4">
                    {countries.map((country) => (
                      <div key={country.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                          <p className="font-medium">{country.name}</p>
                          <p className="text-sm text-muted-foreground">ID: {country.id} | Names: {country.count}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeCategory("country", country.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Add New Country</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label htmlFor="country-id" className="sr-only">ID</Label>
                        <Input 
                          id="country-id" 
                          placeholder="ID (e.g. french)" 
                          value={newCountry.id}
                          onChange={(e) => setNewCountry({...newCountry, id: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="country-name" className="sr-only">Name</Label>
                        <Input 
                          id="country-name" 
                          placeholder="Name (e.g. French)" 
                          value={newCountry.name}
                          onChange={(e) => setNewCountry({...newCountry, name: e.target.value})}
                        />
                      </div>
                      <Button onClick={addCountry}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Country
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Religions Management */}
            <Card>
              <CardHeader>
                <CardTitle>Religions</CardTitle>
                <CardDescription>
                  Manage religious categories for names
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col gap-4">
                    {religions.map((religion) => (
                      <div key={religion.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                          <p className="font-medium">{religion.name}</p>
                          <p className="text-sm text-muted-foreground">ID: {religion.id} | Names: {religion.count}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeCategory("religion", religion.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Add New Religion</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label htmlFor="religion-id" className="sr-only">ID</Label>
                        <Input 
                          id="religion-id" 
                          placeholder="ID (e.g. buddhism)" 
                          value={newReligion.id}
                          onChange={(e) => setNewReligion({...newReligion, id: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="religion-name" className="sr-only">Name</Label>
                        <Input 
                          id="religion-name" 
                          placeholder="Name (e.g. Buddhist)" 
                          value={newReligion.name}
                          onChange={(e) => setNewReligion({...newReligion, name: e.target.value})}
                        />
                      </div>
                      <Button onClick={addReligion}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Religion
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Languages Management */}
            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
                <CardDescription>
                  Manage languages associated with names
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col gap-4">
                    {languages.map((language) => (
                      <div key={language.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                          <p className="font-medium">{language.name}</p>
                          <p className="text-sm text-muted-foreground">ID: {language.id} | Names: {language.count}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeCategory("language", language.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Add New Language</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label htmlFor="language-id" className="sr-only">ID</Label>
                        <Input 
                          id="language-id" 
                          placeholder="ID (e.g. spanish)" 
                          value={newLanguage.id}
                          onChange={(e) => setNewLanguage({...newLanguage, id: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="language-name" className="sr-only">Name</Label>
                        <Input 
                          id="language-name" 
                          placeholder="Name (e.g. Spanish)" 
                          value={newLanguage.name}
                          onChange={(e) => setNewLanguage({...newLanguage, name: e.target.value})}
                        />
                      </div>
                      <Button onClick={addLanguage}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Language
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="attributes">
          <Card>
            <CardHeader>
              <CardTitle>Name Attributes</CardTitle>
              <CardDescription>
                Manage additional attributes for names
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Lucky Numbers */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Lucky Numbers</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <div key={num} className="flex items-center justify-center h-10 bg-gray-100 rounded-md">
                        {num}
                      </div>
                    ))}
                    <Button variant="outline" className="h-10">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
                
                {/* Lucky Stones */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Lucky Stones</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Emerald", "Ruby", "Sapphire", "Diamond", "Amethyst"].map((stone) => (
                      <div key={stone} className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md">
                        <span>{stone}</span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input placeholder="New stone" className="w-32" />
                      <Button variant="outline" size="sm">Add</Button>
                    </div>
                  </div>
                </div>
                
                {/* Lucky Colors */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Lucky Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Red", "Blue", "Green", "Yellow", "Purple"].map((color) => (
                      <div key={color} className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md">
                        <span>{color}</span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input placeholder="New color" className="w-32" />
                      <Button variant="outline" size="sm">Add</Button>
                    </div>
                  </div>
                </div>
                
                {/* Zodiac Signs */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Zodiac Signs</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"].map((sign) => (
                      <div key={sign} className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md">
                        <span>{sign}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettings;
