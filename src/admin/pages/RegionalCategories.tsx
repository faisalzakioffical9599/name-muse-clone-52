import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Globe, Church, Languages, Plus, Trash2, Upload, Edit, Check, X, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { api } from "../services/api";

// Define proper interfaces for our data types
interface CountryType {
  id: string;
  name: string;
  count: number;
  flag: string;
  description: string;
}

interface ReligionType {
  id: string;
  name: string;
  count: number;
  description: string;
}

interface LanguageType {
  id: string;
  name: string;
  count: number;
  description: string;
}

const RegionalCategories = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("countries");

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(false);
  const [totalCountries, setTotalCountries] = useState(0);
  const [totalReligions, setTotalReligions] = useState(0);
  const [totalLanguages, setTotalLanguages] = useState(0);

  // Search states
  const [countrySearch, setCountrySearch] = useState("");
  const [religionSearch, setReligionSearch] = useState("");
  const [languageSearch, setLanguageSearch] = useState("");

  // Categories states with proper typing
  const [countries, setCountries] = useState<CountryType[]>([
    { id: "india", name: "Indian", count: 1250, flag: "", description: "Names originating from India, reflecting its rich cultural and linguistic diversity." },
    { id: "arabic", name: "Arabic", count: 980, flag: "", description: "Names with Arabic origins, often with deep meanings and historical significance." },
    { id: "english", name: "English", count: 875, flag: "", description: "Traditional and modern English names with Anglo-Saxon, Norman, and Celtic influences." },
    { id: "hebrew", name: "Hebrew", count: 740, flag: "", description: "Names of Hebrew origin, many with biblical significance and ancient roots." },
    { id: "greek", name: "Greek", count: 650, flag: "", description: "Names derived from ancient Greek mythology, history, and culture." },
    { id: "latin", name: "Latin", count: 590, flag: "", description: "Names with Latin origins, often reflecting Roman history and classical traditions." },
    { id: "french", name: "French", count: 520, flag: "", description: "Elegant French names with distinctive pronunciation and cultural significance." },
    { id: "irish", name: "Irish", count: 450, flag: "", description: "Traditional Irish names with Gaelic origins and Celtic heritage." },
  ]);
  
  const [religions, setReligions] = useState<ReligionType[]>([
    { id: "islam", name: "Islamic", count: 1450, description: "Names with Islamic significance, often derived from Arabic and with deep spiritual meanings." },
    { id: "christianity", name: "Christian", count: 1320, description: "Names with Christian heritage, including biblical names and saints' names." },
    { id: "hinduism", name: "Hindu", count: 980, description: "Names derived from Hindu deities, Sanskrit literature, and Indian traditions." },
    { id: "judaism", name: "Jewish", count: 740, description: "Traditional Jewish names with Hebrew origins and cultural significance." },
    { id: "buddhism", name: "Buddhist", count: 380, description: "Names inspired by Buddhist traditions, often reflecting virtues and enlightenment." },
    { id: "sikhism", name: "Sikh", count: 290, description: "Names from Sikh traditions, often derived from Punjabi and Gurmukhi scripts." },
  ]);
  
  const [languages, setLanguages] = useState<LanguageType[]>([
    { id: "arabic", name: "Arabic", count: 1150, description: "One of the world's oldest languages with rich poetic traditions and beautiful script." },
    { id: "english", name: "English", count: 1080, description: "A West Germanic language with global influence and extensive vocabulary." },
    { id: "sanskrit", name: "Sanskrit", count: 920, description: "Ancient Indian language with profound literary and cultural heritage." },
    { id: "hebrew", name: "Hebrew", count: 780, description: "Ancient Semitic language with a rich history and modern revival." },
    { id: "greek", name: "Greek", count: 650, description: "One of the oldest Indo-European languages with extensive influence on Western culture." },
    { id: "latin", name: "Latin", count: 580, description: "Classical language of ancient Rome that forms the basis of Romance languages." },
    { id: "french", name: "French", count: 490, description: "Romance language known for its elegance and significant cultural impact." },
    { id: "spanish", name: "Spanish", count: 430, description: "World's second-most spoken native language with rich literary traditions." },
  ]);
  
  // New category form states with proper default values
  const [newCountry, setNewCountry] = useState<CountryType>({ id: "", name: "", count: 0, flag: "", description: "" });
  const [newReligion, setNewReligion] = useState<ReligionType>({ id: "", name: "", count: 0, description: "" });
  const [newLanguage, setNewLanguage] = useState<LanguageType>({ id: "", name: "", count: 0, description: "" });

  // Edit States with proper typing
  const [editingCountry, setEditingCountry] = useState<string | null>(null);
  const [editingReligion, setEditingReligion] = useState<string | null>(null);
  const [editingLanguage, setEditingLanguage] = useState<string | null>(null);
  const [tempEditItem, setTempEditItem] = useState<CountryType | ReligionType | LanguageType>({ id: "", name: "", count: 0, description: "", flag: "" } as CountryType);

  // Dialog States
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [showReligionDialog, setShowReligionDialog] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");

  // Fetch data from API when component mounts
  useEffect(() => {
    fetchData();
  }, [page, activeTab, countrySearch, religionSearch, languageSearch]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // In a real implementation, these would be API calls
      // For now, we'll simulate the API responses
      switch (activeTab) {
        case "countries":
          // Simulate API filtering and pagination
          const filteredCountries = countries.filter(country => 
            country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
            country.id.toLowerCase().includes(countrySearch.toLowerCase())
          );
          setTotalCountries(filteredCountries.length);
          // Paginate results
          const paginatedCountries = filteredCountries.slice((page - 1) * limit, page * limit);
          setCountries(paginatedCountries);
          break;
        case "religions":
          const filteredReligions = religions.filter(religion => 
            religion.name.toLowerCase().includes(religionSearch.toLowerCase()) ||
            religion.id.toLowerCase().includes(religionSearch.toLowerCase())
          );
          setTotalReligions(filteredReligions.length);
          const paginatedReligions = filteredReligions.slice((page - 1) * limit, page * limit);
          setReligions(paginatedReligions);
          break;
        case "languages":
          const filteredLanguages = languages.filter(language => 
            language.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
            language.id.toLowerCase().includes(languageSearch.toLowerCase())
          );
          setTotalLanguages(filteredLanguages.length);
          const paginatedLanguages = filteredLanguages.slice((page - 1) * limit, page * limit);
          setLanguages(paginatedLanguages);
          break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle file uploads for flags - fix the type issue
  const handleFlagUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a server or storage
      // For this demo, we'll just create a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        if (dialogMode === "add") {
          setNewCountry({ ...newCountry, flag: reader.result as string });
        } else if (dialogMode === "edit") {
          setTempEditItem({ ...tempEditItem, flag: reader.result as string } as CountryType);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // CRUD functions for countries
  const addCountry = async () => {
    if (newCountry.id && newCountry.name) {
      try {
        // In a real app, this would be an API call
        // const response = await api.countries.create(newCountry);
        
        setCountries([...countries, newCountry]);
        setNewCountry({ id: "", name: "", count: 0, flag: "", description: "" });
        setShowCountryDialog(false);
        toast({
          title: "Country Added",
          description: `${newCountry.name} has been added to countries list.`,
        });
      } catch (error) {
        console.error("Error adding country:", error);
        toast({
          title: "Error",
          description: "Failed to add country",
          variant: "destructive"
        });
      }
    }
  };
  
  const editCountry = (country: CountryType) => {
    setDialogMode("edit");
    setTempEditItem({ ...country });
    setEditingCountry(country.id);
    setShowCountryDialog(true);
  };
  
  const saveEditedCountry = async () => {
    try {
      // In a real app, this would be an API call
      // const response = await api.countries.update(editingCountry, tempEditItem);
      
      setCountries(
        countries.map((country) => 
          country.id === editingCountry ? tempEditItem as CountryType : country
        )
      );
      setEditingCountry(null);
      setTempEditItem({ id: "", name: "", count: 0, description: "", flag: "" } as CountryType);
      setShowCountryDialog(false);
      toast({
        title: "Country Updated",
        description: `Country has been updated successfully.`,
      });
    } catch (error) {
      console.error("Error updating country:", error);
      toast({
        title: "Error",
        description: "Failed to update country",
        variant: "destructive"
      });
    }
  };
  
  const removeCountry = async (id: string) => {
    try {
      // In a real app, this would be an API call
      // const response = await api.countries.delete(id);
      
      setCountries(countries.filter(item => item.id !== id));
      toast({
        title: "Country Removed",
        description: `The country has been removed successfully.`,
      });
    } catch (error) {
      console.error("Error removing country:", error);
      toast({
        title: "Error",
        description: "Failed to remove country",
        variant: "destructive"
      });
    }
  };

  // CRUD functions for religions - similar to countries but with API integration
  const addReligion = async () => {
    if (newReligion.id && newReligion.name) {
      try {
        // In a real app, this would be an API call
        // const response = await api.religions.create(newReligion);
        
        setReligions([...religions, newReligion]);
        setNewReligion({ id: "", name: "", count: 0, description: "" });
        setShowReligionDialog(false);
        toast({
          title: "Religion Added",
          description: `${newReligion.name} has been added to religions list.`,
        });
      } catch (error) {
        console.error("Error adding religion:", error);
        toast({
          title: "Error",
          description: "Failed to add religion",
          variant: "destructive"
        });
      }
    }
  };
  
  const editReligion = (religion: ReligionType) => {
    setDialogMode("edit");
    setTempEditItem({ ...religion });
    setEditingReligion(religion.id);
    setShowReligionDialog(true);
  };
  
  const saveEditedReligion = async () => {
    try {
      // In a real app, this would be an API call
      // const response = await api.religions.update(editingReligion, tempEditItem);
      
      setReligions(
        religions.map((religion) => 
          religion.id === editingReligion ? tempEditItem as ReligionType : religion
        )
      );
      setEditingReligion(null);
      setTempEditItem({ id: "", name: "", count: 0, description: "" } as ReligionType);
      setShowReligionDialog(false);
      toast({
        title: "Religion Updated",
        description: `Religion has been updated successfully.`,
      });
    } catch (error) {
      console.error("Error updating religion:", error);
      toast({
        title: "Error",
        description: "Failed to update religion",
        variant: "destructive"
      });
    }
  };
  
  const removeReligion = async (id: string) => {
    try {
      // In a real app, this would be an API call
      // const response = await api.religions.delete(id);
      
      setReligions(religions.filter(item => item.id !== id));
      toast({
        title: "Religion Removed",
        description: `The religion has been removed successfully.`,
      });
    } catch (error) {
      console.error("Error removing religion:", error);
      toast({
        title: "Error",
        description: "Failed to remove religion",
        variant: "destructive"
      });
    }
  };

  // CRUD functions for languages - similar to the above but for languages
  const addLanguage = async () => {
    if (newLanguage.id && newLanguage.name) {
      try {
        // In a real app, this would be an API call
        // const response = await api.languages.create(newLanguage);
        
        setLanguages([...languages, newLanguage]);
        setNewLanguage({ id: "", name: "", count: 0, description: "" });
        setShowLanguageDialog(false);
        toast({
          title: "Language Added",
          description: `${newLanguage.name} has been added to languages list.`,
        });
      } catch (error) {
        console.error("Error adding language:", error);
        toast({
          title: "Error",
          description: "Failed to add language",
          variant: "destructive"
        });
      }
    }
  };
  
  const editLanguage = (language: LanguageType) => {
    setDialogMode("edit");
    setTempEditItem({ ...language });
    setEditingLanguage(language.id);
    setShowLanguageDialog(true);
  };
  
  const saveEditedLanguage = async () => {
    try {
      // In a real app, this would be an API call
      // const response = await api.languages.update(editingLanguage, tempEditItem);
      
      setLanguages(
        languages.map((language) => 
          language.id === editingLanguage ? tempEditItem as LanguageType : language
        )
      );
      setEditingLanguage(null);
      setTempEditItem({ id: "", name: "", count: 0, description: "" } as LanguageType);
      setShowLanguageDialog(false);
      toast({
        title: "Language Updated",
        description: `Language has been updated successfully.`,
      });
    } catch (error) {
      console.error("Error updating language:", error);
      toast({
        title: "Error",
        description: "Failed to update language",
        variant: "destructive"
      });
    }
  };
  
  const removeLanguage = async (id: string) => {
    try {
      // In a real app, this would be an API call
      // const response = await api.languages.delete(id);
      
      setLanguages(languages.filter(item => item.id !== id));
      toast({
        title: "Language Removed",
        description: `The language has been removed successfully.`,
      });
    } catch (error) {
      console.error("Error removing language:", error);
      toast({
        title: "Error",
        description: "Failed to remove language",
        variant: "destructive"
      });
    }
  };

  // Open dialog functions
  const openAddCountryDialog = () => {
    setDialogMode("add");
    setNewCountry({ id: "", name: "", count: 0, flag: "", description: "" });
    setShowCountryDialog(true);
  };
  
  const openAddReligionDialog = () => {
    setDialogMode("add");
    setNewReligion({ id: "", name: "", count: 0, description: "" });
    setShowReligionDialog(true);
  };
  
  const openAddLanguageDialog = () => {
    setDialogMode("add");
    setNewLanguage({ id: "", name: "", count: 0, description: "" });
    setShowLanguageDialog(true);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Calculate total pages based on the active tab
  const getTotalPages = () => {
    switch (activeTab) {
      case "countries":
        return Math.ceil(totalCountries / limit);
      case "religions":
        return Math.ceil(totalReligions / limit);
      case "languages":
        return Math.ceil(totalLanguages / limit);
      default:
        return 1;
    }
  };

  // Generate pagination items
  const getPaginationItems = () => {
    const totalPages = getTotalPages();
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink onClick={() => handlePageChange(1)} isActive={page === 1}>
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Add ellipsis if needed
    if (page > 3) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Show current page and neighbors
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last page as they're always shown
      items.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => handlePageChange(i)} isActive={page === i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Add ellipsis if needed
    if (page < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => handlePageChange(totalPages)} isActive={page === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  // Import data functions
  const importCountries = (data: CountryType[]) => {
    try {
      // In a real app, this would be an API call
      // const response = await api.countries.importBulk(data);
      
      setCountries([...countries, ...data]);
      toast({
        title: "Countries Imported",
        description: `${data.length} countries have been imported successfully.`,
      });
    } catch (error) {
      console.error("Error importing countries:", error);
      toast({
        title: "Error",
        description: "Failed to import countries",
        variant: "destructive"
      });
    }
  };

  const importReligions = (data: ReligionType[]) => {
    try {
      // In a real app, this would be an API call
      // const response = await api.religions.importBulk(data);
      
      setReligions([...religions, ...data]);
      toast({
        title: "Religions Imported",
        description: `${data.length} religions have been imported successfully.`,
      });
    } catch (error) {
      console.error("Error importing religions:", error);
      toast({
        title: "Error",
        description: "Failed to import religions",
        variant: "destructive"
      });
    }
  };

  const importLanguages = (data: LanguageType[]) => {
    try {
      // In a real app, this would be an API call
      // const response = await api.languages.importBulk(data);
      
      setLanguages([...languages, ...data]);
      toast({
        title: "Languages Imported",
        description: `${data.length} languages have been imported successfully.`,
      });
    } catch (error) {
      console.error("Error importing languages:", error);
      toast({
        title: "Error",
        description: "Failed to import languages",
        variant: "destructive"
      });
    }
  };

  // File import handler for JSON
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        try {
          const data = JSON.parse(event.target.result);
          
          if (Array.isArray(data)) {
            switch (activeTab) {
              case "countries":
                importCountries(data as CountryType[]);
                break;
              case "religions":
                importReligions(data as ReligionType[]);
                break;
              case "languages":
                importLanguages(data as LanguageType[]);
                break;
            }
          } else {
            toast({
              title: "Invalid Format",
              description: "The imported file must contain an array of items.",
              variant: "destructive"
            });
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          toast({
            title: "Invalid JSON",
            description: "The file could not be parsed as JSON.",
            variant: "destructive"
          });
        }
      }
    };
    
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Regional Categories</h1>
      
      <Tabs value={activeTab} onValueChange={(value) => { setActiveTab(value); setPage(1); }} className="space-y-4">
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
              <div className="flex gap-2">
                <Button onClick={openAddCountryDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Country
                </Button>
                <label htmlFor="import-countries">
                  <Button variant="outline" asChild>
                    <div>
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                      <input
                        id="import-countries"
                        type="file"
                        accept=".json"
                        onChange={handleFileImport}
                        className="hidden"
                      />
                    </div>
                  </Button>
                </label>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search countries..."
                    className="pl-8"
                    value={countrySearch}
                    onChange={(e) => {
                      setCountrySearch(e.target.value);
                      setPage(1); // Reset to first page on search
                    }}
                  />
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <p>Loading...</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {countries.length === 0 ? (
                      <p className="col-span-2 text-center py-8 text-muted-foreground">No countries found. Try a different search or add a new country.</p>
                    ) : (
                      countries.map((country) => (
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
                      ))
                    )}
                  </div>
                  
                  {/* Pagination */}
                  {getTotalPages() > 1 && (
                    <div className="mt-4">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => handlePageChange(page - 1)} 
                              disabled={page === 1} 
                            />
                          </PaginationItem>
                          
                          {getPaginationItems()}
                          
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => handlePageChange(page + 1)} 
                              disabled={page === getTotalPages()} 
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}
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
              <div className="flex gap-2">
                <Button onClick={openAddReligionDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Religion
                </Button>
                <label htmlFor="import-religions">
                  <Button variant="outline" asChild>
                    <div>
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                      <input
                        id="import-religions"
                        type="file"
                        accept=".json"
                        onChange={handleFileImport}
                        className="hidden"
                      />
                    </div>
                  </Button>
                </label>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search religions..."
                    className="pl-8"
                    value={religionSearch}
                    onChange={(e) => {
                      setReligionSearch(e.target.value);
                      setPage(1); // Reset to first page on search
                    }}
                  />
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <p>Loading...</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {religions.length === 0 ? (
                      <p className="col-span-2 text-center py-8 text-muted-foreground">No religions found. Try a different search or add a new religion.</p>
                    ) : (
                      religions.map((religion) => (
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
                      ))
                    )}
                  </div>
                  
                  {/* Pagination */}
                  {getTotalPages() > 1 && (
                    <div className="mt-4">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => handlePageChange(page - 1)} 
                              disabled={page === 1} 
                            />
                          </PaginationItem>
                          
                          {getPaginationItems()}
                          
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => handlePageChange(page + 1)} 
                              disabled={page === getTotalPages()} 
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}
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
              <div className="flex gap-2">
                <Button onClick={openAddLanguageDialog}>
                  <Plus
