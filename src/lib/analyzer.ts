import type { SituationData } from "@/components/SituationForm";
import type { AnalysisResult } from "@/components/ResultDisplay";

// Dramatic romantic comedy quotes
const dramaticQuotes = {
  YES: [
    "Fortune favors the bold... and those who actually say hi.",
    "You miss 100% of the shots you don't take. — Wayne Gretzky, probably about love.",
    "Life is too short for awkward elevator silence.",
    "The universe didn't align your paths for you to just... not say hi?!",
    "Every great love story starts with someone brave enough to speak first.",
  ],
  OPTIONAL: [
    "To hi or not to hi... that is the question that keeps you up at night.",
    "Schrodinger's Greeting: You are simultaneously rejected AND loved until you speak.",
    "The risk is real, but so is the potential reward. Choose wisely, grasshopper.",
    "This is giving... main character moment waiting to happen.",
    "The odds are interesting. This could go very right or very wrong.",
  ],
  NO: [
    "Discretion is the better part of valor. Also, headphones mean NO.",
    "There will be other moments. This... is not it, chief.",
    "Strategic retreat is not defeat. It's saving embarrassment for another day.",
    "Read the room. The room is saying 'please don't'.",
    "Some battles are won by never fighting them at all.",
  ],
};

// Comedic reasons based on inputs
const generateReasons = (data: SituationData, probability: number): string[] => {
  const reasons: string[] = [];

  // Relationship-based reasons
  switch (data.relationship) {
    case "crush":
      reasons.push(probability > 50 
        ? "Crush status CONFIRMED. Your heart already made this decision. Brain is just catching up."
        : "Crush-related anxiety detected. Deep breaths. They're just a human (probably)."
      );
      break;
    case "stranger":
      reasons.push("Stranger mode: High mystery factor. Could be your soulmate. Could be an alien. Only one way to find out.");
      break;
    case "ex":
      reasons.push("EX ALERT 🚨 Proceed with extreme caution. Or don't proceed. That's also valid.");
      break;
    case "celebrity":
      reasons.push("Celebrity encounter?! Main character energy detected. YOLO has never been more applicable.");
      break;
    case "friend":
      reasons.push("Friend zone is safe zone. This is a low-risk, high-comfort greeting scenario.");
      break;
    case "acquaintance":
      reasons.push("Acquaintance territory: Socially acceptable to acknowledge their existence. Go for it.");
      break;
  }

  // Location-based reasons
  switch (data.location) {
    case "elevator":
      reasons.push("Elevator = nowhere to run for either of you. Maximum pressure. Maximum opportunity.");
      break;
    case "cafe":
      reasons.push("Café setting: Peak rom-com energy. If there's jazz playing, the universe is SCREAMING at you.");
      break;
    case "gym":
      reasons.push("Gym greeting protocol: Quick nod or 'hey' acceptable. Long conversations while they're mid-rep... not so much.");
      break;
    case "party":
      reasons.push("Party mode: Social barriers lowered. Acceptable to talk to literally anyone. Green light environment.");
      break;
    case "online":
      reasons.push("Online safety net: You can delete the message (within 15 minutes on most platforms). Lower stakes.");
      break;
    case "office":
      reasons.push("Office environment: Professional context. Keep it classy. HR is watching. Probably.");
      break;
    case "street":
      reasons.push("Street encounter: Time is of the essence. It's now or never. Literally.");
      break;
  }

  // Mood-based reasons
  switch (data.theirMood) {
    case "headphones":
      reasons.push("HEADPHONES DETECTED 🎧 Universal sign of 'I am in my own universe, please do not enter.' Major red flag for approach.");
      break;
    case "happy":
      reasons.push("They seem happy! Positive energy radiates approachability. The vibes are vibing.");
      break;
    case "busy":
      reasons.push("Busy mode detected. They might not appreciate interruption. Time your moment wisely, young padawan.");
      break;
    case "flirty":
      reasons.push("FLIRTY VIBES DETECTED 😏 The stars have aligned. The universe is basically pushing you two together. GO. NOW.");
      break;
    case "sad":
      reasons.push("They seem down. A kind greeting could brighten their day. Or make it weird. Tread gently.");
      break;
    case "neutral":
      reasons.push("Neutral expression: The poker face reveals nothing. You're flying blind here, captain.");
      break;
  }

  // Confidence-based reasons
  switch (data.yourConfidence) {
    case "underground":
      reasons.push("Your confidence is below sea level. Maybe start with practicing 'hi' in the mirror first?");
      break;
    case "maximum":
      reasons.push("MAXIMUM CONFIDENCE DETECTED 💪 You could say hi to a brick wall and make it blush. Unstoppable.");
      break;
    case "low":
      reasons.push("Low confidence, but remember: fake it till you make it. Shoulders back. Smile. Pretend you're in a movie.");
      break;
  }

  return reasons.slice(0, 4);
};

// Calculate probability based on all factors
const calculateProbability = (data: SituationData): number => {
  let baseProbability = 50;

  // Relationship modifiers
  const relationshipMods: Record<string, number> = {
    crush: 10, // Crush gives you motivation
    friend: 25,
    acquaintance: 20,
    stranger: 5,
    ex: -20,
    celebrity: -15,
  };
  baseProbability += relationshipMods[data.relationship] || 0;

  // Location modifiers
  const locationMods: Record<string, number> = {
    cafe: 15,
    party: 20,
    online: 15,
    office: 5,
    gym: 0,
    street: -5,
    elevator: -10, // Awkward potential
  };
  baseProbability += locationMods[data.location] || 0;

  // Mood modifiers
  const moodMods: Record<string, number> = {
    flirty: 30,
    happy: 20,
    neutral: 0,
    sad: -5,
    busy: -15,
    headphones: -30,
  };
  baseProbability += moodMods[data.theirMood] || 0;

  // Confidence modifiers (affects execution, not just probability)
  const confidenceMods: Record<string, number> = {
    maximum: 15,
    high: 10,
    medium: 0,
    low: -10,
    underground: -20,
  };
  baseProbability += confidenceMods[data.yourConfidence] || 0;

  // Add some randomness for comedy
  baseProbability += Math.floor(Math.random() * 10) - 5;

  // Clamp between 5 and 95
  return Math.max(5, Math.min(95, baseProbability));
};

export const analyzeSituation = (data: SituationData): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    // Simulate "dramatic thinking time"
    setTimeout(() => {
      const probability = calculateProbability(data);
      
      let recommendation: "YES" | "OPTIONAL" | "NO";
      if (probability >= 70) {
        recommendation = "YES";
      } else if (probability >= 40) {
        recommendation = "OPTIONAL";
      } else {
        recommendation = "NO";
      }

      const quotes = dramaticQuotes[recommendation];
      const dramaticQuote = quotes[Math.floor(Math.random() * quotes.length)];

      const reasons = generateReasons(data, probability);

      resolve({
        probability,
        recommendation,
        reasons,
        dramaticQuote,
      });
    }, 2000); // 2 second dramatic pause
  });
};
