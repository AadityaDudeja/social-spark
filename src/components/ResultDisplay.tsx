import { useEffect, useState } from "react";
import PixelHeart from "./PixelHeart";

export interface AnalysisResult {
  probability: number;
  recommendation: "YES" | "OPTIONAL" | "NO";
  reasons: string[];
  dramaticQuote: string;
}

interface ResultDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ResultDisplay = ({ result, onReset }: ResultDisplayProps) => {
  const [animatedProbability, setAnimatedProbability] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = result.probability / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= result.probability) {
        setAnimatedProbability(result.probability);
        clearInterval(timer);
      } else {
        setAnimatedProbability(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [result.probability]);

  const getRecommendationStyle = () => {
    switch (result.recommendation) {
      case "YES":
        return {
          bg: "bg-gradient-to-r from-green-500 to-emerald-400",
          text: "text-foreground",
          glow: "shadow-[0_0_30px_hsl(120_60%_50%/0.5)]",
          emoji: "💚",
          message: "GO FOR IT, CHAMPION! 🏆",
        };
      case "OPTIONAL":
        return {
          bg: "bg-gradient-to-r from-amber-500 to-yellow-400",
          text: "text-foreground",
          glow: "shadow-glow-gold",
          emoji: "💛",
          message: "IT'S A GAMBLE, BRAVE ONE 🎲",
        };
      case "NO":
        return {
          bg: "bg-gradient-to-r from-red-500 to-rose-400",
          text: "text-foreground",
          glow: "shadow-[0_0_30px_hsl(0_72%_50%/0.5)]",
          emoji: "💔",
          message: "RETREAT! LIVE TO HI ANOTHER DAY 🏃",
        };
    }
  };

  const style = getRecommendationStyle();

  const getMeterColor = (prob: number) => {
    if (prob < 40) return "bg-destructive";
    if (prob < 70) return "bg-accent";
    return "bg-green-500";
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Probability Meter */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-pixel text-xs text-muted-foreground">PROBABILITY OF SUCCESS</span>
          <span className="font-pixel text-2xl text-primary text-glow-pink">
            {animatedProbability}%
          </span>
        </div>
        
        <div className="relative h-8 bg-muted rounded-sm overflow-hidden border-2 border-border">
          <div 
            className={`absolute inset-y-0 left-0 ${getMeterColor(result.probability)} transition-all duration-1000`}
            style={{ width: `${animatedProbability}%` }}
          />
          {/* Pixel grid overlay */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(to right, transparent 0%, transparent 12.5%, hsl(var(--background)) 12.5%, hsl(var(--background)) 25%)',
              backgroundSize: '8px 100%'
            }}
          />
        </div>
        
        <div className="flex justify-between text-xs font-pixel">
          <span className="text-destructive">ABORT</span>
          <span className="text-accent">MAYBE?</span>
          <span className="text-green-500">SEND IT</span>
        </div>
      </div>

      {/* Recommendation Card */}
      <div className={`p-6 rounded-lg ${style.bg} ${style.glow} transition-all`}>
        <div className="text-center space-y-2">
          <span className="text-4xl">{style.emoji}</span>
          <h2 className="font-pixel text-lg text-background">
            VERDICT: {result.recommendation}
          </h2>
          <p className="font-pixel text-xs text-background/80">
            {style.message}
          </p>
        </div>
      </div>

      {/* Dramatic Quote */}
      <div className="p-4 bg-card border-2 border-primary rounded-lg shadow-glow-pink">
        <p className="text-center italic text-foreground">
          "{result.dramaticQuote}"
        </p>
        <p className="text-center text-xs text-muted-foreground mt-2">
          — Ancient Wisdom of Love™
        </p>
      </div>

      {/* Reasons */}
      <div className="space-y-3">
        <h3 className="font-pixel text-sm text-secondary">ANALYSIS BREAKDOWN:</h3>
        <ul className="space-y-2">
          {result.reasons.map((reason, index) => (
            <li 
              key={index}
              className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PixelHeart size={16} className="text-primary flex-shrink-0 mt-1" />
              <span className="text-foreground text-sm">{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Try Again Button */}
      <button
        onClick={onReset}
        className="w-full py-4 font-pixel text-sm bg-secondary text-secondary-foreground rounded-lg hover:shadow-glow-purple transition-all duration-300"
      >
        🔄 ANALYZE ANOTHER SITUATION
      </button>
    </div>
  );
};

export default ResultDisplay;
