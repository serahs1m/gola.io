
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface FeedbackSectionProps {
  feedback: string;
}

export const FeedbackSection = ({ feedback }: FeedbackSectionProps) => {
  return (
    <Card className="mb-6 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <MessageSquare className="h-5 w-5" />
          Personalized Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-white rounded-lg border-l-4 border-blue-400">
          <p className="text-gray-700 leading-relaxed">{feedback}</p>
        </div>
      </CardContent>
    </Card>
  );
};
