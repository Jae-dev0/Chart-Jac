import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { ThemeSync } from "@/components/landing/theme-sync";
import { landing } from "@/lib/landing";
import "./globals.css";

const siteTitle = landing.seo.title;
const siteDescription = landing.seo.description;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jac-chart.app"),
  title: {
    default: siteTitle,
    template: "%s | JacChart",
  },
  description: siteDescription,
  keywords: [
    "jac-chart",
    "project management",
    "open source",
    "kanban",
    "task management",
    "self-hosted",
    "team collaboration",
  ],
  applicationName: "JacChart",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://jac-chart.app",
    siteName: "JacChart",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "JacChart",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  category: "productivity",
  creator: "JacChart",
  publisher: "JacChart",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JacChart",
    url: "https://jac-chart.app",
    logo: "https://jac-chart.app/logo-512.png",
    sameAs: ["https://github.com/Jae-dev0/JacChart"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "JacChart",
    url: "https://jac-chart.app",
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "JacChart",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Linux, macOS, Windows",
    description: siteDescription,
    url: "https://jac-chart.app",
    image: "https://jac-chart.app/images/hero.png",
    license: "https://github.com/Jae-dev0/JacChart/blob/main/LICENSE",
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // eslint-disable-next-line react/no-danger -- Apply the theme before the page paints, including when JavaScript bundles load slowly.
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var stored = null;
                try {
                  stored = localStorage.getItem('jac-chart-site-theme');
                } catch (e) {}
                var isDark = stored === 'dark' || (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                document.documentElement.classList.toggle('dark', isDark);
                document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeSync />
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- JSON-LD structured data must be inlined as a script tag for search engines to parse.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          defer
          data-domain="jac-chart.app"
          src="https://plausible.jac-chart.app/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {
            "window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }"
          }
        </Script>
      </body>
    </html>
  );
}
