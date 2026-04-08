import { Sidebar } from "@/components/shared/sidebar";
import { CommandPalette } from "@/components/shared/command-palette";
import { MobileNav, TopBar } from "@/components/roadshow/mobile-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Mobile top bar */}
      <div className="lg:hidden">
        <TopBar />
      </div>
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      {/* Content — padded for mobile topbar + bottom nav */}
      <div className="lg:ml-[220px] pt-16 pb-24 lg:pt-0 lg:pb-0">
        <main className="overflow-auto">{children}</main>
      </div>
      {/* Mobile bottom nav — all pages */}
      <MobileNav />
      <CommandPalette />
    </div>
  );
}
