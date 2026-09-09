"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEMO_CLOCK, DEMO_DATE } from "@/data/suirei";
import { useReview } from "@/components/ReviewState";

const NAV = [
  { href: "/console", label: "統合ダッシュボード" },
  { href: "/console/facilities", label: "施設一覧" },
  { href: "/console/incident", label: "インシデント", badge: "incident" as const },
  { href: "/console/review", label: "画像確認", badge: "review" as const },
  { href: "/console/documents", label: "書類" },
  { href: "/console/integrations", label: "システム連携" },
  { href: "/console/assistant", label: "AIアシスタント" }
];

const TABS = [
  { href: "/console", label: "概況" },
  { href: "/console/facilities", label: "一覧" },
  { href: "/console/incident", label: "事象", badge: "incident" as const },
  { href: "/console/review", label: "確認", badge: "review" as const }
];

const MORE = [
  { href: "/console/documents", label: "書類" },
  { href: "/console/integrations", label: "システム連携" }
];

function isCurrent(href: string, path: string) {
  return href === "/console" ? path === "/console" : path.startsWith(href);
}

export function ConsoleShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { pendingCount } = useReview();
  const [more, setMore] = useState(false);
  const moreCurrent = path.startsWith("/console/assistant") || MORE.some((item) => isCurrent(item.href, path));

  useEffect(() => {
    setMore(false);
  }, [path]);

  const countOf = (badge?: "incident" | "review") =>
    badge === "incident" ? 1 : badge === "review" ? pendingCount : 0;

  return (
    <div className="shell appMin">
      <header className="topbar">
        <div className="topLeft">
          <span className="brandMark" aria-hidden>
            嶺
          </span>
          <div>
            <h1>防災施設コンソール</h1>
            <p className="deskOnly">翠嶺市・施設の点検と開設判定</p>
          </div>
        </div>
        <div className="topRight">
          <span className="dateLine deskOnly">デモの基準日時</span>
          <span className="clock">{DEMO_CLOCK}</span>
          <span className="dateLine deskOnly">{DEMO_DATE}</span>
          <span className="dateLine deskOnly">台風第14号接近</span>
          <Link
            href="/console/incident"
            className="pill pillWarn"
            title="台風第14号接近。条件付きと、確認できていない施設が残っている"
          >
            注意
          </Link>
          <Link href="/console/assistant" className="btn btnPrimary deskOnly">
            AIに質問
          </Link>
        </div>
      </header>
      <div className="bodyRow">
        <nav className="nav" aria-label="コンソール">
          {NAV.map((item) => {
            const current = isCurrent(item.href, path);
            const count = countOf(item.badge);
            return (
              <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined}>
                {item.label}
                {count > 0 ? <span className="badge">{count}</span> : null}
              </Link>
            );
          })}
          <div className="navFoot deskOnly">
            <strong>翠嶺市</strong>
            兼務1人の画面
          </div>
        </nav>
        <main className="main">{children}</main>
      </div>
      <nav className="phoneBar" aria-label="主な画面">
        {TABS.map((item) => {
          const current = isCurrent(item.href, path);
          const count = countOf(item.badge);
          return (
            <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined}>
              <span>{item.label}</span>
              {count > 0 ? <span className="badge">{count}</span> : null}
            </Link>
          );
        })}
        <button type="button" aria-expanded={more} aria-current={moreCurrent ? "page" : undefined} onClick={() => setMore(true)}>
          その他
        </button>
      </nav>
      {more ? (
        <>
          <button type="button" className="moreBackdrop" aria-label="閉じる" onClick={() => setMore(false)} />
          <section className="moreSheet" role="dialog" aria-label="その他">
            <Link
              href="/console/assistant"
              className="btn btnPrimary moreLead"
              aria-current={path.startsWith("/console/assistant") ? "page" : undefined}
            >
              AIに質問
            </Link>
            {MORE.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isCurrent(item.href, path) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </section>
        </>
      ) : null}
    </div>
  );
}
