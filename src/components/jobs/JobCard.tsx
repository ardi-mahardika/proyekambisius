"use client";

import Link from "next/link";
import { 
  DollarSign, 
  MapPin, 
  Gift, 
  Users, 
  Calendar, 
  ExternalLink, 
  ArrowRight, 
  Flame, 
  Sparkles, 
  Lock 
} from "lucide-react";
import { Job, getJobReferralUrl } from "@/types/micro1Job";
import { useLanguage } from "@/context/LanguageContext";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const { language, t } = useLanguage();
  const referralUrl = getJobReferralUrl(job.id, job.customReferralUrl);
  const isClosed = job.status === "Closed";

  const categoryName = t.explorer.categories[job.category] || job.category;
  const displayType = language === "id"
    ? (job.type === "Full-Time" ? "Purna Waktu" : job.type === "Part-Time" ? "Paruh Waktu" : "Kontrak")
    : job.type;

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between group relative overflow-hidden ${
        isClosed
          ? "border-slate-200 opacity-75 bg-slate-50/50"
          : "border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-0.5"
      }`}
    >
      {/* Top Accent Strip */}
      <div
        className={`h-1.5 w-full ${
          isClosed
            ? "bg-slate-300"
            : "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"
        }`}
      />

      <div className="p-6">
        {/* Badges & Meta Top */}
        <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md border border-blue-100">
              {categoryName}
            </span>

            {job.isNew && !isClosed && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                {t.card.newBadge}
              </span>
            )}

            {job.isHighDemand && !isClosed && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200">
                <Flame className="w-3 h-3 text-amber-500" />
                {t.card.highDemandBadge}
              </span>
            )}

            {isClosed && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                <Lock className="w-3 h-3" />
                {t.card.closedBadge}
              </span>
            )}
          </div>

          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {job.postedDate}
          </span>
        </div>

        {/* Job Title & Company */}
        <Link href={`/jobs/${job.id}`} className="block mb-1.5">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {job.title}
          </h3>
        </Link>
        <p className="text-xs font-semibold text-slate-500 mb-4 flex items-center gap-2">
          <span>{job.companyName}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="flex items-center text-slate-400">
            <MapPin className="w-3 h-3 mr-0.5" />
            {job.location}
          </span>
        </p>

        {/* Financial & Openings Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {/* Salary Box */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
            <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mb-0.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              {t.card.hourlySalary}
            </div>
            <div className="text-sm font-extrabold text-slate-900">
              ${job.hourlyMin} - ${job.hourlyMax}
              <span className="text-xs font-normal text-slate-500">
                {language === "id" ? " / jam" : " / hr"}
              </span>
            </div>
          </div>

          {/* Referral Reward Box */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50/50 border border-purple-100 rounded-xl p-2.5">
            <div className="text-[11px] text-purple-700 font-semibold flex items-center gap-1 mb-0.5">
              <Gift className="w-3.5 h-3.5 text-purple-600" />
              {t.card.referralReward}
            </div>
            <div className="text-sm font-extrabold text-purple-900">
              ${job.referralReward.toLocaleString()}
              <span className="text-xs font-normal text-purple-600"> USD</span>
            </div>
          </div>
        </div>

        {/* Openings count */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
          <Users className="w-3.5 h-3.5 text-blue-500" />
          <span>
            {t.card.openings}{" "}
            <strong className="text-slate-800">
              {job.openings} {t.card.positions}
            </strong>
          </span>
          <span className="mx-1 text-slate-300">•</span>
          <span className="text-slate-500">{displayType}</span>
        </div>

        {/* Required Skills Chips */}
        <div className="flex flex-wrap gap-1.5">
          {job.requiredSkills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
            >
              {skill}
            </span>
          ))}
          {job.requiredSkills.length > 4 && (
            <span className="text-[10px] font-semibold text-slate-400 self-center">
              +{job.requiredSkills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
        <Link
          href={`/jobs/${job.id}`}
          className="flex-1 text-center py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-300 transition-colors flex items-center justify-center gap-1"
        >
          {t.card.viewDetails}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {isClosed ? (
          <button
            disabled
            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-400 bg-slate-200 cursor-not-allowed"
          >
            {t.card.closedBtn}
          </button>
        ) : (
          <a
            href={referralUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/15 hover:shadow-lg transition-all flex items-center justify-center gap-1 group/btn"
          >
            {t.card.applyNow}
            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        )}
      </div>
    </div>
  );
}
