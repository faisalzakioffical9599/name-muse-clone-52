
// CategoryNames.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/admin/services/api";
import NameCard, { NameCardProps } from "@/components/NameCard";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import EnhancedSearchBar from "@/components/EnhancedSearchBar";
import { FilterOptions } from "@/components/SearchFilter";

// Define interface to match the CategoryData returned from API
interface Category {
  id: string; // We'll convert the number to string when using API data
  name: string;
  type?: "religion" | "language" | "country";
  description?: string;
  count: number;
}

const CategoryNames = () => {
  const { categoryType, categoryId } = useParams<{
    categoryType: string;
    categoryId: string;
  }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [names, setNames] = useState<NameCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    gender: "all",
    countries: [],
    religions: [],
    languages: [],
    sortBy: "alphabetical-asc"
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategoryAndNames = async () => {
      setIsLoading(true);
      try {
        // Fetch category details - fix the API call
        const categoryResponse = await api.categories.getById(categoryId as string);
        if (categoryResponse.success) {
          // Convert the CategoryData to Category interface, ensuring id is a string
          setCategory({
            ...categoryResponse.data,
            id: String(categoryResponse.data.id) // Convert number id to string
          });
        } else {
          toast({
            title: "Error fetching category",
            description:
              categoryResponse.message || "Failed to load category details.",
            variant: "destructive",
          });
        }

        // Fetch names for the category
        const namesResponse = await api.names.getAll({
          page: page.toString(),
          limit: limit.toString(),
          [categoryType as string]: categoryId,
          search: searchQuery,
          ...createApiFilters(filters)  // Add all filter parameters
        });

        if (namesResponse.success) {
          // Fix: ensure we map the data to match the NameCardProps type
          const mappedNames = namesResponse.data.map(name => ({
            ...name,
            id: String(name.id), // Ensure id is a string
            // Ensure gender is one of the allowed types
            gender: (name.gender === 'boy' || name.gender === 'girl' || 
                    name.gender === 'unisex') ? 
                    (name.gender as "boy" | "girl" | "unisex") : "unisex"
          }));
          
          setNames(mappedNames as NameCardProps[]);
          setTotal(namesResponse.meta.total);
        } else {
          toast({
            title: "Error fetching names",
            description: namesResponse.message || "Failed to load names.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error fetching data",
          description: "Failed to connect to the server.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryAndNames();
  }, [categoryType, categoryId, page, limit, searchQuery, filters, toast]);

  // Helper function to convert filter options to API parameters
  const createApiFilters = (filterOptions: FilterOptions) => {
    const apiFilters: Record<string, string> = {};
    
    if (filterOptions.gender && filterOptions.gender !== "all") {
      apiFilters.gender = filterOptions.gender;
    }
    
    if (filterOptions.countries && filterOptions.countries.length > 0) {
      apiFilters.origin = filterOptions.countries.join(",");
    }
    
    if (filterOptions.religions && filterOptions.religions.length > 0) {
      apiFilters.religion = filterOptions.religions.join(",");
    }
    
    if (filterOptions.languages && filterOptions.languages.length > 0) {
      apiFilters.language = filterOptions.languages.join(",");
    }
    
    if (filterOptions.sortBy) {
      apiFilters.sort = filterOptions.sortBy;
    }
    
    return apiFilters;
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to the first page when limit changes
  };

  const handleSearch = (searchTerm: string, newFilters: FilterOptions) => {
    setSearchQuery(searchTerm);
    setFilters(newFilters);
    setPage(1); // Reset to the first page when searching or filtering
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
    <div className="container py-12">
      {category ? (
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">{category.name} Names</h1>
          <p className="text-muted-foreground">{category.description}</p>
          <Badge className="mt-2">{category.count} names</Badge>
        </div>
      ) : (
        <p>Loading category details...</p>
      )}

      <EnhancedSearchBar 
        className="mb-6" 
        placeholder="Search within this category..." 
        onSearch={handleSearch}
        initialFilters={filters}
      />

      {isLoading ? (
        <p>Loading names...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {names.length > 0 ? (
              names.map((name) => (
                <NameCard key={name.id} {...name} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-lg text-gray-500">No names found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({
                      gender: "all",
                      countries: [],
                      religions: [],
                      languages: [],
                      sortBy: "alphabetical-asc"
                    });
                    setPage(1);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {names.length > 0 && (
            <div className="flex items-center justify-between mt-8">
              <span>Total names: {total}</span>
              <div className="flex items-center gap-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className={page === 1 ? "opacity-50" : ""}
                      >
                        <PaginationPrevious className="h-4 w-4" />
                      </Button>
                    </PaginationItem>
                    {getPaginationItems()}
                    <PaginationItem>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page * limit >= total}
                        className={page * limit >= total ? "opacity-50" : ""}
                      >
                        <PaginationNext className="h-4 w-4" />
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                <Select
                  value={limit.toString()}
                  onValueChange={(value) => handleLimitChange(parseInt(value))}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="Limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="48">48</SelectItem>
                    <SelectItem value="96">96</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryNames;
