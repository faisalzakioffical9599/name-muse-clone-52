
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const NameCompatibility = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Name Compatibility Settings</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Compatibility Algorithm Settings</CardTitle>
          <CardDescription>
            Configure settings for the name compatibility checker
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phonetics-weight">Phonetics Weight</Label>
                <Input id="phonetics-weight" type="number" defaultValue={30} />
                <p className="text-sm text-gray-500">Percentage importance of phonetic similarity</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meaning-weight">Meaning Weight</Label>
                <Input id="meaning-weight" type="number" defaultValue={40} />
                <p className="text-sm text-gray-500">Percentage importance of meaning compatibility</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="origin-weight">Origin Weight</Label>
                <Input id="origin-weight" type="number" defaultValue={20} />
                <p className="text-sm text-gray-500">Percentage importance of cultural origin</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="popularity-weight">Popularity Weight</Label>
                <Input id="popularity-weight" type="number" defaultValue={10} />
                <p className="text-sm text-gray-500">Percentage importance of popularity balance</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="show-percentage" />
              <Label htmlFor="show-percentage">Show Compatibility Percentage</Label>
            </div>
            <Button>Save Settings</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compatibility Check Statistics</CardTitle>
          <CardDescription>
            Usage statistics for the name compatibility tool
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Checks Performed</p>
              <p className="text-2xl font-bold">2,876</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Most Compatible Pair</p>
              <p className="text-2xl font-bold">Emma & Noah</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Average Compatibility</p>
              <p className="text-2xl font-bold">72%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NameCompatibility;
