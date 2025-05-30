import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function GoogleLoginButton() {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("✅ 로그인 성공:", user);
    } catch (error) {
      console.error("❌ 로그인 실패:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 font-bold"
    >
      Sign in with Google
    </button>
  );
}
