"use client";

import { useEffect } from "react";

// ============================================================
// Decap CMS 載入器
// ------------------------------------------------------------
// ★ 正式模式：使用 GitHub 帳號登入，內容直接寫回 GitHub。
// ★ 示範模式：不連接 GitHub，僅供操作介面試用與教學，資料不會保存。
//
//   base_url 由目前網址自動帶入，日後換網域或換部署平台都不必改設定。
// ============================================================

const CMS_SCRIPT_ID = "decap-cms-script";
const CMS_SCRIPT_SRC = "https://unpkg.com/decap-cms@3.8.3/dist/decap-cms.js";

declare global {
  interface Window {
    CMS_MANUAL_INIT?: boolean;
    CMS?: { init: (options: { config: Record<string, unknown> }) => void };
  }
}

export function DecapAdmin({ demo = false }: { demo?: boolean }) {
  useEffect(() => {
    if (document.getElementById(CMS_SCRIPT_ID)) return;

    window.CMS_MANUAL_INIT = true;

    if (!document.querySelector('link[rel="cms-config-url"]')) {
      const link = document.createElement("link");
      link.rel = "cms-config-url";
      link.type = "text/yaml";
      link.href = "/admin/config.yml";
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.id = CMS_SCRIPT_ID;
    script.src = CMS_SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      window.CMS?.init({
        config: demo
          ? { backend: { name: "test-repo" }, local_backend: false }
          : { backend: { base_url: window.location.origin } },
      });
    };
    document.body.appendChild(script);
  }, [demo]);

  return null;
}
