
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Globe, Church, Languages, Plus, Trash2 } from "lucide-react";

const RegionalCategories = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("countries");

  // Categories states
  const [countries, setCountries] = useState([
    { id: "india", name: "Indian", count: 1250 },
    { id: "arabic", name: "Arabic", count: 980 },
    { id: "english", name: "English", count: 875 },
    { id: "hebrew", name: "Hebrew", count: 740 },
    { id: "greek", name: "Greek", count: 650 },
    { id: "latin", name: "Latin", count: 590 },
    { id: "french", name: "French", count: 520 },
    { id: "irish", name: "Irish", count: 450 },
  ]);
  
  const [religions, setReligions] = useState([
    { id: "islam", name: "Islamic", count: 1450 },
    { id: "christianity", name: "Christian", count: 1320 },
    { id: "hinduism", name: "Hindu", count: 980 },
    { id: "judaism", name: "Jewish", count: 740 },
    { id: "buddhism", name: "Buddhist", count: 380 },
    { id: "sikhism", name: "Sikh", count: 290 },
  ]);
  
  const [languages, setLanguages] = useState([
    { id: "arabic", name: "Arabic", count: 1150 },
    { id: "english", name: "English", count: 1080 },
    { id: "sanskrit", name: "Sanskrit", count: 920 },
    { id: "hebrew", name: "Hebrew", count: 780 },
    { id: "greek", name: "Greek", count: 650 },
    { id: "latin", name: "Latin", count: 580 },
    { id: "french", name: "French", count: 490 },
    { id: "spanish", name: "Spanish", count: 430 },
  ]);
  
  // New category form states
  const [newCountry, setNewCountry] = useState({ id: "", name: "", count: 0 });
  const [newReligion, setNewReligion] = useState({ id: "", name: "", count: 0 });
  const [newLanguage, setNewLanguage] = useState({ id: "", name: "", count: 0 });

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
      <h1 className="text-2xl font-bold mb-6">Regional Categories</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="countries" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Countries
          </TabsTrigger>
          <TabsTrigger value="religions" className="flex items-center">
            <Church className="h-4 w-4 mr-2" />
            Religions
          </TabsTrigger>
          <TabsTrigger value="languages" className="flex items-center">
            <Languages className="h-4 w-4 mr-2" />
            Languages
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="countries">
          <Card>
            <CardHeader>
              <CardTitle>Countries</CardTitle>
              <CardDescription>
                Manage countries for name origins
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Countries List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                {/* Add New Country */}
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-4">Add New Country</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country-id">ID (URL Slug)</Label>
                      <Input 
                        id="country-id" 
                        placeholder="e.g. french" 
                        value={newCountry.id}
                        onChange={(e) => setNewCountry({...newCountry, id: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country-name">Display Name</Label>
                      <Input 
                        id="country-name" 
                        placeholder="e.g. French" 
                        value={newCountry.name}
                        onChange={(e) => setNewCountry({...newCountry, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country-count">Initial Count</Label>
                      <Input 
                        id="country-count" 
                        type="number"
                        placeholder="e.g. 100" 
                        value={newCountry.count || ""}
                        onChange={(e) => setNewCountry({...newCountry, count: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                  <Button onClick={addCountry} className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Country
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="religions">
          <Card>
            <CardHeader>
              <CardTitle>Religions</CardTitle>
              <CardDescription>
                Manage religious categories for names
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Religions List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                {/* Add New Religion */}
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-4">Add New Religion</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="religion-id">ID (URL Slug)</Label>
                      <Input 
                        id="religion-id" 
                        placeholder="e.g. buddhism" 
                        value={newReligion.id}
                        onChange={(e) => setNewReligion({...newReligion, id: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="religion-name">Display Name</Label>
                      <Input 
                        id="religion-name" 
                        placeholder="e.g. Buddhist" 
                        value={newReligion.name}
                        onChange={(e) => setNewReligion({...newReligion, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="religion-count">Initial Count</Label>
                      <Input 
                        id="religion-count" 
                        type="number"
                        placeholder="e.g. 100" 
                        value={newReligion.count || ""}
                        onChange={(e) => setNewReligion({...newReligion, count: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                  <Button onClick={addReligion} className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Religion
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="languages">
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
              <CardDescription>
                Manage languages associated with names
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Languages List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                {/* Add New Language */}
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-4">Add New Language</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language-id">ID (URL Slug)</Label>
                      <Input 
                        id="language-id" 
                        placeholder="e.g. spanish" 
                        value={newLanguage.id}
                        onChange={(e) => setNewLanguage({...newLanguage, id: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language-name">Display Name</Label>
                      <Input 
                        id="language-name" 
                        placeholder="e.g. Spanish" 
                        value={newLanguage.name}
                        onChange={(e) => setNewLanguage({...newLanguage, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language-count">Initial Count</Label>
                      <Input 
                        id="language-count" 
                        type="number"
                        placeholder="e.g. 100" 
                        value={newLanguage.count || ""}
                        onChange={(e) => setNewLanguage({...newLanguage, count: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                  <Button onClick={addLanguage} className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Language
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

export default RegionalCategories;
