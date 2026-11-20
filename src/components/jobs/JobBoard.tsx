"use client";

import { useState } from "react";
import { MOCK_JOBS, JobItem, MERCOR_REFERRAL } from "@/data/mockJobs";
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight,
  Filter,
  X
} from "lucide-react";

export function JobBoard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [activeModalJob, setActiveModalJob] = useState<JobItem | null>(null);

  // Ambil semua tags unik
  const allTags = Array.from(new Set(MOCK_JOBS.flatMap((j) => j.tags)));

  // Filter jobs
  const filteredJobs = MOCK_JOBS.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchPlatform =
      selectedPlatform === "all" ||
      job.platform.toLowerCase() === selectedPlatform.toLowerCase();

    const matchTag =
      selectedTag === "all" || job.tags.includes(selectedTag);

    return matchSearch && matchPlatform && matchTag;
  });

  return (
    <section className="py-12 bg-slate-50 min-h-screen" id="loker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Referral Mercor & Micro1 */}
        <div className="mb-10 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                Akses Langsung Tanpa Perantara
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Mau Interview AI & Kerja di Perusahaan Silicon Valley?
              </h2>
              <p className="mt-2 text-blue-100 max-w-2xl text-sm sm:text-base">
                Daftar akun Mercor via jalur rekomendasi resmi kami untuk mendapatkan prioritas review AI screening dan akses ke ribuan pekerjaan remote bergaji USD.
              </p>
            </div>
            <a
              href={MERCOR_REFERRAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-bold px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 shrink-0"
            >
              Daftar Mercor Sekarang
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari posisi loker, keahlian (Python, React, AI, dsb)..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm transition-all"
              />
            </div>

            {/* Platform Selector Tabs */}
            <div className="flex bg-slate-100 p-1.5 rounded-xl self-start md:self-auto gap-1">
              {["all", "Mercor", "Partner Global"].map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPlatform(p)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedPlatform === p
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {p === "all" ? "Semua Platform" : p}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Badges Filter */}
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5" /> Filter Tag:
            </span>
            <button
              onClick={() => setSelectedTag("all")}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedTag === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Semua Tag
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? "all" : tag)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedTag === tag
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Counter Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm font-medium text-slate-500">
            Menampilkan <span className="text-slate-900 font-bold">{filteredJobs.length}</span> lowongan kerja aktif (tanpa perlu login)
          </p>
          <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Updates
          </span>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xl hover:border-blue-300 transition-all duration-200 group relative"
            >
              {job.isHot && (
                <div className="absolute -top-3 right-5 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                  🔥 Banyak Dilamar
                </div>
              )}

              <div>
                {/* Header Card */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg ${job.platformBadgeColor}`}
                  >
                    {job.platform}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {job.postedTime}
                  </span>
                </div>

                {/* Job Title & Company */}
                <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                  {job.title}
                </h3>
                <p className="text-xs font-medium text-slate-500 mb-4">
                  {job.company}
                </p>

                {/* Salary & Location */}
                <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-1.5 border border-slate-100">
                  <div className="flex items-center text-sm font-extrabold text-emerald-600">
                    <DollarSign className="w-4 h-4 mr-1 shrink-0 text-emerald-500" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 mr-1 shrink-0 text-slate-400" />
                    {job.location} · {job.type}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setActiveModalJob(job)}
                  className="flex-1 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center"
                >
                  Detail Syarat
                </button>
                <a
                  href={job.referralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1 group/btn"
                >
                  Lamar ({job.platform})
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail Lowongan */}
        {activeModalJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setActiveModalJob(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${activeModalJob.platformBadgeColor}`}>
                  {activeModalJob.platform}
                </span>
                <span className="text-xs text-slate-400">
                  {activeModalJob.location}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                {activeModalJob.title}
              </h2>

              <p className="text-sm font-semibold text-emerald-600 mb-4">
                Estimasi Kompensasi: {activeModalJob.salary} ({activeModalJob.type})
              </p>

              <div className="mb-5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Deskripsi Pekerjaan
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeModalJob.description}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Kualifikasi & Syarat
                </h4>
                <ul className="space-y-2">
                  {activeModalJob.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 mb-6 text-xs text-blue-800 leading-relaxed">
                💡 <b>Petunjuk Melamar:</b> Klik tombol di bawah untuk diarahkan ke platform {activeModalJob.platform}. Anda akan diarahkan untuk melakukan proses interview AI (Vetting) singkat agar dapat langsung dicocokkan dengan klien.
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setActiveModalJob(null)}
                  className="flex-1 py-3 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Tutup
                </button>
                <a
                  href={activeModalJob.referralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-2 py-3 px-6 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  Lanjut Lamar di {activeModalJob.platform}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

