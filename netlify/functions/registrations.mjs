// ============================================================
// 朝山報名名單 — 讓管理後台讀取 Netlify Forms 的報名資料
// ------------------------------------------------------------
// ★ 流程：
//   1. 管理員先在 /admin 用 GitHub 登入（瀏覽器會保存 GitHub 權杖，Decap 存在 localStorage「decap-cms-user」）。
//   2. /admin/registrations 帶著這個權杖呼叫本函式。
//   3. 本函式先向 GitHub 確認此人對網站倉庫有「寫入」權限（＝網站管理員），沒有就拒絕。
//   4. 確認後，才用 Netlify 存取權杖讀取報名資料，而且只回傳名單需要的欄位（不回傳 IP 等資料）。
// ★ Netlify 存取權杖只放在 Netlify 環境變數 NETLIFY_FORMS_TOKEN（勾選 Contains secret values），
//   絕不可寫進程式或 GitHub（倉庫是公開的）。
//   權杖若過期或被撤銷，名單頁會顯示錯誤：重新產生一把、更新環境變數、再部署一次即可。
// ============================================================

const REPO = "093ljm/pilgrimage-journey"; // 與 public/admin/config.yml 的 backend.repo 相同
const FORM_NAME = "pilgrimage-registration"; // 與 public/__forms.html 的 form name 相同
const FIELDS = ["name", "phone", "email", "date", "people", "note"];
const MAX_PAGES = 20; // 每頁 100 筆，最多讀 2000 筆

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export default async (request, context) => {
  const auth = request.headers.get("authorization") || "";
  const githubToken = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!githubToken) return json(401, { error: "請先登入管理後台。" });

  // 1. 確認是網站管理員（對倉庫有寫入權限）
  const repoResponse = await fetch(`https://api.github.com/repos/${REPO}`, {
    headers: {
      authorization: `Bearer ${githubToken}`,
      accept: "application/vnd.github+json",
      "user-agent": "pilgrimage-registrations",
    },
  });
  if (repoResponse.status === 401) return json(401, { error: "登入已過期，請回管理後台重新登入。" });
  if (!repoResponse.ok) return json(502, { error: "暫時無法向 GitHub 確認身分，請稍後再試。" });
  const repo = await repoResponse.json();
  const permissions = repo.permissions || {};
  if (!(permissions.push || permissions.maintain || permissions.admin)) {
    return json(403, { error: "此帳號沒有查看報名名單的權限。" });
  }

  // 2. 讀取報名資料
  const netlifyToken = process.env.NETLIFY_FORMS_TOKEN;
  if (!netlifyToken) {
    return json(500, { error: "尚未設定 Netlify 存取權杖（環境變數 NETLIFY_FORMS_TOKEN）。" });
  }
  const siteId = context?.site?.id || process.env.SITE_ID;
  if (!siteId) return json(500, { error: "無法取得網站代號，請稍後再試。" });

  const netlifyApi = (path) =>
    fetch(`https://api.netlify.com/api/v1${path}`, {
      headers: { authorization: `Bearer ${netlifyToken}` },
    });

  const formsResponse = await netlifyApi(`/sites/${siteId}/forms`);
  if (formsResponse.status === 401 || formsResponse.status === 403) {
    return json(500, { error: "Netlify 存取權杖無效或已過期，請重新產生並更新環境變數。" });
  }
  if (!formsResponse.ok) return json(502, { error: "暫時無法讀取報名資料，請稍後再試。" });

  const forms = await formsResponse.json();
  const form = Array.isArray(forms) ? forms.find((item) => item.name === FORM_NAME) : null;
  if (!form) return json(200, { formFound: false, submissions: [] });

  const submissions = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const response = await netlifyApi(`/forms/${form.id}/submissions?per_page=100&page=${page}`);
    if (!response.ok) return json(502, { error: "暫時無法讀取報名資料，請稍後再試。" });
    const batch = await response.json();
    for (const submission of batch) {
      const data = {};
      for (const key of FIELDS) data[key] = String(submission.data?.[key] ?? "");
      submissions.push({ id: submission.id, createdAt: submission.created_at, data });
    }
    if (batch.length < 100) break;
  }

  return json(200, { formFound: true, submissions });
};
