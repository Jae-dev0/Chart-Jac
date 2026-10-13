import { useTranslation } from "react-i18next";
import useGetConfig from "@/hooks/queries/config/use-get-config";

const links = [
  { href: "https://jac-chart.app/terms", labelKey: "auth:page.terms" },
  { href: "https://jac-chart.app/privacy", labelKey: "auth:page.privacy" },
] as const;

const linkClassName = "transition-colors hover:text-foreground";

export function AuthLegalFooter() {
  const { t } = useTranslation();
  const { data: config } = useGetConfig();

  if (!config?.isCloud) return null;

  return (
    <footer className="flex justify-center gap-5 px-6 pb-8 text-muted-foreground text-xs">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {t(link.labelKey)}
        </a>
      ))}
      <a
        href="https://jac-chart.app"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        jac-chart.app
      </a>
    </footer>
  );
}
