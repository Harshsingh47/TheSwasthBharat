import { HeroSection, AssociatesSection } from '../sections/home';
import { TopDoctors } from '../sections/home/TopDoctors';
import { SuccessStories } from '../sections/home/SuccessStories';
import { BlogPreview } from '../sections/home/BlogPreview';
import { SocialImpact } from '../sections/home/SocialImpact';

export default function Home() {
  return (
    <div className="bg-[#eef2ff] min-h-screen py-4 md:py-8 px-3 md:px-6">
      <div className="max-w-[1440px] mx-auto bg-surface rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.03)] border border-white/50">
        <HeroSection />
        <TopDoctors />
        <AssociatesSection />
        <SuccessStories />
        <BlogPreview />
        <SocialImpact />
      </div>
    </div>
  );
}
