
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { RippleButton } from '@/components/ui/ripple-button'; // Import RippleButton
import { Sparkles } from 'lucide-react'; // Example icon

export function LandingPage() {
  const router = useRouter();

  const handleDiveIn = () => {
    router.push('/articles'); // Navigate to the articles grid page
  };

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 relative overflow-hidden h-full">
       {/* Placeholder for 3D background or floating elements */}
       <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
         {/* Example: Simple gradient animation */}
         <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent-pink/20 dark:from-primary/30 dark:via-secondary/15 dark:to-accent-pink/30"
            initial={{ backgroundPosition: '0% 50%' }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            style={{ backgroundSize: '400% 400%' }}
         />
          {/* Add more complex 3D elements here using react-three-fiber if needed */}
       </div>


       <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-pink to-secondary"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 100 }}
        >
          Ready to Dive In?
        </motion.h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Your personalized reading adventure awaits. Discover articles curated just for you based on your preferences.
        </p>

        <RippleButton
            onClick={handleDiveIn}
            className="btn-gradient px-10 py-4 rounded-full text-xl font-bold shadow-lg flex items-center justify-center gap-2 mx-auto"
            whileHover={{ scale: 1.08, y: -4, transition: { type: 'spring', stiffness: 300, damping: 10 } }} // Enhanced bounce on hover
            whileTap={{ scale: 0.97 }} // Slight scale down on tap
        >
           <Sparkles className="w-6 h-6" /> Let’s Dive, Baby! <Sparkles className="w-6 h-6" />
        </RippleButton>
      </motion.div>
    </div>
  );
}
