
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { motion, useSpring } from "framer-motion"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  // Spring animation for the thumb
  const springConfig = { stiffness: 700, damping: 30 };
  const translateX = useSpring(props.checked ? 20 : 0, springConfig); // 20px based on typical size

  React.useEffect(() => {
    translateX.set(props.checked ? 20 : 0);
  }, [props.checked, translateX]);


  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        // Default track colors (can be overridden by parent)
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        // Glow effect (apply to root for border/ring)
        (isHovered || isFocused) && "ring-2 ring-ring/50 ring-offset-1 ring-offset-background",
        className
      )}
      {...props}
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <SwitchPrimitives.Thumb asChild>
        <motion.span
          layout // Enable automatic layout animation
          transition={springConfig} // Use spring for smooth movement
          style={{ translateX }} // Apply the spring-driven translation
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0",
            // Scale effect on hover/focus
            (isHovered || isFocused) ? "scale-110" : "scale-100",
             "transition-transform duration-100" // Add transition for scale
            // Color is handled by parent or default styles
          )}
        />
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
