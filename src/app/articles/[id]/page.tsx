
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Bookmark, Clock, Coins, Share2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge'; // Badge not used directly here currently
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state
// import { sampleArticles } from '@/data/sample-articles'; // Remove sample data import
import type { Article } from '@/data/sample-articles'; // Keep type definition

// --- Data Fetching ---
// Option 1: Fetch directly from the mock API (Simpler for this single article view)
async function fetchArticleById(id: string): Promise<Article | null> {
  try {
    const response = await fetch(`http://localhost:3001/articles/${id}`);
    if (!response.ok) {
      // Handle specific errors like 404 Not Found
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const article: Article = await response.json();
    return article;
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return null; // Indicate fetch failure
  }
}

// Option 2: Use Redux state (If articles are already loaded in the store)
// This requires selecting the specific article from the articlesState.articles array.
// import { useSelector } from 'react-redux';
// import type { RootState } from '@/redux/rootReducer';
// const getArticleFromState = (id: string, articles: Article[]) => articles.find(a => a.id === id);


export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = params.id as string;
  const [article, setArticle] = useState<Article | null | undefined>(undefined); // undefined initially, null if not found/error, Article if found
  const [isLoading, setIsLoading] = useState(true);

  // --- Use Option 1: Fetch directly ---
  useEffect(() => {
    if (articleId) {
      setIsLoading(true);
      fetchArticleById(articleId)
        .then(data => {
            setArticle(data); // Sets to Article object or null
        })
        .catch(() => {
            setArticle(null); // Set to null on fetch error
        })
        .finally(() => {
            setIsLoading(false);
        });
    }
  }, [articleId]);

  // --- Use Option 2: Get from Redux state ---
  // const { articles: allArticles, loading: articlesLoading } = useSelector((state: RootState) => state.articlesState);
  // useEffect(() => {
  //   if (!articlesLoading && allArticles.length > 0 && articleId) {
  //     const foundArticle = getArticleFromState(articleId, allArticles);
  //     setArticle(foundArticle); // Found article or undefined
  //     setIsLoading(false);
  //   } else if (!articlesLoading && articleId) {
  //      // Handle case where articles finished loading but the specific one wasn't found
  //      // Maybe fetch it directly as a fallback?
  //      setIsLoading(true);
  //      fetchArticleById(articleId).then(setArticle).finally(() => setIsLoading(false));
  //   } else {
  //     setIsLoading(articlesLoading); // Reflect Redux loading state
  //   }
  // }, [articleId, allArticles, articlesLoading]);


  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-var(--navbar-height,56px))]">
        {/* Loading Skeleton */}
        <Skeleton className="h-8 w-32 mb-6 rounded" /> {/* Back button skeleton */}
        <Card className="w-full max-w-4xl mx-auto shadow-lg card-transition glass">
          <CardHeader className="border-b pb-4">
            <Skeleton className="h-10 w-3/4 mb-3 rounded" /> {/* Title skeleton */}
            <div className="flex items-center space-x-4">
              <Skeleton className="h-5 w-24 rounded" /> {/* Reading time skeleton */}
              <Skeleton className="h-5 w-20 rounded" /> {/* Coins skeleton */}
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-5/6 rounded" />
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-4/6 rounded" />
          </CardContent>
           <CardContent className="flex flex-wrap gap-3 pt-4 border-t mt-8"> {/* Adjusted padding for footer */}
             <Skeleton className="h-9 w-32 rounded" />
             <Skeleton className="h-9 w-24 rounded" />
           </CardContent>
        </Card>
      </div>
    );
  }


  if (!article) {
    return (
      <div className="container mx-auto py-12 px-4 text-center min-h-[calc(100vh-var(--navbar-height,56px))] flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <h1 className="text-2xl font-semibold mb-4">Oops! Article Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find the article you were looking for.</p>
          <Link href="/articles">
            <Button variant="outline" size="sm" className="btn-gradient text-primary-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Article Found - Render Content
  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-var(--navbar-height,56px))]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <Link href="/articles" className="inline-block mb-6">
          <Button variant="outline" size="sm" className="hover:bg-accent/80 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
          </Button>
        </Link>

        <Card className="w-full max-w-4xl mx-auto shadow-lg card-transition glass">
           {/* Optional: Add subtle gradient background animation */}
           {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 opacity-50 animate-pulse duration-[5000ms]"></div> */}
           <CardHeader className="relative z-10 border-b pb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <CardTitle className="text-3xl md:text-4xl font-bold mb-2">
                {article.title}
              </CardTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                {/* Optional: Author Name */}
                {/* <span>By Author Name</span>
                <span>•</span> */}
                <div className="flex items-center">
                  <Clock className="mr-1.5 h-4 w-4 text-primary" />
                  <span>{article.readingTime} min read</span>
                </div>
                <div className="flex items-center">
                  <Coins className="mr-1.5 h-4 w-4 text-pink-500" />
                  <span>{article.coinsOffered || 0} Coins</span> {/* Default to 0 */}
                </div>
              </div>
            </motion.div>
          </CardHeader>
          <CardContent className="relative z-10 pt-6 text-base md:text-lg leading-relaxed space-y-6">
            {/* Full Article Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="prose dark:prose-invert max-w-none" // Tailwind Typography for basic styling
             >
                 {/* Displaying summary as content for demo - REPLACE with actual full content */}
                 <p>{article.summary}</p>
                 <p>This is placeholder content for the full article body. Replace this with the actual article content fetched from your API or state.</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                 <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                 {/* Add more paragraphs or actual article content here */}
            </motion.div>


            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-3 pt-4 border-t mt-8"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button variant="outline" className="hover:bg-accent/80 transition-colors">
                <Bookmark className="mr-2 h-4 w-4" /> Save for Later
              </Button>
              <Button variant="outline" className="hover:bg-accent/80 transition-colors">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
