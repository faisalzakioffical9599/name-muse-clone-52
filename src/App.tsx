
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AllNames from "./pages/AllNames";
import BoyNames from "./pages/BoyNames";
import GirlNames from "./pages/GirlNames";
import NameDetail from "./pages/NameDetail";
import CategoryNames from "./pages/CategoryNames";
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
