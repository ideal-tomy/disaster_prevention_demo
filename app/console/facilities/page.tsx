import { FacilitiesView } from "@/components/FacilitiesView";
import type { Judgment } from "@/data/suirei";

const STATUSES: Judgment[] = ["usable", "conditional", "unusable", "unknown"];
const DUES = ["overdue", "thisMonth", "none"] as const;

export default async function FacilitiesPage({
  searchParams
}: {
  searchParams: Promise<{ view?: string; facility?: string; status?: string; due?: string; q?: string }>;
}) {
  const params = await searchParams;
  const view = params.view === "shelter" ? "shelter" : "daily";
  const status = STATUSES.includes(params.status as Judgment) ? (params.status as Judgment) : "";
  const due = DUES.includes(params.due as (typeof DUES)[number]) ? (params.due as (typeof DUES)[number]) : "";
  const q = params.q?.trim() ?? "";
  return <FacilitiesView view={view} facilityId={params.facility} status={status} due={due} q={q} />;
}
