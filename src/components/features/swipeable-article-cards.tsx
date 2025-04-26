"use client";

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  summary: string;
  readingTime: number; // in minutes
}

const initialArticles: Article[] = [
  { id: 1, title: "The Future of AI", summary: "Exploring the advancements and implications of artificial intelligence.", readingTime: 5 },
  { id: 2, title: "Deep Dive into React Hooks", summary: "A comprehensive guide to understanding and using React Hooks effectively.", readingTime: 8 },
  { id: 3, title: "Sustainable Living Practices", summary: "Learn how to adopt eco-friendly habits in your daily life.", readingTime: 3 },
  { id: 4, title: "The Art of Mindfulness", summary: "Techniques to cultivate presence and reduce stress.", readingTime: 4 },
  { id: 5, title: "Exploring Quantum Computing", summary: "An introduction to the mind-bending world of quantum mechanics and computation.", readingTime: 7 },
];

export function SwipeableArticleCards() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const controls = useAnimation();
  const x = useMotionValue(0);

  const swipeThreshold = 100;

  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-swipeThreshold * 1.5, -swipeThreshold, swipeThreshold, swipeThreshold * 1.5], [0, 1, 1, 0]);
  // Radial glow effect based on swipe direction
  const backgroundGlow = useTransform(x, (latestX) => {
    const intensity = Math.min(Math.abs(latestX) / (swipeThreshold * 2), 1);
    if (latestX > swipeThreshold / 2) {
        // Swipe right (bookmark) - Use primary/accent color glow
        return `radial-gradient(circle at 90% 50%, hsla(var(--primary) / ${intensity * 0.3}) 0%, transparent 50%)`;
    } else if (latestX < -swipeThreshold / 2) {
        // Swipe left (dismiss) - Use destructive/muted color glow
        return `radial-gradient(circle at 10% 50%, hsla(var(--destructive) / ${intensity * 0.2}) 0%, transparent 50%)`;
    }
    return 'none'; // No glow when near center
  });


  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number }, velocity: { x: number; y: number } }) => {
    const swipePower = Math.abs(info.offset.x) * info.velocity.x;

    if (info.offset.x > swipeThreshold || swipePower > 5000) {
      // Swipe Right (Bookmark)
      controls.start({
        x: '150%',
        opacity: 0,
        transition: { duration: 0.3, ease: "easeOut" },
      }).then(() => removeTopCard('right'));
    } else if (info.offset.x < -swipeThreshold || swipePower < -5000) {
      // Swipe Left (Dismiss)
      controls.start({
        x: '-150%',
        opacity: 0,
        transition: { duration: 0.3, ease: "easeOut" },
      }).then(() => removeTopCard('left'));
    } else {
      // Return to center
      controls.start({
        x: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    }
  };

  const removeTopCard = (direction: 'left' | 'right') => {
    console.log(`Swiped ${direction}: ${articles[articles.length - 1]?.title}`);
    // In a real app, handle bookmarking or dismissing here
    setArticles((prev) => prev.slice(0, -1));
    x.set(0); // Reset x motion value for the next card
    // Reset animation controls *after* state update triggers re-render
    // Small delay to ensure state update completes
    setTimeout(() => controls.start({ x: 0, opacity: 1, transition: { duration: 0 } }), 50);
  };

   const handleSwipeButtonClick = (direction: 'left' | 'right') => {
    const targetX = direction === 'right' ? '150%' : '-150%';
    controls.start({
      x: targetX,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    }).then(() => removeTopCard(direction));
  };


  if (articles.length === 0) {
    return <div className="text-center text-muted-foreground mt-10">No more articles to show!</div>;
  }

  return (
    <div className="relative w-full max-w-md h-[450px] flex items-center justify-center">
      {articles.map((article, index) => {
        const isTopCard = index === articles.length - 1;
        return (
          <motion.div
            key={article.id}
            className="absolute w-[90%] h-[400px] cursor-grab"
            style={{
              x: isTopCard ? x : 0,
              rotate: isTopCard ? rotate : 0,
              zIndex: index, // Stack cards visually
              backgroundImage: isTopCard ? backgroundGlow : 'none',
            }}
            drag={isTopCard ? "x" : false}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Constrain drag movement visually, logic handles swipe
            onDragEnd={handleDragEnd}
            initial={{ scale: 1 - (articles.length - 1 - index) * 0.05, y: (articles.length - 1 - index) * -10 }} // Stacking effect
            animate={isTopCard ? controls : { scale: 1 - (articles.length - 1 - index) * 0.05, y: (articles.length - 1 - index) * -10 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            whileTap={{ cursor: "grabbing" }}
          >
            <Card className="w-full h-full flex flex-col justify-between shadow-xl glass overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{article.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground pt-1">
                  {article.readingTime} min read
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm leading-relaxed">{article.summary}</p>
              </CardContent>
              {/* Optionally add footer or actions inside the card */}
            </Card>
          </motion.div>
        );
      })}
       {/* Swipe Buttons outside the card stack */}
       {articles.length > 0 && (
         <div className="absolute bottom-[-60px] flex justify-center gap-4 w-full">
            <Button variant="outline" size="icon" className="rounded-full w-12 h-12 bg-destructive/10 border-destructive text-destructive hover:bg-destructive/20" onClick={() => handleSwipeButtonClick('left')}>
                <ThumbsDown className="w-6 h-6" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-12 h-12 bg-primary/10 border-primary text-primary hover:bg-primary/20" onClick={() => handleSwipeButtonClick('right')}>
                <ThumbsUp className="w-6 h-6" />
            </Button>
         </div>
       )}
    </div>
  );
}
