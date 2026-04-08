"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", exact: true, icon: "grid_view", label: "Today" },
  { href: "/meetings", exact: false, icon: "groups", label: "Meetings" },
  { href: "/timeline", exact: false, icon: "timeline", label: "Timeline" },
  { href: "/contacts", exact: false, icon: "contact_page", label: "Contacts" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-[220px] flex flex-col border-r"
      style={{
        background: "#080e1a",
        borderColor: "rgba(42, 52, 80, 0.3)",
      }}
    >
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-2.5">
        <span
          className="material-symbols-outlined"
          style={{ color: "#ffba05", fontSize: "24px", fontVariationSettings: "'FILL' 1" }}
        >
          rocket_launch
        </span>
        <div>
          <div className="font-black text-sm tracking-tighter" style={{ color: "#ffba05", fontFamily: "Manrope, sans-serif", letterSpacing: "-0.04em" }}>
            CE ROADSHOW
          </div>
          <div className="text-[11px]" style={{ color: "#5f6368" }}>
            Current Equities
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
              style={{
                background: isActive ? "rgba(255, 186, 5, 0.1)" : "transparent",
                color: isActive ? "#ffba05" : "#6b7a99",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "20px",
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="px-5 py-4 border-t text-[11px]"
        style={{
          borderColor: "rgba(42, 52, 80, 0.3)",
          color: "#5f6368",
        }}
      >
        Fund I — $500M Target
      </div>
    </aside>
  );
}
