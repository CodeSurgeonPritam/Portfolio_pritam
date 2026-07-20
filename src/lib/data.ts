/**
 * Single source of truth for portfolio content — built from Pritam's resume.
 * Edit here; every section reads from these typed structures.
 */

export const profile = {
  name: "Pritam Kumar",
  firstName: "Pritam",
  lastName: "Kumar",
  role: "Full Stack Developer",
  location: "India · Remote",
  tagline:
    "Full Stack Developer with 1+ year of US-startup experience in React, TypeScript, Node.js and Shopify — shipping production tools for 1,000+ users.",
  intro:
    "I build fast, reliable web products end-to-end — from reusable component systems and auth to Shopify-integrated dashboards and customer portals. Currently crafting production tooling that real teams and thousands of users rely on every day.",
  email: "pritamskumar4@gmail.com",
  phone: "+91-7079883979",
  resumeUrl: "/Pritam_Kumar_Resume.pdf",
  initials: "PK",
  /** Drop a square photo at public/profile.jpg and set this to "/profile.jpg". Empty → monogram. */
  photo: "",
} as const;

export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 1000, suffix: "+", label: "Active users served" },
  { value: 15, suffix: "+", label: "Reusable UI components" },
  { value: 10, suffix: "+", label: "Subscription workflows" },
  { value: 2, suffix: "", label: "Production products" },
];

export const skillGroups: { title: string; skills: string[] }[] = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python"],
  },
  {
    title: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "Responsive Design",
    ],
  },
  {
    title: "Backend & Auth",
    skills: [
      "Node.js",
      "Express.js",
      "REST API",
      "MongoDB",
      "SQL",
      "Google OAuth 2.0",
      "JWT",
      "RBAC",
      "Sessions",
    ],
  },
  {
    title: "Cloud & Tools",
    skills: [
      "DigitalOcean",
      "Vercel",
      "Git",
      "GitHub",
      "Postman",
      "Vite",
      "Figma",
      "Jest",
      "CI/CD",
    ],
  },
  {
    title: "AI & Dev Tools",
    skills: [
      "Prompt Engineering",
      "GitHub Copilot",
      "LLM API Integration",
      "AI Workflow Automation",
    ],
  },
  {
    title: "E-Commerce",
    skills: [
      "Shopify API",
      "Subscription Management",
      "Order Management",
    ],
  },
];

export type Project = {
  name: string;
  meta: string;
  status: "Live" | "In Progress";
  summary: string;
  highlights: string[];
  stack: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    name: "FullCircle Customer Experience Dashboard",
    meta: "Agent-facing enterprise dashboard",
    status: "Live",
    summary:
      "Agent-facing dashboard for managing users, orders and Shopify tickets — serving 1,000+ users across multi-panel enterprise workflows.",
    highlights: [
      "Built the agent dashboard for users, orders and Shopify support tickets at 1,000+ user scale.",
      "Developed 15+ reusable UI components and optimized state for multi-panel workflows.",
    ],
    stack: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS", "DigitalOcean"],
  },
  {
    name: "Customer Self-Service Portal",
    meta: "Subscription self-service for 1,000+ customers",
    status: "Live",
    summary:
      "Full-featured self-service portal letting 1,000+ customers independently manage subscriptions across addresses, payment methods and delivery frequencies.",
    highlights: [
      "Shipped 10+ subscription workflows — reactivate, skip, reschedule, swap, edit qty, consolidate, cancel.",
      "Built a real-time order-tracking dashboard: history, processing status and dues across concurrent orders.",
      "Integrated Shopify subscription & order APIs to sync live next-order dates, billing and product data.",
    ],
    stack: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Google OAuth"],
  },
  {
    name: "Nestmate",
    meta: "Roommate & rental platform · Web + Mobile",
    status: "Live",
    summary:
      "Full-stack roommate and rental platform across web and mobile, helping users discover compatible flatmates and shared accommodations.",
    highlights: [
      "Built across mobile apps and web to match flatmates and shared homes.",
      "Implemented secure auth and role-based access control for multiple user types.",
    ],
    stack: ["React", "React Native", "TypeScript", "Node.js", "MongoDB", "REST APIs"],
  },
];

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "FullCircle Technologies Inc.",
    location: "San Francisco, CA · Remote",
    period: "Nov 2024 — Apr 2026",
    bullets: [
      "Engineered a reusable React + TypeScript component library (dashboards, modals, panels) adopted across 2 production products, significantly reducing UI development time.",
      "Architected Google OAuth 2.0 + RBAC authentication for controlled multi-user access across internal workflows.",
      "Built Shopify-integrated support tools for user, order and ticket management — impacting 1,000+ active users.",
      "Integrated REST APIs for real-time customer, order and subscription data in production dashboards.",
      "Delivered full-stack features end-to-end following clean-code standards, Git workflows and agile sprints.",
    ],
  },
];

export const education = {
  degree: "B.Tech — Computer Science (AI & ML)",
  school: "Lakshmi Narain College of Technology, Bhopal",
  period: "Oct 2022 — Jun 2025",
  score: "CGPA 7.77 / 10",
};

export type Social = {
  label: string;
  href: string;
  handle: string;
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/", handle: "GitHub" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", handle: "LinkedIn" },
  { label: "Email", href: "mailto:pritamskumar4@gmail.com", handle: "pritamskumar4@gmail.com" },
];

export const navLinks: { label: string; href: string }[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
