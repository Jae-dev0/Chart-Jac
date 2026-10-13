import type { Comparison } from "./types";

export const monday: Comparison = {
  slug: "monday",
  competitor: "monday.com",
  category: "saas",
  title: "Open-source monday.com alternative",
  description:
    "JacChart is an open-source, self-hostable monday.com alternative with no seat minimums, SSO included, and free self-hosting under the MIT license.",
  summary: "No seat blocks, no three-board free tier, no Enterprise-only SSO.",
  heading: "The open-source monday.com alternative",
  subheading:
    "monday.com sells seats in blocks, caps its free plan at two people and three boards, and keeps single sign-on for Enterprise. JacChart is open source and charges nothing to run yourself.",
  verdict:
    "JacChart is an open-source, self-hostable alternative to monday.com. It is MIT licensed, free to run on your own Docker host with unlimited users and boards, and its cloud starts at $4 a month with no seat minimums. monday.com is a broader work-OS with dashboards, forms, and CRM templates that JacChart does not try to match.",
  facts: {
    license: "MIT, versus a proprietary licence for monday.com",
    hosting: "Self-host anywhere, or EU-hosted cloud. monday.com is cloud only",
    sso: "Free on every JacChart build, Enterprise tier on monday.com",
    pricing: "$0 self-hosted, cloud from $4 / month, no seat minimum",
  },
  rows: [
    { feature: "Open source (MIT)", "jac-chart": true, them: false },
    { feature: "Self-hostable", "jac-chart": true, them: false },
    { feature: "Own your data", "jac-chart": true, them: false },
    { feature: "Seat minimums", "jac-chart": "None", them: "Seats sold in blocks" },
    {
      feature: "Free tier",
      "jac-chart": "Unlimited, self-hosted",
      them: "2 seats, 3 boards",
    },
    { feature: "SSO included", "jac-chart": "Free", them: "Enterprise" },
    { feature: "Boards & workflows", "jac-chart": true, them: true },
    {
      feature: "Cloud pricing",
      "jac-chart": "From $4/mo",
      them: "Per seat, in blocks",
    },
  ],
  reasons: [
    {
      title: "You pay for the people you have",
      body: "monday.com sells seats in fixed blocks, so a team of six can end up buying ten. JacChart Cloud bills the seats you actually use, and self-hosting bills nothing at all.",
    },
    {
      title: "No feature ladder",
      body: "Automations, integrations, and single sign-on sit on different monday.com tiers. JacChart has one product: whichever way you run it, you get all of it.",
    },
    {
      title: "Simple on purpose",
      body: "Boards, backlog, Gantt and calendar views, custom fields, workflow rules, and time tracking. Start with tasks and dates, then add the fields and workflow columns your project needs.",
    },
  ],
  honestNote:
    "monday.com is a work OS, not just a tracker. If you want dashboards, forms, CRM boards, and a marketplace of apps in one place, and you are happy paying per seat for it, it does far more than JacChart. JacChart is for teams who want a fast project tracker they can own.",
  faq: [
    {
      question: "Is there an open-source monday.com alternative?",
      answer:
        "Yes. JacChart, OpenProject, Leantime, and Plane are all open source and self-hostable. JacChart is the lightest of them to run: one container plus PostgreSQL, MIT licensed, with SSO included.",
    },
    {
      question: "Can monday.com be self-hosted?",
      answer:
        "No. monday.com is cloud-only SaaS. Its Enterprise tier adds security and compliance controls, but there is no version you can install on your own servers.",
    },
    {
      question: "What does monday.com's free plan include?",
      answer:
        "The free plan is capped at 2 seats and 3 boards, with a limited set of views. Paid plans are per seat with minimum seat counts, and SSO arrives at the Enterprise tier.",
    },
    {
      question: "Does JacChart have automations?",
      answer:
        "JacChart has workflow rules per project that map integration events to target columns, plus outgoing webhooks, GitHub, GitLab, and Gitea integrations, and notifications in Slack, Discord, Telegram, and Mattermost. It does not have a general automation recipe builder.",
    },
  ],
  related: ["clickup", "asana", "wrike", "leantime"],
  verifiedOn: "2026-08-19",
  sources: [
    { label: "monday.com pricing", href: "https://monday.com/pricing" },
    { label: "JacChart pricing", href: "/pricing" },
  ],
};
