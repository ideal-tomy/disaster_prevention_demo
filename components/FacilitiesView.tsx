"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StatusPill } from "@/components/StatusPill";
import { FACILITIES, type Facility } from "@/data/suirei";

type View = "daily" | "shelter";

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

export function FacilitiesView({ view }: { view: View }) {
  const router = useRouter();
  const [open, setOpen] = useState<Facility | null>(null);

  const go = (next: View) => {
    router.push(next === "daily" ? "/console/facilities?view=daily" : "/console/facilities?view=shelter");
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
        <span style={{ color: "var(--muted)", fontSize: 13 }}>並びは固定。市の施設が先</span>
      </div>
      <div className="tableWrap">
        <table className="fac">
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
            {FACILITIES.map((facility) => (
              <tr
                key={facility.id}
                onClick={() => {
                  if (facility.id === "F01") router.push("/console/incident");
                  else setOpen(facility);
                }}
              >
                <td>
                  <Mark facility={facility} view={view} />
                  {facility.name}
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
      </div>
      {open ? (
        <>
          <button type="button" className="drawerBackdrop" aria-label="閉じる" onClick={() => setOpen(null)} />
          <aside className="drawer" role="dialog" aria-label={open.name}>
            <button type="button" className="btn btnGhost" onClick={() => setOpen(null)}>
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
