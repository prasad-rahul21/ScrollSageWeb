
"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { motion } from "framer-motion"; // Import motion
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center group", // Added group for hover states
      className
    )}
    {...props}
  >
    {/* Enhanced Track with Gradient and Glow */}
    <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-full bg-muted/40">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-400" // Use defined colors
        style={{ backgroundSize: '200% 200%' }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />
      {/* Neon Glow Effect (using pseudo-elements or box-shadow) */}
      <div className="absolute inset-0 rounded-full neon-glow-track" />

      {/* Filled Range (uses primary color by default) */}
      <SliderPrimitive.Range className="absolute h-full bg-primary opacity-75" />
    </SliderPrimitive.Track>

    {/* Enhanced Thumb with Animation */}
    <SliderPrimitive.Thumb asChild>
      <motion.div
        className={cn(
          "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "relative z-10", // Ensure thumb is above track glow
          "thumb-inner-glow" // Class for inner glow effect
        )}
        // Pulsating Animation
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.15, boxShadow: "0 0 10px 2px hsl(var(--primary) / 0.5)" }} // Scale and glow on hover
        whileTap={{ scale: 0.95 }}
        // Sparkle effect could be added here using nested motion divs or pseudo-elements
      >
        {/* Potential sparkle container */}
         {/* <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
           <motion.div className="sparkle" style={{ top: '50%', left: '50%' }}/>
         </div> */}
      </motion.div>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

    