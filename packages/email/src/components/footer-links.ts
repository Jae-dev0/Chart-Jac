import type { EmailLocale } from "../templates/resolve-locale";
import type { FooterLink } from "./email-footer";

const labels: Record<EmailLocale, { help: string; privacy: string }> = {
  en: { help: "Help", privacy: "Privacy" },
  de: { help: "Hilfe", privacy: "Datenschutz" },
  vi: { help: "Trợ giúp", privacy: "Quyền riêng tư" },
  ja: { help: "ヘルプ", privacy: "プライバシー" },
  "zh-tw": { help: "說明", privacy: "隱私權" },
};

export function footerLinks(
  locale: EmailLocale,
  leading: FooterLink[] = [],
): FooterLink[] {
  const copy = labels[locale];

  return [
    ...leading,
    { label: "jac-chart.app", href: "https://jac-chart.app" },
    { label: copy.help, href: "https://jac-chart.app/docs" },
    { label: copy.privacy, href: "https://jac-chart.app/privacy" },
  ];
}
