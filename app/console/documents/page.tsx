import { DOC_MAP, LEDGER_DOC, OPENING_DOC } from "@/data/suirei";

export default function DocumentsPage() {
  return (
    <section>
      <div className="pageHead">
        <h2>書類</h2>
        <p>同じ記録から、開設の下書きと点検簿</p>
      </div>
      <div className="docGrid">
        <article className="card docSheet">
          <h3>避難所開設の記録（下書き）</h3>
          {OPENING_DOC.map(([label, value]) => (
            <div className="docRow" key={label}>
              <span>{label}</span>
              <div>{value}</div>
            </div>
          ))}
        </article>
        <article className="card docSheet">
          <h3>施設点検記録簿（抜粋）</h3>
          {LEDGER_DOC.map(([label, value]) => (
            <div className="docRow" key={label}>
              <span>{label}</span>
              <div>{value}</div>
            </div>
          ))}
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
          {DOC_MAP.map(([left, right]) => (
            <tr key={left}>
              <td>{left}</td>
              <td>{right}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <button type="button" className="btn btnGhost" disabled title="このデモでは出しません">
          印刷
        </button>
      </p>
    </section>
  );
}
