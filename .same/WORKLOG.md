# 工作紀錄（★ 每次開機第一個讀這份）

> 給 AI 自己：Same 環境常常遺失資料（`.git` 變空目錄、對話記憶被壓縮）。
> **這份檔案是唯一的入口**，每次收工都要更新並推送到 GitHub。
> 其他筆記：`todos.md`（詳細技術紀錄）、`for-new-ai.md`（專案背景）。

---

## 🟢 開機檢查（每次新對話先做，約 1 分鐘）

```bash
cd /home/project/pilgrimage-journey
git status --short && git log --oneline -3     # 若出現 not a git repository → 走下方「.git 遺失」
git fetch -q origin && git status -sb | head -1 # 看本地是否落後遠端（管理員會從後台直接改 GitHub）
```

1. **`.git` 遺失**（空目錄）→ 從遠端搬回歷史，**絕對不要 force push**：
   ```bash
   cd /home/project && rm -rf /tmp/pj-git
   git clone --quiet --no-checkout https://github.com/093ljm/pilgrimage-journey.git /tmp/pj-git
   cd pilgrimage-journey && rm -rf .git && mv /tmp/pj-git/.git .git && git reset
   git status --short   # 只剩真正改過的檔案；遠端較新的內容用 git checkout -- <檔案> 取回
   ```
2. **本地落後遠端** → `git pull --ff-only`（管理員從後台發布的文章、刪除的照片都在遠端）。
3. 開發伺服器：`pkill -f "next dev"` 確認只有一個在跑 → `bun run dev`。
   清快取後首頁第一次編譯約 100 秒，屬正常。
4. 讀本檔「目前狀態」與「工作日誌」最新一筆，接著做。

---

## 📌 目前狀態（2026-10-07）

| 項目 | 狀態 |
|---|---|
| 正式網站 | https://frolicking-begonia-5ec310.netlify.app（**10/7 已部署最新版** `e5199a4`） |
| 後台 | `/admin`（GitHub 登入）、`/admin/demo`（示範，不存檔） |
| GitHub | `093ljm/pilgrimage-journey`，分支 `main`，最新修改**已全部推送** |
| Netlify 額度 | 10 月週期 10/7～11/6，300 點；10/7 部署一次已用 15 點 |
| 待上線修改 | 無（後台空白修正、草稿模式、影片下架、省點設定都已上線） |
| 上架期限 | **2026-11 中旬正式上架**（10/05 用戶調整，原訂 10 月底；時程見「上架清單」） |

---

## 🧭 已確定的決策（不要再重新討論，除非用戶主動提起）

### 1. 主機留在 Netlify 免費版（2026-10-01 決定）
- **不搬 Vercel**：本站是「財團法人靈鷲山佛教基金會」的**正式朝山網站**，用戶是教團職工。
  Vercel 免費版條款限「個人、非商業」，且受雇者撰寫程式即屬商業用途 → 不適用；Pro 每月 US$20，違反「不訂閱」目標。
- Netlify 免費版允許組織／商業用途。這個月額度用完是**開發期部署太頻繁**（9 月 21 次），不是平常使用會發生的事。
- 上架後一年內更新很少：每月 1～3 次部署（15～45 點）＋流量，300 點足夠。
- 將來流量真的變大：技術人員約一天可搬到 Cloudflare Pages（架構不綁平台）。

### 2. 內容架構：GitHub Markdown + Decap CMS，**不用資料庫**
- 建置時產生固定網頁，沒有資料庫會閒置暫停，也不會「沒人點擊就變 404」。

### 3. 後台採草稿模式（`publish_mode: editorial_workflow`）
- 儲存＝草稿（不部署、不扣點）；狀態改「預備發布」→「發布」→「立即發布」才部署一次。
- 用戶原話：「後台太過龐大……往後以草稿方式，只要確定現在網頁可測定即可」。

### 4. 測試方式（★ 省額度的核心）
| 階段 | 方式 | 扣點 |
|---|---|---|
| 平常開發 | **用戶看 Same 預覽**；AI 只做語法檢查（見決策 6） | 0 |
| 後台流程 | `/admin/demo`（test-repo，不連 GitHub） | 0 |
| 最後實機（手機等） | 上架前才做；用戶判斷屆時主要看**速度**，不是版面 | 部署一次 15 點 |
- dev 分支部署方案已評估（0 點，但要改後台分支判斷與登入走正式網址），**目前不採用**，需要時再做。

