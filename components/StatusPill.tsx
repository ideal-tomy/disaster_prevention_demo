import { dueLabel, judgmentLabel, type DueKind, type Judgment } from "@/data/suirei";

type Kind = Judgment | DueKind | "connected" | "checking" | "unlinked";

export function StatusPill({ kind }: { kind: Kind }) {
  const map: Record<Kind, { text: string; cls: string }> = {
    usable: { text: judgmentLabel("usable"), cls: "pill pillOk" },
    conditional: { text: judgmentLabel("conditional"), cls: "pill pillWarn" },
    unusable: { text: judgmentLabel("unusable"), cls: "pill pillStop" },
    unknown: { text: judgmentLabel("unknown"), cls: "pill pillUnknown" },
    overdue: { text: dueLabel("overdue"), cls: "pill pillStop" },
    thisMonth: { text: dueLabel("thisMonth"), cls: "pill pillWarn" },
    recorded: { text: dueLabel("recorded"), cls: "pill pillOk" },
    none: { text: dueLabel("none"), cls: "pill pillUnknown" },
    connected: { text: "接続済み", cls: "pill pillOk" },
    checking: { text: "確認中", cls: "pill pillWarn" },
    unlinked: { text: "未確認", cls: "pill pillUnknown" }
  };
  const item = map[kind];
  return <span className={item.cls}>{item.text}</span>;
}
