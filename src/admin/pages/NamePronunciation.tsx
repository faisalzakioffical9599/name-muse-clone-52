
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, Play, Plus } from "lucide-react";

const NamePronunciation = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Name Pronunciation Guide</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Pronunciation
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Pronunciation Settings</CardTitle>
          <CardDescription>
            Configure settings for the name pronunciation audio guide
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">Text-to-Speech API Key</Label>
                <Input id="api-key" type="password" value="*******************" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="voice-type">Default Voice Type</Label>
                <Input id="voice-type" defaultValue="Female, US English" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="auto-generate" defaultChecked />
                <Label htmlFor="auto-generate">Auto-generate pronunciations for new names</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="allow-custom" defaultChecked />
                <Label htmlFor="allow-custom">Allow users to submit custom pronunciations</Label>
              </div>
            </div>
            <Button>Save Settings</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pronunciations Library</CardTitle>
          <CardDescription>
            Manage name pronunciation audio files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Audio</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Aoife</TableCell>
                <TableCell>Irish</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon">
                    <Play className="h-4 w-4" />
                  </Button>
                </TableCell>
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
                <TableCell className="font-medium">Siobhan</TableCell>
                <TableCell>Irish</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon">
                    <Play className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>July 3, 2023</TableCell>
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

export default NamePronunciation;
