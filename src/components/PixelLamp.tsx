const PixelLamp = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`${className}`}>
      <svg width="60" height="120" viewBox="0 0 60 120">
        {/* Lamp post */}
        <rect x="26" y="30" width="8" height="90" fill="hsl(280 60% 40%)" />
        
        {/* Lamp head curve */}
        <rect x="10" y="20" width="8" height="8" fill="hsl(280 60% 50%)" />
        <rect x="18" y="12" width="24" height="8" fill="hsl(280 60% 50%)" />
        <rect x="42" y="20" width="8" height="8" fill="hsl(280 60% 50%)" />
        
        {/* Light glow effect */}
        <polygon 
          points="15,28 10,80 50,80 45,28" 
          fill="hsl(45 100% 60%)" 
          opacity="0.3"
          className="animate-pulse-glow"
        />
        
        {/* Light dots */}
        <rect x="20" y="35" width="4" height="4" fill="hsl(45 100% 70%)" className="animate-pulse-glow" />
        <rect x="28" y="45" width="4" height="4" fill="hsl(45 100% 70%)" className="animate-pulse-glow" />
        <rect x="36" y="40" width="4" height="4" fill="hsl(45 100% 70%)" className="animate-pulse-glow" />
        <rect x="24" y="55" width="4" height="4" fill="hsl(45 100% 70%)" className="animate-pulse-glow" />
        <rect x="32" y="60" width="4" height="4" fill="hsl(45 100% 70%)" className="animate-pulse-glow" />
      </svg>
    </div>
  );
};

export default PixelLamp;
