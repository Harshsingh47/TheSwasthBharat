export interface Scheme {
  id: string;
  name: string;
  tagline: string;
  category: 'National' | 'Himachal Pradesh' | 'Financial' | 'Mother & Child';
  benefits: string[];
  process: string[];
  application: string[];
  claims: string[];
  officialLink: string;
  color: string;
}

export const schemes: Scheme[] = [
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat (PM-JAY)',
    tagline: 'World\'s largest government-funded healthcare program',
    category: 'National',
    benefits: [
      'Coverage of ₹5 Lakh per family per year',
      'Over 10.74 crore poor and vulnerable entitled families covered',
      'Cashless access to health care services',
      'Covers pre-existing diseases from day one'
    ],
    process: [
      'Check eligibility via the official portal or Common Service Centers (CSC)',
      'Verify identity using Aadhaar or Ration Card',
      'Receive the Ayushman Golden Card'
    ],
    application: [
      'Visit mera.pmjay.gov.in to check eligibility',
      'Visit nearest Empaneled Hospital or CSC with Aadhaar Card',
      'Complete biometric authentication',
      'Collect your Golden Card'
    ],
    claims: [
      'Visit any PM-JAY empaneled hospital across India',
      'Present your Golden Card at the Ayushman Mitra desk',
      'Treatment is completely cashless; no payment required at hospital',
      'Hospital submits claim directly to the government'
    ],
    officialLink: 'https://pmjay.gov.in',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'himcare',
    name: 'HIMCARE (Himachal Pradesh)',
    tagline: 'State-specific health coverage for the people of Himachal',
    category: 'Himachal Pradesh',
    benefits: [
      'Coverage up to ₹5 Lakh per year for a family of five',
      'Covers treatment in government and selected private hospitals',
      'Special focus on families not covered under PM-JAY',
      'Low premium for non-vulnerable categories'
    ],
    process: [
      'Register online or through Lok Mitra Kendras',
      'Pay the applicable premium based on category',
      'Download and print the HIMCARE card'
    ],
    application: [
      'Visit hpsbys.in to apply online',
      'Upload Ration Card, Aadhaar, and Category Certificate',
      'Pay premium (₹0 to ₹1000 depending on category)',
      'Wait for verification and card generation'
    ],
    claims: [
      'Present HIMCARE card at the hospital registration counter',
      'The hospital will verify the card and balance',
      'Cashless treatment provided for covered procedures',
      'Post-treatment claims handled by the hospital with HP Health Society'
    ],
    officialLink: 'https://hpsbys.in',
    color: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'janani-suraksha',
    name: 'Janani Suraksha Yojana (JSY)',
    tagline: 'Safe motherhood intervention for poor pregnant women',
    category: 'Mother & Child',
    benefits: [
      'Cash assistance for institutional delivery',
      'Free transport for pregnant women to the hospital',
      'Incentives for ASHA workers supporting the mother',
      'Special focus on Low Performing States (LPS)'
    ],
    process: [
      'Register at the nearest Health Sub-Centre or PHC',
      'Liaise with the local ASHA worker for institutional delivery',
      'Provide bank account details for direct benefit transfer'
    ],
    application: [
      'Approach the nearest government health facility',
      'Register within the first trimester of pregnancy',
      'Obtain the Mother and Child Protection (MCP) card',
      'Submit identity proof and BPL card if applicable'
    ],
    claims: [
      'Cash incentive provided post-delivery at the facility',
      'Direct Benefit Transfer (DBT) to the mother\'s linked bank account',
      'ASHA worker helps facilitate the documentation',
      'Amount varies between rural (₹1400) and urban (₹1000) areas'
    ],
    officialLink: 'https://nhm.gov.in',
    color: 'from-pink-500 to-rose-600'
  }
];
