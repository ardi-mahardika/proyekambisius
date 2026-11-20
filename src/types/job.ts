// src/types/job.ts
export interface Job {
  id: number | string;
  url: string;
  title: string;
  company_name: string;
  company_logo: string | null;
  category: string;
  tags: string[];
  job_type: string; // "Full Time" | "Contract" | "Part Time"
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
  source: "remotive" | "curated";
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  hasMore: boolean;
}

export const JOB_CATEGORIES = [
  { id: "all", label: "🌐 Semua" },
  { id: "software-dev", label: "💻 Developer" },
  { id: "design", label: "🎨 Design" },
  { id: "marketing", label: "📢 Marketing" },
  { id: "data", label: "📊 Data / AI" },
  { id: "product", label: "🚀 Product" },
  { id: "writing", label: "✍️ Writing" },
  { id: "customer-support", label: "🎧 Support" },
];

