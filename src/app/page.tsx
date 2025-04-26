import { SwipeableArticleCards } from "@/components/features/swipeable-article-cards";

export default function Home() {
  return (
    <div className="container mx-auto py-8 flex flex-col items-center justify-center min-h-[calc(100vh-var(--navbar-height,56px))]">
       <h1 className="text-3xl font-bold mb-8 text-center">Swipe Articles</h1>
       <SwipeableArticleCards />
    </div>
  );
}
