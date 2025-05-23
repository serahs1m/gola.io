import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2Icon } from "lucide-react";

const AnalyzeLoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { wrongQuestions } = location.state || { wrongQuestions: [] };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/analyze", { state: { wrongQuestions } });
    }, 2500); // 2.5초 후 이동

    return () => clearTimeout(timer);
  }, [navigate, wrongQuestions]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <Loader2Icon className="animate-spin h-12 w-12 text-muted-foreground" />
      <p className="text-xl font-medium text-muted-foreground">Analyzing your mistakes...</p>
    </div>
  );
};

export default AnalyzeLoadingPage;
