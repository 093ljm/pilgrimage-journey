import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "常見問題 - 靈鷲山朝聖之旅",
  description: "關於靈鷲山朝山的常見問題解答，了解朝山的意義與修行的目的",
};

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  link?: { text: string; href: string };
}

export default function FAQPage() {
  const faqs: FAQItem[] = [
    {
      id: "q1",
      question: "第一次朝山會不會很累？體力不好、年紀大可以參加嗎？",
      answer: "朝山確實需要一定的體力，但更重要的是用心和虔誠。我們建議初次參加者選擇較短、較平緩的路線，循序漸進，過程中可以隨時休息，沒有時間壓力。年長或身體狀況特殊的朋友，建議參加前先諮詢醫師意見，現場也會有護法志工從旁協助。許多體力較弱的信眾，透過虔誠的心念與團體的支持，都能順利完成朝山。最重要的是量力而為、安全第一，聆聽自己身體的聲音；若無法實際朝山，也可以透過其他方式修行。",
    },
    {
      id: "q2",
      question: "朝山一定要一步一拜嗎？可以用走的嗎？",
      answer: "朝山的方式有多種，包括七步一拜、三步一拜、一步一拜，或是虔誠步行。最重要的是心誠則靈，以恭敬心和清淨心來進行。對於初學者或體力較弱者，可以採用步行的方式，同樣能獲得修行的利益。重點在於專注當下，清楚覺知每一個動作，與每一次稱念佛號。",
    },
    {
      id: "q3",
      question: "朝山時心裡要想什麼？可以祈求事情嗎？",
      answer: "朝山時建議專心持誦佛號或懺悔偈，保持心念清淨。可以懷著感恩、懺悔、祈願的心，但不要執著於特定的祈求。朝山是修行的過程，透過身體的禮拜，淨化心靈，增長智慧。當心清淨了，自然能與佛心相應，得到真正的利益。朝山圓滿後，建議您將朝山功德迴向給一切眾生皆能離苦得樂，或者以通用迴向偈做大迴向（朝山功德殊勝行　無邊勝福皆迴向　普願沉溺諸有情　速往無量光佛剎　十方三世一切佛　一切菩薩摩訶薩　摩訶般若波羅密）。做完大迴向後，您可以再為您現世中所祈求的事情迴向。",
    },
    {
      id: "q4",
      question: "朝山一定要有佛教基礎嗎？沒學佛可以參加嗎？",
      answer: "朝山歡迎所有有心學習的朋友參加，不需要有佛教基礎。我們會在活動前說明朝山的意義、方法和注意事項。許多人就是透過朝山開始接觸佛法，體會修行的殊勝。保持開放和恭敬的心，就是最好的準備。",
    },
    {
      id: "q5",
      question: "朝山前需要準備什麼？衣服、裝備怎麼選？",
      answer: "建議穿著輕便、吸汗、易活動的服裝，以運動服或寬鬆衣物為佳。鞋子選擇止滑、包覆性好的運動鞋或布鞋。可準備毛巾、水壺、遮陽帽等。避免穿著過於暴露或緊身的服裝。詳細的裝備清單會在報名後提供，也可參考「行前準備」頁面。若您是單獨前往朝山或光線不佳時朝山，建議穿著亮色系衣服，以讓來往車輛可以注意到您，以確保安全。",
    },
    {
      id: "q6",
      question: "下雨天還會朝山嗎？遇到天氣不好怎麼辦？",
      answer: "小雨通常不影響朝山活動進行，但會評估天候狀況。若遇颱風、豪雨等惡劣天氣，基於安全考量會延期或取消，並提前通知參加者。建議準備雨具備用。朝山重視的是修行的心，無論晴雨，保持清淨心最重要。",
    },
    {
      id: "q7",
      question: "朝山和參加一般法會有什麼不同？",
      answer: "朝山是動態的修行方式，透過身體的禮拜和行走，結合持誦佛號，達到身心合一的修持。一般法會則以靜態的誦經、聽法為主。朝山更強調實際的身體力行，在過程中磨練心性，去除我慢。兩者都是殊勝的修行法門，各有其特色和利益。",
    },
    {
      id: "q8",
      question: "來靈鷲山朝山需要事前申請嗎？",
      answer: "若是超過 20 人以上的團體，敬請填寫團體參訪申請表，以利知會道場相關部門，提供更完善的服務。若是自行前往，則不需申請，但建議提前一天通報，讓交通組與安管組同仁知悉。此外，朝山時請務必盡可能靠右邊朝拜，以避免發生危險。",
    },
    {
      id: "q9",
      question: "朝山有固定的流程嗎？",
      answer: "建議參照朝山儀軌進行。簡單來說，靈鷲山朝山儀軌分成三段——前行、正行、結行。前行：一、念誦〈楊枝淨水讚〉（灑淨的作用）；二、持〈大悲咒〉；三、念誦發願文。正行：朝山。結行：回向與三皈依。",
      link: { text: "查看完整朝山儀軌", href: "/routes" },
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


      {/* 主要內容 */}
      <div className="container mx-auto px-4 pt-28 pb-16">
        <article className="max-w-4xl mx-auto">
          {/* 頁面標題 */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 text-stone-800 tracking-wide">
            常見問題
          </h1>

          {/* FAQ 列表 */}
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg">
                {/* 問題 */}
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-amber-900 mb-6">
                  Q{index + 1}. {faq.question}
                </h2>

                {/* 答案 */}
                <div className="p-6 bg-gradient-to-r from-amber-50 to-transparent rounded-lg">
                  <p className="text-base md:text-lg text-stone-700 leading-loose" style={{ letterSpacing: '0.02em' }}>
                    {faq.answer}
                  </p>
                  {faq.link && (
                    <Link
                      href={faq.link.href}
                      className="group inline-flex items-center gap-1.5 mt-5 font-medium text-amber-700 transition-all duration-300 hover:text-amber-900"
                    >
                      {faq.link.text}
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
