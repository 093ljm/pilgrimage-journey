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

**⭐ 先試「正常推送」（2026-08-04 實測可行，優先用這個）**

```bash
cd pilgrimage-journey
git add -A
git commit -q -m "描述更改（★ 務必單行）"
timeout 90 git push origin main
```

> 只要 `.git` 是完好的（`git status` 正常、`git remote -v` 看得到 origin），
> 正常推送就會成功，**不需要**砍掉重練，也能保留完整 commit 歷史。

**🔧 備援方案（只有在 `.git` 真的壞掉時才用）**

症狀：`git status` 出現 `fatal: not a git repository`，或 `.git` 變成空目錄。

```bash
cd pilgrimage-journey
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

> ⚠️ 這個方法會**清空遠端 commit 歷史**，是不得已的手段，別當成預設流程。

### 推送時機
- ✅ 完成一個功能後
- ✅ 修復重要問題後
- ✅ 用戶明確要求時
- ✅ 對話即將結束時

---

### ⚠️ 關鍵認知：`.git` 可能在「任何時刻」壞掉

2026-08-04 這天實際發生的順序：

1. 接手時 `.git` **完好** → 正常 `git push` 連續成功 2 次 ✅
2. 幾次檔案編輯後，`.git` **突然變成空目錄** → `fatal: not a git repository` ❌
3. 改用備援方案（重新 init + force push）→ 成功，**檔案一個都沒少** ✅

**結論：**
- **不要**預設它一定壞（會白白清掉遠端歷史）
- **也不要**預設它一定好（隨時可能壞）
- **正確做法**：先試正常 push，失敗再用備援方案
- **最重要**：這是為什麼要「頻繁推送」——壞掉時損失才會小

**壞掉時的檢查順序（不要驚慌）：**
```bash
ls -la .git          # 通常是空目錄
ls src/app src/data  # ★ 專案檔案幾乎都還在
```
確認 `src/` 還在，就直接用備援方案重推，什麼都不會丟。

---

## ⚠️ 已知問題與解決方案

### 問題 1：伺服器當機後檔案消失
**原因**：之前使用 `--turbopack` 實驗性功能
**狀態**：✅ 已解決（已移除 turbopack）
**package.json**：確保 dev script 是 `"dev": "next dev -H 0.0.0.0"`

### 問題 2：.git 目錄損壞
**症狀**：`git status` 顯示 "fatal: not a git repository"
**特徵**：`.git` 變成空目錄，但**所有專案檔案都完好無損**
**原因**：此環境的快照/恢復機制有時無法正確還原 `.git`（與 turbopack 無關，是獨立問題）
**解決**：見上方「關鍵認知」，用備援方案重新 init + force push
**重要**：不要驚慌，先確認 `src/` 等檔案還在（實測都在）

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

1. **`.same/todos.md`** - 待辦事項和完成記錄（★ 含「重要設計決策與理由」）
2. **`.same/recovery-guide.md`** - 完整恢復指南
3. **`.same/server-crash-diagnosis.md`** - 當機問題診斷
4. **`.same/design-guide.md`** - 設計指南（色彩、排版、圖片流程）

---

## 🎯 專案現狀（2026-08-04 收工）

### 已完成
- ✅ 首頁輪播（5 張圖片）
- ✅ 導航系統（桌面版 + 手機版）
- ✅ 朝山法門頁面 (/dharma)
- ✅ 朝山路線頁面 (/routes)
- ✅ 常見問題頁面 (/faq) — 共 9 題
- ✅ 法師開示頁面 (/teachings)
- ✅ **活動資訊頁 (/events/info)** — 觀音三會、社群連結、智慧日期、活動回顧
- ✅ **行前準備頁 (/preparation)** — 身／心／事三段準備 + 儀軌節奏
- ✅ **朝山活動回顧** — 可展開全文卡片，首篇檳城朝聖之路
- 🟡 生命故事頁 (/events/stories) — 版型完成，**內容仍是假資料**
- ✅ 圖片優化和動畫效果
- ✅ 伺服器穩定性修復

### 📌 明天（2026-08-05）要做：生命故事頁
**用戶已明確約定：下次從「生命故事」開始。**

詳細接手說明請看 `.same/todos.md` 最上方的「📌 明天的起點」區塊，
裡面寫了要先問用戶哪三件事、建議用什麼版型、資料結構要怎麼改。

### 其他待完成
- [ ] 三個筆記頁面內容（人物／寶物／地點）— 需用戶提供素材
- [ ] ⭐ 管理後台 Decap CMS（已向用戶提醒，等用戶決定時機）
- [ ] 用戶還有一篇活動回顧文章未整理好，之後會提供
- [ ] 部署到 Netlify

### 資料檔位置（內容與程式已分離）
- `src/data/events.ts` — 年度朝山日、社群連結、活動回顧（含全文）
- `src/data/stories.ts` — 生命故事（★ 明天要改的檔案）
- `src/data/preparation.ts` — 行前準備

---

## ⚠️ 接手前必讀

**請務必先讀 `.same/todos.md` 裡的「🧭 重要設計決策與理由」區塊。**

裡面記錄了六個關鍵決策的**原因**（例如：為什麼不寫「全年開放」、為什麼不嵌入臉書、
為什麼日期不自動農曆換算）。不了解這些脈絡容易改壞已經討論定案的設計。

**最重要的原則：零維護設計**
教團人力流動大，寧可少寫，也不要寫會過期的資訊。

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

**最後更新**：2026-08-04
**狀態**：伺服器穩定，代碼已備份，一切正常 ✅
