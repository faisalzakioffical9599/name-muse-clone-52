
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Trash, PenSquare, Search, FolderPlus, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FavoriteName {
  id: string;
  name: string;
  gender: "boy" | "girl" | "unisex";
  origin: string;
  meaning: string;
  listId: string;
}

interface FavoriteList {
  id: string;
  name: string;
  description: string;
  count: number;
}

const NameFavorites = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeList, setActiveList] = useState<string>("all");
  const [lists, setLists] = useState<FavoriteList[]>([
    { id: "all", name: "All Favorites", description: "All your saved names", count: 5 },
    { id: "list1", name: "First Baby", description: "Names we love for our first child", count: 3 },
    { id: "list2", name: "Twin Names", description: "Complementary names for twins", count: 2 }
  ]);
  
  // Mock data - in a real app, this would be fetched from an API/localStorage
  const [favorites, setFavorites] = useState<FavoriteName[]>([
    { id: "1", name: "Olivia", gender: "girl", origin: "Latin", meaning: "Olive tree", listId: "list1" },
    { id: "2", name: "Ethan", gender: "boy", origin: "Hebrew", meaning: "Strong, firm", listId: "list1" },
    { id: "3", name: "Sophia", gender: "girl", origin: "Greek", meaning: "Wisdom", listId: "list1" },
    { id: "4", name: "Aiden", gender: "boy", origin: "Irish", meaning: "Little fire", listId: "list2" },
    { id: "5", name: "Ava", gender: "girl", origin: "Latin", meaning: "Life", listId: "list2" },
  ]);

  // Filtered favorites based on active list and search query
  const filteredFavorites = favorites.filter(fav => 
    (activeList === "all" || fav.listId === activeList) && 
    fav.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
    
    // Update list counts
    const removedFav = favorites.find(fav => fav.id === id);
    if (removedFav) {
      setLists(lists.map(list => 
        list.id === removedFav.listId || list.id === "all"
          ? { ...list, count: list.count - 1 }
          : list
      ));
    }
    
    toast({
      title: "Removed from favorites",
      description: "The name has been removed from your favorites list.",
    });
  };

  const createNewList = () => {
    // In a real app, this would open a modal for the user to enter list details
    const newList: FavoriteList = {
      id: `list${lists.length}`,
      name: `New List ${lists.length}`,
      description: "Your new collection",
      count: 0
    };
    
    setLists([...lists, newList]);
    setActiveList(newList.id);
    
    toast({
      title: "New list created",
      description: `${newList.name} has been created.`,
    });
  };

  const shareList = () => {
    // In a real app, this would generate a shareable link
    toast({
      title: "List shared",
      description: "A shareable link has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">My Favorite Names</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Keep track of names you love and organize them into custom lists for your future little ones.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Lists */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>My Lists</span>
                    <Button variant="ghost" size="icon" onClick={createNewList}>
                      <FolderPlus className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {lists.map(list => (
                    <button
                      key={list.id}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeList === list.id 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveList(list.id)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{list.name}</span>
                        <Badge variant={activeList === list.id ? "outline" : "secondary"}>
                          {list.count}
                        </Badge>
                      </div>
                      {list.description && (
                        <p className={`text-xs mt-1 ${
                          activeList === list.id ? "text-primary-foreground/70" : "text-gray-500"
                        }`}>
                          {list.description}
                        </p>
                      )}
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content - Favorites */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <CardTitle>
                      {lists.find(list => list.id === activeList)?.name || "Favorites"}
                    </CardTitle>
                    <div className="flex gap-2">
                      <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input 
                          placeholder="Search favorites..." 
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" onClick={shareList}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    {activeList !== "all" 
                      ? lists.find(list => list.id === activeList)?.description 
                      : "All your favorite names in one place"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredFavorites.length > 0 ? (
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="mb-4 grid w-full grid-cols-3">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="boy">Boy Names</TabsTrigger>
                        <TabsTrigger value="girl">Girl Names</TabsTrigger>
                      </TabsList>
                      
                      {["all", "boy", "girl"].map(tabValue => (
                        <TabsContent key={tabValue} value={tabValue} className="mt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredFavorites
                              .filter(fav => tabValue === "all" || fav.gender === tabValue)
                              .map(favorite => (
                                <div 
                                  key={favorite.id}
                                  className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                                >
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="text-lg font-semibold flex items-center">
                                        {favorite.name}
                                        <Badge 
                                          variant="outline" 
                                          className={`ml-2 ${
                                            favorite.gender === "boy" ? "text-blue-600" : 
                                            favorite.gender === "girl" ? "text-pink-600" : 
                                            "text-purple-600"
                                          }`}
                                        >
                                          {favorite.gender}
                                        </Badge>
                                      </h3>
                                      <p className="text-sm text-gray-500 mt-1">{favorite.origin}</p>
                                      <p className="mt-2">{favorite.meaning}</p>
                                    </div>
                                    <div className="flex space-x-1">
                                      <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={() => removeFavorite(favorite.id)}
                                      >
                                        <Trash className="h-4 w-4 text-gray-500 hover:text-red-500" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-700">No favorites found</h3>
                      <p className="text-gray-500 mt-1">
                        {searchQuery 
                          ? "Try a different search term" 
                          : "Start adding names to your favorites list"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameFavorites;
