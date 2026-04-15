import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "朝山法門 - 靈鷲山朝聖之旅",
  description: "認識朝山法門的意義與修行方法，了解朝山的精神與傳統",
};

export default function DharmaPage() {
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
        <div className="max-w-4xl mx-auto">
          {/* 頁面標題 */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 text-stone-800 tracking-wide">
            朝山法門
          </h1>

          {/* 第一篇文章：朝山的意義 */}
          <article className="mb-16">
            {/* 文章標題區 */}
            <div className="text-center mb-12">
              <p className="text-amber-700 font-medium tracking-wider mb-2">
                觀念篇－１
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-900">
                朝山的意義
              </h2>
            </div>

            {/* 引言區塊 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg mb-10">
              <div className="text-center space-y-4">
                <p className="font-serif text-xl md:text-2xl text-stone-800 leading-relaxed">
                  朝山，帶我們回到佛法的最根本<span className="whitespace-nowrap">「修行」</span>
                </p>
                <p className="font-serif text-xl md:text-2xl text-stone-700">
                  為什麼要修行？
                </p>
                <p className="font-serif text-xl md:text-2xl text-amber-900 font-medium">
                  目的就是為了幫助自己<span className="whitespace-nowrap">「調心」</span>
                </p>
              </div>
            </div>

            {/* 心道法師開示 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg mb-10">
              <div className="mb-6 border-b border-amber-200 pb-4">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-amber-900">
                  心道法師開示
                </h3>
              </div>

              <div className="space-y-6">
                <p className="text-base md:text-lg text-stone-600 italic" style={{ letterSpacing: '0.02em' }}>
                  弟子請教上師-<span className="whitespace-nowrap">心道法師</span>，朝山到底在拜什麼？為什麼要拜？
                </p>

                <p className="text-base md:text-lg text-stone-700 leading-loose" style={{ letterSpacing: '0.02em' }}>
                  心道法師說，朝山（拜山）是在禮拜<span className="whitespace-nowrap">佛法真理</span>。因為人心都會有迷惑、矛盾、<span className="whitespace-nowrap">顛倒妄想</span>，生活中也會發生許多不如意、不協調的事情，如果願意認識和實踐佛法真理，就會對<span className="whitespace-nowrap">七情六欲</span>由來開竅，知道如何面對和處理。朝山一步一腳，一起一拜，不但身體變健康，心也會更定靜、柔軟，慢慢<span className="whitespace-nowrap">明心見性</span>開智慧。所以，朝山是治馭像猴子一樣調皮的心非常有效的<span className="whitespace-nowrap">修行法門</span>。
                </p>
              </div>
            </div>
          </article>

          {/* 分隔裝飾 */}
          <div className="flex justify-center my-16">
            <div className="w-16 h-16 rounded-full border-2 border-amber-600/30 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-amber-600/50 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-amber-600/70" />
              </div>
            </div>
          </div>

          {/* 第二篇文章：朝山的功德 */}
          <article className="mb-16">
            {/* 文章標題區 */}
            <div className="text-center mb-12">
              <p className="text-amber-700 font-medium tracking-wider mb-2">
                觀念篇－２
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-900">
                朝山的功德
              </h2>
            </div>

            {/* 引言區塊 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg mb-10">
              <div className="text-center space-y-4">
                <p className="font-serif text-xl md:text-2xl text-stone-800 leading-relaxed">
                  朝山要虔誠專一。
                </p>
                <p className="font-serif text-xl md:text-2xl text-amber-900 font-medium">
                  以清淨心如實修行，自然收獲<span className="whitespace-nowrap">不可思議功德</span>。
                </p>
              </div>
            </div>

            {/* 主要內容 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg mb-10">
              <p className="text-base md:text-lg text-stone-700 leading-loose mb-8" style={{ letterSpacing: '0.02em' }}>
                朝山的目的不是為了功德，可是會因為虔誠和專一，讓佛心（真理）與自己的心相互有感應，自然收獲<span className="whitespace-nowrap">不可思議功德</span>。
              </p>

              {/* 功德一：去除身執，降伏我慢 */}
              <div className="mb-8">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-amber-900 mb-4 border-l-4 border-amber-600 pl-4">
                  去除身執，降伏我慢
                </h3>
                <p className="text-base md:text-lg text-stone-700 leading-loose" style={{ letterSpacing: '0.02em' }}>
                  人最大的毛病就是傲慢。心裡總會有一個高高在上的自己，<span className="whitespace-nowrap">「我執」</span>因此產生，痛苦就隨之而來。人生是<span className="whitespace-nowrap">夢幻泡影</span>的生命，把每件事都看得很嚴重，就是跟自己的生命過不去。如果我們的心能夠不虛妄，許多煩惱就會自然遠離。朝山過程拉下高度，紮實頂禮，幫助我們虛心謙卑，除去傲慢，在呼吸之間體悟平常。
                </p>
              </div>

              {/* 功德二：消除業障，免除災難 */}
              <div className="mb-8">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-amber-900 mb-4 border-l-4 border-amber-600 pl-4">
                  消除業障，免除災難
                </h3>
                <p className="text-base md:text-lg text-stone-700 leading-loose" style={{ letterSpacing: '0.02em' }}>
                  佛法講生命一切都是<span className="whitespace-nowrap">因緣果報</span>。生命是記憶體，人與人彼此會有記憶串連，這種串連在佛法中叫做業力。業力會導演生命的走向，好壞、起落、是非。業就是因果，只要「因」做對了，「果」就會美好。朝山是最能消除惡業的<span className="whitespace-nowrap">修行法門</span>。因為朝山過程清淨身（恭敬禮拜）、口（誦念佛號）、意（誠心懺悔），慢慢消化過去生的業障，減除今世的生活災難。
                </p>
              </div>

              {/* 功德三：開展智慧，普皆迥向 */}
              <div className="mb-8">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-amber-900 mb-4 border-l-4 border-amber-600 pl-4">
                  開展智慧，普皆迥向
                </h3>
                <p className="text-base md:text-lg text-stone-700 leading-loose" style={{ letterSpacing: '0.02em' }}>
                  朝山也是拜願。心即是佛，當心靜定下來，<span className="whitespace-nowrap">明心見性</span>，就會和佛心結合在一起，開啟智慧。有大智慧就不會自我束縛，明白如何處事圓滿，福慧一旦俱足，就會推動你的願望逐步實現。朝山收獲的法喜不只自己受用，也要迥向所有<span className="whitespace-nowrap">六道眾生</span>，做到<span className="whitespace-nowrap">自利利他</span>，<span className="whitespace-nowrap">自覺覺他</span>，讓一切眾生法益均霑。
                </p>
              </div>

              {/* 功德四：堅固學佛信心和實踐力 */}
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-amber-900 mb-4 border-l-4 border-amber-600 pl-4">
                  堅固學佛信心和實踐力
                </h3>
                <p className="text-base md:text-lg text-stone-700 leading-loose" style={{ letterSpacing: '0.02em' }}>
                  虔心朝山可以讓心沉靜，更容易深入體會佛法，生出<span className="whitespace-nowrap">不退轉</span>學佛信心和實踐力。過程會遇到各種不同考驗。例如：下雨天冷猶豫是否要出門、一開始接觸朝山感覺氣喘噓噓。既然朝山是修行，就要有意志力堅持。毅力不足就會變成光知道佛法，卻無法落實在生活裡。學佛，先把動作學習清楚，<span className="whitespace-nowrap">持之以恆</span>做出法味，執法之相就會鬆開，然後發現其實骨縫之間仍然<span className="whitespace-nowrap">游刃有餘</span>。
                </p>
              </div>
            </div>
          </article>

          {/* 底部分隔裝飾 */}
          <div className="flex justify-center my-16">
            <div className="w-16 h-16 rounded-full border-2 border-amber-600/30 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-amber-600/50 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-amber-600/70" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
