import type { ReactNode } from "react";

// ============================================================
// ※ 備註行 — 全站統一樣式
// ------------------------------------------------------------
// ★ 給維護人員：
//   一般備註       <Note>文字</Note>
//   淺色方框備註   <Note boxed>文字</Note>
//   調整外距       <Note className="mt-3">文字</Note>
//
//   ※ 符號獨立一欄，文字換行時會自動對齊，不會跑到符號下面。
//   ※ 小圓點（•）保留給區段強調使用，備註一律用 ※。
// ============================================================
export function Note({
  children,
  boxed = false,
  className = "",
}: {
  children: ReactNode;
  boxed?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`flex items-start gap-1.5 text-sm text-stone-600 leading-relaxed ${
        boxed ? "rounded-lg bg-amber-100/50 p-3" : ""
      } ${className}`}
    >
      <span className="flex-shrink-0 text-amber-700/70">※</span>
      <span>{children}</span>
    </p>
  );
}
