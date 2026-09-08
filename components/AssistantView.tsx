"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { QA } from "@/data/suirei";

type Msg = { role: "user" | "ai"; text: string };

export function AssistantView({ showQ1 }: { showQ1: boolean }) {
  const initial = useMemo<Msg[]>(() => {
    if (!showQ1) return [];
    return [
      { role: "user", text: QA.chips[0].q },
      { role: "ai", text: QA.chips[0].a }
    ];
  }, [showQ1]);
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [draft, setDraft] = useState("");

  const ask = (q: string) => {
    const hit = QA.chips.find((chip) => chip.q === q);
    const answer = hit ? hit.a : QA.fallback;
    setMessages((prev) => [...prev, { role: "user", text: q }, { role: "ai", text: answer }]);
  };

  return (
    <section>
      <div className="pageHead">
        <h2>AIアシスタント</h2>
        <p>開設できる場所を、記録の数で返す</p>
      </div>
      <div className="chat">
        {messages.map((msg, index) => (
          <div key={`${msg.role}-${index}`} className={msg.role === "user" ? "bubble bubbleUser" : "bubble"}>
            {msg.text}
            {msg.role === "ai" ? (
              <p>
                <Link className="linkish" href="/console/incident">
                  インシデントを開く
                </Link>
              </p>
            ) : null}
          </div>
        ))}
        <div className="chips">
          {QA.chips.map((chip) => (
            <button key={chip.id} type="button" className="chip" onClick={() => ask(chip.q)}>
              {chip.q}
            </button>
          ))}
        </div>
        <form
          className="askRow"
          onSubmit={(event) => {
            event.preventDefault();
            const q = draft.trim();
            if (!q) return;
            ask(q);
            setDraft("");
          }}
        >
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label="質問"
            placeholder="記録にあることだけ返します"
          />
          <button type="submit" className="btn btnPrimary">
            送る
          </button>
        </form>
      </div>
    </section>
  );
}