### 5. AI 推送規則
- 程式修改**整批推送**，不要改一點推一次（每次推到 main ＝ 一次正式部署 ＝ 15 點）。
- 只改 `.same/`、`README.md`、`public/images/uploads/` 的 commit **不會觸發部署**（`netlify.toml` 的 `ignore`），筆記可以放心推。
  ⚠️ 前提：**上一次成功部署**之後沒有別的網站修改。`ignore` 比對的是「上次成功部署 → 這次」，不是上一個 commit。
  若之前有部署被跳過或失敗，推筆記也會把累積的網站修改一起建置（10/7 就是這樣自動部署的）。
- **絕對不要 force push**：管理員會從後台直接存到 GitHub，覆蓋會刪掉他們的內容。

### 6. 分工：AI 改、用戶看畫面（2026-10-07 用戶決定）
- 原因：截圖、無頭瀏覽器、完整建置**很耗用戶的 Same 使用量**，也很吃記憶體
  （10/07 曾出現指令被強制中斷 exit 137，接著環境重啟）。推送本身很便宜。
| 改了什麼 | AI 做 | 用戶做 |
|---|---|---|
| 只改筆記（`.same/`） | 用編輯工具改 → **立刻推送**（不觸發部署） | — |
| 改網站文字／版面 | 用編輯工具改 → 語法檢查 `bun run lint`（不開畫面）→ 告訴用戶看哪一頁 | 重新整理預覽確認，有問題截圖 |
| 用戶確認畫面後 | **整批推送一次**（＝部署一次，15 點） | — |
| 後台登入、發布流程等用戶不易判斷的 | **先問用戶**，同意才做畫面檢查 | — |
- 不主動截圖、不開無頭瀏覽器、不做完整建置、不建立版本截圖（Same 會自動存檔），除非用戶要求。
- 改檔案**一律用編輯工具**（string_replace／edit_file），環境重啟後才會保留；不要用終端機寫檔。
- ★ **官方證實**（docs.same.new/essentials/manual-editing）：「The terminal is containerized and operations performed
  within the terminal are **reset on page refresh**.」→ 這就是 `.git` 老是變空、終端機改的檔案消失的原因。
  因此：在終端機 commit 後要**立刻 push**（推上 GitHub 才安全）；請用戶檢查畫面時用**預覽面板自己的重新整理鈕**，
  AI 還有沒推送的東西時，不要重新整理整個 Same 頁面。
- 預覽畫面看起來卡住：多半是重啟後第一次編譯（1～2 分鐘）。超過 3 分鐘才重啟開發伺服器，一個指令就好。
- 用戶檢查畫面：預覽面板網址列左邊的 ⟳ 下拉 → **Reload Page**（只重整預覽）；**Restart Server** 只在卡住超過 3 分鐘時用。
- **用戶自己改程式裡的文字**（例如 `src/app/faq/page.tsx`）：只改雙引號內；分段打 `\n\n`，**不可直接按 Enter**；
  文字裡的引號用「」。用戶說改好後，AI **一定先 `bun run lint` 再推送**，並對照其他頁面有無矛盾。
  （10/07 用戶改常見問題：4 處直接按 Enter、1 處貼到舊文字中間，都被 lint 擋下；另抓到與行前準備頁「不戴帽」矛盾。）

---

## 🔧 本機無頭瀏覽器（無 sudo 也能用，2026-10-01 驗證；★ 只在用戶要求時使用）

Same 環境沒有 sudo，Playwright 的 Chromium 缺系統元件。做法：
```bash
mkdir -p /tmp/chromedeps/debs && cd /tmp/chromedeps/debs
apt-get download libnss3 libnspr4 libatk1.0-0t64 libatk-bridge2.0-0t64 libxkbcommon0 libatspi2.0-0t64 \
  libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libpango-1.0-0 libcairo2 libasound2t64 \
  libavahi-common3 libavahi-client3 libxi6 libxrender1 libfribidi0 libthai0 libharfbuzz0b \
  libxcb-render0 libxcb-shm0 libpixman-1-0 libdatrie1 libgraphite2-3 libwayland-server0 fonts-wqy-microhei
# libcups2t64 / libdrm2 / libgbm1 清單過舊會 404，直接到 http://ports.ubuntu.com/ubuntu-ports/pool/main/ 抓 24.04 版
for d in *.deb; do dpkg -x "$d" ../root; done
cp ../root/usr/share/fonts/truetype/wqy/*.ttc ~/.local/share/fonts/ 2>/dev/null; fc-cache -f
# 執行：LD_LIBRARY_PATH=$(find /tmp/chromedeps/root -type d -name aarch64-linux-gnu | tr '\n' ':') bun 腳本.mjs
```
- Playwright 1.47.2 裝在 `/tmp/pwtest`；`launch({ executablePath: ~/.cache/ms-playwright/chromium-1134/chrome-linux/chrome, args:["--no-sandbox"] })`
- 長流程請背景執行（`setsid nohup ... &`），指令超過 90 秒會被中斷。
- `/tmp` 重開機會清空，屆時重做一次。

