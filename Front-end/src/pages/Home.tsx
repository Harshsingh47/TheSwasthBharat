import { HeroSection } from '../sections/home/HeroSection';
import { Specialties } from '../sections/home/Specialties';
import { TopDoctors } from '../sections/home/TopDoctors';
import { SuccessStories } from '../sections/home/SuccessStories';
import { Reviews } from '../sections/home/Reviews';
import { BlogPreview } from '../sections/home/BlogPreview';
import { SocialImpact } from '../sections/home/SocialImpact';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="h-20"></div>
      <Specialties />
      <TopDoctors />
      <SuccessStories />
      <Reviews />
      <BlogPreview />
      <SocialImpact />
    </div>
  );
}
