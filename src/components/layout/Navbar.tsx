"use client";

import Link from "next/link";
import { Globe2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Branding KerjaGlobal.id */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  KerjaGlobal
                </span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-black text-xl">
                  .id
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium -mt-1 tracking-wide">
                {t.nav.tagline}
              </p>
            </div>
          </Link>

          {/* Language Switcher Toggle */}
          <div className="flex items-center">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200/80 shadow-inner">
              <button
                type="button"
                onClick={() => setLanguage("id")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  language === "id"
                    ? "bg-white text-blue-600 shadow-sm shadow-slate-200 scale-100"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="Bahasa Indonesia"
              >
                <span>🇮🇩</span>
                <span>ID</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  language === "en"
                    ? "bg-white text-blue-600 shadow-sm shadow-slate-200 scale-100"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="English"
              >
                <span>🇬🇧</span>
                <span>EN</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
