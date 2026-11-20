import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl shadow-blue-200">
          <Rocket className="w-14 h-14 text-white mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Siap Kerja Global? 🚀
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Ribuan profesional Indonesia sudah membuktikannya. Sekarang giliran kamu!
            Daftar gratis dan mulai perjalanan karir globalmu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/platforms"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all"
            >
              Lihat Semua Platform
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
            >
              Bandingkan Platform
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
