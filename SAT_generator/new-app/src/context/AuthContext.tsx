// src/context/AuthContext.tsx
import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
  } from "react";
  import {
    User,
    onAuthStateChanged,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import { app } from "@/firebase";           // firebase 초기화 파일
  
  const auth = getAuth(app);
  
  type AuthContextType = {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    logOut: () => Promise<void>;
  };
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    // 로그인 상태 실시간 감지
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (curr) => {
        setUser(curr);
        setLoading(false);
      });
      return unsub;
    }, []);
  
    const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    };
  
    const logOut = () => signOut(auth);
  
    const value: AuthContextType = { user, loading, signInWithGoogle, logOut };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  // 커스텀 훅
  export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
    return ctx;
  };
  