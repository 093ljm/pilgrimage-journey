"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

// ============================================================
// 朝山報名名單（管理後台）
// ------------------------------------------------------------
// ★ 沿用 /admin 的 GitHub 登入：Decap 登入後把權杖存在 localStorage「decap-cms-user」。
//   這裡帶著權杖呼叫 /.netlify/functions/registrations，伺服器確認是網站管理員才回傳名單。
// ★ Same 預覽（開發模式）沒有 Netlify 函式，會改顯示「示範資料」，方便檢查畫面。
// ★ 名單含個人資料：不存進 GitHub、不快取；下載的 CSV 由管理員自行保管。
// ============================================================

type Submission = {
  id: string;
  createdAt: string;
  data: Record<string, string>;
};

type LoadState =
  | { kind: "loading" }
  | { kind: "needLogin" }
  | { kind: "error"; message: string }
  | { kind: "ready"; submissions: Submission[]; formFound: boolean; demo: boolean };

const COLUMNS: { key: string; label: string }[] = [
  { key: "name", label: "姓名" },
  { key: "phone", label: "手機" },
  { key: "email", label: "Email" },
  { key: "date", label: "朝山日期" },
  { key: "route", label: "路線" },
  { key: "people", label: "人數" },
  { key: "note", label: "備註" },
];

const DEMO: Submission[] = [
  {
    id: "demo-1",
    createdAt: new Date(Date.now() - 3600_000).toISOString(),
    data: { name: "王小明（示範）", phone: "0912345678", email: "demo@example.com", date: "2026-10-25", route: "一公里路線（地藏廣場 → 多羅觀音）", people: "2", note: "同行有長輩" },
  },
  {
    id: "demo-2",
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
    data: { name: "陳美麗（示範）", phone: "0987654321", email: "", date: "2026-11-08", route: "體驗路線（天眼門 → 多羅觀音）", people: "5", note: "" },
  },
];

