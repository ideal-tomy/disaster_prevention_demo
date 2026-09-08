export const DEMO_NOW = "2026/09/12 14:52";
export const DEMO_CLOCK = "14:52";
export const DEMO_DATE = "2026/09/12";

export type DueKind = "overdue" | "thisMonth" | "recorded" | "none";
export type Judgment = "usable" | "conditional" | "unusable" | "unknown";

export type CheckCells = {
  fire: string;
  gen: string;
  tank: string;
  wall: string;
  door: string;
};

export type Facility = {
  id: string;
  name: string;
  kind: string;
  capacity: number | null;
  stock: string;
  water: string;
  record: string;
  due: DueKind;
  judgment: Judgment;
  shelter: boolean;
  reason: string;
  cells: CheckCells;
  map: { x: number; y: number };
};

export const FACILITIES: Facility[] = [
  {
    id: "F01",
    name: "翠嶺市総合体育館",
    kind: "総合体育館",
    capacity: 720,
    stock: "5日",
    water: "なし",
    record: "非常用発電機 期限切れ（2026/08/28）。非常口前に備品",
    due: "overdue",
    judgment: "conditional",
    shelter: true,
    reason: "発電機 2026/08/28 · 非常口",
    cells: { fire: "備品", gen: "期限切れ", tank: "記録", wall: "—", door: "—" },
    map: { x: 48, y: 36 }
  },
  {
    id: "F10",
    name: "北公民館",
    kind: "公民館",
    capacity: 120,
    stock: "3日",
    water: "なし",
    record: "2026/08/14 点検済み",
    due: "recorded",
    judgment: "usable",
    shelter: true,
    reason: "2026/08/14 点検済み",
    cells: { fire: "済", gen: "済", tank: "記録", wall: "済", door: "済" },
    map: { x: 50, y: 16 }
  },
  {
    id: "F11",
    name: "南公民館",
    kind: "公民館",
    capacity: 100,
    stock: "3日",
    water: "なし",
    record: "2026/08/11 点検済み",
    due: "recorded",
    judgment: "usable",
    shelter: true,
    reason: "2026/08/11 点検済み",
    cells: { fire: "済", gen: "済", tank: "記録", wall: "済", door: "済" },
    map: { x: 52, y: 72 }
  },
  {
    id: "F12",
    name: "東公民館",
    kind: "公民館",
    capacity: 90,
    stock: "2日",
    water: "なし",
    record: "外壁の剥離。2026/06/03 記録。開設に使わない",
    due: "overdue",
    judgment: "unusable",
    shelter: true,
    reason: "外壁の剥離（2026/06/03）",
    cells: { fire: "済", gen: "済", tank: "記録", wall: "剥離", door: "済" },
    map: { x: 74, y: 40 }
  },
  {
    id: "F13",
    name: "西公民館",
    kind: "公民館",
    capacity: 110,
    stock: "3日",
    water: "なし",
    record: "2026/09/01 点検済み",
    due: "recorded",
    judgment: "usable",
    shelter: true,
    reason: "2026/09/01 点検済み",
    cells: { fire: "済", gen: "済", tank: "記録", wall: "済", door: "済" },
    map: { x: 26, y: 40 }
  },
  {
    id: "F14",
    name: "中央公民館",
    kind: "公民館",
    capacity: 140,
    stock: "4日",
    water: "なし",
    record: "消火器の位置が図面と違う。消防設備の期限は 2026/09/30",
    due: "thisMonth",
    judgment: "conditional",
    shelter: true,
    reason: "消火器の位置",
    cells: { fire: "位置", gen: "済", tank: "記録", wall: "済", door: "済" },
    map: { x: 46, y: 48 }
  },
  {
    id: "F15",
    name: "緑が丘公民館",
    kind: "公民館",
    capacity: 100,
    stock: "記録なし",
    water: "記録なし",
    record: "記録なし",
    due: "none",
    judgment: "unknown",
    shelter: true,
    reason: "記録がない",
    cells: { fire: "—", gen: "—", tank: "—", wall: "—", door: "—" },
    map: { x: 34, y: 78 }
  },
  {
    id: "F16",
    name: "川辺公民館",
    kind: "公民館",
    capacity: 80,
    stock: "2日",
    water: "なし",
    record: "2026/07/29 点検済み",
    due: "recorded",
    judgment: "usable",
    shelter: true,
    reason: "2026/07/29 点検済み",
    cells: { fire: "済", gen: "済", tank: "記録", wall: "済", door: "済" },
    map: { x: 64, y: 80 }
  },
  {
    id: "F17",
    name: "桜公民館",
    kind: "公民館",
    capacity: 100,
    stock: "3日",
    water: "なし",
    record: "2026/08/25 点検済み",
    due: "recorded",
    judgment: "usable",
    shelter: true,
    reason: "2026/08/25 点検済み",
    cells: { fire: "済", gen: "済", tank: "記録", wall: "済", door: "済" },
    map: { x: 38, y: 62 }
  },
  {
    id: "F18",
    name: "丘陵公民館",
    kind: "公民館",
    capacity: 90,
    stock: "記録なし",
    water: "記録なし",
    record: "記録なし",
    due: "none",
    judgment: "unknown",
    shelter: true,
    reason: "記録がない",
    cells: { fire: "—", gen: "—", tank: "—", wall: "—", door: "—" },
    map: { x: 70, y: 22 }
  },
  {
    id: "F19",
    name: "南丘公民館",
    kind: "公民館",
    capacity: 95,
    stock: "3日",
    water: "なし",
    record: "2026/09/04 点検済み",
    due: "recorded",
    judgment: "usable",
    shelter: true,
    reason: "2026/09/04 点検済み",
    cells: { fire: "済", gen: "済", tank: "記録", wall: "済", door: "済" },
    map: { x: 58, y: 64 }
  },
  {
    id: "F21",
    name: "北福祉センター",
    kind: "福祉センター",
    capacity: 160,
    stock: "4日",
    water: "なし",
    record: "2026/09/03 点検済み。要配慮者の部屋あり",
    due: "recorded",
    judgment: "usable",
    shelter: true,
    reason: "2026/09/03 点検済み",
    cells: { fire: "済", gen: "済", tank: "記録", wall: "済", door: "済" },
    map: { x: 42, y: 24 }
  },
  {
    id: "F22",
    name: "南福祉センター",
    kind: "福祉センター",
    capacity: 150,
    stock: "3日",
    water: "なし",
    record: "受水槽の残留塩素が記録の下限近く",
    due: "thisMonth",
    judgment: "conditional",
    shelter: true,
    reason: "受水槽 残留塩素",
    cells: { fire: "済", gen: "済", tank: "下限近", wall: "済", door: "済" },
    map: { x: 60, y: 74 }
  },
  {
    id: "F20",
    name: "翠嶺市庁舎",
    kind: "市庁舎",
    capacity: null,
    stock: "職員用",
    water: "なし",
    record: "2026/09/05 点検済み",
    due: "recorded",
    judgment: "usable",
    shelter: false,
    reason: "指定避難所ではない",
    cells: { fire: "済", gen: "済", tank: "記録", wall: "済", door: "済" },
    map: { x: 50, y: 50 }
  },
  {
    id: "F02",
    name: "南小学校体育館",
    kind: "小学校体育館",
    capacity: 280,
    stock: "5日",
    water: "なし",
    record: "2026/09/02 点検済み",
    due: "recorded",
    judgment: "usable",
    shelter: true,
    reason: "2026/09/02 点検済み",
    cells: { fire: "済", gen: "済", tank: "記録", wall: "済", door: "済" },
    map: { x: 48, y: 84 }
  },
  {
    id: "F03",
    name: "東小学校体育館",
    kind: "小学校体育館",
    capacity: 260,
    stock: "4日",
    water: "なし",
    record: "2026/08/19 点検済み",
    due: "recorded",
    judgment: "usable",
    shelter: true,
    reason: "2026/08/19 点検済み",
    cells: { fire: "済", gen: "済", tank: "記録", wall: "済", door: "済" },
    map: { x: 78, y: 52 }
  },
  {
    id: "F04",
    name: "西小学校体育館",
    kind: "小学校体育館",
    capacity: 240,
    stock: "4日",
    water: "なし",
    record: "2026/08/21 点検済み",
    due: "recorded",
    judgment: "usable",
    shelter: true,
    reason: "2026/08/21 点検済み",
    cells: { fire: "済", gen: "済", tank: "記録", wall: "済", door: "済" },
    map: { x: 20, y: 54 }
  },
  {
    id: "F05",
    name: "中央小学校体育館",
    kind: "小学校体育館",
    capacity: 360,
    stock: "5日",
    water: "なし",
    record: "2026/09/04 点検済み",
    due: "recorded",
    judgment: "usable",
    shelter: true,
    reason: "2026/09/04 点検済み",
    cells: { fire: "済", gen: "済", tank: "記録", wall: "済", door: "済" },
    map: { x: 40, y: 56 }
  },
  {
    id: "F06",
    name: "緑小学校体育館",
    kind: "小学校体育館",
    capacity: 300,
    stock: "3日",
    water: "なし",
    record: "受水槽 水位が下限近く。給水は可",
    due: "thisMonth",
    judgment: "conditional",
    shelter: true,
    reason: "受水槽 水位",
    cells: { fire: "済", gen: "済", tank: "下限近", wall: "済", door: "済" },
    map: { x: 28, y: 70 }
  },
  {
    id: "F07",
    name: "桜小学校体育館",
    kind: "小学校体育館",
    capacity: 220,
    stock: "2日",
    water: "なし",
    record: "外壁のひび。西側扉が閉まり切らない（2026/07/16）",
    due: "overdue",
    judgment: "unusable",
    shelter: true,
    reason: "外壁のひび · 扉",
    cells: { fire: "済", gen: "済", tank: "記録", wall: "ひび", door: "隙間" },
    map: { x: 32, y: 86 }
  },
  {
    id: "F08",
    name: "川辺小学校体育館",
    kind: "小学校体育館",
    capacity: 240,
    stock: "記録なし",
    water: "記録なし",
    record: "記録なし",
    due: "none",
    judgment: "unknown",
    shelter: true,
    reason: "記録がない",
    cells: { fire: "—", gen: "—", tank: "—", wall: "—", door: "—" },
    map: { x: 72, y: 82 }
  },
  {
    id: "F09",
    name: "北中学校体育館",
    kind: "中学校体育館",
    capacity: 480,
    stock: "5日",
    water: "なし",
    record: "2026/09/08 点検済み",
    due: "recorded",
    judgment: "usable",
    shelter: true,
    reason: "2026/09/08 点検済み",
    cells: { fire: "済", gen: "済", tank: "記録", wall: "済", door: "済" },
    map: { x: 56, y: 18 }
  }
];

