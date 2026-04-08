"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", exact: true, icon: "grid_view", label: "TODAY" },
  { href: "/meetings", exact: false, icon: "groups", label: "MEETINGS" },
  { href: "/timeline", exact: false, icon: "timeline", label: "TIMELINE" },
  { href: "/contacts", exact: false, icon: "contact_page", label: "CONTACTS" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 w-full flex justify-around items-stretch z-50 lg:hidden"
      style={{
        background: "rgba(22, 31, 50, 0.92)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(42, 52, 80, 0.4)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.exact
          ? pathname === tab.href
          : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex flex-col items-center justify-center gap-1 flex-1 py-3 transition-all duration-200 active:opacity-60 relative"
            style={{ color: isActive ? "#ffba05" : "#6b7a99" }}
          >
            {isActive && (
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                style={{ background: "#ffba05" }}
              />
            )}
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "22px",
                fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              {tab.icon}
            </span>
            <span
              className="text-[10px] tracking-wider"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: isActive ? 600 : 400 }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export function TopBar({ title }: { title?: string }) {
  return (
    <header
      className="fixed top-0 w-full z-50 flex justify-between items-center px-5 h-16"
      style={{
        background: "rgba(8, 14, 26, 0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(42, 52, 80, 0.3)",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="material-symbols-outlined"
          style={{ color: "#ffba05", fontSize: "24px", fontVariationSettings: "'FILL' 1" }}
        >
          rocket_launch
        </span>
        <span
          className="text-lg font-black tracking-tighter"
          style={{ color: "#ffba05", fontFamily: "Manrope, sans-serif", letterSpacing: "-0.04em" }}
        >
          {title ?? "CE ROADSHOW"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "rgba(42, 52, 80, 0.5)", color: "#9aa0a6" }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>search</span>
        </button>
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden"
          style={{ background: "rgba(255, 186, 5, 0.15)", color: "#ffba05" }}
        >
          <span className="text-xs font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>JS</span>
        </button>
      </div>
    </header>
  );
}
