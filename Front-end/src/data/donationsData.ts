import { Heart, Users, Target } from 'lucide-react';

export const campaigns = [
  {
    id: 1,
    title: 'Rural Healthcare Initiative',
    description: 'Bringing quality healthcare to remote villages across India. Your contribution helps us set up medical camps, provide essential medicines, and train community health workers.',
    image: 'https://images.unsplash.com/photo-1769147555720-71fc71bfc216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJ1aWxkaW5nJTIwbW9kZXJufGVufDF8fHx8MTc3NjM2MDk2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    raised: 1250000,
    goal: 2500000,
    donors: 842,
  },
  {
    id: 2,
    title: 'Free Medical Camps',
    description: 'Organizing free health checkup camps for underprivileged communities. We provide basic health screenings, diagnostic tests, and consultations with qualified doctors.',
    image: 'https://images.unsplash.com/photo-1763770446480-d6b3f311b5aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGRpdmVyc2V8ZW58MXx8fHwxNzc2MzU0NTE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    raised: 875000,
    goal: 1500000,
    donors: 623,
  },
  {
    id: 3,
    title: 'Emergency Medical Fund',
    description: 'Support for patients facing medical emergencies who cannot afford treatment. Every donation helps save a life and provides hope to families in crisis.',
    image: 'https://images.unsplash.com/photo-1767449441925-737379bc2c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwaGVhbHRoY2FyZSUyMGRvbmF0aW9ufGVufDF8fHx8MTc3NjQwNTAxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    raised: 2100000,
    goal: 3000000,
    donors: 1245,
  },
  {
    id: 4,
    title: 'Child Nutrition Program',
    description: 'Fighting malnutrition among children in underserved areas. We provide nutritional supplements, education, and regular health monitoring.',
    image: 'https://images.unsplash.com/photo-1659352790848-b6455e5a2129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYW1pbHklMjBoZWFsdGhjYXJlfGVufDF8fHx8MTc3NjQwNTAxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    raised: 650000,
    goal: 1000000,
    donors: 456,
  },
];

export const impactStories = [
  {
    id: 1,
    title: 'Saved 500+ Lives',
    description: 'Through emergency medical fund',
    icon: Heart,
  },
  {
    id: 2,
    title: '50,000+ Patients',
    description: 'Treated in free medical camps',
    icon: Users,
  },
  {
    id: 3,
    title: '100+ Villages',
    description: 'Now have access to healthcare',
    icon: Target,
  },
];
