
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Save, X, Plus, PlusCircle, Upload, Image } from "lucide-react";

interface Field {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "image";
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface ContentFormProps {
  title: string;
  description?: string;
  fields: Field[];
  submitText?: string;
  onSubmit: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
  cancelText?: string;
  onCancel?: () => void;
  tabs?: { id: string; label: string; fields: string[] }[];
}

const ContentForm = ({
  title,
  description,
  fields,
  submitText = "Save",
  onSubmit,
  initialData = {},
  cancelText = "Cancel",
  onCancel,
  tabs
}: ContentFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [activeTab, setActiveTab] = useState(tabs && tabs.length > 0 ? tabs[0].id : "");
  const { toast } = useToast();

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    toast({
      title: "Success",
      description: "Your content has been saved",
    });
  };

  const renderField = (field: Field) => {
    const value = formData[field.name] !== undefined ? formData[field.name] : "";

    switch (field.type) {
      case "textarea":
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Textarea
              id={field.name}
              value={value}
              placeholder={field.placeholder}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
              rows={5}
            />
          </div>
        );
      case "select":
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Select
              value={value}
              onValueChange={(value) => handleChange(field.name, value)}
            >
              <SelectTrigger id={field.name}>
                <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case "number":
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              type="number"
              value={value}
              placeholder={field.placeholder}
              onChange={(e) => handleChange(field.name, Number(e.target.value))}
              required={field.required}
            />
          </div>
        );
      case "image":
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <div className="flex items-center gap-2">
              <Input
                id={field.name}
                value={value}
                placeholder={field.placeholder || "Image URL"}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
              />
              <Button type="button" variant="outline" size="icon" title="Upload image">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            {value && (
              <div className="mt-2 border rounded-md p-2 bg-muted/20">
                <img
                  src={value}
                  alt="Preview"
                  className="h-20 w-auto object-contain mx-auto"
                  onError={(e) => e.currentTarget.src = "https://placehold.co/200x200?text=Invalid+Image"}
                />
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              value={value}
              placeholder={field.placeholder}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
            />
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          {tabs && tabs.length > 0 ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields
                      .filter((field) => tab.fields.includes(field.name))
                      .map((field) => renderField(field))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field) => renderField(field))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              {cancelText}
            </Button>
          )}
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {submitText}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ContentForm;
