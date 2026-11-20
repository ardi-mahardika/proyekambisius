"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  ShieldAlert, 
  DollarSign, 
  Gift, 
  Users, 
  ArrowLeft,
  Save,
  X,
  Search
} from "lucide-react";
import { Job, CATEGORIES, DEFAULT_REFERRAL_CODE, getJobReferralUrl } from "@/types/micro1Job";
import { INITIAL_MICRO1_JOBS } from "@/data/micro1InitialJobs";

export default function AdminDashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Form State untuk Add / Edit
  const [formData, setFormData] = useState<Partial<Job>>({
    title: "",
    companyName: "",
    category: "Engineering",
    location: "Remote (Global)",
    type: "Full-Time",
    hourlyMin: 40,
    hourlyMax: 75,
    referralReward: 800,
    openings: 2,
    status: "Open",
    isNew: true,
    isHighDemand: false,
    requiredSkills: ["React", "TypeScript"],
    description: "",
    qualifications: ["3+ years relevant experience", "Strong communication skills"],
    responsibilities: ["Develop production features", "Collaborate with distributed team"],
    customReferralUrl: ""
  });

  const [skillsInput, setSkillsInput] = useState("React, TypeScript");

  // Load jobs from API with fallback
  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      setLoading(true);
      const res = await fetch("/api/jobs");
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setJobs(json.data);
          return;
        }
      }
      setJobs(INITIAL_MICRO1_JOBS);
    } catch {
      setJobs(INITIAL_MICRO1_JOBS);
    } finally {
      setLoading(false);
    }
  }

  // Toggle status Open / Closed
  async function toggleStatus(job: Job) {
    const newStatus = job.status === "Open" ? "Closed" : "Open";
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setJobs(jobs.map((j) => (j.id === job.id ? { ...j, status: newStatus } : j)));
        showMessage(`Job status changed to ${newStatus}`);
      }
    } catch (err) {
      // Local fallback
      setJobs(jobs.map((j) => (j.id === job.id ? { ...j, status: newStatus } : j)));
    }
  }

  // Delete Job
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this job listing?")) return;
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setJobs(jobs.filter((j) => j.id !== id));
        showMessage("Job deleted successfully");
      }
    } catch {
      setJobs(jobs.filter((j) => j.id !== id));
      showMessage("Job removed locally");
    }
  }

  function showMessage(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3500);
  }

  function openCreateModal() {
    setIsCreating(true);
    setEditingJob(null);
    setFormData({
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `job-${Date.now()}`,
      title: "",
      companyName: "",
      category: "Engineering",
      location: "Remote (Global)",
      type: "Full-Time",
      hourlyMin: 40,
      hourlyMax: 80,
      referralReward: 1000,
      openings: 2,
      status: "Open",
      isNew: true,
      isHighDemand: true,
      postedDate: new Date().toISOString().split("T")[0],
      description: "Exciting opportunity to join a fast-scaling global tech team.",
      qualifications: ["Proven experience in relevant tech stack", "Self-driven and autonomous"],
      responsibilities: ["Lead system architecture and feature delivery"],
      customReferralUrl: ""
    });
    setSkillsInput("TypeScript, Next.js, AI Tools");
  }

  function openEditModal(job: Job) {
    setEditingJob(job);
    setIsCreating(false);
    setFormData({ ...job });
    setSkillsInput(job.requiredSkills.join(", "));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const skillsArray = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: Job = {
      ...(formData as Job),
      requiredSkills: skillsArray,
      hourlyMin: Number(formData.hourlyMin) || 30,
      hourlyMax: Number(formData.hourlyMax) || 60,
      referralReward: Number(formData.referralReward) || 500,
      openings: Number(formData.openings) || 1,
    };

    if (isCreating) {
      try {
        const res = await fetch("/api/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const json = await res.json();
          setJobs([json.data, ...jobs]);
        } else {
          setJobs([payload, ...jobs]);
        }
      } catch {
        setJobs([payload, ...jobs]);
      }
      showMessage("New job opportunity created!");
    } else if (editingJob) {
      try {
        await fetch(`/api/jobs/${editingJob.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        setJobs(jobs.map((j) => (j.id === editingJob.id ? payload : j)));
      } catch {
        setJobs(jobs.map((j) => (j.id === editingJob.id ? payload : j)));
      }
      showMessage("Job updated successfully!");
    }

    setIsCreating(false);
    setEditingJob(null);
  }

  const filteredJobs = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.companyName.toLowerCase().includes(search.toLowerCase()) ||
    j.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalOpenings = jobs.reduce((acc, j) => acc + (j.status === "Open" ? j.openings : 0), 0);
  const totalPotentialReward = jobs.reduce((acc, j) => acc + (j.status === "Open" ? j.referralReward : 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Site
            </Link>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Admin Listing Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage opportunities, update referral rewards, adjust status, and configure custom referral URLs.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Add New Job Opportunity
          </button>
        </div>

        {/* Toast Message */}
        {message && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            {message}
          </div>
        )}

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Total Managed Jobs
            </div>
            <div className="text-2xl font-black text-slate-900">{jobs.length}</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Open Positions
            </div>
            <div className="text-2xl font-black text-emerald-600">{totalOpenings}</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
              Total Potential Rewards
            </div>
            <div className="text-2xl font-black text-purple-900">
              ${totalPotentialReward.toLocaleString()}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
              Active Referral Code
            </div>
            <div className="text-xs font-mono font-bold text-blue-600 truncate" title={DEFAULT_REFERRAL_CODE}>
              {DEFAULT_REFERRAL_CODE.slice(0, 16)}...
            </div>
          </div>
        </div>

        {/* Search Bar in Table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-4 shadow-sm">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter listings by title, company, or category..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4">Job Info</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Salary / Hr</th>
                  <th className="px-5 py-4">Referral Reward</th>
                  <th className="px-5 py-4">Openings</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredJobs.map((job) => {
                  const referralUrl = getJobReferralUrl(job.id, job.customReferralUrl);
                  return (
                    <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900 text-sm">{job.title}</div>
                        <div className="text-slate-400 text-[11px]">{job.companyName}</div>
                        <div className="font-mono text-[10px] text-slate-400 truncate max-w-[200px]" title={job.id}>
                          ID: {job.id}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold text-[11px]">
                          {job.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-bold text-slate-900">
                        ${job.hourlyMin} - ${job.hourlyMax}/hr
                      </td>
                      <td className="px-5 py-4 font-bold text-purple-700">
                        ${job.referralReward.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {job.openings}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => toggleStatus(job)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                            job.status === "Open"
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          }`}
                        >
                          {job.status === "Open" ? (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                              Open
                            </>
                          ) : (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                              Closed
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={referralUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Test Referral URL"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => openEditModal(job)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Edit Listing"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Create / Edit */}
        {(isCreating || editingJob) && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingJob(null);
                }}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold text-slate-900 mb-4">
                {isCreating ? "Add New Job Listing" : `Edit Job: ${editingJob?.title}`}
              </h2>

              <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold text-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1">Job Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      placeholder="e.g. Senior AI Research Engineer"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Company Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName || ""}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      placeholder="e.g. Tier-1 Silicon Valley Partner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1">Category</label>
                    <select
                      value={formData.category || "Engineering"}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
                    >
                      {CATEGORIES.filter((c) => c !== "All").map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1">Min Hourly Salary ($/hr)</label>
                    <input
                      type="number"
                      value={formData.hourlyMin || 30}
                      onChange={(e) => setFormData({ ...formData, hourlyMin: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Max Hourly Salary ($/hr)</label>
                    <input
                      type="number"
                      value={formData.hourlyMax || 60}
                      onChange={(e) => setFormData({ ...formData, hourlyMax: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1">Referral Reward ($ USD)</label>
                    <input
                      type="number"
                      value={formData.referralReward || 750}
                      onChange={(e) => setFormData({ ...formData, referralReward: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Openings Count</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.openings || 1}
                      onChange={(e) => setFormData({ ...formData, openings: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Status</label>
                    <select
                      value={formData.status || "Open"}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-1">Required Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="React, Next.js, Python, TypeScript"
                  />
                </div>

                <div>
                  <label className="block mb-1">Job ID (Post UUID)</label>
                  <input
                    type="text"
                    value={formData.id || ""}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                    placeholder="e.g. 72c41508-c619-471f-acb1-3ea0c5231254"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Job application URL will automatically be formed using this ID.
                  </p>
                </div>

                <div>
                  <label className="block mb-1">Custom Referral URL (Optional Override)</label>
                  <input
                    type="url"
                    value={formData.customReferralUrl || ""}
                    onChange={(e) => setFormData({ ...formData, customReferralUrl: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px]"
                    placeholder="Leave empty to use automatic standard referral URL"
                  />
                </div>

                <div>
                  <label className="block mb-1">Job Description</label>
                  <textarea
                    rows={4}
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="Detailed description of the responsibilities and background..."
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isNew ?? true}
                      onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                      className="rounded text-blue-600"
                    />
                    <span>Mark as "New"</span>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isHighDemand ?? false}
                      onChange={(e) => setFormData({ ...formData, isHighDemand: e.target.checked })}
                      className="rounded text-amber-600"
                    />
                    <span>Mark as "High Demand"</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingJob(null);
                    }}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/20"
                  >
                    <Save className="w-4 h-4" />
                    Save Job Listing
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

