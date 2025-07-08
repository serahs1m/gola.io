import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "@fontsource/space-grotesk"; // 기본 400
import "@fontsource/space-grotesk/700.css"; // bold 텍스트에 사용


createRoot(document.getElementById("root")!).render(<App />);
