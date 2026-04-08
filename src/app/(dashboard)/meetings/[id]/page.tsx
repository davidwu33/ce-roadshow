"use client";

import { use } from "react";
import Link from "next/link";
import { useMeeting } from "@/hooks/use-roadshow";
import { useState, useCallback } from "react";

const STAGE_LABELS: Record<string, string> = {
  prospect: "PROSPECT",
  intro: "INTRODUCTION",
  meeting: "MEETING_PHASE",
  dd: "DUE_DILIGENCE",
  soft_circle: "SOFT_CIRCLE",
  committed: "COMMITTED",
  closed: "CLOSED",
  passed: "PASSED",
};

function MeetingDetail({ meetingId }: { meetingId: string }) {
  const { data: meeting, isLoading, mutate } = useMeeting(meetingId);
  const [saving, setSaving] = useState(false);

  const toggleAction = useCallback(
    async (index: number) => {
      if (!meeting?.actionItems) return;
      const items = [...(meeting.actionItems as any[])];
      items[index] = { ...items[index], done: !items[index].done };
      mutate({ ...meeting, actionItems: items }, false);
      setSaving(true);
      await fetch(`/api/roadshow/meetings/${meetingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actionItems: items }),
      });
      setSaving(false);
      mutate();
    },
    [meeting, meetingId, mutate]
  );

  if (isLoading || !meeting) {
    return (
      <div className="animate-pulse space-y-4 px-4 max-w-5xl mx-auto">
        <div className="h-32 rounded-sm bg-[#161f32]" />
        <div className="h-48 rounded-sm bg-[#161f32]" />
      </div>
    );
  }

  const attendees = Array.isArray(meeting.attendees) ? meeting.attendees : [];
  const actionItems = Array.isArray(meeting.actionItems)
    ? (meeting.actionItems as any[])
    : [];
  const completedCount = actionItems.filter((a: any) => a.done).length;

  const dateStr = meeting.meetingDate
    ? new Date(meeting.meetingDate + "T00:00:00").toLocaleDateString("en", {
        hour: undefined,
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "TBD";

  const timeStr = meeting.meetingTime
    ? `${meeting.meetingTime.slice(0, 5)} ${meeting.legTimezone ?? ""}`.trim()
    : "";

  const STATUS_COLORS: Record<string, string> = {
    planned: "#3b82f6",
    confirmed: "#22c55e",
    completed: "#6b7280",
    cancelled: "#ef4444",
  };
  const statusColor = STATUS_COLORS[meeting.status ?? "planned"] ?? "#3b82f6";

  return (
    <main className="px-4 md:px-8 max-w-5xl mx-auto space-y-5 pb-6">
      {/* Back nav */}
      <Link
        href="/meetings"
        className="flex items-center gap-1 text-xs active:opacity-60"
        style={{ color: "#5f6368", fontFamily: "Space Grotesk, sans-serif" }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_back</span>
        MEETINGS
      </Link>

      {/* Meeting Header */}
      <section className="space-y-3">
        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap">
          {meeting.language && (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                letterSpacing: "0.06em",
                color: "#4a9eff",
                background: "rgba(74, 158, 255, 0.15)",
                border: "1px solid rgba(74, 158, 255, 0.3)",
              }}
            >
              {meeting.language.toUpperCase()}
            </span>
          )}
          {meeting.status && (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                letterSpacing: "0.06em",
                color: statusColor,
                background: `${statusColor}22`,
                border: `1px solid ${statusColor}44`,
              }}
            >
              {meeting.status.toUpperCase()}
            </span>
          )}
          {meeting.meetingType && (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                letterSpacing: "0.06em",
                color: "#9aa0a6",
                background: "rgba(42, 52, 80, 0.5)",
              }}
            >
              {meeting.meetingType.toUpperCase().replace("_", " ")}
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          className="text-2xl font-black leading-tight"
          style={{ fontFamily: "Manrope, sans-serif", color: "#e8eaf0" }}
        >
          {meeting.title}
        </h1>

        {/* Time + location */}
        <div className="flex flex-col gap-1.5">
          {timeStr && (
            <div className="flex items-center gap-2 text-xs" style={{ color: "#9aa0a6" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>schedule</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace" }}>
                {timeStr} · {dateStr}
              </span>
            </div>
          )}
          {meeting.location && (
            <div className="flex items-center gap-2 text-xs" style={{ color: "#9aa0a6" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>location_on</span>
              <a
                href={`https://maps.apple.com/?q=${encodeURIComponent(meeting.location)}`}
                className="hover:text-[#ffba05] transition-colors"
              >
                {meeting.location}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Strategic Ask + Pitch Angle (Asymmetric Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {meeting.strategicAsk && (
          <div className="md:col-span-3 bg-[#1e2840] p-6 rounded-sm space-y-4">
            <div className="flex items-center gap-2 border-l-2 border-[#ffba05] pl-3">
              <span className="font-[Manrope] text-xs font-bold text-[#ffba05] tracking-widest uppercase">
                Strategic Ask
              </span>
            </div>
            <p className="text-[#9aa0a6] leading-relaxed text-sm whitespace-pre-wrap">
              {meeting.strategicAsk}
            </p>
          </div>
        )}
        {meeting.pitchAngle && (
          <div
            className={`${meeting.strategicAsk ? "md:col-span-2" : "md:col-span-5"} bg-[#1e2840] p-6 rounded-sm space-y-4 border-l border-[#2a3450]/10`}
          >
            <div className="flex items-center gap-2 border-l-2 border-[#2a3450] pl-3">
              <span className="font-[Manrope] text-xs font-bold text-[#9aa0a6] tracking-widest uppercase">
                Pitch Angle
              </span>
            </div>
            <p className="text-[#9aa0a6] leading-relaxed text-sm whitespace-pre-wrap">
              {meeting.pitchAngle}
            </p>
          </div>
        )}
      </div>

      {/* CRM Data Table */}
      {(meeting.orgName || meeting.orgStage) && (
        <section className="bg-[#161f32] rounded-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#2a3450]/5 flex justify-between items-center">
            <h2 className="font-[Manrope] text-sm font-bold text-[#e8eaf0] uppercase tracking-wider">
              Entity Financials & Pipeline
            </h2>
            <span className="font-[Space_Grotesk] text-[11px] text-[#9aa0a6]">
              SOURCE: ORBIT_CRM
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#2a3450]/30">
                  <th className="px-6 py-3 font-[Space_Grotesk] text-[10px] font-medium text-[#9aa0a6] uppercase tracking-widest">
                    Pipeline Stage
                  </th>
                  <th className="px-6 py-3 font-[Space_Grotesk] text-[10px] font-medium text-[#9aa0a6] uppercase tracking-widest text-right">
                    Commitment Size
                  </th>
                  <th className="px-6 py-3 font-[Space_Grotesk] text-[10px] font-medium text-[#9aa0a6] uppercase tracking-widest">
                    Relationship Owner
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0c1222]/40">
                <tr className="hover:bg-[#1e2840] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ffba05]" />
                      <span className="font-[Space_Grotesk] text-sm text-[#e8eaf0]">
                        {STAGE_LABELS[meeting.orgStage ?? ""] ?? meeting.orgStage?.toUpperCase() ?? "—"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-[Space_Grotesk] text-sm text-[#ffba05]">
                      {meeting.orgTargetCommitment
                        ? `$${Number(meeting.orgTargetCommitment).toLocaleString()}`
                        : "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-[Space_Grotesk] text-sm text-[#9aa0a6]">
                      {meeting.orgRelationshipOwner ?? "—"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Attendees & Intro Chain */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {attendees.length > 0 && (
          <div className="bg-[#1e2840] p-6 rounded-sm space-y-6">
            <h3 className="font-[Manrope] text-xs font-bold text-[#9aa0a6] uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">groups</span>
              Key Attendees
            </h3>
            <div className="space-y-4">
              {attendees.map((a: any, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-3 bg-[#161f32] rounded-sm"
                >
                  <div className="w-10 h-10 bg-[#2a3450] flex items-center justify-center rounded-sm">
                    <span className="material-symbols-outlined text-[#ffba05]">
                      person
                    </span>
                  </div>
                  <div>
                    <p className="font-[Manrope] text-sm font-bold text-[#e8eaf0]">
                      {a.name}
                    </p>
                    <p className="font-[Space_Grotesk] text-[11px] text-[#9aa0a6] uppercase tracking-tighter">
                      {[a.title, a.org].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {meeting.introChain && (
          <div className="bg-[#1e2840] p-6 rounded-sm space-y-6">
            <h3 className="font-[Manrope] text-xs font-bold text-[#9aa0a6] uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">hub</span>
              Intro Chain
            </h3>
            <div className="relative py-4 pl-4 space-y-8">
              <div className="absolute left-6 top-6 bottom-6 w-px bg-[#2a3450]/30" />
              {meeting.introChain.split("→").map((person: string, i: number, arr: string[]) => (
                <div key={i} className="relative flex items-center gap-4 z-10">
                  <div
                    className={`w-4 h-4 rounded-full ring-4 ring-[#1e2840] ${
                      i === 0 || i === arr.length - 1
                        ? "bg-[#ffba05]"
                        : "bg-[#2a3450] border border-[#2a3450]"
                    }`}
                  />
                  <div>
                    <p className="font-[Manrope] text-[13px] font-bold text-[#e8eaf0]">
                      {person.trim()}
                    </p>
                    <p className="font-[Space_Grotesk] text-[10px] text-[#9aa0a6]">
                      {i === 0
                        ? "Originator"
                        : i === arr.length - 1
                          ? "Target"
                          : "Connector"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Prep Notes */}
      {meeting.prepNotes && (
        <section className="bg-[#1e2840] p-6 rounded-sm space-y-4">
          <h3 className="font-[Manrope] text-xs font-bold text-[#9aa0a6] uppercase tracking-widest">
            Prep Notes
          </h3>
          <p className="text-[#9aa0a6] leading-relaxed text-sm whitespace-pre-wrap">
            {meeting.prepNotes}
          </p>
        </section>
      )}

      {/* Action Items / Prep Checklist */}
      {actionItems.length > 0 && (
        <section className="bg-[#2a3450]/40 p-6 rounded-sm border border-[#2a3450]/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-[Manrope] text-xs font-bold text-[#e8eaf0] uppercase tracking-widest">
              Prep Checklist
            </h3>
            <span className="font-[Space_Grotesk] text-[10px] text-[#ffba05]">
              {completedCount}/{actionItems.length} COMPLETED
              {saving && " · SAVING..."}
            </span>
          </div>
          <div className="space-y-3">
            {actionItems.map((item: any, i: number) => (
              <label
                key={i}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleAction(i)}
                    className="peer sr-only"
                  />
                  <div
                    className={`w-5 h-5 border rounded-sm transition-colors flex items-center justify-center ${
                      item.done
                        ? "border-[#ffba05] bg-[#ffba05]/20"
                        : "border-[#2a3450] hover:border-[#ffba05]"
                    }`}
                  >
                    {item.done && (
                      <span className="material-symbols-outlined text-[14px] text-[#ffba05]">
                        check
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`text-sm ${
                    item.done
                      ? "text-[#9aa0a6] line-through opacity-60"
                      : "text-[#e8eaf0] group-hover:text-[#ffba05] transition-colors"
                  }`}
                >
                  {item.task}
                  {item.owner && (
                    <span className="text-[#9aa0a6] ml-2">— {item.owner}</span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </section>
      )}

      {/* Execute Readiness Check CTA */}
      <button
        className="w-full py-4 rounded-xl font-black text-sm tracking-widest active:scale-[0.98] transition-transform"
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          background: "#ffba05",
          color: "#0c1222",
          letterSpacing: "0.1em",
        }}
        onClick={() => {
          const incomplete = actionItems.filter((a: any) => !a.done);
          if (incomplete.length === 0) {
            alert("All prep items complete. Ready to execute.");
          } else {
            alert(`${incomplete.length} prep item${incomplete.length > 1 ? "s" : ""} remaining before this meeting.`);
          }
        }}
      >
        EXECUTE READINESS CHECK
      </button>
    </main>
  );
}

export default function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <MeetingDetail meetingId={id} />;
}
