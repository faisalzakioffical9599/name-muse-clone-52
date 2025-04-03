
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Save, X, Plus, Trash, ArrowDown, ArrowUp } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface FieldConfig {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface FormBuilderProps {
  formId?: string;
  title: string;
  description?: string;
  initialFields?: FieldConfig[];
  onSave: (formConfig: any) => void;
  onCancel?: () => void;
}

const FormBuilder = ({
  formId,
  title,
  description,
  initialFields = [],
  onSave,
  onCancel
}: FormBuilderProps) => {
  const [fields, setFields] = useState<FieldConfig[]>(initialFields);
  const [formName, setFormName] = useState(title);
  const [formDescription, setFormDescription] = useState(description || "");
  const [activeTab, setActiveTab] = useState("fields");
  const { toast } = useToast();

  const addField = () => {
    const newField: FieldConfig = {
      id: `field-${Date.now()}`,
      type: "text",
      label: "New Field",
      placeholder: "",
      required: false,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FieldConfig>) => {
    setFields(fields.map(field => (field.id === id ? { ...field, ...updates } : field)));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const moveField = (id: string, direction: "up" | "down") => {
    const index = fields.findIndex(field => field.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === fields.length - 1)
    ) {
      return;
    }

    const newFields = [...fields];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    const [removed] = newFields.splice(index, 1);
    newFields.splice(newIndex, 0, removed);
    setFields(newFields);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const newFields = [...fields];
    const [reorderedItem] = newFields.splice(result.source.index, 1);
    newFields.splice(result.destination.index, 0, reorderedItem);
    
    setFields(newFields);
  };

  const addOption = (fieldId: string) => {
    const field = fields.find(f => f.id === fieldId);
    if (!field) return;
    
    const options = [...(field.options || [])];
    options.push({ value: `option-${options.length + 1}`, label: `Option ${options.length + 1}` });
    
    updateField(fieldId, { options });
  };

  const updateOption = (fieldId: string, optionIndex: number, updates: Partial<{ value: string; label: string }>) => {
    const field = fields.find(f => f.id === fieldId);
    if (!field || !field.options) return;
    
    const options = [...field.options];
    options[optionIndex] = { ...options[optionIndex], ...updates };
    
    updateField(fieldId, { options });
  };

  const removeOption = (fieldId: string, optionIndex: number) => {
    const field = fields.find(f => f.id === fieldId);
    if (!field || !field.options) return;
    
    const options = field.options.filter((_, index) => index !== optionIndex);
    updateField(fieldId, { options });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formConfig = {
      id: formId || `form-${Date.now()}`,
      name: formName,
      description: formDescription,
      fields,
    };
    
    onSave(formConfig);
    
    toast({
      title: "Form saved",
      description: "Your form configuration has been saved",
    });
  };

  const renderFieldEditor = (field: FieldConfig) => {
    return (
      <Card key={field.id} className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm">Edit Field: {field.label}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeField(field.id)}
              title="Remove field"
            >
              <Trash className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`${field.id}-type`}>Field Type</Label>
              <Select
                value={field.type}
                onValueChange={(value) => updateField(field.id, { type: value })}
              >
                <SelectTrigger id={`${field.id}-type`}>
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text Input</SelectItem>
                  <SelectItem value="textarea">Text Area</SelectItem>
                  <SelectItem value="select">Dropdown</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="radio">Radio Buttons</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`${field.id}-label`}>Field Label</Label>
              <Input
                id={`${field.id}-label`}
                value={field.label}
                onChange={(e) => updateField(field.id, { label: e.target.value })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`${field.id}-placeholder`}>Placeholder</Label>
              <Input
                id={`${field.id}-placeholder`}
                value={field.placeholder || ""}
                onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
              />
            </div>
            
            <div className="flex items-center justify-start space-x-2 pt-7">
              <Switch
                id={`${field.id}-required`}
                checked={field.required || false}
                onCheckedChange={(checked) => updateField(field.id, { required: checked })}
              />
              <Label htmlFor={`${field.id}-required`}>Required Field</Label>
            </div>
          </div>
          
          {(field.type === "select" || field.type === "radio") && (
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center">
                <Label>Options</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addOption(field.id)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Option
                </Button>
              </div>
              
              {field.options && field.options.length > 0 ? (
                <div className="space-y-2">
                  {field.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={option.value}
                        placeholder="Value"
                        onChange={(e) => updateOption(field.id, index, { value: e.target.value })}
                        className="flex-1"
                      />
                      <Input
                        value={option.label}
                        placeholder="Label"
                        onChange={(e) => updateOption(field.id, index, { label: e.target.value })}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(field.id, index)}
                        title="Remove option"
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No options added yet</p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-0 flex justify-between">
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => moveField(field.id, "up")}
              disabled={fields.indexOf(field) === 0}
              title="Move up"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => moveField(field.id, "down")}
              disabled={fields.indexOf(field) === fields.length - 1}
              title="Move down"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Builder: {formName}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="settings">Form Settings</TabsTrigger>
              <TabsTrigger value="fields">Form Fields</TabsTrigger>
            </TabsList>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="form-name">Form Name</Label>
                <Input
                  id="form-name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="form-description">Form Description</Label>
                <Textarea
                  id="form-description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="fields" className="space-y-4">
              <Button
                type="button"
                variant="outline"
                onClick={addField}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Field
              </Button>
              
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="fields">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {fields.map((field, index) => (
                        <Draggable key={field.id} draggableId={field.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {renderFieldEditor(field)}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              
              {fields.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No fields added yet. Click the button above to add your first field.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          )}
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Save Form
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FormBuilder;
