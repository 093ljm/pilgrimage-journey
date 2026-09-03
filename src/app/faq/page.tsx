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
      answer: "建議穿著輕便、吸汗、易活動的服裝，以運動服或寬鬆衣物為佳。鞋子選擇止滑、包覆性好的運動鞋或布鞋。必備物品有頭巾、袖套、手套、護膝、水壺、毛巾（朝山途中不戴帽子，改以頭巾遮陽）；另可視情況帶雨衣、個人藥品與糖果。避免穿著過於暴露或緊身的服裝。詳細的裝備清單會在報名後提供，也可參考「行前準備」頁面。若您是單獨前往朝山或光線不佳時朝山，建議穿著亮色系衣服，以讓來往車輛可以注意到您，以確保安全。",
    },
    {
      id: "q6",
      question: "下雨天還會朝山嗎？遇到天氣不好怎麼辦？",
      answer: "小雨通常不影響朝山活動進行，但會評估天候狀況。若遇颱風、豪雨等惡劣天氣，基於安全考量會延期或取消，並提前通知參加者。建議準備雨衣備用。朝山重視的是修行的心，無論晴雨，保持清淨心最重要。",
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
    {
      id: "q10",
      question: "參加朝山，可以住宿嗎？",
      answer:
        "可以喔！如果您參加一公里或四公里朝山，有住宿需求，可以事先致電聖山寺客堂詢問並登記。\n\n提醒您，寺院住宿會依男女眾分開安排，男女不可同住一間房間。建議確定朝山日期後，提早聯繫客堂確認住宿安排。",
    },
    {
      id: "q11",
      question: "可以帶小朋友一起來朝山嗎？",
      answer:
        "當然可以！朝山不只是大人的修持，孩子也可以一起體驗。\n\n如果擔心孩子體力不足，可以先從較輕鬆的「天眼門 → 多羅觀音」體驗路線開始。如果孩子年紀稍大，約國小三年級以上，也可以評估參加一公里朝山。\n\n朝山過程中，依循朝山修持方式，攝心、觀想、念佛，七步一拜朝禮聖山。若孩子或同行者體力真的有限，也不用勉強，可以將禮拜調整為問訊，以「七步一問訊」的方式完成朝禮。\n\n朝山不是比速度，而是動中禪，把心帶回來。",
    },
    {
      id: "q12",
      question: "可以自己選想走的路線，或晚上來朝山嗎？",
      answer:
        "目前靈鷲山無生道場有固定的三條朝山路線：\n\n• 四公里路線｜濱海公路 → 多羅觀音\n• 一公里路線｜地藏廣場 → 多羅觀音\n• 體驗路線｜天眼門 → 多羅觀音\n\n建議先依自己的體力與需求，選擇適合的路線，詳細路線介紹可點選「朝山路線與行儀」頁面了解詳情。\n\n另外，朝山建議安排在白天進行，不開放夜間朝山。山區天候變化較大，夜間視線不佳，加上部分路段鄰近公路，安全風險較高。\n\n最重要的是：出發前請先致電無生道場客堂，登記朝山日期、時間及路線。客堂會協助通知上下山往返車輛並進行交通安全管制，讓您可以更安心地完成朝山修持。",
      link: { text: "查看朝山路線與行儀", href: "/routes" },
    },
    {
      id: "q13",
      question: "家人年紀比較大、體力有限或行動不便，還能來朝山嗎？",
      answer:
        "如果長輩體力有限，可以先選擇「天眼門 → 多羅觀音」體驗路線，先感受朝山的過程。\n\n朝山時也不需要勉強自己一定要跪拜，如果體力有限，可以依身體狀況將禮拜調整為問訊，以「七步一問訊」的方式朝禮聖山。\n\n如果過程中感到身體不適，請立即休息，必要時尋求協助。",
    },
    {
      id: "q14",
      question: "想為家中的寵物祈福，可以帶牠一起朝山嗎？",
      answer:
        "可以喔！可以帶寵物一起朝山、為牠祈福。\n\n不過靈鷲山生態環境豐富，山區有不少野生動物，加上上下山會有車輛往返，因此帶寵物朝山時，請務必做好安全措施：\n\n• 全程繫好牽繩，不讓寵物自行奔跑。\n• 避免驚擾山區野生動物。\n• 為了不影響其他人的朝山修持，請與朝山隊伍保持適當距離，安排在隊伍後方參與朝山。\n• 隨時留意寵物的體力與狀況，必要時休息。\n\n讓我們一起守護山林，也讓人與動物都能安心朝禮聖山。",
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

          {/* 問題快速索引 */}
          <nav
            aria-label="常見問題快速索引"
            className="mb-10 rounded-3xl border border-amber-200/70 bg-white/65 p-6 shadow-lg backdrop-blur-sm md:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-sm">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                </svg>
              </span>
              <div>
                <p className="font-serif text-xs uppercase tracking-[0.25em] text-amber-700/70">
                  Quick Index
                </p>
                <h2 className="font-serif text-xl font-bold text-stone-800 md:text-2xl">
                  問題快速索引
                </h2>
              </div>
            </div>

            <ol className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {faqs.map((faq, index) => (
                <li key={`index-${faq.id}`}>
                  <a
                    href={`#${faq.id}`}
                    className="group flex h-full items-start gap-3 rounded-xl border border-transparent bg-amber-50/60 px-4 py-3 text-stone-700 transition-all duration-300 hover:border-amber-300/70 hover:bg-white hover:text-amber-900 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
                  >
                    <span className="flex h-7 min-w-7 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 font-serif text-xs font-bold text-amber-800 transition-colors duration-300 group-hover:bg-amber-600 group-hover:text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-0.5 text-sm leading-relaxed">
                      {faq.question}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <p className="mb-6 text-center text-sm text-stone-600">
            點選問題即可展開查看答案
          </p>

          {/* FAQ 列表 */}
          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <details
                key={faq.id}
                id={faq.id}
                className="group scroll-mt-28 rounded-2xl border border-transparent bg-white/60 shadow-lg backdrop-blur-sm transition-all duration-300 open:bg-white/75 open:shadow-xl target:border-amber-500/70 target:ring-4 target:ring-amber-300/30"
              >
                {/* 問題與展開控制 */}
                <summary className="flex cursor-pointer list-none items-center gap-4 rounded-2xl px-6 py-6 transition-colors duration-300 hover:bg-amber-50/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-600 md:px-8 md:py-7 [&::-webkit-details-marker]:hidden">
                  <span className="flex h-10 min-w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 font-serif text-sm font-bold text-white shadow-sm md:h-11 md:min-w-11">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="flex-1 font-serif text-xl font-bold leading-snug text-amber-900 md:text-2xl">
                    {faq.question}
                  </h2>
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-amber-300/80 bg-amber-50 text-amber-700 transition-all duration-300 group-open:rotate-180 group-open:bg-amber-600 group-open:text-white">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>

                {/* 答案 */}
                <div className="px-6 pb-7 md:px-8 md:pb-8">
                  <div className="border-t border-amber-200/70 pt-5">
                    <div className="rounded-xl bg-gradient-to-r from-amber-50 to-transparent p-5 md:p-6">
                      <p className="whitespace-pre-line text-base leading-loose text-stone-700 md:text-lg" style={{ letterSpacing: '0.02em' }}>
                        {faq.answer}
                      </p>
                      {faq.link && (
                        <Link
                          href={faq.link.href}
                          className="group/link mt-5 inline-flex items-center gap-1.5 font-medium text-amber-700 transition-all duration-300 hover:text-amber-900"
                        >
                          {faq.link.text}
                          <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
