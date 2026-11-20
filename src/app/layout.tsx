import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "KerjaGlobal.id — Kerja Remote Global, Bayaran Dollar (USD)",
  description:
    "Portal lowongan kerja remote global terkurasi untuk talenta profesional. Lamar langsung ke perusahaan teknologi terkemuka dengan kompensasi standar global (USD).",
  keywords: [
    "KerjaGlobal.id",
    "Kerja Global",
    "Kerja Remote",
    "Lowongan Kerja Luar Negeri",
    "Gaji Dollar",
    "Software Engineer Remote",
    "AI Prompt Engineer",
    "Remote Work Indonesia"
  ],
  openGraph: {
    title: "KerjaGlobal.id — Kerja Remote Global, Bayaran Dollar",
    description: "Temukan lowongan kerja remote internasional terkurasi dengan kompensasi standar global (USD).",
    url: "https://kerjaglobal.id",
    siteName: "KerjaGlobal.id",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-white text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
