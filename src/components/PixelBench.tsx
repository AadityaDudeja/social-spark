const PixelBench = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`${className}`}>
      <svg width="120" height="60" viewBox="0 0 120 60">
        {/* Bench seat planks */}
        <rect x="10" y="20" width="100" height="8" fill="hsl(25 60% 35%)" />
        <rect x="10" y="30" width="100" height="8" fill="hsl(25 60% 30%)" />
        
        {/* Bench legs */}
        <rect x="20" y="40" width="8" height="20" fill="hsl(25 60% 25%)" />
        <rect x="92" y="40" width="8" height="20" fill="hsl(25 60% 25%)" />
        
        {/* Armrests */}
        <rect x="8" y="10" width="8" height="30" fill="hsl(25 60% 40%)" />
        <rect x="104" y="10" width="8" height="30" fill="hsl(25 60% 40%)" />
        
        {/* Highlight */}
        <rect x="10" y="20" width="100" height="2" fill="hsl(25 60% 50%)" />
      </svg>
    </div>
  );
};

export default PixelBench;
