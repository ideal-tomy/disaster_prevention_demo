"use client";

import Link from "next/link";
import { StillFrame } from "@/components/StillFrame";
import { useReview } from "@/components/ReviewState";
import type { ReviewDecision } from "@/data/suirei";

function statusText(id: string, decision: ReviewDecision, decidedNote?: string) {
  if (decision === "needed") return decidedNote ?? "対応が必要（高木）";
  if (decision === "ok") return "問題なし（高木）";
  return "確認してください";
}

export function ReviewView() {
  const { decisions, setDecision, order, pendingCount } = useReview();
  const needed = Object.values(decisions).filter((v) => v === "needed").length;
  const ok = Object.values(decisions).filter((v) => v === "ok").length;

  return (
    <section>
      <div className="pageHead">
        <h2>画像確認</h2>
        <p>候補を挙げ、職員が押す</p>
      </div>
      <div className="reviewStats">
        <span>未入力 {pendingCount}</span>
        <span>対応が必要 {needed}</span>
        <span>問題なし {ok}</span>
      </div>
      <div className="reviewList">
        {order.map((item) => {
          const decision = decisions[item.id];
          return (
            <article className="reviewCard" key={item.id}>
              <StillFrame
                src={item.file}
                fileName={item.fileName}
                ratio={item.ratio ?? "wide"}
                box={item.box}
                label={item.label}
              />
              <div>
                <h3>
                  {item.facilityName}　{item.place}
                </h3>
                {item.label ? <p style={{ margin: "0 0 6px" }}>{item.label}</p> : null}
                <p style={{ margin: 0 }}>{statusText(item.id, decision, item.decidedNote)}</p>
                <p style={{ color: "var(--muted)", fontSize: 13 }}>ナレッジ {item.knowledge}</p>
                {item.id === "van" ? (
                  <p>
                    <Link className="linkish" href="/console/documents">
                      記録
                    </Link>
                  </p>
                ) : null}
                <div className="btnRow">
                  <button
                    type="button"
                    className="btn btnPrimary"
                    aria-pressed={decision === "needed"}
                    onClick={() => setDecision(item.id, "needed")}
                  >
                    対応が必要
                  </button>
                  <button
                    type="button"
                    className="btn btnGhost"
                    aria-pressed={decision === "ok"}
                    onClick={() => setDecision(item.id, "ok")}
                  >
                    問題なし
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
