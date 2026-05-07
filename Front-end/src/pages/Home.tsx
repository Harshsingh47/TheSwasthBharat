import { HeroSection } from '../sections/home/HeroSection';
import { TopDoctors } from '../sections/home/TopDoctors';
import { SuccessStories } from '../sections/home/SuccessStories';
import { Reviews } from '../sections/home/Reviews';
import { BlogPreview } from '../sections/home/BlogPreview';
import { SocialImpact } from '../sections/home/SocialImpact';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TopDoctors />
      <SuccessStories />
      <Reviews />
      <BlogPreview />
      <SocialImpact />
    </div>
  );
}
