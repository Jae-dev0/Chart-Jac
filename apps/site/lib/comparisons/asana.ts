import type { Comparison } from "./types";

export const asana: Comparison = {
  slug: "asana",
  competitor: "Asana",
  category: "saas",
  title: "Open-source, self-hosted Asana alternative",
  description:
    "Asana is not open source and cannot be self-hosted. JacChart is an MIT-licensed Asana alternative you can self-host for free with unlimited users and SSO included.",
  summary: "No two-user free tier and no Enterprise gate on single sign-on.",
  heading: "The open-source Asana alternative",
  subheading:
    "Asana's free plan now stops at two people, and single sign-on only arrives at the Enterprise tier. JacChart is open source, self-hostable, and gives every team the whole product.",
  verdict:
    "Asana is not open source and cannot be self-hosted. JacChart is an open-source, MIT-licensed alternative to Asana that you can self-host for free with unlimited users. Asana is cloud-only, priced per user from $10.99 a month, and keeps SAML single sign-on for its Enterprise tier. JacChart covers boards, backlog, Gantt and calendar views, custom fields, workflows, roles, and time tracking. Asana's portfolios, goals, and workload views remain outside JacChart's scope.",
  facts: {
    license: "MIT, versus a proprietary licence for Asana",
    hosting: "Self-host anywhere, or EU-hosted cloud. Asana is cloud only",
    sso: "Free on every JacChart build, Enterprise tier on Asana",
    pricing: "$0 self-hosted, cloud from $4 / month",
  },
  rows: [
    { feature: "Open source (MIT)", "jac-chart": true, them: false },
    { feature: "Self-hostable", "jac-chart": true, them: false },
    { feature: "Own your data", "jac-chart": true, them: false },
    {
      feature: "Free tier",
      "jac-chart": "Unlimited, self-hosted",
      them: "Up to 2 users",
    },
    { feature: "SSO included", "jac-chart": "Free", them: "Enterprise" },
    { feature: "Time tracking", "jac-chart": true, them: "Paid tiers" },
    { feature: "Learning curve", "jac-chart": "Minutes", them: "Moderate" },
    {
      feature: "Cloud pricing",
      "jac-chart": "From $4/mo",
      them: "From $10.99/user/mo",
    },
  ],
  reasons: [
    {
      title: "The free tier is the whole product",
      body: "Self-hosted JacChart has no seat cap and no feature gates. Asana's Personal plan tops out at two users and holds back timeline, forms, and automations.",
    },
    {
      title: "Single sign-on without a sales call",
      body: "Connect Google, GitHub, Discord, or any OIDC provider on any JacChart build. Asana puts SAML behind Enterprise, which is quote-only pricing.",
    },
    {
      title: "Work, not work management",
      body: "JacChart brings boards, backlog, Gantt and calendar planning, custom fields, workflow rules, and time tracking together. Teams can organise tasks and schedules without setting up a portfolio reporting layer.",
    },
  ],
  honestNote:
    "Asana is genuinely strong at cross-team coordination: portfolios, goals, workload balancing, and approval flows for a marketing or operations org. If a program manager needs to see fifty projects roll up into one status view, Asana does that and JacChart does not.",
  faq: [
    {
      question: "Is Asana open source?",
      answer:
        "No. Asana is proprietary software under a commercial licence, sold only as a hosted service. JacChart is an open-source alternative under the MIT license that you can run on your own server.",
    },
    {
      question: "Is there an open-source alternative to Asana?",
      answer:
        "Yes. JacChart is MIT licensed and free to self-host with unlimited users. Other open-source options include OpenProject, Plane, Taiga, and Leantime. None of them replicate Asana's portfolio and goals layer, which is usually the point of switching.",
    },
    {
      question: "Can Asana be self-hosted?",
      answer:
        "No. Asana is a hosted SaaS product with no on-premise edition. If your requirement is keeping project data on infrastructure you control, you need a different tool.",
    },
    {
      question: "How many users does Asana's free plan allow?",
      answer:
        "Asana's Personal plan is limited to 2 users. Paid plans start at $10.99 per user a month billed annually for Starter and $24.99 for Advanced, with SAML SSO first appearing on Enterprise.",
    },
    {
      question: "Does JacChart have time tracking like Asana?",
      answer:
        "Yes. Time entries are built into JacChart tasks on every build, including the free self-hosted one. In Asana, time tracking is a paid-tier feature.",
    },
  ],
  related: ["clickup", "monday", "jira", "notion"],
  verifiedOn: "2026-08-19",
  sources: [
    { label: "Asana pricing", href: "https://asana.com/pricing" },
    { label: "JacChart pricing", href: "/pricing" },
  ],
};
