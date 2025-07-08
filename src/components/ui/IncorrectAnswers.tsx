import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface IncorrectAnswer {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation?: string;
}

interface IncorrectAnswersProps {
  incorrectAnswers: IncorrectAnswer[];
}

export const IncorrectAnswers = ({ incorrectAnswers }: IncorrectAnswersProps) => {
  return (
    <Card className="mb-6 border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          Review Incorrect Answers ({incorrectAnswers.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {incorrectAnswers.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 bg-red-50/30">
              <h3 className="font-semibold text-gray-800 mb-4">
                Question {index + 1}: {item.question}
              </h3>
              
              <div className="space-y-3">
                {/* User's Answer */}
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <Badge variant="destructive" className="mb-1">Your Answer</Badge>
                    <p className="text-gray-700">{item.userAnswer}</p>
                  </div>
                </div>
                
                {/* Correct Answer */}
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <Badge variant="default" className="mb-1 bg-green-600">Correct Answer</Badge>
                    <p className="text-gray-700 font-medium">{item.correctAnswer}</p>
                  </div>
                </div>
                
                {/* Explanation */}
                {item.explanation && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm text-blue-800">
                      <strong>Explanation:</strong> {item.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
