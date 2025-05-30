// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// -------------- Context --------------
import { AuthProvider } from "@/context/AuthContext";
import { QuestionBankProvider } from "./context/QuestionBankContext";

// -------------- Layout / Common --------------
import Header from "@/components/Header";

// -------------- Pages --------------
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import SkillsSelection from "./pages/SkillsSelection";
import DifficultiesSelection from "./pages/DifficultiesSelection";
import Summary from "./pages/Summary";
import Practice from "./pages/Practice";
import TestJson from "./pages/TestJson";
import AnalyzePage from "./pages/AnalyzePage";
import AnalyzeLoadingPage from "./pages/AnalyzeLoadingPage";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

// -------------------------------------
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <QuestionBankProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Header />
            <div className="pt-[150px]">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/index" element={<Index />} />
                <Route path="/skills/:domainId" element={<SkillsSelection />} />
                <Route
                  path="/difficulties/:domainId"
                  element={<DifficultiesSelection />}
                />
                <Route path="/summary" element={<Summary />} />
                <Route path="/practice" element={<Practice />} />
                <Route path="/test-json" element={<TestJson />} />
                <Route path="/analyze-loading" element={<AnalyzeLoadingPage />} />
                <Route path="/analyze" element={<AnalyzePage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </QuestionBankProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
