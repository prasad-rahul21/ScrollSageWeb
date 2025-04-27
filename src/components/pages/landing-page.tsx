
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { RippleButton } from '@/components/ui/ripple-button'; // Import RippleButton
import { Sparkles, Lightbulb, Zap, Target, Bookmark, Settings } from 'lucide-react'; // Example icons
import { FeaturePlacard } from '@/components/feature-placard'; // Import FeaturePlacard

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


export function LandingPage() {
  const router = useRouter();

  const handleDiveIn = () => {
    router.push('/preferences'); // Navigate to the preferences page
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger placard animation
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 relative overflow-hidden h-full py-16"> {/* Added padding */}
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

        {/* Feature Placards Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 w-full max-w-4xl" // Grid for placards
           variants={containerVariants}
           initial="hidden"
           animate="visible"
        >
          {features.map((feature, index) => (
            <FeaturePlacard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              gradient={feature.gradient}
            />
          ))}
        </motion.div>

        {/* Dive In Button */}
        <RippleButton
            onClick={handleDiveIn}
            className="btn-gradient px-10 py-4 rounded-full text-xl font-bold shadow-lg flex items-center justify-center gap-2 mx-auto mt-4" // Added margin top
            whileHover={{ scale: 1.08, y: -4, transition: { type: 'spring', stiffness: 300, damping: 10 } }}
            whileTap={{ scale: 0.97 }}
        >
           <Sparkles className="w-6 h-6" /> Let’s Dive, Baby! <Sparkles className="w-6 h-6" />
        </RippleButton>
      </motion.div>
    </div>
  );
}

