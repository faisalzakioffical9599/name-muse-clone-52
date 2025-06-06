
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const NameFavorites = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Name Favorites</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Favorites</CardTitle>
          <CardDescription>
            View and manage user favorite name lists
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Total Favorites</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">user@example.com</TableCell>
                <TableCell>12</TableCell>
                <TableCell>June 12, 2023</TableCell>
                <TableCell className="text-right">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View user favorites</TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">anotheruser@example.com</TableCell>
                <TableCell>5</TableCell>
                <TableCell>July 3, 2023</TableCell>
                <TableCell className="text-right">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View user favorites</TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NameFavorites;
