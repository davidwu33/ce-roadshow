import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orbit",
  description: "Universal CRM — Synergis Capital · Current Equities · UUL Global",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Orbit",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0c1222",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;600&family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-[#0c1222] text-[#e8eaf0] font-[Inter,system-ui,sans-serif] antialiased selection:bg-[#ffba05]/30 selection:text-[#ffba05] min-h-screen">
        {children}
      </body>
    </html>
  );
}
