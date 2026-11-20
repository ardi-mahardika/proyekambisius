import Link from "next/link";
import { 
  Globe2, 
  ShieldCheck, 
  Sparkles, 
  Gift 
} from "lucide-react";

export const metadata = {
  title: "Tentang KerjaGlobal.id | Platform Peluang Karir Remote Internasional",
  description: "Pelajari bagaimana KerjaGlobal.id menjembatani talenta remote Indonesia dengan lowongan kerja terkurasi di startup dan perusahaan teknologi global."
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
            <Globe2 className="w-3.5 h-3.5" /> Tentang KerjaGlobal.id
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Membuka Gerbang Karir Global untuk Profesional Indonesia
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            KerjaGlobal.id adalah platform agregator peluang karir mandiri yang mengurasi lowongan kerja bergaji USD dari startup global dan perusahaan teknologi terkemuka dunia.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          <h2 className="text-xl font-bold text-slate-900">
            Bagaimana KerjaGlobal.id Bekerja?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Kurasi Lowongan Berkualitas</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Jelajahi posisi terverifikasi, kisaran gaji per jam dalam Dollar (USD), keahlian yang dicari, dan bonus referral.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Aplikasi Langsung & Transparan</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ketika Anda mengklik Lamar, sistem otomatis menyematkan kode referensi resmi untuk memprioritaskan profil Anda dalam antrean pelamar.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Screening Cepat & Penempatan</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ikuti sesi evaluasi teknis untuk langsung dicocokkan dengan klien dan hiring manager global tanpa perantara berbelit.
              </p>
            </div>
          </div>

          {/* Referral Transparency Guarantee */}
          <div className="p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 rounded-2xl border border-blue-100 space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Integritas & Akses Prioritas Resmi
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Setiap tombol lamaran di KerjaGlobal.id mengarah ke halaman portal karir resmi terverifikasi dengan parameter jalur prioritas, memastikan lamaran Anda langsung terdata di pipeline rekrutmen mitra global.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <Link
              href="/#jobs"
              className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center shadow-md transition-all"
            >
              Lihat Lowongan Kerja
            </Link>
            <Link
              href="/#categories"
              className="py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
            >
              Eksplor Kategori Pekerjaan
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
