
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

const SearchBar = ({ className, placeholder = "Search names..." }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search logic would be implemented here
    console.log("Searching for:", searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pr-12"
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-0 top-0 h-full rounded-l-none"
        aria-label="Search"
      >
        <Search size={18} />
      </Button>
    </form>
  );
};

export default SearchBar;
