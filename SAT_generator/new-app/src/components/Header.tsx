// src/components/Header.tsx
import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";            // ← firebase 초기화 파일
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user } = useAuth();                // 로그인 상태

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-10 py-4 flex justify-between items-center">
        {/* ─────────── Logo ─────────── */}
        <Link
          to="/"
          className="text-black text-2xl font-medium font-grotesk hover:text-indigo-500 transition-colors"
        >
          Q-Bank
        </Link>

        {/* ─────────── Navigation Links ─────────── */}
        <nav className="hidden md:flex gap-8">
          {[
            { href: "#features", label: "Features" },
            { href: "#specifications", label: "Specifications" },
            { href: "#howto", label: "How-to" },
            { href: "#contact", label: "Contact Us" },
          ].map(({ href, label }) => (
            <NavLink
              key={href}
              to={href}
              className="text-sm font-bold font-grotesk text-black hover:text-indigo-500 transition-colors"
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ─────────── Auth Button ─────────── */}
        {user ? (
          /* 로그인 된 경우 → Sign out */
          <button
            onClick={handleSignOut}
            className="px-5 py-2.5 bg-red-400 rounded-full text-sm font-bold text-white font-grotesk hover:bg-red-500 transition-colors"
          >
            Sign out
          </button>
        ) : (
          /* 비로그인 → Sign in */
          <Link
            to="/signin"
            className="px-5 py-2.5 bg-indigo-400 rounded-full text-sm font-bold text-white font-grotesk hover:bg-indigo-500 flex items-center gap-2 transition-colors"
          >
            Sign in
            <svg
              width="7"
              height="20"
              viewBox="0 0 7 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.01 11.99V8.046l.639.04L.735 13.005 0 12.27 4.914 7.356l.051.639H1.007V6.994l4.994.012v4.982H5.01Z"
                fill="white"
              />
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
}
