
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Globe, Church, Languages, Plus, Trash2, Upload, Edit, Check, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const RegionalCategories = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("countries");

  // Categories states
  const [countries, setCountries] = useState([
    { id: "india", name: "Indian", count: 1250, flag: "", description: "Names originating from India, reflecting its rich cultural and linguistic diversity." },
    { id: "arabic", name: "Arabic", count: 980, flag: "", description: "Names with Arabic origins, often with deep meanings and historical significance." },
    { id: "english", name: "English", count: 875, flag: "", description: "Traditional and modern English names with Anglo-Saxon, Norman, and Celtic influences." },
    { id: "hebrew", name: "Hebrew", count: 740, flag: "", description: "Names of Hebrew origin, many with biblical significance and ancient roots." },
    { id: "greek", name: "Greek", count: 650, flag: "", description: "Names derived from ancient Greek mythology, history, and culture." },
    { id: "latin", name: "Latin", count: 590, flag: "", description: "Names with Latin origins, often reflecting Roman history and classical traditions." },
    { id: "french", name: "French", count: 520, flag: "", description: "Elegant French names with distinctive pronunciation and cultural significance." },
    { id: "irish", name: "Irish", count: 450, flag: "", description: "Traditional Irish names with Gaelic origins and Celtic heritage." },
  ]);
  
  const [religions, setReligions] = useState([
    { id: "islam", name: "Islamic", count: 1450, description: "Names with Islamic significance, often derived from Arabic and with deep spiritual meanings." },
    { id: "christianity", name: "Christian", count: 1320, description: "Names with Christian heritage, including biblical names and saints' names." },
    { id: "hinduism", name: "Hindu", count: 980, description: "Names derived from Hindu deities, Sanskrit literature, and Indian traditions." },
    { id: "judaism", name: "Jewish", count: 740, description: "Traditional Jewish names with Hebrew origins and cultural significance." },
    { id: "buddhism", name: "Buddhist", count: 380, description: "Names inspired by Buddhist traditions, often reflecting virtues and enlightenment." },
    { id: "sikhism", name: "Sikh", count: 290, description: "Names from Sikh traditions, often derived from Punjabi and Gurmukhi scripts." },
  ]);
  
  const [languages, setLanguages] = useState([
    { id: "arabic", name: "Arabic", count: 1150, description: "One of the world's oldest languages with rich poetic traditions and beautiful script." },
    { id: "english", name: "English", count: 1080, description: "A West Germanic language with global influence and extensive vocabulary." },
    { id: "sanskrit", name: "Sanskrit", count: 920, description: "Ancient Indian language with profound literary and cultural heritage." },
    { id: "hebrew", name: "Hebrew", count: 780, description: "Ancient Semitic language with a rich history and modern revival." },
    { id: "greek", name: "Greek", count: 650, description: "One of the oldest Indo-European languages with extensive influence on Western culture." },
    { id: "latin", name: "Latin", count: 580, description: "Classical language of ancient Rome that forms the basis of Romance languages." },
    { id: "french", name: "French", count: 490, description: "Romance language known for its elegance and significant cultural impact." },
    { id: "spanish", name: "Spanish", count: 430, description: "World's second-most spoken native language with rich literary traditions." },
  ]);
  
  // New category form states
  const [newCountry, setNewCountry] = useState({ id: "", name: "", count: 0, flag: "", description: "" });
  const [newReligion, setNewReligion] = useState({ id: "", name: "", count: 0, description: "" });
  const [newLanguage, setNewLanguage] = useState({ id: "", name: "", count: 0, description: "" });

  // Edit States
  const [editingCountry, setEditingCountry] = useState(null);
  const [editingReligion, setEditingReligion] = useState(null);
  const [editingLanguage, setEditingLanguage] = useState(null);
  const [tempEditItem, setTempEditItem] = useState({});

  // Dialog States
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [showReligionDialog, setShowReligionDialog] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // "add" or "edit"

  // Handle file uploads for flags
  const handleFlagUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this to a server or storage
      // For this demo, we'll just create a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        if (dialogMode === "add") {
          setNewCountry({ ...newCountry, flag: reader.result });
        } else if (dialogMode === "edit") {
          setTempEditItem({ ...tempEditItem, flag: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // CRUD functions for countries
  const addCountry = () => {
    if (newCountry.id && newCountry.name) {
      setCountries([...countries, newCountry]);
      setNewCountry({ id: "", name: "", count: 0, flag: "", description: "" });
      setShowCountryDialog(false);
      toast({
        title: "Country Added",
        description: `${newCountry.name} has been added to countries list.`,
      });
    }
  };
  
  const editCountry = (country) => {
    setDialogMode("edit");
    setTempEditItem({ ...country });
    setEditingCountry(country.id);
    setShowCountryDialog(true);
  };
  
  const saveEditedCountry = () => {
    setCountries(
      countries.map((country) => 
        country.id === editingCountry ? tempEditItem : country
      )
    );
    setEditingCountry(null);
    setTempEditItem({});
    setShowCountryDialog(false);
    toast({
      title: "Country Updated",
      description: `Country has been updated successfully.`,
    });
  };
  
  const removeCountry = (id) => {
    setCountries(countries.filter(item => item.id !== id));
    toast({
      title: "Country Removed",
      description: `The country has been removed successfully.`,
    });
  };

  // CRUD functions for religions
  const addReligion = () => {
    if (newReligion.id && newReligion.name) {
      setReligions([...religions, newReligion]);
      setNewReligion({ id: "", name: "", count: 0, description: "" });
      setShowReligionDialog(false);
      toast({
        title: "Religion Added",
        description: `${newReligion.name} has been added to religions list.`,
      });
    }
  };
  
  const editReligion = (religion) => {
    setDialogMode("edit");
    setTempEditItem({ ...religion });
    setEditingReligion(religion.id);
    setShowReligionDialog(true);
  };
  
  const saveEditedReligion = () => {
    setReligions(
      religions.map((religion) => 
        religion.id === editingReligion ? tempEditItem : religion
      )
    );
    setEditingReligion(null);
    setTempEditItem({});
    setShowReligionDialog(false);
    toast({
      title: "Religion Updated",
      description: `Religion has been updated successfully.`,
    });
  };
  
  const removeReligion = (id) => {
    setReligions(religions.filter(item => item.id !== id));
    toast({
      title: "Religion Removed",
      description: `The religion has been removed successfully.`,
    });
  };

  // CRUD functions for languages
  const addLanguage = () => {
    if (newLanguage.id && newLanguage.name) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage({ id: "", name: "", count: 0, description: "" });
      setShowLanguageDialog(false);
      toast({
        title: "Language Added",
        description: `${newLanguage.name} has been added to languages list.`,
      });
    }
  };
  
  const editLanguage = (language) => {
    setDialogMode("edit");
    setTempEditItem({ ...language });
    setEditingLanguage(language.id);
    setShowLanguageDialog(true);
  };
  
  const saveEditedLanguage = () => {
    setLanguages(
      languages.map((language) => 
        language.id === editingLanguage ? tempEditItem : language
      )
    );
    setEditingLanguage(null);
    setTempEditItem({});
    setShowLanguageDialog(false);
    toast({
      title: "Language Updated",
      description: `Language has been updated successfully.`,
    });
  };
  
  const removeLanguage = (id) => {
    setLanguages(languages.filter(item => item.id !== id));
    toast({
      title: "Language Removed",
      description: `The language has been removed successfully.`,
    });
  };

  // Open dialog functions
  const openAddCountryDialog = () => {
    setDialogMode("add");
    setShowCountryDialog(true);
  };
  
  const openAddReligionDialog = () => {
    setDialogMode("add");
    setShowReligionDialog(true);
  };
  
  const openAddLanguageDialog = () => {
    setDialogMode("add");
    setShowLanguageDialog(true);
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Countries</CardTitle>
                <CardDescription>
                  Manage countries for name origins
                </CardDescription>
              </div>
              <Button onClick={openAddCountryDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Country
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {countries.map((country) => (
                  <div key={country.id} className="flex items-center p-3 bg-gray-50 rounded-md">
                    {country.flag && (
                      <div className="w-12 h-8 mr-3 overflow-hidden rounded border">
                        <img 
                          src={country.flag} 
                          alt={`${country.name} flag`} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{country.name}</p>
                      <p className="text-sm text-muted-foreground">ID: {country.id} | Names: {country.count}</p>
                      {country.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{country.description}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => editCountry(country)}
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeCountry(country.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="religions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Religions</CardTitle>
                <CardDescription>
                  Manage religious categories for names
                </CardDescription>
              </div>
              <Button onClick={openAddReligionDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Religion
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {religions.map((religion) => (
                  <div key={religion.id} className="flex items-center p-3 bg-gray-50 rounded-md">
                    <div className="flex-1">
                      <p className="font-medium">{religion.name}</p>
                      <p className="text-sm text-muted-foreground">ID: {religion.id} | Names: {religion.count}</p>
                      {religion.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{religion.description}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => editReligion(religion)}
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeReligion(religion.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="languages">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Languages</CardTitle>
                <CardDescription>
                  Manage languages associated with names
                </CardDescription>
              </div>
              <Button onClick={openAddLanguageDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Language
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {languages.map((language) => (
                  <div key={language.id} className="flex items-center p-3 bg-gray-50 rounded-md">
                    <div className="flex-1">
                      <p className="font-medium">{language.name}</p>
                      <p className="text-sm text-muted-foreground">ID: {language.id} | Names: {language.count}</p>
                      {language.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{language.description}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => editLanguage(language)}
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeLanguage(language.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Country Dialog */}
      <Dialog open={showCountryDialog} onOpenChange={setShowCountryDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{dialogMode === "add" ? "Add New Country" : "Edit Country"}</DialogTitle>
            <DialogDescription>
              Fill in the details to {dialogMode === "add" ? "add a new country" : "update this country"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country-id">ID (URL Slug)</Label>
                <Input 
                  id="country-id" 
                  placeholder="e.g. french" 
                  value={dialogMode === "add" ? newCountry.id : tempEditItem.id}
                  onChange={(e) => dialogMode === "add" 
                    ? setNewCountry({...newCountry, id: e.target.value})
                    : setTempEditItem({...tempEditItem, id: e.target.value})
                  }
                  disabled={dialogMode === "edit"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country-name">Display Name</Label>
                <Input 
                  id="country-name" 
                  placeholder="e.g. French" 
                  value={dialogMode === "add" ? newCountry.name : tempEditItem.name}
                  onChange={(e) => dialogMode === "add" 
                    ? setNewCountry({...newCountry, name: e.target.value})
                    : setTempEditItem({...tempEditItem, name: e.target.value})
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country-count">Initial Count</Label>
              <Input 
                id="country-count" 
                type="number"
                placeholder="e.g. 100" 
                value={dialogMode === "add" ? (newCountry.count || "") : (tempEditItem.count || "")}
                onChange={(e) => dialogMode === "add" 
                  ? setNewCountry({...newCountry, count: parseInt(e.target.value) || 0})
                  : setTempEditItem({...tempEditItem, count: parseInt(e.target.value) || 0})
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country-flag">Country Flag</Label>
              <div className="flex items-center space-x-4">
                <Input 
                  id="country-flag"
                  type="file"
                  accept="image/*"
                  onChange={handleFlagUpload}
                  className="flex-1"
                />
                {(dialogMode === "add" ? newCountry.flag : tempEditItem.flag) && (
                  <div className="w-16 h-10 border rounded overflow-hidden">
                    <img 
                      src={dialogMode === "add" ? newCountry.flag : tempEditItem.flag} 
                      alt="Flag preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country-description">SEO Description</Label>
              <Textarea 
                id="country-description" 
                placeholder="Description for SEO purposes" 
                rows={3}
                value={dialogMode === "add" ? newCountry.description : tempEditItem.description}
                onChange={(e) => dialogMode === "add" 
                  ? setNewCountry({...newCountry, description: e.target.value})
                  : setTempEditItem({...tempEditItem, description: e.target.value})
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCountryDialog(false)}>
              Cancel
            </Button>
            <Button onClick={dialogMode === "add" ? addCountry : saveEditedCountry}>
              {dialogMode === "add" ? "Add Country" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Religion Dialog */}
      <Dialog open={showReligionDialog} onOpenChange={setShowReligionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{dialogMode === "add" ? "Add New Religion" : "Edit Religion"}</DialogTitle>
            <DialogDescription>
              Fill in the details to {dialogMode === "add" ? "add a new religion" : "update this religion"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="religion-id">ID (URL Slug)</Label>
                <Input 
                  id="religion-id" 
                  placeholder="e.g. buddhism" 
                  value={dialogMode === "add" ? newReligion.id : tempEditItem.id}
                  onChange={(e) => dialogMode === "add" 
                    ? setNewReligion({...newReligion, id: e.target.value})
                    : setTempEditItem({...tempEditItem, id: e.target.value})
                  }
                  disabled={dialogMode === "edit"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="religion-name">Display Name</Label>
                <Input 
                  id="religion-name" 
                  placeholder="e.g. Buddhist" 
                  value={dialogMode === "add" ? newReligion.name : tempEditItem.name}
                  onChange={(e) => dialogMode === "add" 
                    ? setNewReligion({...newReligion, name: e.target.value})
                    : setTempEditItem({...tempEditItem, name: e.target.value})
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="religion-count">Initial Count</Label>
              <Input 
                id="religion-count" 
                type="number"
                placeholder="e.g. 100" 
                value={dialogMode === "add" ? (newReligion.count || "") : (tempEditItem.count || "")}
                onChange={(e) => dialogMode === "add" 
                  ? setNewReligion({...newReligion, count: parseInt(e.target.value) || 0})
                  : setTempEditItem({...tempEditItem, count: parseInt(e.target.value) || 0})
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="religion-description">SEO Description</Label>
              <Textarea 
                id="religion-description" 
                placeholder="Description for SEO purposes" 
                rows={3}
                value={dialogMode === "add" ? newReligion.description : tempEditItem.description}
                onChange={(e) => dialogMode === "add" 
                  ? setNewReligion({...newReligion, description: e.target.value})
                  : setTempEditItem({...tempEditItem, description: e.target.value})
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReligionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={dialogMode === "add" ? addReligion : saveEditedReligion}>
              {dialogMode === "add" ? "Add Religion" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Language Dialog */}
      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{dialogMode === "add" ? "Add New Language" : "Edit Language"}</DialogTitle>
            <DialogDescription>
              Fill in the details to {dialogMode === "add" ? "add a new language" : "update this language"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language-id">ID (URL Slug)</Label>
                <Input 
                  id="language-id" 
                  placeholder="e.g. spanish" 
                  value={dialogMode === "add" ? newLanguage.id : tempEditItem.id}
                  onChange={(e) => dialogMode === "add" 
                    ? setNewLanguage({...newLanguage, id: e.target.value})
                    : setTempEditItem({...tempEditItem, id: e.target.value})
                  }
                  disabled={dialogMode === "edit"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language-name">Display Name</Label>
                <Input 
                  id="language-name" 
                  placeholder="e.g. Spanish" 
                  value={dialogMode === "add" ? newLanguage.name : tempEditItem.name}
                  onChange={(e) => dialogMode === "add" 
                    ? setNewLanguage({...newLanguage, name: e.target.value})
                    : setTempEditItem({...tempEditItem, name: e.target.value})
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language-count">Initial Count</Label>
              <Input 
                id="language-count" 
                type="number"
                placeholder="e.g. 100" 
                value={dialogMode === "add" ? (newLanguage.count || "") : (tempEditItem.count || "")}
                onChange={(e) => dialogMode === "add" 
                  ? setNewLanguage({...newLanguage, count: parseInt(e.target.value) || 0})
                  : setTempEditItem({...tempEditItem, count: parseInt(e.target.value) || 0})
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language-description">SEO Description</Label>
              <Textarea 
                id="language-description" 
                placeholder="Description for SEO purposes" 
                rows={3}
                value={dialogMode === "add" ? newLanguage.description : tempEditItem.description}
                onChange={(e) => dialogMode === "add" 
                  ? setNewLanguage({...newLanguage, description: e.target.value})
                  : setTempEditItem({...tempEditItem, description: e.target.value})
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLanguageDialog(false)}>
              Cancel
            </Button>
            <Button onClick={dialogMode === "add" ? addLanguage : saveEditedLanguage}>
              {dialogMode === "add" ? "Add Language" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegionalCategories;
