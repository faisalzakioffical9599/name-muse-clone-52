
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash, Save, Languages, Book, Star, Palette, Diamond, Sun, Smile, Users, Mic, Tag, Info, Globe } from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Define the types for the arrays with required properties (no optional properties)
interface Translation {
  language: string;
  value: string;
}

interface PronunciationType {
  language: string;
  value: string;
}

interface PersonalityTrait {
  trait: string;
}

interface FamousPerson {
  name: string;
  description: string;
}

interface NameFaq {
  question: string;
  answer: string;
}

// Schema for the form
const nameFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  meaning: z.string().min(1, "Meaning is required"),
  gender: z.enum(["boy", "girl", "unisex"]),
  origin: z.string().min(1, "Origin is required"),
  religion: z.string().optional(),
  language: z.string().min(1, "Language is required"),
  popularity: z.number().optional(),
  translations: z.array(z.object({
    language: z.string(),
    value: z.string(),
  })).default([]),
  meanings: z.array(z.object({
    language: z.string(),
    value: z.string(),
  })).default([]),
  descriptions: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  pronunciations: z.array(z.object({
    language: z.string(),
    value: z.string()
  })).default([]),
  numerology: z.string().optional(),
  luckyElements: z.string().optional(),
  luckyNumber: z.string().optional(),
  luckyStone: z.string().optional(),
  luckyColor: z.string().optional(),
  personalityTraits: z.array(z.object({
    trait: z.string()
  })).default([]),
  nameVariations: z.string().optional(),
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
  const { toast } = useToast();
  const [currentTag, setCurrentTag] = useState("");

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
      translations: initialValues?.translations || [],
      meanings: initialValues?.meanings || [],
      descriptions: initialValues?.descriptions || [],
      tags: initialValues?.tags || [],
      pronunciations: initialValues?.pronunciations || [],
      numerology: initialValues?.numerology || "",
      luckyElements: initialValues?.luckyElements || "",
      luckyNumber: initialValues?.luckyNumber || "",
      luckyStone: initialValues?.luckyStone || "",
      luckyColor: initialValues?.luckyColor || "",
      personalityTraits: initialValues?.personalityTraits || [],
      nameVariations: initialValues?.nameVariations || "",
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

  // Fixed initializations to ensure required properties are defined
  // Making sure all required properties in the interface have non-optional initial values
  const [translations, setTranslations] = useState<Translation[]>(
    initialValues?.translations && initialValues.translations.length > 0 
      ? initialValues.translations.map(t => ({ language: t.language || "", value: t.value || "" })) 
      : [{ language: "", value: "" }]
  );
  
  const [meanings, setMeanings] = useState<Translation[]>(
    initialValues?.meanings && initialValues.meanings.length > 0 
      ? initialValues.meanings.map(m => ({ language: m.language || "", value: m.value || "" })) 
      : [{ language: "", value: "" }]
  );
  
  const [descriptions, setDescriptions] = useState<string[]>(
    initialValues?.descriptions && initialValues.descriptions.length > 0
      ? initialValues.descriptions
      : [""]
  );
  
  const [tags, setTags] = useState<string[]>(
    initialValues?.tags || []
  );
  
  const [pronunciations, setPronunciations] = useState<PronunciationType[]>(
    initialValues?.pronunciations && initialValues.pronunciations.length > 0
      ? initialValues.pronunciations.map(p => ({ language: p.language || "", value: p.value || "" }))
      : [{ language: "", value: "" }]
  );
  
  const [personalityTraits, setPersonalityTraits] = useState<PersonalityTrait[]>(
    initialValues?.personalityTraits && initialValues.personalityTraits.length > 0
      ? initialValues.personalityTraits.map(p => ({ trait: p.trait || "" }))
      : [{ trait: "" }]
  );
  
  const [famousPeople, setFamousPeople] = useState<FamousPerson[]>(
    initialValues?.famousPeople && initialValues.famousPeople.length > 0
      ? initialValues.famousPeople.map(p => ({ name: p.name || "", description: p.description || "" }))
      : [{ name: "", description: "" }]
  );
  
  const [faqs, setFaqs] = useState<NameFaq[]>(
    initialValues?.nameFaqs && initialValues.nameFaqs.length > 0
      ? initialValues.nameFaqs.map(f => ({ question: f.question || "", answer: f.answer || "" }))
      : [{ question: "", answer: "" }]
  );

  const addTranslation = () => {
    setTranslations([...translations, { language: "", value: "" }]);
  };

  const updateTranslation = (index: number, field: keyof Translation, value: string) => {
    const updated = [...translations];
    updated[index][field] = value;
    setTranslations(updated);
  };

  const removeTranslation = (index: number) => {
    if (translations.length > 1) {
      const updated = [...translations];
      updated.splice(index, 1);
      setTranslations(updated);
    }
  };

  const addMeaning = () => {
    setMeanings([...meanings, { language: "", value: "" }]);
  };

  const updateMeaning = (index: number, field: keyof Translation, value: string) => {
    const updated = [...meanings];
    updated[index][field] = value;
    setMeanings(updated);
  };

  const removeMeaning = (index: number) => {
    if (meanings.length > 1) {
      const updated = [...meanings];
      updated.splice(index, 1);
      setMeanings(updated);
    }
  };

  const addDescription = () => {
    setDescriptions([...descriptions, ""]);
  };

  const updateDescription = (index: number, value: string) => {
    const updated = [...descriptions];
    updated[index] = value;
    setDescriptions(updated);
  };

  const removeDescription = (index: number) => {
    if (descriptions.length > 1) {
      const updated = [...descriptions];
      updated.splice(index, 1);
      setDescriptions(updated);
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (index: number) => {
    const updated = [...tags];
    updated.splice(index, 1);
    setTags(updated);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const addPronunciation = () => {
    setPronunciations([...pronunciations, { language: "", value: "" }]);
  };

  const updatePronunciation = (index: number, field: keyof PronunciationType, value: string) => {
    const updated = [...pronunciations];
    updated[index][field] = value;
    setPronunciations(updated);
  };

  const removePronunciation = (index: number) => {
    if (pronunciations.length > 1) {
      const updated = [...pronunciations];
      updated.splice(index, 1);
      setPronunciations(updated);
    }
  };

  const addPersonalityTrait = () => {
    setPersonalityTraits([...personalityTraits, { trait: "" }]);
  };

  const updatePersonalityTrait = (index: number, value: string) => {
    const updated = [...personalityTraits];
    updated[index].trait = value;
    setPersonalityTraits(updated);
  };

  const removePersonalityTrait = (index: number) => {
    if (personalityTraits.length > 1) {
      const updated = [...personalityTraits];
      updated.splice(index, 1);
      setPersonalityTraits(updated);
    }
  };

  const handleAddFamousPerson = () => {
    setFamousPeople([...famousPeople, { name: "", description: "" }]);
  };

  const handleRemoveFamousPerson = (index: number) => {
    if (famousPeople.length > 1) {
      const updated = [...famousPeople];
      updated.splice(index, 1);
      setFamousPeople(updated);
    }
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
    if (faqs.length > 1) {
      const updated = [...faqs];
      updated.splice(index, 1);
      setFaqs(updated);
    }
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
    const formData = {
      ...values,
      translations,
      meanings,
      descriptions,
      tags,
      pronunciations,
      personalityTraits,
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
                <FormLabel>Primary Meaning *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the primary meaning of the name"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        {/* Translations Section */}
        <FormSection>
          <FormSectionTitle className="flex items-center">
            <Languages className="mr-2 h-5 w-5" />
            Name in Different Languages
          </FormSectionTitle>
          <div className="space-y-4">
            {translations.map((translation, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Language</label>
                  <Input
                    value={translation.language}
                    onChange={(e) => updateTranslation(index, "language", e.target.value)}
                    placeholder="e.g., Arabic, French"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Name Translation</label>
                  <Input
                    value={translation.value}
                    onChange={(e) => updateTranslation(index, "value", e.target.value)}
                    placeholder="Name in this language"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mt-6"
                  onClick={() => removeTranslation(index)}
                  disabled={translations.length === 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addTranslation}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Language
            </Button>
          </div>
        </FormSection>

        {/* Meanings in Different Languages Section */}
        <FormSection>
          <FormSectionTitle className="flex items-center">
            <Book className="mr-2 h-5 w-5" />
            Meaning in Different Languages
          </FormSectionTitle>
          <div className="space-y-4">
            {meanings.map((meaning, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Language</label>
                  <Input
                    value={meaning.language}
                    onChange={(e) => updateMeaning(index, "language", e.target.value)}
                    placeholder="e.g., Arabic, Sanskrit"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Meaning</label>
                  <Input
                    value={meaning.value}
                    onChange={(e) => updateMeaning(index, "value", e.target.value)}
                    placeholder="Meaning in this language"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mt-6"
                  onClick={() => removeMeaning(index)}
                  disabled={meanings.length === 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addMeaning}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Meaning
            </Button>
          </div>
        </FormSection>

        {/* Origin & Language */}
        <FormSection>
          <FormSectionTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Origin & Language
          </FormSectionTitle>
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

        {/* Descriptions Array */}
        <FormSection>
          <FormSectionTitle className="flex items-center">
            <Info className="mr-2 h-5 w-5" />
            Descriptions
          </FormSectionTitle>
          <div className="space-y-4">
            {descriptions.map((description, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1">
                  <Textarea
                    value={description}
                    onChange={(e) => updateDescription(index, e.target.value)}
                    placeholder={`Description ${index + 1}`}
                    className="resize-none"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDescription(index)}
                  disabled={descriptions.length === 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addDescription}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Description
            </Button>
          </div>
        </FormSection>

        {/* Tags */}
        <FormSection>
          <FormSectionTitle className="flex items-center">
            <Tag className="mr-2 h-5 w-5" />
            Tags
          </FormSectionTitle>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag"
                onKeyDown={handleTagKeyDown}
              />
              <Button 
                type="button" 
                onClick={addTag}
                disabled={!currentTag.trim()}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {tags.length === 0 && (
                <span className="text-sm text-muted-foreground">No tags added yet</span>
              )}
            </div>
          </div>
        </FormSection>

        {/* Overview Section */}
        <FormSection>
          <FormSectionTitle className="text-xl font-bold mb-4">Overview</FormSectionTitle>
          
          {/* Pronunciation Section */}
          <FormSection>
            <FormSectionTitle className="flex items-center">
              <Mic className="mr-2 h-5 w-5" />
              Pronunciation
            </FormSectionTitle>
            <div className="space-y-4">
              {pronunciations.map((pronunciation, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Language</label>
                    <Input
                      value={pronunciation.language}
                      onChange={(e) => updatePronunciation(index, "language", e.target.value)}
                      placeholder="e.g., English, Spanish"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Pronunciation</label>
                    <Input
                      value={pronunciation.value}
                      onChange={(e) => updatePronunciation(index, "value", e.target.value)}
                      placeholder="e.g., fay-sal"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-6"
                    onClick={() => removePronunciation(index)}
                    disabled={pronunciations.length === 1}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={addPronunciation}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Pronunciation
              </Button>
            </div>
          </FormSection>

          {/* Numerology and Lucky Elements Section */}
          <FormGrid columns={2}>
            <FormField
              control={form.control}
              name="numerology"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Star className="mr-2 h-4 w-4" />
                    Numerology
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Numerological significance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="luckyElements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Sun className="mr-2 h-4 w-4" />
                    Lucky Elements
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Fire, Water, Earth" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormGrid>

          <FormGrid columns={3}>
            <FormField
              control={form.control}
              name="luckyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Star className="mr-2 h-4 w-4" />
                    Lucky Number
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 7, 9" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="luckyStone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Diamond className="mr-2 h-4 w-4" />
                    Lucky Stone
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Ruby, Emerald" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="luckyColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Palette className="mr-2 h-4 w-4" />
                    Lucky Color
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Blue, Green" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormGrid>

          {/* Personality Traits */}
          <FormSection>
            <FormSectionTitle className="flex items-center">
              <Smile className="mr-2 h-5 w-5" />
              Personality Traits
            </FormSectionTitle>
            <div className="space-y-4">
              {personalityTraits.map((trait, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <Input
                      value={trait.trait}
                      onChange={(e) => updatePersonalityTrait(index, e.target.value)}
                      placeholder="e.g., Ambitious, Compassionate"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removePersonalityTrait(index)}
                    disabled={personalityTraits.length === 1}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={addPersonalityTrait}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Trait
              </Button>
            </div>
          </FormSection>

          <FormField
            control={form.control}
            name="nameVariations"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Name Variations
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Different variations of the name"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        {/* Additional Details */}
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
          <FormSectionTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Famous People with this Name
          </FormSectionTitle>
          <div className="space-y-4">
            {famousPeople.map((person, index) => (
              <Card key={index} className="bg-muted/50 border-muted">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Person #{index + 1}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleRemoveFamousPerson(index)}
                      disabled={famousPeople.length === 1}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label>Name</Label>
                      <Input
                        value={person.name}
                        onChange={(e) => handleFamousPersonChange(index, "name", e.target.value)}
                        placeholder="Full name"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Description</Label>
                      <Textarea
                        value={person.description}
                        onChange={(e) => handleFamousPersonChange(index, "description", e.target.value)}
                        placeholder="Brief biography"
                        className="resize-none"
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
          <FormSectionTitle className="flex items-center">
            <Info className="mr-2 h-5 w-5" />
            Name FAQs
          </FormSectionTitle>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-muted/50 border-muted">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">FAQ #{index + 1}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleRemoveFaq(index)}
                      disabled={faqs.length === 1}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label>Question</Label>
                      <Input
                        value={faq.question}
                        onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                        placeholder="e.g., What does the name mean?"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Answer</Label>
                      <Textarea
                        value={faq.answer}
                        onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                        placeholder="Answer to the question"
                        className="resize-none"
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
          <FormSectionTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            SEO Information
          </FormSectionTitle>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="seoTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Title</FormLabel>
                  <FormControl>
                    <Input placeholder="SEO-optimized title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Optimal length: 50-60 characters
                  </FormDescription>
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
                      placeholder="SEO meta description" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Optimal length: 150-160 characters
                  </FormDescription>
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
                  <FormDescription>
                    Separate keywords with commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormSection>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialValues ? "Update Name" : "Create Name"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NameForm;
