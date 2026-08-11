
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "法師開示 - 靈鷲山朝聖之旅",
  description: "靈鷲山法師的開示與教導，了解朝山修行的深層智慧",
};

export default function TeachingsPage() {
  const teachings = [
    {
      id: "chang-cun",
      title: "常存法師",
      author: "常存法師",
      content: {
        paragraphs: [
          "一次團體朝山圓滿，受邀來開示的常存法師分享自己的靈鷲山朝山經驗。在二十多年前，尚未出家的她聽聞靈鷲山殊勝前來朝山。早期上山道路都是碎石子，朝山跪拜時雙腿非常疼痛，無平坦處可避之下，只能不斷告訴自己安住當下；隨著天亮太陽出現，又找不到陰涼地，也只好瀟灑接受烈日考驗。累到不想朝山了，可是前不著村後不著店，只能繼續前進，心裡想到了山上要馬上買瓶可樂清涼一下，抵達山頭放眼一望，僅見茅草屋一間，什麼商家也沒有，最後只有釋懷一飲山海。這一趟朝山帶給她最大的體悟就是-放下。人常常分不清需要和想要，心一直外求，朝山是讓心念不斷放下的過程。誠如上師-心道法師所說：「人生是夢幻泡影，要有一顆平實心，隨遇而安，隨緣而住」，這是自然的法則。",
        ],
      },
      highlight: "心是魔也是佛，看你如何造就它。朝山（拜山）是淨化心靈的修行，腳踏實地慢慢走，慢慢拜，心也會隨著愈來愈清明和靈光。",
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
            法師開示
          </h1>

          {/* 法師開示列表 */}
          <div className="space-y-12">
            {teachings.map((teaching) => (
              <div key={teaching.id} className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg">
                {/* 標題與作者 */}
                <div className="mb-6 border-b border-amber-200 pb-4">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-amber-900 mb-2">
                    {teaching.title}
                  </h2>
                  <p className="text-sm text-amber-700">
                    開示法師：{teaching.author}
                  </p>
                </div>

                {/* 內容 */}
                <div className="space-y-4">
                  {teaching.content.paragraphs.map((paragraph, index) => (
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
                {teaching.highlight && (
                  <div className="mt-8 p-6 border-l-4 border-amber-600 bg-gradient-to-r from-amber-50 to-transparent rounded-r-lg">
                    <p className="font-serif text-lg md:text-xl text-amber-900 font-medium italic">
                      {teaching.highlight}
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
