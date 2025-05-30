import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestionBank } from "@/context/QuestionBankContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Question } from "@/data/question";

const Practice = () => {
  const { filteredQuestions } = useQuestionBank();
  const navigate = useNavigate();

  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [incorrect, setIncorrect] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);
  const [startTime] = useState<Date>(new Date());
  const [elapsed, setElapsed] = useState("0m 0s");

  useEffect(() => {
    if (filteredQuestions.length === 0) {
      console.warn("❌ No matching questions.");
      navigate("/");
    }
  }, [filteredQuestions, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diffMs = now.getTime() - startTime.getTime();
      const minutes = Math.floor(diffMs / 60000);
      const seconds = Math.floor((diffMs % 60000) / 1000);
      setElapsed(`${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  if (filteredQuestions.length === 0) return null;

  const currentQuestion: Question | undefined = filteredQuestions[idx];
  if (!currentQuestion) return null;

  const addToWrongQuestions = (question: Question) => {
    setWrongQuestions(prev =>
      prev.some(w => w.id === question.id) ? prev : [...prev, question]
    );
  };

  const check = () => {
    if (input.trim() === currentQuestion.answer.trim()) {
      setFeedback("✅ Correct!");
      setShowAnswer(true);
    } else {
      setFeedback("❌ Try again.");
      setIncorrect(c => c + 1);
      addToWrongQuestions(currentQuestion);
    }
  };

  const next = () => {
    setIdx(i => i + 1);
    setInput("");
    setFeedback("");
    setShowAnswer(false);
    setIncorrect(0);
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Practice Questions</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Question {idx + 1} of {filteredQuestions.length}
        </p>
        <p className="text-muted-foreground text-sm mt-1">⏱ Elapsed: {elapsed}</p>
      </div>

      <Card className="shadow-md border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex justify-between items-center">
            <span>{currentQuestion.question}</span>
            <Badge variant="secondary" className="text-sm capitalize">
              {currentQuestion.difficulty}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Type your answer here"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && check()}
            className="text-base"
          />

          <Button onClick={check} className="w-full sm:w-auto">
            Check Answer
          </Button>

          {feedback && (
            <p
              className={`font-medium ${
                feedback.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback}
            </p>
          )}

          {incorrect >= 3 && !showAnswer && (
            <Button
              variant="outline"
              onClick={() => setShowAnswer(true)}
              className="w-full sm:w-auto"
            >
              Show Hint 🔍
            </Button>
          )}

          {showAnswer && (
            <div className="space-y-2 border-t pt-4">
              <p className="text-base">
                <strong className="text-muted-foreground">Answer:</strong> {currentQuestion.answer}
              </p>
              <p className="text-base">
                <strong className="text-muted-foreground">Explanation:</strong> {currentQuestion.explanation}
              </p>

              {idx < filteredQuestions.length - 1 ? (
                <Button onClick={next} className="mt-4">
                  Next Question →
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    navigate("/analyze-loading", { state: { wrongQuestions } })
                  }
                  className="mt-4"
                >
                  Finish Practice & Analyze
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Need help? Review concepts before retrying.</p>
      </div>
    </div>
  );
};

export default Practice;
