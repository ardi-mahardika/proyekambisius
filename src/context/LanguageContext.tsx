"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "id" | "en";

export interface Translations {
  nav: {
    tagline: string;
    langLabel: string;
  };
  explorer: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    sortLatest: string;
    sortSalary: string;
    sortReward: string;
    sortOpenings: string;
    filtersBtn: string;
    categoryLabel: string;
    categories: Record<string, string>;
    minSalary: string;
    minReward: string;
    minOpenings: string;
    positionsSuffix: string;
    onlyNew: string;
    onlyHighDemand: string;
    reset: string;
    showing: string;
    of: string;
    totalJobs: string;
    page: string;
    liveVerified: string;
    emptyTitle: string;
    emptyDesc: string;
    resetAll: string;
    jobsPerPage: string;
    prev: string;
    next: string;
  };
  card: {
    newBadge: string;
    highDemandBadge: string;
    closedBadge: string;
    hourlySalary: string;
    referralReward: string;
    openings: string;
    positions: string;
    viewDetails: string;
    applyNow: string;
    closedBtn: string;
  };
  jobDetail: {
    back: string;
    newOpening: string;
    highDemandRole: string;
    positionClosed: string;
    posted: string;
    openings: string;
    coreSkills: string;
    roleOverview: string;
    keyResponsibilities: string;
    qualifications: string;
    hourlyCompensation: string;
    paymentNote: string;
    referralBonus: string;
    rewardNote: string;
    positionStatus: string;
    targetOpenings: string;
    jobId: string;
    applyBtn: string;
    applicationsClosed: string;
    priorityNote: string;
  };
  footer: {
    desc: string;
    curationTitle: string;
    curationDesc: string;
    navTitle: string;
    allJobs: string;
    adminDashboard: string;
    aboutUs: string;
    categoriesTitle: string;
    copyright: string;
    taglineFooter: string;
  };
}

