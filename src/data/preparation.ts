// ============================================================
// 行前準備 — 資料檔
// ------------------------------------------------------------
// ★ 給維護人員：本頁分三個部分，更新時只要改這個檔案。
//
//   1. clothingItems   穿著建議（上身／鞋子／避免事項）
//   2. carryItems      隨身物品（必備／建議）
//   3. arrivalOptions  抵達方式（自行開車／接駁車／火車，各自的朝山起點）
//   4. beforeYouGo     出發前須知（申請、天氣、安全）
//
//   ※ ritualSteps（當天節奏／朝山儀軌三段）目前「未顯示」在頁面上，
//     資料保留於本檔最下方，日後要恢復時再於 preparation/page.tsx 引用即可。
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
    desc: "朝山途中不戴帽子，改以頭巾遮陽；也避免過於暴露或緊身的服裝，既不便於禮拜，也不合朝山的莊重。",
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
  { id: "i1", name: "頭巾", note: "朝山不戴帽，以頭巾遮陽", essential: true },
  { id: "i2", name: "袖套", note: "海邊反射光強，遮陽護臂", essential: true },
  { id: "i3", name: "手套", note: "伏地禮拜時保護雙手", essential: true },
  { id: "i4", name: "護膝", note: "一路跪拜，保護膝蓋", essential: true },
  { id: "i5", name: "水壺", note: "補充水分，隨走隨飲", essential: true },
  { id: "i6", name: "毛巾", note: "擦汗，也可護額、墊手", essential: true },
  { id: "i7", name: "雨衣", note: "山區天氣多變，備而不用", essential: false },
  { id: "i8", name: "個人藥品", note: "常備用藥請隨身攜帶", essential: false },
  { id: "i9", name: "糖果", note: "隨身備幾顆，避免低血糖", essential: false },
];

// ------------------------------------------------------------
// 三、抵達方式
//     ★ 不同的抵達方式，朝山起點不同。
//     icon 只能填 "car" | "shuttle" | "train"（對應頁面上的圖示）
// ------------------------------------------------------------
export interface ArrivalOption {
  id: string;
  mode: string; // 抵達方式名稱
  icon: "car" | "shuttle" | "train";
  start: string; // 朝山起點
  desc: string; // 停車、集合與路程說明
}
export const arrivalOptions: ArrivalOption[] = [
  {
    id: "a1",
    mode: "自行開車",
    icon: "car",
    start: "地藏廣場",
    desc: "個人前往，可停放於聖山寺金佛園區或靈鷲山福城。小型車可直接停在地藏廣場，停妥即由此起拜；人車較多時請改停拱南宮，依交通組現場指引調度。",
  },
  {
    id: "a2",
    mode: "接駁車",
    icon: "shuttle",
    start: "地藏廣場",
    desc: "接駁車直達地藏廣場（紅色鐵皮屋），下車後於此集合起拜，至天眼門約一個半小時。",
  },
  {
    id: "a3",
    mode: "火車",
    icon: "train",
    start: "濱海公路口",
    desc: "搭火車至福隆站，出站後往宜蘭方向的濱海公路口，由此開始朝山，至天眼門約四小時。",
  },
];

// ------------------------------------------------------------
// 三之一、導航連結（Google 地圖）
//     ★ 這裡只是「純連結」，沒有嵌入地圖，所以完全不影響頁面載入速度。
//     ★ 點擊後在新分頁開啟，使用者不會離開本站。
//     ★ 要換地點時，把 query= 後面改成地點名稱或地址即可。
// ------------------------------------------------------------
export interface MapLink {
  id: string;
  label: string;
  note: string; // 完整地址
  url: string;
}
export const mapLinks: MapLink[] = [
  {
    id: "m1",
    label: "靈鷲山福城",
    note: "新北市貢寮區東興街29-3號",
    url: "https://www.google.com/maps/search/?api=1&query=靈鷲山福城 新北市貢寮區東興街29-3號",
  },
  {
    id: "m2",
    label: "聖山寺金佛園區",
    note: "新北市貢寮區東興街30-1號",
    url: "https://www.google.com/maps/search/?api=1&query=靈鷲山聖山寺金佛園區 新北市貢寮區東興街30-1號",
  },
  {
    id: "m3",
    label: "拱南宮",
    note: "新北市貢寮區桂安街1-1號",
    url: "https://www.google.com/maps/search/?api=1&query=福隆拱南宮 新北市貢寮區桂安街1-1號",
  },
  {
    id: "m4",
    label: "福隆車站",
    note: "新北市貢寮區福隆街2號",
    url: "https://www.google.com/maps/search/?api=1&query=福隆車站",
  },
  {
    id: "m5",
    label: "靈鷲山無生道場",
    note: "新北市貢寮區香蘭街7-1號",
    url: "https://www.google.com/maps/search/?api=1&query=靈鷲山無生道場 新北市貢寮區香蘭街7-1號",
  },
];

// ------------------------------------------------------------
// 四、出發前須知
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
// 四、當天的節奏（朝山儀軌三段）※ 目前頁面未顯示，保留備用
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