export const DASHBOARD = {
  facilities: 22,
  shelters: 21,
  usableShelters: 12,
  usableCapacity: 2385,
  conditional: 4,
  unusable: 2,
  unknown: 3,
  incidentId: "INC-20260912-007",
  integrations: "5 / 8"
} as const;

export const INCIDENT = {
  id: "INC-20260912-007",
  facilityId: "F01",
  facilityName: "翠嶺市総合体育館",
  judgment: "conditional" as Judgment,
  headline: "搬入口の車両と、発電機の期限切れが同じ体育館に残っている",
  confidence: 81,
  confidenceNote: "抽出静止画と平常時の記録が、同じ施設を指している確からしさ",
  conclusion:
    "東側の搬入口が車両で狭く、西側の非常口前に備品がある。夜間の電源は、発電機の点検期限が 2026/08/28 で切れており確認できていない。条件付きで使える。白天に開設するなら、搬入口の車両と非常口前の備品を先にどかす。",
  frames: [
    {
      id: "b1",
      time: "14:08",
      ago: "44分前",
      cameraId: "CAM-総合-E01",
      file: "/img/b1.png",
      fileName: "b1.png",
      place: "東側搬入口",
      label: "車両 白バン",
      caption: "白バンが搬入口をふさいでいる",
      note: "運転者もナンバーも見ていない",
      box: { left: 24, top: 37, width: 28, height: 34 }
    },
    {
      id: "b2",
      time: "14:21",
      ago: "31分前",
      cameraId: "CAM-総合-N02",
      file: "/img/b2.png",
      fileName: "b2.png",
      place: "体育館入口",
      label: "人物 8名",
      caption: "入口に8人いる",
      note: "個人は分からない。開設前に人が来ている",
      box: { left: 18, top: 41, width: 30, height: 16 }
    },
    {
      id: "b3",
      time: "14:36",
      ago: "16分前",
      cameraId: "CAM-総合-W03",
      file: "/img/b3.png",
      fileName: "b3.png",
      place: "西側非常口",
      label: "備品",
      caption: "非常口の前に備品がある",
      note: "2026/09/09 の「対応が必要」と同じ場所",
      box: { left: 24, top: 53, width: 27, height: 27 }
    }
  ],
  records: [
    "2026/03/18 高木がファイル。非常用発電機の業者紙。次回点検 2026/08/28。期限切れ（K-G3）",
    "2026/09/09 高木が画像確認で「対応が必要」。非常口前の備品（K-F4）"
  ],
  actions: [
    "受付予定と、体育館入口に来ている人の数を照合する（予約台帳は未接続）",
    "東側搬入口の車両をどかせるか、体育施設係に確認する",
    "非常口前の備品をどかす（2026/09/09 の「対応が必要」が未了）",
    "発電機の業者紙を見て、今夜の電源を別施設にするか決める。第一の代替は北中学校体育館（点検 2026/09/08、使える、収容 480）"
  ],
  nodes: ["搬入口", "体育館入口", "非常口", "点検記録"]
} as const;

