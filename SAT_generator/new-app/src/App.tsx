import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// ───── Context ─────
import { AuthProvider } from "@/context/AuthContext";
import { QuestionBankProvider } from "@/context/QuestionBankContext";

// ───── Pages ─────
import LandingPage from "@/pages/LandingPage";
import TopDomainIndex from "@/pages/TopDomainIndex";      // Math vs R&W
import SubDomainIndex from "@/pages/SubDomainIndex";      // Category list
import SkillIndex from "@/pages/SkillIndex";              // Skill 선택
import DifficultiesSelection from "@/pages/DifficultiesSelection";
import Summary from "@/pages/Summary";
import Practice from "@/pages/Practice";
import AnalyzePage from "@/pages/AnalyzePage";
import AnalyzeLoadingPage from "@/pages/AnalyzeLoadingPage";
import TestJson from "@/pages/TestJson";
import SignIn from "@/pages/SignIn";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <QuestionBankProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Header가 따로 있다면 여기에서 import 후 삽입 */}
            <div className="pt-[150px]">
              <Routes>
                <Route path="/" element={<LandingPage />} />

                {/* Top-level: Math / Reading-Writing */}
                <Route path="/domains" element={<TopDomainIndex />} />

                {/* 카테고리(서브도메인) 선택 — param 방식 */}
                <Route path="/domains/:domainId" element={<SubDomainIndex />} />

                {/* Skill 선택 */}
                <Route path="/skills/:subDomainId" element={<SkillIndex />} />

                {/* Difficulties → Summary → Practice */}
                <Route
                  path="/difficulties/:subDomainId"
                  element={<DifficultiesSelection />}
                />
                <Route path="/summary" element={<Summary />} />
                <Route path="/practice" element={<Practice />} />

                {/* 기타 도구 · Auth */}
                <Route path="/test-json" element={<TestJson />} />
                <Route path="/analyze-loading" element={<AnalyzeLoadingPage />} />
                <Route path="/analyze" element={<AnalyzePage />} />
                <Route path="/signin" element={<SignIn />} />

                {/* 404 */}
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
