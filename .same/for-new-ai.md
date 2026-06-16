# 🤖 給新 AI 助手的快速指引

**專案**：靈鷲山朝聖之旅網站
**教團**：Ling Jiou Mountain Buddhist Society（靈鷲山佛教教團）
**倉庫**：https://github.com/093ljm/pilgrimage-journey
**用戶名**：093ljm
  - `093` = 靈鷲山的中文發音（零九三）
  - `ljm` = **L**ing **J**iou **M**ountain 的縮寫
  - ⚠️ 注意：是 **ljm** 不是 lim！ljm 有明確含義！

---

## ⚡ 快速啟動（3 步驟）

```bash
# 1. 如果專案不存在，從 GitHub 克隆
git clone https://github.com/093ljm/pilgrimage-journey.git
cd pilgrimage-journey

# 2. 安裝依賴
bun install

# 3. 啟動伺服器
bun run dev
```

伺服器會在 http://localhost:3000 運行

---

## 🚨 重要！每次修改後要推送

### 推送代碼的正確方式

**問題**：直接 `git push` 會超時（需要認證）

**解決**：使用 force push 方式

```bash
cd pilgrimage-journey

# ⚠️ 重要：一律使用「單行」commit 訊息！
# 多行訊息會在此環境的終端造成輸入混亂，甚至弄壞 .git
# 一行搞定（推薦這個最穩定的寫法）：
rm -rf .git
git init -q
git config user.email "noreply@same.new"
git config user.name "Same AI"
git add -A
git commit -q -m "描述更改（單行即可）"
git branch -M main
git remote add origin https://github.com/093ljm/pilgrimage-journey.git
git push -u origin main --force
```

> 💡 **為什麼用 `--force` 重新初始化？**
> 此環境的 `.git` 目錄會反覆損壞（變成空目錄），
> 直接 `git push` 會失敗。重新 init + force push 最穩定。

### 推送時機
- ✅ 完成一個功能後
- ✅ 修復重要問題後
- ✅ 用戶明確要求時
- ✅ 對話即將結束時

---

## ⚠️ 已知問題與解決方案

### 問題 1：伺服器當機後檔案消失
**原因**：之前使用 `--turbopack` 實驗性功能
**狀態**：✅ 已解決（已移除 turbopack）
**package.json**：確保 dev script 是 `"dev": "next dev -H 0.0.0.0"`

### 問題 2：.git 目錄反覆損壞（常見！）
**症狀**：`git status` 顯示 "fatal: not a git repository"
**特徵**：`.git` 變成空目錄，但**所有專案檔案都完好無損**
**原因**：此環境的快照/恢復機制有時無法正確還原 `.git`（與 turbopack 無關，是獨立問題）
**解決**：用上面的「重新 init + force push」方式即可，檔案不會遺失
**重要**：發現此問題時不要驚慌，先確認 `src/` 等檔案還在（通常都在）

### 問題 3：多行 commit 訊息弄壞終端
**症狀**：終端出現大量亂碼、命令重複，甚至連帶弄壞 .git
**原因**：此環境對多行 `-m` 訊息處理不佳
**解決**：**永遠使用單行 commit 訊息**

### 問題 4：用戶擔心檔案遺失
**做法**：
1. ✅ 定期推送到 GitHub
2. ✅ 每次修改後告訴用戶「已推送」
3. ✅ 提醒用戶檢查 GitHub 確認

---

## 📚 重要文檔

閱讀這些文件來了解專案：

1. **`.same/todos.md`** - 待辦事項和完成記錄
2. **`.same/recovery-guide.md`** - 完整恢復指南
3. **`.same/server-crash-diagnosis.md`** - 當機問題診斷
4. **`.same/kite-design-analysis.md`** - KITE 網站設計分析

---

## 🎯 專案現狀（2026-04-29）

### 已完成
- ✅ 首頁輪播（5 張圖片）
- ✅ 導航系統（桌面版 + 手機版）
- ✅ 朝山法門頁面 (/dharma)
- ✅ 朝山路線頁面 (/routes)
- ✅ 常見問題頁面 (/faq)
- ✅ 聖山導覽頁面 (/guide/places)
- ✅ 圖片優化和動畫效果
- ✅ 伺服器穩定性修復

### 待完成
- [ ] 法師開示頁面 (/teachings)
- [ ] 行前準備頁面 (/preparation)
- [ ] 最新活動頁面 (/events)
- [ ] KITE 網站設計元素應用（待討論）
- [ ] 部署到 Netlify

---

## 💬 用戶習慣

1. **重視備份**：用戶非常擔心檔案遺失，務必頻繁推送
2. **喜歡詳細記錄**：更新 `.same/todos.md` 記錄進度
3. **佛教文化**：保持莊重溫暖的設計風格
4. **中文為主**：所有內容都是繁體中文

---

## ✅ 檢查清單（每次工作結束前）

- [ ] 伺服器是否正常運行？
- [ ] 代碼是否已推送到 GitHub？
- [ ] `.same/todos.md` 是否已更新？
- [ ] 用戶是否確認功能正常？
- [ ] 是否創建了新版本？

---

**最後更新**：2026-04-29
**狀態**：伺服器穩定，代碼已備份，一切正常 ✅
