
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Baby, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface EnhancedSidebarProps {
  className?: string;
}

const EnhancedSidebar = ({ className }: EnhancedSidebarProps) => {
  // Mock data for popular boy names
  const popularBoyNames = [
    { id: 'b1', name: 'Liam', popularity: 98 },
    { id: 'b2', name: 'Noah', popularity: 96 },
    { id: 'b3', name: 'Oliver', popularity: 94 },
    { id: 'b4', name: 'Elijah', popularity: 92 },
    { id: 'b5', name: 'William', popularity: 90 },
  ];

  // Mock data for popular girl names
  const popularGirlNames = [
    { id: 'g1', name: 'Olivia', popularity: 99 },
    { id: 'g2', name: 'Emma', popularity: 97 },
    { id: 'g3', name: 'Charlotte', popularity: 95 },
    { id: 'g4', name: 'Amelia', popularity: 93 },
    { id: 'g5', name: 'Sophia', popularity: 91 },
  ];

  // Mock data for best twin names
  const bestTwinNames = [
    { id: 't1', name1: 'Jack', name2: 'Jill' },
    { id: 't2', name1: 'Luke', name2: 'Leia' },
    { id: 't3', name1: 'Emma', name2: 'Ethan' },
  ];

  // Mock data for best parent match names
  const bestParentMatchNames = [
    { id: 'p1', parent1: 'John', parent2: 'Mary', childName: 'Jordan' },
    { id: 'p2', parent1: 'David', parent2: 'Sarah', childName: 'Daisy' },
    { id: 'p3', parent1: 'Michael', parent2: 'Elizabeth', childName: 'Mason' },
  ];

  return (
    <aside className={cn("w-full lg:w-72 space-y-6", className)}>
      {/* Popular Boy Names */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Star className="h-4 w-4 text-blue-500 mr-2" /> 
            Popular Boy Names
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2 text-sm">
            {popularBoyNames.map((name) => (
              <li key={name.id} className="flex justify-between items-center">
                <Link to={`/name/${name.name.toLowerCase()}`} className="hover:text-primary transition-colors">
                  {name.name}
                </Link>
                <Badge variant="outline" className="text-xs">
                  {name.popularity}%
                </Badge>
              </li>
            ))}
          </ul>
          <Link 
            to="/boy-names" 
            className="mt-4 text-xs text-primary hover:underline inline-flex items-center"
          >
            View all boy names
            <ChevronRight className="h-3 w-3 ml-1" />
          </Link>
        </CardContent>
      </Card>

      {/* Popular Girl Names */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Star className="h-4 w-4 text-pink-500 mr-2" /> 
            Popular Girl Names
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2 text-sm">
            {popularGirlNames.map((name) => (
              <li key={name.id} className="flex justify-between items-center">
                <Link to={`/name/${name.name.toLowerCase()}`} className="hover:text-primary transition-colors">
                  {name.name}
                </Link>
                <Badge variant="outline" className="text-xs">
                  {name.popularity}%
                </Badge>
              </li>
            ))}
          </ul>
          <Link 
            to="/girl-names" 
            className="mt-4 text-xs text-primary hover:underline inline-flex items-center"
          >
            View all girl names
            <ChevronRight className="h-3 w-3 ml-1" />
          </Link>
        </CardContent>
      </Card>

      {/* Best Twin Names */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Baby className="h-4 w-4 text-violet-500 mr-2" /> 
            Best Twin Names
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2 text-sm">
            {bestTwinNames.map((pair) => (
              <li key={pair.id} className="flex items-center">
                <div className="flex-1 flex justify-between">
                  <span>{pair.name1}</span>
                  <span className="text-gray-400">&</span>
                  <span>{pair.name2}</span>
                </div>
                <Heart className="h-3 w-3 text-red-400 ml-2" />
              </li>
            ))}
          </ul>
          <Link 
            to="/name-compatibility" 
            className="mt-4 text-xs text-primary hover:underline inline-flex items-center"
          >
            Find compatible names
            <ChevronRight className="h-3 w-3 ml-1" />
          </Link>
        </CardContent>
      </Card>

      {/* Best Parent Match Names */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Star className="h-4 w-4 text-amber-500 mr-2" /> 
            Parent Name Matches
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-3 text-sm">
            {bestParentMatchNames.map((match) => (
              <li key={match.id} className="space-y-1">
                <div className="text-xs text-gray-500 flex">
                  <span className="mr-1">{match.parent1}</span>
                  <span className="mx-1">+</span>
                  <span>{match.parent2}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">{match.childName}</span>
                  <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-200 text-xs">Perfect Match</Badge>
                </div>
              </li>
            ))}
          </ul>
          <Link 
            to="/name-combiner" 
            className="mt-4 text-xs text-primary hover:underline inline-flex items-center"
          >
            Try name combiner
            <ChevronRight className="h-3 w-3 ml-1" />
          </Link>
        </CardContent>
      </Card>
    </aside>
  );
};

export default EnhancedSidebar;
