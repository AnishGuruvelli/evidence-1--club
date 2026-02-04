# Evidence — Product Requirements Document (PRD)

**LinkedIn shows where you worked. Evidence shows how you work.**

A comprehensive product case study for Evidence—a next-gen professional networking platform where work is the primitive for identity, conversation, discovery, and opportunity.

## 🎯 Core Thesis

Evidence is not "portfolio social media". It is a network where work is the primitive for identity, conversation, discovery, and opportunity.

**The Complete Loop:**
Post work → Get discovered → Start project conversations → Collaborate → Unlock opportunities → Build reputation.

## 📋 Overview

This repository contains a complete Product Requirements Document (PRD) case study for Evidence, designed for Gen Z builders (18–25 years old) who are starting their careers, freelancing, or exploring new-age jobs in design, content, startups, and engineering.

### Differentiation in One Line
**LinkedIn shows where you worked. Evidence shows how you work.**

## 🎨 Key Features

### MVP Core Features (P0)

1. **🎨 Proof-of-Work Identity**
   - Project cards grid on profile (media-first)
   - Standard project template (title, demo video min 30sec, 200 chars, tags)
   - Media-first profile—your work is your identity

2. **👏 Peer Acknowledgements**
   - Replace likes with acknowledgements ("Technically hard", "Great craft", "Thoughtful idea")
   - Build proof-of-work reputation

3. **💬 Discuss This Project**
   - Project-tied private chat with context pinned
   - Core differentiator—context-rich conversations

4. **🔍 Work-Led Discovery**
   - Explore = projects only
   - Search & tag filters
   - "Open to collaborate" toggle

5. **🔐 Social-First Auth**
   - Google + GitHub login
   - Zero password friction for builders

6. **📹 Video-Only Projects**
   - Minimum 30-second videos
   - Ensures quality and visual proof-of-work

## 🚀 Tech Stack

- **Frontend:** React 18 (TypeScript), Vite
- **Styling:** Tailwind CSS (Dark mode professional design)
- **Charts:** Chart.js, react-chartjs-2
- **Component Library:** Radix UI, shadcn/ui
- **Routing:** React Router DOM
- **Forms:** React Hook Form, Zod validation
- **State Management:** TanStack Query

## 📁 Project Structure

```
evidence/
├── public/                # Static assets (images, favicon, etc.)
├── src/
│   ├── components/        # UI components
│   │   └── ui/            # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Main pages (Index, NotFound)
│   ├── App.tsx            # App root component
│   ├── content.json       # All PRD content (editable)
│   └── main.tsx           # Entry point
├── index.html             # Main HTML template
├── tailwind.config.ts     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
├── package.json           # Project metadata and scripts
└── README.md              # This file
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AnishGuruvelli/evidence-1--club.git
   cd evidence-1--club
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🎯 PRD Sections

This case study includes comprehensive sections:

1. **Problem Framing** - Top 6 pain points builders face today
2. **MVP Solution** - 4 core solution pillars
3. **Feature Prioritization** - RICE framework analysis
4. **Roadmap** - 0-3 months, 3-6 months, 6-12 months phases
5. **Metrics & Success** - North Star metric and supporting KPIs
6. **Go-to-Market** - Strategy for first 10,000 users
7. **Product Evolution** - V2/V3 features and monetization pathway

## 📊 Key Metrics

### North Star Metric
**Project Discussions per week** - Measures the core loop: work discovered → context-rich conversation → potential opportunity

### Supporting Metrics
- Projects uploaded per user
- Acknowledgements per project
- % discussions leading to repeat conversation

## 🚀 Go-to-Market Strategy

**Launch Thesis:** "Stop writing resumes. Show what you built."

### Channels for First 10,000 Users:
- Hackathon partnerships (2,000-3,000 builders)
- Campus ambassadors program (1,500-2,000 builders)
- Indie hacker communities (2,000-3,000 builders)
- Founder/recruiter early access (1,500-2,000 builders)

## 🗺️ Roadmap

### Phase 1: Foundation (0–3 months)
- Proof-of-Work Identity
- Peer Acknowledgements
- Discuss This Project
- Work-Led Discovery
- Video-Only Projects
- Launch partnerships

### Phase 2: Growth Loops (3–6 months)
- Social-First Auth
- Shareable project links
- Featured projects
- Themed build weeks

### Phase 3: Scale (6–12 months)
- WIP timelines
- Public project discussions
- Builder reputation score
- Verified recruiter accounts
- Advanced search & filters
- Project collections
- Monetization features

## 💰 Monetization

**Principle:** Builders never pay. Companies pay to discover.

- Recruiter/Founder Search Subscription
- Featured Project Placements
- Optional Verification Badges
- Enterprise Talent Pools

## 🎨 Customization

- **Content:** All PRD content is in `src/content.json` for easy editing
- **UI Components:** Modular components in `src/components/ui/` can be extended
- **Styling:** Tailwind CSS configuration in `tailwind.config.ts`
- **Design:** Professional dark mode theme with gradient accents

## 📦 Deployment

The project can be deployed to any static hosting provider:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your hosting provider.

3. **GitHub Pages:** Use `npm run deploy` to deploy automatically.

Live demo: [https://anishguruvelli.github.io/evidence](https://anishguruvelli.github.io/evidence)

## 📝 Key Features Demonstrated

- **Product Strategy:** Comprehensive PRD presentation
- **User Research:** Detailed user segments and pain points analysis
- **Solution Design:** Feature prioritization using RICE framework
- **Success Metrics:** Data-driven KPIs and measurement strategies
- **Go-to-Market:** Launch strategy and distribution loops
- **Modern UI/UX:** Professional dark mode design with interactive charts
- **Roadmap Planning:** Phased product evolution strategy

## 📄 License

This project is for educational and demonstration purposes.

---

**Author:** Anish Guruvelli  
**GitHub:** [@AnishGuruvelli](https://github.com/AnishGuruvelli)  
**LinkedIn:** [anishguruvelli](https://www.linkedin.com/in/anishguruvelli/)  
**PRD Document:** [Notion PRD](https://believed-breadfruit-1b2.notion.site/Evidence-Product-Requirements-Document-PRD-2fdbc8afb250801c8d10f2e870ca6dc3)  
**Live MVP:** [Evidence MVP](https://anishg-1-club.lovable.app)
