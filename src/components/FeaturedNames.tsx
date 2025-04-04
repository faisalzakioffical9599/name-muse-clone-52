
import { useState, useEffect } from "react";
import NameCard from "./NameCard";
import { clientApi } from "../services/clientApi";

interface FeaturedNamesProps {
  title: string;
  subtitle?: string;
  type: "popular" | "trending" | "recent";
  limit?: number;
}

interface Name {
  id: string | number;
  name: string;
  meaning: string;
  gender: "boy" | "girl" | "unisex";
  origin: string;
  popularity?: number;
}

const FeaturedNames = ({ title, subtitle, type, limit = 4 }: FeaturedNamesProps) => {
  const [names, setNames] = useState<Name[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNames = async () => {
      setIsLoading(true);
      try {
        let response;
        
        switch (type) {
          case "popular":
            response = await clientApi.names.getAllNames({ 
              sortBy: 'popularity-desc',
              limit
            });
            break;
          case "trending":
            response = await clientApi.names.getTrendingNames(limit);
            break;
          case "recent":
            response = await clientApi.names.getAllNames({ 
              sortBy: 'id-desc', // Assuming newest IDs are the most recent
              limit
            });
            break;
        }
        
        if (response && response.data) {
          // Map the API data to our Name interface
          const formattedNames = response.data.map(item => ({
            id: item.id,
            name: item.name,
            meaning: item.meaning,
            gender: item.gender as "boy" | "girl" | "unisex",
            origin: item.origin,
            popularity: item.popularity
          }));
          
          setNames(formattedNames);
        }
      } catch (error) {
        console.error("Error fetching featured names:", error);
        // Fallback to mock data if API fails
        setNames([
          {
            id: "1",
            name: "Aisha",
            meaning: "Alive, well-living, prosperous",
            gender: "girl",
            origin: "Arabic",
            popularity: 87
          },
          {
            id: "2",
            name: "Noah",
            meaning: "Rest, comfort, peace",
            gender: "boy",
            origin: "Hebrew",
            popularity: 92
          },
          {
            id: "3",
            name: "Sophia",
            meaning: "Wisdom",
            gender: "girl",
            origin: "Greek",
            popularity: 95
          },
          {
            id: "4",
            name: "Elijah",
            meaning: "My God is Yahweh",
            gender: "boy",
            origin: "Hebrew",
            popularity: 89
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNames();
  }, [type, limit]);

  return (
    <section className="animate-fade-in">
      <div className="flex flex-col items-center text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-2">{title}</h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-md"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 staggered-fade-in">
          {names.map((name) => (
            <NameCard key={name.id} {...name} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedNames;
