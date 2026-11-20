import { NextResponse } from "next/server";
import { getServerJobs, addServerJob } from "@/lib/jobsStore";
import { Job } from "@/types/micro1Job";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceSync = searchParams.get("sync") === "true";
    const jobs = await getServerJobs(forceSync);
    return NextResponse.json({
      success: true,
      data: jobs,
      total: jobs.length,
      lastSynced: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validasi basic
    if (!body.title || !body.companyName) {
      return NextResponse.json(
        { success: false, error: "Title and Company Name are required" },
        { status: 400 }
      );
    }

    const newJob: Job = {
      id: body.id || (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `job-${Date.now()}`),
      title: body.title,
      companyName: body.companyName,
      category: body.category || "Engineering",
      location: body.location || "Remote (Global)",
      type: body.type || "Full-Time",
      hourlyMin: Number(body.hourlyMin) || 30,
      hourlyMax: Number(body.hourlyMax) || 60,
      referralReward: Number(body.referralReward) || 500,
      openings: Number(body.openings) || 1,
      postedDate: body.postedDate || new Date().toISOString().split("T")[0],
      isNew: Boolean(body.isNew),
      isHighDemand: Boolean(body.isHighDemand),
      status: body.status || "Open",
      requiredSkills: Array.isArray(body.requiredSkills) ? body.requiredSkills : [],
      description: body.description || "",
      qualifications: Array.isArray(body.qualifications) ? body.qualifications : [],
      responsibilities: Array.isArray(body.responsibilities) ? body.responsibilities : [],
      customReferralUrl: body.customReferralUrl || undefined
    };

    const saved = addServerJob(newJob);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create job" },
      { status: 500 }
    );
  }
}

