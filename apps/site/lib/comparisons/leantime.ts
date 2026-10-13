import type { Comparison } from "./types";

export const leantime: Comparison = {
  slug: "leantime",
  competitor: "Leantime",
  category: "open-source",
  title: "Leantime alternative",
  description:
    "JacChart is an MIT-licensed Leantime alternative focused on shipping work: boards, backlog, workflows, and time tracking, self-hosted for free.",
  summary: "The tracker underneath, without the goals and strategy layer.",
  heading: "The MIT-licensed Leantime alternative",
  subheading:
    "Leantime wraps goals, research boards, and strategy around your tasks. JacChart is the tracker underneath, without the strategy layer, and it is MIT licensed.",
  verdict:
    "JacChart and Leantime are both open-source and self-hostable. Leantime is AGPLv3, aimed at non-project-managers, and layers goals, ideas, and retrospectives on top of task management. JacChart is MIT licensed and stays a focused tracker with boards, backlog, workflow rules, roles, and time tracking.",
  facts: {
    license: "MIT, versus AGPLv3 for the Leantime community edition",
    hosting:
      "Both self-host. JacChart is Docker plus PostgreSQL, Leantime is PHP plus MySQL",
    sso: "Free on every JacChart build",
    pricing: "$0 self-hosted for both, JacChart Cloud from $4 / month",
  },
  rows: [
    { feature: "License", "jac-chart": "MIT", them: "AGPLv3" },
    { feature: "Self-hostable", "jac-chart": true, them: true },
    { feature: "Free to self-host", "jac-chart": true, them: true },
    { feature: "Goals & strategy boards", "jac-chart": false, them: true },
    { feature: "Backlog planning", "jac-chart": true, them: true },
    { feature: "Time tracking", "jac-chart": true, them: true },
    { feature: "Stack", "jac-chart": "Node + PostgreSQL", them: "PHP + MySQL" },
    { feature: "Cloud pricing", "jac-chart": "From $4/mo", them: "Per user" },
  ],
  reasons: [
    {
      title: "A tracker, not a framework",
      body: "Leantime asks you to define goals, ideas, and research before the work. JacChart assumes you know what needs doing and want somewhere to do it.",
    },
    {
      title: "Permissive licence",
      body: "MIT rather than AGPLv3, so forking JacChart or building a product around it stays simple.",
    },
    {
      title: "Modern stack, small footprint",
      body: "JacChart is one container plus PostgreSQL with realtime board updates, an official Helm chart, and a documented public API.",
    },
  ],
  honestNote:
    "Leantime is thoughtfully designed for people who do not think in tickets, and it was built with ADHD, autism, and dyslexia explicitly in mind. Its goals, ideas, and retrospective boards give small teams a structure JacChart simply does not have. If that framing is what your team needs, Leantime is the better tool.",
  faq: [
    {
      question: "Is Leantime free?",
      answer:
        "The self-hosted community edition is free and open source under AGPLv3, and matches the features of the hosted Core plan. Leantime's cloud is priced per user.",
    },
    {
      question: "Leantime or JacChart?",
      answer:
        "Leantime if you want goal setting, idea boards, and retrospectives around your tasks. JacChart if you want a fast board and backlog with roles, time tracking, and integrations, under a permissive licence.",
    },
    {
      question: "What does JacChart run on?",
      answer:
        "A single container running the Hono API and React front end, plus PostgreSQL. Redis is optional and only needed to coordinate realtime delivery across several API instances.",
    },
    {
      question: "Does JacChart have retrospectives or goal tracking?",
      answer:
        "No. JacChart has projects, boards, backlog, labels, priorities, task relations, comments, and time entries. Goals and retrospectives are outside its scope by design.",
    },
  ],
  related: ["openproject", "basecamp", "vikunja", "monday"],
  verifiedOn: "2026-08-19",
  sources: [
    { label: "Leantime pricing", href: "https://leantime.io/pricing/" },
    { label: "JacChart pricing", href: "/pricing" },
  ],
};
