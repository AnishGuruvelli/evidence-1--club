# Evidence - Case Study

## Overview
Evidence – Beyond the Loan is a product case study showcasing "Evidence Orbit"—a post-arrival financial wellness suite designed to transform Evidence from a transactional loan provider into a daily financial co-pilot for international students. This project demonstrates how Smart Pacing, Credit Score Gamification, and Squad Splitting features can solve post-arrival financial anxiety and increase daily engagement.

## The Problem
While Evidence dominates the pre-departure lending market, there's a critical drop in engagement post-disbursal. Students land abroad with large sums of money but zero financial literacy in the new geography, leading to:
- **Wealth Shock:** Managing $50k+ loans with no budgeting experience
- **Credit Score Challenges:** Traditional banks ignore immigrants with no credit history
- **Daily Financial Anxiety:** Students struggle to budget their loan disbursement effectively

## The Solution: Evidence Orbit
A comprehensive post-arrival financial wellness suite featuring:
- **Smart Pacing:** Intelligent budgeting tools to ensure loan amounts last the entire semester
- **Credit Score Gamification:** Build a 750+ US Credit Score quickly through engaging, educational features
- **Squad Splitting:** Easy bill splitting for recurring expenses (rent, wifi, groceries) with roommates
- **Financial Literacy:** Educational content to understand US financial terminology and credit utilization

## Tech Stack
- **Frontend:** React 18 (TypeScript), Vite
- **Styling:** Tailwind CSS
- **Charts:** Chart.js, react-chartjs-2, Recharts
- **Component Library:** Radix UI, shadcn/ui
- **Routing:** React Router DOM
- **Forms:** React Hook Form, Zod validation
- **State Management:** TanStack Query

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AnishGuruvelli/evidence.git
   cd evidence
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

## Project Structure
```
evidence/
├── public/                # Static assets (images, favicon, etc.)
├── src/
│   ├── components/        # UI components (accordion, button, charts, etc.)
│   │   └── ui/            # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Main pages (Index, NotFound)
│   ├── App.tsx            # App root component
│   ├── content.json       # All product/case study content (editable)
│   └── main.tsx           # Entry point
├── index.html             # Main HTML template
├── tailwind.config.ts     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
├── package.json           # Project metadata and scripts
└── README.md              # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## Customization

- **Content:** All product copy, case study details, and chart data are in `src/content.json` for easy editing.
- **UI Components:** Modular components in `src/components/ui/` can be extended or replaced as needed.
- **Styling:** Tailwind CSS configuration can be customized in `tailwind.config.ts`.

## Deployment

The project can be deployed to any static hosting provider:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your hosting provider.

3. **GitHub Pages:** Use `npm run deploy` to deploy automatically.

Live demo: [https://anishguruvelli.github.io/evidence](https://anishguruvelli.github.io/evidence)

## Key Features Demonstrated

- **Product Strategy:** Comprehensive case study presentation
- **User Research:** Detailed user segments and goals analysis
- **Solution Design:** Feature prioritization and roadmap
- **Success Metrics:** Data-driven KPIs and measurement strategies
- **Modern UI/UX:** Professional, responsive design with interactive charts

## License
This project is for educational and demonstration purposes.

---

**Author:** Anish Guruvelli  
**GitHub:** [@AnishGuruvelli](https://github.com/AnishGuruvelli)  
**LinkedIn:** [anishguruvelli](https://www.linkedin.com/in/anishguruvelli/)
