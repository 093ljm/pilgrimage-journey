// ============================================================
// 近期活動 — 資料檔
// ------------------------------------------------------------
// ★ 給維護人員：要更新活動，只要修改這個檔案就好，不用動其他程式。
//   照著下面的範例格式，複製一段、修改文字即可。
//   圖片請放在 public/images/ 資料夾，這裡填 "/images/檔名.jpg"。
// ============================================================

// 「近期朝山活動」每一筆的格式
export interface ActivityItem {
  id: string;        // 唯一代號（隨意，不重複即可，例如 a1、a2）
  title: string;     // 活動名稱
  date: string;      // 活動日期（文字即可，例如「2026/07/06」或「每月首週日」）
  location: string;  // 地點
  desc: string;      // 活動簡介
  image: string;     // 活動圖片路徑（例如 "/images/page4-monks-pilgrimage.jpg"）
}

// 「區會朝山活動」每一筆的格式（時間表用，較精簡）
export interface RegionalActivity {
  id: string;
  region: string;    // 區會名稱（例如「台北區會」）
  date: string;      // 日期
  location: string;  // 地點
}

// 「朝山活動回顧」每一筆的格式
export interface ActivityReview {
  id: string;
  title: string;     // 回顧標題
  date: string;      // 舉辦日期
  image: string;     // 回顧照片
  summary: string;   // 簡短回顧文字
}

// ------------------------------------------------------------
// 一、近期朝山活動（即將舉辦）※ 以下為版型示意，請替換為實際活動
// ------------------------------------------------------------
export const upcomingActivities: ActivityItem[] = [
  {
    id: "a1",
    title: "朝山禮拜",
    date: "每月首週日",
    location: "無生道場",
    desc: "三步一拜，沿著環山步道拾級而上，於山海之巔禮敬諸佛，洗滌身心。",
    image: "/images/page4-monks-pilgrimage.jpg",
  },
  {
    id: "a2",
    title: "百萬大悲咒共修",
    date: "每月第二週六",
    location: "華藏海・圓通寶殿",
    desc: "大眾齊聚持誦〈大悲咒〉，以慈悲願力共修，迴向地球平安、眾生安樂。",
    image: "/images/page2-buddha-relief.jpg",
  },
  {
    id: "a3",
    title: "平安禪・斷食閉關",
    date: "2026/08/15 - 08/18",
    location: "下院聖山寺・金佛園區",
    desc: "於寧靜道場中安住身心，透過斷食與禪修，回歸覺性，體驗深層的內在平靜。",
    image: "/images/page5-monk-meditation.jpg",
  },
];

// ------------------------------------------------------------
// 二、區會朝山活動日期（各區會時間表）※ 版型示意
// ------------------------------------------------------------
export const regionalActivities: RegionalActivity[] = [
  { id: "r1", region: "台北區會", date: "2026/07/06（日）", location: "無生道場" },
  { id: "r2", region: "桃園區會", date: "2026/07/20（日）", location: "無生道場" },
  { id: "r3", region: "台中區會", date: "2026/08/03（日）", location: "無生道場" },
  { id: "r4", region: "高雄區會", date: "2026/08/17（日）", location: "無生道場" },
];

// ------------------------------------------------------------
// 三、朝山活動回顧（已舉辦）※ 版型示意
// ------------------------------------------------------------
export const activityReviews: ActivityReview[] = [
  {
    id: "v1",
    title: "2026 新春朝山祈福",
    date: "2026/02/08",
    image: "/images/page1-sunset-tree.jpg",
    summary: "新春之際，逾千名信眾齊聚靈鷲山，以虔誠朝山迎接新的一年，祈願平安。",
  },
  {
    id: "v2",
    title: "浴佛節朝山法會",
    date: "2026/05/11",
    image: "/images/page6-Ljm.jpg",
    summary: "於佛陀聖誕日舉辦浴佛朝山，大眾沐浴佛恩，共沐法喜，場面殊勝莊嚴。",
  },
];
