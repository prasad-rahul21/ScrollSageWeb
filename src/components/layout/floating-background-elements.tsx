
"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { BookOpen, Square, Triangle, Circle } from 'lucide-react'; // Example icons

const icons = [BookOpen, Square, Triangle, Circle];
const numElements = 15; // Number of floating elements

export function FloatingBackgroundElements() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values to track mouse position relative to the container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the mouse values using spring physics for a more fluid reaction
  const springConfig = { damping: 50, stiffness: 300 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate mouse position relative to the center of the container
      mouseX.set(event.clientX - rect.left - rect.width / 2);
      mouseY.set(event.clientY - rect.top - rect.height / 2);
    }
  };

  const handleMouseLeave = () => {
    // Reset mouse position gently when leaving the container
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none" // Ensure it covers the area and doesn't block interactions
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: numElements }).map((_, i) => {
        const Icon = icons[i % icons.length];
        const initialX = `${Math.random() * 100}%`;
        const initialY = `${Math.random() * 100}%`;
        const size = 20 + Math.random() * 40; // Random size between 20px and 60px
        const floatDuration = 8 + Math.random() * 10; // Random float duration between 8s and 18s
        const rotationDuration = 10 + Math.random() * 15; // Random rotation duration
        const parallaxFactor = 0.01 + Math.random() * 0.03; // Strength of parallax effect

        // Parallax effect based on smoothed mouse position
        const parallaxX = useTransform(smoothMouseX, (v) => v * parallaxFactor);
        const parallaxY = useTransform(smoothMouseY, (v) => v * parallaxFactor);

        return (
          <motion.div
            key={i}
            className="absolute text-primary/10 dark:text-secondary/15" // Very subtle colors
            style={{
              left: initialX,
              top: initialY,
              width: size,
              height: size,
              x: parallaxX, // Apply parallax effect
              y: parallaxY,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [`${initialY}`, `${parseFloat(initialY) + (Math.random() - 0.5) * 30}px`, `${initialY}`], // Subtle vertical float
              rotate: [0, Math.random() > 0.5 ? 360 : -360], // Random rotation direction
            }}
            transition={{
                // Scale/opacity entrance animation
                opacity: { delay: Math.random() * 1, duration: 1 },
                scale: { delay: Math.random() * 1, duration: 1 },
                // Float animation
                y: {
                    duration: floatDuration,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                },
                // Rotation animation
                rotate: {
                    duration: rotationDuration,
                    repeat: Infinity,
                    ease: "linear",
                }
            }}
          >
            <Icon className="w-full h-full" strokeWidth={0.5} /> {/* Thin stroke */}
          </motion.div>
        );
      })}
    </div>
  );
}
