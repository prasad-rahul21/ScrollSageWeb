
export interface Article {
  id: string; // Changed to string to match potential API responses or leave as number if db uses number
  title: string;
  summary: string;
  readingTime: number; // in minutes
  coinsOffered?: number; // Made optional as it might not always be present
  tags?: string[]; // Added tags array, optional
  // Add other relevant fields like author, fullContent, publishDate, etc.
}

// Removed the sampleArticles array as data is now sourced from the mock API (dbAll.json)
// export const sampleArticles: Article[] = [ ... ];
