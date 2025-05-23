
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
import Practice from "./pages/Practice";
import TestJson from "./pages/TestJson";
import AnalyzePage from "./pages/AnalyzePage";
import AnalyzeLoadingPage from "./pages/AnalyzeLoadingPage";

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
            <Route path="/practice" element={<Practice />} />
            <Route path="/test-json" element={<TestJson />} />
            <Route path="/analyze-loading" element={<AnalyzeLoadingPage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
          </Routes>
        </BrowserRouter>
      </QuestionBankProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
