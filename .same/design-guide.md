# 靈鷲山朝山之旅 - 設計指南

## 🎨 設計原則

### 色彩系統
- **主色調**：溫暖的琥珀色系（amber）和石色（stone）
- **文章背景**：棕褐色漸層 (amber-50 → orange-50 → amber-100)
- **文字顏色**：深石色 (stone-800, stone-700)
- **強調色**：琥珀金色 (amber-600, amber-900)

### 排版規則
- **移動版換行**：必須在語意停頓點（逗號、句號）使用 `<br className="md:hidden"/>`
- **關鍵詞保護**：使用 `<span className="whitespace-nowrap">` 保護重要詞組不被拆散
- **字體**：
  - 標題：font-serif (Noto Serif TC)
  - 內文：font-light, tracking-wide
  - 行距：leading-relaxed 或 lineHeight: 2

### 視覺效果
- **紙質紋理**：35% 透明度，mix-blend-multiply
- **手工紙邊緣**：40% 透明度
- **圖片濾鏡**：warm-desaturate (飽和度降低 40%)
- **文字陰影**：多層次陰影確保可讀性

## 🖼️ 圖片處理

### Banner 圖片要求
- **格式**：JPG
- **大小**：< 500KB（重要！）
- **解析度**：1920x1080 或更高
- **優化工具**：TinyPNG 或 Squoosh

### 圖片上傳流程 ⚠️ 重要

**唯一可行的方法（已驗證）：**
1. 用戶上傳圖片到 GitHub repo
2. 用戶提供原始連結（raw.githubusercontent.com）
3. AI 使用 `curl` 下載到 `public/images/`

**❌ 以下方法在這個專案中不可行：**
- ❌ Same 文件管理器上傳（此 session 無法使用）
- ❌ 拖放到聊天窗口（只能查看，無法保存）
- ❌ 任何其他上傳方式

**✅ 請勿重複建議上述無效方法！直接使用 GitHub + curl 流程。**

**標準指令：**
```bash
cd pilgrimage-journey/public/images && \
curl -L -o [檔名].jpg "[GitHub raw URL]" && \
ls -lh [檔名].jpg
```

## 📱 響應式設計

### 斷點
- **移動版**：< 768px (md)
- **桌面版**：≥ 768px

### 移動版特殊處理
- 導航欄：漢堡選單
- 引言：逗號後換行
- 文章段落：在語意停頓點換行
- 圖片：保持原始比例

## 🎭 組件規範

### FadeCarousel
- **轉場時間**：2.5 秒
- **自動播放間隔**：10 秒
- **用戶操作後**：停止自動播放

### FloatingNav
- **初始狀態**：py-5, logo 12px
- **滾動後**：py-3, logo 9px (縮小 15%)
- **觸發閾值**：80vh
- **Banner 背景**：透明黑 (bg-black/20)
- **內容區背景**：米白 (bg-stone-100/95)

### TextOverlay 位置
- **center**：一般頁面
- **bottom**：需要展示上方圖像時
- **spaciousLayout**：Page 5 特殊佈局

## 🚀 性能優化

### 圖片載入
- Page 1：priority={true}, eager loading
- 其他頁面：lazy loading
- 所有圖片：decoding="async"

### 背景色
- 圖片容器：bg-stone-900（避免空白閃現）
- 過渡效果：transition-opacity duration-300

## 📝 內容原則

### 文字意境
- 保持詩意和禪意
- 使用對句和排比
- 重視留白和節奏感

### 引號使用
- 重要概念：「」
- 引用文字：「」
- 英文內容：""

## 🔧 工作流程

### Git Workflow
```bash
# 提交前必須檢查
git status
git diff
git log --oneline -5

# 提交訊息格式
feat/fix/style: 簡短描述

詳細說明...

🤖 Generated with Same (https://same.new)
Co-Authored-By: Same <noreply@same.new>
```

### 版本控制
- 每次重大修改：創建版本
- Changelog：使用中文，3-5 點
- 版本標題：簡潔明確

## 🎯 品牌元素

### Logo
- 圓形漸層背景（amber-400 → amber-500）
- 白色山形圖標
- 品牌名稱：「靈鷲山」

### Slogan
- 主標：「山海朝聖 · 覺性回歸」
- 引言：「承兩千年法乳之長流，啟太平洋靈鷲之新章。」

## 📚 技術棧

- **框架**：Next.js 15 + TypeScript
- **樣式**：Tailwind CSS + shadcn/ui
- **動畫**：Framer Motion
- **包管理**：Bun
- **部署**：Netlify

---

**最後更新**：2026-03-13
**維護者**：093ljm
