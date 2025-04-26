
"use client";

import React, { useState } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button'; // Import base button

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

type RippleButtonProps = ButtonProps & MotionProps & React.RefAttributes<HTMLButtonElement>;

export const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
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
      }, 600); // Match animation duration in CSS

      // Call original onClick if provided
      if (onClick) {
        onClick(event);
      }
    };

    // Combine MotionProps with ButtonProps safely
    const motionButtonProps = { ...props } as MotionProps;

    return (
        <motion.button
          ref={ref}
          className={cn(
            "relative overflow-hidden", // Ensure ripples are contained
            // Apply base button styles (variant, size etc. from props)
            // Need to manually handle variant/size or use a base component
            // For now, assuming default button styling or classes passed via className
            "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            className // Allow overriding styles
          )}
          onClick={createRipple}
          {...motionButtonProps} // Spread motion props
        >
          {children}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="ripple"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          ))}
        </motion.button>
    );
  }
);

RippleButton.displayName = 'RippleButton';
