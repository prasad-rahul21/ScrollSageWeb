
"use client";

import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface CustomSpeedometerProps {
  value: number;
  minValue?: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
}

export function CustomSpeedometer({
  value,
  minValue = 0,
  maxValue = 100,
  size = 200,
  strokeWidth = 25, // Increased thickness
}: CustomSpeedometerProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Adjust angle range for a typical speedometer look (e.g., 240 degrees)
  const startAngle = -120;
  const endAngle = 120;
  const angleRange = endAngle - startAngle;

  // Normalize value to a 0-1 scale
  const normalizedValue = (value - minValue) / (maxValue - minValue);
  // Map normalized value to the angle range
  const targetAngle = startAngle + normalizedValue * angleRange;
  // Calculate SVG path length based on the angle
  const targetPathLength = normalizedValue * (angleRange / 360) * circumference;

  // Motion value for smooth animation
  const pathLength = useMotionValue(0);

  React.useEffect(() => {
    const animation = animate(pathLength, targetPathLength, {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      duration: 0.8,
    });
    return animation.stop;
  }, [targetPathLength, pathLength]);

  // Convert angle from degrees to radians for positioning labels
  const angleToRadians = (angle: number) => (angle * Math.PI) / 180;

  // Define gradient
  const gradientId = "speedometerGradient";

  // Function to get coordinates for labels
  const getLabelPosition = (numValue: number) => {
     const numNormalizedValue = (numValue - minValue) / (maxValue - minValue);
     const angle = startAngle + numNormalizedValue * angleRange;
     const angleRad = angleToRadians(angle);
     const labelRadius = radius + strokeWidth / 1.5; // Position labels outside the arc
     const x = size / 2 + labelRadius * Math.sin(angleRad);
     const y = size / 2 - labelRadius * Math.cos(angleRad);
     return { x, y };
  };

  const labels = [
    { value: 2, pos: getLabelPosition(2) },
    { value: 4, pos: getLabelPosition(4) },
    { value: 6, pos: getLabelPosition(6) },
    { value: 8, pos: getLabelPosition(8) },
  ];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible" // Allow labels outside
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
             {/* Blue (#3b82f6) -> Pink (#ec4899) -> Cyan (#06b6d4) */}
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
           {/* Optional: Define glow filter */}
           <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background Arc */}
        <path
          d={`M ${size / 2 + radius * Math.sin(angleToRadians(startAngle))},${size / 2 - radius * Math.cos(angleToRadians(startAngle))}
               A ${radius},${radius} 0 ${angleRange > 180 ? 1 : 0},1
               ${size / 2 + radius * Math.sin(angleToRadians(endAngle))},${size / 2 - radius * Math.cos(angleToRadians(endAngle))}`}
          fill="none"
          stroke="hsl(var(--muted) / 0.3)" // Use muted color for background track
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Foreground Arc (Animated with Gradient) */}
        <motion.path
          d={`M ${size / 2 + radius * Math.sin(angleToRadians(startAngle))},${size / 2 - radius * Math.cos(angleToRadians(startAngle))}
               A ${radius},${radius} 0 ${angleRange > 180 ? 1 : 0},1
               ${size / 2 + radius * Math.sin(angleToRadians(startAngle + (pathLength.get() / circumference) * 360))},${size / 2 - radius * Math.cos(angleToRadians(startAngle + (pathLength.get() / circumference) * 360))}`}
          fill="none"
          stroke={`url(#${gradientId})`} // Apply gradient
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{
            pathLength: circumference * (angleRange / 360), // Total length of the visible arc
            pathOffset: 0, // Start from the beginning
            strokeDasharray: `${circumference * (angleRange / 360)} ${circumference}`,
            strokeDashoffset: useTransform(
               pathLength,
               (latest) => circumference * (angleRange / 360) - latest
             ),
             // filter: 'url(#glow)' // Apply glow filter if desired
          }}
           // Initial animation setup
           initial={{ strokeDashoffset: circumference * (angleRange / 360) }}
           animate={{ strokeDashoffset: circumference * (angleRange / 360) - pathLength.get() }}
           transition={{ duration: 0.8, ease: "circOut" }}
        />

         {/* Labels */}
         {labels.map((label) => (
           <motion.text
             key={label.value}
             x={label.pos.x}
             y={label.pos.y}
             textAnchor="middle"
             dominantBaseline="middle"
             fontSize="12" // Adjust size as needed
             fill="hsl(var(--primary))" // Use primary color
             className="font-semibold"
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.5 + label.value * 0.05 }}
             // Optional: Add slight pulsing animation to labels
             whileHover={{ scale: 1.1 }}
            //  animate={{
            //      scale: [1, 1.05, 1],
            //      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            //  }}
           >
             {label.value}
           </motion.text>
         ))}

         {/* Optional: Center icon/element can be added here */}

      </svg>
       {/* Optional: Animated glowing trail (more complex implementation needed) */}
       {/* <div className="absolute inset-0 rounded-full border-2 border-transparent animate-pulse-border-slow"></div> */}
    </div>
  );
}

// Optional CSS for the slow pulse animation if used
// @keyframes pulse-border-slow { /* Define in globals.css */
//   0%, 100% { box-shadow: 0 0 3px 1px hsl(var(--primary) / 0.3); }
//   50% { box-shadow: 0 0 6px 2px hsl(var(--primary) / 0.5); }
// }
// .animate-pulse-border-slow {
//   animation: pulse-border-slow 3s infinite ease-in-out;
// }
