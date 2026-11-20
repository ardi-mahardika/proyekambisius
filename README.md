# 🚀 Micro1 Referral Jobs

> Modern, responsive Hybrid Job Listing Aggregator for **Micro1** pre-vetted career opportunities with automated referral attribution.

---

## 📌 Project Overview

**Micro1 Referral Jobs** displays curated job opportunities from Micro1 and directs applicants to the official Micro1 application pages using your personal referral credentials.

- **Referral Code**: `b90e6c12-07b5-40c2-9c3f-9cb507007066`
- **Main Micro1 Opportunities**: `https://refer.micro1.ai/opportunities`
- **All Jobs Referral URL**:
  `https://refer.micro1.ai/referral/jobs?referralCode=b90e6c12-07b5-40c2-9c3f-9cb507007066&utm_source=referral&utm_medium=share&utm_campaign=job_referral`
- **Specific Job Referral Pattern**:
  `https://jobs.micro1.ai/post/{jobId}?referralCode=b90e6c12-07b5-40c2-9c3f-9cb507007066&utm_source=referral&utm_medium=share&utm_campaign=job_referral`

---

## ✨ Features Implemented

### 1. 💼 Job Listings & Cards
- **Job Title & Company Name**
- **Date Posted**
- **Badges**: `New`, `High Demand`, and `Closed`
- **Number of Openings**
- **Required Skills Tags**
- **Hourly Salary Range** (e.g. `$45 - $85 / hr USD`)
- **Referral Reward Badge** (e.g. `$1,000 USD`)
- **"View Details"** navigation to dedicated `/jobs/[id]`
- **"Apply Now"** redirects to the verified Micro1 job post preserving `jobId` & `referralCode`

### 2. 🔍 Instant Search & Multi-Filters
- **Search bar**: Search in real-time by title, skill keywords (`React`, `Python`, `Figma`, etc.), or company name.
- **Category Filter Tabs**: `All`, `Engineering`, `AI & Machine Learning`, `Design`, `Product`, `Data & Analytics`, `Marketing`.
- **Sliders & Toggles**:
  - Minimum Hourly Salary slider
  - Minimum Referral Reward slider
  - Minimum Openings slider
  - `New Only` toggle
  - `High Demand` toggle
- **Sorting Options**:
  - Latest Jobs
  - Highest Hourly Salary
  - Highest Referral Reward
  - Most Openings
- **Empty State**: Friendly illustration and reset button when no jobs match.

### 3. 📄 Dedicated Job Detail Page (`/jobs/[id]`)
- Full description, qualifications, and responsibilities.
- Sticky compensation & referral reward sidebar.
- Preserved application link with fallback and verification badges.
- Closed job state handling (disables button with clear status).

### 4. 🛠️ Admin Dashboard (`/admin`)
- **Add Jobs Manually**: Form to input Job ID, title, company, salary, reward, openings, skills, and custom referral URL.
- **Edit Listings**: Inline modal to update information and rewards.
- **Toggle Open/Closed**: Quick 1-click status switcher.
- **Delete Listings**: Remove unavailable roles.
- **Metrics Overview**: Total managed jobs, active open positions, and total potential rewards.

### 5. 🔌 Backend & API Layer
- `GET /api/jobs` — Retrieve all jobs
- `POST /api/jobs` — Create new job
- `GET /api/jobs/[id]` — Retrieve single job
- `PUT /api/jobs/[id]` — Update job details
- `DELETE /api/jobs/[id]` — Remove job

---

## 💻 Local Development Instructions

### Prerequisites
- Node.js 18+ (tested with Node.js v26.13.1)
- npm or pnpm

### Quick Start
```bash
# 1. Clone or navigate to the project directory
cd kerjaglobal-id

# 2. Install dependencies (if not already installed)
npm install

# 3. Start local development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🌐 Pages Overview

| Route | Description |
|---|---|
| `/` | Landing page with Hero & Live Job Explorer |
| `/jobs/[id]` | Dedicated job detail page (e.g. `/jobs/72c41508-c619-471f-acb1-3ea0c5231254`) |
| `/admin` | Admin dashboard for CRUD, salary, reward & referral management |
| `/about` | Platform information, vetting guide & referral guarantee |
| `/api/jobs` | REST API for candidate opportunities data layer |

---

## 🚀 Vercel Deployment Instructions

1. Push your project repository to GitHub / GitLab / Bitbucket.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository.
4. Set Framework Preset: **Next.js**.
5. Add the Environment Variables:
   - `NEXT_PUBLIC_MICRO1_REFERRAL_CODE` = `b90e6c12-07b5-40c2-9c3f-9cb507007066`
   - `NEXT_PUBLIC_MICRO1_ALL_JOBS_URL` = `https://refer.micro1.ai/referral/jobs?referralCode=b90e6c12-07b5-40c2-9c3f-9cb507007066&utm_source=referral&utm_medium=share&utm_campaign=job_referral`
6. Click **Deploy**. Vercel will build and output your production URL in under 2 minutes.

---

## 🗄️ Optional Supabase Integration

When you are ready to persist data to a remote PostgreSQL database:
1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Create a `jobs` table matching the `Job` interface in `src/types/micro1Job.ts`.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.
4. Replace the in-memory array in `src/lib/jobsStore.ts` with Supabase client queries.
