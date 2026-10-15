"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";

// ============================================================
// 朝山報名表單
// ------------------------------------------------------------
// ★ 資料送到 Netlify Forms（點數方案免費、不限筆數），不會存進 GitHub。
//   每筆報名由 Netlify 寄 Email 通知到教團信箱 LJMMKT@ljm.org.tw（在 Netlify 後台設定）。
//   管理員登入後台後，可在 /admin/registrations 查看與下載名單。
// ★ 新版 Next.js 的頁面不會被 Netlify 偵測，所以 public/__forms.html 另有一份隱藏表單，
//   這裡送出時 POST 到那個檔案。兩邊欄位名稱必須一致，新增欄位時兩邊都要改。
// ★ 不寄副本給信眾（2026-10-15 用戶決定）：成功畫面不可承諾「會收到 Email」。
// ============================================================

const FORM_NAME = "pilgrimage-registration";

const ROUTES = [
  { value: "四公里路線（濱海公路 → 多羅觀音）", title: "四公里路線", desc: "濱海公路 → 多羅觀音" },
  { value: "一公里路線（地藏廣場 → 多羅觀音）", title: "一公里路線", desc: "地藏廣場 → 多羅觀音" },
  { value: "體驗路線（天眼門 → 多羅觀音）", title: "體驗路線", desc: "天眼門 → 多羅觀音" },
];

const inputClass =
  "w-full rounded-2xl border border-amber-200 bg-white px-5 py-4 text-lg text-stone-800 placeholder:text-stone-400 transition focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-200/60";

type Status = "idle" | "sending" | "done" | "error";

function FieldLabel({ htmlFor, children, optional = false }: { htmlFor?: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-baseline gap-2 font-serif text-lg font-bold text-amber-900">
      {children}
      <span className="text-sm font-normal text-amber-700/80">{optional ? "選填" : "必填"}</span>
    </label>
  );
}

