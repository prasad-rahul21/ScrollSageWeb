
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic'; // Import dynamic for client-side only components
import { useRouter } from 'next/navigation'; // Import useRouter
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RippleButton } from '@/components/ui/ripple-button'; // Import RippleButton

// Dynamically import react-gauge-chart only on the client-side
const GaugeChart = dynamic(() => import('react-gauge-chart'), { ssr: false });

const topics = [
  "Technology", "Science", "Health", "Business", "Culture", "Politics", "Sports", "Travel", "Food", "Art"
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
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
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-var(--navbar-height,56px))]">
      <motion.h1
        className="text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Customize Your Feed
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Topic Selection */}
        <motion.div variants={itemVariants}>
            <Card className="h-full glass card-transition">
                <CardHeader>
                <CardTitle className="text-2xl font-semibold">Choose Your Interests</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="flex flex-wrap gap-3">
                    {topics.map((topic) => (
                    <motion.button
                        key={topic}
                        className={`px-4 py-2 rounded-full border text-sm transition-colors duration-200 ${
                        selectedTopics.includes(topic)
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background hover:bg-accent hover:text-accent-foreground border-border'
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

        {/* Reading Time Selector */}
        <motion.div variants={itemVariants}>
            <Card className="h-full glass card-transition">
                <CardHeader>
                <CardTitle className="text-2xl font-semibold">Select Reading Time</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6 pt-4">
                 <div className='w-full max-w-[300px]'>
                    {/* Conditionally render GaugeChart only on client */}
                     {typeof window !== 'undefined' && (
                        <GaugeChart
                            id="gauge-chart"
                            nrOfLevels={20}
                            arcsLength={[0.3, 0.5, 0.2]} // Example segments
                            colors={["#22D3EE", "#FACC15", "#F43F5E"]} // Cyan -> Yellow -> Red
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
                    Up to <span className="text-primary font-bold">{readingTime}</span> minutes
                    </p>
                    <Slider
                    defaultValue={[readingTime]}
                    min={2}
                    max={8}
                    step={1}
                    onValueChange={handleSliderChange}
                    aria-label="Reading time slider"
                    className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>2 min</span>
                    <span>8 min</span>
                    </div>
                </div>
                </CardContent>
            </Card>
        </motion.div>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* Use RippleButton for enhanced effect */}
        <RippleButton
            onClick={handleSubmit}
            className="btn-gradient px-8 py-3 rounded-md text-lg font-semibold shadow-lg"
            whileHover={{ scale: 1.05, y: -3, transition: { type: 'spring', stiffness: 300, damping: 10 } }} // Bounce on hover
            whileTap={{ scale: 0.98 }} // Slight scale down on tap (ripple handles main feedback)
        >
            Let’s Dive, Baby
        </RippleButton>
      </motion.div>
    </div>
  );
}
