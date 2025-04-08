
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
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
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Plus, 
  Pencil, 
  Trash, 
  Search, 
  Save, 
  X,
  ArrowUpDown, 
  Globe, 
  Church, 
  Languages 
} from "lucide-react";

// Form schema for adding/editing a regional category
const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  type: z.enum(["country", "religion", "language"]),
  count: z.number().int().positive().optional(),
  description: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface Category {
  id: string;
  name: string;
  type: "country" | "religion" | "language";
  count?: number;
  description?: string;
}

const RegionalCategories = () => {
  const [activeTab, setActiveTab] = useState<string>("country");
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ 
    key: "name", 
    direction: "asc" 
  });
  
  const { toast } = useToast();
  const itemsPerPage = 10;
  
  // Initialize form with default values or selected category data when editing
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      type: "country",
      count: 0,
      description: "",
    },
  });

  // Sample data for demonstration - would be replaced by API call
  useEffect(() => {
    const mockData: Category[] = [
      // Countries
      { id: "c1", name: "Indian", type: "country", count: 1250, description: "Names originating from India" },
      { id: "c2", name: "Arabic", type: "country", count: 980, description: "Names with Arabic origins" },
      { id: "c3", name: "English", type: "country", count: 875, description: "Traditional English names" },
      { id: "c4", name: "Hebrew", type: "country", count: 740, description: "Names from Hebrew culture" },
      { id: "c5", name: "Greek", type: "country", count: 650, description: "Names from Ancient and Modern Greece" },
      { id: "c6", name: "Latin", type: "country", count: 590, description: "Names with Latin origins" },
      { id: "c7", name: "French", type: "country", count: 520, description: "Names from France" },
      { id: "c8", name: "Irish", type: "country", count: 450, description: "Traditional Irish names" },
      { id: "c9", name: "German", type: "country", count: 430, description: "Names from Germany" },
      { id: "c10", name: "Spanish", type: "country", count: 410, description: "Names from Spanish-speaking regions" },
      { id: "c11", name: "Italian", type: "country", count: 390, description: "Names with Italian heritage" },
      { id: "c12", name: "Nordic", type: "country", count: 340, description: "Names from Scandinavian countries" },
      { id: "c13", name: "Russian", type: "country", count: 310, description: "Names from Russia" },
      { id: "c14", name: "Japanese", type: "country", count: 290, description: "Names from Japan" },

      // Religions
      { id: "r1", name: "Islamic", type: "religion", count: 1450, description: "Names associated with Islam" },
      { id: "r2", name: "Christian", type: "religion", count: 1320, description: "Names from Christian traditions" },
      { id: "r3", name: "Hindu", type: "religion", count: 980, description: "Names associated with Hinduism" },
      { id: "r4", name: "Jewish", type: "religion", count: 740, description: "Names from Jewish traditions" },
      { id: "r5", name: "Buddhist", type: "religion", count: 380, description: "Names associated with Buddhism" },
      { id: "r6", name: "Sikh", type: "religion", count: 290, description: "Names from Sikh tradition" },

      // Languages
      { id: "l1", name: "Arabic", type: "language", count: 1150, description: "Names in the Arabic language" },
      { id: "l2", name: "English", type: "language", count: 1080, description: "Names in the English language" },
      { id: "l3", name: "Sanskrit", type: "language", count: 920, description: "Names from the Sanskrit language" },
      { id: "l4", name: "Hebrew", type: "language", count: 780, description: "Names in the Hebrew language" },
      { id: "l5", name: "Greek", type: "language", count: 650, description: "Names from the Greek language" },
      { id: "l6", name: "Latin", type: "language", count: 580, description: "Names in Latin" },
      { id: "l7", name: "French", type: "language", count: 490, description: "Names in the French language" },
      { id: "l8", name: "Spanish", type: "language", count: 430, description: "Names in Spanish" },
      { id: "l9", name: "German", type: "language", count: 410, description: "Names in German" },
      { id: "l10", name: "Italian", type: "language", count: 380, description: "Names in Italian" },
      { id: "l11", name: "Russian", type: "language", count: 340, description: "Names in Russian" },
      { id: "l12", name: "Japanese", type: "language", count: 290, description: "Names in Japanese" },
    ];
    
    setCategories(mockData);
  }, []);
  
  // Filter and paginate categories based on search term and active tab
  useEffect(() => {
    let filtered = categories.filter(cat => 
      cat.type === activeTab && 
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Sort the filtered data
    filtered = [...filtered].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Category];
      const bValue = b[sortConfig.key as keyof Category];
      
      if (aValue === undefined || bValue === undefined) return 0;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });
    
    setFilteredCategories(filtered);
    setCurrentPage(1);
  }, [categories, activeTab, searchTerm, sortConfig]);

  // Get current page categories
  const getCurrentPageCategories = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  
  // Request sort by specific key
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Edit category handler
  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    form.reset({
      id: category.id,
      name: category.name,
      type: category.type,
      count: category.count,
      description: category.description || "",
    });
    setIsEditing(true);
  };
  
  // Delete category handler
  const handleDelete = (id: string) => {
    // In a real app, would call API to delete the category
    setCategories(prevCategories => 
      prevCategories.filter(category => category.id !== id)
    );
    
    toast({
      title: "Category Deleted",
      description: "The category has been successfully deleted.",
    });
  };
  
  // Form submit handler
  const onSubmit = async (data: CategoryFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isEditing && selectedCategory) {
        // Update existing category
        setCategories(prevCategories =>
          prevCategories.map(category =>
            category.id === selectedCategory.id
              ? { ...data, id: selectedCategory.id } as Category
              : category
          )
        );
        
        toast({
          title: "Category Updated",
          description: "The category has been successfully updated.",
        });
      } else {
        // Add new category
        const newCategory: Category = {
          ...data,
          id: `${data.type[0]}${categories.length + 1}`, // Generate a simple ID
          count: data.count || 0,
        };
        
        setCategories(prevCategories => [...prevCategories, newCategory]);
        
        toast({
          title: "Category Added",
          description: "The new category has been successfully added.",
        });
      }
      
      // Reset form and state
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the category. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    form.reset({
      name: "",
      type: activeTab as "country" | "religion" | "language",
      count: 0,
      description: "",
    });
    setIsEditing(false);
    setSelectedCategory(null);
  };
  
  // Get tab icon based on type
  const getTabIcon = (type: string) => {
    switch(type) {
      case "country":
        return <Globe className="h-4 w-4 mr-2" />;
      case "religion":
        return <Church className="h-4 w-4 mr-2" />;
      case "language":
        return <Languages className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Regional Categories</h1>
      <p className="text-muted-foreground">
        Manage country origins, religions, and languages for categorizing names.
      </p>

      <Tabs 
        defaultValue="country" 
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
          resetForm();
        }}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="country" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Countries
          </TabsTrigger>
          <TabsTrigger value="religion" className="flex items-center">
            <Church className="h-4 w-4 mr-2" />
            Religions
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center">
            <Languages className="h-4 w-4 mr-2" />
            Languages
          </TabsTrigger>
        </TabsList>

        {/* Shared content for each tab */}
        {["country", "religion", "language"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-6">
            {/* Search and Add Section */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => {
                  resetForm();
                  form.setValue("type", tabValue as "country" | "religion" | "language");
                }}
                className="w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add {tabValue.charAt(0).toUpperCase() + tabValue.slice(1)}
              </Button>
            </div>
            
            {/* Categories List Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead onClick={() => requestSort('name')} className="cursor-pointer w-1/3">
                        <div className="flex items-center">
                          Name
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead onClick={() => requestSort('count')} className="cursor-pointer">
                        <div className="flex items-center">
                          Count
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="hidden md:table-cell">Description</TableHead>
                      <TableHead className="w-24">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getCurrentPageCategories().length > 0 ? (
                      getCurrentPageCategories().map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {getTabIcon(category.type)}
                              {category.name}
                            </div>
                          </TableCell>
                          <TableCell>{category.count || 0}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {category.description || "No description"}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(category)}
                                title="Edit"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive"
                                    title="Delete"
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{category.name}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(category.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                          {searchTerm 
                            ? `No ${activeTab} categories found matching "${searchTerm}"` 
                            : `No ${activeTab} categories found`}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              
              {/* Pagination */}
              {filteredCategories.length > itemsPerPage && (
                <CardFooter className="border-t py-4">
                  <Pagination className="mx-auto">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationLink onClick={() => setCurrentPage(1)}>
                            1
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      
                      {currentPage > 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      
                      <PaginationItem>
                        <PaginationLink isActive>{currentPage}</PaginationLink>
                      </PaginationItem>
                      
                      {currentPage < totalPages - 1 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardFooter>
              )}
            </Card>

            {/* Category Form */}
            {(isEditing || (!isEditing && form.getValues().name)) && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isEditing ? `Edit ${selectedCategory?.name}` : `Add New ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
                  </CardTitle>
                  <CardDescription>
                    {isEditing 
                      ? `Update details for this ${activeTab} category.` 
                      : `Create a new ${activeTab} category for name classification.`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder={`Enter ${activeTab} name`} {...field} />
                            </FormControl>
                            <FormDescription>
                              The display name for this {activeTab} category.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={isEditing}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="country">Country</SelectItem>
                                <SelectItem value="religion">Religion</SelectItem>
                                <SelectItem value="language">Language</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Category type determines where this will appear on the site.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="count"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name Count</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              Number of names in this category (optional).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Brief description of this category"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Short description for admin reference (optional).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end space-x-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={resetForm}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              {isEditing ? "Update" : "Save"}
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default RegionalCategories;
