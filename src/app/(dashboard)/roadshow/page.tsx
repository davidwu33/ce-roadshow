"use client";

import Link from "next/link";
import { useDefaultTrip, useTrip } from "@/hooks/use-roadshow";
import type { MeetingWithOrg } from "@/db/queries/roadshow";

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#181c22] p-4 rounded-lg flex flex-col gap-1">
      <span className="font-[Space_Grotesk] text-[#d1c5b4] text-[11px] uppercase tracking-wider">
        {label}
      </span>
      <span className="font-[Space_Grotesk] text-3xl font-bold text-[#e9c176]">
        {value}
      </span>
    </div>
  );
}

function CalendarStrip({
  meetings,
  legs,
  today,
}: {
  meetings: MeetingWithOrg[];
  legs: any[];
  today: string;
}) {
  // Build day tiles from trip date range
  const allDates: string[] = [];
  if (legs.length > 0) {
    const start = new Date(legs[0].startDate + "T00:00:00");
    const end = new Date(legs[legs.length - 1].endDate + "T00:00:00");
    const d = new Date(start);
    while (d <= end) {
      allDates.push(d.toISOString().split("T")[0]);
      d.setDate(d.getDate() + 1);
    }
  }

  const meetingsByDate: Record<string, number> = {};
  for (const m of meetings) {
    if (m.meetingDate) {
      meetingsByDate[m.meetingDate] = (meetingsByDate[m.meetingDate] ?? 0) + 1;
    }
  }

  return (
    <section className="space-y-3">
      <div className="flex justify-between items-center px-1">
        <h2 className="font-[Manrope] font-bold text-sm uppercase tracking-widest text-[#d1c5b4]">
          April 2026
        </h2>
        <span className="material-symbols-outlined text-[#e9c176] text-sm">
          calendar_month
        </span>
      </div>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
        {allDates.map((date) => {
          const d = new Date(date + "T00:00:00");
          const weekday = d.toLocaleDateString("en", { weekday: "short" }).toUpperCase();
          const dayNum = String(d.getDate()).padStart(2, "0");
          const isToday = date === today;
          const count = meetingsByDate[date] ?? 0;

          return (
            <div
              key={date}
              className={`flex-shrink-0 w-14 h-20 rounded-md flex flex-col items-center justify-center gap-1 ${
                isToday
                  ? "bg-[#c5a059]/20 border border-[#e9c176]/40"
                  : "bg-[#181c22]"
              }`}
            >
              <span
                className={`font-[Space_Grotesk] text-[10px] ${
                  isToday ? "text-[#e9c176]" : "text-[#d1c5b4]"
                }`}
              >
                {weekday}
              </span>
              <span
                className={`font-[Space_Grotesk] text-lg font-bold ${
                  isToday ? "text-[#e9c176]" : "text-[#dfe2eb]"
                }`}
              >
                {dayNum}
              </span>
              <div className="flex gap-0.5 mt-1">
                {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-1 rounded-full ${
                      isToday ? "bg-[#e9c176]" : "bg-slate-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function AgendaCard({
  meeting,
  isNext,
}: {
  meeting: MeetingWithOrg;
  isNext: boolean;
}) {
  const isPast = meeting.status === "completed";
  const time = meeting.meetingTime?.slice(0, 5) ?? "TBD";
  const period = meeting.meetingTime
    ? Number(meeting.meetingTime.slice(0, 2)) >= 12
      ? "PM"
      : "AM"
    : "";

  return (
    <Link href={`/roadshow/meetings/${meeting.id}`}>
      <div
        className={`p-4 rounded-md flex gap-4 active:scale-[0.98] transition-transform ${
          isNext
            ? "bg-[#1c2026] border-l-4 border-[#e9c176]"
            : isPast
              ? "bg-[#181c22]/50 opacity-60"
              : "bg-[#181c22]"
        }`}
      >
        <div className="flex flex-col items-center w-12 border-r border-[#4e4639]/30 pr-4">
          <span
            className={`font-[Space_Grotesk] text-[11px] ${
              isNext ? "text-[#e9c176]" : "text-[#dfe2eb]"
            }`}
          >
            {time}
          </span>
          <span
            className={`font-[Space_Grotesk] text-[11px] ${
              isNext ? "text-[#e9c176]" : "text-[#d1c5b4]"
            }`}
          >
            {period}
          </span>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex justify-between items-start">
            <span className="font-[Manrope] font-bold text-sm text-[#dfe2eb]">
              {meeting.title}
            </span>
            {isNext && (
              <span className="bg-[#e9c176]/10 text-[#e9c176] text-[9px] px-2 py-0.5 rounded uppercase font-[Space_Grotesk]">
                Coming Up
              </span>
            )}
          </div>
          {meeting.location && (
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px] text-[#d1c5b4]">
                location_on
              </span>
              <span className="text-[11px] text-[#d1c5b4]">
                {meeting.location}
              </span>
            </div>
          )}
          {meeting.strategicAsk && (
            <div className="flex items-center gap-2 mt-1">
              <span className="material-symbols-outlined text-[14px] text-[#d1c5b4]">
                {meeting.meetingType === "dinner"
                  ? "restaurant"
                  : meeting.meetingType === "site_visit"
                    ? "factory"
                    : "groups"}
              </span>
              <span className="text-[11px] text-[#d1c5b4] line-clamp-1">
                {meeting.strategicAsk.split("\n")[0]}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function TripHQ({ tripId }: { tripId: string }) {
  const { data, isLoading } = useTrip(tripId);

  if (isLoading || !data) {
    return (
      <div className="animate-pulse space-y-4 px-4 max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 rounded-lg bg-[#181c22]" />
          ))}
        </div>
      </div>
    );
  }

  const { trip, legs, meetings } = data;
  const today = new Date().toISOString().split("T")[0];
  const todayMeetings = meetings.filter((m) => m.meetingDate === today);
  const pendingActions = meetings.reduce((acc, m) => {
    if (m.actionItems && Array.isArray(m.actionItems)) {
      acc += (m.actionItems as any[]).filter((a: any) => !a.done).length;
    }
    return acc;
  }, 0);

  const endDate = new Date(trip.endDate);
  const now = new Date();
  const daysRemaining = Math.max(
    0,
    Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );

  // Find next meeting (today or upcoming)
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const upcomingTodayMeetings = todayMeetings.length > 0 ? todayMeetings : meetings
    .filter((m) => (m.meetingDate ?? "") >= today && m.status !== "cancelled")
    .slice(0, 4);

  const nextMeeting = upcomingTodayMeetings.find(
    (m) =>
      m.status !== "completed" &&
      m.status !== "cancelled" &&
      (m.meetingDate === today
        ? (m.meetingTime ?? "99:99") >= currentTime
        : true)
  );

  return (
    <div className="px-4 space-y-6 max-w-lg mx-auto">
      {/* Stat Cards */}
      <section className="grid grid-cols-2 gap-3">
        <StatCard
          label="Total Meetings"
          value={String(meetings.length).padStart(2, "0")}
        />
        <StatCard
          label="Today's Count"
          value={String(todayMeetings.length).padStart(2, "0")}
        />
        <StatCard
          label="Pending Items"
          value={String(pendingActions).padStart(2, "0")}
        />
        <StatCard
          label="Days Remaining"
          value={String(daysRemaining).padStart(2, "0")}
        />
      </section>

      {/* Calendar Strip */}
      <CalendarStrip meetings={meetings} legs={legs} today={today} />

      {/* Today's Agenda */}
      <section className="space-y-4">
        <h2 className="font-[Manrope] font-bold text-sm uppercase tracking-widest text-[#d1c5b4] px-1">
          {todayMeetings.length > 0 ? "Today's Agenda" : "Upcoming"}
        </h2>
        <div className="space-y-3">
          {upcomingTodayMeetings.map((m) => (
            <AgendaCard
              key={m.id}
              meeting={m}
              isNext={m.id === nextMeeting?.id}
            />
          ))}
          {upcomingTodayMeetings.length === 0 && (
            <div className="text-center py-8 text-sm text-[#d1c5b4]">
              No meetings scheduled
            </div>
          )}
        </div>
      </section>

      {/* Pipeline Overview */}
      <section className="bg-[#181c22] p-4 rounded-lg space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-[Manrope] font-bold text-xs uppercase tracking-widest text-[#d1c5b4]">
            Active Deal Flow
          </h3>
          <span className="font-[Space_Grotesk] text-[10px] text-[#e9c176]">
            Live Update
          </span>
        </div>
        <div className="space-y-3">
          {legs.map((leg) => {
            const legMeetings = meetings.filter((m) => m.legId === leg.id);
            const completed = legMeetings.filter(
              (m) => m.status === "completed"
            ).length;
            const pct =
              legMeetings.length > 0
                ? Math.round((completed / legMeetings.length) * 100)
                : 0;

            return (
              <div key={leg.id} className="flex items-center justify-between">
                <span className="text-[11px] text-[#dfe2eb]">{leg.name}</span>
                <div className="flex-1 mx-4 h-1 bg-[#31353c] rounded-full overflow-hidden">
                  <div
                    className="bg-[#e9c176] h-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="font-[Space_Grotesk] text-[11px] text-[#e9c176] w-8 text-right">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default function RoadshowPage() {
  const { data: trip, isLoading } = useDefaultTrip();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-[#d1c5b4]">
        <span className="material-symbols-outlined animate-spin text-[24px]">
          progress_activity
        </span>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2 text-[#d1c5b4]">
        <span className="material-symbols-outlined text-[32px]">
          flight_takeoff
        </span>
        <p className="text-sm">No roadshow trip found. Run the seed script.</p>
      </div>
    );
  }

  return <TripHQ tripId={trip.id} />;
}
