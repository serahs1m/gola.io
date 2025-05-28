import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2Icon, ChevronLeft, ChevronRight } from "lucide-react";
import { Question } from "@/data/question";
import { FeedbackSection } from "@/components/ui/FeedbackSection";
import { MessageSquare } from "lucide-react";

/* ─── 타입 ───────────────────────────────────────────── */
type WeakSkill = { skill: string; count: number; tip: string };

interface GPTResponse {
  summary: string;
  weakSkills: WeakSkill[];
  similar: Question[];
}

/* ─── 환경변수에서 API 키 ────────────────────────────── */
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
console.log("🔐 API KEY:", apiKey);          //  ← 개발용(배포 전 삭제)

/* ─── 컴포넌트 ───────────────────────────────────────── */
const AnalyzePage: React.FC = () => {
  /* ① 이전 페이지에서 넘어온 오답 리스트 */
  const { state } = useLocation();
  const wrongQuestions: Question[] = state?.wrongQuestions ?? [];

  /* ② UI 상태 */
  const [showModal, setShowModal] = useState(true);     // 무료/유료 선택 팝업
  const [includeExtra, setIncludeExtra] = useState(false); // true: 유료(추가 문제)
  const [loading, setLoading] = useState(false);        // GPT 요청 중

  /* ③ GPT 결과 */
  const [analysis, setAnalysis] = useState<GPTResponse | null>(null);

  /* ④ 슬라이더 인덱스 */
  const [idx, setIdx] = useState(0);

  /* ─── GPT 호출 ────────────────────────────────────── */
  useEffect(() => {
    if (showModal) return;          // 팝업이 열려 있으면 대기
    setLoading(true);

    const fetchAnalysis = async () => {
      const similarCnt = includeExtra ? wrongQuestions.length * 2 : 0;

      const prompt = `
You are an SAT Math expert. Respond ONLY with valid JSON.

JSON shape:
{
  "summary": "...",
  "weakSkills": [ { "skill":"...", "count":2, "tip":"..."} ],
  "similar": [
     { "id":1,"domain":"...","difficulty":"Easy","skill":"...",
       "question":"...","answer":"...","explanation":"..." }
  ]
}
/* If no similar questions, return "similar": [] */

Wrong questions:
${wrongQuestions
  .map(
    (q, i) =>
      `${i + 1}. (${q.skill} / ${q.difficulty}) ${q.question} -> ${q.answer}`
  )
  .join("\n")}

Generate exactly ${similarCnt} similar questions.
Each similar question must match the same domain, skill & difficulty.
`;

      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
          }),
        });

        const raw = (await res.json()).choices?.[0]?.message?.content ?? "{}";
        console.log("🧠 GPT raw:", raw);

        /* GPT가 ```json ... ``` 래퍼를 붙여 올 가능성 제거 */
        const cleaned = raw.replace(/```json|```/g, "").trim();
        const parsed: GPTResponse = JSON.parse(cleaned);
        setAnalysis(parsed);
      } catch (e) {
        console.error("❌ GPT fetch/parse error:", e);
        setAnalysis({
          summary: "⚠️ Unable to load analysis. Please try again later.",
          weakSkills: [],
          similar: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [showModal, includeExtra, wrongQuestions]);

  /* ─── ① 로딩 중 화면 ─────────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2Icon className="animate-spin h-12 w-12 text-muted-foreground" />
        <p className="text-xl font-medium text-muted-foreground">
          Analyzing…
        </p>
      </div>
    );
  }

  /* ─── ② 팝업만 보여줘야 할 때 ─────────────────────── */
  if (showModal) {
    return (
      <>
        {/* 빈 배경 유지 */}
        <div className="min-h-screen" />
        <ChoiceModal
          onFree={() => {
            setIncludeExtra(false);
            setShowModal(false);
          }}
          onPaid={() => {
            setIncludeExtra(true);
            setShowModal(false);
          }}
        />
      </>
    );
  }

  /* ─── ③ 분석 실패 fallback ───────────────────────── */
  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">
          ⚠️ Unable to load analysis. Please try again later.
        </p>
      </div>
    );
  }

  /* ─── ④ 정상 화면 ───────────────────────────────── */
  return (
    <div className="container mx-auto py-10 space-y-10">
      <ChoiceModal
        open={false}                    /* 이미 닫힘 */
        onFree={() => {}}
        onPaid={() => {}}
      />

      {/* 헤드라인 */}
      <h1 className="text-4xl font-semibold leading-tight text-center text-gray-800 mb-6">
  Analysis Result
</h1>


<Card className="mb-6 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
  <CardHeader>
    <CardTitle className="flex items-center gap-2 text-blue-700">
      <MessageSquare className="h-5 w-5" />
      Personalized Feedback
    </CardTitle>
  </CardHeader>

  <CardContent>
    {/* Feedback summary */}
    <div className="p-4 bg-white rounded-lg border-l-4 border-blue-400 mb-6">
      <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
    </div>

    {/* Weak skill cards inside one card */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {analysis.weakSkills.map((ws, i) => (
        <div key={i} className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-red-300">
          <h3 className="font-semibold text-gray-800 mb-1">{ws.skill}</h3>
          <p className="text-sm text-gray-600 mb-1">
            <strong className="text-red-500">Incorrects:</strong> {ws.count}
          </p>
          <p className="text-sm text-blue-700">
            <strong>Tip:</strong> {ws.tip}
          </p>
        </div>
      ))}
    </div>
  </CardContent>
</Card>


      {/* 틀린 문제 슬라이더 */}
      <Card className="mb-6 border-0 shadow-lg bg-white">
  <CardHeader>
    <CardTitle className="text-blue-700 text-xl font-bold flex items-center gap-2">
      ❌ Incorrect Questions
    </CardTitle>
  </CardHeader>
  <CardContent>
    <WrongSlider
      wrongQuestions={wrongQuestions}
      idx={idx}
      setIdx={setIdx}
    />
  </CardContent>
</Card>


      {/* 추가 문제 (유료) */}
      {includeExtra && analysis.similar.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Recommended Practice</h2>
          {analysis.similar.map((q) => (
            <Card key={q.id} className="p-4 space-y-2">
              <p className="font-medium">{q.question}</p>
              <details>
                <summary className="cursor-pointer text-blue-600">
                  Show answer &amp; explanation
                </summary>
                <p className="mt-2">
                  <strong>Answer:</strong> {q.answer}
                </p>
                <p className="text-sm text-muted-foreground">
                  {q.explanation}
                </p>
              </details>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── 하위 컴포넌트들 ───────────────────────────────── */

/* 팝업 */
interface ChoiceModalProps {
  open?: boolean;
  onFree: () => void;
  onPaid: () => void;
}
const ChoiceModal: React.FC<ChoiceModalProps> = ({
  open = true,
  onFree,
  onPaid,
}) => (
  <AlertDialog open={open}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Upgrade your insights?</AlertDialogTitle>
        <p className="text-muted-foreground">
          You can view a summary and weakness analysis for free. 
          Log in to receive personalized practice questions as well.
        </p>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onFree}>Free analysis</AlertDialogCancel>
        <AlertDialogAction onClick={onPaid}>
          Log in for Extra Practice
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

/* 슬라이더 */
interface SliderProps {
  wrongQuestions: Question[];
  idx: number;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
}
const WrongSlider: React.FC<SliderProps> = ({ wrongQuestions, idx, setIdx }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold">Your incorrect questions</h2>
    <div className="flex items-center">
      <Button
        size="icon"
        variant="outline"
        disabled={idx === 0}
        onClick={() => setIdx((i) => i - 1)}
        className={wrongQuestions.length <= 1 ? "invisible" : ""}
      >
        <ChevronLeft />
      </Button>
      <Card className="flex-1 mx-4 p-4">
        <p className="font-medium mb-2">{wrongQuestions[idx].question}</p>
        <p>
          <strong>Answer:</strong> {wrongQuestions[idx].answer}
        </p>
        <p className="text-sm text-muted-foreground">
          Skill: {wrongQuestions[idx].skill}
        </p>
      </Card>
      <Button
        size="icon"
        variant="outline"
        disabled={idx === wrongQuestions.length - 1}
        onClick={() => setIdx((i) => i + 1)}
      >
        <ChevronRight />
      </Button>
    </div>
    <p className="text-center text-sm text-muted-foreground">
      {idx + 1} / {wrongQuestions.length}
    </p>
  </div>
);

export default AnalyzePage;
