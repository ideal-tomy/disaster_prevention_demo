"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StatusPill } from "@/components/StatusPill";
import {
  FACILITIES,
  INCIDENT,
  dueLabel,
  judgmentLabel,
  type DueKind,
  type Facility,
  type Judgment
} from "@/data/suirei";

type View = "daily" | "shelter";
type StatusFilter = Judgment | "";
type DueFilter = "overdue" | "thisMonth" | "none" | "";

const STATUS_CHIPS: Judgment[] = ["usable", "conditional", "unusable", "unknown"];
const DUE_CHIPS: DueFilter[] = ["overdue", "thisMonth", "none"];

function Mark({ facility, view }: { facility: Facility; view: View }) {
  const kind = view === "daily" ? facility.due : facility.judgment;
  if (kind === "none" || kind === "unknown") return <span className="mark markDashed" />;
  const color =
    kind === "usable" || kind === "recorded"
      ? "var(--ok)"
      : kind === "unusable" || kind === "overdue"
        ? "var(--stop)"
        : "var(--warn)";
  return <span className="mark" style={{ background: color }} />;
}

function facilitiesHref(opts: {
  view: View;
  facility?: string;
  status?: StatusFilter;
  due?: DueFilter;
  q?: string;
}) {
  const params = new URLSearchParams();
  params.set("view", opts.view);
  if (opts.facility) params.set("facility", opts.facility);
  if (opts.view === "shelter" && opts.status) params.set("status", opts.status);
  if (opts.view === "daily" && opts.due) params.set("due", opts.due);
  if (opts.q) params.set("q", opts.q);
  return `/console/facilities?${params.toString()}`;
}

