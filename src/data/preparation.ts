// ============================================================
// 行前準備 — 資料檔
// ------------------------------------------------------------
// ★ 給維護人員：本頁分四個部分，更新時只要改這個檔案。
//
//   1. clothingItems   穿著建議（上身／鞋子／避免事項）
//   2. carryItems      隨身物品（必備／建議）
//   3. beforeYouGo     出發前須知（申請、天氣、安全）
//   4. ritualSteps     當天節奏（朝山儀軌三段）
//
//   ★ 零維護原則：請勿寫入會過期的資訊（例如車班時刻、當年度費用）。
//     實務細節一律導向「事先聯繫」，避免信眾撲空。
// ============================================================

// ------------------------------------------------------------
// 一、穿著建議
//     kind: "do" = 建議這樣做（綠勾）／"avoid" = 建議避免（叉）
// ------------------------------------------------------------
export interface ClothingItem {
  id: string;
  label: string; // 項目名稱，例如「服裝」
  desc: string; // 說明文字
  kind: "do" | "avoid";
}

export const clothingItems: ClothingItem[] = [
  {
    id: "c1",
    label: "服裝",
    desc: "輕便、吸汗、易活動，以運動服或寬鬆衣物為佳。",
    kind: "do",
  },
  {
    id: "c2",
    label: "鞋子",
    desc: "止滑、包覆性好的運動鞋或布鞋，山路才走得安穩。",
    kind: "do",
  },
  {
    id: "c3",
    label: "亮色系",
    desc: "單獨前往，或光線不佳時朝山，建議穿著亮色系衣物，讓來往車輛能及早注意到您。",
    kind: "do",
  },
  {
    id: "c4",
    label: "避免",
    desc: "過於暴露或緊身的服裝，既不便於禮拜，也不合朝山的莊重。",
    kind: "avoid",
  },
];

// ------------------------------------------------------------
// 二、隨身物品
//     essential: true = 必備（會標示為「必備」）
// ------------------------------------------------------------
export interface CarryItem {
  id: string;
  name: string;
  note: string; // 一句話說明為什麼要帶
  essential: boolean;
}

export const carryItems: CarryItem[] = [
  { id: "i1", name: "水壺", note: "補充水分，隨走隨飲", essential: true },
  { id: "i2", name: "毛巾", note: "擦汗，也可護額、墊手", essential: true },
  { id: "i3", name: "遮陽帽", note: "山海之間日照直接", essential: true },
  { id: "i4", name: "雨具", note: "山區天氣多變，備而不用", essential: true },
  { id: "i5", name: "護膝", note: "跪拜次數多時，保護膝蓋", essential: false },
  { id: "i6", name: "防曬用品", note: "海邊反射光強", essential: false },
  { id: "i7", name: "個人藥品", note: "常備用藥請隨身攜帶", essential: false },
  { id: "i8", name: "簡單乾糧", note: "路程較長時補充體力", essential: false },
];

// ------------------------------------------------------------
// 三、出發前須知
// ------------------------------------------------------------
export interface BeforeYouGoItem {
  id: string;
  title: string;
  desc: string;
}

export const beforeYouGo: BeforeYouGoItem[] = [
  {
    id: "b1",
    title: "個人前往",
    desc: "不需填寫申請表。建議提前一天通報，讓交通組與安管組同仁知悉。",
  },
  {
    id: "b2",
    title: "團體朝山",
    desc: "20 人以上團體請填寫參訪申請表，以利知會道場相關部門，提供更完善的接待。",
  },
  {
    id: "b3",
    title: "天氣考量",
    desc: "小雨通常照常進行。若遇颱風、豪雨等惡劣天氣，基於安全考量會延期或取消，並提前通知。",
  },
  {
    id: "b4",
    title: "路上安全",
    desc: "朝山時請務必盡量靠右邊朝拜，禮讓來往車輛，確保自身與同行者的安全。",
  },
];

// ------------------------------------------------------------
// 四、當天的節奏（朝山儀軌三段）
//     ※ 完整儀軌內容請見「朝山路線與行儀」頁面
// ------------------------------------------------------------
export interface RitualStep {
  id: string;
  stage: string; // 段落名稱：前行／正行／結行
  en: string;
  items: string[]; // 各段的內容
}

export const ritualSteps: RitualStep[] = [
  {
    id: "r1",
    stage: "前行",
    en: "Opening",
    items: ["念誦〈楊枝淨水讚〉（灑淨）", "持〈大悲咒〉", "念誦發願文"],
  },
  {
    id: "r2",
    stage: "正行",
    en: "Pilgrimage",
    items: ["行進時持誦聖號", "跪拜時持誦懺悔偈", "專注當下，覺知每一步"],
  },
  {
    id: "r3",
    stage: "結行",
    en: "Dedication",
    items: ["迴向", "三皈依"],
  },
];
