
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUp, ArrowDown, Minus, Plus, ChevronDown, Filter, Search } from "lucide-react";

const TrendingNames = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const itemsPerPage = 8;

  // Mock data - expanded for more countries
  const mockTrendingNames = [
    { id: 1, name: "Liam", gender: "Boy", region: "United States", trend: 5, direction: "up", rank: 1 },
    { id: 2, name: "Olivia", gender: "Girl", region: "United States", trend: 3, direction: "up", rank: 1 },
    { id: 3, name: "Noah", gender: "Boy", region: "United States", trend: 0, direction: "steady", rank: 2 },
    { id: 4, name: "Emma", gender: "Girl", region: "United States", trend: -2, direction: "down", rank: 2 },
    { id: 5, name: "Oliver", gender: "Boy", region: "United Kingdom", trend: 4, direction: "up", rank: 1 },
    { id: 6, name: "Amelia", gender: "Girl", region: "United Kingdom", trend: 2, direction: "up", rank: 1 },
    { id: 7, name: "Thomas", gender: "Boy", region: "Australia", trend: 1, direction: "up", rank: 1 },
    { id: 8, name: "Charlotte", gender: "Girl", region: "Australia", trend: -1, direction: "down", rank: 1 },
    { id: 9, name: "Leo", gender: "Boy", region: "Germany", trend: 3, direction: "up", rank: 1 },
    { id: 10, name: "Sophia", gender: "Girl", region: "Germany", trend: 2, direction: "up", rank: 1 },
    { id: 11, name: "Mohammed", gender: "Boy", region: "United Arab Emirates", trend: 1, direction: "up", rank: 1 },
    { id: 12, name: "Fatima", gender: "Girl", region: "United Arab Emirates", trend: 0, direction: "steady", rank: 1 },
    { id: 13, name: "Santiago", gender: "Boy", region: "Spain", trend: 4, direction: "up", rank: 1 },
    { id: 14, name: "Lucia", gender: "Girl", region: "Spain", trend: 2, direction: "up", rank: 1 },
    { id: 15, name: "Takumi", gender: "Boy", region: "Japan", trend: 3, direction: "up", rank: 1 },
    { id: 16, name: "Hina", gender: "Girl", region: "Japan", trend: 1, direction: "up", rank: 1 },
    { id: 17, name: "Arjun", gender: "Boy", region: "India", trend: 5, direction: "up", rank: 1 },
    { id: 18, name: "Aanya", gender: "Girl", region: "India", trend: 3, direction: "up", rank: 1 },
    { id: 19, name: "Lucas", gender: "Boy", region: "Brazil", trend: 2, direction: "up", rank: 1 },
    { id: 20, name: "Maria", gender: "Girl", region: "Brazil", trend: 1, direction: "up", rank: 1 },
  ];

  // List of available regions - would be much longer in real app
  const regions = [
    { value: "all", label: "All Regions" },
    { value: "United States", label: "United States" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "Australia", label: "Australia" },
    { value: "Germany", label: "Germany" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "Spain", label: "Spain" },
    { value: "Japan", label: "Japan" },
    { value: "India", label: "India" },
    { value: "Brazil", label: "Brazil" },
    // Would have 200+ countries in real app
  ];

  // Filter the trending names
  const filteredNames = mockTrendingNames.filter((name) => {
    const matchesSearch = name.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "all" || name.region === selectedRegion;
    const matchesGender = selectedGender === "all" || name.gender.toLowerCase() === selectedGender.toLowerCase();
    
    return matchesSearch && matchesRegion && matchesGender;
  });

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNames.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNames.length / itemsPerPage);

  // Render trend indicator
  const renderTrendIndicator = (trend: number, direction: string) => {
    if (direction === "up") {
      return (
        <div className="flex items-center text-green-600">
          <ArrowUp className="h-4 w-4 mr-1" />
          <span>{trend}%</span>
        </div>
      );
    } else if (direction === "down") {
      return (
        <div className="flex items-center text-red-600">
          <ArrowDown className="h-4 w-4 mr-1" />
          <span>{Math.abs(trend)}%</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-gray-600">
          <Minus className="h-4 w-4 mr-1" />
          <span>0%</span>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trending Names</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Trending Name
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Trending Names Settings</CardTitle>
          <CardDescription>
            Configure settings for the trending names section
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="update-frequency">Data Update Frequency</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger id="update-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="display-count">Number of Names to Display</Label>
                <Input id="display-count" type="number" defaultValue={10} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="data-source">Data Source</Label>
              <Input id="data-source" defaultValue="National Records Department" />
            </div>
            <Button>Save Settings</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Trending Names</CardTitle>
          <CardDescription>
            Manage names shown in the trending section
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full sm:w-[250px]"
              />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by region" />
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Baby className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by gender" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="boy">Boy Names</SelectItem>
                  <SelectItem value="girl">Girl Names</SelectItem>
                  <SelectItem value="unisex">Unisex Names</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border rounded-md mb-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((name) => (
                    <TableRow key={name.id}>
                      <TableCell className="font-medium">{name.name}</TableCell>
                      <TableCell>{name.gender}</TableCell>
                      <TableCell>{name.region}</TableCell>
                      <TableCell>
                        {renderTrendIndicator(name.trend, name.direction)}
                      </TableCell>
                      <TableCell>#{name.rank}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No trending names found with the current filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
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
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendingNames;

function Globe(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function Baby(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M10 16c.5.3 1.5.5 2 .5s1.5-.2 2-.5" />
      <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
    </svg>
  );
}
