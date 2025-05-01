
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RippleButton } from '@/components/ui/ripple-button';
import { Rocket, Sparkles, BookOpen, BrainCircuit, Timer, Settings, AlertCircle, Wand2, Loader2 } from 'lucide-react'; // Added Settings, AlertCircle, Wand2, Loader2
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Import Tooltip components
import { fetchTags } from '@/redux/tags/actions'; // Import fetchTags action
import { fetchArticles } from '@/redux/articles/actions'; // Import fetchArticles action
import type { RootState } from '@/redux/rootReducer'; // Import RootState type
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton


const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 90, damping: 14, duration: 0.6 } },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

// Optional floating element animation
const floatingVariants = {
  animate: (i: number) => ({
    y: [0, Math.sin(Date.now() / 1000 + i) * 10, 0],
    x: [0, Math.cos(Date.now() / 1200 + i * 0.5) * 8, 0],
    rotate: Math.sin(Date.now() / 1500 + i * 0.2) * 5,
    transition: {
      duration: 5 + Math.random() * 3,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  }),
};

// Message animation variants
const messageVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 15 } },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2 } },
    shake: { // Optional shake animation
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.4, ease: "easeInOut" }
    },
    warning: { // Specific variant for validation warning
        opacity: 1, y: 0, scale: 1,
        x: [0, -4, 4, -4, 4, 0], // Shake effect
        transition: { duration: 0.5, ease: "easeInOut" }
    }
};

const validationWarningMessage = "Your scroll-fate awaits... choose at least one magical tag, wanderer! 🧙‍♂️";
const maxTopicsWarningMessage = "Whoa there, overachiever! Only 3 passions allowed 😎";

