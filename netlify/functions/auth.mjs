// ============================================================
// Decap CMS 管理員登入 — 第一步：帶管理員前往 GitHub 授權
// ------------------------------------------------------------
// ★ 需要在 Netlify 環境變數設定：
//     GITHUB_CLIENT_ID
//     GITHUB_CLIENT_SECRET
//   兩者由 GitHub OAuth App 產生，絕不寫在程式碼裡。
// ============================================================

function errorPage(message) {
  return new Response(
    `<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><body style="font-family:system-ui;padding:2rem;line-height:1.8">
      <h1 style="font-size:1.25rem">管理員登入尚未設定完成</h1>
      <p>${message}</p>
    </body></html>`,
    { status: 500, headers: { "content-type": "text/html; charset=utf-8" } },
  );
}

export default async (request) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return errorPage(
      "尚未設定 GITHUB_CLIENT_ID 與 GITHUB_CLIENT_SECRET。請在 Netlify 網站設定的環境變數中加入後重新部署。",
    );
  }

  const url = new URL(request.url);
  const state = crypto.randomUUID().replace(/-/g, "");

  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", `${url.origin}/.netlify/functions/callback`);
  authorizeUrl.searchParams.set("scope", url.searchParams.get("scope") || "repo,user");
  authorizeUrl.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      location: authorizeUrl.toString(),
      "set-cookie": `decap_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
      "cache-control": "no-store",
    },
  });
};
