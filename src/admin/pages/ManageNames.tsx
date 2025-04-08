
import { useState, useEffect } from "react";
import {
  Button,
} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast";
import { MoreVertical, Edit, Trash, Plus, FileInput, ArrowDownToLine, Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSection,
  FormSectionTitle,
  FormGrid,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "../services/api";
import { FilterOptions } from "@/components/SearchFilter";

// Define a schema for name validation with all required fields
const nameSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  meaning: z.string().min(10, {
    message: "Meaning must be at least 10 characters.",
  }),
  gender: z.enum(['boy', 'girl', 'unisex'], {
    required_error: "Please select a valid gender.",
  }),
  origin: z.string().min(3, {
    message: "Origin must be at least 3 characters.",
  }),
  religion: z.string().optional(),
  language: z.string().optional(),
  description: z.string().optional(),
  popularity: z.number().optional(),
  luckyNumber: z.number().optional(),
  luckyStone: z.string().optional(),
  luckyColor: z.string().optional(),
  pronunciation: z.string().optional(),
  numerology: z.number().optional(),
  zodiacSign: z.string().optional(),
  nameVariations: z.array(z.string()).optional(),
  personality: z.array(z.string()).optional(),
  famousPeople: z.array(z.object({
    name: z.string(),
    description: z.string()
  })).optional(),
  nameFaqs: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  syllables: z.number().optional(),
  isFeatured: z.boolean().optional(),
  status: z.enum(['active', 'pending', 'archived']).default('active'),
});