export type ReviewDecision = "needed" | "ok" | "pending";

export type ReviewItem = {
  id: "exit" | "van" | "extinguisher";
  facilityId: string;
  facilityName: string;
  place: string;
  file: string;
  fileName: string;
  knowledge: string;
  label?: string;
  box?: { left: number; top: number; width: number; height: number };
  ratio?: "wide" | "photo";
  initial: ReviewDecision;
  decidedNote?: string;
};

export const REVIEW_ITEMS: ReviewItem[] = [
  {
    id: "exit",
    facilityId: "F01",
    facilityName: "翠嶺市総合体育館",
    place: "非常口前の備品",
    file: "/img/c1.png",
    fileName: "c1.png",
    knowledge: "K-F4",
    ratio: "photo",
    initial: "needed",
    decidedNote: "対応が必要（2026/09/09 高木）"
  },
  {
    id: "van",
    facilityId: "F01",
    facilityName: "翠嶺市総合体育館",
    place: "東側搬入口",
    file: "/img/b1.png",
    fileName: "b1.png",
    knowledge: "K-D3",
    label: "車両 白バン",
    initial: "pending",
    box: { left: 24, top: 37, width: 28, height: 34 }
  },
  {
    id: "extinguisher",
    facilityId: "F14",
    facilityName: "中央公民館",
    place: "消火器の位置",
    file: "/img/c2.png",
    fileName: "c2.png",
    knowledge: "K-F2",
    label: "消火器",
    ratio: "photo",
    initial: "pending",
    box: { left: 49, top: 44, width: 20, height: 38 }
  }
];

