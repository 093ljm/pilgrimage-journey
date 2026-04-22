# 🆘 專案恢復指南

## 專案基本信息

**專案名稱**：靈鷲山朝聖之旅網站
**GitHub 倉庫**：https://github.com/093ljm/pilgrimage-journey
**用戶名**：093ljm（⚠️ 注意：是 ljm 不是 lim！）
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

> "請讀取 `.same/recovery-guide.md` 和 `.same/todos.md`，然後從 GitHub 恢復我的專案並啟動伺服器。"

這樣新的 AI 就能快速了解您的專案並恢復！