// Define the types for the data
interface NameData {
  id: number;
  name: string;
  meaning: string;
  gender: string;
  origin: string;
  religion: string;
  language?: string;
  description?: string;
  popularity?: number;
  luckyNumber?: number;
  luckyStone?: string;
  luckyColor?: string;
  pronunciation?: string;
  numerology?: number;
  zodiacSign?: string;
  nameVariations?: string[];
  personality?: string[];
  famousPeople?: {name: string, description: string}[];
  nameFaqs?: {question: string, answer: string}[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  syllables?: number;
  isFeatured?: boolean;
  status?: 'active' | 'pending' | 'archived';
}

// Define a more specific type for API inputs that matches what we're sending
interface NameDataInput {
  name: string;
  meaning: string;
  gender: "boy" | "girl" | "unisex";
  origin: string;
  religion: string;
  language?: string;
  description?: string;
  popularity?: number;
  luckyNumber?: number;
  luckyStone?: string;
  luckyColor?: string;
  pronunciation?: string;
  numerology?: number;
  zodiacSign?: string;
  nameVariations?: string[];
  personality?: string[];
  famousPeople?: {name: string, description: string}[];
  nameFaqs?: {question: string, answer: string}[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  syllables?: number;
  isFeatured?: boolean;
  status?: 'active' | 'pending' | 'archived';
}

const ManageNames = () => {
  const [names, setNames] = useState<NameData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<FilterOptions>({});
  const [selectedName, setSelectedName] = useState<NameData | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [newFamousPerson, setNewFamousPerson] = useState({ name: '', description: '' });
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [newVariation, setNewVariation] = useState('');
  const [newPersonality, setNewPersonality] = useState('');
  const { toast } = useToast();

  // Form for creating and editing names
  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: "",
      meaning: "",
      gender: "boy",
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
      nameVariations: [],
      personality: [],
      famousPeople: [],
      nameFaqs: [],
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
      syllables: 0,
      isFeatured: false,
      status: 'active'
    },
  });

  // Function to get form values
  const getFormValues = () => form.getValues();

  // Fetch names from API
  useEffect(() => {
    const fetchNames = async () => {
      setIsLoading(true);
      try {
        const response = await api.names.getAll({
          page: page.toString(),
          limit: limit.toString(),
          search: searchQuery,
          ...searchFilters
        });
        if (response.success) {
          setNames(response.data);
          setTotal(response.meta.total);
        } else {
          toast({
            title: "Error fetching names",
            description: response.message || "Failed to load names.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching names:", error);
        toast({
          title: "Error fetching names",
          description: "Failed to connect to the server.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchNames();
  }, [page, limit, searchQuery, searchFilters, toast]);

  // Handle search
  const handleSearch = (searchTerm: string, filters: FilterOptions) => {
    setSearchQuery(searchTerm);
    setSearchFilters(filters);
    setPage(1); // Reset to the first page when searching
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle limit change
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to the first page when limit changes
  };

  // Convert form values to API input format
  const convertFormValuesToApiInput = (values: z.infer<typeof nameSchema>): NameDataInput => {
    // Ensure famousPeople and nameFaqs have required properties
    const famousPeople = values.famousPeople?.map(person => ({
      name: person.name || "",
      description: person.description || ""
    }));

    const nameFaqs = values.nameFaqs?.map(faq => ({
      question: faq.question || "",
      answer: faq.answer || ""
    }));

    // Create a properly typed object with all required fields
    const result: NameDataInput = {
      name: values.name,
      meaning: values.meaning,
      gender: values.gender,
      origin: values.origin,
      religion: values.religion || "",
      language: values.language,
      description: values.description,
      popularity: values.popularity,
      luckyNumber: values.luckyNumber,
      luckyStone: values.luckyStone,
      luckyColor: values.luckyColor,
      pronunciation: values.pronunciation,
      numerology: values.numerology,
      zodiacSign: values.zodiacSign,
      nameVariations: values.nameVariations,
      personality: values.personality,
      famousPeople: famousPeople,
      nameFaqs: nameFaqs,
      seoTitle: values.seoTitle,
      seoDescription: values.seoDescription,
      seoKeywords: values.seoKeywords,
      syllables: values.syllables,
      isFeatured: values.isFeatured,
      status: values.status
    };

    return result;
  };

  // Handle name creation
  const handleCreateName = async (values: z.infer<typeof nameSchema>) => {
    try {
      const apiInput = convertFormValuesToApiInput(values);
      const response = await api.names.create(apiInput);
      
      if (response.success) {
        toast({
          title: "Name created",
          description: response.message || "Name created successfully.",
        });
        setNames((prevNames) => [...prevNames, response.data]);
        setIsCreateDialogOpen(false);
        form.reset();
      } else {
        toast({
          title: "Error creating name",
          description: response.message || "Failed to create name.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating name:", error);
      toast({
        title: "Error creating name",
        description: "Failed to connect to the server.",
        variant: "destructive",
      });
    }
  };

  // Handle name update
  const handleUpdateName = async (values: z.infer<typeof nameSchema>) => {
    if (!selectedName) return;
    try {
      const apiInput = convertFormValuesToApiInput(values);
      const response = await api.names.update(selectedName.id, apiInput);
      
      if (response.success) {
        toast({
          title: "Name updated",
          description: response.message || "Name updated successfully.",
        });
        setNames((prevNames) =>
          prevNames.map((name) => (name.id === selectedName.id ? response.data : name))
        );
        setIsEditDialogOpen(false);
        form.reset();
      } else {
        toast({
          title: "Error updating name",
          description: response.message || "Failed to update name.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating name:", error);
      toast({
        title: "Error updating name",
        description: "Failed to connect to the server.",
        variant: "destructive",
      });
    }
  };

  // Handle name deletion
  const handleDeleteName = async () => {
    if (!selectedName) return;
    try {
      const response = await api.names.delete(selectedName.id);
      if (response.success) {
        toast({
          title: "Name deleted",
          description: response.message || "Name deleted successfully.",
        });
        setNames((prevNames) => prevNames.filter((name) => name.id !== selectedName.id));
        setIsDeleteDialogOpen(false);
      } else {
        toast({
          title: "Error deleting name",
          description: response.message || "Failed to delete name.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting name:", error);
      toast({
        title: "Error deleting name",
        description: "Failed to connect to the server.",
        variant: "destructive",
      });
    }
  };

  // Handle import names
  const handleImportNames = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      if (event.target && typeof event.target.result === 'string') {
        try {
          const importedNames = JSON.parse(event.target.result);
          setIsImporting(true);
  
          // Validate that importedNames is an array
          if (!Array.isArray(importedNames)) {
            throw new Error("Imported data must be an array of names.");
          }
  
          // Validate each name object against the schema
          for (const name of importedNames) {
            try {
              nameSchema.parse(name); // This will throw an error if the name doesn't match the schema
            } catch (validationError) {
              console.error("Validation error for name:", name, validationError);
              toast({
                title: "Validation Error",
                description: `One or more names in the imported file do not match the required format. Check console for details.`,
                variant: "destructive",
              });
              setIsImporting(false);
              return; // Stop processing further names
            }
          }
  
          // If all names are valid, proceed to create them
          const successCount = 0;
          const failCount = 0;
          
          for (const name of importedNames) {
            try {
              const apiInput = convertFormValuesToApiInput(name);
              await api.names.create(apiInput);
              successCount++;
            } catch (error) {
              console.error("Error importing name:", name, error);
              failCount++;
            }
          }
  
          toast({
            title: "Names Imported",
            description: `Successfully imported ${successCount} names. Failed: ${failCount}.`,
          });
          setPage(1); // Refresh the name list
        } catch (error) {
          console.error("Error importing names:", error);
          toast({
            title: "Error Importing Names",
            description: `Failed to import names. ${error instanceof Error ? error.message : 'Check console for details.'}`,
            variant: "destructive",
          });
        } finally {
          setIsImporting(false);
        }
      }
    };
    
    reader.readAsText(file);
  };

  // Handle export names
  const handleExportNames = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(names)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "names.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper functions for form arrays
  const addFamousPerson = () => {
    if (newFamousPerson.name && newFamousPerson.description) {
      const currentPeople = form.getValues('famousPeople') || [];
      form.setValue('famousPeople', [...currentPeople, newFamousPerson]);
      setNewFamousPerson({ name: '', description: '' });
    }
  };

  const removeFamousPerson = (index: number) => {
    const currentPeople = form.getValues('famousPeople') || [];
    form.setValue('famousPeople', currentPeople.filter((_, i) => i !== index));
  };

  const addFaq = () => {
    if (newFaq.question && newFaq.answer) {
      const currentFaqs = form.getValues('nameFaqs') || [];
      form.setValue('nameFaqs', [...currentFaqs, newFaq]);
      setNewFaq({ question: '', answer: '' });
    }
  };

  const removeFaq = (index: number) => {
    const currentFaqs = form.getValues('nameFaqs') || [];
    form.setValue('nameFaqs', currentFaqs.filter((_, i) => i !== index));
  };

  const addVariation = () => {
    if (newVariation) {
      const currentVariations = form.getValues('nameVariations') || [];
      form.setValue('nameVariations', [...currentVariations, newVariation]);
      setNewVariation('');
    }
  };

  const removeVariation = (index: number) => {
    const currentVariations = form.getValues('nameVariations') || [];
    form.setValue('nameVariations', currentVariations.filter((_, i) => i !== index));
  };

  const addPersonality = () => {
    if (newPersonality) {
      const currentPersonalities = form.getValues('personality') || [];
      form.setValue('personality', [...currentPersonalities, newPersonality]);
      setNewPersonality('');
    }
  };

  const removePersonality = (index: number) => {
    const currentPersonalities = form.getValues('personality') || [];
    form.setValue('personality', currentPersonalities.filter((_, i) => i !== index));
  };

  // Generate pagination items
  const getPaginationItems = () => {
    const totalPages = Math.ceil(total / limit);
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

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Names</CardTitle>
          <CardDescription>
            Here you can manage all the names in the database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4 items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search names..."
                value={searchQuery}
                className="pl-8"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch(e.target.value, searchFilters)
                }}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => {
                form.reset();
                setIsCreateDialogOpen(true);
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Name
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" disabled={isImporting}>
                    <FileInput className="mr-2 h-4 w-4" />
                    Import
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Import Names</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Label htmlFor="import-names" className="cursor-pointer w-full">
                      Select JSON File
                    </Label>
                    <Input
                      type="file"
                      id="import-names"
                      className="hidden"
                      accept=".json"
                      onChange={handleImportNames}
                      disabled={isImporting}
                    />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" onClick={handleExportNames}>
                <ArrowDownToLine className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[600px]">
            <Table>
              <TableCaption>A list of your names.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Meaning</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      Loading names...
                    </TableCell>
                  </TableRow>
                ) : names.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No names found.
                    </TableCell>
                  </TableRow>
                ) : (
                  names.map((name) => (
                    <TableRow key={name.id}>
                      <TableCell className="font-medium">{name.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {name.name}
                          {name.isFeatured && (
                            <Badge variant="secondary" className="ml-2">Featured</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{name.meaning}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            name.gender === 'boy' ? "default" : 
                            name.gender === 'girl' ? "destructive" : 
                            "outline"
                          }
                        >
                          {name.gender}
                        </Badge>
                      </TableCell>
                      <TableCell>{name.origin}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            name.status === 'active' ? "default" : 
                            name.status === 'pending' ? "outline" : 
                            "secondary"
                          }
                        >
                          {name.status || 'active'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => {
                              setSelectedName(name);
                              form.reset({
                                name: name.name,
                                meaning: name.meaning,
                                gender: name.gender as "boy" | "girl" | "unisex",
                                origin: name.origin,
                                religion: name.religion,
                                language: name.language,
                                description: name.description,
                                popularity: name.popularity,
                                luckyNumber: name.luckyNumber,
                                luckyStone: name.luckyStone,
                                luckyColor: name.luckyColor,
                                pronunciation: name.pronunciation,
                                numerology: name.numerology,
                                zodiacSign: name.zodiacSign,
                                nameVariations: name.nameVariations,
                                personality: name.personality,
                                famousPeople: name.famousPeople,
                                nameFaqs: name.nameFaqs,
                                seoTitle: name.seoTitle,
                                seoDescription: name.seoDescription,
                                seoKeywords: name.seoKeywords,
                                syllables: name.syllables,
                                isFeatured: name.isFeatured,
                                status: (name.status as 'active' | 'pending' | 'archived') || 'active',
                              });
                              setIsEditDialogOpen(true);
                            }}>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedName(name);
                              setIsDeleteDialogOpen(true);
                            }}>
                              <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="flex items-center justify-between">
                      <span>Total names: {total}</span>
                      <div className="flex items-center gap-4">
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
                                disabled={page * limit >= total}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                        <Select value={limit.toString()} onValueChange={(value) => handleLimitChange(parseInt(value))}>
                          <SelectTrigger className="w-[80px]">
                            <SelectValue placeholder="Limit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Name Form Dialog - Used for both Edit and Create */}
      <Dialog open={isEditDialogOpen || isCreateDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsEditDialogOpen(false);
          setIsCreateDialogOpen(false);
        }
      }}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditDialogOpen ? "Edit Name" : "Add New Name"}</DialogTitle>
            <DialogDescription>
              {isEditDialogOpen ? "Update the details of this name." : "Create a new name with complete details."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(isEditDialogOpen ? handleUpdateName : handleCreateName)} className="space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="details">Additional Details</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="seo">SEO & Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
                  <FormSection>
                    <FormSectionTitle>Basic Information</FormSectionTitle>
                    <FormGrid columns={2}>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="boy">Boy</SelectItem>
                                <SelectItem value="girl">Girl</SelectItem>
                                <SelectItem value="unisex">Unisex</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormGrid>
                    
                    <FormField
                      control={form.control}
                      name="meaning"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name Meaning</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Meaning of the name" rows={3} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormGrid columns={2}>
                      <FormField
                        control={form.control}
                        name="origin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Origin</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. English, French, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="religion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Religion</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Christianity, Islam, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormGrid>
                    
                    <FormGrid columns={2}>
                      <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Language</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. English, Arabic, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pronunciation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pronunciation</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. ah-LEE-sha" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormGrid>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Detailed description of the name" rows={4} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormSection>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-4">
                  <FormSection>
                    <FormSectionTitle>Name Attributes</FormSectionTitle>
                    <FormGrid columns={3}>
                      <FormField
                        control={form.control}
                        name="popularity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Popularity (0-100)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="0" 
                                min={0} 
                                max={100} 
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="syllables"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Syllables</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="0" 
                                min={1} 
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="numerology"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Numerology</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="0" 
                                min={0} 
                                max={9} 
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormGrid>
                    
                    <FormGrid columns={3}>
                      <FormField
                        control={form.control}
                        name="luckyNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lucky Number</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="0" 
                                min={0} 
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="luckyColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lucky Color</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Blue" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="luckyStone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lucky Stone</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Emerald" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormGrid>
                    
                    <FormField
                      control={form.control}
                      name="zodiacSign"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zodiac Sign</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || ""}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select zodiac sign (optional)" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="">None</SelectItem>
                              <SelectItem value="aries">Aries</SelectItem>
                              <SelectItem value="taurus">Taurus</SelectItem>
                              <SelectItem value="gemini">Gemini</SelectItem>
                              <SelectItem value="cancer">Cancer</SelectItem>
                              <SelectItem value="leo">Leo</SelectItem>
                              <SelectItem value="virgo">Virgo</SelectItem>
                              <SelectItem value="libra">Libra</SelectItem>
                              <SelectItem value="scorpio">Scorpio</SelectItem>
                              <SelectItem value="sagittarius">Sagittarius</SelectItem>
                              <SelectItem value="capricorn">Capricorn</SelectItem>
                              <SelectItem value="aquarius">Aquarius</SelectItem>
                              <SelectItem value="pisces">Pisces</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormSection>
                  
                  <FormSection>
                    <FormSectionTitle>Variations & Personality</FormSectionTitle>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Name Variations</h4>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a name variation"
                          value={newVariation}
                          onChange={(e) => setNewVariation(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="button" onClick={addVariation} disabled={!newVariation}>Add</Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {form.watch('nameVariations')?.map((variation, index) => (
                          <Badge key={index} className="px-3 py-1">
                            {variation}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-2"
                              onClick={() => removeVariation(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4 mt-4">
                      <h4 className="text-sm font-medium">Personality Traits</h4>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a personality trait"
                          value={newPersonality}
                          onChange={(e) => setNewPersonality(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="button" onClick={addPersonality} disabled={!newPersonality}>Add</Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {form.watch('personality')?.map((trait, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1">
                            {trait}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-2"
                              onClick={() => removePersonality(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </FormSection>
                </TabsContent>
                
                <TabsContent value="content" className="space-y-4">
                  <FormSection>
                    <FormSectionTitle>Famous People</FormSectionTitle>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Input
                          placeholder="Person name"
                          value={newFamousPerson.name}
                          onChange={(e) => setNewFamousPerson({...newFamousPerson, name: e.target.value})}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Brief description"
                            value={newFamousPerson.description}
                            onChange={(e) => setNewFamousPerson({...newFamousPerson, description: e.target.value})}
                            className="flex-1"
                          />
                          <Button 
                            type="button" 
                            onClick={addFamousPerson}
                            disabled={!newFamousPerson.name || !newFamousPerson.description}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-md divide-y">
                        {form.watch('famousPeople')?.length === 0 ? (
                          <p className="text-muted-foreground p-4 text-center">No famous people added yet.</p>
                        ) : (
                          form.watch('famousPeople')?.map((person, index) => (
                            <div key={index} className="p-3 flex justify-between items-center">
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
                                <Trash className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </FormSection>
                  
                  <FormSection>
                    <FormSectionTitle>Name FAQs</FormSectionTitle>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-2">
                        <Input
                          placeholder="Question"
                          value={newFaq.question}
                          onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                        />
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Answer"
                            value={newFaq.answer}
                            onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                            className="flex-1"
                            rows={2}
                          />
                          <Button 
                            type="button" 
                            onClick={addFaq}
                            disabled={!newFaq.question || !newFaq.answer}
                            className="self-start"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-md divide-y">
                        {form.watch('nameFaqs')?.length === 0 ? (
                          <p className="text-muted-foreground p-4 text-center">No FAQs added yet.</p>
                        ) : (
                          form.watch('nameFaqs')?.map((faq, index) => (
                            <div key={index} className="p-3 flex justify-between items-start">
                              <div>
                                <p className="font-medium">{faq.question}</p>
                                <p className="text-sm text-muted-foreground">{faq.answer}</p>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFaq(index)}
                              >
                                <Trash className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </FormSection>
                </TabsContent>
                
                <TabsContent value="seo" className="space-y-4">
                  <FormSection>
                    <FormSectionTitle>SEO Settings</FormSectionTitle>
                    <FormField
                      control={form.control}
                      name="seoTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SEO Title</FormLabel>
                          <FormControl>
                            <Input placeholder="SEO Title (usually including the name)" {...field} />
                          </FormControl>
                          <FormDescription>
                            Title tag for search engines. Keep it under 60 characters.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="seoDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SEO Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Meta description for search results" {...field} rows={3} />
                          </FormControl>
                          <FormDescription>
                            Meta description for search engines. Keep it under 160 characters.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="seoKeywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SEO Keywords</FormLabel>
                          <FormControl>
                            <Input placeholder="Comma separated keywords" {...field} />
                          </FormControl>
                          <FormDescription>
                            Keywords for search engines (comma separated).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormSection>
                  
                  <FormSection>
                    <FormSectionTitle>Admin Settings</FormSectionTitle>
                    <FormGrid columns={2}>
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Controls visibility on the site
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="isFeatured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Featured Name
                              </FormLabel>
                              <FormDescription>
                                Featured names appear highlighted on the homepage and other sections
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </FormGrid>
                  </FormSection>
                </TabsContent>
              </Tabs>
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => {
                  setIsEditDialogOpen(false);
                  setIsCreateDialogOpen(false);
                }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditDialogOpen ? "Update Name" : "Create Name"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Name Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Name</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedName?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteName} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageNames;
