import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

export default function SignIn() {
  // Step: EMAIL or PASSWORD
  const [step, setStep] = useState<"EMAIL" | "PASSWORD">("EMAIL");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Always reset to EMAIL step on mount
  useEffect(() => {
    setStep("EMAIL");
    setEmail("");
    setPassword("");
  }, []);

  const handleContinue = () => {
    if (!email.trim()) return;
    setStep("PASSWORD");
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        handleSignUp(); // fallback to sign up
      } else {
        console.error(err);
      }
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-semibold text-center tracking-tight">
          {step === "EMAIL" ? "다시 오신 걸 환영합니다" : "비밀번호를 입력하세요"}
        </h1>

        {/* EMAIL STEP */}
        {step === "EMAIL" && (
          <>
            <input
              type="email"
              autoFocus
              placeholder="이메일 주소"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleContinue}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-md transition"
            >
              계속
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="px-3 text-xs text-gray-400">또는</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>

            <SocialBtn
              icon={<FcGoogle size={20} />}
              label="Google로 계속하기"
              onClick={handleGoogleSignIn}
            />
            <SocialBtn
              icon={<FaApple size={18} />}
              label="Apple로 계속하기"
              disabled
            />
            <SocialBtn
              icon={<FiPhone size={18} />}
              label="폰으로 계속하기"
              disabled
            />

            <p className="text-center text-xs text-gray-500">
              이미 계정이 있으신가요?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => setStep("PASSWORD")}
              >
                로그인
              </span>
            </p>
          </>
        )}

        {/* PASSWORD STEP */}
        {step === "PASSWORD" && (
          <>
            <input
              type="password"
              placeholder="비밀번호"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleEmailSignIn}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-md transition"
            >
              로그인
            </button>

            <button
              onClick={handleSignUp}
              className="w-full mt-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-md text-sm font-medium"
            >
              새 계정 만들기
            </button>

            <p
              className="mt-6 text-xs text-gray-500 cursor-pointer hover:underline text-center"
              onClick={() => setStep("EMAIL")}
            >
              ← 다른 이메일 사용
            </p>
          </>
        )}
      </div>
    </div>
  );
}

interface SocialBtnProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

function SocialBtn({ icon, label, onClick, disabled }: SocialBtnProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center gap-2 border border-gray-300 rounded-md py-2.5 px-4 mb-2
                 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
    >
      {icon}
      <span className="flex-grow text-sm font-medium text-center">{label}</span>
    </button>
  );
}
