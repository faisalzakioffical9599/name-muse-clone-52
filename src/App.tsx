
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import AllNames from "./pages/AllNames";
import BoyNames from "./pages/BoyNames";
import GirlNames from "./pages/GirlNames";
import UniqueNames from "./pages/UniqueNames";
import NameMeanings from "./pages/NameMeanings";
import LoveCalculator from "./pages/LoveCalculator";
import BabyNameMatcher from "./pages/BabyNameMatcher";
import NameDetail from "./pages/NameDetail";
import CategoryNames from "./pages/CategoryNames";
import FamousPersonalities from "./pages/FamousPersonalities";
import NameStories from "./pages/NameStories";
import NameCombiner from "./pages/NameCombiner";
import NameCompatibility from "./pages/NameCompatibility";
import NameFavorites from "./pages/NameFavorites";
import NamePronunciation from "./pages/NamePronunciation";
import TrendingNames from "./pages/TrendingNames";
import BirthCalculator from "./pages/BirthCalculator";
import UnisexNames from "./pages/UnisexNames";
import Admin from "./admin/index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/all-names" element={<AllNames />} />
            <Route path="/boy-names" element={<BoyNames />} />
            <Route path="/girl-names" element={<GirlNames />} />
            <Route path="/unique-names" element={<UniqueNames />} />
            <Route path="/unisex-names" element={<UnisexNames />} />
            <Route path="/name-meanings" element={<NameMeanings />} />
            <Route path="/love-calculator" element={<LoveCalculator />} />
            <Route path="/baby-name-matcher" element={<BabyNameMatcher />} />
            <Route path="/famous-personalities" element={<FamousPersonalities />} />
            <Route path="/name-stories" element={<NameStories />} />
            <Route path="/name-combiner" element={<NameCombiner />} />
            <Route path="/name-compatibility" element={<NameCompatibility />} />
            <Route path="/name-favorites" element={<NameFavorites />} />
            <Route path="/name-pronunciation" element={<NamePronunciation />} />
            <Route path="/trending-names" element={<TrendingNames />} />
            <Route path="/birth-calculator" element={<BirthCalculator />} />
            
            {/* Admin routes - removing conflict with pages/Admin.tsx */}
            <Route path="/admin/*" element={<Admin />} />
            
            <Route path="/name/:nameId" element={<NameDetail />} />
            <Route path="/:categoryType/:categoryId" element={<CategoryNames />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
