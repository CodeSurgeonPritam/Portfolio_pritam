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
  photo: "/image.png",
} as const;

export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 1000, suffix: "+", label: "Active users served" },
  { value: 15, suffix: "+", label: "Reusable UI components" },
  { value: 10, suffix: "+", label: "Subscription workflows" },
  { value: 2, suffix: "", label: "Production products" },
];

export interface SkillSubGroup {
  label: string;
  skills: string[];
}

export interface SkillGroup {
  title: string;
  subGroups: SkillSubGroup[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming Languages",
    subGroups: [
      {
        label: "Core",
        skills: [
          "TypeScript",
          "JavaScript (ES6+)",
          "Python",
          "SQL",
        ],
      },
    ],
  },

  {
    title: "Frontend Engineering",
    subGroups: [
      {
        label: "Frameworks",
        skills: [
          "React.js",
          "Next.js",
          "React Router",
        ],
      },
      {
        label: "UI Development",
        skills: [
          "Tailwind CSS",
          "Responsive Design",
          "Accessibility (a11y)",
          "Component Architecture",
        ],
      },
      {
        label: "Client State",
        skills: [
          "Redux Toolkit",
          "Zustand",
          "Context API",
        ],
      },
      {
        label: "Server State",
        skills: [
          "TanStack Query",
          "Query Client",
          "Caching",
          "Query Invalidation",
          "Data Fetching",
        ],
      },
      {
        label: "Forms & Validation",
        skills: [
          "React Hook Form",
          "Zod",
        ],
      },
      {
        label: "Networking",
        skills: [
          "Axios",
        ],
      },
      {
        label: "Performance",
        skills: [
          "Code Splitting",
          "Lazy Loading",
          "Performance Optimization",
        ],
      },
    ],
  },

  {
    title: "Backend Engineering",
    subGroups: [
      {
        label: "Runtime",
        skills: [
          "Node.js",
          "Express.js",
          "FastAPI",
        ],
      },
      {
        label: "API Development",
        skills: [
          "REST APIs",
          "API Design",
          "Swagger/OpenAPI",
          "Webhook Integration",
          "Third-party API Integration",
        ],
      },
      {
        label: "Authentication",
        skills: [
          "Google OAuth 2.0",
          "JWT Authentication",
          "Role-Based Access Control (RBAC)",
          "Session Management",
        ],
      },
      {
        label: "Server Engineering",
        skills: [
          "Middleware",
          "Request Validation",
          "Error Handling",
        ],
      },
    ],
  },

  {
    title: "Database",
    subGroups: [
      {
        label: "NoSQL",
        skills: [
          "MongoDB",
          "Data Modeling",
          "Aggregation Pipelines",
        ],
      },
      {
        label: "Relational",
        skills: [
          "SQL",
          "Joins",
          "Indexing",
        ],
      },
      {
        label: "Optimization",
        skills: [
          "Query Optimization",
          "Schema Design",
        ],
      },
    ],
  },

  {
    title: "E-commerce & SaaS",
    subGroups: [
      {
        label: "Shopify",
        skills: [
          "Admin API",
          "Customer API",
          "Webhooks",
        ],
      },
      {
        label: "Business Workflows",
        skills: [
          "Subscription Management",
          "Order Management",
          "Customer Portal",
          "Payment Workflows",
        ],
      },
      {
        label: "Integrations",
        skills: [
          "REST Integrations",
          "Third-party APIs",
        ],
      },
    ],
  },

  {
    title: "Mobile Development",
    subGroups: [
      {
        label: "Cross-platform",
        skills: [
          "React Native",
          "Expo",
          "Cross-platform Development",
          "Native Device APIs",
        ],
      },
    ],
  },

  {
    title: "Cloud & DevOps",
    subGroups: [
      {
        label: "Deployment",
        skills: [
          "Vercel",
          "DigitalOcean",
        ],
      },
      {
        label: "CI/CD",
        skills: [
          "GitHub Actions",
          "Deployment Pipelines",
        ],
      },
      {
        label: "Version Control",
        skills: [
          "Git",
          "GitHub",
        ],
      },
      {
        label: "Package Management",
        skills: [
          "npm",
          "pnpm",
        ],
      },
    ],
  },

  {
    title: "Developer Tools",
    subGroups: [
      {
        label: "Development",
        skills: [
          "Vite",
          "Postman",
          "Figma",
        ],
      },
      {
        label: "Testing",
        skills: [
          "Jest",
          "Debugging",
        ],
      },
      {
        label: "Code Quality",
        skills: [
          "ESLint",
          "Prettier",
        ],
      },
    ],
  },

  {
    title: "Real-time Systems",
    subGroups: [
      {
        label: "Messaging",
        skills: [
          "Socket.IO",
          "Redis",
          "BullMQ",
        ],
      },
      {
        label: "Processing",
        skills: [
          "Background Jobs",
          "Queue Management",
        ],
      },
    ],
  },

  {
    title: "AI Engineering",
    subGroups: [
      {
        label: "LLMs",
        skills: [
          "OpenAI API",
          "LLM Integration",
        ],
      },
      {
        label: "AI Development",
        skills: [
          "Prompt Engineering",
          "AI Workflow Automation",
        ],
      },
      {
        label: "AI Productivity",
        skills: [
          "GitHub Copilot",
          "Cursor AI",
        ],
      },
    ],
  },

  {
    title: "Engineering Practices",
    subGroups: [
      {
        label: "Architecture",
        skills: [
          "Clean Architecture",
          "Feature-Based Architecture",
          "Component-Driven Development",
          "Reusable Component Design",
          "Scalable Frontend Architecture",
        ],
      },
      {
        label: "Performance",
        skills: [
          "Performance Optimization",
          "Code Splitting",
          "Lazy Loading",
        ],
      },
      {
        label: "Quality",
        skills: [
          "Code Reviews",
          "Technical Documentation",
          "Debugging",
        ],
      },
      {
        label: "Collaboration",
        skills: [
          "Git Workflow",
          "Agile Development",
          "Sprint Planning",
        ],
      },
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
  {
    label: "GitHub",
    href: "https://github.com/CodeSurgeonPritam/",
    handle: "@CodeSurgeonPritam",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pritammkumar/",
    handle: "@pritammkumar",
  },
  { label: "Email", href: "mailto:pritamskumar4@gmail.com", handle: "pritamskumar4@gmail.com" },
];

export const navLinks: { label: string; href: string }[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