const translations: Record<Language, Translations> = {
  id: {
    nav: {
      tagline: "Kerja Remote · Gaji Dollar (USD)",
      langLabel: "Bahasa",
    },
    explorer: {
      badge: "Peluang Terkurasi",
      title: "Eksplor Peluang Karir Remote",
      subtitle: "Temukan posisi impian, tinjau kompensasi USD, dan lamar langsung secara mandiri.",
      searchPlaceholder: "Cari judul loker, keahlian (React, Python, Figma), atau perusahaan...",
      sortLatest: "Urutkan: Loker Terbaru",
      sortSalary: "Urutkan: Gaji Per Jam Tertinggi",
      sortReward: "Urutkan: Bonus Referral Tertinggi",
      sortOpenings: "Urutkan: Lowongan Terbanyak",
      filtersBtn: "Filter",
      categoryLabel: "Kategori:",
      categories: {
        All: "Semua",
        Engineering: "Teknik & Software",
        "AI & Machine Learning": "AI & Machine Learning",
        Design: "Desain",
        Product: "Produk & Operasional",
        "Data & Analytics": "Data & Analitik",
        Marketing: "Pemasaran",
      },
      minSalary: "Min Gaji Per Jam:",
      minReward: "Min Bonus Referral:",
      minOpenings: "Min Lowongan:",
      positionsSuffix: "posisi",
      onlyNew: "Baru Saja Dibuka",
      onlyHighDemand: "Paling Diminati",
      reset: "Reset",
      showing: "Menampilkan",
      of: "dari",
      totalJobs: "total lowongan",
      page: "Halaman",
      liveVerified: "Live & Terverifikasi",
      emptyTitle: "Tidak Ada Lowongan yang Sesuai",
      emptyDesc: "Kami tidak menemukan lowongan yang cocok dengan filter atau kata kunci saat ini. Coba atur ulang filter pencarian Anda.",
      resetAll: "Reset Semua Filter",
      jobsPerPage: "9 lowongan / halaman",
      prev: "Prev",
      next: "Next",
    },
    card: {
      newBadge: "Baru",
      highDemandBadge: "Diminati",
      closedBadge: "Tutup",
      hourlySalary: "Gaji Per Jam",
      referralReward: "Bonus Referral",
      openings: "Lowongan:",
      positions: "posisi",
      viewDetails: "Lihat Detail",
      applyNow: "Lamar Sekarang",
      closedBtn: "Ditutup",
    },
    jobDetail: {
      back: "Kembali ke Semua Lowongan",
      newOpening: "Lowongan Baru",
      highDemandRole: "Posisi Sangat Diminati",
      positionClosed: "Posisi Ditutup",
      posted: "Diposting",
      openings: "Lowongan",
      coreSkills: "Keahlian Utama yang Dibutuhkan",
      roleOverview: "Deskripsi Pekerjaan",
      keyResponsibilities: "Tanggung Jawab Utama",
      qualifications: "Kualifikasi & Pengalaman",
      hourlyCompensation: "Kompensasi Per Jam",
      paymentNote: "Dibayar setiap 2 minggu atau bulanan via kontrak resmi terverifikasi.",
      referralBonus: "Bonus Referral",
      rewardNote: "Diberikan setelah kandidat berhasil diterima dan onboarding.",
      positionStatus: "Status Lowongan:",
      targetOpenings: "Target Lowongan:",
      jobId: "ID Lowongan:",
      applyBtn: "Lamar Pekerjaan Ini",
      applicationsClosed: "Lamaran Ditutup",
      priorityNote: "Klik Lamar Pekerjaan Ini untuk langsung membuka portal aplikasi resmi dengan kode jalur prioritas untuk percepatan seleksi.",
    },
    footer: {
      desc: "Platform agregator karir dan kerja remote global terkurasi. Menghubungkan talenta profesional Indonesia ke peluang karir teknologi di Silicon Valley dan startup global dengan kompensasi Dollar (USD).",
      curationTitle: "Kurasi & Verifikasi Resmi",
      curationDesc: "Semua lowongan diverifikasi aktif dengan standar gaji internasional dan jalur seleksi prioritas bagi talenta Indonesia.",
      navTitle: "Navigasi",
      allJobs: "Semua Lowongan",
      adminDashboard: "Admin Dashboard",
      aboutUs: "Tentang KerjaGlobal.id",
      categoriesTitle: "Kategori Populer",
      copyright: "Hak cipta dilindungi.",
      taglineFooter: "Dibuat untuk membuka akses karir remote bergaji dollar bagi profesional Indonesia.",
    },
  },
  en: {
    nav: {
      tagline: "Remote Work · Earn USD",
      langLabel: "Language",
    },
    explorer: {
      badge: "Pre-Vetted Opportunities",
      title: "Explore Remote Career Opportunities",
      subtitle: "Find your dream role, review transparent USD compensation, and apply directly.",
      searchPlaceholder: "Search by job title, skill (React, Python, Figma), or company...",
      sortLatest: "Sort: Latest Jobs",
      sortSalary: "Sort: Highest Hourly Salary",
      sortReward: "Sort: Highest Referral Reward",
      sortOpenings: "Sort: Most Openings",
      filtersBtn: "Filters",
      categoryLabel: "Category:",
      categories: {
        All: "All",
        Engineering: "Engineering",
        "AI & Machine Learning": "AI & Machine Learning",
        Design: "Design",
        Product: "Product & Operations",
        "Data & Analytics": "Data & Analytics",
        Marketing: "Marketing",
      },
      minSalary: "Min Hourly Salary:",
      minReward: "Min Referral Reward:",
      minOpenings: "Min Openings:",
      positionsSuffix: "position(s)",
      onlyNew: "New Openings Only",
      onlyHighDemand: "High Demand Only",
      reset: "Reset",
      showing: "Showing",
      of: "of",
      totalJobs: "total jobs",
      page: "Page",
      liveVerified: "Live & Verified",
      emptyTitle: "No Matching Jobs Found",
      emptyDesc: "We couldn't find any jobs matching your current search parameters or filters. Try clearing your filters.",
      resetAll: "Reset All Filters",
      jobsPerPage: "9 jobs / page",
      prev: "Prev",
      next: "Next",
    },
    card: {
      newBadge: "New",
      highDemandBadge: "High Demand",
      closedBadge: "Closed",
      hourlySalary: "Hourly Salary",
      referralReward: "Referral Reward",
      openings: "Openings:",
      positions: "positions",
      viewDetails: "View Details",
      applyNow: "Apply Now",
      closedBtn: "Closed",
    },
    jobDetail: {
      back: "Back to All Opportunities",
      newOpening: "New Opening",
      highDemandRole: "High Demand Role",
      positionClosed: "Position Closed",
      posted: "Posted",
      openings: "Openings",
      coreSkills: "Core Skills Required",
      roleOverview: "Role Overview",
      keyResponsibilities: "Key Responsibilities",
      qualifications: "Qualifications & Experience",
      hourlyCompensation: "Hourly Compensation",
      paymentNote: "Paid bi-weekly or monthly via verified global contract.",
      referralBonus: "Referral Reward Bonus",
      rewardNote: "Awarded upon successful candidate hiring and onboarding.",
      positionStatus: "Position Status:",
      targetOpenings: "Target Openings:",
      jobId: "Job ID:",
      applyBtn: "Apply for this Position",
      applicationsClosed: "Applications Closed",
      priorityNote: "Click Apply for this Position to open the official application portal with priority fast-track referral.",
    },
    footer: {
      desc: "Curated global remote career aggregator. Connecting top talent to Silicon Valley tech opportunities and global startups with USD compensation.",
      curationTitle: "Official Curation & Verification",
      curationDesc: "All jobs are actively verified with transparent international USD compensation and priority application tracks.",
      navTitle: "Navigation",
      allJobs: "All Jobs",
      adminDashboard: "Admin Dashboard",
      aboutUs: "About KerjaGlobal.id",
      categoriesTitle: "Popular Categories",
      copyright: "All rights reserved.",
      taglineFooter: "Created to empower professionals with direct access to top-paying global remote careers.",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "id",
  setLanguage: () => {},
  t: translations.id,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");

  useEffect(() => {
    // Read saved language preference from localStorage
    try {
      const saved = localStorage.getItem("kerjaglobal_lang");
      if (saved === "id" || saved === "en") {
        setLanguageState(saved);
      }
    } catch {
      // ignore in environments without localStorage
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("kerjaglobal_lang", lang);
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

