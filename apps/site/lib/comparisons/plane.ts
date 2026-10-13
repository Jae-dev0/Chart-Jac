import type { Comparison } from "./types";

export const plane: Comparison = {
  slug: "plane",
  competitor: "Plane",
  category: "open-source",
  title: "Plane alternative",
  description:
    "JacChart is an MIT-licensed Plane alternative: smaller to run, permissively licensed, and with no commercial edition holding features back.",
  summary: "Smaller to run, MIT rather than AGPL, with SSO in the free build.",
  heading: "The lighter, MIT-licensed Plane alternative",
  subheading:
    "Plane is a capable open-source tracker with a Community edition and a Commercial edition above it. JacChart has one edition, MIT licensed, and a much smaller install.",
  verdict:
    "JacChart and Plane are both open-source, self-hostable project trackers. Plane's Community edition is AGPL-3.0 and free, with a separate Commercial edition and paid cloud tiers where single sign-on and advanced controls live. JacChart is MIT licensed with a single edition, includes SSO everywhere, and runs as one container plus PostgreSQL.",
  facts: {
    license: "MIT, versus AGPL-3.0 for the Plane Community edition",
    hosting: "Both self-host. JacChart is a single container plus PostgreSQL",
    sso: "Free on every JacChart build, Pro tier and above on Plane",
    pricing: "$0 self-hosted, cloud from $4 / month",
  },
  rows: [
    { feature: "License", "jac-chart": "MIT", them: "AGPL-3.0 (Community)" },
    { feature: "Self-hostable", "jac-chart": true, them: true },
    { feature: "Separate commercial edition", "jac-chart": false, them: true },
    { feature: "SSO in free build", "jac-chart": true, them: false },
    {
      feature: "Install footprint",
      "jac-chart": "One container + Postgres",
      them: "Multi-service",
    },
    { feature: "Cycles & modules", "jac-chart": false, them: true },
    { feature: "Time tracking", "jac-chart": true, them: "Paid tiers" },
    { feature: "Cloud pricing", "jac-chart": "From $4/mo", them: "From $6/seat/mo" },
  ],
  reasons: [
    {
      title: "One edition, no upgrade path to buy",
      body: "Plane splits into Community, Commercial, and Airgapped editions. JacChart has one build, and everything in it is yours under MIT.",
    },
    {
      title: "Less to operate",
      body: "JacChart is a container and a database. Plane's self-hosted stack has more services to run, monitor, and upgrade.",
    },
    {
      title: "Permissive licensing",
      body: "MIT rather than AGPL matters if you intend to modify JacChart and offer it as part of a service. It removes the question entirely.",
    },
  ],
  migration: {
    body: "JacChart imports projects from Plane Cloud or a self-hosted Plane from the app: states, work items with their keys, priorities, dates, labels, comments, and sub-issues. Plane is only read, never changed.",
    href: "https://jac-chart.app/docs/core/migrations/from-plane",
    linkText: "Read the import guide",
  },
  honestNote:
    "Plane is the more feature-complete tracker: cycles, modules, intake, pages, and a polished interface, backed by a well-funded team shipping quickly. If you want a Linear-shaped open-source product and do not mind AGPL or a bigger install, Plane is an excellent choice.",
  faq: [
    {
      question: "Is Plane fully open source?",
      answer:
        "The Community edition is open source under AGPL-3.0 and free to self-host with no user limits. Plane also sells Commercial and Airgapped editions, and its cloud plans put single sign-on and advanced controls on paid tiers.",
    },
    {
      question: "Plane or JacChart for a self-hosted team?",
      answer:
        "Plane if you want cycles, modules, and a broader feature set and can run a larger stack. JacChart if you want MIT licensing, SSO in the free build, and the smallest install that still handles a team.",
    },
    {
      question: "Does AGPL matter for self-hosting?",
      answer:
        "For internal use, generally not. It matters if you modify the code and offer it to others over a network, where AGPL requires you to publish your changes. MIT has no such requirement.",
    },
    {
      question: "Can I migrate from Plane to JacChart?",
      answer:
        "Yes. JacChart imports projects from Plane Cloud or a self-hosted Plane from the app with a Plane personal access token. States, work items with their keys, priorities, dates, labels, comments, and sub-issues carry over. Cycles, modules, and attachments do not.",
    },
  ],
  related: ["linear", "huly", "jira", "openproject"],
  verifiedOn: "2026-08-19",
  sources: [
    { label: "Plane pricing", href: "https://plane.so/pricing" },
    { label: "JacChart pricing", href: "/pricing" },
  ],
};
