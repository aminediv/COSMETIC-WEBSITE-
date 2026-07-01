import React from 'react';

interface TornPaperDividerProps {
  /** The color of the torn paper itself (the path) */
  fillColor: 'warm-white' | 'cream-100' | 'cream-200' | 'sage-800';
  /** The background color behind the divider to prevent flickering and ensure seamless blending */
  bgColor?: 'warm-white' | 'cream-100' | 'cream-200' | 'sage-800' | 'transparent';
  /** Whether the torn edge is at the top of a section (pointing up) or the bottom (pointing down) */
  position?: 'top' | 'bottom';
  /** The specific hand-crafted botanical illustration style to render */
  botanicalVariant?: 'fern' | 'rose' | 'neroli' | 'argan' | 'none';
  className?: string;
}

const BotanicalDecoration = ({
  variant,
  side,
  fillColor,
  bgColor,
  position
}: {
  variant: 'fern' | 'rose' | 'neroli' | 'argan' | 'none';
  side: 'left' | 'right';
  fillColor: string;
  bgColor: string;
  position: 'top' | 'bottom';
}) => {
  if (variant === 'none') return null;

  const targetBg = position === 'top' ? bgColor : fillColor;
  const isDark = targetBg === 'sage-800';
  // Use ultra-low opacity so it is an elegant, whispering visual layer
  const colorClass = isDark ? 'text-warm-white/[0.04]' : 'text-sage-800/[0.06]';

  // Render different SVG paths for each organic variant
  const renderPath = () => {
    switch (variant) {
      case 'rose':
        return (
          <>
            {/* Elegant curving Rose Stem */}
            <path
              d="M30,170 Q45,110 35,60 T75,15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Thorns */}
            <path d="M38,135 L33,131 L38,128 Z" fill="currentColor" />
            <path d="M41,95 L46,91 L41,88 Z" fill="currentColor" />
            {/* Delicate Rose Bud at the tip */}
            <g transform="translate(68,10) scale(0.95)">
              <path d="M5,10 C-3,12 -8,2 -3,-5 C2,-12 12,-10 13,-2 C14,6 8,8 5,10 Z" fill="currentColor" />
              <path d="M12,-10 C20,-12 25,-4 22,6 C19,16 6,18 2,12 C-2,6 4,-8 12,-10 Z" fill="none" stroke="currentColor" strokeWidth="1.0" />
              <path d="M-8,-2 C-15,4 -10,15 0,17 C10,19 15,10 8,3 C1,-4 -1,-8 -8,-2 Z" fill="none" stroke="currentColor" strokeWidth="1.0" />
              <path d="M-2,8 Q2,14 6,9 Q11,15 15,12" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </g>
            {/* Leaflets */}
            <path d="M39,118 C28,114 22,102 30,95 C38,88 42,100 37,110 Z" fill="currentColor" />
            <path d="M37,110 Q28,105 32,98" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d="M42,82 C53,78 59,66 51,59 C43,52 39,64 44,74 Z" fill="currentColor" />
            <path d="M44,74 Q53,69 49,62" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d="M36,55 C25,51 19,39 27,32 C35,25 39,37 34,47 Z" fill="currentColor" />
          </>
        );
      case 'neroli':
        return (
          <>
            {/* Curving Citrus / Neroli Twig */}
            <path
              d="M25,170 Q40,120 50,75 T75,15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Neroli Blossom 1 */}
            <g transform="translate(48, 70)">
              <circle cx="0" cy="0" r="2.5" fill="currentColor" />
              <path d="M0,0 Q-4,-12 0,-15 Q4,-12 0,0" fill="currentColor" />
              <path d="M0,0 Q12,-6 15,0 Q12,6 0,0" fill="currentColor" />
              <path d="M0,0 Q8,10 5,14 Q-3,11 0,0" fill="currentColor" />
              <path d="M0,0 Q-8,10 -5,14 Q3,11 0,0" fill="currentColor" />
              <path d="M0,0 Q-12,-6 -15,0 Q-12,6 0,0" fill="currentColor" />
            </g>
            {/* Neroli Blossom 2 */}
            <g transform="translate(68, 25) scale(0.75)">
              <circle cx="0" cy="0" r="2" fill="currentColor" />
              <path d="M0,0 Q-4,-12 0,-15 Q4,-12 0,0" fill="currentColor" />
              <path d="M0,0 Q12,-6 15,0 Q12,6 0,0" fill="currentColor" />
              <path d="M0,0 Q8,10 5,14 Q-3,11 0,0" fill="currentColor" />
              <path d="M0,0 Q-8,10 -5,14 Q3,11 0,0" fill="currentColor" />
              <path d="M0,0 Q-12,-6 -15,0 Q-12,6 0,0" fill="currentColor" />
            </g>
            {/* Stylized Citrus Leaves */}
            <path d="M32,130 C18,125 15,108 25,100 C35,92 40,110 32,122 Z" fill="currentColor" />
            <path d="M46,102 C60,97 63,80 53,72 C43,64 38,82 46,94 Z" fill="currentColor" />
            <path d="M48,45 C34,40 31,23 41,15 C51,7 56,25 48,37 Z" fill="currentColor" />
          </>
        );
      case 'argan':
        return (
          <>
            {/* Elegant Argan / Olive Stem */}
            <path
              d="M30,170 Q35,115 45,70 T65,15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Argan Nut hanging 1 */}
            <g transform="translate(36, 110)">
              <path d="M0,0 C-6,3 -10,12 -6,18 C-2,24 6,24 8,16 C10,8 4,-3 0,0 Z" fill="currentColor" />
              <path d="M0,0 L-1,-6" fill="none" stroke="currentColor" strokeWidth="1" />
            </g>
            {/* Argan Nut hanging 2 */}
            <g transform="translate(52, 55)">
              <path d="M0,0 C-6,3 -10,12 -6,18 C-2,24 6,24 8,16 C10,8 4,-3 0,0 Z" fill="currentColor" />
              <path d="M0,0 L-1,-6" fill="none" stroke="currentColor" strokeWidth="1" />
            </g>
            {/* Lanceolate Argan Leaves */}
            <path d="M34,140 C22,145 18,135 24,128 C30,121 36,132 34,140 Z" fill="currentColor" />
            <path d="M38,122 C48,118 52,108 46,101 C40,94 34,114 38,122 Z" fill="currentColor" />
            <path d="M41,88 C29,93 25,83 31,76 C37,69 43,80 41,88 Z" fill="currentColor" />
            <path d="M48,70 C58,66 62,56 56,49 C50,42 44,62 48,70 Z" fill="currentColor" />
            <path d="M47,35 C35,40 31,30 37,23 C43,16 49,27 47,35 Z" fill="currentColor" />
          </>
        );
      case 'fern':
      default:
        return (
          <>
            {/* Classic Fern / Palm Leaf Frond */}
            <path
              d="M20,170 Q45,130 55,80 T80,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path d="M29,145 C21,137 20,123 28,118 C36,113 38,127 30,135 C27,138 28,142 29,145 Z" fill="currentColor" />
            <path d="M41,135 C49,127 50,113 42,108 C34,103 32,117 40,125 C43,128 42,132 41,135 Z" fill="currentColor" />
            <path d="M38,115 C30,107 29,93 37,88 C45,83 47,97 39,105 C36,108 37,112 38,115 Z" fill="currentColor" />
            <path d="M51,105 C59,97 60,83 52,78 C44,73 42,87 50,95 C53,98 52,102 51,105 Z" fill="currentColor" />
            <path d="M46,85 C38,77 37,63 45,58 C53,53 55,67 47,75 C44,78 45,82 46,85 Z" fill="currentColor" />
            <path d="M59,75 C67,67 68,53 60,48 C52,43 50,57 58,65 C61,68 60,72 59,75 Z" fill="currentColor" />
            <path d="M56,55 C48,47 47,33 55,28 C63,23 65,37 57,45 C54,48 55,52 56,55 Z" fill="currentColor" />
            <path d="M69,45 C77,37 78,23 70,18 C62,13 60,27 68,35 C71,38 70,42 69,45 Z" fill="currentColor" />
            <path d="M73,22 C71,12 75,3 81,1 C87,-1 88,8 82,18 C80,21 76,22 73,22 Z" fill="currentColor" />
          </>
        );
    }
  };

  const isLeft = side === 'left';
  const sideClass = isLeft
    ? 'left-4 sm:left-12 md:left-24 lg:left-32'
    : 'right-4 sm:right-12 md:right-24 lg:right-32';

  // For the right side, flip the SVG horizontally so it mirrors elegantly inwards
  const sideTransform = isLeft
    ? (position === 'top' ? 'rotate(-10deg) translateY(-20%)' : 'scaleY(-1) rotate(-10deg) translateY(-20%)')
    : (position === 'top' ? 'scaleX(-1) rotate(-10deg) translateY(-20%)' : 'scaleX(-1) scaleY(-1) rotate(-10deg) translateY(-20%)');

  return (
    <svg
      viewBox="0 0 120 180"
      className={`absolute pointer-events-none select-none z-10 ${sideClass} ${colorClass} fill-current`}
      style={{
        width: '120px',
        height: '180px',
        bottom: position === 'top' ? '-10px' : 'auto',
        top: position === 'bottom' ? '-10px' : 'auto',
        transform: sideTransform,
        transformOrigin: 'bottom left',
      }}
    >
      {renderPath()}
    </svg>
  );
};

