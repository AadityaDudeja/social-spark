import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PixelHeart from "./PixelHeart";

interface SituationFormProps {
  onAnalyze: (data: SituationData) => void;
  isLoading: boolean;
}

export interface SituationData {
  situation: string;
  relationship: string;
  location: string;
  theirMood: string;
  yourConfidence: string;
}

const funnyPlaceholders = [
  "They smiled at me yesterday... or was that gas? Hard to tell.",
  "We made eye contact for 0.3 seconds. Wedding vibes?",
  "They said 'excuse me' when I blocked the hallway. LOVE IS REAL.",
  "Their Instagram story had a sunset. We're basically soulmates.",
  "They laughed at my joke. Nervous laugh? Pity laugh? WHO KNOWS.",
];

const SituationForm = ({ onAnalyze, isLoading }: SituationFormProps) => {
  const [situation, setSituation] = useState("");
  const [relationship, setRelationship] = useState("");
  const [location, setLocation] = useState("");
  const [theirMood, setTheirMood] = useState("");
  const [yourConfidence, setYourConfidence] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation.trim()) return;
    
    onAnalyze({
      situation,
      relationship: relationship || "stranger",
      location: location || "unknown",
      theirMood: theirMood || "neutral",
      yourConfidence: yourConfidence || "medium",
    });
  };

  const randomPlaceholder = funnyPlaceholders[Math.floor(Math.random() * funnyPlaceholders.length)];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
      <div className="space-y-2">
        <label className="font-pixel text-xs text-primary text-glow-pink">
          DESCRIBE THE SITUATION
        </label>
        <Textarea
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          placeholder={randomPlaceholder}
          className="min-h-[120px] bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:shadow-glow-pink transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="font-pixel text-xs text-secondary">RELATIONSHIP</label>
          <Select value={relationship} onValueChange={setRelationship}>
            <SelectTrigger className="bg-input border-2 border-border focus:border-primary">
              <SelectValue placeholder="Who are they?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="crush">💘 Crush (help)</SelectItem>
              <SelectItem value="stranger">👀 Stranger (mysterious)</SelectItem>
              <SelectItem value="acquaintance">🤝 Acquaintance</SelectItem>
              <SelectItem value="friend">🫂 Friend</SelectItem>
              <SelectItem value="ex">💀 Ex (danger zone)</SelectItem>
              <SelectItem value="celebrity">⭐ Celebrity (dream big)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="font-pixel text-xs text-secondary">LOCATION</label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="bg-input border-2 border-border focus:border-primary">
              <SelectValue placeholder="Where is this?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="office">🏢 Office (professional awkwardness)</SelectItem>
              <SelectItem value="cafe">☕ Café (rom-com energy)</SelectItem>
              <SelectItem value="gym">💪 Gym (sweaty greeting)</SelectItem>
              <SelectItem value="party">🎉 Party (liquid courage nearby)</SelectItem>
              <SelectItem value="street">🚶 Street (speed matters)</SelectItem>
              <SelectItem value="elevator">🛗 Elevator (nowhere to run)</SelectItem>
              <SelectItem value="online">💬 Online (safety mode)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="font-pixel text-xs text-secondary">THEIR MOOD</label>
          <Select value={theirMood} onValueChange={setTheirMood}>
            <SelectTrigger className="bg-input border-2 border-border focus:border-primary">
              <SelectValue placeholder="How do they look?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="happy">😊 Happy (green light!)</SelectItem>
              <SelectItem value="neutral">😐 Neutral (coin flip)</SelectItem>
              <SelectItem value="busy">😤 Busy (danger!)</SelectItem>
              <SelectItem value="sad">😢 Sad (comfort mode?)</SelectItem>
              <SelectItem value="headphones">🎧 Headphones (universal "no")</SelectItem>
              <SelectItem value="flirty">😏 Flirty (OMG GO)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="font-pixel text-xs text-secondary">YOUR CONFIDENCE</label>
          <Select value={yourConfidence} onValueChange={setYourConfidence}>
            <SelectTrigger className="bg-input border-2 border-border focus:border-primary">
              <SelectValue placeholder="How brave?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="maximum">🦸 MAXIMUM (unstoppable)</SelectItem>
              <SelectItem value="high">💪 High (got this)</SelectItem>
              <SelectItem value="medium">🤷 Medium (need push)</SelectItem>
              <SelectItem value="low">😰 Low (help me)</SelectItem>
              <SelectItem value="underground">🕳️ Underground (send prayers)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={!situation.trim() || isLoading}
        className="w-full py-6 font-pixel text-sm bg-primary text-primary-foreground hover:shadow-glow-pink transition-all duration-300 disabled:opacity-50"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <PixelHeart size={16} className="animate-heart-beat text-primary-foreground" />
            ANALYZING LOVE SIGNALS...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <PixelHeart size={16} className="text-primary-foreground" />
            SHOULD I SAY HI?
            <PixelHeart size={16} className="text-primary-foreground" />
          </span>
        )}
      </Button>
    </form>
  );
};

export default SituationForm;
