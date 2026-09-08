"use client";

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

export function ConsoleShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { pendingCount } = useReview();

  return (
    <div className="shell appMin">
      <header className="topbar">
        <div className="topLeft">
          <span className="brandMark" aria-hidden>
            嶺
          </span>
          <div>
            <h1>防災施設コンソール</h1>
            <p>翠嶺市・施設の点検と開設判定</p>
          </div>
        </div>
        <div className="topRight">
          <span className="live">
            <span className="liveDot" />
            LIVE
          </span>
          <span className="clock">{DEMO_CLOCK}</span>
          <span className="dateLine">{DEMO_DATE}</span>
          <span className="dateLine">台風第14号接近</span>
          <Link href="/console/incident" className="pill pillWarn" title="条件付きと、確認できていない施設が残っている">
            注意
          </Link>
          <Link href="/console/assistant" className="btn btnPrimary">
            AIに質問
          </Link>
        </div>
      </header>
      <div className="bodyRow">
        <nav className="nav" aria-label="コンソール">
          {NAV.map((item) => {
            const current = item.href === "/console" ? path === "/console" : path.startsWith(item.href);
            const count = item.badge === "incident" ? 1 : item.badge === "review" ? pendingCount : 0;
            return (
              <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined}>
                {item.label}
                {count > 0 ? <span className="badge">{count}</span> : null}
              </Link>
            );
          })}
          <div className="navFoot">
            <strong>翠嶺市</strong>
            DEMO: モックデータ
            <br />
            兼務1人の画面
          </div>
        </nav>
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
