"use client";

import Link from "next/link";
import { useDefaultTrip, useTrip } from "@/hooks/use-roadshow";
import type { MeetingWithOrg } from "@/db/queries/roadshow";

const LEG_SUBTITLES: Record<string, string> = {
  "Hong Kong": "Victoria Harbour Circuit",
  "China — Shenzhen + Mainland": "Pudong Financial District",
  "Paris — France Site Visit": "8th Arrondissement",
  "Milken Conference": "Century City",
};

function MeetingRow({
  meeting,
  isCurrent,
  isPast,
}: {
  meeting: MeetingWithOrg;
  isCurrent: boolean;
  isPast: boolean;
}) {
  const time = meeting.meetingTime?.slice(0, 5) ?? "TBD";
  const typeLabel = (meeting.meetingType ?? "meeting").toUpperCase().replace("_", " ");

  if (isCurrent) {
    return (
      <Link href={`/roadshow/meetings/${meeting.id}`}>
        <div className="flex gap-6 p-4 bg-[#161f32] border-l-2 border-[#ffba05] shadow-lg group relative active:scale-[0.98] transition-transform">
          <div className="w-20 shrink-0 font-[Space_Grotesk] text-sm pt-1 text-[#ffba05] font-bold">
            {time}
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] bg-[#ffba05] text-[#0c1222] px-1 font-[Space_Grotesk] font-bold tracking-tighter">
                CURRENT
              </span>
              <div className="text-xs font-[Space_Grotesk] text-[#ffba05] uppercase">
                {typeLabel}
              </div>
            </div>
            <h3 className="font-[Manrope] font-bold text-lg leading-tight text-[#e8eaf0]">
              {meeting.title}
            </h3>
            <p className="text-sm text-[#9aa0a6] mt-1 line-clamp-1">
              {meeting.strategicAsk?.split("\n")[0] ?? ""}
            </p>
            {meeting.location && (
              <div className="mt-4 flex gap-3">
                <div className="bg-[#2a3450] px-3 py-1 rounded-sm text-[11px] font-[Space_Grotesk] text-[#9aa0a6]">
                  {meeting.location}
                </div>
                {meeting.language === "zh" && (
                  <div className="bg-[#2a3450] px-3 py-1 rounded-sm text-[11px] font-[Space_Grotesk] text-[#9aa0a6]">
                    中文
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="shrink-0 pt-1">
            <span
              className="material-symbols-outlined text-[#ffba05]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              sensors
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/roadshow/meetings/${meeting.id}`}>
      <div
        className={`flex gap-6 p-4 hover:bg-[#1e2840] transition-colors group active:scale-[0.98] ${
          isPast ? "opacity-40" : ""
        }`}
      >
        <div className="w-20 shrink-0 font-[Space_Grotesk] text-sm pt-1 text-[#9aa0a6]">
          {time}
        </div>
        <div className="flex-grow">
          <div className="text-xs font-[Space_Grotesk] text-[#9aa0a6] mb-1 uppercase">
            {typeLabel}
          </div>
          <h3 className="font-[Manrope] font-bold text-lg leading-tight text-[#e8eaf0]">
            {meeting.title}
          </h3>
          <p className="text-sm text-[#9aa0a6] mt-1 line-clamp-1">
            {meeting.strategicAsk?.split("\n")[0] ?? meeting.location ?? ""}
          </p>
        </div>
        <div className="shrink-0 pt-1">
          {isPast ? (
            <span className="material-symbols-outlined text-[#9aa0a6]">
              check_circle
            </span>
          ) : (
            <span className="material-symbols-outlined text-[#2a3450]">
              schedule
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function TimelineView({ tripId }: { tripId: string }) {
  const { data, isLoading } = useTrip(tripId);
  const today = new Date().toISOString().split("T")[0];
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  if (isLoading || !data) {
    return (
      <div className="animate-pulse space-y-4 px-4 max-w-4xl mx-auto">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 rounded-lg bg-[#161f32]" />
        ))}
      </div>
    );
  }

  const { legs, meetings } = data;

  const meetingsByDate: Record<string, MeetingWithOrg[]> = {};
  for (const m of meetings) {
    if (m.meetingDate) {
      if (!meetingsByDate[m.meetingDate]) meetingsByDate[m.meetingDate] = [];
      meetingsByDate[m.meetingDate].push(m);
    }
  }

  // Find current meeting
  const todayMeetings = meetingsByDate[today] ?? [];
  const currentMeeting = todayMeetings.find(
    (m) =>
      m.status !== "completed" &&
      m.status !== "cancelled" &&
      (m.meetingTime ?? "99:99") >= currentTime
  );

  return (
    <main className="max-w-4xl mx-auto px-4">
      {legs.map((leg) => {
        const legMeetings = meetings.filter((m) => m.legId === leg.id);
        const subtitle = LEG_SUBTITLES[leg.name] ?? leg.city ?? "";

        return (
          <section key={leg.id} className="mb-12">
            <header className="sticky top-16 z-40 py-6 bg-[#0c1222]/95 backdrop-blur-sm border-b border-[#2a3450]/15 mb-6">
              <div className="flex items-end justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-[#9aa0a6] font-[Space_Grotesk] text-[11px] uppercase tracking-[0.2em] mb-1">
                    <span className="material-symbols-outlined text-[14px]">
                      location_on
                    </span>
                    {(leg.city ?? leg.name).toUpperCase()}
                  </div>
                  <h2 className="font-[Manrope] text-2xl font-bold tracking-tight text-[#e8eaf0]">
                    {subtitle}
                  </h2>
                </div>
                <div className="text-right whitespace-nowrap">
                  <div className="font-[JetBrains_Mono] text-[#ffba05] font-bold text-lg tracking-tighter">
                    {leg.startDate.slice(5).replace("-", "/")} — {leg.endDate.slice(5).replace("-", "/")}
                  </div>
                  <div className="font-[JetBrains_Mono] text-[10px] text-[#9aa0a6] opacity-80 uppercase tracking-wider">
                    {leg.timezone ?? ""}
                  </div>
                </div>
              </div>
            </header>
            <div className="space-y-1">
              {legMeetings.map((m) => {
                const isPast =
                  (m.meetingDate ?? "") < today ||
                  m.status === "completed";
                const isCurrent = m.id === currentMeeting?.id;

                return (
                  <MeetingRow
                    key={m.id}
                    meeting={m}
                    isCurrent={isCurrent}
                    isPast={isPast}
                  />
                );
              })}
              {legMeetings.length === 0 && (
                <div className="p-4 text-sm text-[#9aa0a6]">
                  No meetings scheduled
                </div>
              )}
            </div>
          </section>
        );
      })}
    </main>
  );
}

export default function TimelinePage() {
  const { data: trip } = useDefaultTrip();
  if (!trip) return null;
  return <TimelineView tripId={trip.id} />;
}
