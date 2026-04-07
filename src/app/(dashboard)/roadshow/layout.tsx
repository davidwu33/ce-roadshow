import { MobileNav, TopBar } from "@/components/roadshow/mobile-nav";

export default function RoadshowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="lg:hidden">
        <TopBar />
      </div>
      <div className="pt-16 pb-32 lg:pt-0 lg:pb-0">{children}</div>
      <MobileNav />
    </>
  );
}
