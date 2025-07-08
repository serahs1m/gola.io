// src/pages/Practice.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestionBank } from "@/context/QuestionBankContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question } from "@/data/question"; // 경로 확인

const Practice = () => {
  const { filteredQuestions } = useQuestionBank();
  const navigate = useNavigate();

  /* ───────────── state ───────────── */
  const [idx, setIdx] = useState(0);
  const [textAnswer, setTextAnswer] = useState("");     // Math 입력
  const [choiceAnswer, setChoiceAnswer] = useState(""); // Reading 선택
  const [attempts, setAttempts] = useState(0);          // 오답 횟수
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);      // Hint 표시 여부
  const [showAnswer, setShowAnswer] = useState(false);  // 정답 표시 여부
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);
  const [startTime] = useState<Date>(new Date());
  const [elapsed, setElapsed] = useState("0m 0s");

  /* ───────────── 효과 ───────────── */
  useEffect(() => {
    if (filteredQuestions.length === 0) navigate("/");
  }, [filteredQuestions, navigate]);

  useEffect(() => {
    const t = setInterval(() => {
      const diff = Date.now() - startTime.getTime();
      setElapsed(`${Math.floor(diff / 60000)}m ${Math.floor((diff % 60000) / 1000)}s`);
    }, 1000);
    return () => clearInterval(t);
  }, [startTime]);

  if (filteredQuestions.length === 0) return null;
  const q = filteredQuestions[idx];

  /* ───────────── 핸들러 ───────────── */
  const checkAnswer = () => {
    const userAns = q.choices ? choiceAnswer.toUpperCase() : textAnswer.trim();
    if (userAns === q.answer.trim()) {
      setFeedback("✅ Correct!");
      setShowAnswer(true);          // 정답+해설 표시
    } else {
      setFeedback("❌ Try again.");
      setAttempts(a => a + 1);      // 오답 횟수 증가
      setWrongQuestions(prev => (prev.some(w => w.id === q.id) ? prev : [...prev, q]));
    }
  };

  const nextQuestion = () => {
    setIdx(i => i + 1);
    // 상태 초기화
    setTextAnswer("");
    setChoiceAnswer("");
    setAttempts(0);
    setFeedback("");
    setShowHint(false);
    setShowAnswer(false);
  };

  /* ───────────── JSX ───────────── */
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 space-y-8">
      {/* 상단 정보 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">Practice Questions</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Question {idx + 1} of {filteredQuestions.length}
        </p>
        <p className="text-muted-foreground text-sm mt-1">⏱ Elapsed: {elapsed}</p>
      </div>

      {/* 문제 카드 */}
      <Card className="shadow-md border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex justify-between items-start gap-4">
            <span className="whitespace-pre-line">{q.question}</span>
            <Badge variant="secondary" className="text-sm capitalize">
              {q.difficulty}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 입력 or 4지선다 */}
          {q.choices ? (
            <RadioGroup
              value={choiceAnswer}
              onValueChange={setChoiceAnswer}
              className="space-y-2"
            >
              {["A", "B", "C", "D"].map((label, i) => (
                <label
                  key={label}
                  className="flex items-start gap-3 border rounded-lg p-3 hover:bg-muted cursor-pointer"
                >
                  <RadioGroupItem value={label} />
                  <span className="text-base">
                    <strong>{label}.</strong> {q.choices![i]}
                  </span>
                </label>
              ))}
            </RadioGroup>
          ) : (
            <Input
              placeholder="Type your answer here"
              value={textAnswer}
              onChange={e => setTextAnswer(e.target.value)}
              onKeyDown={e => e.key === "Enter" && checkAnswer()}
            />
          )}

          <Button onClick={checkAnswer} className="w-full sm:w-auto">
            Check Answer
          </Button>

          {/* 피드백 */}
          {feedback && (
            <p
              className={`font-medium ${
                feedback.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback}
            </p>
          )}

          {/* 2회 이상 오답이면 Hint 버튼 */}
          {attempts >= 2 && !showHint && !showAnswer && (
            <Button
              variant="outline"
              onClick={() => setShowHint(true)}
              className="w-full sm:w-auto"
            >
              Show Hint 🔍
            </Button>
          )}

          {/* Hint만 표시 (아직 정답 전) */}
          {showHint && !showAnswer && (
            <div className="border-t pt-4 text-base text-muted-foreground">
              <strong>Explanation (Hint):</strong> {q.explanation}
            </div>
          )}

          {/* 정답·해설 표시 */}
          {showAnswer && (
            <div className="space-y-2 border-t pt-4">
              <p className="text-base">
                <strong className="text-muted-foreground">Answer:</strong> {q.answer}
              </p>
              <p className="text-base whitespace-pre-line">
                <strong className="text-muted-foreground">Explanation:</strong> {q.explanation}
              </p>

              {idx < filteredQuestions.length - 1 ? (
                <Button onClick={nextQuestion} className="mt-4">
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
        Need help? Review concepts before retrying.
      </div>
    </div>
  );
};

export default Practice;