export const QA = {
  fallback:
    "このデモでは、開設できる場所と、翠嶺市総合体育館の記録だけを固定の文で返しています。",
  chips: [
    {
      id: "q1",
      q: "今、開設できる避難所はどこですか",
      a: "使える指定避難所は 12。収容の合計は 2,385。確認できていない 3 と、条件付き 4 は入れていません。\n\n収容が大きい順の先頭は、北中学校体育館（480、点検 2026/09/08）、中央小学校体育館（360）、南小学校体育館（280）です。\n\n翠嶺市総合体育館は条件付きです。搬入口の車両、非常口前の備品、発電機の期限切れ（2026/08/28）が理由です。使えないのは桜小学校体育館と東公民館です。理由は平常時の外壁と扉の記録です。\n\n決めるのは人です。この回答は 2026/09/12 14:52 のモックです。"
    },
    {
      id: "q2",
      q: "総合体育館は使えますか",
      a: "条件付きで使えます。使えない、ではありません。\n\n理由は3つです。東側搬入口を白バンがふさいでいること（14:08、CAM-総合-E01）。西側非常口の前に備品があること（2026/09/09 に高木が対応が必要と入力。14:36 の静止画は同じ場所）。非常用発電機の点検期限が 2026/08/28 で切れていること。\n\n夜間の電源は確認できていません。白天に開設するなら、車両と備品を先にどかしてください。代替は北中学校体育館です。"
    },
    {
      id: "q3",
      q: "確認できていない施設はなぜ残していますか",
      a: "川辺小学校体育館、緑が丘公民館、丘陵公民館には、消防・発電機・受水槽・外壁・扉の記録がありません。台帳に収容人数があっても、開設の判定には使っていません。記録がない施設を、画面が埋めないためです。"
    }
  ]
} as const;

