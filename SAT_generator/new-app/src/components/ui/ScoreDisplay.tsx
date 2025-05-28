import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ScoreDisplayProps {
  score: number;
  totalQuestions: number;
  percentage: number;
}

export const ScoreDisplay = ({ score, totalQuestions, percentage }: ScoreDisplayProps) => {
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getCircleColor = (percentage: number) => {
    if (percentage >= 80) return "stroke-green-500";
    if (percentage >= 60) return "stroke-yellow-500";
    return "stroke-red-500";
  };

  return (
    <Card className="mb-6 border-0 shadow-lg bg-white">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Circular Score Display */}
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={`${percentage * 2.51} 251`}
                className={getCircleColor(percentage)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-3xl font-bold ${getScoreColor(percentage)}`}>
                {percentage}%
              </span>
            </div>
          </div>

          {/* Score Details */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              {score} / {totalQuestions}
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Questions Answered Correctly
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Correct: {score}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Incorrect: {totalQuestions - score}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
