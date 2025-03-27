
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

type PopularName = {
  id: string;
  name: string;
  gender: "boy" | "girl";
  meaning?: string;
  popularity?: number;
};

interface PopularNamesSidebarProps {
  className?: string;
}

const PopularNamesSidebar = ({ className = "" }: PopularNamesSidebarProps) => {
  // Mock data for popular names - would be replaced by API call
  const popularBoyNames: PopularName[] = [
    { id: "b1", name: "Noah", gender: "boy", popularity: 98 },
    { id: "b2", name: "Liam", gender: "boy", popularity: 96 },
    { id: "b3", name: "Oliver", gender: "boy", popularity: 94 },
    { id: "b4", name: "Elijah", gender: "boy", popularity: 92 },
    { id: "b5", name: "William", gender: "boy", popularity: 90 },
  ];

  const popularGirlNames: PopularName[] = [
    { id: "g1", name: "Olivia", gender: "girl", popularity: 98 },
    { id: "g2", name: "Emma", gender: "girl", popularity: 96 },
    { id: "g3", name: "Charlotte", gender: "girl", popularity: 94 },
    { id: "g4", name: "Amelia", gender: "girl", popularity: 92 },
    { id: "g5", name: "Sophia", gender: "girl", popularity: 90 },
  ];

  return (
    <aside className={`w-full md:w-64 lg:w-72 flex-shrink-0 ${className}`}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h3 className="text-lg font-semibold mb-4">Popular Names</h3>
        
        {/* Popular Boy Names */}
        <div className="mb-6">
          <h4 className="text-sm font-medium uppercase text-gray-500 mb-3 flex items-center">
            <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
            Boy Names
          </h4>
          <ul className="space-y-2">
            {popularBoyNames.map((name) => (
              <li key={name.id}>
                <Link 
                  to={`/name/${name.id}`}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <span className="font-medium text-gray-800">{name.name}</span>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-1">{name.popularity}</span>
                    <Heart size={12} className="text-blue-400" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link 
            to="/boy-names" 
            className="text-xs text-blue-600 hover:underline mt-2 inline-block"
          >
            View all boy names →
          </Link>
        </div>
        
        {/* Popular Girl Names */}
        <div>
          <h4 className="text-sm font-medium uppercase text-gray-500 mb-3 flex items-center">
            <span className="h-2 w-2 rounded-full bg-pink-500 mr-2"></span>
            Girl Names
          </h4>
          <ul className="space-y-2">
            {popularGirlNames.map((name) => (
              <li key={name.id}>
                <Link 
                  to={`/name/${name.id}`}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-pink-50 transition-colors"
                >
                  <span className="font-medium text-gray-800">{name.name}</span>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-1">{name.popularity}</span>
                    <Heart size={12} className="text-pink-400" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link 
            to="/girl-names" 
            className="text-xs text-pink-600 hover:underline mt-2 inline-block"
          >
            View all girl names →
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default PopularNamesSidebar;