export const OPENING_DOC = [
  ["文書名", "避難所開設の記録（下書き）"],
  ["市", "翠嶺市"],
  ["日時", "2026/09/12 14:52"],
  ["施設", "翠嶺市総合体育館"],
  ["判定", "条件付きで使える"],
  ["収容（台帳）", "720"],
  ["いまの条件", "東側搬入口の車両をどかす。西側非常口前の備品をどかす。夜間電源は未確認"],
  ["根拠1", "2026/03/18 点検記録。発電機 次回 2026/08/28。K-G3"],
  ["根拠2", "2026/09/09 画像確認。非常口前の備品。対応が必要。高木（総務）。K-F4"],
  ["根拠3", "2026/09/12 14:08 抽出静止画。CAM-総合-E01。車両 白バン"],
  ["確認者", "未確定。高木が押すまで空欄"],
  ["注記", "モック。開設の決定ではない"]
] as const;

export const LEDGER_DOC = [
  ["文書名", "施設点検記録簿（抜粋）"],
  ["施設", "翠嶺市総合体育館"],
  ["記録日", "2026/03/18"],
  ["記録者", "高木（総務）"],
  ["消防設備", "非常口前の備品あり。2026/09/09 追加。K-F4"],
  ["非常用発電機", "業者紙をファイル。次回点検 2026/08/28。K-G3"],
  ["受水槽", "2026/03/18 時点、水位は下限を超えていた。断水の記録なし"],
  ["外壁", "—"],
  ["扉", "常用扉の記録なし。搬入口は 2026/09/12 の静止画のみ"]
] as const;

export const DOC_MAP = [
  ["発電機 次回 2026/08/28", "夜間電源は未確認"],
  ["非常口前の備品、対応が必要", "西側非常口前の備品をどかす"],
  ["当日の静止画。記録簿の追記候補", "東側搬入口の車両"]
] as const;

export const INTEGRATIONS = [
  { name: "施設台帳", status: "connected" as const, note: "22施設の名前と種別" },
  { name: "備蓄台帳", status: "connected" as const, note: "日数。記録がない施設は空欄" },
  { name: "消防設備の点検紙", status: "connected" as const, note: "期限と位置の指摘" },
  { name: "点検記録の転記", status: "connected" as const, note: "高木がファイルした日付" },
  { name: "受水槽・給水", status: "connected" as const, note: "水位と残留塩素。断水の有無" },
  { name: "非常用発電機", status: "checking" as const, note: "業者紙はある。試験の値が項目としてそろっていない" },
  { name: "固定カメラの静止画", status: "checking" as const, note: "総合体育館の3台だけ抽出できている。公民館と学校は未接続" },
  { name: "外壁・躯体", status: "unlinked" as const, note: "紙のまま。桜小学校体育館と東公民館は手入力の記録だけ" }
];

export function dueLabel(due: DueKind): string {
  if (due === "overdue") return "期限切れ";
  if (due === "thisMonth") return "今月";
  if (due === "recorded") return "記録済み";
  return "記録なし";
}

export function judgmentLabel(j: Judgment): string {
  if (j === "usable") return "使える";
  if (j === "conditional") return "条件付きで使える";
  if (j === "unusable") return "使えない";
  return "確認できていない";
}

export function formatCapacity(n: number): string {
  return n.toLocaleString("ja-JP");
}
