import { useState } from "react";
import PaperBrowser from "./components/PaperBrowser";
import TranslationView from "./components/TranslationView";
import QuizView from "./components/QuizView";
import HeroSection from "./components/HeroSection";
import "./App.css";

export default function App() {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [audience, setAudience] = useState("kid");
  const [quizMode, setQuizMode] = useState(false);
  const [view, setView] = useState("home"); // home | browse | translate | quiz

  const handlePaperSelect = (paper) => {
    setSelectedPaper(paper);
    setTranslation(null);
    setQuizMode(false);
    setView("translate");
  };

  const handleTranslationDone = (result) => {
    setTranslation(result);
  };

  const handleQuiz = () => {
    setView("quiz");
  };

  const handleBack = () => {
    if (view === "quiz") { setView("translate"); }
    else if (view === "translate") { setView("browse"); }
    else { setView("home"); }
  };

  return (
    <div className="app">
      {view === "home" && (
        <HeroSection onStart={() => setView("browse")} />
      )}
      {view === "browse" && (
        <PaperBrowser
          onSelect={handlePaperSelect}
          audience={audience}
          setAudience={setAudience}
          onBack={() => setView("home")}
        />
      )}
      {view === "translate" && selectedPaper && (
        <TranslationView
          paper={selectedPaper}
          audience={audience}
          translation={translation}
          onTranslated={handleTranslationDone}
          onQuiz={handleQuiz}
          onBack={handleBack}
        />
      )}
      {view === "quiz" && translation && (
        <QuizView
          paper={selectedPaper}
          translation={translation}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
