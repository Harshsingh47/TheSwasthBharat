import { Globe, Layout, Search, Camera, Video, Users, MessageSquare, TrendingUp } from 'lucide-react';

export const packages = [
  {
    name: "Essential Care",
    tagline: "Perfect for individual doctors and new clinics.",
    monthly: "5,000",
    sixMonth: "25,000",
    yearly: "50,000",
    benefits: [
      "Doctor listing on Swasth Bharat",
      "Verified doctor badge",
      "Facebook & Instagram promotion",
      "Google My Business (GMB) promotion",
      "15 social media posts/month",
      "1 promotional video/month",
      "WhatsApp inquiry support",
      "Basic SEO visibility",
      "Healthcare campaign participation",
      "Monthly performance report"
    ],
    cta: "Get Started",
    popular: false,
    color: "primary"
  },
  {
    name: "Growth Plus",
    tagline: "Designed for specialists and growing centers.",
    monthly: "7,999",
    sixMonth: "39,999",
    yearly: "80,000",
    benefits: [
      "Everything in Essential Package PLUS:",
      "Meta Ads management",
      "Advanced digital promotion",
      "25 social media posts/month",
      "3–5 promotional videos/month",
      "Lead generation support",
      "Appointment promotion",
      "Branding consultation",
      "Bi-weekly reports",
      "Enhanced patient engagement",
      "Priority support"
    ],
    cta: "Grow Faster",
    popular: true,
    color: "cta"
  },
  {
    name: "Premium Brand",
    tagline: "For hospitals and multi-specialty brands.",
    monthly: "15,000",
    sixMonth: "75,000",
    yearly: "1,50,000",
    benefits: [
      "Everything in Growth Plus PLUS:",
      "Priority doctor listing",
      "Featured homepage placement",
      "Advanced Meta Ads campaigns",
      "Professional landing page creation",
      "35+ premium posts/month",
      "6–8 professional videos/month",
      "SEO optimization",
      "Weekly analytics reports",
      "Dedicated branding support",
      "Reputation & review management",
      "Premium campaign collaborations"
    ],
    cta: "Become a Premium Partner",
    popular: false,
    color: "success"
  }
];

export const additionalServices = [
  { icon: Globe, title: "Google Ads Campaigns", desc: "Targeted patient reach through search advertising." },
  { icon: Layout, title: "Website Development", desc: "Custom, responsive healthcare websites that convert." },
  { icon: Search, title: "SEO Optimization", desc: "Rank #1 for local healthcare searches in your area." },
  { icon: Camera, title: "Professional Photoshoot", desc: "Showcase your clinic and team with premium visuals." },
  { icon: Video, title: "YouTube Content", desc: "Educational healthcare videos for massive authority." },
  { icon: Users, title: "Influencer Promotion", desc: "Collaborate with local health influencers for reach." },
  { icon: MessageSquare, title: "Review Management", desc: "Build trust through automated patient feedback." },
  { icon: TrendingUp, title: "Camp Promotion", desc: "Scale your healthcare awareness camps effectively." }
];
