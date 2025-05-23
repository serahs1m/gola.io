// src/pages/Practice.tsx - 상세 디버깅 + OR 조건 필터 설명 반영

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Badge } from "@/components/ui/badge";
  import { useQuestionBank } from "@/context/QuestionBankContext";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  
  const Practice = () => {
    const { filteredQuestions, skillDifficulties } = useQuestionBank();
    const navigate = useNavigate();
  
    const [idx, setIdx] = useState(0);
    const [input, setInput] = useState("");
    const [feedback, setFeedback] = useState("");
    const [incorrect, setIncorrect] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
  
    useEffect(() => {
      console.log("🧠 skillDifficulties (선택된 조건들):", skillDifficulties);
      console.log("✅ 필터된 문제 수:", filteredQuestions.length);
  
      if (filteredQuestions.length > 0) {
        console.log("📌 첫 문제:", filteredQuestions[0]);
      } else {
        console.warn("❌ 필터 결과 없음: skill 이름이 정확히 일치하지 않거나 난이도 매칭 실패일 수 있습니다.");
        console.warn("🧪 JSON에서 사용하는 skill 예시:", "'Linear inequalities in one or two variables' (← 줄바꿈/공백 없음?)");
      }
  
      if (filteredQuestions.length === 0) {
        navigate("/");
      }
    }, [filteredQuestions, skillDifficulties, navigate]);
  
    if (filteredQuestions.length === 0) return null;
  
    const q = filteredQuestions[idx];
  
    const check = () => {
      if (input.trim() === q.answer.trim()) {
        setFeedback("✅ 정답입니다!");
        setShowAnswer(true);
      } else {
        setFeedback("❌ 다시 생각해 보세요.");
        setIncorrect((c) => c + 1);
      }
    };
  
    const next = () => {
      setIdx((i) => i + 1);
      setInput("");
      setFeedback("");
      setShowAnswer(false);
      setIncorrect(0);
    };
  
    return (
      <div className="container mx-auto max-w-2xl py-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>{q.question}</span>
              <Badge variant="secondary">{q.difficulty}</Badge>
            </CardTitle>
          </CardHeader>
  
          <CardContent className="space-y-4">
            <Input
              placeholder="정답 입력"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && check()}
            />
  
            <Button onClick={check}>정답 확인</Button>
  
            {feedback && <p>{feedback}</p>}
  
            {incorrect >= 3 && !showAnswer && (
              <Button variant="outline" onClick={() => setShowAnswer(true)}>
                힌트 보기 🔍
              </Button>
            )}
  
            {showAnswer && (
              <div className="space-y-2 border-t pt-4">
                <p>
                  <strong>정답:</strong> {q.answer}
                </p>
                <p>
                  <strong>해설:</strong> {q.explanation}
                </p>
                {idx < filteredQuestions.length - 1 ? (
                  <Button onClick={next}>다음 문제 →</Button>
                ) : (
                  <Button onClick={() => navigate("/")}>연습 종료</Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
  
        <p className="text-center text-sm text-muted-foreground">
          {idx + 1} / {filteredQuestions.length}
        </p>
      </div>
    );
  };
  
  export default Practice;
  