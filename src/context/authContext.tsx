// src/context/authContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../data/firebase";

// 타입 정의
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

// Context 생성
const AuthContext = createContext<AuthContextType | null>(null);

// Provider 컴포넌트
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 🔹 로딩 상태 추가

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false); // 🔹 상태 판별이 끝나면 false로 전환
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


(window as any).auth = auth;