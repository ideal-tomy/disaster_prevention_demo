import Link from "next/link";
import { StatusPill } from "@/components/StatusPill";
import { DASHBOARD, FACILITIES, formatCapacity, INCIDENT } from "@/data/suirei";

export default function DashboardPage() {
  return (
    <section className="dash">
      <div className="pageHead">
        <h2>統合ダッシュボード</h2>
        <p>開設できる場所と、記録がない場所</p>
      </div>

      <article className="incidentBanner">
        <img className="bannerStill" src="/img/b1.png" alt="" />
        <div>
          <div className="kicker">
            <span className="num">{INCIDENT.id}</span>
            <StatusPill kind={INCIDENT.judgment} />
            <span className="pill pillAi" title={INCIDENT.confidenceNote}>
              関連付け {INCIDENT.confidence}%
            </span>
          </div>
          <h3>{INCIDENT.headline}</h3>
          <p className="meta">
            {INCIDENT.facilityName} · 14:08 車両 · 14:36 備品 · 発電機 2026/08/28
          </p>
        </div>
        <Link href="/console/incident" className="btn btnGhost">
          詳細
        </Link>
      </article>

      <div className="statGrid">
        <Link href="/console/facilities?view=shelter&status=usable" className="card statLink">
          <label>使える</label>
          <div className="figure">
            {DASHBOARD.usableShelters}
            <small>施設</small>
          </div>
          <p className="hint">収容 {formatCapacity(DASHBOARD.usableCapacity)}</p>
        </Link>
        <Link href="/console/facilities?view=shelter&status=conditional" className="card statLink">
          <label>条件付き</label>
          <div className="figure">
            {DASHBOARD.conditional}
            <small>施設</small>
          </div>
          <p className="hint">開設数に入れない</p>
        </Link>
        <Link href="/console/facilities?view=shelter&status=unusable" className="card statLink">
          <label>使えない</label>
          <div className="figure">
            {DASHBOARD.unusable}
            <small>施設</small>
          </div>
          <p className="hint">桜小学校体育館・東公民館</p>
        </Link>
        <Link href="/console/facilities?view=shelter&status=unknown" className="card statLink">
          <label>確認できていない</label>
          <div className="figure">
            {DASHBOARD.unknown}
            <small>施設</small>
          </div>
          <p className="hint">記録がない</p>
        </Link>
      </div>

      <div className="split">
        <article className="card mapCard">
          <label>市内の指定避難所（模式）</label>
          <svg className="mapSvg" viewBox="0 0 100 100" role="img" aria-label="翠嶺市の模式図">
            <rect x="8" y="8" width="84" height="84" rx="8" fill="#f7f8fa" stroke="#e4e8ee" />
            <text x="50" y="14" textAnchor="middle" fontSize="3.2" fill="#5e6a78">
              北
            </text>
            <text x="18" y="50" textAnchor="middle" fontSize="3.2" fill="#5e6a78">
              西
            </text>
            <text x="82" y="50" textAnchor="middle" fontSize="3.2" fill="#5e6a78">
              東
            </text>
            <text x="50" y="90" textAnchor="middle" fontSize="3.2" fill="#5e6a78">
              南
            </text>
            <text x="50" y="52" textAnchor="middle" fontSize="3" fill="#8b93a0">
              中央
            </text>
            {FACILITIES.filter((f) => f.shelter).map((facility) => {
              const color =
                facility.judgment === "usable"
                  ? "#1f7a4d"
                  : facility.judgment === "conditional"
                    ? "#c47b12"
                    : facility.judgment === "unusable"
                      ? "#b42318"
                      : "#8b93a0";
              const href =
                facility.id === "F01"
                  ? "/console/incident"
                  : `/console/facilities?view=shelter&facility=${facility.id}`;
              return (
                <a key={facility.id} href={href}>
                  <circle
                    cx={facility.map.x}
                    cy={facility.map.y}
                    r={facility.id === "F01" ? 2.4 : 1.8}
                    fill={facility.judgment === "unknown" ? "none" : color}
                    stroke={color}
                    strokeDasharray={facility.judgment === "unknown" ? "1.2 0.8" : undefined}
                    strokeWidth="0.6"
                  />
                  {facility.id === "F01" ? (
                    <text x={facility.map.x} y={facility.map.y - 3.6} textAnchor="middle" fontSize="3.2" fill="#1c2430">
                      総合体育館
                    </text>
                  ) : null}
                </a>
              );
            })}
          </svg>
          <div className="mapLegend">
            <span>
              <i className="legDot" style={{ background: "#1f7a4d" }} />
              使える
            </span>
            <span>
              <i className="legDot" style={{ background: "#c47b12" }} />
              条件付きで使える
            </span>
            <span>
              <i className="legDot" style={{ background: "#b42318" }} />
              使えない
            </span>
            <span>
              <i className="legDot legDash" />
              確認できていない
            </span>
          </div>
        </article>
        <article className="card">
          <label>連携</label>
          <div className="figure" style={{ fontSize: 28 }}>
            {DASHBOARD.integrations}
          </div>
          <p className="hint">外壁は未確認。紙のまま</p>
          <div className="barTrack" style={{ marginTop: 16 }}>
            <div className="barFill" />
          </div>
          <Link href="/console/integrations" className="btn btnGhost" style={{ marginTop: 16 }}>
            連携を見る
          </Link>
        </article>
      </div>
    </section>
  );
}
