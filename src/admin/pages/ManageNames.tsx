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
import { MoreVertical, Edit, Trash, Plus, FileInput, ArrowDownToLine } from "lucide-react";
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
import { api } from "../services/api";
import { FilterOptions } from "@/components/SearchFilter";

// Define a schema for name validation
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
    },
  });

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
      seoKeywords: values.seoKeywords
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
          for (const name of importedNames) {
            const apiInput = convertFormValuesToApiInput(name);
            await api.names.create(apiInput);
          }
  
          toast({
            title: "Names Imported",
            description: `Successfully imported ${importedNames.length} names.`,
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
            {/* Search and Filters will go here */}
            <Input
              type="search"
              placeholder="Search names..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value, searchFilters)
              }}
            />
            <div className="flex gap-2">
              <Button onClick={() => setIsCreateDialogOpen(true)}>
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
                    <Label htmlFor="import-names" className="cursor-pointer">
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

          <ScrollArea>
            <Table>
              <TableCaption>A list of your names.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Meaning</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Loading names...
                    </TableCell>
                  </TableRow>
                ) : names.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No names found.
                    </TableCell>
                  </TableRow>
                ) : (
                  names.map((name) => (
                    <TableRow key={name.id}>
                      <TableCell className="font-medium">{name.id}</TableCell>
                      <TableCell>{name.name}</TableCell>
                      <TableCell>{name.meaning}</TableCell>
                      <TableCell>{name.gender}</TableCell>
                      <TableCell>{name.origin}</TableCell>
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
                  <TableCell colSpan={6}>
                    <div className="flex items-center justify-between">
                      <span>Total names: {total}</span>
                      <div className="flex items-center gap-4">
                        <span>Page: {page}</span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                          >
                            Previous
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page * limit >= total}
                          >
                            Next
                          </Button>
                        </div>
                        <Select value={limit.toString()} onValueChange={(value) => handleLimitChange(parseInt(value))}>
                          <SelectTrigger className="w-[120px]">
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

      {/* Edit Name Dialog */}
      <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Name</AlertDialogTitle>
            <AlertDialogDescription>
              Edit the details of the selected name.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateName)} className="space-y-4">
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
                name="meaning"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meaning</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Meaning" {...field} />
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
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
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin</FormLabel>
                    <FormControl>
                      <Input placeholder="Origin" {...field} />
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
                      <Input placeholder="Religion" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Input placeholder="Language" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit">Edit</Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Name Dialog */}
      <AlertDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Name</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new name in the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateName)} className="space-y-4">
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
                name="meaning"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meaning</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Meaning" {...field} />
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
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
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin</FormLabel>
                    <FormControl>
                      <Input placeholder="Origin" {...field} />
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
                      <Input placeholder="Religion" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Input placeholder="Language" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit">Create</Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Name Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Name</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this name? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteName}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageNames;
