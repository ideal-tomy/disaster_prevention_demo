import { StatusPill } from "@/components/StatusPill";
import { INTEGRATIONS } from "@/data/suirei";

export default function IntegrationsPage() {
  return (
    <section>
      <div className="pageHead">
        <h2>システム連携</h2>
        <p>つながっているものと、紙のままのもの</p>
      </div>
      <article className="card" style={{ marginTop: 20 }}>
        <div className="figure">5 / 8</div>
        <p className="hint">接続済み 5　確認中 2　未確認 1</p>
        <div className="barTrack" style={{ marginTop: 28 }}>
          <span className="goal">100%</span>
          <div className="barFill" />
        </div>
        <p>あと 3 系統がそろわないと、施設全体のデータを同じ形では出せない。</p>
      </article>
      <div style={{ marginTop: 8 }}>
        {INTEGRATIONS.map((row) => (
          <div className="intRow" key={row.name}>
            <strong style={{ fontWeight: 500 }}>{row.name}</strong>
            <StatusPill kind={row.status} />
            <span style={{ color: "var(--muted)" }}>{row.note}</span>
            <span className={row.status === "connected" ? "dot" : row.status === "checking" ? "dot dotCheck" : "dot dotUnknown"} />
          </div>
        ))}
      </div>
    </section>
  );
}
