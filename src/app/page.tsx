
import { LandingPage } from '@/components/pages/landing-page';

export default function Home() {
  return (
    <div className="container mx-auto py-8 flex flex-col items-center justify-center min-h-[calc(100vh-var(--navbar-height,56px))]">
       <LandingPage />
    </div>
  );
}
