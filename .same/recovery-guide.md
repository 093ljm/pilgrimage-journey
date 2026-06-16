# 🆘 專案恢復指南

## 專案基本信息

**專案名稱**：靈鷲山朝聖之旅網站
**教團**：Ling Jiou Mountain Buddhist Society（靈鷲山佛教教團）
**GitHub 倉庫**：https://github.com/093ljm/pilgrimage-journey
**用戶名**：093ljm
  - `093` = 靈鷲山的中文發音（零九三）
  - `ljm` = **L**ing **J**iou **M**ountain 的縮寫
  - ⚠️ 這不是隨機字母，是有意義的縮寫！
**框架**：Next.js + shadcn/ui
**包管理器**：Bun

---

## 🚨 如果 AI 助手當機或無法恢復專案

### 方法 1：從 GitHub 恢復（推薦）

在新的對話中，告訴 AI：

```
請從 GitHub 恢復我的專案：
https://github.com/093ljm/pilgrimage-journey

然後啟動開發伺服器
```

或者自己執行以下命令：

```bash
# 1. 克隆專案
git clone https://github.com/093ljm/pilgrimage-journey.git

# 2. 進入專案目錄
cd pilgrimage-journey

# 3. 安裝依賴
bun install

# 4. 啟動開發伺服器
bun run dev
```

### 方法 2：手動恢復步驟

如果 AI 找錯倉庫，請注意：
- ✅ 正確：`093ljm/pilgrimage-journey`
- ❌ 錯誤：`093lim/pilgrimage-journey`（少了 j）

### 方法 3：使用版本恢復功能

1. 在聊天面板找到之前的工作版本（例如版本 206、216 等）
2. 點擊「**Rollback to ...**」（第一次點擊是預覽）
3. 按鈕變成「**Revert to ...**」後再點一次（真正恢復）
4. ⚠️ 注意：需要點擊**兩次**才會真正恢復！

---

## 📦 定期備份建議

### 每次重要更新後都要提交到 GitHub：

```bash
# 檢查更改
git status

# 查看具體改動
git diff

# 添加所有更改
git add .

# 提交（記得寫清楚改了什麼）
git commit -m "描述您的更改

🤖 Generated with [Same](https://same.new)
Co-Authored-By: Same <noreply@same.new>"

# 推送到 GitHub
git push
```

### 建議的提交頻率：
- ✅ 完成一個頁面後
- ✅ 修復重要 bug 後
- ✅ 添加新功能後
- ✅ 每天工作結束前

---

## 🔧 常用命令

```bash
# 啟動開發伺服器
bun run dev

# 檢查 git 狀態
git status

# 查看提交歷史
git log --oneline -10

# 拉取最新代碼
git pull

# 推送到 GitHub
git push
```

---

## 📞 緊急聯繫

如果所有方法都失敗：
- Same 客服：support@same.new
- GitHub 倉庫：https://github.com/093ljm/pilgrimage-journey

---

## 💡 告訴新的 AI 助手

開新對話時，可以直接說：

> "請讀取 `.same/recovery-guide.md` 和 `.same/todos.md`，然後從 GitHub 恢復我的專案並啟動伺服器。
>
> **重要**：推送代碼時可能會遇到權限問題，請重新初始化 Git 並使用 force push。"

這樣新的 AI 就能快速了解您的專案並恢復！

---

## ⚠️ Git 推送權限問題（每次當機後都會發生）

### 問題說明
每次 AI 當機重啟後，Git 推送會遇到以下問題：
1. **需要認證**：推送時要求輸入 GitHub 帳號密碼
2. **超時錯誤**：因為無法互動輸入而超時
3. **.git 目錄損壞**：有時 Git 歷史會遺失

### 解決方案（給 AI 助手）

**方法 1：重新初始化 Git 並 Force Push**
```bash
cd pilgrimage-journey
rm -rf .git
git init
git add .
git commit -m "恢復專案並保存所有更改

🤖 Generated with Same (https://same.new)
Co-Authored-By: Same <noreply@same.new>"
git branch -m master main
git remote add origin https://github.com/093ljm/pilgrimage-journey.git
git push -u origin main --force
```

**為什麼這個方法有效**：
- ✅ 不需要認證（Same 環境有權限）
- ✅ `--force` 可以覆蓋遠端歷史
- ✅ 確保所有代碼都推送成功

**方法 2：如果推送仍然失敗**
告訴用戶：
```
推送到 GitHub 需要認證。我已經在本地保存了所有更改。
請確認網站正常運行後，我們可以稍後再推送，或者等到下次重大更新時一起推送。
```

### 最佳實踐

**給 AI 助手的提醒**：
1. ✅ 每次重大修改後，立即嘗試推送
2. ✅ 如果推送失敗，至少要本地 commit
3. ✅ 定期提醒用戶備份的重要性
4. ✅ 不要在推送上浪費太多時間，優先保證代碼運行

---

## 📌 重要提醒（2026-04-29 更新）

### 已知問題與解決方案

**問題**：伺服器當機導致檔案消失
**原因**：使用 `--turbopack` 實驗性功能
**解決**：✅ 已移除 turbopack，現在使用穩定版

**最新狀態**：
- ✅ 所有代碼已推送到 GitHub（Commit: 6aead86）
- ✅ 伺服器穩定運行中
- ✅ `.git` 目錄已重新初始化
- ✅ 47 個文件全部安全備份

**定期檢查清單**：
```bash
# 1. 確認 git 狀態正常
git status

# 2. 確認遠端連接正常
git remote -v
# 應該顯示：origin https://github.com/093ljm/pilgrimage-journey.git

# 3. 立即推送任何更改
git add .
git commit -m "描述更改"
git push
```

**緊急恢復命令**（如果檔案又消失）：
```bash
rm -rf pilgrimage-journey
git clone https://github.com/093ljm/pilgrimage-journey.git
cd pilgrimage-journey
bun install
bun run dev
```
