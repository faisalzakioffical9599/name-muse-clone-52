
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Globe, Book, Heart, Languages, Church, Star, Calendar, Info } from "lucide-react";
import Header from "../components/Header";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import RelatedNames from "../components/RelatedNames";
import Check from "../components/Check";

interface NameDetailInfo {
  id: string;
  name: string;
  meaning: string;
  gender: "boy" | "girl";
  origin: string;
  religion: string;
  language: string;
  popularity?: number;
  luckyNumber?: number;
  luckyStone?: string;
  luckyColor?: string;
  personality?: string[];
  famousPeople?: {name: string, description: string}[];
  pronunciation?: string;
  nameVariations?: string[];
  numerology?: number;
  zodiacSign?: string;
  description?: string;
}

const NameDetail = () => {
  const { nameId } = useParams();
  
  // Mock data for demonstration - would be replaced by API call
  const nameInfo: NameDetailInfo = {
    id: nameId || "n1",
    name: "Faisal",
    meaning: "Judge, arbiter, one who decides",
    gender: "boy",
    origin: "Arabic",
    religion: "Islam",
    language: "Arabic",
    popularity: 85,
    luckyNumber: 7,
    luckyStone: "Emerald",
    luckyColor: "Green",
    personality: [
      "Charismatic and natural leader",
      "Fair and just in decisions",
      "Intelligent and analytical",
      "Diplomatic in handling situations"
    ],
    famousPeople: [
      {name: "King Faisal of Saudi Arabia", description: "Former ruler of Saudi Arabia"},
      {name: "Faisal Khan", description: "Indian actor and dancer"}
    ],
    pronunciation: "FAY-sal",
    nameVariations: ["Faysal", "Fayçal", "Feisal"],
    numerology: 3,
    zodiacSign: "Leo",
    description: "Faisal is a name of Arabic origin that means 'judge' or 'arbiter.' It's traditionally a male name and is popular in Arabic-speaking countries and among Muslim communities worldwide. The name carries connotations of fairness, justice, and wisdom. Historically, it has been the name of several kings and prominent figures in the Middle East."
  };

  // Mock FAQs related to the name
  const faqs = [
    {
      question: `What is the meaning of the name ${nameInfo.name}?`,
      answer: nameInfo.meaning
    },
    {
      question: `What is the origin of the name ${nameInfo.name}?`,
      answer: `${nameInfo.name} is of ${nameInfo.origin} origin and is commonly used in ${nameInfo.language}-speaking countries.`
    },
    {
      question: `What is the lucky number for ${nameInfo.name}?`,
      answer: `The lucky number associated with the name ${nameInfo.name} is ${nameInfo.luckyNumber}.`
    },
    {
      question: `How popular is the name ${nameInfo.name}?`,
      answer: `${nameInfo.name} has a popularity rating of ${nameInfo.popularity}/100, making it a ${nameInfo.popularity > 75 ? "very popular" : nameInfo.popularity > 50 ? "moderately popular" : "less common"} name.`
    },
    {
      question: `What personality traits are associated with the name ${nameInfo.name}?`,
      answer: `People named ${nameInfo.name} are often known to be ${nameInfo.personality?.join(", ").toLowerCase()}.`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* SEO metadata would be added here in a real implementation */}
      
      <main className="pt-24 md:pt-32 pb-16 md:pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/${nameInfo.gender === "boy" ? "boy" : "girl"}-names`}>
                    {nameInfo.gender === "boy" ? "Boy" : "Girl"} Names
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{nameInfo.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Name Header Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 animate-fade-in">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                      {nameInfo.name}
                    </h1>
                    <p className="text-lg text-muted-foreground mt-2">
                      {nameInfo.meaning}
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    <span className="mr-1">Popularity: {nameInfo.popularity}</span>
                    <Heart size={12} className={nameInfo.gender === "boy" ? "text-blue-400" : "text-pink-400"} />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Origin:</span> {nameInfo.origin}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Church className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Religion:</span> {nameInfo.religion}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Languages className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Language:</span> {nameInfo.language}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Lucky #:</span> {nameInfo.luckyNumber}
                  </div>
                </div>

                <p className="text-gray-700 mb-6">
                  {nameInfo.description}
                </p>

                <div className="flex flex-wrap gap-3 text-sm">
                  <Link 
                    to={`/country/${nameInfo.origin.toLowerCase()}-names`}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {nameInfo.origin} names
                  </Link>
                  <Link 
                    to={`/religion/${nameInfo.religion.toLowerCase()}-names`}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {nameInfo.religion} names
                  </Link>
                  <Link 
                    to={`/language/${nameInfo.language.toLowerCase()}-names`}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {nameInfo.language} names
                  </Link>
                </div>
              </div>
              
              {/* Detailed Name Information Tabs */}
              <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="w-full justify-start mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="personality">Personality</TabsTrigger>
                  <TabsTrigger value="famous">Famous People</TabsTrigger>
                  <TabsTrigger value="variations">Variations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Pronunciation</h3>
                      <p className="text-gray-700">{nameInfo.pronunciation}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Numerology</h3>
                      <p className="text-gray-700">The name {nameInfo.name} has a numerology value of {nameInfo.numerology}.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Lucky Elements</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="py-3">
                            <CardTitle className="text-base">Lucky Number</CardTitle>
                          </CardHeader>
                          <CardContent className="text-2xl font-bold text-center py-3">
                            {nameInfo.luckyNumber}
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="py-3">
                            <CardTitle className="text-base">Lucky Stone</CardTitle>
                          </CardHeader>
                          <CardContent className="text-2xl font-bold text-center py-3">
                            {nameInfo.luckyStone}
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="py-3">
                            <CardTitle className="text-base">Lucky Color</CardTitle>
                          </CardHeader>
                          <CardContent className="text-2xl font-bold text-center py-3">
                            {nameInfo.luckyColor}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="personality" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-medium mb-3">Personality Traits</h3>
                  <p className="text-gray-700 mb-4">
                    People named {nameInfo.name} often exhibit these personality traits:
                  </p>
                  <ul className="space-y-2">
                    {nameInfo.personality?.map((trait, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span>{trait}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="famous" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-medium mb-3">Famous People Named {nameInfo.name}</h3>
                  <div className="space-y-4">
                    {nameInfo.famousPeople?.map((person, index) => (
                      <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                        <h4 className="font-medium">{person.name}</h4>
                        <p className="text-sm text-gray-600">{person.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="variations" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-medium mb-3">Name Variations</h3>
                  <div className="flex flex-wrap gap-2">
                    {nameInfo.nameVariations?.map((variation, index) => (
                      <div key={index} className="px-3 py-1 bg-gray-100 rounded-md text-gray-700">
                        {variation}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* FAQs Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            
            {/* Right Sidebar */}
            <div className="w-full lg:w-72 space-y-6">
              {/* Similar Names */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="text-lg font-semibold mb-4">Related Names</h3>
                <RelatedNames gender={nameInfo.gender} origin={nameInfo.origin} religion={nameInfo.religion} />
              </div>
              
              {/* Categories */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="text-sm font-medium uppercase text-gray-500 mb-3">Browse By Category</h3>
                <div className="space-y-2">
                  <Link 
                    to="/country/all"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-500" />
                      <span>By Country</span>
                    </div>
                  </Link>
                  <Link 
                    to="/religion/all"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Church className="h-4 w-4 text-blue-500" />
                      <span>By Religion</span>
                    </div>
                  </Link>
                  <Link 
                    to="/language/all"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4 text-blue-500" />
                      <span>By Language</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Simplified Footer */}
      <footer className="py-8 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NameMuse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NameDetail;
