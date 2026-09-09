"use client";

import { useState } from "react";
import { DOC_MAP, LEDGER_DOC, OPENING_DOC } from "@/data/suirei";
import { useReview } from "@/components/ReviewState";

function pairOfOpening(label: string) {
  if (label === "根拠1") return "gen";
  if (label === "根拠2") return "exit";
  if (label === "根拠3") return "van";
  return "";
}

function pairOfLedger(label: string) {
  if (label === "非常用発電機") return "gen";
  if (label === "消防設備") return "exit";
  if (label === "扉") return "van";
  return "";
}

function pairOfMap(left: string) {
  if (left.startsWith("発電機")) return "gen";
  if (left.startsWith("非常口")) return "exit";
  if (left.startsWith("当日")) return "van";
  return "";
}

export default function DocumentsPage() {
  const { confirmer } = useReview();
  const [pair, setPair] = useState("");

  return (
    <section>
      <div className="pageHead">
        <h2>書類</h2>
        <p>同じ記録から、開設の下書きと点検簿</p>
      </div>
      <p className="hint">画像確認の確認者は、このタブを開いている間だけ残ります。</p>
      <div className="docGrid">
        <article className="card docSheet paper">
          <h3>避難所開設の記録（下書き）</h3>
          {OPENING_DOC.map(([label, value]) => {
            const rowPair = pairOfOpening(label);
            return (
              <div
                className={rowPair && pair === rowPair ? "docRow lit" : "docRow"}
                key={label}
                onMouseEnter={() => setPair(rowPair)}
                onMouseLeave={() => setPair("")}
                onClick={() => setPair((current) => (rowPair && current === rowPair ? "" : rowPair))}
              >
                <span>{label}</span>
                <div>{label === "確認者" ? confirmer : value}</div>
              </div>
            );
          })}
        </article>
        <article className="card docSheet paper">
          <h3>施設点検記録簿（抜粋）</h3>
          {LEDGER_DOC.map(([label, value]) => {
            const rowPair = pairOfLedger(label);
            return (
              <div
                className={rowPair && pair === rowPair ? "docRow lit" : "docRow"}
                key={label}
                onMouseEnter={() => setPair(rowPair)}
                onMouseLeave={() => setPair("")}
                onClick={() => setPair((current) => (rowPair && current === rowPair ? "" : rowPair))}
              >
                <span>{label}</span>
                <div>{value}</div>
              </div>
            );
          })}
        </article>
      </div>
      <table className="mapTable">
        <thead>
          <tr>
            <th>点検記録簿の行</th>
            <th>開設報告書の欄</th>
          </tr>
        </thead>
        <tbody>
          {DOC_MAP.map(([left, right]) => {
            const rowPair = pairOfMap(left);
            return (
              <tr
                key={left}
                className={pair === rowPair ? "lit" : undefined}
                onMouseEnter={() => setPair(rowPair)}
                onMouseLeave={() => setPair("")}
                onClick={() => setPair((current) => (rowPair && current === rowPair ? "" : rowPair))}
              >
                <td>{left}</td>
                <td>{right}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        <button type="button" className="btn btnGhost" disabled title="このデモでは印刷できません">
          印刷
        </button>
        <span className="printNote">このデモでは印刷できません</span>
      </p>
    </section>
  );
}
