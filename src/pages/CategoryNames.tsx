
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Globe, Church, Languages } from "lucide-react";
import Header from "../components/Header";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import NameCard from "../components/NameCard";
import SearchBar from "../components/SearchBar";
import PopularNamesSidebar from "../components/PopularNamesSidebar";

const CategoryNames = () => {
  const { categoryType, categoryId } = useParams();
  
  // Convert category ID to display name (e.g., "indian" to "Indian")
  const getCategoryDisplayName = () => {
    if (!categoryId) return "";
    return categoryId.replace(/-names$/, "").charAt(0).toUpperCase() + categoryId.replace(/-names$/, "").slice(1);
  };
  
  const getCategoryIcon = () => {
    switch(categoryType) {
      case "country":
        return <Globe className="h-6 w-6 mr-2 text-blue-500" />;
      case "religion":
        return <Church className="h-6 w-6 mr-2 text-blue-500" />;
      case "language":
        return <Languages className="h-6 w-6 mr-2 text-blue-500" />;
      default:
        return null;
    }
  };
  
  // Mock data for names in this category - would be replaced by API call
  const names = [
    {
      id: "n1",
      name: "Arjun",
      meaning: "Bright, shining, white",
      gender: "boy" as const,
      origin: "Indian",
      religion: "Hinduism",
      language: "Sanskrit"
    },
    {
      id: "n2",
      name: "Krishna",
      meaning: "Dark or black",
      gender: "boy" as const,
      origin: "Indian",
      religion: "Hinduism",
      language: "Sanskrit"
    },
    {
      id: "n3",
      name: "Aarav",
      meaning: "Peaceful",
      gender: "boy" as const,
      origin: "Indian",
      religion: "Hinduism",
      language: "Sanskrit"
    },
    {
      id: "n4",
      name: "Aditi",
      meaning: "Boundless, entire, unbroken",
      gender: "girl" as const,
      origin: "Indian",
      religion: "Hinduism",
      language: "Sanskrit"
    },
    {
      id: "n5",
      name: "Aanya",
      meaning: "Grace",
      gender: "girl" as const,
      origin: "Indian",
      religion: "Hinduism",
      language: "Sanskrit"
    },
    {
      id: "n6",
      name: "Ishaan",
      meaning: "Sun, protector",
      gender: "boy" as const,
      origin: "Indian",
      religion: "Hinduism",
      language: "Sanskrit"
    },
    {
      id: "n7",
      name: "Diya",
      meaning: "Light, lamp",
      gender: "girl" as const,
      origin: "Indian",
      religion: "Hinduism",
      language: "Sanskrit"
    },
    {
      id: "n8",
      name: "Rishi",
      meaning: "Sage, seer",
      gender: "boy" as const,
      origin: "Indian",
      religion: "Hinduism",
      language: "Sanskrit"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 md:pt-32 pb-16 md:pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/${categoryType}/all`}>{categoryType?.charAt(0).toUpperCase() + categoryType?.slice(1)}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{getCategoryDisplayName()} Names</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Page Header */}
              <div className="text-center mb-8 animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 flex items-center justify-center">
                  {getCategoryIcon()}
                  {getCategoryDisplayName()} Names
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Find beautiful and meaningful {getCategoryDisplayName()} baby names for boys and girls
                </p>
              </div>
              
              {/* Search Bar */}
              <SearchBar className="mb-12" placeholder={`Search for ${getCategoryDisplayName()} names...`} />
              
              {/* Gender Filter Pills */}
              <div className="flex justify-center mb-8">
                <div className="flex space-x-2">
                  <Link 
                    to="#" 
                    className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition-colors"
                  >
                    All Names
                  </Link>
                  <Link 
                    to="#" 
                    className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    Boy Names
                  </Link>
                  <Link 
                    to="#" 
                    className="px-4 py-2 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors"
                  >
                    Girl Names
                  </Link>
                </div>
              </div>
              
              {/* Names Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 animate-fade-in">
                {names.map((name) => (
                  <NameCard key={name.id} {...name} />
                ))}
              </div>
              
              {/* Additional SEO Content */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">About {getCategoryDisplayName()} Names</h2>
                <p className="text-gray-700 mb-4">
                  {getCategoryDisplayName()} names have a rich heritage and tradition. These names often reflect cultural values, religious beliefs, and linguistic patterns unique to the region. Many parents choose {getCategoryDisplayName()} names to honor their heritage or appreciate the beautiful meanings these names carry.
                </p>
                <p className="text-gray-700">
                  Whether you're looking for a traditional or modern {getCategoryDisplayName()} name, our collection offers a variety of options with detailed meanings and origins. Browse through our selection to find the perfect name that resonates with your cultural preferences and personal style.
                </p>
              </div>
            </div>
            
            {/* Sidebar */}
            <PopularNamesSidebar className="hidden lg:block" />
          </div>
        </div>
      </main>
      
      {/* Simplified Footer */}
      <footer className="py-8 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NameMuse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CategoryNames;
