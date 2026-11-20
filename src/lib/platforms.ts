export interface Platform {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  category: "ai-first" | "freelance" | "remote" | "agency";
  commission: string;
  cookieDuration: string;
  avgEarning: string;
  referralUrl: string;
  features: string[];
  pros: string[];
  cons: string[];
  rating: number;
  reviews: number;
  badge?: "Best" | "Hot" | "New" | "High Pay";
  color: string;
}

export const platforms: Platform[] = [
  {
    id: "mercor",
    name: "Mercor",
    tagline: "Silicon Valley AI Talent Matcher",
    description:
      "Platform rekrutmen berbasis AI tercepat di dunia yang menghubungkan engineer, AI trainer, dan talenta global langsung dengan tech giants dan top startups tanpa perantara berbelit.",
    logo: "/logos/macro.svg",
    category: "ai-first",
    commission: "Hingga $1,000+ per hire",
    cookieDuration: "90 hari",
    avgEarning: "$30 - $110 / jam",
    referralUrl: process.env.NEXT_PUBLIC_MERCOR_REFERRAL_URL || "https://t.mercor.com/QSIRM",
    features: ["AI Video Interview", "Gaji Dollar Per Jam", "Silicon Valley Jobs", "100% Remote"],
    pros: ["AI screening cepat", "Bayaran tinggi USD", "Banyak loker AI evaluator & dev"],
    cons: ["Perlu tes speaking / AI vetting"],
    rating: 4.9,
    reviews: 2410,
    badge: "Hot",
    color: "from-blue-600 to-indigo-800",
  },
  {
    id: "micro1",
    name: "Micro1",
    tagline: "Hire AI-Vetted Talent",
    description:
      "Micro1 menggunakan AI untuk memverifikasi skill kandidat secara mendalam, menghubungkan talenta global dengan startup dan scaleup dunia.",
    logo: "/logos/micro1.svg",
    category: "ai-first",
    commission: "Rp 300rb–1.5jt per referral",
    cookieDuration: "60 hari",
    avgEarning: "Rp 2jt/bulan",
    referralUrl: process.env.NEXT_PUBLIC_MICRO1_REFERRAL_URL || "https://micro1.ai",
    features: ["AI vetting", "Global startups", "Fast placement", "Skill assessment"],
    pros: ["Proses cepat", "AI assessment transparan", "Banyak job posting"],
    cons: ["Komisi lebih kecil dari Macro"],
    rating: 4.6,
    reviews: 892,
    badge: "Hot",
    color: "from-purple-600 to-purple-800",
  },
  {
    id: "toptal",
    name: "Toptal",
    tagline: "Top 3% of Freelance Talent",
    description:
      "Toptal menyeleksi hanya 3% terbaik dari freelancer yang mendaftar, menjadikannya platform eksklusif untuk elite talent dan klien premium.",
    logo: "/logos/toptal.svg",
    category: "freelance",
    commission: "Rp 1jt–5jt per referral",
    cookieDuration: "30 hari",
    avgEarning: "Rp 5jt/bulan",
    referralUrl: process.env.NEXT_PUBLIC_TOPTAL_REFERRAL_URL || "https://toptal.com",
    features: ["Elite network", "Premium clients", "High rates", "Dedicated support"],
    pros: ["Komisi tertinggi", "Brand terpercaya", "Klien Fortune 500"],
    cons: ["Susah lolos seleksi", "Cookie pendek"],
    rating: 4.7,
    reviews: 3210,
    badge: "High Pay",
    color: "from-cyan-600 to-cyan-800",
  },
  {
    id: "upwork",
    name: "Upwork",
    tagline: "World\'s Work Marketplace",
    description:
      "Platform freelance terbesar di dunia dengan jutaan job listing di berbagai bidang, dari writing hingga software development.",
    logo: "/logos/upwork.svg",
    category: "freelance",
    commission: "Rp 150rb–500rb per referral",
    cookieDuration: "30 hari",
    avgEarning: "Rp 1.5jt/bulan",
    referralUrl: process.env.NEXT_PUBLIC_UPWORK_REFERRAL_URL || "https://upwork.com",
    features: ["Largest marketplace", "All categories", "Escrow protection", "Global clients"],
    pros: ["Volume besar", "Brand terkenal", "Semua kategori"],
    cons: ["Komisi kecil", "Kompetisi tinggi"],
    rating: 4.3,
    reviews: 8920,
    badge: "New",
    color: "from-green-600 to-green-800",
  },
];

export const categories = [
  { id: "all", label: "Semua Platform" },
  { id: "ai-first", label: "🤖 AI-First" },
  { id: "freelance", label: "💼 Freelance" },
  { id: "remote", label: "🌍 Remote Work" },
  { id: "agency", label: "🏢 Agency" },
];
