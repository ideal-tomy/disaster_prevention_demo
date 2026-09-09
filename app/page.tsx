import Link from "next/link";
import { StillFrame } from "@/components/StillFrame";

export default function HomePage() {
  return (
    <div className="lp appMin">
      <header className="lpBar">
        <div className="brand">
          <span className="brandMark">嶺</span>
          防災施設コンソール
        </div>
      </header>
      <section className="lpHero">
        <div>
          <p className="lpEyebrow">防災施設コンソール</p>
          <h1>災害の日に必要な情報は、普段の点検記録の中にある。</h1>
          <p>総合体育館、公民館、福祉センター。普段の点検が、避難所として使えるかの答えになる。翠嶺市のデモです。</p>
          <div className="ctaRow">
            <Link className="btn btnPrimary" href="/console">
              コンソールを開く
            </Link>
            <Link className="btn btnGhost" href="/console/facilities">
              平常と災害を切り替える
            </Link>
          </div>
          <div className="lpMeta">
            <span>翠嶺市</span>
            <span>22施設</span>
            <span>指定避難所21</span>
          </div>
        </div>
        <div className="heroCard">
          <StillFrame src="/img/a1.png" fileName="a1.png" ratio="portrait" />
          <p className="heroCap">翠嶺市総合体育館 · 外観</p>
        </div>
      </section>
      <p className="lpFoot">切替と、総合体育館のインシデントまで、およそ2分。</p>
    </div>
  );
}
