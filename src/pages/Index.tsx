import { useState } from "react";
import PixelCloud from "@/components/PixelCloud";
import PixelLamp from "@/components/PixelLamp";
import PixelBench from "@/components/PixelBench";
import PixelHeart from "@/components/PixelHeart";
import SituationForm, { SituationData } from "@/components/SituationForm";
import ResultDisplay, { AnalysisResult } from "@/components/ResultDisplay";
import { analyzeSituation } from "@/lib/analyzer";

const Index = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (data: SituationData) => {
    setIsLoading(true);
    try {
      const analysis = await analyzeSituation(data);
      setResult(analysis);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative Pixel Clouds */}
      <PixelCloud className="top-8 left-8" delay={0} />
      <PixelCloud className="top-12 right-12" delay={0.5} />
      <PixelCloud className="top-4 left-1/3" delay={1} />
      <PixelCloud className="top-20 right-1/4" delay={1.5} />

      {/* Floating Hearts */}
      <div className="absolute top-1/4 left-4 text-primary animate-float" style={{ animationDelay: "0.5s" }}>
        <PixelHeart size={24} />
      </div>
      <div className="absolute top-1/3 right-8 text-secondary animate-float" style={{ animationDelay: "1s" }}>
        <PixelHeart size={20} />
      </div>
      <div className="absolute bottom-1/3 left-12 text-accent animate-float" style={{ animationDelay: "1.5s" }}>
        <PixelHeart size={28} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 pb-48">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="font-pixel text-2xl md:text-4xl text-primary text-glow-pink mb-4">
            SHOULD I SAY HI?
          </h1>
          <p className="font-pixel text-xs md:text-sm text-accent text-glow-gold max-w-2xl mx-auto">
            FROM "GOOD NIGHT" TO "HAD A GREAT NIGHT" — WE'VE GOT YOU
          </p>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            The ultimate decision-support system for those heart-pounding moments 
            when you're not sure if you should just... say hi. 💘
          </p>
        </header>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card/90 backdrop-blur-sm border-2 border-border rounded-lg p-6 md:p-8 shadow-glow-purple">
            {!result ? (
              <SituationForm onAnalyze={handleAnalyze} isLoading={isLoading} />
            ) : (
              <ResultDisplay result={result} onReset={handleReset} />
            )}
          </div>
        </div>

        {/* Fun Stats */}
        <div className="mt-12 text-center">
          <p className="font-pixel text-xs text-muted-foreground">
            ✨ POWERED BY ADVANCED ROMANCE ALGORITHMS™ ✨
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            (and absolutely zero scientific basis whatsoever)
          </p>
        </div>
      </div>

      {/* Bottom Scene - Park Bench with Lamps */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none">
        {/* Grass */}
        <div className="h-12 bg-gradient-to-t from-green-800 to-green-600 relative">
          {/* Pixel grass details */}
          <div className="absolute inset-x-0 top-0 h-4 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-4 bg-green-500"
                style={{ left: `${i * 2.5}%`, bottom: 0 }}
              />
            ))}
          </div>
          {/* Flowers */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ 
                left: `${5 + i * 6.5}%`, 
                top: "30%",
                backgroundColor: i % 3 === 0 ? "hsl(330, 100%, 60%)" : i % 3 === 1 ? "hsl(280, 60%, 50%)" : "hsl(45, 100%, 60%)"
              }}
            />
          ))}
        </div>
        
        {/* Scene Elements */}
        <div className="absolute bottom-10 left-1/4 transform -translate-x-1/2">
          <PixelLamp />
        </div>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <PixelBench />
        </div>
        <div className="absolute bottom-10 right-1/4 transform translate-x-1/2">
          <PixelLamp />
        </div>
      </div>
    </div>
  );
};

export default Index;
