
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const AdminLink = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const checkLogin = () => {
      const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
      setIsLoggedIn(adminLoggedIn);
    };
    
    checkLogin();
    window.addEventListener("storage", checkLogin);
    
    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  return (
    <Link to="/admin">
      <Button 
        variant={isLoggedIn ? "default" : "outline"} 
        size="sm" 
        className="gap-2"
      >
        <Shield className="h-4 w-4" />
        {isLoggedIn ? "Admin Panel" : "Admin Login"}
      </Button>
    </Link>
  );
};

export default AdminLink;
