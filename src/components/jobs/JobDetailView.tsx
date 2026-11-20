"use client";

import { useMemo } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  Gift, 
  Users, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Briefcase, 
  Flame, 
  Sparkles, 
  Lock 
} from "lucide-react";
import { Job, getJobReferralUrl } from "@/types/micro1Job";
import { useLanguage } from "@/context/LanguageContext";

interface JobDetailViewProps {
  job: Job;
}

export function JobDetailView({ job }: JobDetailViewProps) {
  const { language, t } = useLanguage();
  const referralUrl = getJobReferralUrl(job.id, job.customReferralUrl);
  const isClosed = job.status === "Closed";
  const categoryName = t.explorer.categories[job.category] || job.category;

  const displayType = useMemo(() => {
    if (language === "id") {
      if (job.type === "Full-Time") return "Purna Waktu (Full-Time)";
      if (job.type === "Part-Time") return "Paruh Waktu (Part-Time)";
      return "Kontrak (Contract)";
    }
    return job.type;
  }, [language, job.type]);

  // Localized description content
  const displayDescription = useMemo(() => {
    if (language === "id") {
      if (job.description_id) return job.description_id;
      return `Kami mencari profesional ${job.title} yang berkualifikasi untuk bergabung dengan tim remote berkinerja tinggi. Posisi ini menawarkan fleksibilitas kerja remote penuh dengan kompensasi transparan dalam mata uang USD, peluang berdampak langsung pada proyek berskala global, serta kolaborasi dengan praktisi dan engineer terbaik dunia.`;
    }
    return job.description;
  }, [language, job.title, job.description, job.description_id]);

  // Localized responsibilities content
  const displayResponsibilities = useMemo(() => {
    if (language === "id") {
      if (job.responsibilities_id && job.responsibilities_id.length > 0) {
        return job.responsibilities_id;
      }
      const topSkill = job.requiredSkills[0] || "tugas utama";
      return [
        `Memimpin dan mengeksekusi pencapaian target utama terkait posisi ${job.title}`,
        `Menerapkan praktik terbaik dalam bidang ${topSkill} dan menjaga standar kualitas kerja yang tinggi`,
        "Berkolaborasi lintas fungsi dan zona waktu secara efektif untuk memastikan penyelesaian tugas tepat waktu",
        "Berpartisipasi aktif dalam tinjauan teknis serta inisiatif perbaikan dan pengembangan berkelanjutan"
      ];
    }
    return job.responsibilities && job.responsibilities.length > 0 
      ? job.responsibilities 
      : [
          `Lead and execute key milestones related to ${job.title}`,
          `Apply best practices in ${job.requiredSkills[0] || "core deliverables"} and maintain high quality benchmarks`,
          "Collaborate cross-functionally across timezones to ensure seamless delivery",
          "Participate in technical reviews and continuous improvement initiatives"
        ];
  }, [language, job.title, job.requiredSkills, job.responsibilities, job.responsibilities_id]);

  // Localized qualifications content
  const displayQualifications = useMemo(() => {
    if (language === "id") {
      if (job.qualifications_id && job.qualifications_id.length > 0) {
        return job.qualifications_id;
      }
      const skillsStr = job.requiredSkills.slice(0, 3).join(", ") || "bidang terkait";
      return [
        `Memiliki pengalaman praktis yang terbukti dalam ${skillsStr}`,
        "Kemampuan pemecahan masalah yang kuat serta mampu bekerja secara mandiri (otonom)",
        "Kemampuan bahasa Inggris profesional yang lancar untuk komunikasi harian secara sinkron maupun asinkron",
        "Rekam jejak yang terpercaya dan terbiasa dengan lingkungan kerja remote"
      ];
    }
    return job.qualifications && job.qualifications.length > 0
      ? job.qualifications
      : [
          `Demonstrated hands-on experience in ${job.requiredSkills.slice(0, 3).join(", ") || "the relevant domain"}`,
          "Strong problem-solving capability and autonomous execution",
          "Fluency in professional English for daily async & sync communication",
          "Reliable track record in remote environments"
        ];
  }, [language, job.requiredSkills, job.qualifications, job.qualifications_id]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/#jobs"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.jobDetail.back}
          </Link>
        </div>

        {/* Main Job Detail Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Job Narrative */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-100">
                  {categoryName}
                </span>

                {job.isNew && !isClosed && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    {t.jobDetail.newOpening}
                  </span>
                )}

                {job.isHighDemand && !isClosed && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg border border-amber-200">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    {t.jobDetail.highDemandRole}
                  </span>
                )}

                {isClosed && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg">
                    <Lock className="w-3.5 h-3.5" />
                    {t.jobDetail.positionClosed}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-slate-500 mb-6">
                <span className="text-slate-800 font-bold">{job.companyName}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {job.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {t.jobDetail.posted} {job.postedDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-blue-600 font-semibold">
                  <Users className="w-3.5 h-3.5" />
                  {job.openings} {t.jobDetail.openings} ({displayType})
                </span>
              </div>

              {/* Skills Tags */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  {t.jobDetail.coreSkills}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  {t.jobDetail.roleOverview}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {displayDescription}
                </p>
              </div>

              {/* Responsibilities */}
              {displayResponsibilities.length > 0 && (
                <div>
                  <h3 className="text-md font-bold text-slate-900 mb-3">
                    {t.jobDetail.keyResponsibilities}
                  </h3>
                  <ul className="space-y-2.5">
                    {displayResponsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Qualifications */}
              {displayQualifications.length > 0 && (
                <div>
                  <h3 className="text-md font-bold text-slate-900 mb-3">
                    {t.jobDetail.qualifications}
                  </h3>
                  <ul className="space-y-2.5">
                    {displayQualifications.map((qual, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Financial Card & Application Action */}
          <div className="space-y-6">
            {/* Sticky Application Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5 sticky top-24">
              {/* Compensation */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-xs text-slate-400 font-medium flex items-center gap-1 mb-1">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  {t.jobDetail.hourlyCompensation}
                </div>
                <div className="text-2xl font-black text-slate-900">
                  ${job.hourlyMin} - ${job.hourlyMax}
                  <span className="text-sm font-normal text-slate-500">
                    {language === "id" ? " / jam USD" : " / hr USD"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {t.jobDetail.paymentNote}
                </p>
              </div>

              {/* Referral Reward Box */}
              <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
                <div className="text-xs text-purple-700 font-bold flex items-center gap-1.5 mb-1">
                  <Gift className="w-4 h-4 text-purple-600" />
                  {t.jobDetail.referralBonus}
                </div>
                <div className="text-2xl font-black text-purple-950">
                  ${job.referralReward.toLocaleString()}
                  <span className="text-sm font-normal text-purple-600"> USD</span>
                </div>
                <p className="text-[11px] text-purple-700/80 mt-1">
                  {t.jobDetail.rewardNote}
                </p>
              </div>

              {/* Application Details */}
              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">{t.jobDetail.positionStatus}</span>
                  <strong className={isClosed ? "text-slate-400" : "text-emerald-600"}>
                    {job.status}
                  </strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">{t.jobDetail.targetOpenings}</span>
                  <strong className="text-slate-800">
                    {job.openings} {t.jobDetail.openings}
                  </strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">{t.jobDetail.jobId}</span>
                  <span className="font-mono text-[11px] text-slate-500 truncate max-w-[140px]" title={job.id}>
                    {job.id}
                  </span>
                </div>
              </div>

              {/* Apply Button */}
              {isClosed ? (
                <button
                  disabled
                  className="w-full py-3.5 px-4 rounded-2xl bg-slate-200 text-slate-500 font-bold text-sm cursor-not-allowed text-center"
                >
                  {t.jobDetail.applicationsClosed}
                </button>
              ) : (
                <a
                  href={referralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-extrabold text-sm shadow-xl shadow-blue-500/20 hover:shadow-2xl transition-all flex items-center justify-center gap-2 group"
                >
                  {t.jobDetail.applyBtn}
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}

              {/* Priority Application Pill */}
              <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-400 flex items-start gap-2 border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p>
                  {t.jobDetail.priorityNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
