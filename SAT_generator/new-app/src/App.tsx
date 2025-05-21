
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuestionBankProvider } from "./context/QuestionBankContext";
import Index from "./pages/Index";
import SkillsSelection from "./pages/SkillsSelection";
import DifficultiesSelection from "./pages/DifficultiesSelection";
import Summary from "./pages/Summary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <QuestionBankProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/skills/:domainId" element={<SkillsSelection />} />
            <Route path="/difficulties/:domainId" element={<DifficultiesSelection />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QuestionBankProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
