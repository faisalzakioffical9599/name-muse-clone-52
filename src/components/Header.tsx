
import { useState, useEffect, ReactNode } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Menu, 
  X, 
  Heart, 
  Baby, 
  Book, 
  Sparkles, 
  User, 
  Settings, 
  Star, 
  Music, 
  Globe, 
  Calculator, 
  BarChart,
  ChevronDown,
  Newspaper,
  PenTool,
  GraduationCap
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ListItem = ({
    className,
    title,
    href,
    children,
    icon: Icon
  }: {
    className?: string
    title: string
    href: string
    children?: React.ReactNode
    icon?: any
  }) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            to={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
          >
            <div className="flex items-center gap-1 text-sm font-medium leading-none">
              {Icon && <Icon className="h-4 w-4" />}
              <span>{title}</span>
            </div>
            {children && <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{children}</p>}
          </Link>
        </NavigationMenuLink>
      </li>
    );
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 bg-white/90 backdrop-blur-md shadow-sm"
          : "py-3 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-semibold tracking-tight text-primary"
          >
            <span className="animate-fade-in">NameMuse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Baby Names Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Names</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem 
                        href="/boy-names" 
                        title="Boy Names"
                        icon={Baby}
                      />
                      <ListItem 
                        href="/girl-names" 
                        title="Girl Names"
                        icon={Baby}
                      />
                      <ListItem 
                        href="/unique-names" 
                        title="Unique Names"
                        icon={Sparkles}
                      />
                      <ListItem 
                        href="/unisex-names" 
                        title="Unisex Names"
                        icon={Star}
                      />
                      <ListItem 
                        href="/all-names" 
                        title="Browse All Names"
                        icon={Book}
                      />
                      <ListItem 
                        href="/name-meanings" 
                        title="Name Meanings"
                        icon={Book}
                      />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                {/* Categories Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem 
                        href="/country/all" 
                        title="By Country"
                        icon={Globe}
                        children="Explore names by their country of origin"
                      />
                      <ListItem 
                        href="/religion/all" 
                        title="By Religion"
                        icon={Book}
                        children="Discover names associated with different religions"
                      />
                      <ListItem 
                        href="/language/all" 
                        title="By Language"
                        icon={GraduationCap}
                        children="Browse names from various language roots"
                      />
                      <ListItem 
                        href="/trending-names" 
                        title="Trending Names"
                        icon={BarChart}
                        children="Popular and trending baby names by region"
                      />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                {/* Tools Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem 
                        href="/baby-name-matcher" 
                        title="Name Matcher"
                        icon={Baby}
                        children="Find the perfect baby name that matches your preferences"
                      />
                      <ListItem 
                        href="/name-combiner" 
                        title="Name Combiner"
                        icon={Calculator}
                        children="Combine parents' names to create unique baby names"
                      />
                      <ListItem 
                        href="/name-compatibility" 
                        title="Name Compatibility"
                        icon={Star}
                        children="Check compatibility between sibling names"
                      />
                      <ListItem 
                        href="/name-pronunciation" 
                        title="Pronunciation Guide"
                        icon={Music}
                        children="Learn how to pronounce names correctly"
                      />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                {/* Explore Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem 
                        href="/articles" 
                        title="Articles"
                        icon={Newspaper}
                        children="Read informative articles about naming traditions"
                      />
                      <ListItem 
                        href="/famous-personalities" 
                        title="Famous Names"
                        icon={User}
                        children="Discover names of famous personalities"
                      />
                      <ListItem 
                        href="/name-stories" 
                        title="Name Stories"
                        icon={Book}
                        children="Read the stories behind different names"
                      />
                      <ListItem 
                        href="/birth-calculator" 
                        title="Birth Calculator"
                        icon={Calculator}
                        children="Get name suggestions based on birth date"
                      />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                {/* Favorites */}
                <NavigationMenuItem>
                  <Link to="/name-favorites" className={navigationMenuTriggerStyle()}>
                    <Heart className="h-4 w-4 mr-1" /> Favorites
                  </Link>
                </NavigationMenuItem>
                
                {/* Search */}
                <NavigationMenuItem>
                  <Link to="/search" className={navigationMenuTriggerStyle()}>
                    <Search className="h-4 w-4 mr-1" /> Search
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Render children if they exist */}
            {children}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {children}
            <button 
              className="text-gray-700 hover:text-primary transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md py-4 animate-fade-in">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-1">
              <div className="border-b border-gray-100 pb-2 mb-2">
                <div className="font-medium text-sm px-2 py-1 text-gray-500">Names</div>
                <Link 
                  to="/boy-names" 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Boy Names
                </Link>
                <Link 
                  to="/girl-names" 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Girl Names
                </Link>
                <Link 
                  to="/unique-names" 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Sparkles size={14} className="mr-1" /> Unique Names
                </Link>
                <Link 
                  to="/all-names" 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Book size={14} className="mr-1" /> All Names
                </Link>
              </div>
              
              <div className="border-b border-gray-100 pb-2 mb-2">
                <div className="font-medium text-sm px-2 py-1 text-gray-500">Categories</div>
                <Link 
                  to="/country/all" 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Globe size={14} className="mr-1" /> By Country
                </Link>
                <Link 
                  to="/religion/all" 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Book size={14} className="mr-1" /> By Religion
                </Link>
                <Link 
                  to="/language/all" 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <GraduationCap size={14} className="mr-1" /> By Language
                </Link>
                <Link 
                  to="/trending-names" 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart size={14} className="mr-1" /> Trending Names
                </Link>
              </div>
              
              <div className="border-b border-gray-100 pb-2 mb-2">
                <div className="font-medium text-sm px-2 py-1 text-gray-500">Tools</div>
                <Link 
                  to="/baby-name-matcher" 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Baby size={14} className="mr-1" /> Name Matcher
                </Link>
                <Link 
                  to="/name-combiner" 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calculator size={14} className="mr-1" /> Name Combiner
                </Link>
                <Link 
                  to="/name-compatibility" 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Star size={14} className="mr-1" /> Name Compatibility
                </Link>
                <Link 
                  to="/name-pronunciation" 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Music size={14} className="mr-1" /> Pronunciation Guide
                </Link>
              </div>
              
              <div className="border-b border-gray-100 pb-2 mb-2">
                <div className="font-medium text-sm px-2 py-1 text-gray-500">Explore</div>
                <Link 
                  to="/articles" 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Newspaper size={14} className="mr-1" /> Articles
                </Link>
                <Link 
                  to="/famous-personalities" 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={14} className="mr-1" /> Famous Names
                </Link>
                <Link 
                  to="/name-stories" 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Book size={14} className="mr-1" /> Name Stories
                </Link>
                <Link 
                  to="/birth-calculator" 
                  className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calculator size={14} className="mr-1" /> Birth Calculator
                </Link>
              </div>
              
              <Link 
                to="/name-favorites" 
                className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart size={14} className="mr-1" /> Favorites
              </Link>
              
              <Link 
                to="/search" 
                className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search size={14} className="mr-1" /> Search
              </Link>
              
              <Link 
                to="/admin" 
                className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 px-4 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings size={14} className="mr-1" /> Admin Panel
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
