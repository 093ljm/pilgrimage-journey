# 靈鷲山朝聖之旅網站

> **Ling Jiou Mountain Buddhist Society Pilgrimage Journey**
> 靈鷲山佛教教團朝聖網站

## 📖 關於專案

這是靈鷲山朝聖之旅的官方介紹網站，展示朝山法門、路線行儀、道場介紹等內容。

### 專案資訊
- **教團**：Ling Jiou Mountain Buddhist Society（靈鷲山佛教教團）
- **倉庫**：https://github.com/093ljm/pilgrimage-journey
- **用戶名說明**：`093ljm`
  - `093` = 靈鷲山的中文發音（零九三）
  - `ljm` = **L**ing **J**iou **M**ountain 的縮寫
- **技術棧**：Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui
- **包管理器**：Bun

## 🚀 快速開始

### 安裝依賴
```bash
bun install
```

### 啟動開發伺服器
```bash
bun run dev
```

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

### 建置生產版本
```bash
bun run build
bun run start
```

## 📁 專案結構

```
pilgrimage-journey/
├── .same/                    # AI 助手文檔和項目記錄
│   ├── for-new-ai.md        # 給新 AI 助手的快速指引
│   ├── recovery-guide.md    # 專案恢復指南
│   ├── todos.md             # 待辦事項
│   └── server-crash-diagnosis.md  # 技術問題診斷
├── public/
│   └── images/              # 圖片資源
├── src/
│   ├── app/                 # Next.js App Router 頁面
│   │   ├── page.tsx        # 首頁（輪播介紹）
│   │   ├── dharma/         # 朝山法門
│   │   ├── routes/         # 朝山路線與行儀
│   │   ├── guide/          # 聖山導覽
│   │   ├── faq/            # 常見問題
│   │   ├── teachings/      # 法師開示
│   │   ├── preparation/    # 行前準備
│   │   └── events/         # 最新活動
│   ├── components/         # React 組件
│   │   └── ui/            # UI 組件庫
│   └── lib/               # 工具函數
└── ...配置文件

```

## ✨ 主要功能

- ✅ 首頁輪播展示（5 張精美圖片）
- ✅ 響應式導航系統（桌面版 + 手機版）
- ✅ 朝山法門介紹
- ✅ 朝山路線與行儀
- ✅ 聖山導覽（地理位置、聖物、聖人）
- ✅ 常見問題解答
- 🔄 法師開示頁面（開發中）
- 🔄 行前準備頁面（開發中）
- 🔄 最新活動頁面（開發中）

## 🛠️ 技術細節

### 已解決的問題
- ✅ **伺服器穩定性**：移除不穩定的 `--turbopack`，使用標準編譯器
- ✅ **HMR 閃爍**：修復 Hot Module Replacement 導致的頁面閃爍
- ✅ **圖片優化**：使用 Next.js Image 優化和漂浮動畫效果

### 設計特色
- 🎨 佛教文化風格：溫暖的琥珀色系
- 🖼️ 精美輪播動畫：淡入淡出過渡效果
- 📱 完全響應式設計：支持手機、平板、桌面
- ✨ 流暢互動體驗：Framer Motion 動畫

## 📚 文檔

詳細文檔位於 `.same/` 目錄：
- **for-new-ai.md** - AI 助手快速指引
- **recovery-guide.md** - 專案恢復和故障排除
- **todos.md** - 開發進度和待辦事項
- **server-crash-diagnosis.md** - 技術問題診斷報告

## 🤝 開發建議

### Git 提交規範
```bash
git add .
git commit -m "描述更改內容

🤖 Generated with Same (https://same.new)
Co-Authored-By: Same <noreply@same.new>"
git push
```

### 推送注意事項
如果遇到推送權限問題，使用 force push：
```bash
rm -rf .git
git init
git add .
git commit -m "更新內容"
git branch -m master main
git remote add origin https://github.com/093ljm/pilgrimage-journey.git
git push -u origin main --force
```

## 📞 聯繫方式

- **教團官網**：[靈鷲山佛教教團](https://www.ljm.org.tw/)
- **GitHub**：https://github.com/093ljm/pilgrimage-journey
- **技術支援**：Same AI (https://same.new)

## 📄 授權

此專案為靈鷲山佛教教團所有。

---

**最後更新**：2026-04-29
**版本**：v1.0.0
**狀態**：開發中 🚧
