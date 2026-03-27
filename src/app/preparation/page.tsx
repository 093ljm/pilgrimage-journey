import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "行前準備 - 靈鷲山朝聖之旅",
  description: "靈鷲山朝山行前準備事項，讓您做好充分準備開始朝聖之旅",
};

export default function PreparationPage() {
  return (
    <main className="min-h-screen relative flex items-center justify-center">
      {/* 背景層 */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-amber-50 to-amber-100" />

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-900 hover:text-amber-700 transition-colors duration-300 group mb-8"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">返回首頁</span>
          </Link>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            行前準備
          </h1>
          <p className="text-xl text-stone-600 mb-8">
            此頁面內容建設中...
          </p>
          <p className="text-stone-500">
            敬請期待朝山行前準備的詳細指引
          </p>
        </div>
      </div>
    </main>
  );
}
