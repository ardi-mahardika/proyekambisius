"use client";

import { Star, Clock, DollarSign, TrendingUp, ExternalLink, CheckCircle } from "lucide-react";
import { Platform } from "@/lib/platforms";
import { cn } from "@/lib/utils";

const badgeColors: Record<string, string> = {
  Best: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Hot: "bg-red-100 text-red-700 border-red-200",
  New: "bg-green-100 text-green-700 border-green-200",
  "High Pay": "bg-purple-100 text-purple-700 border-purple-200",
};

interface PlatformCardProps {
  platform: Platform;
}

export function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all hover:-translate-y-1 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white font-black text-lg`}>
            {platform.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 text-lg">{platform.name}</h3>
              {platform.badge && (
                <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full border", badgeColors[platform.badge])}>
                  {platform.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{platform.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-bold text-yellow-700">{platform.rating}</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-5 leading-relaxed">{platform.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <DollarSign className="w-4 h-4 text-green-600 mx-auto mb-1" />
          <div className="text-xs font-bold text-gray-900">{platform.commission}</div>
          <div className="text-xs text-gray-400 mt-0.5">Komisi</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <Clock className="w-4 h-4 text-blue-600 mx-auto mb-1" />
          <div className="text-xs font-bold text-gray-900">{platform.cookieDuration}</div>
          <div className="text-xs text-gray-400 mt-0.5">Cookie</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <TrendingUp className="w-4 h-4 text-purple-600 mx-auto mb-1" />
          <div className="text-xs font-bold text-gray-900">{platform.avgEarning}</div>
          <div className="text-xs text-gray-400 mt-0.5">Avg/Bulan</div>
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-5">
        {platform.features.map((f) => (
          <span key={f} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg font-medium">
            {f}
          </span>
        ))}
      </div>

      {/* Pros */}
      <div className="mb-5">
        {platform.pros.slice(0, 3).map((pro) => (
          <div key={pro} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
            {pro}
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href={platform.referralUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all group-hover:scale-105",
          `bg-gradient-to-r ${platform.color}`
        )}
      >
        Daftar di {platform.name}
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
