import { Job, DEFAULT_REFERRAL_CODE } from "@/types/micro1Job";
import { INITIAL_MICRO1_JOBS } from "@/data/micro1InitialJobs";
import { MERCOR_INITIAL_JOBS } from "@/data/mercorJobs";
import { filterJobs, isJobAllowed } from "@/lib/jobFilters";
import { fetchMercorJobsLive } from "@/lib/mercorSync";

// Cache duration: 15 minutes (in milliseconds)
const CACHE_TTL_MS = 15 * 60 * 1000;

// Track active jobs per source
let currentMercorJobs: Job[] = MERCOR_INITIAL_JOBS;
let currentMicro1Jobs: Job[] = INITIAL_MICRO1_JOBS;

// In-memory cache for server-side (filtered globally)
let serverJobs: Job[] = filterJobs([...currentMercorJobs, ...currentMicro1Jobs]);
let lastFetchedTime: number = Date.now();
let isSyncing = false;

function getCategory(domainSlug?: string, title?: string): Job["category"] {
  const d = (domainSlug || "").toLowerCase();
  const t = (title || "").toLowerCase();

  if (
    d.includes("ai") ||
    d.includes("machine-learning") ||
    t.includes("ai ") ||
    t.includes("prompt") ||
    t.includes("llm") ||
    t.includes("machine learning")
  ) {
    return "AI & Machine Learning";
  }
  if (
    d.includes("software") ||
    d.includes("engineering") ||
    d.includes("robotics") ||
    d.includes("cybersecurity") ||
    t.includes("developer") ||
    t.includes("engineer")
  ) {
    return "Engineering";
  }
  if (
    d.includes("design") ||
    d.includes("arts") ||
    t.includes("design") ||
    t.includes("ui/ux") ||
    t.includes("creative")
  ) {
    return "Design";
  }
  if (
    d.includes("data") ||
    d.includes("finance") ||
    t.includes("data") ||
    t.includes("analyst") ||
    t.includes("finance") ||
    t.includes("accountant")
  ) {
    return "Data & Analytics";
  }
  if (
    d.includes("marketing") ||
    d.includes("sales") ||
    t.includes("marketing") ||
    t.includes("sales") ||
    t.includes("growth")
  ) {
    return "Marketing";
  }
  if (
    d.includes("operations") ||
    d.includes("generalist") ||
    t.includes("product") ||
    t.includes("manager") ||
    t.includes("operations")
  ) {
    return "Product";
  }
  return "Engineering";
}

function getDisplayCompany(title: string): string {
  const pool = [
    "Silicon Valley Tech Co.",
    "Global AI Innovations",
    "Apex Cloud Systems",
    "NextGen Scaleup",
    "NorthStar Global Labs",
    "Horizon Digital Partners",
    "Vertex Tech Partners",
    "Quantum Enterprise Solutions",
    "Beacon Global Ventures",
    "Crestline Tech"
  ];
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash + title.charCodeAt(i)) % pool.length;
  }
  return pool[hash];
}

interface RawMicro1Job {
  job_id: string;
  job_name: string;
  engagement_type?: string | null;
  location_type?: string | null;
  date_posted?: string;
  no_of_openings?: number;
  company_name?: string;
  is_high_demand_job?: string | number;
  role_type?: string;
  job_type?: string;
  domain_slug?: string;
  skills?: string[];
  referral_reward_amount?: number;
  apply_url?: string;
  ideal_hourly_rate?: {
    min?: number;
    max?: number;
  };
  ideal_monthly_salary_min?: number | null;
  ideal_monthly_salary_max?: number | null;
}

/**
 * Fetch and synchronize all available jobs directly from the Micro1 Referral API.
 * Never exposes the parent website name ("micro1").
 */
