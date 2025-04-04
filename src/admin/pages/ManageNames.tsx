import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  PlusCircle, Save, Plus, Trash2, Pencil, Check, X, Edit, Download, Upload, Filter, Search
} from "lucide-react";

import DataTable from "../components/DataTable";
import { api } from "../services/api";

const ManageNames = () => {
  // Sample data for dropdowns
  const origins = [
    { id: "all", name: "All Origins" },
    { id: "indian", name: "Indian" },
    { id: "arabic", name: "Arabic" },
    { id: "english", name: "English" },
    { id: "hebrew", name: "Hebrew" },
    { id: "greek", name: "Greek" },
    { id: "latin", name: "Latin" },
    { id: "french", name: "French" },
    { id: "irish", name: "Irish" },
    { id: "hawaiian", name: "Hawaiian" },
    { id: "german", name: "German" },
    { id: "african", name: "African" },
  ];
  
  const religions = [
    { id: "all", name: "All Religions" },
    { id: "islam", name: "Islamic" },
    { id: "christianity", name: "Christian" },
    { id: "hinduism", name: "Hindu" },
    { id: "judaism", name: "Jewish" },
    { id: "buddhism", name: "Buddhist" },
    { id: "sikhism", name: "Sikh" },
  ];
  
  const languages = [
    { id: "arabic", name: "Arabic" },
    { id: "english", name: "English" },
    { id: "sanskrit", name: "Sanskrit" },
    { id: "hebrew", name: "Hebrew" },
    { id: "greek", name: "Greek" },
    { id: "latin", name: "Latin" },
    { id: "french", name: "French" },
    { id: "spanish", name: "Spanish" },
  ];

  // States
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [names, setNames] = useState([]);
  const [totalNames, setTotalNames] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGender, setFilterGender] = useState("all");
  const [filterOrigin, setFilterOrigin] = useState("all");
  const [filterReligion, setFilterReligion] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
  const [isEditing, setIsEditing] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  const [nameDetails, setNameDetails] = useState({
    id: null,
    name: "",
    meaning: "",
    gender: "",
    origin: "",
    religion: "",
    language: "",
    description: "",
    popularity: 0,
    luckyNumber: 0,
    luckyStone: "",
    luckyColor: "",
    pronunciation: "",
    numerology: 0,
    zodiacSign: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [nameVariations, setNameVariations] = useState([]);
  const [newVariation, setNewVariation] = useState("");
  const [personality, setPersonality] = useState([]);
  const [newPersonality, setNewPersonality] = useState("");
  const [famousPeople, setFamousPeople] = useState([]);
  const [newFamous, setNewFamous] = useState({ name: "", description: "" });
  const [nameFaqs, setNameFaqs] = useState([]);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  const { toast } = useToast();

  // Fetch names on initial load and when filters change
  useEffect(() => {
    fetchNames();
  }, [currentPage, pageSize, searchTerm, filterGender, filterOrigin, filterReligion, sortBy]);

  const fetchNames = async () => {
    setIsLoading(true);
    try {
      const response = await api.names.getAll({
        page: currentPage,
        limit: pageSize,
        search: searchTerm,
        gender: filterGender,
        origin: filterOrigin,
        religion: filterReligion,
        sortBy: sortBy
      });
      
      setNames(response.data);
      setTotalNames(response.meta.total);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch names",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    resetForm();
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEdit = async (id) => {
    setLoadingId(id);
    try {
      const response = await api.names.getById(id);
      const nameData = response.data;
      
      setNameDetails({
        id: nameData.id,
        name: nameData.name || "",
        meaning: nameData.meaning || "",
        gender: nameData.gender || "",
        origin: nameData.origin || "",
        religion: nameData.religion || "",
        language: nameData.language || "",
        description: nameData.description || "",
        popularity: nameData.popularity || 0,
        luckyNumber: nameData.luckyNumber || 0,
        luckyStone: nameData.luckyStone || "",
        luckyColor: nameData.luckyColor || "",
        pronunciation: nameData.pronunciation || "",
        numerology: nameData.numerology || 0,
        zodiacSign: nameData.zodiacSign || "",
        seoTitle: nameData.seoTitle || "",
        seoDescription: nameData.seoDescription || "",
        seoKeywords: nameData.seoKeywords || "",
      });
      
      setNameVariations(nameData.nameVariations || []);
      setPersonality(nameData.personality || []);
      setFamousPeople(nameData.famousPeople || []);
      setNameFaqs(nameData.nameFaqs || []);
      
      setIsEditing(true);
      setShowForm(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch name details",
        variant: "destructive",
      });
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this name?")) {
      setLoadingId(id);
      try {
        await api.names.delete(id);
        toast({
          title: "Success",
          description: "Name deleted successfully",
        });
        fetchNames();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete name",
          variant: "destructive",
        });
      } finally {
        setLoadingId(null);
      }
    }
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const nameData = {
        ...nameDetails,
        nameVariations,
        personality,
        famousPeople,
        nameFaqs
      };
      
      if (isEditing) {
        await api.names.update(nameDetails.id, nameData);
        toast({
          title: "Success",
          description: `"${nameDetails.name}" has been updated successfully.`,
        });
      } else {
        await api.names.create(nameData);
        toast({
          title: "Success",
          description: `"${nameDetails.name}" has been added successfully.`,
        });
      }
      
      resetForm();
      setShowForm(false);
      fetchNames();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save name",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetForm = () => {
    setNameDetails({
      id: null,
      name: "",
      meaning: "",
      gender: "",
      origin: "",
      religion: "",
      language: "",
      description: "",
      popularity: 0,
      luckyNumber: 0,
      luckyStone: "",
      luckyColor: "",
      pronunciation: "",
      numerology: 0,
      zodiacSign: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    });
    setNameVariations([]);
    setPersonality([]);
    setFamousPeople([]);
    setNameFaqs([]);
    setActiveTab("basic");
  };
  
  const addVariation = () => {
    if (newVariation.trim()) {
      setNameVariations([...nameVariations, newVariation]);
      setNewVariation("");
    }
  };
  
  const removeVariation = (index) => {
    setNameVariations(nameVariations.filter((_, i) => i !== index));
  };
  
  const addPersonalityTrait = () => {
    if (newPersonality.trim()) {
      setPersonality([...personality, newPersonality]);
      setNewPersonality("");
    }
  };
  
  const removePersonalityTrait = (index) => {
    setPersonality(personality.filter((_, i) => i !== index));
  };
  
  const addFamousPerson = () => {
    if (newFamous.name.trim() && newFamous.description.trim()) {
      setFamousPeople([...famousPeople, newFamous]);
      setNewFamous({ name: "", description: "" });
    }
  };
  
  const removeFamousPerson = (index) => {
    setFamousPeople(famousPeople.filter((_, i) => i !== index));
  };
  
  const addFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      setNameFaqs([...nameFaqs, newFaq]);
      setNewFaq({ question: "", answer: "" });
    }
  };
  
  const removeFaq = (index) => {
    setNameFaqs(nameFaqs.filter((_, i) => i !== index));
  };

  // Define columns for DataTable
  const columns = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      enableSorting: true,
    },
    {
      id: "gender",
      header: "Gender",
      accessorKey: "gender",
      enableSorting: true,
      cell: (row) => (
        <span className="capitalize">{row.gender}</span>
      )
    },
    {
      id: "meaning",
      header: "Meaning",
      accessorKey: "meaning",
    },
    {
      id: "origin",
      header: "Origin",
      accessorKey: "origin",
      enableSorting: true,
      cell: (row) => (
        <span className="capitalize">{row.origin}</span>
      )
    },
    {
      id: "popularity",
      header: "Popularity",
      accessorKey: "popularity",
      enableSorting: true,
      cell: (row) => (
        <div className="flex items-center">
          <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${row.popularity}%` }}
            ></div>
          </div>
          <span className="ml-2">{row.popularity}%</span>
        </div>
      )
    },
  ];

  // Define actions for DataTable
  const actions = [
    {
      icon: <Edit className="h-4 w-4" />,
      label: "Edit",
      onClick: (row) => handleEdit(row.id),
    },
    {
      icon: <Trash2 className="h-4 w-4 text-red-500" />,
      label: "Delete",
      onClick: (row) => handleDelete(row.id),
    },
  ];

  // Import JSON feature
  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const jsonData = JSON.parse(event.target.result);
            if (jsonData && typeof jsonData === 'object') {
              setNameDetails(jsonData);
              
              // Set related arrays if they exist
              if (jsonData.nameVariations) setNameVariations(jsonData.nameVariations);
              if (jsonData.personality) setPersonality(jsonData.personality);
              if (jsonData.famousPeople) setFamousPeople(jsonData.famousPeople);
              if (jsonData.nameFaqs) setNameFaqs(jsonData.nameFaqs);
              
              toast({
                title: "JSON Imported",
                description: "Form filled with imported data."
              });
              setShowForm(true);
            }
          } catch (error) {
            toast({
              title: "Error",
              description: "Invalid JSON file",
              variant: "destructive"
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Names</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImportJSON}>
            <Upload className="h-4 w-4 mr-2" />
            Import JSON
          </Button>
          <Button onClick={handleAddNew}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Name
          </Button>
        </div>
      </div>
      
      {!showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Name Database</CardTitle>
            <CardDescription>
              Manage all names in the database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="gender-filter">Gender</Label>
                  <Select value={filterGender} onValueChange={setFilterGender}>
                    <SelectTrigger id="gender-filter">
                      <SelectValue placeholder="All Genders" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genders</SelectItem>
                      <SelectItem value="boy">Boy</SelectItem>
                      <SelectItem value="girl">Girl</SelectItem>
                      <SelectItem value="unisex">Unisex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="origin-filter">Origin</Label>
                  <Select value={filterOrigin} onValueChange={setFilterOrigin}>
                    <SelectTrigger id="origin-filter">
                      <SelectValue placeholder="All Origins" />
                    </SelectTrigger>
                    <SelectContent>
                      {origins.map(origin => (
                        <SelectItem key={origin.id} value={origin.id}>{origin.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="religion-filter">Religion</Label>
                  <Select value={filterReligion} onValueChange={setFilterReligion}>
                    <SelectTrigger id="religion-filter">
                      <SelectValue placeholder="All Religions" />
                    </SelectTrigger>
                    <SelectContent>
                      {religions.map(religion => (
                        <SelectItem key={religion.id} value={religion.id}>{religion.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sort-by">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sort-by">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                      <SelectItem value="popularity-desc">Popularity (High to Low)</SelectItem>
                      <SelectItem value="popularity-asc">Popularity (Low to High)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <DataTable 
              data={names}
              columns={columns}
              actions={actions}
              onAdd={handleAddNew}
              addButtonText="Add New Name"
              searchPlaceholder="Search names..."
              onImport={handleImportJSON}
              onExport={() => {
                // Future feature to export all names
                toast({
                  title: "Coming Soon",
                  description: "Export feature will be available soon."
                });
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{isEditing ? "Edit Name" : "Add New Name"}</CardTitle>
                <CardDescription>
                  {isEditing 
                    ? "Update the details for this name" 
                    : "Fill in the details to add a new name to the database"}
                </CardDescription>
              </div>
              <Button variant="ghost" onClick={() => setShowForm(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNameSubmit}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="attributes">Attributes</TabsTrigger>
                  <TabsTrigger value="variations">Variations</TabsTrigger>
                  <TabsTrigger value="famous">Famous People</TabsTrigger>
                  <TabsTrigger value="faqs">FAQs</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
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
                      <Select
                        value={nameDetails.origin}
                        onValueChange={(value) => setNameDetails({...nameDetails, origin: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select origin" />
                        </SelectTrigger>
                        <SelectContent>
                          {origins.filter(o => o.id !== 'all').map(origin => (
                            <SelectItem key={origin.id} value={origin.id}>{origin.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="religion">Religion</Label>
                      <Select
                        value={nameDetails.religion}
                        onValueChange={(value) => setNameDetails({...nameDetails, religion: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select religion" />
                        </SelectTrigger>
                        <SelectContent>
                          {religions.filter(r => r.id !== 'all').map(religion => (
                            <SelectItem key={religion.id} value={religion.id}>{religion.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={nameDetails.language}
                        onValueChange={(value) => setNameDetails({...nameDetails, language: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map(language => (
                            <SelectItem key={language.id} value={language.id}>{language.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="pronunciation">Pronunciation</Label>
                    <Input 
                      id="pronunciation" 
                      value={nameDetails.pronunciation}
                      onChange={(e) => setNameDetails({...nameDetails, pronunciation: e.target.value})}
                      placeholder="e.g. ah-LEX-an-der"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="attributes" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="popularity">Popularity (0-100)</Label>
                      <Input 
                        id="popularity" 
                        type="number"
                        min="0"
                        max="100"
                        value={nameDetails.popularity || ""}
                        onChange={(e) => setNameDetails({...nameDetails, popularity: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="numerology">Numerology (1-9)</Label>
                      <Select
                        value={nameDetails.numerology ? String(nameDetails.numerology) : ""}
                        onValueChange={(value) => setNameDetails({...nameDetails, numerology: parseInt(value)})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select numerology value" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                            <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="luckyNumber">Lucky Number</Label>
                      <Select
                        value={nameDetails.luckyNumber ? String(nameDetails.luckyNumber) : ""}
                        onValueChange={(value) => setNameDetails({...nameDetails, luckyNumber: parseInt(value)})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select lucky number" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                            <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="luckyStone">Lucky Stone</Label>
                      <Select
                        value={nameDetails.luckyStone}
                        onValueChange={(value) => setNameDetails({...nameDetails, luckyStone: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select lucky stone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Emerald">Emerald</SelectItem>
                          <SelectItem value="Ruby">Ruby</SelectItem>
                          <SelectItem value="Sapphire">Sapphire</SelectItem>
                          <SelectItem value="Diamond">Diamond</SelectItem>
                          <SelectItem value="Amethyst">Amethyst</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="luckyColor">Lucky Color</Label>
                      <Select
                        value={nameDetails.luckyColor}
                        onValueChange={(value) => setNameDetails({...nameDetails, luckyColor: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select lucky color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Red">Red</SelectItem>
                          <SelectItem value="Blue">Blue</SelectItem>
                          <SelectItem value="Green">Green</SelectItem>
                          <SelectItem value="Yellow">Yellow</SelectItem>
                          <SelectItem value="Purple">Purple</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zodiacSign">Zodiac Sign</Label>
                      <Select
                        value={nameDetails.zodiacSign}
                        onValueChange={(value) => setNameDetails({...nameDetails, zodiacSign: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select zodiac sign" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aries">Aries</SelectItem>
                          <SelectItem value="Taurus">Taurus</SelectItem>
                          <SelectItem value="Gemini">Gemini</SelectItem>
                          <SelectItem value="Cancer">Cancer</SelectItem>
                          <SelectItem value="Leo">Leo</SelectItem>
                          <SelectItem value="Virgo">Virgo</SelectItem>
                          <SelectItem value="Libra">Libra</SelectItem>
                          <SelectItem value="Scorpio">Scorpio</SelectItem>
                          <SelectItem value="Sagittarius">Sagittarius</SelectItem>
                          <SelectItem value="Capricorn">Capricorn</SelectItem>
                          <SelectItem value="Aquarius">Aquarius</SelectItem>
                          <SelectItem value="Pisces">Pisces</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Personality Traits</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {personality.map((trait, index) => (
                        <div key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-sm">
                          <span>{trait}</span>
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm" 
                            className="h-5 w-5 p-0"
                            onClick={() => removePersonalityTrait(index)}
                          >
                            <Trash2 className="h-3 w-3 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        value={newPersonality}
                        onChange={(e) => setNewPersonality(e.target.value)}
                        placeholder="Add personality trait"
                      />
                      <Button type="button" onClick={addPersonalityTrait}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="variations" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Name Variations</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {nameVariations.map((variation, index) => (
                        <div key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-sm">
                          <span>{variation}</span>
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm" 
                            className="h-5 w-5 p-0"
                            onClick={() => removeVariation(index)}
                          >
                            <Trash2 className="h-3 w-3 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        value={newVariation}
                        onChange={(e) => setNewVariation(e.target.value)}
                        placeholder="Add name variation"
                      />
                      <Button type="button" onClick={addVariation}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="famous" className="space-y-4">
                  <div className="space-y-4">
                    <Label>Famous People with this Name</Label>
                    <div className="flex flex-col gap-3 mb-4">
                      {famousPeople.map((person, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                          <div>
                            <p className="font-medium">{person.name}</p>
                            <p className="text-sm text-muted-foreground">{person.description}</p>
                          </div>
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFamousPerson(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Input 
                          value={newFamous.name}
                          onChange={(e) => setNewFamous({...newFamous, name: e.target.value})}
                          placeholder="Person's name"
                        />
                        <Input 
                          value={newFamous.description}
                          onChange={(e) => setNewFamous({...newFamous, description: e.target.value})}
                          placeholder="Description (e.g. Actor, Athlete)"
                        />
                      </div>
                      <Button type="button" onClick={addFamousPerson} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Famous Person
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="faqs" className="space-y-4">
                  <div className="space-y-4">
                    <Label>FAQs Related to this Name</Label>
                    <div className="flex flex-col gap-3 mb-4">
                      {nameFaqs.map((faq, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                          <div className="flex-1">
                            <p className="font-medium">{faq.question}</p>
                            <p className="text-sm text-muted-foreground">{faq.answer}</p>
                          </div>
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFaq(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Input 
                        value={newFaq.question}
                        onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                        placeholder="Question"
                      />
                      <Textarea 
                        value={newFaq.answer}
                        onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                        placeholder="Answer"
                        rows={3}
                      />
                      <Button type="button" onClick={addFaq} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add FAQ
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="seo" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="seo-title">SEO Title</Label>
                      <Input 
                        id="seo-title" 
                        value={nameDetails.seoTitle}
                        onChange={(e) => setNameDetails({...nameDetails, seoTitle: e.target.value})}
                        placeholder="e.g. Alexander Name Meaning and Origin | Baby Names"
                      />
                      <p className="text-xs text-muted-foreground">
                        Recommended length: 50-60 characters. Current length: {nameDetails.seoTitle.length}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="seo-description">Meta Description</Label>
                      <Textarea 
                        id="seo-description" 
                        value={nameDetails.seoDescription}
                        onChange={(e) => setNameDetails({...nameDetails, seoDescription: e.target.value})}
                        placeholder="e.g. Discover the meaning of the name Alexander, its origin, popularity, and more. Learn about famous people named Alexander and name variations."
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground">
                        Recommended length: 150-160 characters. Current length: {nameDetails.seoDescription.length}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="seo-keywords">Meta Keywords</Label>
                      <Input 
                        id="seo-keywords" 
                        value={nameDetails.seoKeywords}
                        onChange={(e) => setNameDetails({...nameDetails, seoKeywords: e.target.value})}
                        placeholder="e.g. Alexander, name meaning, baby names, boy names"
                      />
                      <p className="text-xs text-muted-foreground">
                        Separate keywords with commas
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end space-x-2 mt-6">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                      {isEditing ? "Updating..." : "Saving..."}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {isEditing ? "Update Name" : "Save Name"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManageNames;
