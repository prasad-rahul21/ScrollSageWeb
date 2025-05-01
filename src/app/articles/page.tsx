
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux'; // Import useSelector
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Coins, Newspaper, Loader2, AlertTriangle } from 'lucide-react';
// import { sampleArticles, type Article } from '@/data/sample-articles'; // Remove sample data import
import type { RootState } from '@/redux/rootReducer'; // Import RootState type
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger effect for cards
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

const cardHoverVariants = {
  rest: { scale: 1, y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }, // Use Tailwind shadow classes
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" // Larger shadow on hover
  },
};

export default function ArticlesGridPage() {
  // Get articles data from Redux store
  const { articles, loading, error } = useSelector((state: RootState) => state.articlesState);

  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-var(--navbar-height,56px))]">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-10 flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Newspaper className="w-8 h-8 text-primary" /> Handpicked Reads, Just for You ✨
      </motion.h1>

      {loading && (
          // Loading State with Skeletons
          <motion.div
             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
             variants={containerVariants}
             initial="hidden"
             animate="visible"
           >
            {Array.from({ length: 6 }).map((_, index) => ( // Show 6 skeletons
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full flex flex-col overflow-hidden shadow-md card-transition glass">
                   <CardHeader className="pb-3">
                     <Skeleton className="h-5 w-3/4 rounded" />
                   </CardHeader>
                   <CardContent className="flex-grow pb-4 space-y-2">
                     <Skeleton className="h-4 w-full rounded" />
                     <Skeleton className="h-4 w-5/6 rounded" />
                     <Skeleton className="h-4 w-4/6 rounded" />
                   </CardContent>
                   <CardFooter className="flex justify-between items-center text-xs border-t pt-3 mt-auto">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-20 rounded-full" />
                   </CardFooter>
                 </Card>
              </motion.div>
             ))}
          </motion.div>
      )}

      {error && (
          // Error State
          <motion.div
            className="text-center text-destructive mt-20 text-lg flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
             <AlertTriangle className="w-12 h-12" />
             <p className="font-semibold">Oops! Couldn't fetch your articles.</p>
             <p className="text-sm text-muted-foreground">Please check your connection or try refreshing.</p>
             {/* Optional: Add a retry button */}
             {/* <Button onClick={() => dispatch(fetchArticles(...))} variant="outline" size="sm" className="mt-4">
                <RotateCw className="mr-2 h-4 w-4"/> Retry
             </Button> */}
          </motion.div>
       )}

      {!loading && !error && articles.length === 0 && (
         // Empty State (No articles match)
         <motion.div
          className="text-center text-muted-foreground mt-20 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
         >
           No articles match your preferences yet. Try adjusting them in the Preferences page!
         </motion.div>
      )}

      {!loading && !error && articles.length > 0 && (
        // Display Articles Grid
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {articles.map((article, index) => (
            <Link href={`/articles/${article.id}`} key={article.id} passHref>
              <motion.div
                 variants={itemVariants}
                 whileHover="hover"
                 initial="rest"
                 animate="rest" // Ensures initial state is set correctly
                 className="h-full" // Ensure motion div takes full height for layout
              >
                <motion.div variants={cardHoverVariants} className="h-full">
                  <Card className="h-full flex flex-col cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 card-transition glass">
                    {/* Optional: New/Trending Badge */}
                     {index % 4 === 0 && ( // Example condition for badges
                      <Badge variant="destructive" className="absolute top-2 right-2 text-xs z-10">New</Badge>
                    )}
                     {index % 7 === 0 && (
                      <Badge variant="secondary" className="absolute top-2 right-2 text-xs z-10">Trending</Badge>
                    )}

                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold leading-tight">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow pb-4">
                      <CardDescription className="text-sm line-clamp-3"> {/* Limit summary lines */}
                        {article.summary}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center text-xs border-t pt-3 mt-auto">
                       <Badge variant="outline" className="flex items-center gap-1 bg-primary/10 text-primary border-primary/30">
                        <Clock className="w-3 h-3" />
                        {article.readingTime} min
                      </Badge>
                       <Badge variant="outline" className="flex items-center gap-1 bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30">
                        <Coins className="w-3 h-3" />
                        {article.coinsOffered || 0} Coins {/* Add default 0 if coinsOffered is missing */}
                      </Badge>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}

