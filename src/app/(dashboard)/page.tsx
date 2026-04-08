"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useOrganizations } from "@/hooks/use-organizations";
import { usePipelineSummary } from "@/hooks/use-pipeline";
import { WarmthDot } from "@/components/shared/warmth-dot";
import { formatMoney } from "@/lib/format";
import {
  FUND_TARGET_MM,
  STRATEGIC_CATEGORIES,
  STRATEGIC_CATEGORY_MAP,
  inferStrategicCategory,
} from "@/lib/constants";
import type { OrgWithMeta } from "@/db/queries/organizations";

const STAGE_COLORS: Record<string, string> = {
  prospect:    "#6b7280",
  intro:       "#3b82f6",
  meeting:     "#f59e0b",
  dd:          "#8b5cf6",
  soft_circle: "#06b6d4",
  committed:   "#22c55e",
  closed:      "#10b981",
  passed:      "#ef4444",
};

const STAGE_LABELS: Record<string, string> = {
  prospect:    "PROSPECT",
  intro:       "INITIAL CONTACT",
  meeting:     "MEETING",
  dd:          "DUE DILIGENCE",
  soft_circle: "SOFT CIRCLE",
  committed:   "COMMITTED",
  closed:      "CLOSED",
  passed:      "PASSED",
};

function StagePill({ stage }: { stage: string }) {
  const color = STAGE_COLORS[stage] ?? "#6b7280";
  const label = STAGE_LABELS[stage] ?? stage.toUpperCase();
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
      style={{
        fontFamily: "Space Grotesk, sans-serif",
        letterSpacing: "0.06em",
        color,
        background: `${color}22`,
        border: `1px solid ${color}44`,
      }}
    >
      {label}
    </span>
  );
}

function CategorySection({
  category,
  orgs,
}: {
  category: (typeof STRATEGIC_CATEGORIES)[number];
  orgs: OrgWithMeta[];
}) {
  if (orgs.length === 0) return null;

  return (
    <section>
      {/* Section header */}
      <div className="flex items-baseline justify-between mb-3 px-1">
        <h2
          className="text-sm font-black tracking-wider"
          style={{ fontFamily: "Manrope, sans-serif", color: "#e8eaf0" }}
        >
          {category.label.toUpperCase()}
        </h2>
        <span className="text-xs" style={{ color: "#5f6368" }}>
          {orgs.length} {orgs.length === 1 ? "Entity" : "Entities"}
        </span>
      </div>

      {/* LP rows */}
      <div
        className="rounded-xl overflow-hidden divide-y divide-[rgba(42,52,80,0.4)]"
        style={{
          background: "#161f32",
          border: "1px solid rgba(42, 52, 80, 0.6)",
        }}
      >
        {orgs.map((org) => (
          <Link
            key={org.id}
            href={`/organizations/${org.id}`}
            className="flex items-center gap-3 px-4 py-3.5 active:bg-[#1e3560] transition-colors"
          >
            {/* Warmth dot */}
            <WarmthDot daysSinceTouch={org.daysSinceInteraction} size={8} />

            {/* Name + location */}
            <div className="flex-1 min-w-0">
              <div
                className="text-sm font-semibold truncate"
                style={{ color: "#e8eaf0" }}
              >
                {org.name}
              </div>
              {org.headquarters && (
                <div
                  className="text-xs flex items-center gap-1 mt-0.5"
                  style={{ color: "#5f6368" }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>
                    location_on
                  </span>
                  {org.headquarters}
                </div>
              )}
            </div>

            {/* Stage pill */}
            <StagePill stage={org.stage} />

            {/* Target commitment */}
            {org.targetCommitment && (
              <span
                className="text-sm font-semibold tabular-nums shrink-0"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  color: "#9aa0a6",
                }}
              >
                {formatMoney(Number(org.targetCommitment))}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function DashboardPage() {
  const { data: orgs } = useOrganizations();
  const { data: pipeline } = usePipelineSummary();

  const committedPct = pipeline
    ? Math.round((pipeline.totalCommitted / FUND_TARGET_MM) * 100)
    : 0;

  const totalPipeline = orgs?.length ?? 0;
  const activeOrgs = orgs?.filter(
    (o) => !["passed", "closed"].includes(o.stage)
  ).length ?? 0;

  const categorizedOrgs = useMemo(() => {
    if (!orgs) return {};
    const groups: Record<string, OrgWithMeta[]> = {};
    for (const org of orgs) {
      const cat = inferStrategicCategory(org);
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(org);
    }
    return groups;
  }, [orgs]);

  return (
    <div className="px-4 max-w-lg mx-auto space-y-6 py-4 lg:max-w-4xl lg:px-8">
      {/* Hero — committed capital */}
      <div
        className="rounded-xl p-5"
        style={{
          background: "#161f32",
          border: "1px solid rgba(42, 52, 80, 0.6)",
          borderLeft: "3px solid #ffba05",
        }}
      >
        <div
          className="text-[11px] font-bold tracking-widest mb-1"
          style={{ fontFamily: "Space Grotesk, sans-serif", color: "#5f6368" }}
        >
          COMMITTED CAPITAL
        </div>
        <div className="flex items-baseline gap-3">
          <span
            className="text-4xl font-black tabular-nums"
            style={{ fontFamily: "Manrope, sans-serif", color: "#ffba05" }}
          >
            {pipeline ? formatMoney(pipeline.totalCommitted) : "—"}
          </span>
          <span className="text-sm" style={{ color: "#22c55e" }}>
            {committedPct}% of ${FUND_TARGET_MM}M target
          </span>
        </div>
      </div>

      {/* Two stat tiles */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "TOTAL LPS", value: String(totalPipeline) },
          { label: "PIPELINE", value: String(activeOrgs) },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl p-4"
            style={{
              background: "#161f32",
              border: "1px solid rgba(42, 52, 80, 0.6)",
            }}
          >
            <div
              className="text-[11px] font-bold tracking-widest mb-1"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#5f6368" }}
            >
              {label}
            </div>
            <div
              className="text-3xl font-black tabular-nums"
              style={{ fontFamily: "Manrope, sans-serif", color: "#e8eaf0" }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Category LP lists */}
      <div className="space-y-6">
        {STRATEGIC_CATEGORIES.filter((c) => c.key !== "uncategorized").map(
          (category) => (
            <CategorySection
              key={category.key}
              category={category}
              orgs={categorizedOrgs[category.key] ?? []}
            />
          )
        )}
        {categorizedOrgs["uncategorized"]?.length > 0 && (
          <CategorySection
            category={STRATEGIC_CATEGORY_MAP["uncategorized"]}
            orgs={categorizedOrgs["uncategorized"]}
          />
        )}
      </div>
    </div>
  );
}
