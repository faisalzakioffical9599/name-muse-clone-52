
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUp, ArrowDown, Minus, Plus } from "lucide-react";

const TrendingNames = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trending Names</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Trending Name
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Trending Names Settings</CardTitle>
          <CardDescription>
            Configure settings for the trending names section
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="update-frequency">Data Update Frequency</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger id="update-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="display-count">Number of Names to Display</Label>
                <Input id="display-count" type="number" defaultValue={10} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="data-source">Data Source</Label>
              <Input id="data-source" defaultValue="National Records Department" />
            </div>
            <Button>Save Settings</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Trending Names</CardTitle>
          <CardDescription>
            Manage names shown in the trending section
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="boy">Boy Names</SelectItem>
                <SelectItem value="girl">Girl Names</SelectItem>
                <SelectItem value="unisex">Unisex Names</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Liam</TableCell>
                <TableCell>Boy</TableCell>
                <TableCell>United States</TableCell>
                <TableCell>
                  <div className="flex items-center text-green-600">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>5%</span>
                  </div>
                </TableCell>
                <TableCell>#1</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Olivia</TableCell>
                <TableCell>Girl</TableCell>
                <TableCell>United States</TableCell>
                <TableCell>
                  <div className="flex items-center text-green-600">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>3%</span>
                  </div>
                </TableCell>
                <TableCell>#1</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Noah</TableCell>
                <TableCell>Boy</TableCell>
                <TableCell>United States</TableCell>
                <TableCell>
                  <div className="flex items-center text-gray-600">
                    <Minus className="h-4 w-4 mr-1" />
                    <span>0%</span>
                  </div>
                </TableCell>
                <TableCell>#2</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Emma</TableCell>
                <TableCell>Girl</TableCell>
                <TableCell>United States</TableCell>
                <TableCell>
                  <div className="flex items-center text-red-600">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    <span>2%</span>
                  </div>
                </TableCell>
                <TableCell>#2</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendingNames;
