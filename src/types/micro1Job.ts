export interface Job {
  id: string; // Job UUID or identifier (e.g. "list_AAABoZ5Af5H0GMoyXaBBDKW2" or Micro1 UUID)
  title: string;
  companyName: string;
  companyLogo?: string;
  category: "Engineering" | "AI & Machine Learning" | "Design" | "Product" | "Data & Analytics" | "Marketing";
  location: string;
  type: "Full-Time" | "Part-Time" | "Contract";
  hourlyMin: number; // e.g. 35
  hourlyMax: number; // e.g. 70
  referralReward: number; // in USD, e.g. 750 ($750 reward)
  openings: number;
  postedDate: string; // ISO date or display date
  isNew: boolean;
  isHighDemand: boolean;
  status: "Open" | "Closed";
  requiredSkills: string[];
  description: string;
  qualifications: string[];
  responsibilities: string[];
  description_id?: string; // Optional Indonesian translation
  qualifications_id?: string[]; // Optional Indonesian translation
  responsibilities_id?: string[]; // Optional Indonesian translation
  customReferralUrl?: string; // Optional override
}

export const DEFAULT_REFERRAL_CODE = "b90e6c12-07b5-40c2-9c3f-9cb507007066";
export const UTM_PARAMS = "utm_source=referral&utm_medium=share&utm_campaign=job_referral";

export const MICRO1_ALL_JOBS_REFERRAL_URL = `https://refer.micro1.ai/referral/jobs?referralCode=${DEFAULT_REFERRAL_CODE}&${UTM_PARAMS}`;

export const MERCOR_REFERRAL_CODE = "23bf3ef3-f71e-49c3-90da-02d58276c037";
export const MERCOR_GENERAL_REFERRAL_URL = "https://t.mercor.com/yqEan";

/**
 * Generates the referral URL for a specific job post.
 * Supports custom URLs, Mercor jobs (list_...), and Micro1 posts.
 */
export function getJobReferralUrl(jobId?: string, customUrl?: string): string {
  if (customUrl && customUrl.trim().length > 0) {
    return customUrl;
  }
  if (!jobId || jobId.trim().length === 0) {
    return MICRO1_ALL_JOBS_REFERRAL_URL;
  }
  if (jobId.startsWith("list_") || jobId.startsWith("mercor_")) {
    return `https://work.mercor.com/jobs/${jobId}?referralCode=${MERCOR_REFERRAL_CODE}&utm_campaign=job&utm_content=${jobId}&utm_medium=direct&utm_source=referral`;
  }
  return `https://jobs.micro1.ai/post/${jobId}?referralCode=${DEFAULT_REFERRAL_CODE}&${UTM_PARAMS}`;
}

export const CATEGORIES = [
  "All",
  "Engineering",
  "AI & Machine Learning",
  "Design",
  "Product",
  "Data & Analytics",
  "Marketing"
] as const;

