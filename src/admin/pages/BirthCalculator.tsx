
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, Plus } from "lucide-react";

const BirthCalculator = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Birth Date Calculator</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Astrological Set
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Birth Calculator Settings</CardTitle>
          <CardDescription>
            Configure settings for the birth date name calculator
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="names-per-sign">Names Per Astrological Sign</Label>
                <Input id="names-per-sign" type="number" defaultValue={10} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calculation-method">Calculation Method</Label>
                <Input id="calculation-method" defaultValue="Western Zodiac" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="include-chinese" defaultChecked />
                <Label htmlFor="include-chinese">Include Chinese Zodiac</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="include-numerology" defaultChecked />
                <Label htmlFor="include-numerology">Include Numerology</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="allow-birthtime" />
                <Label htmlFor="allow-birthtime">Allow Birth Time Input</Label>
              </div>
            </div>
            <Button>Save Settings</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Astrological Name Sets</CardTitle>
          <CardDescription>
            Manage name suggestions based on astrological signs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sign</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Number of Names</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Aries</TableCell>
                <TableCell>March 21 - April 19</TableCell>
                <TableCell>24</TableCell>
                <TableCell>June 12, 2023</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Taurus</TableCell>
                <TableCell>April 20 - May 20</TableCell>
                <TableCell>26</TableCell>
                <TableCell>June 15, 2023</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Gemini</TableCell>
                <TableCell>May 21 - June 20</TableCell>
                <TableCell>22</TableCell>
                <TableCell>June 18, 2023</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BirthCalculator;
