
import { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Church, Languages } from "lucide-react";
import { cn } from "@/lib/utils";

type CategoryType = "country" | "religion" | "language";

interface RegionalCategoriesProps {
  className?: string;
}

const RegionalCategories = ({ className }: RegionalCategoriesProps) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("country");

  // Mock data for categories - would come from API in a real implementation
  const categories = {
    country: [
      { id: "india", name: "Indian", count: 1250 },
      { id: "arabic", name: "Arabic", count: 980 },
      { id: "english", name: "English", count: 875 },
      { id: "hebrew", name: "Hebrew", count: 740 },
      { id: "greek", name: "Greek", count: 650 },
      { id: "latin", name: "Latin", count: 590 },
      { id: "french", name: "French", count: 520 },
      { id: "irish", name: "Irish", count: 450 },
    ],
    religion: [
      { id: "islam", name: "Islamic", count: 1450 },
      { id: "christianity", name: "Christian", count: 1320 },
      { id: "hinduism", name: "Hindu", count: 980 },
      { id: "judaism", name: "Jewish", count: 740 },
      { id: "buddhism", name: "Buddhist", count: 380 },
      { id: "sikhism", name: "Sikh", count: 290 },
    ],
    language: [
      { id: "arabic", name: "Arabic", count: 1150 },
      { id: "english", name: "English", count: 1080 },
      { id: "sanskrit", name: "Sanskrit", count: 920 },
      { id: "hebrew", name: "Hebrew", count: 780 },
      { id: "greek", name: "Greek", count: 650 },
      { id: "latin", name: "Latin", count: 580 },
      { id: "french", name: "French", count: 490 },
      { id: "spanish", name: "Spanish", count: 430 },
    ],
  };

  const categoryIcons = {
    country: <Globe className="h-5 w-5" />,
    religion: <Church className="h-5 w-5" />,
    language: <Languages className="h-5 w-5" />,
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-center mb-6 border-b">
        <button
          onClick={() => setActiveCategory("country")}
          className={`flex items-center px-4 py-3 border-b-2 ${
            activeCategory === "country"
              ? "border-primary text-primary font-medium"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Globe className="h-5 w-5 mr-2" />
          Country
        </button>
        <button
          onClick={() => setActiveCategory("religion")}
          className={`flex items-center px-4 py-3 border-b-2 ${
            activeCategory === "religion"
              ? "border-primary text-primary font-medium"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Church className="h-5 w-5 mr-2" />
          Religion
        </button>
        <button
          onClick={() => setActiveCategory("language")}
          className={`flex items-center px-4 py-3 border-b-2 ${
            activeCategory === "language"
              ? "border-primary text-primary font-medium"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Languages className="h-5 w-5 mr-2" />
          Language
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-fade-in">
        {categories[activeCategory].map((category) => (
          <Link
            key={category.id}
            to={`/${activeCategory}/${category.id}-names`}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 text-center group"
          >
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                {categoryIcons[activeCategory]}
              </div>
            </div>
            <h3 className="font-medium mb-1">{category.name} Names</h3>
            <p className="text-sm text-muted-foreground">{category.count} names</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RegionalCategories;
