
import Header from "../../components/Header";
import { Button } from "@/components/ui/button";
import { Home, Database, FileText, HelpCircle, User, Settings } from "lucide-react";

interface AdminLayoutProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  children: React.ReactNode;
}

const AdminLayout = ({ selectedTab, setSelectedTab, children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 md:pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Sidebar */}
              <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Admin Panel</h2>
                  <p className="text-sm text-gray-500">Manage your content</p>
                </div>
                
                <nav className="p-2">
                  <ul className="space-y-1">
                    <li>
                      <Button 
                        variant={selectedTab === "dashboard" ? "secondary" : "ghost"} 
                        className="w-full justify-start"
                        onClick={() => setSelectedTab("dashboard")}
                      >
                        <Home className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant={selectedTab === "names" ? "secondary" : "ghost"} 
                        className="w-full justify-start"
                        onClick={() => setSelectedTab("names")}
                      >
                        <Database className="h-4 w-4 mr-2" />
                        Manage Names
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant={selectedTab === "content" ? "secondary" : "ghost"} 
                        className="w-full justify-start"
                        onClick={() => setSelectedTab("content")}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Page Content
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant={selectedTab === "faqs" ? "secondary" : "ghost"} 
                        className="w-full justify-start"
                        onClick={() => setSelectedTab("faqs")}
                      >
                        <HelpCircle className="h-4 w-4 mr-2" />
                        FAQs
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant={selectedTab === "users" ? "secondary" : "ghost"} 
                        className="w-full justify-start"
                        onClick={() => setSelectedTab("users")}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Users
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant={selectedTab === "settings" ? "secondary" : "ghost"} 
                        className="w-full justify-start"
                        onClick={() => setSelectedTab("settings")}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </li>
                  </ul>
                </nav>
              </div>
              
              {/* Main Content */}
              <div className="flex-1 p-6">
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
