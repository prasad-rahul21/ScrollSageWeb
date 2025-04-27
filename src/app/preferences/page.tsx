
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import dynamic from 'next/dynamic'; // No longer needed for gauge chart
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RippleButton } from '@/components/ui/ripple-button';
import { Rocket, Sparkles, BookOpen, BrainCircuit, Timer } from 'lucide-react'; // Added Timer icon
import { cn } from '@/lib/utils';
import { CustomSpeedometer } from '@/components/ui/custom-speedometer'; // Import the new component

// Dynamically import react-gauge-chart only on the client-side - NO LONGER NEEDED
// const GaugeChart = dynamic(() => import('react-gauge-chart'), { ssr: false });

const topics = [
  "Technology", "Science", "Health", "Business", "Culture", "Politics", "Sports", "Travel", "Food", "Art"
];

const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }, // Slightly faster stagger
};

const sectionVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 }, // Subtle start
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 90, damping: 14, duration: 0.6 } }, // Adjusted spring
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

// Optional floating element animation
const floatingVariants = {
  animate: (i: number) => ({
    y: [0, Math.sin(Date.now() / 1000 + i) * 10, 0], // Gentle up and down
    x: [0, Math.cos(Date.now() / 1200 + i * 0.5) * 8, 0], // Gentle side to side
    rotate: Math.sin(Date.now() / 1500 + i * 0.2) * 5, // Gentle rotation
    transition: {
      duration: 5 + Math.random() * 3, // Slower, varied duration
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  }),
};


export default function PreferencesPage() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [readingTime, setReadingTime] = useState<number>(5); // Default 5 minutes
  // const [gaugeValue, setGaugeValue] = useState<number>(0); // No longer needed for gauge chart
  const router = useRouter(); // Initialize router

  // No longer needed as GaugeChart is removed
  // useEffect(() => {
  //   // Update gauge value when readingTime changes
  //   // Normalize reading time (2-8 min) to gauge scale (0-1)
  //   const normalizedValue = (readingTime - 2) / (8 - 2);
  //   setGaugeValue(normalizedValue);
  // }, [readingTime]);


  const handleTopicClick = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleSliderChange = (value: number[]) => {
    setReadingTime(value[0]);
  };

   const handleSubmit = () => {
    console.log("Selected Topics:", selectedTopics);
    console.log("Selected Reading Time:", readingTime);
    // Navigate to the articles grid page
    router.push('/articles');
  };

  return (
    <motion.div
        className="container mx-auto py-12 px-4 min-h-[calc(100vh-var(--navbar-height,56px))] flex flex-col items-center relative overflow-hidden" // Added relative and overflow-hidden
        variants={pageVariants}
        initial="hidden"
        animate="visible"
     >
        {/* Optional Animated Side Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block"> {/* Hide on smaller screens */}
             {/* Left Side Quote */}
             <motion.div
                 className="absolute top-1/4 left-8 xl:left-16 max-w-[150px] text-center text-lg font-headingAlt font-bold text-primary/60 dark:text-primary/40"
                 initial={{ opacity: 0, x: -50 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
             >
                  <motion.span
                    className="block text-3xl mb-2"
                    animate={{ rotate: [0, -5, 5, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
                  >
                      📚
                  </motion.span>
                  Escape Reality, One Scroll at a Time!
             </motion.div>

             {/* Right Side Quote */}
             <motion.div
                 className="absolute top-1/2 right-8 xl:right-16 max-w-[150px] text-center text-lg font-headingAlt font-bold text-secondary/60 dark:text-secondary/50"
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
             >
                 <motion.span
                    className="block text-3xl mb-2"
                     animate={{ scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } }}
                 >
                     🚀
                 </motion.span>
                  Power Up Your Curiosity!
             </motion.div>

            {/* Floating Icons */}
             {[BookOpen, BrainCircuit, Sparkles].map((Icon, i) => (
                <motion.div
                    key={i}
                    className="absolute text-primary/30 dark:text-secondary/30"
                    custom={i} // Pass index to variants
                    variants={floatingVariants}
                    animate="animate"
                    style={{
                         top: `${10 + Math.random() * 80}%`, // Random vertical position
                         left: `${5 + Math.random() * 90}%`, // Random horizontal position
                         scale: 0.6 + Math.random() * 0.6, // Random size
                    }}
                >
                    <Icon size={30 + Math.random() * 30} strokeWidth={1.5} />
                 </motion.div>
            ))}
        </div>


      <motion.h1
        // Apply Montserrat Alternates, make it larger, keep gradient
        className="text-4xl md:text-5xl lg:text-6xl font-bold font-headingAlt text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-pink to-secondary"
        variants={sectionVariants} // Apply animation variant
      >
        ✨ Craft Your ScrollSaga! ✨
      </motion.h1>

      <div className="w-full max-w-2xl flex flex-col items-center space-y-10 z-10"> {/* Increased space, ensure content is above bg elements */}

        {/* Topic Selection Section */}
        <motion.div variants={sectionVariants} className="w-full">
            <Card className="w-full glass card-transition shadow-lg">
                <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl md:text-3xl font-semibold font-orbitron"> {/* Keep Orbitron for this heading */}
                    🔥 Pick What Sparks Your Curiosity! 🔥
                </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="flex flex-wrap justify-center gap-3"> {/* Center align buttons */}
                    {topics.map((topic) => (
                    <motion.button
                        key={topic}
                        className={cn(
                            `px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ease-in-out`, // Use font-medium for better readability
                            `focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`, // Focus styling
                            selectedTopics.includes(topic)
                            ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105' // Scale up selected
                            : 'bg-background/70 hover:bg-accent/80 hover:text-accent-foreground border-border hover:shadow-sm'
                        )}
                        onClick={() => handleTopicClick(topic)}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap={{ scale: 0.9, transition: { type: 'spring', stiffness: 400, damping: 17 } }} // Bouncy click
                    >
                        {topic}
                    </motion.button>
                    ))}
                </div>
                </CardContent>
            </Card>
        </motion.div>

        {/* Reading Time Selector Section */}
        <motion.div variants={sectionVariants} className="w-full">
            <Card className="w-full glass card-transition shadow-lg">
                <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl md:text-3xl font-semibold font-orbitron flex items-center justify-center gap-2"> {/* Keep Orbitron */}
                   <Timer className="w-7 h-7 inline-block"/> ⏳ How Fast You Wanna Fly Through Reads? ⏳
                </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6 pt-4">
                 {/* Integrate the New Custom Speedometer */}
                  <div className="w-full flex justify-center items-center mb-4">
                       <CustomSpeedometer value={readingTime} minValue={2} maxValue={8} />
                  </div>

                  {/* Remove old text elements */}
                  {/* <p className="text-lg font-medium mb-4 font-sans"> Up to <span className="text-primary font-bold text-xl">{readingTime}</span> minutes </p> */}

                  <div className="w-full max-w-sm text-center"> {/* Increased max-width */}
                    <Slider
                      defaultValue={[readingTime]}
                      min={2}
                      max={8}
                      step={1}
                      onValueChange={handleSliderChange}
                      aria-label="Reading time slider"
                      className="w-full cursor-pointer [&>span:last-child]:hover:scale-110 [&>span:last-child]:transition-transform" // Add hover effect to thumb
                    />
                     {/* Remove old min/max labels */}
                    {/* <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>2 min</span>
                      <span>8 min</span>
                    </div> */}
                     <p className="text-lg font-medium mt-4 font-sans">
                        Reading time: <span className="text-primary font-bold text-xl">{readingTime}</span> min
                    </p>
                </div>
                </CardContent>
            </Card>
        </motion.div>

         {/* Submit Button Section */}
         <motion.div
            className="mt-8 text-center w-full" // Reduced top margin
            variants={sectionVariants}
        >
            {/* Use RippleButton for enhanced effect */}
            <RippleButton
                onClick={handleSubmit}
                className="btn-gradient px-8 py-3 rounded-full text-lg font-semibold shadow-lg inline-flex items-center gap-2" // Ensure flex layout
                whileHover={{ scale: 1.05, y: -3, transition: { type: 'spring', stiffness: 300, damping: 10 } }} // Bounce on hover
                whileTap={{ scale: 0.98 }} // Slight scale down on tap (ripple handles main feedback)
            >
                 <Rocket className="w-5 h-5" /> {/* Add Rocket icon */}
                  Unlock Your Feed! {/* Updated Text */}
                 <Sparkles className="w-5 h-5" /> {/* Add Sparkles icon */}
            </RippleButton>
         </motion.div>

      </div>
    </motion.div>
  );
}
