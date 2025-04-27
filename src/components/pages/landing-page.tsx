
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, Lightbulb, Zap, Target, Bookmark, Settings, Rocket } from 'lucide-react'; // Added Rocket
import { FeaturePlacard } from '@/components/feature-placard'; // Import FeaturePlacard
import { cn } from '@/lib/utils'; // Import cn

const features = [
  {
    title: "Read Engaging Articles",
    description: "Discover content perfectly matched to your interests.",
    icon: Zap,
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    title: "Earn Rewards",
    description: "Get cool perks just for reading what you love.",
    icon: Lightbulb,
    gradient: "from-pink-500 to-rose-500",
  },
    {
    title: "Customize Your Feed",
    description: "Tailor topics and reading time for a perfect fit.",
    icon: Settings,
    gradient: "from-teal-400 to-cyan-500",
   },
  {
    title: "Save Your Favorites",
    description: "Bookmark articles and build your knowledge library.",
    icon: Bookmark,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    title: "AI Summaries (Coming Soon!)",
    description: "Instantly grasp key points with intelligent summaries.",
    icon: Target, // Or a brain/AI icon
    gradient: "from-sky-400 to-blue-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.10, // Stagger placard animation slightly faster
    },
  },
};

// Particle type for burst effect
interface Particle {
  id: number;
  x: number;
  y: number;
  tx: string; // Target x translation
  ty: string; // Target y translation
}


export function LandingPage() {
  const router = useRouter();
  const [showSparkles, setShowSparkles] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);


  const handleDiveIn = (event: React.MouseEvent<HTMLButtonElement>) => {
     // Create particles on click
     const rect = event.currentTarget.getBoundingClientRect();
     const newParticles: Particle[] = Array.from({ length: 15 }).map((_, i) => ({ // More particles
        id: Math.random(),
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        // Random target translation for burst effect
        tx: `${(Math.random() - 0.5) * 60}px`, // Spread out more
        ty: `${(Math.random() - 0.5) * 60}px`,
     }));
     setParticles(newParticles);

     // Remove particles after animation
     setTimeout(() => setParticles([]), 600); // Match burst animation duration

     // Navigate after a short delay for the effect
     setTimeout(() => {
        router.push('/preferences'); // Navigate to the preferences page
      }, 200); // Short delay
  };


  return (
    <div className="flex flex-col items-center justify-center text-center px-4 relative overflow-hidden h-full py-16 min-h-[calc(100vh-var(--navbar-height,56px)-theme(spacing.32))]"> {/* Adjusted min-height */}
       {/* Background Animation */}
       <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
         <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent-pink/20 dark:from-primary/30 dark:via-secondary/15 dark:to-accent-pink/30"
            initial={{ backgroundPosition: '0% 50%' }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            style={{ backgroundSize: '400% 400%' }}
         />
       </div>


       <motion.div
        className="relative z-10 flex flex-col items-center" // Center content
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-pink to-secondary"
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 100 }}
        >
          Ready to Dive In?
        </motion.h1>
         <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"> {/* Reduced margin bottom */}
          Explore a world of articles curated just for you. Let's get started!
        </p>

        {/* Feature Placards Section - Adjusted Layout */}
        <motion.div
            className="w-full max-w-5xl mx-auto" // Constrain width
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* First Row - 3 placards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                {features.slice(0, 3).map((feature, index) => (
                    <FeaturePlacard
                        key={`top-${index}`}
                        title={feature.title}
                        description={feature.description}
                        icon={feature.icon}
                        gradient={feature.gradient}
                    />
                ))}
            </div>

            {/* Second Row - 2 placards, centered */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                <div className="sm:col-start-1"></div> {/* Empty div for spacing */}
                {features.slice(3, 5).map((feature, index) => (
                     <FeaturePlacard
                        key={`bottom-${index}`}
                        title={feature.title}
                        description={feature.description}
                        icon={feature.icon}
                        gradient={feature.gradient}
                    />
                ))}
                 <div className="sm:col-start-3"></div> {/* Empty div for spacing */}
            </div>
        </motion.div>


        {/* Dive In Button - Enhanced */}
        <motion.button
            onClick={handleDiveIn}
            onMouseEnter={() => setShowSparkles(true)}
            onMouseLeave={() => setShowSparkles(false)}
            className={cn(
                "relative btn-gradient px-10 py-4 rounded-full text-xl font-bold shadow-lg flex items-center justify-center gap-2 mx-auto mt-12", // Increased margin top
                "pulsating-border", // Apply pulsating border animation
                "breathing-hover", // Apply breathing effect on hover
                "ripple-shine" // Apply ripple shine effect on hover
            )}
             whileHover={{ scale: 1.05, y: 0 }} // Subtle scale on hover (breathing handles main pulse)
             whileTap={{ scale: 0.98 }}
             transition={{ type: 'spring', stiffness: 300, damping: 15 }} // Smoother spring for tap
        >
           {/* Sparkle Effect Container */}
             <AnimatePresence>
               {showSparkles && (
                 <motion.div
                     className="sparkle-effect"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.3 }}
                 >
                     {/* Multiple sparkles */}
                     {[...Array(10)].map((_, i) => (
                         <motion.div
                             key={i}
                             className="sparkle"
                             style={{
                                 top: `${Math.random() * 100}%`,
                                 left: `${Math.random() * 100}%`,
                                 animationDelay: `${Math.random() * 0.5}s`, // Random delay
                             }}
                         />
                     ))}
                 </motion.div>
               )}
             </AnimatePresence>

            {/* Particle Effect Container */}
             <AnimatePresence>
               {particles.map((p) => (
                 <motion.div
                   key={p.id}
                   className="particle"
                   initial={{ x: p.x, y: p.y, scale: 0.5, opacity: 1 }}
                   animate={{
                        x: p.x + parseInt(p.tx, 10),
                        y: p.y + parseInt(p.ty, 10),
                        scale: 1,
                        opacity: 0
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ '--tx': p.tx, '--ty': p.ty } as React.CSSProperties} // Pass CSS variables
                 />
               ))}
             </AnimatePresence>


            <Rocket className="w-6 h-6" /> {/* Changed icon */}
                Let's Get Scrolling!
            <Sparkles className="w-6 h-6" /> {/* Keep one sparkle icon */}
        </motion.button>
      </motion.div>
    </div>
  );
}
