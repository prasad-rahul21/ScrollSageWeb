
"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { BookMarked, User, Monitor, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';

export function Navbar() {
  const [useGlitch, setUseGlitch] = useState(false); // State to toggle effect
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering theme-dependent UI
  useEffect(() => {
    setMounted(true);
     // Decide whether to use glitch or typewriter, maybe randomly or based on user setting
     setUseGlitch(Math.random() > 0.5);
  }, []);


  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? 'light' : 'dark';
    setTheme(newTheme);
    toast({
      title: `Switched to ${newTheme === 'light' ? 'Light' : 'Dark'} Mode`,
      description: `The interface is now in ${newTheme} mode.`,
      duration: 2000,
    });
  };

  const setSystemTheme = () => {
    setTheme('system');
     toast({
      title: "Switched to System Mode",
      description: "The interface will now follow your system's theme.",
      duration: 2000,
    });
  };

  const appName = "ScrollSAGE";

  // Determine switch state based on resolved theme
  // We consider 'light' as 'checked' (ON)
  const isLight = resolvedTheme === 'light';

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 glass">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* Conditionally render glitch or typewriter effect */}
            {useGlitch ? (
              <span className="font-bold glitch-hover" data-text={appName}>
                {appName}
              </span>
            ) : (
              <span className="font-bold typewriter">
                {appName}
              </span>
            )}
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-3"> {/* Adjusted spacing */}
          <Button variant="ghost" size="icon" aria-label="Bookmarks">
             {/* Replace with 3D icon later if needed */}
             <BookMarked className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                 {/* Replace with 3D avatar later if needed */}
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://picsum.photos/32/32" alt="User avatar" />
                  <AvatarFallback>U</AvatarFallback> {/* Simple Fallback */}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 glass" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">ScrollSage User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    user@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/preferences" className="flex items-center w-full cursor-pointer">
                    {/* Add appropriate icon if needed */}
                    <span>Preferences</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Switch and System Button */}
           {mounted && (
             <TooltipProvider delayDuration={100}>
                <div className="flex items-center space-x-2">
                 <Tooltip>
                   <TooltipTrigger asChild>
                     {/* Wrap Switch with a div for Tooltip Trigger */}
                     <div>
                       <Switch
                         id="theme-switch"
                         checked={isLight}
                         onCheckedChange={handleThemeChange}
                         className={cn(
                           // Custom track colors (using Tailwind utility classes for the hex codes requested)
                           "data-[state=checked]:bg-green-400 data-[state=unchecked]:bg-violet-500",
                           // Custom thumb colors
                           "[&>span]:data-[state=checked]:bg-black [&>span]:data-[state=unchecked]:bg-white",
                           // Add transition for smoother visual change
                           "transition-all duration-300 ease-in-out",
                            // Subtle glow on focus
                           "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                         )}
                         aria-label="Toggle light and dark themes"
                       />
                     </div>
                   </TooltipTrigger>
                   <TooltipContent side="bottom">
                     <p>Toggle Light/Dark Mode</p>
                      <div className="flex items-center justify-center mt-1 text-xs text-muted-foreground">
                       {isLight ? <Sun className="w-3 h-3 mr-1"/> : <Moon className="w-3 h-3 mr-1"/>}
                       {isLight ? 'Light' : 'Dark'}
                     </div>
                   </TooltipContent>
                 </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                       <Button
                         variant="ghost"
                         size="icon"
                         onClick={setSystemTheme}
                         className={cn("h-8 w-8", theme === 'system' && "text-accent-foreground bg-accent/50")} // Highlight if system is active
                         aria-label="Set theme to system preference"
                       >
                         <Monitor className="h-4 w-4" />
                       </Button>
                     </TooltipTrigger>
                     <TooltipContent side="bottom">
                      <p>Reset to System Theme</p>
                    </TooltipContent>
                  </Tooltip>
               </div>
             </TooltipProvider>
           )}

          {/* Fallback or placeholder if not mounted */}
          {!mounted && <div className="h-8 w-8"></div>}

        </div>
      </div>
    </nav>
  );
}