export function RegistrationForm({ phone, phoneExt }: { phone: string; phoneExt: string }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [route, setRoute] = useState("");
  const [people, setPeople] = useState(1);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  // 「今天」以瀏覽器時間為準，掛載後才設定，避免伺服器與瀏覽器時區不同造成畫面不一致
  const [minDate, setMinDate] = useState<string | undefined>(undefined);

  useEffect(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    setMinDate(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`);
  }, []);

  const isDev = process.env.NODE_ENV === "development";
  const phoneHref = `tel:${phone.replace(/[^0-9]/g, "")}${phoneExt ? `,${phoneExt}` : ""}`;

  const resetFields = () => {
    setName("");
    setMobile("");
    setEmail("");
    setDate("");
    setRoute("");
    setPeople(1);
    setNote("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const formData = new FormData(event.currentTarget);
    // 防機器人：真人看不到這一欄，有填就當成垃圾訊息，假裝成功即可
    if (formData.get("bot-field")) {
      setStatus("done");
      return;
    }

    const routeTitle = ROUTES.find((r) => r.value === route)?.title ?? route;
    // 通知信主旨：讓教團信箱一眼看出是誰、哪天、哪條路線
    formData.set("subject", `【朝山報名】${name}｜${date}｜${routeTitle}｜${people} 人`);

    setStatus("sending");
    try {
      if (isDev) {
        // Same 預覽（開發模式）收不到 Netlify Forms，這裡只模擬成功，方便檢查畫面
        await new Promise((resolve) => setTimeout(resolve, 600));
      } else {
        const body = new URLSearchParams();
        formData.forEach((value, key) => body.append(key, String(value)));
        const response = await fetch("/__forms.html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
      }
      resetFields();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <form
        name={FORM_NAME}
        onSubmit={handleSubmit}
        className="rounded-3xl border border-amber-100 bg-white/75 p-6 shadow-xl backdrop-blur-sm md:p-10"
      >
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <input type="hidden" name="subject" value="" />
        <p className="hidden" aria-hidden="true">
          <label>
            請勿填寫此欄
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <div className="grid gap-7 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="reg-name">姓名</FieldLabel>
            <input
              id="reg-name"
              name="name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：王小明"
              className={inputClass}
            />
          </div>

          <div>
            <FieldLabel htmlFor="reg-phone">手機</FieldLabel>
            <input
              id="reg-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              required
              autoComplete="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="例如：0912345678"
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <FieldLabel htmlFor="reg-email" optional>
              Email
            </FieldLabel>
            <input
              id="reg-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="有 Email 的話，方便我們與您聯繫"
              className={inputClass}
            />
          </div>

          <div>
            <FieldLabel htmlFor="reg-date">朝山日期</FieldLabel>
            <input
              id="reg-date"
              name="date"
              type="date"
              required
              min={minDate}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <FieldLabel htmlFor="reg-people">人數</FieldLabel>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPeople((n) => Math.max(1, n - 1))}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-white text-2xl text-amber-800 transition hover:bg-amber-50 active:scale-95"
                aria-label="減少一人"
              >
                −
              </button>
              <input
                id="reg-people"
                name="people"
                type="number"
                inputMode="numeric"
                required
                min={1}
                max={500}
                value={people}
                onChange={(e) => setPeople(Math.max(1, Number(e.target.value) || 1))}
                className={`${inputClass} text-center`}
              />
              <button
                type="button"
                onClick={() => setPeople((n) => Math.min(500, n + 1))}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-white text-2xl text-amber-800 transition hover:bg-amber-50 active:scale-95"
                aria-label="增加一人"
              >
                +
              </button>
            </div>
          </div>

          <fieldset className="md:col-span-2">
            <legend className="mb-2 flex items-baseline gap-2 font-serif text-lg font-bold text-amber-900">
              路線
              <span className="text-sm font-normal text-amber-700/80">必填</span>
            </legend>
            <div className="grid gap-3 md:grid-cols-3">
              {ROUTES.map((option) => {
                const checked = route === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition ${
                      checked ? "border-amber-500 bg-amber-50 shadow-md" : "border-amber-100 bg-white hover:border-amber-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="route"
                      value={option.value}
                      required
                      checked={checked}
                      onChange={() => setRoute(option.value)}
                      className="mt-1 h-5 w-5 shrink-0 accent-amber-600"
                    />
                    <span>
                      <span className="block font-serif text-lg font-bold text-stone-800">{option.title}</span>
                      <span className="block text-base text-stone-600">{option.desc}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="md:col-span-2">
            <FieldLabel htmlFor="reg-note" optional>
              備註
            </FieldLabel>
            <textarea
              id="reg-note"
              name="note"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="例如：同行有長輩、需要住宿、團體名稱等"
              className={`${inputClass} resize-y`}
            />
          </div>
        </div>

        <p className="mt-7 text-sm leading-relaxed text-stone-500">您填寫的資料僅用於本次朝山報名的聯繫與安排。</p>

        {status === "error" && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-base leading-relaxed text-red-800" role="alert">
            送出沒有成功，請稍後再試一次；或直接來電報名：
            <a href={phoneHref} className="font-bold underline underline-offset-4">
              {phone}
              {phoneExt && ` 分機 ${phoneExt}`}
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-7 w-full rounded-full bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-5 font-serif text-xl font-bold tracking-[0.2em] text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "送出中…" : "確認報名"}
        </button>
      </form>

      {status === "done" && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reg-done-title"
        >
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-b from-amber-50 via-white to-amber-100 px-7 py-10 text-center shadow-2xl md:px-10">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-amber-300/30 blur-3xl" />
            <div className="relative mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg ring-8 ring-amber-100">
              <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </div>
            <h2 id="reg-done-title" className="relative font-serif text-2xl font-bold tracking-wide text-amber-900 md:text-3xl">
              阿彌陀佛，師兄師姐吉祥
            </h2>
            <div className="relative mt-6 space-y-3 text-lg leading-loose text-stone-700">
              <p>我們已收到您的朝山報名資訊。</p>
              <p>請安住身心，帶著虔誠清淨的心，期待與您在聖山相見。</p>
              <p>若有特殊調整，相關人員將會再與您聯繫。</p>
            </div>
            {isDev && <p className="relative mt-4 text-sm text-amber-700">（預覽模式：資料未實際送出）</p>}
            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="rounded-full bg-amber-600 px-8 py-3 text-lg font-medium text-white shadow-md transition hover:bg-amber-700"
              >
                回到首頁
              </Link>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="rounded-full border border-amber-300 bg-white px-8 py-3 text-lg font-medium text-amber-900 transition hover:bg-amber-50"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
