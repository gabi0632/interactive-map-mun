'use client';

import { cn } from '@/lib/utils';

interface CompassRoseProps {
  size?: number;
  className?: string;
}

/**
 * CompassRose Component
 *
 * Decorative compass rose element for vintage map styling.
 * Positioned absolutely in the map container.
 */
export const CompassRose: React.FC<CompassRoseProps> = ({
  size = 80,
  className,
}) => {
  return (
    <div className={cn('pointer-events-none select-none', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          stroke="#8B7355"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />

        {/* Inner circle */}
        <circle
          cx="50"
          cy="50"
          r="35"
          stroke="#8B7355"
          strokeWidth="0.5"
          fill="none"
          opacity="0.4"
        />

        {/* Cardinal directions - Main points */}
        {/* North */}
        <polygon
          points="50,5 45,45 50,35 55,45"
          fill="#8B7355"
          opacity="0.8"
        />
        {/* South */}
        <polygon
          points="50,95 45,55 50,65 55,55"
          fill="#8B7355"
          opacity="0.5"
        />
        {/* East */}
        <polygon
          points="95,50 55,45 65,50 55,55"
          fill="#8B7355"
          opacity="0.5"
        />
        {/* West */}
        <polygon
          points="5,50 45,45 35,50 45,55"
          fill="#8B7355"
          opacity="0.5"
        />

        {/* Intercardinal directions - smaller points */}
        {/* NE */}
        <polygon
          points="82,18 55,42 60,50 50,45"
          fill="#8B7355"
          opacity="0.3"
        />
        {/* SE */}
        <polygon
          points="82,82 55,58 50,55 60,50"
          fill="#8B7355"
          opacity="0.3"
        />
        {/* SW */}
        <polygon
          points="18,82 45,58 50,55 40,50"
          fill="#8B7355"
          opacity="0.3"
        />
        {/* NW */}
        <polygon
          points="18,18 45,42 40,50 50,45"
          fill="#8B7355"
          opacity="0.3"
        />

        {/* Center circle */}
        <circle
          cx="50"
          cy="50"
          r="5"
          fill="#8B7355"
          opacity="0.6"
        />

        {/* Direction labels */}
        <text
          x="50"
          y="18"
          textAnchor="middle"
          fontSize="8"
          fill="#8B7355"
          fontWeight="bold"
          opacity="0.8"
        >
          N
        </text>
        <text
          x="50"
          y="90"
          textAnchor="middle"
          fontSize="7"
          fill="#8B7355"
          opacity="0.6"
        >
          S
        </text>
        <text
          x="88"
          y="53"
          textAnchor="middle"
          fontSize="7"
          fill="#8B7355"
          opacity="0.6"
        >
          E
        </text>
        <text
          x="12"
          y="53"
          textAnchor="middle"
          fontSize="7"
          fill="#8B7355"
          opacity="0.6"
        >
          W
        </text>
      </svg>
    </div>
  );
};
