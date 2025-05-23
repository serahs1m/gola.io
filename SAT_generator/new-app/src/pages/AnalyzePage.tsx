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
import { Card } from "@/components/ui/card";
import { Loader2Icon, ChevronLeft, ChevronRight } from "lucide-react";
import { Question } from "@/data/question";

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
          summary: "⚠️ 분석에 실패했습니다. 잠시 후 다시 시도해 주세요.",
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
      <h1 className="text-3xl font-bold">🧠 Analysis Result</h1>
      <p className="text-lg">{analysis.summary}</p>

      {/* 약점 카드 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {analysis.weakSkills.map((ws, i) => (
          <Card key={i} className="p-4 space-y-1">
            <h3 className="font-semibold">{ws.skill}</h3>
            <p className="text-sm text-muted-foreground">
              Incorrects: {ws.count}
            </p>
            <p className="text-sm">Tip: {ws.tip}</p>
          </Card>
        ))}
      </div>

      {/* 틀린 문제 슬라이더 */}
      <WrongSlider
        wrongQuestions={wrongQuestions}
        idx={idx}
        setIdx={setIdx}
      />

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
          무료로 요약과 약점 분석을 볼 수 있습니다. 로그인하면 추가 맞춤
          문제까지 받아보세요.
        </p>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onFree}>Free analysis</AlertDialogCancel>
        <AlertDialogAction onClick={onPaid}>
          Login &amp; get extra
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
