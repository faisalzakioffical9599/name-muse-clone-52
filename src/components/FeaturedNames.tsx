
import { useState } from "react";
import NameCard from "./NameCard";

interface FeaturedNamesProps {
  title: string;
  subtitle?: string;
  type: "popular" | "trending" | "recent";
}

const FeaturedNames = ({ title, subtitle, type }: FeaturedNamesProps) => {
  // Mock data - would come from an API in a real implementation
  const mockNames = [
    {
      id: "1",
      name: "Aisha",
      meaning: "Alive, well-living, prosperous",
      gender: "girl" as const,
      origin: "Arabic",
      popularity: 87
    },
    {
      id: "2",
      name: "Noah",
      meaning: "Rest, comfort, peace",
      gender: "boy" as const,
      origin: "Hebrew",
      popularity: 92
    },
    {
      id: "3",
      name: "Sophia",
      meaning: "Wisdom",
      gender: "girl" as const,
      origin: "Greek",
      popularity: 95
    },
    {
      id: "4",
      name: "Elijah",
      meaning: "My God is Yahweh",
      gender: "boy" as const,
      origin: "Hebrew",
      popularity: 89
    }
  ];

  return (
    <section className="animate-fade-in">
      <div className="flex flex-col items-center text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-2">{title}</h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 staggered-fade-in">
        {mockNames.map((name) => (
          <NameCard key={name.id} {...name} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedNames;
