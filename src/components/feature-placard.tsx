
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface FeaturePlacardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string; // e.g., "from-indigo-500 to-purple-600"
}

const placardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

const hoverVariants = {
  rest: { scale: 1, y: 0, filter: "brightness(1)", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }, // Adjusted base shadow
  hover: {
    scale: 1.04, // Slightly less scale
    y: -4,      // Slightly less lift
    filter: "brightness(1.1)", // Slight brighten on hover
    // Subtle glow effect using boxShadow with accent colors
    boxShadow: "0 10px 20px -5px hsla(var(--primary)/0.3), 0 0 10px 0px hsla(var(--accent-pink)/0.2)",
    transition: { type: 'spring', stiffness: 300, damping: 10 }
  },
};

const iconVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: { rotate: [0, 10, -10, 0], scale: 1.1, transition: { duration: 0.4 } }, // Wiggle effect
};

export function FeaturePlacard({ title, description, icon: Icon, gradient }: FeaturePlacardProps) {
  return (
    <motion.div
      variants={placardVariants} // Apply entrance animation variant
      whileHover="hover"
      initial="hidden" // Start hidden for entrance animation
      animate="visible" // Animate to visible state
      className="h-full"
    >
      <motion.div variants={hoverVariants} initial="rest" animate="rest" className="h-full relative overflow-hidden">
         {/* Add Sparkle Effect on Hover */}
         <motion.div
           className="absolute inset-0 pointer-events-none"
           variants={{
             rest: { opacity: 0 },
             hover: { opacity: 1, transition: { delay: 0.1 } },
           }}
         >
             {/* Multiple sparkles for better effect */}
             {[...Array(5)].map((_, i) => (
                 <motion.div
                     key={i}
                     className="absolute text-yellow-300/70 text-xl" // Using secondary for sparkle
                     style={{
                         top: `${Math.random() * 80 + 10}%`, // Random position
                         left: `${Math.random() * 80 + 10}%`,
                     }}
                     initial={{ scale: 0, rotate: Math.random() * 360 }}
                     animate={{
                         scale: [0, 1, 0],
                         rotate: Math.random() * 360,
                         transition: {
                             duration: 0.6 + Math.random() * 0.4, // Random duration
                             repeat: Infinity,
                             repeatDelay: 1 + Math.random(), // Random delay
                             ease: "easeInOut",
                         },
                     }}
                 >
                     ✨
                 </motion.div>
             ))}
         </motion.div>

        <Card className={cn(
          "h-full flex flex-col text-white shadow-md card-transition overflow-hidden", // Use shadow-md as base
          `bg-gradient-to-br ${gradient}` // Apply gradient background
        )}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
             <motion.div variants={iconVariants}>
                 <Icon className="h-6 w-6 text-white/80" />
             </motion.div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-white/90">{description}</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
