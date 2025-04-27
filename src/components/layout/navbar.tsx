
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
            {/* Apply Orbitron font, increase size, keep existing animation */}
            {useGlitch ? (
              <span
                className="font-orbitron text-2xl font-bold glitch-hover" // Use font-orbitron, increased size (e.g., text-2xl)
                data-text={appName}
              >
                {appName}
              </span>
            ) : (
               <span className="font-orbitron text-2xl font-bold typewriter"> {/* Use font-orbitron, increased size */}
                {appName}
              </span>
            )}
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-3"> {/* Adjusted spacing */}
           {/* Keep Bookmark Icon */}
           <TooltipProvider delayDuration={100}>
             <Tooltip>
               <TooltipTrigger asChild>
                 <Button variant="ghost" size="icon" aria-label="Bookmarks">
                   <BookMarked className="h-5 w-5" />
                 </Button>
               </TooltipTrigger>
               <TooltipContent side="bottom">
                 <p>View Bookmarks</p>
               </TooltipContent>
             </Tooltip>
           </TooltipProvider>


          <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <TooltipProvider delayDuration={100}>
                 <Tooltip>
                   <TooltipTrigger asChild>
                     <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                       <Avatar className="h-8 w-8">
                         <AvatarImage src="https://picsum.photos/32/32" alt="User avatar" />
                         <AvatarFallback>U</AvatarFallback> {/* Simple Fallback */}
                       </Avatar>
                     </Button>
                   </TooltipTrigger>
                   <TooltipContent side="bottom">
                     <p>User Profile</p>
                   </TooltipContent>
                 </Tooltip>
               </TooltipProvider>
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
                   <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                   <span>Preferences</span>
                 </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Switch and System Button */}
           {mounted && (
             <TooltipProvider delayDuration={100}>
                <div className="flex items-center space-x-1"> {/* Reduced space for tighter grouping */}
                 <Tooltip>
                   <TooltipTrigger asChild>
                     {/* Wrap Switch with a div for Tooltip Trigger */}
                     <div>
                       <Switch
                         id="theme-switch"
                         checked={isLight}
                         onCheckedChange={handleThemeChange}
                         className={cn(
                           // Custom track colors
                           "data-[state=checked]:bg-[#4ade80] data-[state=unchecked]:bg-[#8b5cf6]",
                           // Custom thumb colors - corrected for light/dark
                           "[&>span]:bg-background", // Thumb uses background color for contrast
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
                         className={cn(
                             "h-8 w-8", // Standard icon button size
                             theme === 'system' && "bg-accent/50 text-accent-foreground" // Highlight if system is active
                          )}
                         aria-label="Set theme to system preference"
                       >
                         <Monitor className="h-4 w-4" />
                       </Button>
                     </TooltipTrigger>
                     <TooltipContent side="bottom">
                      <p>Use System Theme</p>
                    </TooltipContent>
                  </Tooltip>
               </div>
             </TooltipProvider>
           )}

          {/* Fallback or placeholder if not mounted */}
          {!mounted && <div className="h-8 w-16"></div>} {/* Placeholder width for switch+button */}

        </div>
      </div>
    </nav>
  );
}
