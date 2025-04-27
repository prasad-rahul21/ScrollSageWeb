
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface FeaturePlacardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string; // e.g., "from-indigo-500 to-purple-600"
}

// Ripple type definition
interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}


const placardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 }, // Slightly more pronounced entrance
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 90, // Slightly softer spring
      damping: 15,
    },
  },
};

const hoverVariants = {
  rest: { scale: 1, y: 0, filter: "brightness(1)", boxShadow: "0 4px 6px -1px hsla(0, 0%, 0%, 0.08), 0 2px 4px -1px hsla(0, 0%, 0%, 0.04)" }, // Use HSL for shadow
  hover: {
    scale: 1.05, // Scale up on hover
    y: -5,      // Lift effect
    filter: "brightness(1.1)", // Slight brighten
    // Enhanced glow effect using primary/accent colors
    boxShadow: "0 10px 20px -5px hsla(var(--primary)/0.4), 0 0 15px 2px hsla(var(--accent-pink)/0.3)",
    transition: { type: 'spring', stiffness: 350, damping: 12 } // Snappier hover spring
  },
};

const iconVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: { rotate: [0, 12, -12, 0], scale: 1.15, transition: { duration: 0.5 } }, // Slightly more wiggle
};

// Slow floating animation variant
const floatingVariant = {
  animate: {
    y: ["0px", "-4px", "0px"], // Subtle vertical float
    transition: {
      duration: 3 + Math.random() * 2, // Random duration between 3-5s
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

export function FeaturePlacard({ title, description, icon: Icon, gradient }: FeaturePlacardProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isHovered, setIsHovered] = useState(false); // Track hover state for sparkles

   const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const newRipple: Ripple = {
        id: Date.now(),
        x,
        y,
        size,
      };

      setRipples((prevRipples) => [...prevRipples, newRipple]);

      // Remove ripple after animation duration
      setTimeout(() => {
        setRipples((currentRipples) =>
          currentRipples.filter((ripple) => ripple.id !== newRipple.id)
        );
      }, 600); // Match ripple animation duration
    };

  return (
    <motion.div
      variants={{ ...placardVariants, ...floatingVariant }} // Combine entrance and floating
      whileHover="hover"
      initial="hidden"
      animate={["visible", "animate"]} // Apply both visible and animate states
      className="h-full relative cursor-pointer" // Ensure h-full, add relative and pointer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={createRipple} // Add ripple effect on click
    >
      <motion.div variants={hoverVariants} initial="rest" animate="rest" className="h-full relative overflow-hidden rounded-lg"> {/* Ensure h-full, add relative, overflow, and rounding */}

         {/* Sparkle Effect Container - Activated by hover state */}
         <AnimatePresence>
           {isHovered && (
              <motion.div
                  className="sparkle-effect" // Use class defined in globals.css
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
              >
                  {/* Multiple sparkles */}
                  {[...Array(8)].map((_, i) => ( // Increased sparkle count
                      <div
                          key={i}
                          className="sparkle" // Use class defined in globals.css
                          style={{
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                              animationDelay: `${Math.random() * 0.4}s`, // Faster, more random delay
                          }}
                      />
                  ))}
              </motion.div>
           )}
         </AnimatePresence>

         {/* Ripple Effect Container */}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="ripple" // Use class defined in globals.css
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
                // Optional: Change ripple color based on theme or gradient
                // backgroundColor: 'hsla(var(--primary) / 0.3)',
              }}
            />
          ))}


        <Card className={cn(
          "h-full flex flex-col text-white shadow-lg card-transition", // Use shadow-lg, ensure h-full
          `bg-gradient-to-br ${gradient}` // Apply gradient background
        )}>
          {/* Modified CardHeader for centered title */}
          <CardHeader className="flex flex-col items-center justify-center text-center flex-grow pt-6 pb-2">
            <motion.div variants={iconVariants} className="mb-2">
                 <Icon className="h-7 w-7 text-white/90" /> {/* Slightly larger icon */}
            </motion.div>
            <CardTitle className="text-lg font-bold">{title}</CardTitle> {/* Increased font weight */}
          </CardHeader>
          {/* Centered Description */}
          <CardContent className="text-center px-4 pb-6">
            <p className="text-sm text-white/85">{description}</p> {/* Slightly less transparent */}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