export async function syncJobsFromMicro1(): Promise<Job[]> {
  if (isSyncing) {
    return serverJobs;
  }

  isSyncing = true;
  try {
    let allRaw: RawMicro1Job[] = [];
    let page = 1;
    const limit = 100;

    while (true) {
      const url = `https://prod-api.micro1.ai/api/v1/job/portal/referral/${DEFAULT_REFERRAL_CODE}/jobs?page=${page}&limit=${limit}`;
      const res = await fetch(url, {
        headers: {
          accept: "application/json",
          "x-custom-lang": "en"
        },
        // Cache revalidation for Next.js fetch layer
        next: { revalidate: 900 }
      });

      if (!res.ok) {
        break;
      }

      const json = await res.json();
      const data: RawMicro1Job[] = json.data || [];
      allRaw = allRaw.concat(data);

      if (allRaw.length >= (json.total || 0) || data.length === 0) {
        break;
      }
      page++;
    }

    if (allRaw.length > 0) {
      const transformedJobs: Job[] = allRaw.map((raw, idx) => {
        const title = raw.job_name || "Specialist Role";
        const domain = raw.domain_slug || "engineering";
        const category = getCategory(domain, title);
        const companyName = getDisplayCompany(title);

        const hourlyMin = raw.ideal_hourly_rate?.min || 35;
        const hourlyMax = raw.ideal_hourly_rate?.max || (hourlyMin + 30);
        const reward = raw.referral_reward_amount || 750;
        const openings = raw.no_of_openings || 1;
        const postedDate = raw.date_posted
          ? raw.date_posted.split(" ")[0]
          : new Date().toISOString().split("T")[0];
        const isHighDemand =
          raw.is_high_demand_job === "1" || raw.is_high_demand_job === 1;
        const isNew = idx < 20;

        const skills =
          Array.isArray(raw.skills) && raw.skills.length > 0
            ? raw.skills.map((s) => s.trim()).filter(Boolean)
            : ["Remote Work", "English", "Communication"];

        const description = `We are looking for a qualified ${title} to join our high-performing remote team. This role offers flexible remote work with transparent USD compensation, direct impact on high-scale projects, and collaboration with top global engineers and operators.`;

        const qualifications = [
          `Demonstrated hands-on experience in ${skills.slice(0, 3).join(", ") || "the relevant domain"}`,
          "Strong problem-solving capability and autonomous execution",
          "Fluency in professional English for daily async & sync communication",
          "Reliable track record in remote environments"
        ];

        const responsibilities = [
          `Lead and execute key milestones related to ${title}`,
          `Apply best practices in ${skills[0] || "core deliverables"} and maintain high quality benchmarks`,
          "Collaborate cross-functionally across timezones to ensure seamless delivery",
          "Participate in technical reviews and continuous improvement initiatives"
        ];

        return {
          id: raw.job_id,
          title,
          companyName,
          category,
          location: "100% Remote (Global)",
          type: "Full-Time",
          hourlyMin,
          hourlyMax,
          referralReward: reward,
          openings,
          postedDate,
          isNew,
          isHighDemand,
          status: "Open",
          requiredSkills: skills,
          description,
          qualifications,
          responsibilities,
          customReferralUrl: raw.apply_url
        };
      });

      currentMicro1Jobs = transformedJobs;
      serverJobs = filterJobs([...currentMercorJobs, ...currentMicro1Jobs]);
      lastFetchedTime = Date.now();
    }
  } catch (err) {
    console.error("Error syncing jobs from Micro1 API:", err);
  } finally {
    isSyncing = false;
  }

  return currentMicro1Jobs;
}

/**
 * Fetch and synchronize latest jobs directly from Mercor.
 */
export async function syncJobsFromMercor(): Promise<Job[]> {
  try {
    const liveMercor = await fetchMercorJobsLive(25);
    if (liveMercor && liveMercor.length > 0) {
      currentMercorJobs = liveMercor;
      serverJobs = filterJobs([...currentMercorJobs, ...currentMicro1Jobs]);
      lastFetchedTime = Date.now();
    }
  } catch (err) {
    console.error("Error syncing jobs from Mercor:", err);
  }
  return currentMercorJobs;
}

/**
 * Synchronize all sources (Micro1 and Mercor) concurrently.
 */
export async function syncAllJobs(): Promise<Job[]> {
  if (isSyncing) return serverJobs;
  isSyncing = true;
  try {
    await Promise.allSettled([
      syncJobsFromMicro1(),
      syncJobsFromMercor()
    ]);
    serverJobs = filterJobs([...currentMercorJobs, ...currentMicro1Jobs]);
    lastFetchedTime = Date.now();
  } catch (err) {
    console.error("Error in syncAllJobs:", err);
  } finally {
    isSyncing = false;
  }
  return serverJobs;
}

/**
 * Returns jobs. Uses Stale-While-Revalidate pattern:
 * Returns cached jobs instantly, and refreshes both Micro1 & Mercor in the background when cache expires.
 */
export async function getServerJobs(forceSync: boolean = false): Promise<Job[]> {
  const isCacheExpired = Date.now() - lastFetchedTime > CACHE_TTL_MS;

  if (forceSync) {
    await syncAllJobs();
  } else if (isCacheExpired && !isSyncing) {
    // Background async update - never blocks user request
    syncAllJobs().catch((err) => console.error("Background sync error:", err));
  }

  return serverJobs;
}

export async function getServerJobById(id: string): Promise<Job | undefined> {
  let job = serverJobs.find((j) => j.id === id);
  if (!job) {
    // Attempt one quick sync in case it was just posted
    await syncAllJobs();
    job = serverJobs.find((j) => j.id === id);
  }
  return job;
}

export function addServerJob(job: Job): Job {
  serverJobs = [job, ...serverJobs];
  return job;
}

export function updateServerJob(id: string, updatedFields: Partial<Job>): Job | null {
  const index = serverJobs.findIndex((j) => j.id === id);
  if (index === -1) return null;
  serverJobs[index] = { ...serverJobs[index], ...updatedFields };
  return serverJobs[index];
}

export function deleteServerJob(id: string): boolean {
  const initialLength = serverJobs.length;
  serverJobs = serverJobs.filter((j) => j.id !== id);
  return serverJobs.length < initialLength;
}
