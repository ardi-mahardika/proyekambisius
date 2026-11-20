"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  Search, 
  Filter, 
  RotateCcw, 
  SlidersHorizontal, 
  Gift, 
  DollarSign, 
  Sparkles, 
  Flame, 
  Briefcase,
  Layers,
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Job, CATEGORIES } from "@/types/micro1Job";
import { JobCard } from "@/components/jobs/JobCard";
import { INITIAL_MICRO1_JOBS } from "@/data/micro1InitialJobs";
import { useLanguage } from "@/context/LanguageContext";

export function Micro1JobExplorer() {
  const { language, t } = useLanguage();
  const [jobs, setJobs] = useState<Job[]>(INITIAL_MICRO1_JOBS);
  const [isLoading, setIsLoading] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [minSalary, setMinSalary] = useState<number>(0);
  const [minReward, setMinReward] = useState<number>(0);
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlyHighDemand, setOnlyHighDemand] = useState(false);
  const [minOpenings, setMinOpenings] = useState<number>(1);
  const [sortBy, setSortBy] = useState<"latest" | "salary" | "reward" | "openings">("latest");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Fetch dari API Route jika tersedia untuk sinkronisasi dengan live jobs
  useEffect(() => {
    async function loadJobs() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data)) {
            setJobs(json.data);
          }
        }
      } catch (err) {
        console.warn("Using fallback local jobs", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadJobs();
  }, []);

  // Filter & Search Logic
  const filteredAndSortedJobs = useMemo(() => {
    let result = jobs.filter((job) => {
      // Search by title, skills, company, or category
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        job.title.toLowerCase().includes(q) ||
        job.companyName.toLowerCase().includes(q) ||
        job.category.toLowerCase().includes(q) ||
        job.requiredSkills.some((skill) => skill.toLowerCase().includes(q));

      // Category filter
      const matchesCategory =
        selectedCategory === "All" || job.category === selectedCategory;

      // Salary filter (hourlyMax must be >= minSalary)
      const matchesSalary = job.hourlyMax >= minSalary;

      // Referral reward filter
      const matchesReward = job.referralReward >= minReward;

      // Openings filter
      const matchesOpenings = job.openings >= minOpenings;

      // Badges filter
      const matchesNew = !onlyNew || job.isNew;
      const matchesHighDemand = !onlyHighDemand || job.isHighDemand;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSalary &&
        matchesReward &&
        matchesOpenings &&
        matchesNew &&
        matchesHighDemand
      );
    });

    // Sorting Logic
    result = [...result].sort((a, b) => {
      if (sortBy === "salary") {
        return b.hourlyMax - a.hourlyMax;
      }
      if (sortBy === "reward") {
        return b.referralReward - a.referralReward;
      }
      if (sortBy === "openings") {
        return b.openings - a.openings;
      }
      // default: latest
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    });

    return result;
  }, [
    jobs,
    searchQuery,
    selectedCategory,
    minSalary,
    minReward,
    onlyNew,
    onlyHighDemand,
    minOpenings,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setMinSalary(0);
    setMinReward(0);
    setOnlyNew(false);
    setOnlyHighDemand(false);
    setMinOpenings(1);
    setSortBy("latest");
    setCurrentPage(1);
  };

  const isFiltered =
    searchQuery !== "" ||
    selectedCategory !== "All" ||
    minSalary > 0 ||
    minReward > 0 ||
    onlyNew ||
    onlyHighDemand ||
    minOpenings > 1;

  // Pagination Logic
  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset to first page when any search/filter parameter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategory,
    minSalary,
    minReward,
    onlyNew,
    onlyHighDemand,
    minOpenings,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredAndSortedJobs.length / ITEMS_PER_PAGE) || 1;

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedJobs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedJobs, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const elem = document.getElementById("jobs");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getPaginationRange = (current: number, total: number) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 4) {
      return [1, 2, 3, 4, 5, "...", total];
    }
    if (current >= total - 3) {
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  return (
    <section className="pt-24 pb-16 min-h-screen bg-slate-50/70" id="jobs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100/80 text-blue-700 mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              {t.explorer.badge}
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.explorer.title}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {t.explorer.subtitle}
            </p>
          </div>
        </div>

        {/* Search & Main Filter Controls Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.explorer.searchPlaceholder}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <div className="relative min-w-[210px]">
                <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full pl-10 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none cursor-pointer"
                >
                  <option value="latest">{t.explorer.sortLatest}</option>
                  <option value="salary">{t.explorer.sortSalary}</option>
                  <option value="reward">{t.explorer.sortReward}</option>
                  <option value="openings">{t.explorer.sortOpenings}</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className={`lg:hidden flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold border ${
                  isFiltered 
                    ? "bg-blue-50 text-blue-700 border-blue-200" 
                    : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                <Filter className="w-4 h-4" />
                {t.explorer.filtersBtn}
              </button>
            </div>
          </div>

          {/* Categories Horizontal Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-slate-100" id="categories">
            <span className="text-xs font-semibold text-slate-400 mr-2 shrink-0">
              {t.explorer.categoryLabel}
            </span>
            {CATEGORIES.map((cat) => {
              const displayName = t.explorer.categories[cat] || cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold shrink-0 transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {displayName}
                </button>
              );
            })}
          </div>

          {/* Advanced Multi-Filters (Desktop always visible, mobile toggleable) */}
          <div className={`${showFiltersMobile ? "block" : "hidden"} lg:block pt-3 border-t border-slate-100 space-y-3`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Min Salary Filter */}
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between mb-1.5">
                  <span>{t.explorer.minSalary}</span>
                  <strong className="text-slate-800">${minSalary}{language === "id" ? "/jam" : "/hr"}</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={minSalary}
                  onChange={(e) => setMinSalary(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Min Referral Reward Filter */}
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between mb-1.5">
                  <span>{t.explorer.minReward}</span>
                  <strong className="text-purple-700 font-bold">${minReward} USD</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="100"
                  value={minReward}
                  onChange={(e) => setMinReward(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Min Openings */}
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between mb-1.5">
                  <span>{t.explorer.minOpenings}</span>
                  <strong className="text-slate-800">{minOpenings} {t.explorer.positionsSuffix}</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={minOpenings}
                  onChange={(e) => setMinOpenings(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Checkbox Toggles: New & High Demand */}
              <div className="flex items-center gap-4 pt-4 sm:pt-0">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                  <input
                    type="checkbox"
                    checked={onlyNew}
                    onChange={(e) => setOnlyNew(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <span className="flex items-center gap-1 text-emerald-700">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t.explorer.onlyNew}
                  </span>
                </label>

                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                  <input
                    type="checkbox"
                    checked={onlyHighDemand}
                    onChange={(e) => setOnlyHighDemand(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300"
                  />
                  <span className="flex items-center gap-1 text-amber-700">
                    <Flame className="w-3.5 h-3.5" />
                    {t.explorer.onlyHighDemand}
                  </span>
                </label>

                {isFiltered && (
                  <button
                    onClick={resetFilters}
                    className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 py-1 px-2 rounded-lg hover:bg-rose-50"
                  >
                    <RotateCcw className="w-3 h-3" />
                    {t.explorer.reset}
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Results Counter Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 text-sm">
          <div className="text-slate-600">
            {t.explorer.showing}{" "}
            <strong className="text-slate-900 font-bold">
              {filteredAndSortedJobs.length === 0
                ? 0
                : (currentPage - 1) * ITEMS_PER_PAGE + 1}
              -
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedJobs.length)}
            </strong>{" "}
            {t.explorer.of} <strong className="text-slate-900 font-bold">{filteredAndSortedJobs.length}</strong> {t.explorer.totalJobs}
            {totalPages > 1 && (
              <span className="text-slate-400 ml-1.5 text-xs">
                ({t.explorer.page} {currentPage} {t.explorer.of} {totalPages})
              </span>
            )}
          </div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {t.explorer.liveVerified}
          </div>
        </div>

        {/* Empty State */}
        {filteredAndSortedJobs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto shadow-sm my-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t.explorer.emptyTitle}
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              {t.explorer.emptyDesc}
            </p>
            <div className="flex justify-center">
              <button
                onClick={resetFilters}
                className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md"
              >
                {t.explorer.resetAll}
              </button>
            </div>
          </div>
        ) : (
          /* Jobs Grid */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  {t.explorer.page} <strong className="text-slate-800 font-semibold">{currentPage}</strong> {t.explorer.of}{" "}
                  <strong className="text-slate-800 font-semibold">{totalPages}</strong> ({t.explorer.jobsPerPage})
                </div>

                <div className="flex items-center gap-1.5 flex-wrap justify-center">
                  {/* Prev Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      currentPage === 1
                        ? "text-slate-300 bg-slate-100 cursor-not-allowed border border-transparent"
                        : "text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-blue-300 shadow-sm active:scale-95"
                    }`}
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {t.explorer.prev}
                  </button>

                  {/* Number Buttons */}
                  {getPaginationRange(currentPage, totalPages).map((p, idx) => {
                    if (p === "...") {
                      return (
                        <span
                          key={`ellipsis-${idx}`}
                          className="px-2 text-xs text-slate-400 font-bold select-none"
                        >
                          ...
                        </span>
                      );
                    }
                    const pageNum = p as number;
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105"
                            : "text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-blue-300 active:scale-95"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      currentPage === totalPages
                        ? "text-slate-300 bg-slate-100 cursor-not-allowed border border-transparent"
                        : "text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-blue-300 shadow-sm active:scale-95"
                    }`}
                    aria-label="Next Page"
                  >
                    {t.explorer.next}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