export function FacilitiesView({
  view,
  facilityId,
  status = "",
  due = "",
  q = ""
}: {
  view: View;
  facilityId?: string;
  status?: StatusFilter;
  due?: DueFilter;
  q?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState<Facility | null>(null);
  const [draft, setDraft] = useState(q);

  useEffect(() => {
    setDraft(q);
  }, [q]);

  const rows = useMemo(() => {
    return FACILITIES.filter((facility) => {
      if (q && !facility.name.includes(q)) return false;
      if (view === "shelter" && status && facility.judgment !== status) return false;
      if (view === "daily" && due && facility.due !== due) return false;
      return true;
    });
  }, [view, status, due, q]);

  const filtered = Boolean(q || (view === "shelter" && status) || (view === "daily" && due));

  useEffect(() => {
    if (!facilityId || facilityId === "F01") {
      setOpen(null);
      return;
    }
    setOpen(FACILITIES.find((facility) => facility.id === facilityId) ?? null);
  }, [facilityId]);

  const push = (next: {
    view?: View;
    facility?: string | null;
    status?: StatusFilter | null;
    due?: DueFilter | null;
    q?: string | null;
  }) => {
    const nextView = next.view ?? view;
    router.push(
      facilitiesHref({
        view: nextView,
        facility: next.facility === null ? undefined : (next.facility ?? (facilityId && facilityId !== "F01" ? facilityId : undefined)),
        status: nextView === "shelter" ? (next.status === null ? "" : (next.status ?? status)) : "",
        due: nextView === "daily" ? (next.due === null ? "" : (next.due ?? due)) : "",
        q: next.q === null ? "" : (next.q ?? q)
      })
    );
  };

  const go = (next: View) => {
    push({ view: next, status: null, due: null });
  };

  const close = () => {
    setOpen(null);
    push({ facility: null });
  };

  const clearFilters = () => {
    push({ facility: null, status: null, due: null, q: null });
  };

  const applySearch = () => {
    push({ q: draft.trim() || null, facility: null });
  };

  return (
    <section>
      <div className="pageHead">
        <h2>施設一覧</h2>
        <p>平常は期限。災害時は開設の判定</p>
      </div>
      <div className="toolbar">
        <div className="seg" role="group" aria-label="表示の切替">
          <button type="button" aria-pressed={view === "daily"} onClick={() => go("daily")}>
            平常
          </button>
          <button type="button" aria-pressed={view === "shelter"} onClick={() => go("shelter")}>
            災害時
          </button>
        </div>
        <span style={{ color: "var(--muted)", fontSize: 13 }}>
          {filtered ? `${rows.length}件` : "並びは固定。市の施設が先"}
        </span>
      </div>
      <div className="filterBar">
        <form
          className="searchRow"
          onSubmit={(event) => {
            event.preventDefault();
            applySearch();
          }}
        >
          <input
            type="search"
            value={draft}
            placeholder="施設名で検索"
            aria-label="施設名で検索"
            onChange={(event) => setDraft(event.target.value)}
          />
          <button type="submit" className="btn btnGhost">
            検索
          </button>
        </form>
        <div className="chips" role="group" aria-label={view === "daily" ? "期限で絞り込み" : "判定で絞り込み"}>
          {view === "daily"
            ? DUE_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="chip"
                  aria-pressed={due === chip}
                  onClick={() => push({ due: due === chip ? null : chip, facility: null })}
                >
                  {dueLabel(chip as DueKind)}
                </button>
              ))
            : STATUS_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="chip"
                  aria-pressed={status === chip}
                  onClick={() => push({ status: status === chip ? null : chip, facility: null })}
                >
                  {judgmentLabel(chip)}
                </button>
              ))}
          {filtered ? (
            <Link className="linkish clearFilters" href={facilitiesHref({ view })} onClick={(event) => {
              event.preventDefault();
              clearFilters();
            }}>
              解除
            </Link>
          ) : null}
        </div>
      </div>
      <div className="tableWrap">
        {rows.length === 0 ? (
          <p className="emptyState">
            該当する施設はありません。
            <button type="button" className="linkish" onClick={clearFilters}>
              解除
            </button>
          </p>
        ) : (
          <table className={view === "daily" ? "fac facDaily" : "fac facShelter"}>
            <thead>
              <tr>
                <th>施設</th>
                {view === "daily" ? (
                  <>
                    <th>消防</th>
                    <th>発電機</th>
                    <th>受水槽</th>
                    <th>外壁</th>
                    <th>扉</th>
                    <th>期限</th>
                  </>
                ) : (
                  <>
                    <th>判定</th>
                    <th>理由（平常時の記録）</th>
                    <th>収容</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((facility) => (
                <tr
                  key={facility.id}
                  className={[
                    facility.due === "overdue" ? "dueRow" : "",
                    open?.id === facility.id ? "current" : ""
                  ]
                    .filter(Boolean)
                    .join(" ") || undefined}
                  onClick={() => {
                    if (facility.id === "F01") router.push("/console/incident");
                    else
                      push({
                        facility: facility.id
                      });
                  }}
                >
                  <td>
                    <Mark facility={facility} view={view} />
                    {facility.name}
                    {facility.id === "F01" ? (
                      <span className="incHint">進行中 {INCIDENT.id}</span>
                    ) : null}
                  </td>
                  {view === "daily" ? (
                    <>
                      <td className="fadeCell">{facility.cells.fire}</td>
                      <td className="fadeCell">{facility.cells.gen}</td>
                      <td className="fadeCell">{facility.cells.tank}</td>
                      <td className="fadeCell">{facility.cells.wall}</td>
                      <td className="fadeCell">{facility.cells.door}</td>
                      <td className="fadeCell">
                        <StatusPill kind={facility.due} />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="fadeCell">
                        <StatusPill kind={facility.judgment} />
                      </td>
                      <td className="fadeCell">{facility.reason}</td>
                      <td className="fadeCell num">
                        {facility.judgment === "unknown" || facility.capacity == null ? "—" : facility.capacity}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {open ? (
        <>
          <button type="button" className="drawerBackdrop" aria-label="閉じる" onClick={close} />
          <aside className="drawer" role="dialog" aria-label={open.name}>
            <button type="button" className="btn btnGhost" onClick={close}>
              閉じる
            </button>
            <h3>{open.name}</h3>
            <p style={{ color: "var(--muted)", marginTop: 0 }}>{open.kind}</p>
            <StatusPill kind={open.judgment} />
            <div className="kv">
              <span>消防</span>
              <div>{open.cells.fire}</div>
              <span>発電機</span>
              <div>{open.cells.gen}</div>
              <span>受水槽</span>
              <div>{open.cells.tank === "—" ? "—" : open.cells.tank}</div>
              <span>外壁</span>
              <div>{open.cells.wall}</div>
              <span>扉</span>
              <div>{open.cells.door}</div>
              <span>記録</span>
              <div>{open.record === "記録なし" ? "—" : open.record}</div>
            </div>
          </aside>
        </>
      ) : null}
    </section>
  );
}
