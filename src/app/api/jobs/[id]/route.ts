import { NextResponse } from "next/server";
import { getServerJobById, updateServerJob, deleteServerJob } from "@/lib/jobsStore";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const job = await getServerJobById(id);
    if (!job) {
      return NextResponse.json(
        { success: false, error: "Job not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = updateServerJob(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Job not found to update" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update job" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const success = deleteServerJob(id);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Job not found to delete" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete job" },
      { status: 500 }
    );
  }
}

