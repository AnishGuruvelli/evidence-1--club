import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  DoughnutController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import content from '../content.json';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  DoughnutController,
  BarController
);

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeJourney, setActiveJourney] = useState('health');
  const [countersAnimated, setCountersAnimated] = useState(false);
  const routeRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleNavClick1 = (e) => {
    e.preventDefault();
    routeRefs.current['overview']?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    // Animate counters on scroll
    const animateCounter = (el: HTMLElement) => {
      const target = parseInt(el.dataset.target || '0');
      el.innerText = '0';
      const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / target));
      let current = 0;
      const timer = setInterval(() => {
        current += 1;
        el.innerText = current + '%';
        if (current == target) {
          clearInterval(timer);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          const counters = document.querySelectorAll('.stat-counter');
          counters.forEach(counter => animateCounter(counter as HTMLElement));
          setCountersAnimated(true);
        }
      });
    }, { threshold: 0.5 });

    const opportunitySection = document.getElementById('opportunity');
    if (opportunitySection) {
      observer.observe(opportunitySection);
    }

    // Navigation active state
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const linkElement = link as HTMLElement;
            const href = linkElement.getAttribute('href');
            if (href === `#${id}`) {
              linkElement.classList.add('active');
            } else {
              linkElement.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => sectionObserver.observe(section));

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, [countersAnimated]);

  const handleJourneyTab = (journeyId: string) => {
    setActiveJourney(journeyId);
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const sectionId = href.slice(1);
      routeRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const clientPreferences = content.clientPreferences;
  const demandChartData = {
    labels: clientPreferences.labels,
    datasets: [{
      label: 'Client Preferences',
      data: clientPreferences.values,
      backgroundColor: ['#00D1FF', '#6366F1'],
      borderColor: ['#0F172A'],
      borderWidth: 3,
      hoverOffset: 8
    }]
  };
  const demandChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    animation: {
      animateRotate: true,
      duration: 1200
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#E2E8F0',
          font: { size: 14 },
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#E2E8F0',
        bodyColor: '#E2E8F0',
        borderColor: '#6366F1',
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const value = context.raw;
            const percent = ((value / total) * 100).toFixed(0);
            return `${context.label}: ${percent}%`;
          }
        }
      },
      datalabels: {
        display: true,
        color: '#E2E8F0',
        font: { weight: 'bold', size: 18 },
        formatter: (value: number, ctx: any) => {
          const total = ctx.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
          return `${Math.round((value / total) * 100)}%`;
        }
      }
    }
  };

  const riceChartData = {
    labels: content.featurePrioritization.slice(0, 5).map(f => f.title.split(' ').slice(1).join(' ')),
    datasets: [
      {
        label: 'RICE Score',
        data: [92, 88, 85, 82, 75],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(192, 132, 252, 0.8)',
          'rgba(221, 214, 254, 0.8)'
        ],
        borderColor: [
          '#6366F1',
          '#8B5CF6',
          '#A855F7',
          '#C084FC',
          '#DDD6FE'
        ],
        borderWidth: 2,
        borderRadius: 6,
      }
    ]
  };

  const riceChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#E2E8F0',
        bodyColor: '#E2E8F0',
        borderColor: '#6366F1',
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            return `RICE Score: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#94A3B8',
          font: { size: 12 }
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#94A3B8',
          font: { size: 11 }
        },
        grid: {
          display: false
        }
      }
    }
  };

  // Dark mode color map
  const colorMap: { [key: string]: { border: string; text: string; bg: string; textBg: string; italic: string } } = {
    green: {
      border: "border-emerald-400",
      text: "text-emerald-300",
      bg: "bg-emerald-500/10",
      textBg: "text-emerald-200",
      italic: "text-emerald-400"
    },
    blue: {
      border: "border-cyan-400",
      text: "text-cyan-300",
      bg: "bg-cyan-500/10",
      textBg: "text-cyan-200",
      italic: "text-cyan-400"
    },
    cyan: {
      border: "border-cyan-400",
      text: "text-cyan-300",
      bg: "bg-cyan-500/10",
      textBg: "text-cyan-200",
      italic: "text-cyan-400"
    },
    pink: {
      border: "border-pink-400",
      text: "text-pink-300",
      bg: "bg-pink-500/10",
      textBg: "text-pink-200",
      italic: "text-pink-400"
    },
    yellow: {
      border: "border-amber-400",
      text: "text-amber-300",
      bg: "bg-amber-500/10",
      textBg: "text-amber-200",
      italic: "text-amber-400"
    },
    amber: {
      border: "border-amber-400",
      text: "text-amber-300",
      bg: "bg-amber-500/10",
      textBg: "text-amber-200",
      italic: "text-amber-400"
    },
    purple: {
      border: "border-purple-400",
      text: "text-purple-300",
      bg: "bg-purple-500/10",
      textBg: "text-purple-200",
      italic: "text-purple-400"
    },
    emerald: {
      border: "border-emerald-400",
      text: "text-emerald-300",
      bg: "bg-emerald-500/10",
      textBg: "text-emerald-200",
      italic: "text-emerald-400"
    }
  };

  const [heroLine1, heroLine2] = content.hero.subheadline
    .split('|')
    .map((part: string) => part.trim());

  const loopParagraphs = (content.pmSection.body as string).split('\n\n');

  return (
    <div className="bg-slate-950 text-slate-100 font-inter min-h-screen">
      <style dangerouslySetInnerHTML={{
        __html: `
          .chart-container { 
            position: relative; 
            width: 100%; 
            max-width: 400px; 
            margin-left: auto; 
            margin-right: auto; 
            height: 300px; 
            max-height: 400px; 
          }
          @media (min-width: 640px) { 
            .chart-container { height: 350px; } 
          }
          .rice-chart-container { 
            position: relative; 
            width: 100%; 
            height: 400px; 
            max-height: 500px; 
          }
          .nav-link {
            position: relative;
            transition: all 0.3s;
          }
          .nav-link::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, #6366F1, #8B5CF6);
            border-radius: 2px;
            transform: scaleX(0);
            transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
            z-index: 1;
          }
          .nav-link:hover::after, .nav-link.active::after {
            transform: scaleX(1);
          }
          .nav-link:hover {
            color: #E2E8F0;
          }
          .nav-link.active {
            color: #E2E8F0;
          }
          .phase-card::before { 
            content: ''; 
            position: absolute; 
            top: 50%; 
            left: -2.05rem; 
            transform: translateY(-50%); 
            width: 1.25rem; 
            height: 1.25rem; 
            background-color: #1E293B; 
            border: 4px solid #6366F1; 
            border-radius: 9999px; 
            z-index: 10; 
            box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
          }
          .timeline::before { 
            content: ''; 
            position: absolute; 
            top: 0; 
            bottom: 0; 
            left: 1rem; 
            transform: translateX(-50%); 
            width: 2px; 
            background: linear-gradient(180deg, #6366F1, #8B5CF6);
            border-radius: 2px; 
          }
          .glow-card {
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.1), 0 0 40px rgba(99, 102, 241, 0.05);
          }
          .glow-card:hover {
            box-shadow: 0 0 30px rgba(99, 102, 241, 0.2), 0 0 60px rgba(99, 102, 241, 0.1);
            transform: translateY(-2px);
            transition: all 0.3s ease;
          }
        `
      }} />

      <header id="top" className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-slate-900/50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{content.siteTitle}</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <div className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick1}>Overview</div>
                <a href="#problem" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>The Problem</a>
                <a href="#solution" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>Solution</a>
                <a href="#prioritization" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>Prioritization</a>
                <a href="#roadmap" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>Roadmap</a>
                <a href="#success-metrics" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>Metrics</a>
                <a href="#next-steps" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>Go-to-Market</a>
                <a href="#evolution" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>Evolution</a>
                <a href="#about-me" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>About Me</a>
              </div>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 focus:outline-none"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
        <div className={`md:hidden ${mobileMenuOpen ? '' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900 border-t border-slate-800">
            <a href="#overview" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>Overview</a>
            <a href="#problem" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>The Problem</a>
            <a href="#solution" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>Solution</a>
            <a href="#prioritization" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>Prioritization</a>
            <a href="#roadmap" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>Roadmap</a>
            <a href="#success-metrics" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>Metrics</a>
            <a href="#next-steps" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>Go-to-Market</a>
            <a href="#evolution" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>Evolution</a>
            <a href="#about-me" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-slate-200" onClick={handleNavClick}>About Me</a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <section className="text-center pt-8 pb-16">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-semibold mb-4">
              {content.hero.tagline}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {content.hero.headline}
            </span>
          </h1>
          <p className="mt-4 max-w-4xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed">
            {heroLine1}
          </p>
          <p className="mt-2 max-w-4xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed">
            {heroLine2}
          </p>
        </section>

        {/* Hero Secondary Section: Problem & Loop */}
        <section className="py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl glow-card border border-slate-700/50 mb-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid gap-8 md:grid-cols-2 items-stretch">
              {/* Problem Statements / PRD Card */}
              <div className="bg-slate-900/70 border border-slate-700/70 rounded-2xl p-8 flex flex-col justify-between text-left">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    Context of the Problem
                  </h2>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                    Professional networking hasn&apos;t evolved in years. LinkedIn feels formal and disconnected from how Gen Z actually builds
                    careers—through projects, side hustles, and collaborations.
                  </p>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                    Imagine designing a next-gen network for 18–25 year olds in design, content, startups, and engineering—and owning the 0→1
                    product strategy.
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href="https://believed-breadfruit-1b2.notion.site/Evidence-Product-Requirements-Document-PRD-2fdbc8afb250801c8d10f2e870ca6dc3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
                  >
                    Explore the PRD →
                  </a>
                </div>
              </div>

              {/* The Complete Loop Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/70 rounded-2xl p-8 flex flex-col items-start text-left">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  {content.pmSection.title}
                </h2>
                {loopParagraphs.map((para, index) => (
                  <p
                    key={index}
                    className={`text-sm md:text-base text-slate-300 leading-relaxed max-w-xl ${
                      index === 0 ? 'mb-4' : index === loopParagraphs.length - 1 ? 'mb-8' : 'mb-4'
                    }`}
                  >
                    {para}
                  </p>
                ))}
                <a
                  href="https://anishg-1-club.lovable.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
                >
                  {content.pmSection.cta}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* What is Evidence */}
        <section id="overview" ref={el => (routeRefs.current['overview'] = el)} className="py-16 bg-slate-900/50 rounded-3xl shadow-xl glow-card border border-slate-800/50 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-cyan-400 tracking-wide uppercase mb-2">{content.about.sectionTitle}</h2>
              <p className="mt-2 text-4xl font-extrabold text-slate-100 tracking-tight sm:text-5xl">{content.about.title}</p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">{content.about.aboutTitle}</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  {content.about.aboutBody}
                </p>
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-cyan-400">{content.about.goal.split('?')[0]}?</strong> {content.about.goal.replace('The goal? ', '')}
                </p>
              </div>
              <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50">
                <h3 className="text-2xl font-bold text-purple-300 mb-4">{content.about.industryTitle}</h3>
                <ul className="space-y-3 text-slate-300 mb-6">
                  {content.about.industryBullets.map((bullet, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20">
                  <p className="text-sm text-cyan-200 font-medium">
                    {content.about.mission}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Needs */}
        <section className="py-16 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-cyan-400 tracking-wide uppercase mb-2">2️⃣ & 3️⃣ Customer Identification & Goals</h2>
            <p className="mt-2 text-4xl font-extrabold text-slate-100 tracking-tight sm:text-5xl">Understanding Our Users</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-slate-900/50 p-6 sm:p-8 rounded-2xl shadow-xl glow-card border border-slate-700/50 mb-6 md:mb-0 w-full md:w-3/5">
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-4">User Segments</h3>
              <ul className="ml-4 list-disc text-slate-300 mb-6 space-y-2">
                {content.userSegments.map((segment, index) => (
                  <li key={index}>{segment}</li>
                ))}
              </ul>
              <h3 className="text-xl sm:text-2xl font-bold text-purple-300 mb-4">User Goals</h3>
              <ul className="ml-4 list-disc text-slate-300 mb-6 space-y-2">
                {content.userGoals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
              <h3 className="text-xl sm:text-2xl font-bold text-pink-300 mb-4">Our Business Focus</h3>
              <ul className="ml-4 list-disc text-slate-300 space-y-2">
                {content.businessFocus.map((focus, index) => (
                  <li key={index}>{focus}</li>
                ))}
              </ul>
            </div>
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-700/50 flex flex-col items-center justify-center w-full md:w-2/5">
              <h3 className="text-center text-xl sm:text-2xl font-semibold text-slate-100 mb-2">Client Preferences</h3>
              <p className="text-center text-slate-400 mb-6 text-base">{content.clientPreferences.description}</p>
              <div className="w-full max-w-xs sm:max-w-md md:max-w-full chart-container">
                <Chart type="doughnut" data={demandChartData} options={demandChartOptions} />
              </div>
            </div>
          </div>
        </section>

        {/* Problem Framing */}
        <section id="problem" ref={el => (routeRefs.current['problem'] = el)} className="py-16 bg-slate-900/50 rounded-3xl shadow-xl glow-card border border-slate-800/50 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-cyan-400 tracking-wide uppercase mb-2">4️⃣ Cut (Prioritize) – Problem Framing</h2>
              <p className="mt-2 text-4xl font-extrabold text-slate-100 tracking-tight sm:text-5xl mb-8">Top Pain Points</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.topPainPoints.map((point, index) => {
                const isOdd = content.topPainPoints.length % 2 === 1;
                const isLast = index === content.topPainPoints.length - 1;
                const colorOrder = ['cyan', 'purple', 'pink', 'amber', 'emerald'];
                const color = colorOrder[index % colorOrder.length];
                const c = colorMap[color] || colorMap.cyan;
                return (
                  <div
                    key={index}
                    className={`
                      bg-slate-800/50 shadow-xl rounded-2xl p-6 border-l-4 ${c.border} glow-card
                      hover:border-opacity-100 transition-all
                      ${isOdd && isLast ? 'md:col-span-2 md:max-w-2xl md:mx-auto' : ''}
                    `}
                  >
                    <h3 className={`text-lg font-bold ${c.text} mb-3 flex items-center`}>
                      <span className="text-2xl mr-3">{point.emoji}</span>
                      {point.title}
                    </h3>
                    <p className="text-slate-300 mb-3">
                      <span className="font-semibold text-slate-200">Problem:</span> {point.problem}
                    </p>
                    <p className={`italic ${c.italic} text-sm`}>Friction: {point.friction}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section id="solution" ref={el => (routeRefs.current['solution'] = el)} className="py-16 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-cyan-400 tracking-wide uppercase mb-2">5️⃣ Proposed Solutions</h2>
            <p className="mt-2 text-4xl font-extrabold text-slate-100 tracking-tight sm:text-5xl">How {content.hero.headline} Solves These Pain Points</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.proposedSolutions.map((solution, index) => {
              const colorOrder = ['cyan', 'purple', 'pink', 'amber'];
              const color = colorOrder[index % colorOrder.length];
              const c = colorMap[color] || colorMap.cyan;
              return (
                <div
                  key={index}
                  className={`bg-slate-900/50 shadow-xl rounded-2xl p-6 border-l-4 ${c.border} glow-card hover:border-opacity-100 transition-all`}
                >
                  <h3 className={`text-lg font-bold ${c.text} mb-3 flex items-center`}>
                    <span className="text-2xl mr-3">{solution.emoji}</span>
                    {solution.title}
                  </h3>
                  <div className="mb-3">
                    <span className={`font-semibold ${c.text}`}>Solution:</span>
                    <span className="text-slate-300 ml-2">{solution.solution}</span>
                  </div>
                  <div className="mb-3 text-slate-300">
                    <span className="font-semibold text-slate-200">What It Does:</span> {solution.whatItDoes}
                  </div>
                  <div className="mb-3 text-slate-300">
                    <span className="font-semibold text-slate-200">Why It Helps:</span> {solution.whyItHelps}
                  </div>
                  <div className={`${c.bg} rounded-lg p-4 mt-4 ${c.textBg} text-sm italic border ${c.border} border-opacity-30`}>
                    {solution.example}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* RICE Prioritization */}
        <section id="prioritization" ref={el => (routeRefs.current['prioritization'] = el)} className="py-16 bg-slate-900/50 rounded-3xl shadow-xl glow-card border border-slate-800/50 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-cyan-400 tracking-wide uppercase mb-2">6️⃣ Evaluate Trade-offs (RICE Framework)</h2>
              <p className="mt-2 text-4xl font-extrabold text-slate-100 tracking-tight sm:text-5xl">Feature Prioritization</p>
            </div>
            <div className="mt-12">
              <div className="rice-chart-container mb-8 bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <Chart type="bar" data={riceChartData} options={riceChartOptions} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.featurePrioritization.map((feature, index) => (
                  <div key={index} className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50 glow-card">
                    <h4 className="font-semibold text-purple-300 mb-2">{feature.title}</h4>
                    <p className="text-slate-300 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" ref={el => (routeRefs.current['roadmap'] = el)} className="py-16 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-cyan-400 tracking-wide uppercase mb-2">{content.finalRecommendation.title}</h2>
            <p className="mt-2 text-4xl font-extrabold text-slate-100 tracking-tight sm:text-5xl">{content.finalRecommendation.subtitle}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative pl-12 timeline">
              {/* Phase 1: 0–3 months */}
              <div className="mb-10 relative">
                <div className="phase-card bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 p-6 rounded-xl shadow-xl border-l-4 border-emerald-400 glow-card">
                  <p className="text-sm font-semibold text-emerald-300 mb-2">🔹 Phase 1: Foundation (0–3 months)</p>
                  <h4 className="font-bold text-lg mt-1 text-slate-100 mb-3">Launch & Proof-of-Work Supply</h4>
                  <ul className="mt-2 text-slate-300 space-y-1 text-sm">
                    {content.finalRecommendation.phase0to3.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-emerald-400 mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Phase 2: 3–6 months */}
              <div className="mb-10 relative">
                <div className="phase-card bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 p-6 rounded-xl shadow-xl border-l-4 border-cyan-400 glow-card">
                  <p className="text-sm font-semibold text-cyan-300 mb-2">🔹 Phase 2: Growth Loops (3–6 months)</p>
                  <h4 className="font-bold text-lg mt-1 text-slate-100 mb-3">Engagement & Distribution Flywheels</h4>
                  <ul className="mt-2 text-slate-300 space-y-1 text-sm">
                    {content.finalRecommendation.phase3to6.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-cyan-400 mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Phase 3: 6–12 months */}
              <div className="relative">
                <div className="phase-card bg-gradient-to-br from-amber-900/30 to-amber-800/20 p-6 rounded-xl shadow-xl border-l-4 border-amber-400 glow-card">
                  <p className="text-sm font-semibold text-amber-300 mb-2">🔹 Phase 3: Scale (6–12 months)</p>
                  <h4 className="font-bold text-lg mt-1 text-slate-100 mb-3">AI-Driven Personalization & Placement Acceleration</h4>
                  <ul className="mt-2 text-slate-300 space-y-1 text-sm">
                    {content.finalRecommendation.phase6to12.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-amber-400 mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section id="success-metrics" ref={el => (routeRefs.current['success-metrics'] = el)} className="py-16 bg-slate-900/50 rounded-3xl shadow-xl glow-card border border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-cyan-400 tracking-wide uppercase mb-2">3️⃣ METRICS & SUCCESS</h2>
              <p className="mt-2 text-4xl font-extrabold text-slate-100 tracking-tight sm:text-5xl">Measuring Our Success</p>
            </div>

            {/* North Star Metric */}
            <div className="mb-12 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 p-8 rounded-2xl border border-cyan-500/30 glow-card">
              <h3 className="text-2xl font-bold text-cyan-300 mb-4">{content.successMetrics.northStar.title}</h3>
              <div className="text-3xl font-extrabold text-cyan-400 mb-4">{content.successMetrics.northStar.metric}</div>
              <p className="text-slate-300 mb-4 leading-relaxed">{content.successMetrics.northStar.description}</p>
              <p className="text-slate-200 font-medium">{content.successMetrics.northStar.whyItMatters}</p>
            </div>

            {/* Supporting Metrics */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-purple-300 mb-6 text-center">3 Supporting Metrics</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {content.successMetrics.supportingMetrics.map((metric, index) => (
                  <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 glow-card">
                    <h4 className="text-lg font-semibold text-cyan-300 mb-3">{metric.title}</h4>
                    <p className="text-slate-300 text-sm mb-4">{metric.description}</p>
                    <div className="border-t border-slate-700 pt-4 mt-4">
                      <p className="text-xs text-slate-400 mb-2 font-semibold">Business Link:</p>
                      <p className="text-slate-300 text-xs mb-3">{metric.businessLink}</p>
                      <p className="text-xs text-slate-400 mb-2 font-semibold">User Link:</p>
                      <p className="text-slate-300 text-xs">{metric.userLink}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Post-Launch Success Checks */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-semibold text-amber-300 mb-4">{content.successMetrics.postLaunchSuccess.title}</h3>
              <ul className="text-slate-300 space-y-2">
                {content.successMetrics.postLaunchSuccess.checks.map((check, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-amber-400 mr-2">✓</span>
                    <span>{check}</span>
                  </li>
                    ))}
                  </ul>
            </div>
          </div>
        </section>

        {/* Go-to-Market */}
        <section id="next-steps" ref={el => (routeRefs.current['next-steps'] = el)} className="py-16 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-cyan-400 tracking-wide uppercase mb-2">4️⃣ GO-TO-MARKET</h2>
              <p className="mt-2 text-4xl font-extrabold text-slate-100 tracking-tight sm:text-5xl mb-10">Reaching First 10,000 Users</p>
            </div>

            {/* Launch Thesis */}
            <div className="mb-12 bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-8 rounded-2xl border border-purple-500/30 glow-card">
              <h3 className="text-2xl font-bold text-purple-300 mb-3">{content.goToMarket.launchThesis.title}</h3>
              <p className="text-2xl font-extrabold text-purple-400 mb-4 italic">"{content.goToMarket.launchThesis.tagline}"</p>
              <p className="text-slate-300 leading-relaxed">{content.goToMarket.launchThesis.description}</p>
            </div>

            {/* First 10K Users Channels */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-cyan-300 mb-6">{content.goToMarket.first10KUsers.title}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {content.goToMarket.first10KUsers.channels.map((channel, index) => (
                  <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 glow-card">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold text-cyan-300">{channel.channel}</h4>
                      <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded">{channel.timeline}</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{channel.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Distribution Loops */}
            <div>
              <h3 className="text-xl font-bold text-purple-300 mb-6">{content.goToMarket.distributionLoops.title}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {content.goToMarket.distributionLoops.loops.map((loop, index) => (
                  <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 glow-card">
                    <h4 className="text-lg font-semibold text-purple-300 mb-3">{loop.name}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{loop.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product Evolution & Monetization */}
        <section id="evolution" ref={el => (routeRefs.current['evolution'] = el)} className="py-16 bg-slate-900/50 rounded-3xl shadow-xl glow-card border border-slate-800/50 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-cyan-400 tracking-wide uppercase mb-2">5️⃣ PRODUCT EVOLUTION & MONETIZATION</h2>
              <p className="mt-2 text-4xl font-extrabold text-slate-100 tracking-tight sm:text-5xl">6–12 Month Roadmap</p>
            </div>

            {/* V2 Features */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-cyan-300 mb-6">{content.productEvolution.v2.title}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {content.productEvolution.v2.features.map((feature, index) => (
                  <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 glow-card">
                    <h4 className="text-lg font-semibold text-cyan-300 mb-3">{feature.feature}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* V3 Features */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-purple-300 mb-6">{content.productEvolution.v3.title}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {content.productEvolution.v3.features.map((feature, index) => (
                  <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 glow-card">
                    <h4 className="text-lg font-semibold text-purple-300 mb-3">{feature.feature}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Monetization Pathway */}
            <div className="bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 p-8 rounded-2xl border border-emerald-500/30 glow-card">
              <h3 className="text-2xl font-bold text-emerald-300 mb-3">{content.monetizationPathway.title}</h3>
              <p className="text-xl font-semibold text-emerald-400 mb-6 italic">"{content.monetizationPathway.principle}"</p>
              <div className="space-y-6 mb-6">
                {content.monetizationPathway.strategies.map((strategy, index) => (
                  <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                    <h4 className="text-lg font-semibold text-emerald-300 mb-2">{strategy.strategy}</h4>
                    <p className="text-slate-300 text-sm mb-3 leading-relaxed">{strategy.description}</p>
                    <p className="text-xs text-emerald-400 font-medium">UX Impact: {strategy.uxImpact}</p>
                </div>
              ))}
              </div>
              <div className="border-t border-slate-700 pt-6 mt-6">
                <p className="text-slate-300 text-sm">
                  <span className="font-semibold text-emerald-300">Revenue Projection:</span> {content.monetizationPathway.revenueProjection}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Me */}
        <section id="about-me" ref={el => (routeRefs.current['about-me'] = el)} className="py-24 bg-slate-900/50 rounded-3xl shadow-xl glow-card border border-slate-800/50">
          <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="flex-shrink-0 flex justify-center w-full md:w-auto mb-10 md:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-50"></div>
                <img src="/anishguruvelli.jpg" alt="Anish Guruvelli Professional" className="relative w-56 h-56 rounded-full object-cover shadow-2xl border-4 border-slate-700" />
              </div>
            </div>
            <div className="flex-1 w-full">
              <h2 className="text-4xl font-extrabold text-slate-100 mb-4">About Me</h2>
              <p className="text-xl text-cyan-300 mb-3 font-semibold">Currently Agentic AI SPA @ Unifyapps</p>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {content.aboutMeDescription}
              </p>
              <h3 className="text-2xl font-bold text-purple-300 mb-4">Key Skills Highlight</h3>
              <ul className="space-y-4 mb-8 text-slate-300 text-base md:text-lg">
                {content.keySkills.map((skill, index) => (
                  <li key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <span className="font-bold text-cyan-300">{skill.title}</span>
                    <br />
                    <span className="text-slate-300">{skill.description}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a href={content.linkedinUrl} target="_blank" rel="noopener noreferrer" className="px-7 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 text-center">🔗 Connect on LinkedIn</a>
                <a href={content.resumeUrl} target="_blank" rel="noopener noreferrer" className="px-7 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 text-center">📄 View My Resume</a>
                <a href={content.chitxUrl} target="_blank" rel="noopener noreferrer" className="px-7 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 text-center">📱 Download ChitX</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
