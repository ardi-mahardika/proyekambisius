"use client";

import Link from "next/link";
import { Globe2, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white">
                <Globe2 className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                KerjaGlobal<span className="text-blue-400">.id</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {t.footer.desc}
            </p>
            <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {t.footer.curationTitle}
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {t.footer.curationDesc}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#jobs" className="hover:text-white transition-colors">
                  {t.footer.allJobs}
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">
                  {t.explorer.categoryLabel.replace(":", "")}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  {t.footer.adminDashboard}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t.footer.aboutUs}
                </Link>
              </li>
            </ul>
          </div>

          {/* Kategori Populer */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              {t.footer.categoriesTitle}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#jobs" className="hover:text-white transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/#jobs" className="hover:text-white transition-colors">
                  Software Engineering
                </Link>
              </li>
              <li>
                <Link href="/#jobs" className="hover:text-white transition-colors">
                  Product & Design
                </Link>
              </li>
              <li>
                <Link href="/#jobs" className="hover:text-white transition-colors">
                  Data & Analytics
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            © {new Date().getFullYear()} KerjaGlobal.id. {t.footer.copyright}
          </p>
          <p className="text-slate-400">
            {t.footer.taglineFooter}
          </p>
        </div>
      </div>
    </footer>
  );
}
