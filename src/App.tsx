
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Admin from "./admin/index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
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
          <Route path="/name-meanings" element={<NameMeanings />} />
          <Route path="/love-calculator" element={<LoveCalculator />} />
          <Route path="/baby-name-matcher" element={<BabyNameMatcher />} />
          <Route path="/famous-personalities" element={<FamousPersonalities />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/name/:nameId" element={<NameDetail />} />
          <Route path="/:categoryType/:categoryId" element={<CategoryNames />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
