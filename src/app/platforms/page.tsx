import { platforms } from "@/lib/platforms";
import { PlatformCard } from "@/components/ui/PlatformCard";

export const metadata = {
  title: "Semua Platform — KerjaGlobal.id",
  description: "Lihat dan bandingkan semua platform kerja remote global terbaik",
};

export default function PlatformsPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Semua{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Platform
            </span>
          </h1>
          <p className="text-gray-500 text-lg">
            {platforms.length} platform terkurasi untuk karir globalmu
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platforms.map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      </div>
    </div>
  );
}
