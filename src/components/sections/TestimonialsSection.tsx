import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rizki Pratama",
    role: "Full-Stack Developer",
    platform: "Macro",
    earning: "$4,500/bulan",
    avatar: "RP",
    rating: 5,
    text: "KerjaGlobal.id mengubah hidup saya! Dari gaji 8jt sebulan, sekarang saya bisa earn $4,500 lewat Macro. Proses aplikasinya jelas banget dijelasin di sini.",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Siti Nurhaliza",
    role: "AI/ML Engineer",
    platform: "Global Tech Client",
    earning: "$3,200/bulan",
    avatar: "SN",
    rating: 5,
    text: "Pilihan lowongan di KerjaGlobal.id sangat detail dan berkualitas. Saya melamar peluang remote di sini dan langsung dapat project dalam 2 minggu!",
    color: "from-purple-500 to-purple-700",
  },
  {
    name: "Ahmad Fauzi",
    role: "UI/UX Designer",
    platform: "Toptal",
    earning: "$6,000/bulan",
    avatar: "AF",
    rating: 5,
    text: "Toptal memang ketat seleksinya, tapi KerjaGlobal.id kasih panduan persiapannya. Sekarang saya kerja bareng startup unicorn US!",
    color: "from-cyan-500 to-cyan-700",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Kisah Sukses{" "}
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Pengguna Kami
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Mereka sudah buktikan, giliran kamu!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <Quote className="w-8 h-8 text-blue-400 mb-4" />
              <p className="text-gray-300 text-sm leading-relaxed mb-6">{t.text}</p>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role} · {t.platform}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-green-400 font-bold text-sm">{t.earning}</div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
