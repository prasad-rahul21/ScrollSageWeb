
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic'; // Import dynamic for client-side only components
import { useRouter } from 'next/navigation'; // Import useRouter
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RippleButton } from '@/components/ui/ripple-button'; // Import RippleButton
import { Rocket, Sparkles } from 'lucide-react'; // Import icons

// Dynamically import react-gauge-chart only on the client-side
const GaugeChart = dynamic(() => import('react-gauge-chart'), { ssr: false });

const topics = [
  "Technology", "Science", "Health", "Business", "Culture", "Politics", "Sports", "Travel", "Food", "Art"
];

const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }, // Stagger sections
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15, duration: 0.5 } },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export default function PreferencesPage() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [readingTime, setReadingTime] = useState<number>(5); // Default 5 minutes
  const [gaugeValue, setGaugeValue] = useState<number>(0); // State for gauge value
  const router = useRouter(); // Initialize router

  useEffect(() => {
    // Update gauge value when readingTime changes
    // Normalize reading time (2-8 min) to gauge scale (0-1)
    const normalizedValue = (readingTime - 2) / (8 - 2);
    setGaugeValue(normalizedValue);
  }, [readingTime]);


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
        className="container mx-auto py-12 px-4 min-h-[calc(100vh-var(--navbar-height,56px))] flex flex-col items-center" // Center content vertically
        variants={pageVariants}
        initial="hidden"
        animate="visible"
     >
        {/* Floating elements (Optional Bonus) */}
        {/* <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute rounded-full bg-primary/20 dark:bg-primary/30 blur-xl"
                initial={{
                    x: `${Math.random() * 100}vw`,
                    y: `${Math.random() * 100}vh`,
                    scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                    x: `${Math.random() * 100}vw`,
                    y: `${Math.random() * 100}vh`,
                }}
                transition={{
                    duration: 20 + Math.random() * 10,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                }}
                style={{
                    width: `${Math.random() * 100 + 50}px`,
                    height: `${Math.random() * 100 + 50}px`,
                }}
            />
            ))}
        </div> */}


      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-12 font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-pink to-secondary" // Use Orbitron font and gradient
        variants={sectionVariants} // Apply animation variant
      >
        ✨ Craft Your ScrollSaga! ✨
      </motion.h1>

      <div className="w-full max-w-2xl flex flex-col items-center space-y-10"> {/* Increased space */}

        {/* Topic Selection Section */}
        <motion.div variants={sectionVariants} className="w-full">
            <Card className="w-full glass card-transition">
                <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl md:text-3xl font-semibold font-orbitron"> {/* Use Orbitron */}
                    🔥 Pick What Sparks Your Curiosity! 🔥
                </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="flex flex-wrap justify-center gap-3"> {/* Center align buttons */}
                    {topics.map((topic) => (
                    <motion.button
                        key={topic}
                        className={`px-4 py-2 rounded-full border text-sm transition-colors duration-200 ${
                        selectedTopics.includes(topic)
                            ? 'bg-primary text-primary-foreground border-primary shadow-md'
                            : 'bg-background hover:bg-accent/80 hover:text-accent-foreground border-border hover:shadow-sm'
                        }`}
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
            <Card className="w-full glass card-transition">
                <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl md:text-3xl font-semibold font-orbitron"> {/* Use Orbitron */}
                    ⏳ How Fast You Wanna Fly Through Reads? ⏳
                </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6 pt-4">
                 <div className='w-full max-w-[300px]'>
                    {/* Conditionally render GaugeChart only on client */}
                     {typeof window !== 'undefined' && (
                        <GaugeChart
                            id="gauge-chart"
                            nrOfLevels={20}
                            arcsLength={[0.3, 0.5, 0.2]} // Example segments
                            colors={["hsl(var(--neon-cyan))", "hsl(var(--secondary))", "hsl(var(--accent-pink))"]} // Use theme colors
                            percent={gaugeValue} // Use state variable
                            arcPadding={0.02}
                            textColor="hsl(var(--foreground))" // Use theme color
                            needleColor="hsl(var(--muted-foreground))" // Use theme color
                            needleBaseColor="hsl(var(--muted-foreground))" // Use theme color
                            />
                        )}
                 </div>

                <div className="w-full max-w-xs text-center">
                    <p className="text-lg font-medium mb-4">
                    Up to <span className="text-primary font-bold text-xl">{readingTime}</span> minutes
                    </p>
                    <Slider
                    defaultValue={[readingTime]}
                    min={2}
                    max={8}
                    step={1}
                    onValueChange={handleSliderChange}
                    aria-label="Reading time slider"
                    className="w-full cursor-pointer [&>span:last-child]:hover:scale-110 [&>span:last-child]:transition-transform" // Add hover effect to thumb
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>2 min</span>
                    <span>8 min</span>
                    </div>
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
                  Unlock Your Feed!
                 <Sparkles className="w-5 h-5" /> {/* Add Sparkles icon */}
            </RippleButton>
         </motion.div>

      </div>
    </motion.div>
  );
}
