import { Job } from "@/types/micro1Job";

/**
 * Daftar ID pekerjaan spesifik yang sengaja disembunyikan (Blacklist / Hidden IDs).
 * Jika ada lowongan tertentu yang tidak ingin ditampilkan, masukkan ID-nya di sini.
 */
export const HIDDEN_JOB_IDS = new Set<string>([
  "list_AAABofHGD07UlwjpJg5AyIFY", // Contoh: Survey Hukum Korea/Spain/Germany
  "list_AAABoe5-EDcz8NJf_69EcIgl", // Contoh: Dutch Voice Actor
]);

/**
 * Kata kunci yang mengidentifikasi pekerjaan ahli bahasa / linguistik / suara / penerjemahan.
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
  "ai tutor",
  "writing survey",
  "legal writing survey",
  "creative writing",
  "ai writing",
  "language model evaluation",
  "language annotator",
];

/**
 * Bahasa / Negara asing di luar Bahasa Indonesia, Bahasa Inggris (dan Bahasa Arab yang diperbolehkan).
 * Khusus untuk kategori Language Expert, jika mengandung bahasa ini maka akan disembunyikan.
 */
const DISALLOWED_FOREIGN_IDENTIFIERS = [
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
 * Fungsi filter umum (General Filter) yang berlaku untuk SEMUA lowongan dari sumber mana pun
 * (baik Mercor, Micro1, maupun platform lainnya di masa depan).
 *
 * Aturan:
 * 1. Jika ID terdaftar di HIDDEN_JOB_IDS -> TIDAK TAMPIL.
 * 2. Jika kategori Ahli Bahasa (Language Expert) dan mensyaratkan bahasa selain ID/EN/Arabic -> TIDAK TAMPIL.
 * 3. Kategori Non-Bahasa (Developer, QA, Data, Design, Product, dsb.) -> SELALU TAMPIL tanpa batasan bahasa.
 */
export function isJobAllowed(job: Job): boolean {
  if (!job) return false;

  // 1. Cek jika ID lowongan ada di daftar manual hidden
  if (HIDDEN_JOB_IDS.has(job.id)) {
    return false;
  }

  const titleAndDesc = (job.title + " " + (job.description || "")).toLowerCase();

  // 2. Cek apakah ini pekerjaan ahli bahasa / suara / penulisan
  const isLanguageRole = LANGUAGE_ROLE_KEYWORDS.some((kw) =>
    titleAndDesc.includes(kw)
  );

  if (isLanguageRole) {
    // Khusus pekerjaan bahasa, periksa apakah mensyaratkan bahasa asing yang dilarang
    const hasDisallowedLanguage = DISALLOWED_FOREIGN_IDENTIFIERS.some((id) => {
      const regex = new RegExp(`\\b${id}\\b`, "i");
      return regex.test(titleAndDesc);
    });

    if (hasDisallowedLanguage) {
      return false; // Jangan tampilkan lowongan ahli bahasa asing
    }

    return true; // Boleh tampil (Bahasa Indonesia / Inggris / Arab)
  }

  // 3. Pekerjaan non-bahasa (Frontend, Backend, AI, Data, Design, dsb.) -> Selalu tampil
  return true;
}

/**
 * Filter array of jobs dengan aturan umum.
 */
export function filterJobs(jobs: Job[]): Job[] {
  return jobs.filter(isJobAllowed);
}
