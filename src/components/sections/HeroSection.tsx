"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  DollarSign, 
  Gift, 
  Globe2
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-14 bg-gradient-to-b from-blue-50/60 via-white to-slate-50 overflow-hidden">
      {/* Decorative gradient accents */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-tr from-blue-400/10 via-purple-400/10 to-indigo-400/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 border border-blue-200/80 px-4 py-1.5 rounded-full text-xs font-bold text-blue-700 shadow-sm backdrop-blur-md">
            <Globe2 className="w-3.5 h-3.5 text-blue-600" />
            <span>KerjaGlobal.id</span>
            <span className="w-1 h-1 rounded-full bg-blue-300" />
            <span className="text-slate-500 font-medium">Platform Karir Remote Global Terkurasi</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Kerja Remote Dunia,{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Bayaran Dollar (USD)
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Jelajahi loker remote terverifikasi di bidang AI, Software Engineering, Design, dan Product dari startup Silicon Valley dan teknologi global. Lamar langsung dengan kompensasi standar USD.
          </p>

          {/* Call-To-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="#jobs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm px-7 py-3.5 rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-2xl transition-all"
            >
              Lihat Lowongan Aktif
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#categories"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm px-6 py-3.5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group"
            >
              Eksplor Kategori
            </Link>
          </div>

          {/* Highlights / Trust Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-8 border-t border-slate-200/80 max-w-xl mx-auto text-left">
            <div className="p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mb-0.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                Gaji Per Jam
              </div>
              <div className="text-sm sm:text-base font-black text-slate-900">
                $35 - $110 <span className="text-xs font-normal text-slate-500">/hr</span>
              </div>
            </div>

            <div className="p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mb-0.5">
                <Gift className="w-3.5 h-3.5 text-purple-500" />
                Bonus Referral
              </div>
              <div className="text-sm sm:text-base font-black text-purple-950">
                Hingga $1,500
              </div>
            </div>

            <div className="p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                Seleksi Karir
              </div>
              <div className="text-sm sm:text-base font-black text-slate-900">
                100% Terverifikasi
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
