import { Job } from "@/types/micro1Job";

/**
 * Daftar ID pekerjaan spesifik yang sengaja disembunyikan (Blacklist / Hidden IDs).
 */
export const HIDDEN_JOB_IDS = new Set<string>([
  "list_AAABofHGD07UlwjpJg5AyIFY", // Survey Hukum Korea/Spain/Germany
  "list_AAABoe5-EDcz8NJf_69EcIgl", // Dutch Voice Actor
]);

/**
 * Regex untuk mendeteksi aksara asing non-Latin pada judul pekerjaan:
 * - Jepang (Hiragana, Katakana, Kanji)
 * - Mandarin / Chinese
 * - Korea (Hangul)
 * - Sirilik / Rusia
 * - Huruf Arab
 */
const FOREIGN_SCRIPT_REGEX = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uac00-\ud7af\u0400-\u04ff\u0600-\u06ff]/;

/**
 * Pola pembatasan wilayah (Geographic/Country Restrictions) yang mengecualikan Indonesia.
 * Lowongan yang memiliki batasan ini tidak dapat dilamar oleh warga Indonesia.
 */
const NON_INDO_LOCATION_PATTERNS = [
  /\b\(?us\s*based\)?/i,
  /\bu\.?s\.?\s+only\b/i,
  /\b\(?usa\s*only\)?/i,
  /\bunited\s+states\s+only\b/i,
  /\bnorth\s+america\s+only\b/i,
  /\b\(?latam\b/i,
  /\blatin\s+america\b/i,
  /\b\(?canada\s*(only|based)?\)?/i,
  /\b\(?uk\s*(only|based)?\)?/i,
  /\beu\s*only\b/i,
  /\beurope\s*only\b/i,
  /\b\(japan\b/i,
  /\b\(日本\b/,
  /\b\(brazil\b/i,
  /\b\(mexico\b/i,
  /\b\(argentina\b/i,
  /\b\(colombia\b/i,
  /\b\(philippines\b/i,
  /\b\(india\b/i,
  /\b\(nigeria\b/i,
  /\b\(kenya\b/i,
  /\b\(pakistan\b/i,
  /\b\(egypt\b/i,
  /\b\(saudi\b/i,
];

/**
 * Kata kunci yang mengidentifikasi pekerjaan spesifik ahli bahasa / linguistik / suara / penerjemahan.
 */
const LANGUAGE_ROLE_KEYWORDS = [
  "voice actor",
  "voice cloning",
  "voice talent",
  "translator",
  "translation",
  "transcription",
  "transcriber",
  "interpreter",
  "localization",
  "linguist",
  "linguistics",
  "language expert",
  "language specialist",
  "bilingual expert",
  "ai tutor",
  "writing survey",
  "legal writing survey",
  "creative writing",
  "ai writing",
  "language model evaluation",
  "language annotator",
];

/**
 * Bahasa asing di luar Bahasa Indonesia dan Bahasa Inggris untuk peran Language Expert.
 */
const DISALLOWED_FOREIGN_LANGUAGES = [
  "dutch", "netherlands",
  "german", "germany",
  "french", "france",
  "spanish", "spain",
  "italian", "italy",
  "japanese", "japan",
  "korean", "korea",
  "chinese", "china", "mandarin", "cantonese",
  "portuguese", "brazil", "portugal",
  "russian", "russia",
  "turkish", "turkey",
  "polish", "poland",
  "swedish", "sweden",
  "vietnamese", "vietnam",
  "thai", "thailand",
  "tagalog", "filipino",
  "hebrew", "israel",
  "greek", "greece",
  "czech", "romanian", "hungarian", "danish", "finnish", "norwegian", "ukrainian"
];

/**
 * Fungsi filter umum (General Filter) untuk seluruh lowongan di KerjaGlobal.id:
 *
 * 1. Cek manual blacklist (HIDDEN_JOB_IDS).
 * 2. Cek aksara asing (Jepang, Mandarin, Korea, dll.) -> Tolak jika judul bukan huruf Latin.
 * 3. Cek pembatasan wilayah spesifik yang mengecualikan pelamar Indonesia (misal: US Based, LATAM, Japan, Brazil, dll.).
 * 4. Cek pekerjaan Ahli Bahasa -> Hanya izinkan jika untuk Bahasa Indonesia atau Bahasa Inggris.
 * 5. Lowongan Global Remote yang valid (Developer, QA, Data, AI, Designer, Product, dsb.) -> TAMPIL.
 */
export function isJobAllowed(job: Job): boolean {
  if (!job) return false;

  // 1. Cek daftar blacklist manual
  if (HIDDEN_JOB_IDS.has(job.id)) {
    return false;
  }

  const title = job.title || "";
  const titleLower = title.toLowerCase();
  const descLower = (job.description || "").toLowerCase();
  const combined = titleLower + " " + descLower;

  // 2. Tolak jika judul menggunakan aksara asing (Jepang, Mandarin, Korea, dsb.)
  if (FOREIGN_SCRIPT_REGEX.test(title)) {
    return false;
  }

  // 3. Tolak jika judul mensyaratkan domisili/lokasi di luar Indonesia (US Based, LATAM, Japan, dll.)
  const hasIneligibleLocation = NON_INDO_LOCATION_PATTERNS.some((pattern) =>
    pattern.test(title)
  );
  if (hasIneligibleLocation) {
    return false;
  }

  // 4. Periksa kategori Ahli Bahasa (Language Expert / Voice / Translation)
  const isLanguageRole = LANGUAGE_ROLE_KEYWORDS.some((kw) =>
    combined.includes(kw)
  );

  if (isLanguageRole) {
    const hasDisallowedLanguage = DISALLOWED_FOREIGN_LANGUAGES.some((lang) => {
      const regex = new RegExp(`\\b${lang}\\b`, "i");
      return regex.test(combined);
    });

    if (hasDisallowedLanguage) {
      return false; // Tolak lowongan ahli bahasa asing non-Indonesia/non-Inggris
    }
  }

  // 5. Pekerjaan teknis, operasional, dan profesional lainnya yang terbuka untuk global / Indonesia -> TAMPIL
  return true;
}

/**
 * Filter array of jobs dengan aturan kelayakan Indonesia.
 */
export function filterJobs(jobs: Job[]): Job[] {
  return jobs.filter(isJobAllowed);
}
