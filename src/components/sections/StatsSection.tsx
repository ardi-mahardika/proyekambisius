import { TrendingUp, Users, Globe, DollarSign } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "12.000+",
    label: "Profesional Aktif",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Globe,
    value: "50+",
    label: "Platform Global",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: DollarSign,
    value: "Rp 8jt+",
    label: "Rata-rata Penghasilan/Bulan",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Tingkat Kepuasan",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
