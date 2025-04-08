
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash, Save } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormSection,
  FormSectionTitle,
  FormGrid,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const nameFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  meaning: z.string().min(1, "Meaning is required"),
  gender: z.enum(["boy", "girl", "unisex"]),
  origin: z.string().min(1, "Origin is required"),
  religion: z.string().optional(),
  language: z.string().min(1, "Language is required"),
  popularity: z.number().optional(),
  pronunciation: z.string().optional(),
  numerology: z.string().optional(),
  syllables: z.number().int().positive().optional(),
  nameDay: z.string().optional(),
  variants: z.string().optional(),
  diminutives: z.string().optional(),
  history: z.string().optional(),
  nameBearers: z.string().optional(),
  siblings: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  famousPeople: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
    })
  ).default([]),
  nameFaqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ).default([]),
});

type NameFormValues = z.infer<typeof nameFormSchema>;

interface NameFormProps {
  initialValues?: Partial<NameFormValues>;
  onSubmit: (values: NameFormValues) => void;
  isLoading?: boolean;
}

const NameForm = ({ initialValues, onSubmit, isLoading = false }: NameFormProps) => {
  const [famousPeople, setFamousPeople] = useState(
    initialValues?.famousPeople || [{ name: "", description: "" }]
  );
  const [faqs, setFaqs] = useState(
    initialValues?.nameFaqs || [{ question: "", answer: "" }]
  );
  const { toast } = useToast();

  const form = useForm<NameFormValues>({
    resolver: zodResolver(nameFormSchema),
    defaultValues: {
      name: initialValues?.name || "",
      meaning: initialValues?.meaning || "",
      gender: initialValues?.gender || "unisex",
      origin: initialValues?.origin || "",
      religion: initialValues?.religion || "",
      language: initialValues?.language || "",
      popularity: initialValues?.popularity,
      pronunciation: initialValues?.pronunciation || "",
      numerology: initialValues?.numerology || "",
      syllables: initialValues?.syllables,
      nameDay: initialValues?.nameDay || "",
      variants: initialValues?.variants || "",
      diminutives: initialValues?.diminutives || "",
      history: initialValues?.history || "",
      nameBearers: initialValues?.nameBearers || "",
      siblings: initialValues?.siblings || "",
      seoTitle: initialValues?.seoTitle || "",
      seoDescription: initialValues?.seoDescription || "",
      seoKeywords: initialValues?.seoKeywords || "",
      famousPeople: initialValues?.famousPeople || [],
      nameFaqs: initialValues?.nameFaqs || [],
    },
  });

  const handleAddFamousPerson = () => {
    setFamousPeople([...famousPeople, { name: "", description: "" }]);
  };

  const handleRemoveFamousPerson = (index: number) => {
    const updated = [...famousPeople];
    updated.splice(index, 1);
    setFamousPeople(updated);
  };

  const handleFamousPersonChange = (
    index: number,
    field: keyof typeof famousPeople[0],
    value: string
  ) => {
    const updated = [...famousPeople];
    updated[index][field] = value;
    setFamousPeople(updated);
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleRemoveFaq = (index: number) => {
    const updated = [...faqs];
    updated.splice(index, 1);
    setFaqs(updated);
  };

  const handleFaqChange = (
    index: number,
    field: keyof typeof faqs[0],
    value: string
  ) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const handleSubmit = form.handleSubmit((values) => {
    // Add the famousPeople and FAQs to the form data
    const formData = {
      ...values,
      famousPeople,
      nameFaqs: faqs,
    };
    
    onSubmit(formData);
    toast({
      title: "Form Submitted",
      description: `Name ${formData.name} has been ${initialValues ? "updated" : "added"} successfully.`,
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormSection>
          <FormSectionTitle>Basic Information</FormSectionTitle>
          <FormGrid columns={2}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="boy">Boy</SelectItem>
                      <SelectItem value="girl">Girl</SelectItem>
                      <SelectItem value="unisex">Unisex</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormGrid>

          <FormField
            control={form.control}
            name="meaning"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meaning *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the meaning of the name"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <FormSection>
          <FormSectionTitle>Origin & Language</FormSectionTitle>
          <FormGrid columns={3}>
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origin *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Greek" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Latin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="religion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Religion</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Christianity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormGrid>
        </FormSection>

        <FormSection>
          <FormSectionTitle>Additional Details</FormSectionTitle>
          <FormGrid columns={2}>
            <FormField
              control={form.control}
              name="popularity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Popularity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Rank (e.g., 10)"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pronunciation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pronunciation</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., mi-KAY-luh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="syllables"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Syllables</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Number of syllables"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nameDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name Day</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., September 29" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormGrid>

          <FormGrid columns={1}>
            <FormField
              control={form.control}
              name="variants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variants</FormLabel>
                  <FormControl>
                    <Input placeholder="Alternative spellings or variants" {...field} />
                  </FormControl>
                  <FormDescription>
                    Separate multiple variants with commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="diminutives"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diminutives</FormLabel>
                  <FormControl>
                    <Input placeholder="Nicknames or diminutive forms" {...field} />
                  </FormControl>
                  <FormDescription>
                    Separate multiple diminutives with commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormGrid>
        </FormSection>

        <FormSection>
          <FormSectionTitle>History & Context</FormSectionTitle>
          <FormField
            control={form.control}
            name="history"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Historical Context</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Historical background of the name"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormGrid columns={2}>
            <FormField
              control={form.control}
              name="nameBearers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notable Name Bearers</FormLabel>
                  <FormControl>
                    <Input placeholder="Historical figures with this name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Separate multiple names with commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="siblings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sibling Name Suggestions</FormLabel>
                  <FormControl>
                    <Input placeholder="Names that pair well" {...field} />
                  </FormControl>
                  <FormDescription>
                    Separate multiple names with commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormGrid>
        </FormSection>

        {/* Famous People Section */}
        <FormSection>
          <FormSectionTitle>Famous People with this Name</FormSectionTitle>
          <div className="space-y-4">
            {famousPeople.map((person, index) => (
              <Card key={index} className="bg-muted/50 border-muted">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm">Famous Person #{index + 1}</CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFamousPerson(index)}
                      disabled={famousPeople.length === 1}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 gap-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        placeholder="Famous person's full name"
                        value={person.name}
                        onChange={(e) =>
                          handleFamousPersonChange(index, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="Brief description"
                        value={person.description}
                        onChange={(e) =>
                          handleFamousPersonChange(index, "description", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleAddFamousPerson}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Famous Person
            </Button>
          </div>
        </FormSection>

        {/* FAQs Section */}
        <FormSection>
          <FormSectionTitle>Name FAQs</FormSectionTitle>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-muted/50 border-muted">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm">FAQ #{index + 1}</CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFaq(index)}
                      disabled={faqs.length === 1}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 gap-2">
                      <label className="text-sm font-medium">Question</label>
                      <Input
                        placeholder="FAQ question"
                        value={faq.question}
                        onChange={(e) =>
                          handleFaqChange(index, "question", e.target.value)
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <label className="text-sm font-medium">Answer</label>
                      <Textarea
                        placeholder="FAQ answer"
                        value={faq.answer}
                        onChange={(e) =>
                          handleFaqChange(index, "answer", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleAddFaq}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </div>
        </FormSection>

        {/* SEO Section */}
        <FormSection>
          <FormSectionTitle>SEO Information</FormSectionTitle>
          <FormField
            control={form.control}
            name="seoTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Title</FormLabel>
                <FormControl>
                  <Input placeholder="SEO Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seoDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Meta description for search engines"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seoKeywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Keywords</FormLabel>
                <FormControl>
                  <Input placeholder="Comma-separated keywords" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {initialValues ? "Update Name" : "Add Name"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NameForm;
