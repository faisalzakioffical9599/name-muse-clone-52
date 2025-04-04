
import { useState, useEffect } from "react";
import AdminLayout from "./components/AdminLayout";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
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
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { api } from "./services/api";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(() => {
    const tabFromUrl = searchParams.get("tab");
    return tabFromUrl || "dashboard";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<FilterOptions>({});
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check login status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.auth.checkToken();
        setIsLoggedIn(response?.isAuthenticated || false);
      } catch (error) {
        console.error("Auth check failed", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Update URL when tab changes
  useEffect(() => {
    if (isLoggedIn) {
      setSearchParams({ tab: selectedTab });
    }
  }, [selectedTab, setSearchParams, isLoggedIn]);

  // Set the tab from URL on initial load
  useEffect(() => {
    if (isLoggedIn && location.search) {
      const params = new URLSearchParams(location.search);
      const tab = params.get("tab");
      if (tab) {
        setSelectedTab(tab);
      } else {
        // If no tab parameter, set the default and update URL
        navigate({ search: "?tab=dashboard" });
      }
    }
  }, [location.search, isLoggedIn, navigate]);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate({ search: "?tab=dashboard" });
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await api.auth.logout();
      setIsLoggedIn(false);
      navigate("/admin");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchTerm: string, filters: FilterOptions) => {
    setSearchQuery(searchTerm);
    setSearchFilters(filters);
    console.log("Admin search:", searchTerm, filters);
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
        return <AdminDashboard />;
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
        return <AdminDashboard />;
    }
  };

  // Only show search in relevant sections
  const showSearch = ["names", "faqs", "regional", "stories", "trending"].includes(selectedTab);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <AdminLayout 
      selectedTab={selectedTab} 
      setSelectedTab={handleTabChange}
      onLogout={handleLogout}
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
