
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Database, 
  Users, 
  Settings, 
  FileText, 
  HelpCircle,
  Globe,
  BookOpen,
  Heart,
  Calculator,
  Music,
  Star,
  TrendingUp
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Names</CardTitle>
            <CardDescription>All names in database</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,245</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Categories</CardTitle>
            <CardDescription>Origins, religions, etc.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">32</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Users</CardTitle>
            <CardDescription>Registered accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">87</p>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Button variant="outline" className="h-auto flex-col p-4 gap-2 hover:bg-primary/5" asChild>
          <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = "/admin?tab=names"; }}>
            <Database className="h-6 w-6 mb-1" />
            <span>Manage Names</span>
          </a>
        </Button>
        
        <Button variant="outline" className="h-auto flex-col p-4 gap-2 hover:bg-primary/5" asChild>
          <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = "/admin?tab=content"; }}>
            <FileText className="h-6 w-6 mb-1" />
            <span>Edit Content</span>
          </a>
        </Button>
        
        <Button variant="outline" className="h-auto flex-col p-4 gap-2 hover:bg-primary/5" asChild>
          <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = "/admin?tab=regional"; }}>
            <Globe className="h-6 w-6 mb-1" />
            <span>Categories</span>
          </a>
        </Button>
        
        <Button variant="outline" className="h-auto flex-col p-4 gap-2 hover:bg-primary/5" asChild>
          <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = "/admin?tab=stories"; }}>
            <BookOpen className="h-6 w-6 mb-1" />
            <span>Articles</span>
          </a>
        </Button>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <Card>
        <CardContent className="p-0">
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Added new name "Alexander"
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    admin@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Today, 10:45 AM
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Updated name "Emma"
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    admin@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Yesterday, 3:22 PM
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Added new FAQ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    admin@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Yesterday, 1:15 PM
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
