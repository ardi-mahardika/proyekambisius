import { Job } from "@/types/micro1Job";
import { MERCOR_INITIAL_JOBS } from "@/data/mercorJobs";
import { isJobAllowed } from "@/lib/jobFilters";

function decodeHtml(html: string): string {
  return html
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'");
}

function cleanTitle(rawTitle: string): string {
  return decodeHtml(rawTitle)
    .replace(/\s*-\s*Mercor Jobs$/i, "")
    .replace(/\s*\|\s*Mercor$/i, "")
    .trim();
}

function getCategory(title: string, desc: string): Job["category"] {
  const text = (title + " " + desc).toLowerCase();
  if (
    text.includes("engineer") ||
    text.includes("developer") ||
    text.includes("software") ||
    text.includes("rust") ||
    text.includes("python")
  ) {
    return "Engineering";
  }
  if (
    text.includes("data") ||
    text.includes("analyst") ||
    text.includes("analytics") ||
    text.includes("excel")
  ) {
    return "Data & Analytics";
  }
  if (
    text.includes("marketing") ||
    text.includes("seo") ||
    text.includes("growth")
  ) {
    return "Marketing";
  }
  if (text.includes("design") || text.includes("ui") || text.includes("ux")) {
    return "Design";
  }
  if (text.includes("product") || text.includes("manager")) {
    return "Product";
  }
  return "AI & Machine Learning";
}

function translateOverview(title: string, hourlyRate: number): string {
  return `Peluang kerja remote global untuk posisi ${title}. Proyek evaluasi dan pelatihan AI ini menawarkan jadwal kerja fleksibel secara asinkron dengan kompensasi kompetitif senilai $${hourlyRate}/jam USD. Cocok untuk profesional yang ingin berkontribusi pada pengembangan model AI mutakhir.`;
}

/**
 * Mengambil lowongan terbaru secara live langsung dari Sitemap Mercor.
 * Otomatis memfilter lowongan terlarang & memasang link referral universal Anda.
 */
export async function fetchMercorJobsLive(limit: number = 30): Promise<Job[]> {
  try {
    const sitemapRes = await fetch("https://work.mercor.com/sitemap.xml", {
      next: { revalidate: 3600 }, // Cache revalidasi Next.js 1 jam
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; KerjaGlobalBot/1.0)",
      },
    });

    if (!sitemapRes.ok) {
      console.warn("Failed fetching Mercor sitemap, status:", sitemapRes.status);
      return MERCOR_INITIAL_JOBS;
    }

    const sitemapXml = await sitemapRes.text();
    const allUrls = (
      sitemapXml.match(/<loc>(https:\/\/work\.mercor\.com\/jobs\/list_[^<]+)<\/loc>/g) || []
    ).map((m) => m.replace(/<\/?loc>/g, ""));

    if (allUrls.length === 0) {
      return MERCOR_INITIAL_JOBS;
    }

    const targetUrls = allUrls.slice(0, limit);
    const jobs: Job[] = [];

    // Ambil detail pekerjaan dengan batas concurrency
    for (let i = 0; i < targetUrls.length; i++) {
      const url = targetUrls[i];
      const idMatch = url.match(/(list_[A-Za-z0-9_-]+)/);
      const id = idMatch ? idMatch[1] : `mercor_${i}`;

      try {
        const res = await fetch(url, {
          next: { revalidate: 3600 },
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; KerjaGlobalBot/1.0)",
          },
        });
        if (!res.ok) continue;

        const html = await res.text();

        // Judul
        const titleMatch =
          html.match(/<title>([^<]+)<\/title>/) ||
          html.match(/property="og:title" content="([^"]+)"/);
        const title = titleMatch ? cleanTitle(titleMatch[1]) : "AI Specialist";

        // Deskripsi
        const descMatch =
          html.match(/property="og:description" content="([^"]+)"/) ||
          html.match(/name="description" content="([^"]+)"/);
        const description = descMatch
          ? decodeHtml(descMatch[1].trim())
          : `AI Trainer and Domain Specialist role at Mercor.`;

        // Rate $/jam
        const rateMatch =
          html.match(/\$(\d+)(?:\s*-\s*\$?(\d+))?\s*\/?\s*hr/i) ||
          html.match(/\$(\d+)\s+per\s+hour/i);
        const hourlyMin = rateMatch ? parseInt(rateMatch[1], 10) : 50;
        const hourlyMax =
          rateMatch && rateMatch[2] ? parseInt(rateMatch[2], 10) : hourlyMin;

        const category = getCategory(title, description);

        const jobObj: Job = {
          id: id,
          title: title,
          companyName: "Mercor AI Client",
          companyLogo: "/logos/mercor.svg",
          category: category,
          location: "100% Remote (Global / Indonesia Eligible)",
          type: "Contract",
          hourlyMin: hourlyMin,
          hourlyMax: hourlyMax,
          referralReward: Math.round(hourlyMax * 10),
          openings: 5,
          postedDate: new Date(Date.now() - (i * 24 * 60 * 60 * 1000))
            .toISOString()
            .split("T")[0],
          isNew: i < 5,
          isHighDemand: hourlyMax >= 80,
          status: "Open",
          requiredSkills: [
            category,
            "AI Training",
            "Remote Work",
            "English Communication",
          ],
          description: description,
          description_id: translateOverview(title, hourlyMax),
          qualifications: [
            "Professional proficiency or domain expertise relevant to the role",
            "Excellent written and verbal communication in English",
            "Experience using or evaluating modern AI and Large Language Models",
            "Ability to work independently and manage asynchronous communication",
          ],
          qualifications_id: [
            "Kemahiran profesional atau keahlian bidang yang relevan dengan posisi",
            "Kemampuan komunikasi bahasa Inggris yang baik (tertulis dan lisan)",
            "Pengalaman menggunakan atau mengevaluasi model AI / LLM modern",
            "Mampu bekerja secara mandiri dengan alur kerja asinkron",
          ],
          responsibilities: [
            "Evaluate, annotate, and verify AI responses against expert domain benchmarks",
            "Identify flaws, hallucinations, and formatting errors in LLM outputs",
            "Provide detailed qualitative feedback and rationale for model ratings",
            "Adhere to project-specific quality guidelines and delivery timelines",
          ],
          responsibilities_id: [
            "Mengevaluasi, memberi anotasi, dan memverifikasi respons AI berdasarkan tolok ukur standar keahlian",
            "Mengidentifikasi kekeliruan, halusinasi fakta, dan kesalahan format pada output LLM",
            "Memberikan umpan balik terperinci dan alasan di balik setiap penilaian kualitas model",
            "Mematuhi pedoman kualitas proyek dan tenggat waktu pengerjaan",
          ],
          // Selalu terhubung ke link referral universal Anda
          customReferralUrl: "https://t.mercor.com/yqEan",
        };

        // Periksa filter kelayakan Indonesia (US-only, aksara Jepang, dsb. akan ditolak)
        if (isJobAllowed(jobObj)) {
          jobs.push(jobObj);
        }
      } catch (err) {
        console.warn(`Error parsing Mercor job at ${url}:`, err);
      }
    }

    return jobs.length > 0 ? jobs : MERCOR_INITIAL_JOBS;
  } catch (error) {
    console.error("Error in fetchMercorJobsLive:", error);
    return MERCOR_INITIAL_JOBS;
  }
}
