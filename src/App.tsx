import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuestionBankProvider } from "./context/QuestionBankContext";
import { AuthProvider } from "./context/authContext.tsx"; // ✅ 확장자 .tsx 제거해도 됩니다

// Pages
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import SkillsSelection from "./pages/SkillsSelection";
import DifficultiesSelection from "./pages/DifficultiesSelection";
import Summary from "./pages/Summary";
import NotFound from "./pages/NotFound";
import Practice from "./pages/Practice";
import TestJson from "./pages/TestJson";
import AnalyzePage from "./pages/AnalyzePage";
import AnalyzeLoadingPage from "./pages/AnalyzeLoadingPage";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import MyPage from "./pages/MyPage";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider> {/* ✅ 한 번만 감싸기 */}
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <QuestionBankProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/index" element={<Index />} />
              <Route path="/skills/:domainId" element={<SkillsSelection />} />
              <Route path="/difficulties/:domainId" element={<DifficultiesSelection />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/test-json" element={<TestJson />} />
              <Route path="/analyze-loading" element={<AnalyzeLoadingPage />} />
              <Route path="/analyze" element={<AnalyzePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </QuestionBankProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
