import { Search, MousePointer, Award } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Jelajahi Platform",
    description:
      "Browse dan bandingkan berbagai platform kerja global. Filter berdasarkan kategori, komisi, dan rating pengguna.",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: MousePointer,
    step: "02",
    title: "Daftar via Link Kami",
    description:
      "Klik tombol 'Daftar Sekarang' di platform pilihan kamu. Gunakan link referral kami untuk mendukung KerjaGlobal.id.",
    color: "from-purple-500 to-purple-700",
  },
  {
    icon: Award,
    step: "03",
    title: "Raih Karir Global",
    description:
      "Ikuti proses seleksi, tampilkan skill terbaikmu, dan mulai bekerja dengan klien internasional bergaji dollar!",
    color: "from-green-500 to-green-700",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Cara{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Kerjanya
            </span>
          </h2>
          <p className="text-gray-500 text-lg">3 langkah mudah menuju karir global</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 to-purple-200" />

          {steps.map((step) => (
            <div key={step.step} className="relative text-center">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-xs font-bold text-gray-400 tracking-widest mb-2">LANGKAH {step.step}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