---

## ✅ 上架清單（2026-11 中旬正式上架）

### 時程（10/05 與用戶確認）
| 時間 | 事項 | Netlify 額度 |
|---|---|---|
| 10/7 | 點數重置 → Trigger deploy 一次 | 10 月週期（10/7～11/6）300 點 |
| 10 月中 | 正式後台實測：法師開示、觀音三會、草稿 → 發布、刪測試文章 | 每次發布 15 點 |
| 10 月 | 用戶準備其餘內容，從後台陸續發布 | 同上，**多存草稿、確定再發布** |
| 10 月底前 | 教團提供正式網域（越早越好） | 不扣點 |
| 11/7 前 | 正式網址切換完成（DNS、Netlify 網域、OAuth App） | 不扣點 |
| 11/7 | **點數再重置** | 11 月週期 300 點，留給上架 |
| 11/7～中旬 | 新網址最後測試（手機速度）、交付管理員操作說明、設定禁止強制推送 | — |
| 11 月中旬 | **正式上架** | — |

- 額度提醒：10 月週期的 300 點約可發布 20 次（還要扣流量）。後台一篇文章發布一次就是一次部署，
  內容多時請**集中幾天發布**，不要一篇改好幾次都按發布。

### 必須完成
- [x] 10/7 額度重置後部署一次（推筆記時自動觸發，`e5199a4` Published，50 秒）
- [x] 部署後確認：config 為 editorial_workflow、`/admin` 含 nc-root 且登入鈕在第一屏中央、影片 404、主要頁面 200
- [ ] 用正式後台實測一次草稿 → 發布（GitHub backend 的草稿分支／PR 流程）
- [ ] 刪除「測試文章，稍後刪除」（用草稿模式的後台操作）
- [ ] 生命故事：除筱喻師姐外的正式文章（等用戶提供）
- [ ] 觀音三會：填入正確日期與報名資訊，並確認前台更新
- [ ] 法師開示：確認內容與順序
- [ ] 給管理人員的操作說明（草稿 → 預備發布 → 發布；發布後等 1～2 分鐘）
- [ ] **GitHub 禁止強制推送**（用戶 10/05 交代：上架前設定）
      倉庫擁有者 093ljm 在 GitHub 網頁：Settings → Rules → Rulesets → New branch ruleset
      → Target 選預設分支（main）→ Enforcement: Active → 只勾 **Block force pushes**、**Restrict deletions** → 儲存。
      ⚠️ **不要勾「Require a pull request」**：後台刪除文章、AI 正常推送都是直接寫入 main，會被擋下。
      ⚠️ 只有**公開倉庫**能免費設定（私人倉庫要 GitHub Pro／Team），和下方「倉庫是否改不公開」互相牽動。
- [ ] **正式網址**（用戶 10/05 詢問時機；上架改 11 月中旬後，建議 **10 月底前提供（越早越好），11/7 前切換完成**）
      1. 教團提供網域，建議用子網域（例：`xxx.ljm.org.tw`），並找到能改 DNS 的資訊單位
      2. 資訊單位加一筆 CNAME → `frolicking-begonia-5ec310.netlify.app`（DNS 生效最多 24～48 小時）
      3. Netlify → Domain management 加自訂網域，HTTPS 憑證自動免費發放
      4. GitHub OAuth App 的 Homepage URL、Authorization callback URL 改成新網址（只能填一個網址，改完舊網址的後台就無法登入）
      5. 新網址實測：前台、後台登入、草稿 → 發布；最後的手機實機測試也在新網址做
      ※ 程式裡沒有寫死網址（已查），後台與登入都自動抓目前網址 → **不用改程式、不用部署、不扣點**