export default function TornPaperDivider({
  fillColor,
  bgColor = 'transparent',
  position = 'top',
  botanicalVariant = 'fern',
  className = '',
}: TornPaperDividerProps) {
  // Map our premium brand color names to hex codes for the SVG fill
  const colorMap = {
    'warm-white': '#fbf9f5',
    'cream-100': '#f5f3ef',
    'cream-200': '#efeeea',
    'sage-800': '#436439',
  };

  const bgMap = {
    'warm-white': 'bg-warm-white',
    'cream-100': 'bg-cream-100',
    'cream-200': 'bg-cream-200',
    'sage-800': 'bg-sage-800',
    'transparent': 'bg-transparent',
  };

  const hexColor = colorMap[fillColor];
  const bgClass = bgMap[bgColor];

  // Dynamically generate high-fidelity, organic deckle paper tear paths.
  // We use a deterministic pseudo-random helper to ensure flawless hydration
  // and performance without relying on heavy external generators.
  const generateTornPath = (pos: 'top' | 'bottom', isFiber: boolean) => {
    const points = 180; // High frequency points for smooth deckle-edge microtextures
    const width = 1440;
    const height = 60;
    
    // Position of the torn edge line
    const basePathY = pos === 'top' ? (isFiber ? 23.5 : 25) : (isFiber ? 36.5 : 35);
    const pathParts: string[] = [];

    // Deterministic pseudo-random helper to generate organic paper fiber structures
    const pseudoRandom = (i: number) => {
      const x = Math.sin(i * 18.234) * 43758.5453;
      return x - Math.floor(x);
    };

    if (pos === 'top') {
      pathParts.push(`M0,${basePathY}`);
      for (let i = 1; i <= points; i++) {
        const x = (i / points) * width;
        // Low frequency gentle wave (2px amplitude) for class and restraint
        const macroWave = Math.sin((i / points) * Math.PI * 4) * 2;
        // Fine high-frequency paper fiber tremor (0.6px - 1.2px)
        const noise = (pseudoRandom(i) - 0.5) * (isFiber ? 1.5 : 0.8);
        const y = basePathY + macroWave + noise;
        pathParts.push(`L${x.toFixed(1)},${y.toFixed(1)}`);
      }
      // Extend to 61 to prevent browser subpixel rounding gaps at the bottom of the SVG
      pathParts.push(`L${width},61 L0,61 Z`);
    } else {
      // Extend to -1 to prevent browser subpixel rounding gaps at the top of the SVG
      pathParts.push(`M0,-1 L${width},-1 L${width},${basePathY}`);
      for (let i = points; i >= 0; i--) {
        const x = (i / points) * width;
        const macroWave = Math.sin((i / points) * Math.PI * 4) * 2;
        const noise = (pseudoRandom(i) - 0.5) * (isFiber ? 1.5 : 0.8);
        const y = basePathY + macroWave + noise;
        pathParts.push(`L${x.toFixed(1)},${y.toFixed(1)}`);
      }
      pathParts.push(`L0,-1 Z`);
    }

    return pathParts.join(' ');
  };

  const pathTopA = generateTornPath('top', false);

  if (position === 'top') {
    return (
      <div className={`relative w-full overflow-visible leading-[0] z-30 ${bgClass} ${className}`}>
        {/* Subtle decorative botanical elements */}
        <BotanicalDecoration variant={botanicalVariant} side="left" fillColor={fillColor} bgColor={bgColor} position={position} />
        <BotanicalDecoration variant={botanicalVariant} side="right" fillColor={fillColor} bgColor={bgColor} position={position} />
        
        <svg 
          viewBox="0 0 1440 60" 
          className="relative w-full h-[24px] sm:h-[40px] md:h-[50px] lg:h-[60px]"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main solid torn paper layer */}
          <path 
            d={pathTopA} 
            fill={hexColor} 
          />
        </svg>
      </div>
    );
  }

  const pathBottomA = generateTornPath('bottom', false);

  return (
    <div className={`relative w-full overflow-visible leading-[0] z-30 ${bgClass} ${className}`}>
      {/* Subtle decorative botanical elements */}
      <BotanicalDecoration variant={botanicalVariant} side="left" fillColor={fillColor} bgColor={bgColor} position={position} />
      <BotanicalDecoration variant={botanicalVariant} side="right" fillColor={fillColor} bgColor={bgColor} position={position} />

      <svg 
        viewBox="0 0 1440 60" 
        className="relative w-full h-[24px] sm:h-[40px] md:h-[50px] lg:h-[60px]"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main solid torn paper layer */}
        <path 
          d={pathBottomA} 
          fill={hexColor} 
        />
      </svg>
    </div>
  );
}
