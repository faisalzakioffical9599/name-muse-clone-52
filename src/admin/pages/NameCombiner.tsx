
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NameCombiner = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Name Combiner Settings</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Combiner Settings</CardTitle>
          <CardDescription>
            Configure settings for the name combination tool
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-length">Minimum Name Length</Label>
                <Input id="min-length" type="number" defaultValue={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-length">Maximum Name Length</Label>
                <Input id="max-length" type="number" defaultValue={12} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="combinations">Maximum Combinations to Show</Label>
                <Input id="combinations" type="number" defaultValue={10} />
              </div>
            </div>
            <Button>Save Settings</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Name Combination Stats</CardTitle>
          <CardDescription>
            Usage statistics for the name combination tool
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Combinations Generated</p>
              <p className="text-2xl font-bold">1,245</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Most Popular First Name</p>
              <p className="text-2xl font-bold">Michael</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Most Popular Second Name</p>
              <p className="text-2xl font-bold">Elizabeth</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NameCombiner;