- [ ] 最後實機測試（手機），重點：速度

### 待用戶決定：上架必備或上架後再補
- [ ] 人物／寶物／地點筆記（`src/app/guide/*`，目前是「建設中」佔位頁）
- [ ] 活動回顧（目前版型示意）
- [ ] 筱喻師姐影片改放 YouTube 後貼回連結（站內影片檔已下架）
- [ ] 093TV 頻道開啟「允許嵌入」，影片才能在站內播放
- [ ] 照片上傳大小上限（建議 8MB 防呆，**用戶尚未決定，不要自行實作**）
- [ ] **倉庫要不要改成不公開**（用戶 10/05 詢問，**AI 建議維持公開**，等用戶決定）
      改不公開的代價（已查官方文件）：
      ① 上面的「禁止強制推送」免費方案不能設（私人倉庫要 GitHub Pro／Team）
      ② Netlify 對私人倉庫有 Deploy Request Policy：不是 Netlify 團隊成員的人（例如 Tara、以後接手的管理員）
         從後台發布時，部署會停在「等待核准」，要 Netlify 帳號擁有者手動核准或把對方加入團隊 → 違反零維護
      公開的影響：任何人都能看到程式、`.same/` 筆記、後台**草稿**（草稿分支與 PR 是公開的）。
      倉庫內**沒有密鑰**（已查，OAuth 密鑰在 Netlify 環境變數），網站內容本來就公開。
      → 唯一要注意：**還不想公開的內容不要先存成草稿**（例如未經當事人同意的生命故事）。

---

## 📓 工作日誌（新的寫在最上面）

### 2026-10-07
- 開機：`.git` 又空 → 從 GitHub 取回，與遠端一致（`a8c75de`）。
- 用戶：「點數重置了，後台還是一大片空白」→ 查證正式網站仍是 9/10 版（`publish_mode: simple`、無 `nc-root`、影片仍 200）。
  原因：**點數重置不會自動部署**。最後一個改網站的 commit `4978ea7` 當時因額度被跳過，之後只改筆記（被 `ignore` 略過），所以沒有新部署。
- 本機用 `bun install --frozen-lockfile && bun run build` 實際建置一次：成功，含 `nc-root`、`editorial_workflow`、無影片檔。
- **已自動部署，用戶不必按 Trigger deploy**：我 11:47 推送上面那筆筆記就觸發了正式部署（用戶截圖 `main@e5199a4 Published`）。
  原因：`ignore` 比對「上次成功部署（9/10）→ 這次」，中間有 10/1 的網站修改，所以判定要建置。這正是需要的那一次，扣 15 點。
- 驗證通過：`publish_mode: editorial_workflow`、`/admin` 含 nc-root（登入鈕在第一屏中央）、影片 404、主要頁面 200。
- 環境中途重啟一次：`.git` 變空、本地未推送的筆記修改消失、**`gh` 登入狀態被清掉**（`git push` 可能需要重新授權）。
  - 授權約一小時後**自己恢復**（用戶確認 MCP Tools 的 GitHub 一直是 Connected）。之後再遇到：先等，或請用戶到 Tools 重新連接。
  - ★ 觀察（推測，待更多次驗證）：環境重啟後，**用檔案編輯工具（string_replace／edit_file）改的檔案保留下來**，
    **用終端機（python、sed、heredoc）改的消失了**。Same 官方文件：檔案存檔點（Checkpoint）在「AI 編輯檔案後」建立。
    → **改筆記、改程式一律用編輯工具，不要用終端機寫檔**；改完立刻推送。
  - task_agent 的 GitHub 整合目前會出錯（`github_add_comment_to_pending_review` schema 錯誤），推送請直接用終端機 `git push`。
- **用戶決定新分工**（見「已確定的決策 6」）：AI 不再主動檢查畫面，改完告訴用戶，由用戶重新整理預覽確認。
- **新對話開場白定稿**，放在本檔最上方，用戶開新視窗時照貼。
- **常見問題依主管意見改版**（用戶自己用程式碼編輯器改，AI 修格式後推送 → 部署一次 15 點）：
  第 1、2、3、4、5、7、10 題文字更新；第 3 題迴向偈「普院」→「普願」；第 10 題聖山寺客堂 → 無生道場客堂；
  第 5 題「遮陽帽（朝山途中不戴帽子，改以頭巾遮陽）」，與行前準備頁一致。
  ※ 之前「visual edit 無法儲存」：筆記無紀錄。推測是在預覽畫面點文字改，但常見問題是清單逐題產生的，寫不回原檔。
    → 改常見問題請用程式碼編輯器（或交給 AI）。之後可考慮把常見問題放進後台（待用戶決定）。
