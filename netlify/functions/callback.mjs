// ============================================================
// Decap CMS 管理員登入 — 第二步：GitHub 授權完成後取得存取權杖
// ------------------------------------------------------------
// ★ 權杖只回傳給開啟登入視窗的管理後台，不會存進本站，也不會寫入 GitHub。
// ============================================================

function resultPage(status, payload) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  return new Response(
    `<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><body style="font-family:system-ui;padding:2rem">
      <p>登入處理中，請稍候…</p>
      <script>
        (function () {
          var message = ${JSON.stringify(message)};
          function send(event) {
            if (!window.opener) return;
            window.opener.postMessage(message, event.origin);
            window.removeEventListener("message", send, false);
          }
          window.addEventListener("message", send, false);
          if (window.opener) {
            window.opener.postMessage("authorizing:github", "*");
          } else {
            document.body.textContent = "請回到管理後台重新點選登入。";
          }
        })();
      </script>
    </body></html>`,
    {
      status: status === "success" ? 200 : 401,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
        "set-cookie": "decap_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
      },
    },
  );
}

export default async (request) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const savedState = (request.headers.get("cookie") || "")
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("decap_oauth_state="))
    ?.split("=")[1];

  if (!code || !state || !savedState || state !== savedState) {
    return resultPage("error", { message: "登入驗證失敗，請重新登入。" });
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/.netlify/functions/callback`,
    }),
  });

  const data = await tokenResponse.json();
  if (!tokenResponse.ok || !data.access_token) {
    return resultPage("error", { message: "無法取得 GitHub 授權，請確認 OAuth 設定。" });
  }

  return resultPage("success", { token: data.access_token, provider: "github" });
};
