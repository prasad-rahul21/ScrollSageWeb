"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    // Rely on global CSS for ::-webkit-scrollbar and * scrollbar-width/color
    // Keep basic layout classes from shadcn
    className={cn(
      "flex touch-none select-none transition-colors",
       // Use minimal width/height, global styles control visual appearance
      orientation === "vertical" && "h-full w-2 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    {/* The thumb's visual style is now primarily controlled by global CSS. */}
    {/* Make it transparent or use a minimal style that global styles can override. */}
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-muted/40" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }