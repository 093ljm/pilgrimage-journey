# 工作紀錄（★ 每次開機第一個讀這份）

> 給 AI 自己：Same 環境常常遺失資料（`.git` 變空目錄、對話記憶被壓縮）。
> **這份檔案是唯一的入口**，每次收工都要更新並推送到 GitHub。
> 其他筆記：`todos.md`（詳細技術紀錄）、`for-new-ai.md`（專案背景）。

---

## 🪟 新對話開場白（用戶開新視窗時貼這段，2026-10-07 定稿）

```text
請先讀 .same/WORKLOG.md，照「開機檢查」做，再照「已確定的決策 6：分工」工作。

專案：/home/project/pilgrimage-journey
倉庫：https://github.com/093ljm/pilgrimage-journey（是 ljm，不是 lim）
若專案不在：git clone 上面的倉庫 → bun install → bun run dev

最重要的四條：
1. 絕對不要 force push。.git 變空時，照 WORKLOG「開機檢查」從 GitHub 搬回來。
2. 改檔案一律用編輯工具，不要用終端機寫檔。只改筆記（.same/）改完立刻推送；改網站程式要等我確認畫面後再整批推送（每次部署扣 Netlify 15 點）。
3. 不要截圖、開無頭瀏覽器、完整建置或建立版本截圖，除非我要求。改完只做語法檢查，告訴我要看哪一頁，由我檢查。
4. 已確定的決策不要重新討論。改內容或設計前，先看 .same/todos.md 的「重要設計決策與理由」。

開機檢查完，用幾行告訴我：.git 是否正常、是否與 GitHub 同步、GitHub 能否推送、開發伺服器是否正常，以及工作日誌最新一筆的下一步。然後等我指示。
```

---

## 🟢 開機檢查（每次新對話先做，約 1 分鐘）

