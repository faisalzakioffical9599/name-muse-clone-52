
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { clientApi } from "../services/clientApi";

interface RelatedNamesProps {
  gender: "boy" | "girl";
  origin?: string;
  religion?: string;
  language?: string;
  nameId?: string; // To exclude current name from results
}

interface RelatedName {
  id: string;
  name: string;
  gender: "boy" | "girl" | "unisex";
  origin?: string;
  religion?: string;
  language?: string;
}

const RelatedNames = ({ gender, origin, religion, language, nameId }: RelatedNamesProps) => {
  const [relatedNames, setRelatedNames] = useState<RelatedName[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedNames = async () => {
      setLoading(true);

      try {
        // Prepare query parameters
        const params: Record<string, any> = { 
          limit: "5",
          gender
        };

        // Add other parameters if available
        if (origin) params.origin = origin;
        if (religion) params.religion = religion;
        if (language) params.language = language;
        
        // Fetch related names from API
        const response = await clientApi.names.getAll(params);
        
        if (response && response.success && response.data) {
          // Filter out the current name if nameId is provided
          const filteredNames = nameId 
            ? response.data.filter((name: any) => String(name.id) !== nameId).slice(0, 5)
            : response.data.slice(0, 5);
            
          setRelatedNames(filteredNames.map((name: any) => ({
            id: String(name.id),
            name: name.name,
            gender: name.gender as "boy" | "girl" | "unisex",
            origin: name.origin,
            religion: name.religion,
            language: name.language
          })));
        }
      } catch (error) {
        console.error("Failed to fetch related names:", error);
        // Use fallback data for demo purposes
        setRelatedNames(getMockRelatedNames(gender, origin, religion));
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedNames();
  }, [gender, origin, religion, language, nameId]);

  // Mock data function for fallback
  const getMockRelatedNames = (
    gender: "boy" | "girl", 
    origin?: string, 
    religion?: string
  ): RelatedName[] => {
    const boyNames = [
      { id: "r1", name: "Ahmad", gender: "boy" as const, origin: "Arabic", religion: "Islam" },
      { id: "r2", name: "Mohammed", gender: "boy" as const, origin: "Arabic", religion: "Islam" },
      { id: "r3", name: "Ali", gender: "boy" as const, origin: "Arabic", religion: "Islam" },
      { id: "r4", name: "Omar", gender: "boy" as const, origin: "Arabic", religion: "Islam" },
      { id: "r5", name: "Noah", gender: "boy" as const, origin: "Hebrew", religion: "Judaism" },
      { id: "r6", name: "Ethan", gender: "boy" as const, origin: "Hebrew", religion: "Judaism" },
      { id: "r7", name: "Michael", gender: "boy" as const, origin: "Hebrew", religion: "Christianity" },
      { id: "r8", name: "John", gender: "boy" as const, origin: "Hebrew", religion: "Christianity" },
      { id: "r9", name: "William", gender: "boy" as const, origin: "Germanic", religion: "Christianity" },
      { id: "r10", name: "James", gender: "boy" as const, origin: "Hebrew", religion: "Christianity" },
    ];
    
    const girlNames = [
      { id: "r11", name: "Sarah", gender: "girl" as const, origin: "Hebrew", religion: "Judaism" },
      { id: "r12", name: "Aisha", gender: "girl" as const, origin: "Arabic", religion: "Islam" },
      { id: "r13", name: "Maria", gender: "girl" as const, origin: "Latin", religion: "Christianity" },
      { id: "r14", name: "Fatima", gender: "girl" as const, origin: "Arabic", religion: "Islam" },
      { id: "r15", name: "Emma", gender: "girl" as const, origin: "Germanic", religion: "Christianity" },
      { id: "r16", name: "Olivia", gender: "girl" as const, origin: "Latin", religion: "Christianity" },
      { id: "r17", name: "Sophia", gender: "girl" as const, origin: "Greek", religion: "Christianity" },
      { id: "r18", name: "Isabella", gender: "girl" as const, origin: "Italian", religion: "Christianity" },
      { id: "r19", name: "Charlotte", gender: "girl" as const, origin: "French", religion: "Christianity" },
      { id: "r20", name: "Amelia", gender: "girl" as const, origin: "Germanic", religion: "Christianity" },
    ];
    
    // Start with gender filter
    const namesByGender = gender === "boy" ? boyNames : girlNames;
    
    // Then filter by origin and/or religion if provided
    return namesByGender.filter(name => {
      const originMatch = !origin || name.origin === origin;
      const religionMatch = !religion || name.religion === religion;
      return originMatch && religionMatch;
    }).slice(0, 5); // Limit to 5 names
  };

  const getHighlightColor = () => {
    return gender === "boy" ? "hover:bg-blue-50" : "hover:bg-pink-50";
  };

  return (
    <div>
      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-9 bg-gray-100 animate-pulse rounded-md"></div>
          ))}
        </div>
      ) : relatedNames.length > 0 ? (
        <ul className="space-y-2">
          {relatedNames.map((name) => (
            <li key={name.id}>
              <Link 
                to={`/name/${name.id}`}
                className={`flex items-center justify-between p-2 rounded-md transition-colors ${getHighlightColor()}`}
              >
                <span className="font-medium text-gray-800">{name.name}</span>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  {name.origin && <span>{name.origin}</span>}
                  {name.origin && name.religion && <span>·</span>}
                  {name.religion && <span>{name.religion}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No related names found.</p>
      )}
      
      <div className="mt-3 pt-3 border-t">
        <Link 
          to={`/${gender}-names`}
          className={`text-xs ${gender === "boy" ? "text-blue-600" : "text-pink-600"} hover:underline`}
        >
          View all {gender} names →
        </Link>
      </div>
    </div>
  );
};

export default RelatedNames;
