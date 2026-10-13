import type { Comparison } from "./types";

export const githubProjects: Comparison = {
  slug: "github-projects",
  competitor: "GitHub Projects",
  category: "saas",
  title: "Open-source GitHub Projects alternative",
  description:
    "JacChart is an open-source, self-hostable alternative to GitHub Projects for teams that need a tracker outside a single repository host.",
  summary: "A tracker for the work that does not belong in a repository.",
  heading: "The self-hostable alternative to GitHub Projects",
  subheading:
    "GitHub Projects is free and fine, right up until you need non-engineering work, time tracking, or a tracker that outlives your GitHub plan. JacChart is a standalone board you own.",
  verdict:
    "JacChart is an open-source, MIT-licensed alternative to GitHub Projects for teams whose work does not all live in GitHub issues. GitHub Projects is included with GitHub and excellent for repository-bound work, but it has no time tracking, no workspace roles outside GitHub's own, and it ties your planning history to your GitHub account.",
  facts: {
    license: "MIT, and independent of any repository host",
    hosting: "Self-host anywhere, or EU-hosted cloud",
    sso: "Any OIDC provider on every JacChart build, SAML on GitHub Enterprise",
    pricing: "$0 self-hosted, cloud from $4 / month",
  },
  rows: [
    { feature: "Open source (MIT)", "jac-chart": true, them: false },
    { feature: "Self-hostable", "jac-chart": true, them: "Enterprise Server" },
    { feature: "Works without GitHub", "jac-chart": true, them: false },
    { feature: "Non-code work", "jac-chart": true, them: "Awkward" },
    { feature: "Time tracking", "jac-chart": true, them: false },
    { feature: "Workspace roles", "jac-chart": true, them: "GitHub org roles" },
    { feature: "GitHub integration", "jac-chart": true, them: "Native" },
    {
      feature: "Pricing",
      "jac-chart": "Free self-hosted",
      them: "Included with GitHub",
    },
  ],
  reasons: [
    {
      title: "Not everything is an issue",
      body: "Design, ops, onboarding, and client work rarely belong in a repository. JacChart gives that work a home without opening placeholder issues for it.",
    },
    {
      title: "Time tracking built in",
      body: "Log time against any task in JacChart. GitHub Projects has no time tracking, so teams end up bolting on a second tool.",
    },
    {
      title: "Your planning survives a migration",
      body: "If you ever move off GitHub, your JacChart board comes with you. It is MIT licensed, self-hostable, and exports to JSON.",
    },
  ],
  honestNote:
    "For a team whose work is entirely code in GitHub repositories, GitHub Projects is hard to argue with: it is included in your plan, it lives next to the pull requests, and the automation between issues and boards is genuinely good. JacChart makes sense when planning has outgrown the repository.",
  faq: [
    {
      question: "Is GitHub Projects free?",
      answer:
        "Yes, Projects is included with GitHub, including the Free plan. GitHub's paid plans are $4 per user a month for Team and from $21 for Enterprise, which is where SAML SSO and advanced auditing appear.",
    },
    {
      question: "Can I use GitHub Projects for non-engineering work?",
      answer:
        "You can, but every item is a repository issue or a draft item, so non-code work either clutters a repo or lives as drafts with fewer features. A standalone tracker avoids that trade.",
    },
    {
      question: "Does JacChart integrate with GitHub?",
      answer:
        "Yes. JacChart has GitHub, GitLab, and Gitea integrations connecting repository activity to tasks, plus outgoing webhooks, a public API, and an MCP server if you want AI agents to work with your board.",
    },
    {
      question: "Can GitHub Projects be self-hosted?",
      answer:
        "Only as part of GitHub Enterprise Server, which is a licensed on-premise install of GitHub itself. JacChart self-hosts on its own with Docker and PostgreSQL, free under the MIT license.",
    },
  ],
  related: ["jira", "linear", "azure-devops", "shortcut"],
  verifiedOn: "2026-08-19",
  sources: [
    { label: "GitHub pricing", href: "https://github.com/pricing" },
    { label: "JacChart pricing", href: "/pricing" },
  ],
};
