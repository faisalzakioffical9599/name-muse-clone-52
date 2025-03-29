
import { useState } from "react";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import ManageNames from "./pages/ManageNames";
import PageContent from "./pages/PageContent";
import ManageFAQs from "./pages/ManageFAQs";
import UserManagement from "./pages/UserManagement";
import SiteSettings from "./pages/SiteSettings";
import RegionalCategories from "./pages/RegionalCategories";
import NameStories, { SearchProps } from "./pages/NameStories";
import NameFavorites from "./pages/NameFavorites";
import NameCombiner from "./pages/NameCombiner";
import NameCompatibility from "./pages/NameCompatibility";
import NamePronunciation from "./pages/NamePronunciation";
import TrendingNames from "./pages/TrendingNames";
import BirthCalculator from "./pages/BirthCalculator";
import SearchBar from "../components/SearchBar";
import { FilterOptions } from "../components/SearchFilter";

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<FilterOptions>({});

  const handleSearch = (searchTerm: string, filters: FilterOptions) => {
    setSearchQuery(searchTerm);
    setSearchFilters(filters);
    console.log("Admin search:", searchTerm, filters);
    // This could be passed to the active component
  };

  const renderContent = () => {
    // For simplicity, we'll pass search props to each component
    // In a real app, we might use context or other state management
    const searchProps: SearchProps = {
      searchQuery, 
      searchFilters,
    };

    switch (selectedTab) {
      case "dashboard":
        return <Dashboard />;
      case "names":
        return <ManageNames />;
      case "content":
        return <PageContent />;
      case "faqs":
        return <ManageFAQs />;
      case "users":
        return <UserManagement />;
      case "settings":
        return <SiteSettings />;
      case "regional":
        return <RegionalCategories />;
      case "stories":
        return <NameStories searchProps={searchProps} />;
      case "favorites":
        return <NameFavorites />;
      case "combiner":
        return <NameCombiner />;
      case "compatibility":
        return <NameCompatibility />;
      case "pronunciation":
        return <NamePronunciation />;
      case "trending":
        return <TrendingNames />;
      case "birthcalc":
        return <BirthCalculator />;
      default:
        return <Dashboard />;
    }
  };

  // Only show search in relevant sections
  const showSearch = ["names", "faqs", "regional", "stories", "trending"].includes(selectedTab);

  return (
    <AdminLayout 
      selectedTab={selectedTab} 
      setSelectedTab={setSelectedTab}
      headerContent={showSearch ? (
        <div className="w-full max-w-md">
          <SearchBar 
            placeholder={`Search ${selectedTab}...`}
            onSearch={handleSearch}
          />
        </div>
      ) : undefined}
    >
      {renderContent()}
    </AdminLayout>
  );
};

export default Admin;
