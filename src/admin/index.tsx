
import { useState } from "react";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import ManageNames from "./pages/ManageNames";
import PageContent from "./pages/PageContent";
import ManageFAQs from "./pages/ManageFAQs";
import UserManagement from "./pages/UserManagement";
import SiteSettings from "./pages/SiteSettings";
import RegionalCategories from "./pages/RegionalCategories";
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
    const searchProps = {
      searchQuery, 
      searchFilters,
    };

    switch (selectedTab) {
      case "dashboard":
        return <Dashboard />;
      case "names":
        return <ManageNames searchProps={searchProps} />;
      case "content":
        return <PageContent />;
      case "faqs":
        return <ManageFAQs />;
      case "users":
        return <UserManagement />;
      case "settings":
        return <SiteSettings />;
      case "regional":
        return <RegionalCategories searchProps={searchProps} />;
      default:
        return <Dashboard />;
    }
  };

  // Only show search in relevant sections
  const showSearch = ["names", "faqs", "regional"].includes(selectedTab);

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
      ) : null}
    >
      {renderContent()}
    </AdminLayout>
  );
};

export default Admin;