export default function PreferencesPage() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [readingTime, setReadingTime] = useState<number>(5);
  const router = useRouter();
  const [topicMessage, setTopicMessage] = useState<string>(''); // Initial state is empty
  const [animateMessage, setAnimateMessage] = useState<string>('visible'); // For triggering animation

  // Redux state and dispatch
  const dispatch = useDispatch();
  const { tags: fetchedTopics, loading: tagsLoading, error: tagsError } = useSelector((state: RootState) => state.tagsState);

  const isSubmitDisabled = selectedTopics.length === 0;

  // Fetch tags when the component mounts
  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);


  const handleTopicClick = (topic: string) => {
    const isSelected = selectedTopics.includes(topic);
    const maxTopics = 3;
    let nextMessage = ''; // Default to empty message
    let nextAnimation = 'visible';

    if (isSelected) {
      setSelectedTopics((prev) => prev.filter((t) => t !== topic));
      // Clear any warning message when removing a tag
      if (topicMessage === maxTopicsWarningMessage || topicMessage === validationWarningMessage) {
        nextMessage = '';
      } else {
        nextMessage = topicMessage; // Keep existing message if not a warning
      }
    } else {
      if (selectedTopics.length < maxTopics) {
        setSelectedTopics((prev) => [...prev, topic]);
        // Clear any warning message when adding a valid tag
         if (topicMessage === validationWarningMessage) {
           nextMessage = '';
         } else {
           nextMessage = topicMessage; // Keep max warning if it was shown
         }
      } else {
        // Limit reached
        nextMessage = maxTopicsWarningMessage;
        nextAnimation = 'shake'; // Trigger shake animation
        // Reset animation state after a short delay so it can be re-triggered
        setTimeout(() => setAnimateMessage('visible'), 400);
      }
    }

     setTopicMessage(nextMessage);
     setAnimateMessage(nextAnimation);
  };

  const handleSliderChange = (value: number[]) => {
    setReadingTime(value[0]);
  };

   const handleSubmit = () => {
     // Check if any tags are selected
     if (selectedTopics.length === 0) {
         setTopicMessage(validationWarningMessage); // Show validation warning
         setAnimateMessage('warning'); // Use specific warning animation
         // Reset animation state after a short delay
         setTimeout(() => setAnimateMessage('visible'), 600);
         return; // Prevent navigation
     }

     // If validation passes, clear message and proceed
     setTopicMessage(''); // Clear message on successful submit
     console.log("Dispatching fetchArticles with:", { selectedTags: selectedTopics, readingTime });
     dispatch(fetchArticles({ selectedTags: selectedTopics, readingTime }));
     router.push('/articles'); // Navigate to the articles grid page
   };

    // Effect to clear validation warning if user selects a tag after seeing it
    useEffect(() => {
        if (selectedTopics.length > 0 && topicMessage === validationWarningMessage) {
            setTopicMessage('');
        }
    }, [selectedTopics, topicMessage]);


  return (
    <motion.div
        className="container mx-auto py-12 px-4 min-h-[calc(100vh-var(--navbar-height,56px))] flex flex-col items-center relative overflow-hidden"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
     >
        {/* Optional Animated Side Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
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
            {[BookOpen, BrainCircuit, Sparkles].map((Icon, i) => (
                <motion.div
                    key={i}
                    className="absolute text-primary/30 dark:text-secondary/30"
                    custom={i}
                    variants={floatingVariants}
                    animate="animate"
                    style={{
                         top: `${10 + Math.random() * 80}%`,
                         left: `${5 + Math.random() * 90}%`,
                         scale: 0.6 + Math.random() * 0.6,
                    }}
                >
                    <Icon size={30 + Math.random() * 30} strokeWidth={1.5} />
                 </motion.div>
            ))}
        </div>

      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold font-headingAlt text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-pink to-secondary"
        variants={sectionVariants}
      >
        ✨ Craft Your ScrollSaga! ✨
      </motion.h1>

      <div className="w-full max-w-2xl flex flex-col items-center space-y-10 z-10">

        {/* Topic Selection Section */}
        <motion.div variants={sectionVariants} className="w-full">
            <Card className="w-full glass card-transition shadow-lg">
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl md:text-3xl font-semibold font-orbitron flex items-center justify-center gap-2">
                        <Settings className="w-7 h-7 inline-block text-primary"/>
                        🔥 Pick What Sparks Your Curiosity! 🔥
                    </CardTitle>
                    {/* Dynamic Message Area */}
                    <AnimatePresence mode="wait">
                         {topicMessage && ( // Only render if topicMessage is not empty
                             <motion.p
                                 key={topicMessage} // Key ensures re-animation on message change
                                 className={cn(
                                     "text-sm mt-3 font-medium min-h-[20px]", // Added min-height to prevent layout shift
                                     topicMessage === validationWarningMessage || topicMessage === maxTopicsWarningMessage
                                         ? "text-destructive font-semibold" // Red and bold for warnings
                                         : "text-muted-foreground" // Default color for non-warning messages (if any)
                                 )}
                                 variants={messageVariants}
                                 initial="hidden"
                                 animate={animateMessage} // Use state for animation control
                                 exit="exit"
                             >
                                 {topicMessage === maxTopicsWarningMessage && <AlertCircle className="inline w-4 h-4 mr-1.5 mb-0.5" />}
                                 {topicMessage === validationWarningMessage && <Wand2 className="inline w-4 h-4 mr-1.5 mb-0.5" />}
                                 {topicMessage}
                             </motion.p>
                         )}
                    </AnimatePresence>
                </CardHeader>
                <CardContent className="pt-0"> {/* Adjusted padding top */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {tagsLoading && (
                            // Show skeleton loaders while tags are loading
                            Array.from({ length: 10 }).map((_, index) => (
                                <Skeleton key={index} className="h-8 w-24 rounded-full" />
                            ))
                        )}
                         {tagsError && (
                           <p className="text-destructive text-center w-full">Failed to load tags. Please try again later.</p>
                         )}
                        {!tagsLoading && !tagsError && fetchedTopics.map((topic) => (
                            <motion.button
                                key={topic}
                                className={cn(
                                    `px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ease-in-out`,
                                    `focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`,
                                    selectedTopics.includes(topic)
                                    ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                                    : 'bg-background/70 hover:bg-accent/80 hover:text-accent-foreground border-border hover:shadow-sm'
                                )}
                                onClick={() => handleTopicClick(topic)}
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap={{ scale: 0.9, transition: { type: 'spring', stiffness: 400, damping: 17 } }}
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
                    <CardTitle className="text-2xl md:text-3xl font-semibold font-orbitron flex items-center justify-center gap-2">
                       <Timer className="w-7 h-7 inline-block text-secondary"/>
                       ⏳ How Fast You Wanna Fly Through Reads? ⏳
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6 pt-4">
                  <div className="w-full max-w-sm text-center pt-6 pb-2">
                    <Slider
                      defaultValue={[readingTime]}
                      min={2}
                      max={8}
                      step={1}
                      onValueChange={handleSliderChange}
                      aria-label="Reading time slider"
                      className="w-full cursor-pointer"
                    />
                     <p className="text-lg font-medium mt-6 font-sans">
                        Reading time: <span className="text-primary font-bold text-xl">{readingTime}</span> min
                    </p>
                </div>
                </CardContent>
            </Card>
        </motion.div>

         {/* Submit Button Section */}
         <motion.div
            className="mt-8 text-center w-full"
            variants={sectionVariants}
        >
            <TooltipProvider>
              <Tooltip open={isSubmitDisabled ? undefined : false}> {/* Control tooltip visibility */}
                  <TooltipTrigger asChild>
                       <div className={cn(isSubmitDisabled && "cursor-not-allowed")}> {/* Wrapper for tooltip trigger when disabled */}
                           <RippleButton
                               onClick={handleSubmit}
                               className={cn(
                                   "btn-gradient px-8 py-3 rounded-full text-lg font-semibold shadow-lg inline-flex items-center gap-2",
                                   isSubmitDisabled && "opacity-50 cursor-not-allowed pointer-events-none" // Disable styles
                               )}
                               whileHover={!isSubmitDisabled ? { scale: 1.05, y: -3, transition: { type: 'spring', stiffness: 300, damping: 10 } } : {}}
                               whileTap={!isSubmitDisabled ? { scale: 0.98 } : {}}
                               disabled={isSubmitDisabled} // Actual disabled attribute
                               aria-disabled={isSubmitDisabled}
                           >
                               <Rocket className="w-5 h-5" />
                               Unlock Your Feed!
                               <Sparkles className="w-5 h-5" />
                           </RippleButton>
                       </div>
                  </TooltipTrigger>
                 {isSubmitDisabled && (
                    <TooltipContent side="bottom">
                        <p>Pick a tag to proceed 🧠</p>
                    </TooltipContent>
                 )}
              </Tooltip>
            </TooltipProvider>
         </motion.div>

      </div>
    </motion.div>
  );
}
