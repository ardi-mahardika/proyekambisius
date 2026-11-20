import { notFound } from "next/navigation";
import { getServerJobById } from "@/lib/jobsStore";
import { JobDetailView } from "@/components/jobs/JobDetailView";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const { id } = await params;
  const job = await getServerJobById(id);
  if (!job) return { title: "Job Details | KerjaGlobal.id" };

  return {
    title: `${job.title} - ${job.companyName} | KerjaGlobal.id`,
    description: job.description.slice(0, 160),
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const job = await getServerJobById(id);

  if (!job) {
    return notFound();
  }

  return <JobDetailView job={job} />;
}