```bash
cd /home/project/pilgrimage-journey
git status --short && git log --oneline -3     # 若出現 not a git repository → 走下方「.git 遺失」
git fetch -q origin && git status -sb | head -1 # 看本地是否落後遠端（管理員會從後台直接改 GitHub）
gh auth status 2>&1 | head -2                   # 看能不能推送；未登入 → 見下方第 5 點（8 碼代碼，約 1 分鐘）
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
5. **GitHub 無法推送**（`gh auth status` 顯示未登入）→ 背景執行
   `echo | gh auth login --hostname github.com --git-protocol https --web > /tmp/ghlogin.log 2>&1`，
   讀出 8 碼代碼給用戶 → 用戶到 https://github.com/login/device 用 **093ljm** 登入、輸入代碼
   （會先要求 Verify via email）→ 按 Authorize → AI 執行 `gh auth setup-git` 後推送。2026-10-15 驗證有效。
   ※ MCP Tools 面板無法取消勾選工具；task_agent 的 GitHub 工具目前會報 schema 錯誤，不要靠它推送。
6. **整個專案資料夾不見**（10/15 發生兩次）→ `git clone` → `bun install` → `bun run dev`。
   GitHub 上的東西從沒少過，只要事先推送就不會遺失。

---

## ⏸️ 暫停／恢復開發（★ 恢復時先讀這段）

> 2026-10-28 最後測試後，專案**暫停數個月**（用戶決定）。未完成的頁面一併暫停。
> 10/28 收工時要補上：最後測試結果、待辦是否有變動。

### 暫停時的狀態
- **正式網站維持公開**（用戶 10/27 決定）：https://frolicking-begonia-5ec310.netlify.app（正式網域尚未申請／切換）
- 已上線：首頁、朝山法門（影片：朝山功德殊勝行）、朝山路線與行儀（影片：朝山步驟）、行前準備、常見問題、
  法師開示、觀音三會、生命故事（筱喻師姐）、報名表單 `/register`＋後台報名名單、後台 `/admin`（草稿模式）
- **暫停中（未完成）**：人物／寶物／地點筆記（`src/app/guide/*` 建設中佔位頁）、活動回顧（版型示意）、
  其他生命故事、正式網域、給管理員的操作說明；其餘見「上架清單」未勾選項目與「待用戶決定」
- 暫停期間報名表單**仍可送出**，通知寄到 `LJMMKT@ljm.org.tw`

### 帳號與權限（交接必備，請單位保管）
| 用途 | 帳號／位置 | 備註 |
|---|---|---|
| GitHub 倉庫擁有者＝**第一位後台管理員** | `093ljm` | 倉庫 `093ljm/pilgrimage-journey`（公開）。保管密碼＋兩步驟驗證備援碼。9/7 後台測試提交即此帳號 |
| 第二位後台管理員 | `goodseedsinmind1111-web` | 倉庫 Write 權限 |
| 新同事後台管理員 | `093danawang` | 10/28 送出 Write 邀請（待接受、待測試） |
| Netlify | 帳號 `093-marketing`（Free，Owner） | site_id `710de8ac-a67e-456d-93bc-844ea79c914e`；環境變數 `GITHUB_CLIENT_ID`、`GITHUB_CLIENT_SECRET`（後台登入）、`NETLIFY_FORMS_TOKEN`（報名名單） |
| GitHub OAuth App（後台登入） | 「**093朝山(公號)**」，在 `093ljm` → Settings → Developer settings → OAuth Apps（10/28 由授權頁截圖確認） | 換網址時要改 Homepage URL 與 callback URL。管理員的 GitHub **Email 必須已驗證**才能授權登入 |
| 報名通知信箱 | `LJMMKT@ljm.org.tw` | 寄件者 `formresponses@netlify.com` 需加白名單 |
- **新增後台管理員**：GitHub 倉庫 → Settings → Collaborators → Add people（Write）。**不需要 Netlify 帳號**（公開倉庫不會被擋部署）。
  有寫入權限的人也看得到後台「報名名單」。
- **倉庫保護**：ruleset「Protect main」（id `25943648`，10/27 設）禁止強制推送與刪除 `main`，沒有例外帳號。
  ⚠️ 不要加「Require a pull request」，後台與 AI 都直接寫入 main。

### 暫停期間會／不會發生的事
- 不部署就不扣點，網站照常運作；管理員從後台**發布**＝部署一次 15 點（每月 300 點，每月 7 日重置）。
- 若日後 Netlify 建置環境變動導致建置失敗，網站**維持上一版**，不會掛掉；恢復開發時再修。
- 觀音三會 2026 三個日期已全部過去 → 沒更新就會全顯示「已圓滿」。每年由管理員從後台填新日期（決策：日期由人決定）。
- `NETLIFY_FORMS_TOKEN` 若到期 → 只有後台「報名名單」打不開，報名與 Email 通知照常 → 產生新權杖填回環境變數即可。

### 恢復開發步驟
1. 開新對話貼本檔最上方「新對話開場白」→ AI 照「開機檢查」做。Same 專案不在就 `git clone` → `bun install` → `bun run dev`。
2. **先查套件安全更新**：暫停時 `next` 15.3.9（15.3 系列最新）。查 nextjs.org/blog 與 GitHub Security Advisories，
   必要時升級 → `bun run lint` → 用戶看預覽 → 推送（部署一次）。
3. 讀「上架清單」未完成項目與「待用戶決定」，和用戶重排上架時程（原訂 2026-11 中旬，已因暫停延後）。

---

## 📌 目前狀態（2026-10-27）

| 項目 | 狀態 |
|---|---|
| 正式網站 | https://frolicking-begonia-5ec310.netlify.app（10/27 部署：`/dharma`、`/routes` 最下方嵌入 YouTube 影片＋載入逾時說明） |
| 後台 | `/admin`（GitHub 登入）、`/admin/demo`（示範，不存檔）、`/admin/registrations`（報名名單，後台左下角按鈕） |
| 報名 | `/register` → Netlify Forms `pilgrimage-registration` → Email 通知 `LJMMKT@ljm.org.tw`；用戶測試全部通過 |
| GitHub | `093ljm/pilgrimage-journey`，分支 `main`，最新修改**已全部推送** |
| Netlify 額度 | 10 月週期 10/7～11/6，300 點；已部署 7 次，**用 105 點，剩約 195 點**（表單送出本身免費） |
| 待上線修改 | 無（10/27 兩支影片＋next 15.3.9 已推送） |
| 用戶下一步 | **10/28 最後測試**（見工作日誌 10/27「暫停前清單」）→ 收工交接 → **專案暫停數個月** |
| 上架期限 | ~~2026-11 中旬~~ → **因暫停延後，恢復後重排**（見「⏸️ 暫停／恢復開發」） |

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
- [x] **GitHub 禁止強制推送**（用戶 10/05 交代：上架前設定）→ 10/27 AI 用 API 設定完成（ruleset id `25943648`）
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

### 2026-10-28（最後測試日）
- 開機：**整個專案資料夾不見**（預覽空白）→ `git clone` → `bun install`（背景執行約 11 秒）→ `bun run dev`；與遠端一致（`7c68688`），`gh` 已登入。
- **新同事管理員帳號 `093danawang`**（10/27 建立）：AI 用 `gh api -X PUT .../collaborators/093danawang`（permission `push`＝Write）
  送出邀請（invite id `340093644`）。**她須先接受邀請**（Email 或 https://github.com/093ljm/pilgrimage-journey/invitations，7 天內有效）
  → 再到 `/admin` 用 GitHub 登入測試。
- 查 API：093danawang **已是協作者（write）**＝邀請已接受。但她卡在 GitHub 授權頁，「Authorize 093ljm」按鈕灰色按不下，且信箱沒收到邀請信。
  - 截圖確認 OAuth App 名稱「**093朝山(公號)** by 093ljm」→ 後台登入 App 在 093ljm 帳號下（交接表已更新）。
  - ★ 原因（GitHub 官方 Email addresses reference）：**Email 未驗證的帳號不能 Authorize OAuth app、也收不到 Email 通知**
    （仍可接受倉庫邀請）→ 兩個症狀都吻合。解法：GitHub → 頭像 → Settings → Emails → Resend verification email → 點信中連結（看垃圾郵件）→ 重新登入 `/admin`。
  - 授權頁寫「Repositories: Public and private」是因登入要求 `repo` 權限（`auth.mjs` 預設 `repo,user`），GitHub 的標準說法；未變更。
- ✅ Dana 驗證 Email 後**成功登入正式後台**。測觀音三會：誕辰日填 `2027/4/6` 卻顯示「日期 並不符合 格式必須為 年/月/日」。
  - ★ **後台設定的 bug（一直存在，因觀音三會從沒從後台改過才沒發現）**：`public/admin/config.yml` 日期欄
    `pattern: ['^\\d{4}/...']` 寫在 YAML **單引號**裡，單引號不處理跳脫 → 實際正規式是 `^\\d{4}`（比對「反斜線＋dddd」），
    **任何日期都不會通過**。改成單一反斜線 `'^\d{4}/\d{1,2}/\d{1,2}$'`；用 `yaml` 套件解析後測試：
    `2027/4/6`、`2027/10/14` 通過；全形「／」、全形數字、`2027-4-6`、尾端空白不通過（符合預期）。
  - `/admin/demo` 與正式後台共用同一份 config.yml → 可先在 Same 預覽 `/admin/demo` 驗證（不扣點），再推送（部署 15 點）。
  - 用戶：「推送」→ config.yml 與本日誌一起推送（10 月第 7 次部署，累計 105 點，剩約 195 點）。正式網站 config 已確認更新。
- ★ **Decap 3.8.3 繁中介面實際用語**（查 decap-cms-locales zh_Hant；寫管理員操作說明時照這個）：
  - 編輯畫面：存檔後工具列出現「**狀態: 草稿**」→ 可選 草稿／正在審核／**預備發布**；選預備發布後「**發布**」→「**立即發布**」。
  - 上方選單「**作業流程**」→ 看板標題「編輯作業流程」，三欄是「**草稿**／**正在預覽**／**準備完成**」（欄名與狀態名不同！）。
  - 建議教管理員走「編輯畫面改狀態」，不必拖卡片。

### 2026-10-27
- 開機：`.git` 又空 → 從 GitHub 搬回，與遠端一致（`b87de1f`）；`gh` 已登入可推送；開發伺服器只有一個、正常。
- 用戶反映：新對話常「回答一次就停在處理中」→ 環境端正常（伺服器僅用約 0.6 GB），屬 Same 介面問題，已建議重整頁面或寫信 support@same.new。
- **朝山法門頁（`/dharma`）最下方嵌入影片「朝山功德殊勝行」**（`https://youtu.be/jes38TAcI1s`）：
  沿用 `YouTubeEmbed`（封面點播、未開放嵌入時顯示說明＋前往 YouTube），放在底部分隔裝飾之後。
  `bun run lint` 通過。**尚未推送，等用戶看預覽確認**（推送＝部署一次 15 點）。
- 途中環境又重啟一次：`.git` 變空、本檔剛改的一處消失（`/dharma` 的修改有保留）→ 補回、搬回 `.git` 後只推送本檔。
- 用戶：影片一直「載入中」，滑鼠移上去顯示 YouTube 拒絕連線（用戶已開啟允許嵌入）。查證：
  - 用戶新給的分享連結 `?si=...` 是同一支影片（`si` 只是分享追蹤碼）。
  - YouTube oEmbed 回 200 → **允許嵌入已生效**；`/embed/` 回應沒有 X-Frame-Options，可被嵌入。
  - ★ **原因是 Same 預覽代理加了 `Cross-Origin-Embedder-Policy: require-corp`**（另有 `frame-ancestors *`），
    瀏覽器因此擋掉沒有 COEP 的 YouTube iframe → 「拒絕連線」，播放器 onReady 不會觸發，畫面停在「載入中」。
    開新分頁看預覽也一樣（標頭在預覽頁本身）。
  - 正式網站（Netlify）**沒有** COEP 標頭 → 上線後可以正常播放。
  - ⇒ **YouTube 嵌入無法在 Same 預覽中測試**，只能看版面；能否播放要在正式網站確認。
- **朝山路線與行儀頁（`/routes`）最下方嵌入影片「朝山步驟」**（`https://youtu.be/e1piTXh-CiQ`）：
  先加一個與其他段落相同的圓形分隔裝飾，再放「影片／朝山步驟」標題與 `YouTubeEmbed`（版型同 `/dharma`）。
  兩支影片 oEmbed 皆 200（允許嵌入已開）。
- **影片載入逾時改善**（`video-embed.tsx`）：點播放後 12 秒仍未就緒 → 改顯示「影片載入失敗」＋前往 YouTube 按鈕，
  不再永遠停在「載入中」（播放器被擋時 YouTube 不回報錯誤）。用戶原本同意「約 10 秒」，取 12 秒替手機慢速網路留餘裕。
- `bun run lint` 通過。用戶授權「沒問題後直接推上去部署」→ 與本日誌一起推送（10 月第 5 次部署，累計 75 點）。
  待用戶在正式網站確認兩支影片可播放後收工存檔。
- ✅ 已部署 `ef04b88`，curl 確認正式網站 `/dharma`、`/routes` 已含兩支影片代號。
  ✅ **用戶確認正式網站兩支影片都能播放。**
- **收工。** 下一步：**明天（10/28）用戶做整個部署小測試**（正式網站整體檢查）。
- ※ 本日兩次發生「同一檔案連續編輯，前一處被後一處蓋掉」（即使是依序送出）→ 推送前務必 grep 逐處確認。
- **用戶：專案將暫停數個月**，10/28 做最後測試，未完成頁面一併暫停。AI 擬「暫停前清單」（待用戶確認要做哪些）：
  - 查到：協作者 `093ljm`（admin）、`goodseedsinmind1111-web`（write，**GitHub 上沒有任何此帳號的提交＝從沒用過後台**）；
    rulesets 0 個（禁止強制推送未設）；倉庫公開；Dependabot 關閉；`next` 15.3.7（同系列最新 15.3.9，2026-01 修 DoS CVE-2026-23864）。
    2026-09 另有 Next.js 嚴重漏洞：Windows 主機限定 RCE、圖片最佳化 AVIF RCE（Netlify 走自家 Image CDN，應不受影響）。
  - 觀音三會 2026 三個日期（4/5、8/1、10/25）**已全部過去**，暫停期間會全顯示「已圓滿」。
  - 「測試文章，稍後刪除」仍在正式網站。
  - 擬測試：①正式後台草稿→預備發布→發布（從沒做過；建議用第二位管理員帳號，順便刪測試文章、填 2027 三會日期、看報名名單）
    ②手機速度 ③報名表單（10/15 測過，未改可略）。
  - 擬暫停前做：禁止強制推送 ruleset（免費）、`next` 升 15.3.9（部署一次，明天測試一併驗證）、
    確認 `NETLIFY_FORMS_TOKEN` 到期日、帳號交接（GitHub 093ljm＋備援碼、Netlify 093-marketing、LJMMKT 信箱）、
    WORKLOG 寫「暫停／恢復開發」段落。待用戶決定：暫停期間網站是否維持公開（報名表單仍可送出）。
- **用戶決定**：做 A（禁止強制推送）、B（next 升級）；**網站暫停期間維持公開**；D 收工交接說明「太重要了」不要忘。
  - ✅ A：用 `gh api` 建立 ruleset「Protect main: block force pushes and deletion」（id `25943648`，active，
    規則 `non_fast_forward`＋`deletion`，目標 `~DEFAULT_BRANCH`，無例外帳號）。未加 Require PR。
    ※ 這個終端機 heredoc（`<<'EOF'`）會卡住到逾時，改用 `echo '{...}' | gh api --input -`。
  - ✅ B：`bun add next@15.3.9`（package.json＋bun.lock）。`bun run lint` 通過；重啟開發伺服器（顯示 Next.js 15.3.9），
    `/`、`/dharma`、`/routes`、`/register`、`/faq`、`/admin`、`/preparation`、`/teachings` 皆 200，`/events` 307 → `/events/info`（與正式網站相同）。
    與本日誌一起推送 → 10 月第 6 次部署（累計 90 點）；明天的最後測試即驗證此版本。
  - ✅ D：已先寫好本檔「⏸️ 暫停／恢復開發」段落，10/28 收工時補最後測試結果。
  - 用戶問「第一位管理員是 GitHub 093ljm？」→ **是**：倉庫協作者 093ljm 為 admin（擁有者），9/7 後台建立／修改測試文章的提交作者即 093ljm。

### 2026-10-15（討論中，尚未實作）
- 開機：整個專案資料夾不見 → 從 GitHub 重新 clone ＋ `bun install`；之後 `.git` 又空一次，已搬回。
- **用戶提案：網站內建報名表單**（不用 Google 表單），名單在後台查看與下載。已查證：
  - Netlify Forms：點數方案**免費、不限筆數**（官方 2026-04 起）；上線只需部署一次 15 點。
  - 新版 Next.js 需在 `public/__forms.html` 放隱藏表單供偵測，頁面再用 fetch POST 到 `/__forms.html`（opennext.js.org/netlify/forms）。
  - 上線前用戶需到 Netlify → Forms 開啟表單偵測。
  - ❌ Decap 沒有 `show_forms` 設定（查原始碼 configSchema）；3.8.3 也**沒有** `registerAdditionalLink`，無法在 Decap 內加自訂頁。
  - ✅ 可行做法：另做 `/admin/registrations` 頁，讀瀏覽器 `localStorage["decap-cms-user"]` 的 GitHub token（沿用後台登入）
    → Netlify Function 用 token 向 GitHub 確認此人對倉庫有寫入權限 → 再用 Netlify 個人存取權杖（環境變數）讀報名資料，回傳名單與 CSV。
  - ❌ 寄副本給信眾：Netlify 只通知管理者；Decap 只是編輯器，也無法寄信。要寄需另接寄信服務且有被濫用寄信的風險 → **用戶同意不做**。
  - **統一收件信箱：LJMMKT@ljm.org.tw**（Netlify Forms Email 通知）。通知信寄件者 formresponses@netlify.com，請教團 IT 加白名單。
  - ⚠️ 報名資料**絕不可存進 GitHub**（公開倉庫）。
- 用戶決定：做「報名表單＋後台報名名單」；不寄副本；**不加個資同意勾選**（怕長輩不想填），只放一行用途說明；
  欄位＝姓名、手機、Email（選填）、朝山日期、路線（三選一）、人數、備註。報名類型、官方系統、個資聲明**先保留**（用戶整理中）。
- ⚠️ 用戶把 Netlify 個人存取權杖**貼在對話裡** → AI 未使用、未寫入任何檔案，已建議撤銷並換新一把，直接貼進 Netlify 環境變數。
- **已實作（尚未推送，等用戶看預覽確認）**：
  - `public/__forms.html`：給 Netlify 偵測的隱藏表單 `pilgrimage-registration`（欄位名稱需與表單一致）
  - `src/app/register/page.tsx`＋`src/components/registration-form.tsx`：報名頁 `/register`；電話讀觀音三會設定；
    開發模式只模擬送出；通知信主旨 `【朝山報名】姓名｜日期｜路線｜人數`；防機器人欄位 `bot-field`
  - `netlify/functions/registrations.mjs`：用 GitHub 權杖確認對倉庫有寫入權限 → 用環境變數 `NETLIFY_FORMS_TOKEN` 讀報名資料
  - `src/app/admin/registrations/page.tsx`＋`src/components/admin/registrations-list.tsx`：名單頁（搜尋、依朝山日期排序、
    下載含 BOM 的 CSV，Excel 中文不亂碼）；開發模式顯示示範資料
  - `decap-admin.tsx`：後台左下角「報名名單」按鈕（示範後台不顯示）
  - `floating-nav.tsx`：「立即報名」從無效的 `#contact` 改連 `/register`
- **上線順序（不可顛倒，否則要多部署一次）**：
  1. 用戶：Netlify → Forms → 開啟表單偵測（Enable form detection）
  2. 用戶：產生新的存取權杖（永不過期）→ 環境變數 `NETLIFY_FORMS_TOKEN`（勾 Contains secret values）
  3. AI：推送（部署一次 15 點）→ 部署時偵測到表單、函式讀到權杖
  4. 用戶：Netlify → Forms → 表單通知 → Email → `LJMMKT@ljm.org.tw`
  5. 用戶：正式網站送一筆測試報名 → 確認信箱收到、`/admin/registrations` 看得到 → 在 Netlify 刪除測試資料
- **用戶決定不換權杖**，請 AI 直接設定 → AI 用 Netlify API 完成（權杖只用在 API 呼叫，未寫入任何檔案）：
  - ✅ 步驟 1：表單偵測已開啟（site `processing_settings.ignore_html_forms: false`）
  - ✅ 步驟 2：環境變數 `NETLIFY_FORMS_TOKEN`（機密、scopes builds/functions/runtime、只在 production）
  - ✅ 步驟 4（提前做）：Email 通知 hook `submission_created` → `LJMMKT@ljm.org.tw`
  - ✅ 步驟 3 推送：GitHub 授權失效、task_agent 的 GitHub 工具報 schema 錯誤（MCP Tools 面板只是名稱清單，**無法取消勾選**）
    → 改用 `gh auth login --web` 裝置代碼：用戶到 github.com/login/device 輸入代碼（會先要求 Verify via email）→ 授權成功
    → `gh auth setup-git` 後推送。★ 授權失效時這是最快的解法（約 1 分鐘）。
  - ✅ 已部署 `d2be396`（10 月第 3 次部署，累計 45 點）。正式網站驗證：
    `/register`、`/__forms.html`、`/admin/registrations` 皆 200；函式未登入 401、用 093ljm 的 GitHub 權杖 200
    `{"formFound":true,"submissions":[]}`；Netlify 已偵測表單 `pilgrimage-registration`（9 個欄位）。
  - ✅ 用戶測試報名**全部通過**：LJMMKT 收到通知、後台「報名名單」顯示正常（用戶：「後台也非常棒」）。
- **移除「路線」欄位**（用戶：事前選擇對信眾太難，路線之後也可能變動）：報名表單、`__forms.html`、
  函式 `FIELDS`、後台名單（欄位、示範資料、搜尋提示、手機版卡片）、通知信主旨（改為 `【朝山報名】姓名｜日期｜人數`）都已同步移除。
  目前欄位：姓名、手機、Email（選填）、朝山日期、人數、備註。與工作日誌一起推送 → 部署一次（10 月第 4 次，累計 60 點）。
- **收工。** 用戶接下來彙整其他上架資料；報名類型、是否另有官方系統、個資聲明仍保留待定。
  - 免費方案 API 眉角：指定 scopes 會 403「Upgrade to set specific scopes」；不指定則機密變數會 422
    「Secrets are not allowed in post_processing」→ 只能用 `["builds","functions","runtime"]`（與網頁介面相同）。
  - Netlify 資訊：site_id `710de8ac-a67e-456d-93bc-844ea79c914e`、帳號 `093-marketing`（Free，Owner）。

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
- **收工時發現**：開場白段落與開機檢查的 `gh auth` 行從 `df8cca1` 起就沒存進去。
  原因：當時**同時送出 4 個 string_replace 改同一個檔案**，最上面那處被覆蓋。已補回。
  ★ 規則：**同一個檔案一次只改一處**，改完用 grep 確認再推送。
- **推筆記前先確認上一次部署已完成**（用 curl 檢查正式網站已是新內容），否則 `ignore` 會把網站修改再建置一次。
- 收工。用戶接下來先彙整可上傳的資料。
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