- 下一步：用戶從正式後台測試法師開示、觀音三會（草稿 → 預備發布 → 發布）。

### 2026-10-05
- **開機**：`.git` 又是空目錄 → 從 GitHub 取回；本地沒有未存修改，與遠端一致（`3b5683b`）。開發伺服器只有一個，主要頁面都回 200。
- **查後台測試狀態**（看 GitHub 提交紀錄）：
  - 生命故事：9/7 有 4 筆後台提交（新增＋修改測試文章）→ ✅ 已測
  - 法師開示、觀音三會：只有 9/3 搬檔那一筆 → ❌ **從沒從後台改過**
  - 倉庫沒有任何 PR → 草稿模式只在 `/admin/demo` 測過，正式後台還沒用過
  - 正式網站還是 9/10 版（後台仍是舊的 simple 模式），**10/7 部署前在正式後台測，前台看不到變化**
- **用戶提出**：活動資訊日期「除了系統自動更新，也要讓管理員手動更新」。
  現況：後台**已經可以**手動改三會日期；系統自動的只有「已圓滿／即將到來」標籤；
  **農曆參考提示（決策：程式算給管理員參考，日期由人決定）還沒做**。已說明，等用戶確認要加什麼（僅討論，未實作）。
- **用戶：「後台沒看到改日期的選項」→ 查到原因**：正式網站仍是舊版後台（沒有 10/1 的 `nc-root` 修正），
  整個後台被往下推一個螢幕高；左側分類清單是 `position: fixed`，被推到 `top: 944px`，
  **電腦螢幕（約 860px 高）完全看不到，也捲不到**。所以用戶只看得到預設打開的「生命故事」。
  - 本地新版實測：清單在 `top: 84px`，三個分類＋「作業流程」都正常 → 10/7 部署後就會解決，**不用另外改程式**。
  - 部署前的替代方法（已實測可用）：直接開 `/admin#/collections/guanyin_assemblies/entries/guanyin_three_assemblies`。
  - 無頭瀏覽器重建補充：`fc-cache` 不存在但中文字照樣正常；libcups2t64／libdrm2／libgbm1 從 ports.ubuntu.com 抓最新版可用。

### 2026-10-01
- **環境**：開機時 `.git` 是空目錄 → 從 GitHub 取回；本地落後遠端 2 個後台刪圖 commit，已同步。
- **後台上半部空白**：Decap 把畫面加在 `<body>` 最後，排在 `min-h-screen` 外框之後。
  修正：`decap-admin.tsx` 輸出 `<div id="nc-root" />`（Decap 3.8.3 會優先使用，已查原始碼）。
  以無頭瀏覽器實測：登入按鈕在 497/900px，後台頂端 = 0。（commit `c14b8d0`）
- **生命故事「點了沒反應」**：正式網站列表與測試文章都正常；是 Same 預覽開發模式首次編譯慢，
  且當時同時跑了兩個開發伺服器。已清成一個。
- **Netlify 部署被跳過**：用戶截圖顯示 `Skipped due to account credit usage exceeded`。
  加入 `netlify.toml` 的 `ignore` 規則，用歷史 commit 測過七種情況。（commit `2398333`）
- **草稿模式**：`config.yml` 改 `editorial_workflow`；`/admin/demo` 實測存草稿 → 作業流程 → 預備發布 → 立即發布 全通過。
- **影片下架**：清空 `01-hsiaoyu.md` 的 `videoFile`，刪除 39.7MB 的 `public/videos/story-hsiaoyu.mp4`。（commit `4978ea7`）
  還原：`git checkout 4978ea7^ -- public/videos/story-hsiaoyu.mp4`，再把 videoFile 填回。
- **主機評估**：比較 Netlify／Vercel／Cloudflare Pages，決定留在 Netlify（見「已確定的決策 1」）。
- **用戶提醒**：資料常常不見，要求 AI 建立自己的工作紀錄 → 建立本檔。
- 下次開機：先跑「開機檢查」；10/7 前不需要部署，可以先做內容。
