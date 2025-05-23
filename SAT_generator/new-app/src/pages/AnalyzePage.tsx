import { useLocation } from "react-router-dom";

const AnalyzePage = () => {
  const location = useLocation();
  const { wrongQuestions } = location.state || { wrongQuestions: [] };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">🧠 Analysis Result</h1>
      <p className="text-muted-foreground mb-6">
        Based on your mistakes, here are some recommendations:
      </p>
      <ul className="space-y-4">
        {wrongQuestions.map((q, i) => (
          <li key={i} className="border p-4 rounded">
            <p><strong>Q:</strong> {q.question}</p>
            <p><strong>A:</strong> {q.answer}</p>
            <p className="text-sm text-muted-foreground">Skill: {q.skill}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalyzePage;
