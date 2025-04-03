
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Home,
  Database,
  FileText,
  HelpCircle,
  User,
  Settings,
  Globe,
  BookOpen,
  Heart,
  Calculator,
  Music,
  BarChart,
  Star,
  Search,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface AdminLayoutProps {
  children: React.ReactNode;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  headerContent?: React.ReactNode;
  onLogout?: () => void;
}

const AdminLayout = ({ 
  children, 
  selectedTab, 
  setSelectedTab,
  headerContent,
  onLogout
}: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Close mobile sidebar when tab changes
    setIsMobileSidebarOpen(false);
  }, [selectedTab]);
  
  const handleLogout = () => {
    if (onLogout) {
      localStorage.removeItem("adminLoggedIn");
      toast({
        title: "Logged out",
        description: "You have been logged out of the admin panel",
      });
      onLogout();
    }
  };
  
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "names", label: "Manage Names", icon: Database },
    { id: "content", label: "Page Content", icon: FileText },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "users", label: "User Management", icon: User },
    { id: "settings", label: "Site Settings", icon: Settings },
    { id: "regional", label: "Regional Categories", icon: Globe },
    { id: "stories", label: "Name Articles", icon: BookOpen },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "combiner", label: "Name Combiner", icon: Calculator },
    { id: "compatibility", label: "Name Compatibility", icon: Star },
    { id: "pronunciation", label: "Pronunciation", icon: Music },
    { id: "trending", label: "Trending Names", icon: BarChart },
    { id: "birthcalc", label: "Birth Calculator", icon: Calculator },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-4 md:pt-6 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center justify-between mb-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            >
              {isMobileSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Mobile Sidebar */}
              <div 
                className={cn(
                  "fixed inset-0 z-50 bg-white/95 md:hidden transform transition-transform",
                  isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
              >
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Admin Menu</h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <ScrollArea className="h-[calc(100vh-64px)]">
                  <nav className="p-4">
                    <ul className="space-y-2">
                      {menuItems.map((item) => (
                        <li key={item.id}>
                          <Button 
                            variant={selectedTab === item.id ? "secondary" : "ghost"} 
                            className="w-full justify-start"
                            onClick={() => setSelectedTab(item.id)}
                          >
                            <item.icon className="h-4 w-4 mr-2" />
                            {item.label}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </ScrollArea>
              </div>
              
              {/* Desktop Sidebar */}
              <div className={cn(
                "hidden md:block transition-all duration-300 ease-in-out border-r border-gray-200",
                isSidebarOpen ? "w-64" : "w-20"
              )}>
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    {isSidebarOpen && <h2 className="text-lg font-semibold">Admin Panel</h2>}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                      className={isSidebarOpen ? "" : "mx-auto"}
                    >
                      {isSidebarOpen ? (
                        <X className="h-4 w-4" />
                      ) : (
                        <Menu className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <ScrollArea className="h-[calc(100vh-64px)]">
                  <nav className={cn("p-2", !isSidebarOpen && "py-4")}>
                    <ul className="space-y-1">
                      {menuItems.map((item) => (
                        <li key={item.id}>
                          <Button 
                            variant={selectedTab === item.id ? "secondary" : "ghost"} 
                            className={cn(
                              isSidebarOpen ? "w-full justify-start" : "w-full justify-center p-2 h-12",
                            )}
                            onClick={() => setSelectedTab(item.id)}
                            title={!isSidebarOpen ? item.label : undefined}
                          >
                            <item.icon className={cn("h-4 w-4", isSidebarOpen && "mr-2")} />
                            {isSidebarOpen && <span>{item.label}</span>}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </ScrollArea>
                
                {isSidebarOpen && (
                  <div className="p-4 border-t border-gray-200 mt-auto">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Main Content */}
              <div className={cn(
                "flex-1 p-6",
                !isSidebarOpen && "md:pl-4"
              )}>
                {/* Desktop header with search and actions */}
                <div className="hidden md:flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold">{menuItems.find(item => item.id === selectedTab)?.label || "Dashboard"}</h1>
                  
                  <div className="flex items-center gap-4">
                    {headerContent}
                    
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
                
                {/* Content */}
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
