
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
import SearchBar from "@/components/SearchBar"; // Fix: import directly

interface Category {
  id: string;
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
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategoryAndNames = async () => {
      setIsLoading(true);
      try {
        // Fetch category details - fix the API call
        const categoryResponse = await api.categories.getById(categoryId as string);
        if (categoryResponse.success) {
          setCategory(categoryResponse.data);
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
        });

        if (namesResponse.success) {
          // Fix: ensure we map the data to match the NameCardProps type
          const mappedNames = namesResponse.data.map(name => ({
            ...name,
            // Ensure gender is one of the allowed types
            gender: (name.gender as string === 'boy' || name.gender as string === 'girl' || 
                    name.gender as string === 'unisex') ? 
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
  }, [categoryType, categoryId, page, limit, searchQuery, toast]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to the first page when limit changes
  };

  const handleSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm);
    setPage(1); // Reset to the first page when searching
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

      <SearchBar 
        className="mb-6" 
        placeholder="Search within this category..." 
        onSearch={(query) => {
          // Implement search functionality
          console.log("Searching:", query);
          handleSearch(query)
        }}
      />

      {isLoading ? (
        <p>Loading names...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {names.map((name) => (
              <NameCard key={name.id} {...name} />
            ))}
          </div>

          <div className="flex items-center justify-between mt-8">
            <span>Total names: {total}</span>
            <div className="flex items-center gap-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(page - 1)}
                      className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {getPaginationItems()}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(page + 1)}
                      className={page * limit >= total ? "pointer-events-none opacity-50" : ""}
                    />
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
        </>
      )}
    </div>
  );
};

export default CategoryNames;
