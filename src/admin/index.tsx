
import { useState } from "react";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import ManageNames from "./pages/ManageNames";
import PageContent from "./pages/PageContent";
import ManageFAQs from "./pages/ManageFAQs";
import UserManagement from "./pages/UserManagement";
import SiteSettings from "./pages/SiteSettings";
import RegionalCategories from "./pages/RegionalCategories";

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const renderContent = () => {
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
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout 
      selectedTab={selectedTab} 
      setSelectedTab={setSelectedTab}
    >
      {renderContent()}
    </AdminLayout>
  );
};

export default Admin;
