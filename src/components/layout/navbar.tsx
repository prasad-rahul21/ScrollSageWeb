"use client";

import Link from "next/link";
import { BookMarked, User } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
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
import React, { useState, useEffect } from 'react';

export function Navbar() {
  const [useGlitch, setUseGlitch] = useState(false); // State to toggle effect

  // Example: Toggle effect on mount or based on some condition
  useEffect(() => {
     // Decide whether to use glitch or typewriter, maybe randomly or based on user setting
     setUseGlitch(Math.random() > 0.5);
  }, []);

  const appName = "ScrollSAGE";

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

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" aria-label="Bookmarks">
             {/* Replace with 3D icon later if needed */}
             <BookMarked className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                 {/* Replace with 3D avatar later if needed */}
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://picsum.photos/32/32" alt="@shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
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
              <DropdownMenuItem>
                <Link href="/preferences" className="flex items-center w-full">
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

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
