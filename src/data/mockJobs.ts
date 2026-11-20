export interface JobItem {
  id: string;
  title: string;
  platform: "Mercor" | "Micro1" | "Toptal";
  platformBadgeColor: string;
  company: string;
  salary: string; // e.g. "$40 - $75 / hr" or "$80,000 - $120,000 / yr"
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  tags: string[];
  postedTime: string;
  description: string;
  requirements: string[];
  referralUrl: string;
  isHot?: boolean;
}

export const MERCOR_REFERRAL = "https://t.mercor.com/QSIRM";
export const MICRO1_REFERRAL = "https://micro1.ai/?ref=kerjaglobal";

export const MOCK_JOBS: JobItem[] = [
  {
    id: "mercor-ai-eval-01",
    title: "AI Quality & Prompt Evaluator (Indonesian / English)",
    platform: "Mercor",
    platformBadgeColor: "bg-blue-600 text-white",
    company: "Stealth AI Lab via Mercor",
    salary: "$35 - $60 / hr",
    location: "Remote (Indonesia / Global)",
    type: "Contract",
    tags: ["AI & LLM", "Prompt Engineering", "Bilingual", "Entry-Friendly"],
    postedTime: "2 jam yang lalu",
    description: "Evaluasi dan benchmarking respons Model Bahasa Besar (LLM) untuk akurasi budaya, tata bahasa Indonesia-Inggris, dan penalaran logis.",
    requirements: [
      "Fasih berbahasa Indonesia & Inggris dengan pemahaman nuansa lokal",
      "Keahlian analitis dan ketelitian membaca",
      "Tidak wajib latar belakang coding teknis, pemahaman AI dasar lebih disukai"
    ],
    referralUrl: MERCOR_REFERRAL,
    isHot: true
  },
  {
    id: "mercor-fullstack-02",
    title: "Senior Full-Stack Engineer (Next.js & Python FastAPI)",
    platform: "Mercor",
    platformBadgeColor: "bg-blue-600 text-white",
    company: "Silicon Valley Tech Partner",
    salary: "$70 - $110 / hr",
    location: "100% Remote",
    type: "Full-time",
    tags: ["React", "Next.js", "Python", "FastAPI", "PostgreSQL"],
    postedTime: "5 jam yang lalu",
    description: "Membangun sistem frontend berkinerja tinggi serta API skala besar untuk klien startup tier-1 di San Francisco.",
    requirements: [
      "Minimal 4+ tahun pengalaman profesional di Next.js dan Python",
      "Pengalaman arsitektur cloud (AWS/GCP)",
      "Kemampuan komunikasi bahasa Inggris yang lancar"
    ],
    referralUrl: MERCOR_REFERRAL,
    isHot: true
  },
  {
    id: "micro1-frontend-01",
    title: "Frontend Developer (Tailwind & TypeScript)",
    platform: "Micro1",
    platformBadgeColor: "bg-purple-600 text-white",
    company: "Fintech Growth via Micro1",
    salary: "$4,500 - $7,000 / bln",
    location: "Remote (APAC / Flexible)",
    type: "Full-time",
    tags: ["TypeScript", "Tailwind CSS", "Next.js", "UI/UX"],
    postedTime: "Kemarin",
    description: "Fokus pada pembuatan dashboard analitik modern dengan pengalaman UI/UX kelas dunia serta micro-interactions.",
    requirements: [
      "Menguasai TypeScript, Tailwind CSS, dan State Management",
      "Portofolio web responsif dan interaktif",
      "Lulus tes interview AI vetting Micro1"
    ],
    referralUrl: MERCOR_REFERRAL,
    isHot: false
  },
  {
    id: "mercor-data-03",
    title: "Data Annotation & Reasoning Specialist",
    platform: "Mercor",
    platformBadgeColor: "bg-blue-600 text-white",
    company: "Frontier AI Foundation",
    salary: "$30 - $50 / hr",
    location: "100% Remote",
    type: "Contract",
    tags: ["Data Annotation", "Logic", "No-Code", "AI Training"],
    postedTime: "1 hari yang lalu",
    description: "Memberikan feedback penalaran matematis atau bahasa terstruktur untuk pelatihan model AI generasi berikutnya.",
    requirements: [
      "Latar belakang STEM atau Linguistik diutamakan",
      "Kemampuan membaca dan menganalisa data secara kritis",
      "Bisa bekerja fleksibel 20-40 jam/minggu"
    ],
    referralUrl: MERCOR_REFERRAL,
    isHot: true
  },
  {
    id: "micro1-ai-eng-02",
    title: "AI Workflow & Automation Specialist",
    platform: "Micro1",
    platformBadgeColor: "bg-purple-600 text-white",
    company: "E-Commerce Scaleup",
    salary: "$5,000 - $8,500 / bln",
    location: "Remote (Worldwide)",
    type: "Full-time",
    tags: ["Make / n8n", "Python", "OpenAI API", "LangChain"],
    postedTime: "2 hari yang lalu",
    description: "Mengembangkan pipeline otomatisasi agen AI untuk support, order processing, dan integrasi CRM perusahaan.",
    requirements: [
      "Berpengalaman menyusun automation pipeline dan API webhook",
      "Pernah menghubungkan LLM ke alur kerja bisnis riil",
      "Problem solver mandiri"
    ],
    referralUrl: MERCOR_REFERRAL,
    isHot: false
  },
  {
    id: "mercor-devops-04",
    title: "Cloud Infrastructure & DevOps Engineer",
    platform: "Mercor",
    platformBadgeColor: "bg-blue-600 text-white",
    company: "US Enterprise AI Platform",
    salary: "$65 - $95 / hr",
    location: "100% Remote",
    type: "Full-time",
    tags: ["Kubernetes", "Terraform", "AWS", "CI/CD"],
    postedTime: "3 hari yang lalu",
    description: "Kelola cluster Kubernetes dan otomatisasi CI/CD untuk deployment model machine learning berkecepatan tinggi.",
    requirements: [
      "3+ tahun mengelola cluster cloud production",
      "Paham arsitektur microservices dan security standard"
    ],
    referralUrl: MERCOR_REFERRAL,
    isHot: false
  }
];

