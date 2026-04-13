import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "常見問題 - 靈鷲山朝聖之旅",
  description: "關於靈鷲山朝山的常見問題解答，了解朝山的意義與修行的目的",
};

export default function FAQPage() {
  const faqs = [
    {
      id: "q1",
      question: "為什麼要修行？",
      content: {
        paragraphs: [
          "朝山到底在拜什麼？為什麼要拜？心道法師說，朝山（拜山）是在禮拜佛法真理。因為人心都會有迷惑、矛盾、顛倒妄想，生活中也會發生許多不如意、不協調的事情，如果願意認識和實踐佛法真理，就會對七情六欲由來開竅，知道如何面對和處理。朝山一步一腳，一起一拜，不但身體變健康，心也會更定靜、柔軟，慢慢明心見性開智慧。所以，朝山是治馭像猴子一樣調皮的心非常有效的修行法門。",
        ],
      },
      highlight: "朝山，帶我們回到佛法的最根本「修行」，目的就是為了幫助自己「調心」",
    },
  ];

  return (
    <main className="min-h-screen relative">
      {/* 背景層 */}
      <div className="fixed inset-0 -z-10">
        {/* 基礎漸變背景 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #fef3c7 0%, #fde68a 50%, #f59e0b 100%)',
          }}
        />

        {/* 紙張紋理 1 */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise1'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise1)' opacity='0.5' /%3E%3C/svg%3E")`,
          }}
        />

        {/* 紙張紋理 2 */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise2'%3E%3CfeTurbulence baseFrequency='1.5' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise2)' opacity='0.3' /%3E%3C/svg%3E")`,
          }}
        />

        {/* 顆粒紋理 */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* 返回首頁按鈕 */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-900 hover:text-amber-700 transition-colors duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">返回首頁</span>
        </Link>
      </div>

      {/* 主要內容 */}
      <div className="container mx-auto px-4 pb-16">
        <article className="max-w-4xl mx-auto">
          {/* 頁面標題 */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 text-stone-800 tracking-wide">
            常見問題
          </h1>

          {/* FAQ 列表 */}
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg">
                {/* 問題 */}
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-amber-900 mb-6">
                  Q1. {faq.question}
                </h2>

                {/* 答案 */}
                <div className="space-y-4">
                  {faq.content.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base md:text-lg text-stone-700 leading-loose"
                      style={{ letterSpacing: '0.02em' }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* 重點摘要 */}
                {faq.highlight && (
                  <div className="mt-8 p-6 border-l-4 border-amber-600 bg-gradient-to-r from-amber-50 to-transparent rounded-r-lg">
                    <p className="font-serif text-lg md:text-xl text-amber-900 font-medium italic">
                      {faq.highlight}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
