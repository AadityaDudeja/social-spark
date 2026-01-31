const PixelCloud = ({ className = "", delay = 0 }: { className?: string; delay?: number }) => {
  return (
    <div 
      className={`absolute ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <svg 
        width="80" 
        height="48" 
        viewBox="0 0 80 48" 
        className="animate-float"
        style={{ animationDelay: `${delay}s` }}
      >
        {/* Purple base layer */}
        <rect x="16" y="24" width="48" height="8" fill="hsl(280 60% 50%)" />
        <rect x="8" y="32" width="64" height="8" fill="hsl(280 60% 50%)" />
        <rect x="24" y="16" width="32" height="8" fill="hsl(280 60% 50%)" />
        
        {/* Pink/orange highlights */}
        <rect x="24" y="8" width="8" height="8" fill="hsl(330 100% 60%)" />
        <rect x="48" y="8" width="8" height="8" fill="hsl(330 100% 60%)" />
        <rect x="16" y="16" width="8" height="8" fill="hsl(330 100% 60%)" />
        <rect x="56" y="16" width="8" height="8" fill="hsl(330 100% 60%)" />
        
        {/* Golden top highlights */}
        <rect x="32" y="8" width="16" height="8" fill="hsl(45 100% 60%)" />
      </svg>
    </div>
  );
};

export default PixelCloud;
