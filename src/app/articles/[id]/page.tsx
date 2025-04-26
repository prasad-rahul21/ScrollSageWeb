
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Bookmark, Clock, Coins, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sampleArticles } from '@/data/sample-articles'; // Import sample data

// Fetch article data based on ID (replace with actual data fetching)
const getArticleById = (id: string) => {
  return sampleArticles.find((article) => article.id === id);
};

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = params.id as string;
  const article = getArticleById(articleId);

  if (!article) {
    return (
      <div className="container mx-auto py-12 px-4 text-center min-h-[calc(100vh-var(--navbar-height,56px))]">
        <h1 className="text-2xl font-semibold">Article not found</h1>
        <Link href="/articles">
          <Button variant="link" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-var(--navbar-height,56px))]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <Link href="/articles" className="inline-block mb-6">
          <Button variant="outline" size="sm">
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
                  <span>{article.coinsOffered} Coins</span>
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
                 {/* Displaying summary as content for demo */}
                 <p>{article.summary}</p>
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
              <Button variant="outline">
                <Bookmark className="mr-2 h-4 w-4" /> Save for Later
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
