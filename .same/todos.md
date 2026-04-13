# 靈鷲山朝聖之旅 - 專案待辦事項

## 已完成 ✅
- [x] 建立專案基礎結構
- [x] 實現首頁輪播圖
- [x] 建立導航系統
- [x] 朝山法門頁面
- [x] 朝山路線與行儀頁面
- [x] 優化圖片載入效果
- [x] 修復 HMR 閃爍問題（將 hasEverTransitioned 從 useRef 改為 useState）

## 進行中 🔄
- [ ] 監控 hydration mismatch 警告來源

## 待處理 📋
- [ ] 法師開示頁面 (/teachings)
- [ ] 行前準備頁面 (/preparation)
- [ ] 最新活動頁面 (/events)
- [ ] 常見問題頁面 (/faq)
- [ ] 部署到 Netlify

## 技術筆記 📝
- HMR 閃爍問題修復：
  - 問題原因：`useRef` 的值在 HMR 時會被重置，而 `useState` 的值會被 React Fast Refresh 保留
  - 解決方案：將 `hasEverTransitioned` 從 `useRef` 改為 `useState`
  - 新增 `isMounted` 狀態追蹤組件是否已掛載
  - 只有在 `isMounted && hasEverTransitioned` 時才播放動畫
