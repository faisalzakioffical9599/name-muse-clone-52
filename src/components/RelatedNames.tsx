
import React from "react";
import { Link } from "react-router-dom";

interface RelatedNamesProps {
  gender: "boy" | "girl";
  origin?: string;
  religion?: string;
  language?: string;
}

const RelatedNames = ({ gender, origin, religion, language }: RelatedNamesProps) => {
  // Mock data - would be replaced by API call to get related names
  const relatedNames = [
    { id: "r1", name: "Ahmad", gender: "boy" as const, origin: "Arabic", religion: "Islam" },
    { id: "r2", name: "Mohammed", gender: "boy" as const, origin: "Arabic", religion: "Islam" },
    { id: "r3", name: "Ali", gender: "boy" as const, origin: "Arabic", religion: "Islam" },
    { id: "r4", name: "Omar", gender: "boy" as const, origin: "Arabic", religion: "Islam" },
    { id: "r5", name: "Sarah", gender: "girl" as const, origin: "Hebrew", religion: "Judaism" },
    { id: "r6", name: "Aisha", gender: "girl" as const, origin: "Arabic", religion: "Islam" },
    { id: "r7", name: "Maria", gender: "girl" as const, origin: "Latin", religion: "Christianity" },
    { id: "r8", name: "Fatima", gender: "girl" as const, origin: "Arabic", religion: "Islam" },
  ];

  // Filter related names based on props
  const filteredNames = relatedNames.filter(name => {
    const genderMatch = name.gender === gender;
    const originMatch = !origin || name.origin === origin;
    const religionMatch = !religion || name.religion === religion;
    
    return genderMatch && (originMatch || religionMatch);
  }).slice(0, 5); // Limit to 5 names

  return (
    <div>
      {filteredNames.length > 0 ? (
        <ul className="space-y-2">
          {filteredNames.map((name) => (
            <li key={name.id}>
              <Link 
                to={`/name/${name.id}`}
                className={`flex items-center justify-between p-2 rounded-md 
                  ${gender === "boy" 
                    ? "hover:bg-blue-50 transition-colors" 
                    : "hover:bg-pink-50 transition-colors"}`}
              >
                <span className="font-medium text-gray-800">{name.name}</span>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <span>{name.origin}</span>
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