function readToken(): string {
  try {
    const raw = window.localStorage.getItem("decap-cms-user");
    if (!raw) return "";
    const user = JSON.parse(raw) as { token?: string };
    return user.token ?? "";
  } catch {
    return "";
  }
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function shortRoute(route: string): string {
  return route.split("（")[0] || route;
}

function toCsv(rows: Submission[]): string {
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const header = ["報名時間", ...COLUMNS.map((c) => c.label)].map(escape).join(",");
  const lines = rows.map((row) =>
    [formatTime(row.createdAt), ...COLUMNS.map((c) => row.data[c.key] ?? "")].map(escape).join(","),
  );
  // 開頭加 BOM，Excel 開啟時中文才不會變亂碼
  return `\uFEFF${[header, ...lines].join("\r\n")}`;
}

export function RegistrationsList() {
  const [state, setState] = useState<LoadState>({ kind: "loading" });
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "date">("newest");
  const isDev = process.env.NODE_ENV === "development";

  const load = useCallback(async () => {
    setState({ kind: "loading" });
    const token = readToken();

    if (isDev && !token) {
      setState({ kind: "ready", submissions: DEMO, formFound: true, demo: true });
      return;
    }
    if (!token) {
      setState({ kind: "needLogin" });
      return;
    }

    try {
      const response = await fetch("/.netlify/functions/registrations", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (isDev && response.status === 404) {
        setState({ kind: "ready", submissions: DEMO, formFound: true, demo: true });
        return;
      }
      const body = (await response.json().catch(() => ({}))) as {
        error?: string;
        submissions?: Submission[];
        formFound?: boolean;
      };
      if (response.status === 401) {
        setState({ kind: "needLogin" });
        return;
      }
      if (!response.ok) {
        setState({ kind: "error", message: body.error || "暫時無法讀取報名名單，請稍後再試。" });
        return;
      }
      setState({
        kind: "ready",
        submissions: body.submissions ?? [],
        formFound: body.formFound ?? false,
        demo: false,
      });
    } catch {
      setState({ kind: "error", message: "網路連線失敗，請確認網路後再試一次。" });
    }
  }, [isDev]);

  useEffect(() => {
    load();
  }, [load]);

  const rows = useMemo(() => {
    if (state.kind !== "ready") return [];
    const word = keyword.trim();
    const filtered = word
      ? state.submissions.filter((s) => Object.values(s.data).some((v) => v.includes(word)))
      : state.submissions;
    const sorted = [...filtered];
    if (sortBy === "date") sorted.sort((a, b) => (a.data.date || "").localeCompare(b.data.date || ""));
    else sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return sorted;
  }, [state, keyword, sortBy]);

  const download = () => {
    if (state.kind !== "ready") return;
    const blob = new Blob([toCsv(state.submissions)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const today = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const link = document.createElement("a");
    link.href = url;
    link.download = `朝山報名名單_${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/60">
      <header className="sticky top-0 z-10 border-b border-amber-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-stone-800">朝山報名名單</h1>
            {state.kind === "ready" && (
              <p className="text-sm text-stone-500">
                共 {state.submissions.length} 筆報名
                {keyword && `，符合搜尋 ${rows.length} 筆`}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin"
              className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              ← 回到內容管理
            </Link>
            <button
              type="button"
              onClick={load}
              className="rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-900 transition hover:bg-amber-50"
            >
              重新整理
            </button>
            <button
              type="button"
              onClick={download}
              disabled={state.kind !== "ready" || state.submissions.length === 0}
              className="rounded-full bg-amber-600 px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              下載 Excel（CSV）
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {state.kind === "loading" && <p className="py-20 text-center text-lg text-stone-500">名單讀取中…</p>}

        {state.kind === "needLogin" && (
          <div className="mx-auto max-w-md rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-sm">
            <p className="text-lg leading-relaxed text-stone-700">請先登入內容管理後台，才能查看報名名單。</p>
            <Link
              href="/admin"
              className="mt-6 inline-block rounded-full bg-amber-600 px-8 py-3 font-medium text-white shadow-md transition hover:bg-amber-700"
            >
              前往登入
            </Link>
          </div>
        )}

        {state.kind === "error" && (
          <div className="mx-auto max-w-lg rounded-3xl border border-red-200 bg-red-50 p-8 text-center" role="alert">
            <p className="text-lg leading-relaxed text-red-800">{state.message}</p>
            <button
              type="button"
              onClick={load}
              className="mt-6 rounded-full bg-white px-6 py-2 font-medium text-red-800 shadow-sm ring-1 ring-red-200 transition hover:bg-red-100"
            >
              再試一次
            </button>
          </div>
        )}

        {state.kind === "ready" && (
          <>
            {state.demo && (
              <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-100/70 px-5 py-3 text-sm text-amber-900">
                預覽模式：以下是示範資料。正式網站上線後，這裡會顯示真正的報名名單。
              </div>
            )}

            {state.submissions.length === 0 ? (
              <p className="py-20 text-center text-lg text-stone-500">目前還沒有任何報名資料。</p>
            ) : (
              <>
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="搜尋姓名、手機、日期、路線…"
                    className="w-full rounded-full border border-stone-200 bg-white px-5 py-3 text-base focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-200/60 sm:max-w-sm"
                  />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "newest" | "date")}
                    className="rounded-full border border-stone-200 bg-white px-5 py-3 text-base focus:border-amber-500 focus:outline-none"
                    aria-label="排序方式"
                  >
                    <option value="newest">最新報名在前</option>
                    <option value="date">依朝山日期排序</option>
                  </select>
                </div>

                {/* 電腦：表格 */}
                <div className="hidden overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-amber-50 text-stone-600">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-3 font-medium">報名時間</th>
                        {COLUMNS.map((c) => (
                          <th key={c.key} className="whitespace-nowrap px-4 py-3 font-medium">
                            {c.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-800">
                      {rows.map((row) => (
                        <tr key={row.id} className="align-top hover:bg-amber-50/40">
                          <td className="whitespace-nowrap px-4 py-3 text-stone-500">{formatTime(row.createdAt)}</td>
                          <td className="whitespace-nowrap px-4 py-3 font-medium">{row.data.name}</td>
                          <td className="whitespace-nowrap px-4 py-3">
                            <a href={`tel:${row.data.phone}`} className="text-amber-800 hover:underline">
                              {row.data.phone}
                            </a>
                          </td>
                          <td className="px-4 py-3">
                            {row.data.email && (
                              <a href={`mailto:${row.data.email}`} className="break-all text-amber-800 hover:underline">
                                {row.data.email}
                              </a>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">{row.data.date}</td>
                          <td className="whitespace-nowrap px-4 py-3" title={row.data.route}>
                            {shortRoute(row.data.route)}
                          </td>
                          <td className="px-4 py-3 text-center">{row.data.people}</td>
                          <td className="min-w-[12rem] px-4 py-3 text-stone-600">{row.data.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 手機：卡片 */}
                <ul className="space-y-3 md:hidden">
                  {rows.map((row) => (
                    <li key={row.id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="font-serif text-lg font-bold text-stone-800">{row.data.name}</p>
                        <p className="text-xs text-stone-400">{formatTime(row.createdAt)}</p>
                      </div>
                      <p className="mt-2 text-base text-stone-700">
                        {row.data.date}｜{shortRoute(row.data.route)}｜{row.data.people} 人
                      </p>
                      <p className="mt-1 text-base">
                        <a href={`tel:${row.data.phone}`} className="text-amber-800">
                          {row.data.phone}
                        </a>
                        {row.data.email && (
                          <a href={`mailto:${row.data.email}`} className="ml-3 break-all text-amber-800">
                            {row.data.email}
                          </a>
                        )}
                      </p>
                      {row.data.note && <p className="mt-2 text-sm text-stone-600">備註：{row.data.note}</p>}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p className="mt-8 text-center text-xs leading-relaxed text-stone-500">
              名單含個人資料，下載的檔案請妥善保管，使用完畢請刪除。
            </p>
          </>
        )}
      </main>
    </div>
  );
}
