import {
  FadeCarousel,
  CarouselSlide,
  TextOverlay,
  BackgroundImage,
} from "@/components/ui/fade-carousel";

export default function Home() {
  return (
    <main className="relative">
      <FadeCarousel autoplayInterval={10000}>
        {/* Page 1: 日落孤树 - 天空明亮，使用強化陰影確保可讀性 */}
        <CarouselSlide>
          <BackgroundImage
            src="/images/page1-sunset-tree.jpg"
            alt="日落中的孤樹剪影"
            priority={true}
            useMinimalOverlay={true}
          />
          <TextOverlay
            mainTitle="佛陀的囑託<br/>兩千年的遙望"
            content="佛陀在<span class='whitespace-nowrap'>印度</span>的靈鷲山宣說妙法，<span class='whitespace-nowrap'>《大般涅槃經》</span>中提到信眾應朝禮四處<span class='whitespace-nowrap'>（生、<wbr>道、<wbr>轉、<wbr>滅）</span>的遺教。這個囑託開啟了信眾「朝山」的渴仰。這不只是一段路，而是一場跨越時空的歸鄉。"
            endQuote="「朝山，是為了與聖者對話。」"
            shadowStyle="strong"
          />
        </CarouselSlide>

        {/* Page 2: 佛教石雕 - 使用暗角效果與深咖啡金色 */}
        <CarouselSlide>
          <BackgroundImage
            src="/images/page2-buddha-relief.jpg"
            alt="佛教石雕浮雕"
          />
          <TextOverlay
            mainTitle="大唐盛世的步履"
            content="四大名山的慈悲迴響，<span class='whitespace-nowrap'>文殊</span>、<wbr><span class='whitespace-nowrap'>觀音</span>、<wbr><span class='whitespace-nowrap'>普賢</span>、<wbr><span class='whitespace-nowrap'>地藏</span>四大山頭的信仰，確立<span class='whitespace-nowrap'>「三步一拜」</span>磨練心志的修行傳統。當四大菩薩的願力化作<span class='whitespace-nowrap'>五台</span>、<wbr><span class='whitespace-nowrap'>普陀</span>、<wbr><span class='whitespace-nowrap'>峨眉</span>、<wbr><span class='whitespace-nowrap'>九華</span>的峰巒，朝山的足跡便在華夏大地刻下了謙卑的印記。"
            endQuote="「步步蓮花，禮拜四大菩薩」"
            shadowStyle="ultra"
            useVignetteEffect={true}
            textColor="#4A3B2A"
          />
        </CarouselSlide>

        {/* Page 3: 渔夫渡海 - 温暖色调，保持意境通透 */}
        <CarouselSlide>
          <BackgroundImage
            src="/images/page3-fisherman.jpg"
            alt="漁夫在海上日出"
            useMinimalOverlay={true}
          />
          <TextOverlay
            mainTitle="渡海"
            content="清領時期的移民<span class='whitespace-nowrap'>（早期台灣移民）</span>即便航程艱險，仍組團回<span class='whitespace-nowrap'>南海普陀山</span>朝聖，這是<span class='whitespace-nowrap'>台灣朝山文化</span>的血脈根基。縱使隔著汪洋，仍心繫普陀。那份對法門的堅持，<span class='whitespace-nowrap'>隨著海浪，在台灣的土地紮了根。</span>"
            endQuote="「心繫南海 步履寶島」"
            shadowStyle="strong"
          />
        </CarouselSlide>

        {/* Page 4: 僧侣朝山 - 霧氣環境，背景已較暗，使用普通陰影，左右鏡像翻轉 */}
        <CarouselSlide>
          <BackgroundImage
            src="/images/page4-monks-pilgrimage.jpg"
            alt="僧侶朝山修行"
            flipHorizontal={true}
          />
          <TextOverlay
            mainTitle="紮根"
            content="<span class='whitespace-nowrap'>台灣靈山</span>的確立。<wbr>四大法脈的宗風傳承，從月眉山到大崗山，<span class='whitespace-nowrap'>台灣佛教</span>在<span class='whitespace-nowrap'>日治時期</span>確立了在地法脈。<wbr><span class='whitespace-nowrap'>靈山處處，每一座山頭都是觀照自心的明鏡。</span>"
            endQuote="「地靈人傑，寶島自有的靈性座標」"
            shadowStyle="normal"
          />
        </CarouselSlide>

        {/* Page 5: 红衣僧人冥想 - 明亮松林，使用輕微模糊+緊緻陰影 */}
        <CarouselSlide>
          <BackgroundImage
            src="/images/page5-monk-meditation.jpg"
            alt="紅衣僧人在山崖冥想"
            useMinimalOverlay={true}
            colorTone="warm-desaturate"
          />
          <TextOverlay
            mainTitle="靈鷲山海<br/>心和平的歸宿"
            content="而今日，我們在<span class='whitespace-nowrap'>太平洋</span>的起點，接續這份跨越兩千年的虔誠。<wbr>願將這份朝山精神轉化為<span class='whitespace-nowrap'>守護地球</span>的願力。"
            endQuote="「這一次，換你走入靈山。」"
            shadowStyle="ultra"
            useContentBlur={true}
            verticalPosition="center"
            spaciousLayout={true}
          />
        </CarouselSlide>
      </FadeCarousel>

      {/* 文章區塊 */}
      <section id="about" className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 via-orange-50/40 to-amber-100/60 py-20 px-6">
        {/* 背景裝飾 */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(139,69,19,0.15),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(184,134,11,0.15),transparent_50%)]" />
        </div>

        {/* 紙質紋理效果 */}
        <div
          className="absolute inset-0 opacity-[0.35] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix values='0 0 0 0 0.85, 0 0 0 0 0.8, 0 0 0 0 0.75, 0 0 0 1 0' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")
            `,
            backgroundSize: '200px 200px',
          }}
        />

        {/* 手工紙邊緣裝飾 - 頂部 */}
        <div className="absolute top-0 left-0 right-0 h-32 opacity-40 pointer-events-none">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0 C150,20 300,5 450,15 C600,25 750,10 900,20 C1050,30 1150,15 1200,10 L1200,120 L0,120 Z"
              fill="url(#paper-gradient-top)"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="paper-gradient-top" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 手工紙邊緣裝飾 - 底部 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-40 pointer-events-none">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0 L1200,0 L1200,100 C1050,90 900,110 750,95 C600,80 450,100 300,90 C150,80 75,95 0,85 Z"
              fill="url(#paper-gradient-bottom)"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="paper-gradient-bottom" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#8b4513" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#8b4513" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>



        <article className="relative max-w-4xl mx-auto">
          {/* 主標題 */}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-stone-800 tracking-wide">
            靈鷲山<br/>山海朝聖 · 覺性回歸
          </h2>

          {/* 引言 */}
          <p className="text-center text-xl md:text-2xl font-serif text-amber-900 mb-12 italic tracking-wide">
            「承兩千年法乳之長流，<br className="md:hidden"/>啟太平洋靈鷲之新章。」
          </p>

          {/* 分隔線 */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-16" />

          {/* 心道法師的期勉 */}
          <div className="max-w-3xl mx-auto mb-16">
            <h3 className="font-serif text-2xl md:text-3xl text-amber-900 text-center mb-8 font-bold" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              心道法師的期勉
            </h3>

            <div
              className="relative p-8 md:p-12 rounded-lg shadow-xl"
              style={{
                background: 'rgba(254, 243, 199, 0.6)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* 紙張紋理 */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none rounded-lg"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise2'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise2)' opacity='0.5' /%3E%3C/svg%3E")`,
                }}
              />

              {/* 內容 */}
              <div className="relative space-y-6">
                {/* 第一段 */}
                <p className="text-base md:text-lg text-stone-700 leading-loose" style={{ letterSpacing: '0.02em' }}>
                  朝山，不只是禮拜一座有形的山，而是一場尋找內心靈山的歸程。
                </p>

                {/* 第二段 */}
                <p className="text-base md:text-lg text-stone-700 leading-loose mb-6" style={{ letterSpacing: '0.02em' }}>
                  在靈鷲山，我們延續著四大名山慈悲接引的千年傳承。但我們走得更遠——在山海交會的聖地，我們將這份體力的磨練，轉化為<span className="whitespace-nowrap">「心和平，</span><wbr /><span className="whitespace-nowrap">世界就和平」</span>的當代導引。
                </p>

                {/* 第三段 */}
                <p className="text-base md:text-lg text-stone-700 leading-loose" style={{ letterSpacing: '0.02em' }}>
                  早期上山道路都是泥土碎石，但是大家那時候很虔心朝山，下雨滿地爛泥也不怕髒。特別到了週末假日，好幾台遊覽車開到山下，大家一起朝山拜懺、祈請。還有信眾每回朝山都提鐵桶子放磚瓦，發大願建設道場。所以，靈鷲山的聖山建設也可以說是朝山朝出來的。1988年，我曾經帶弟子到大陸朝禮佛教四大名山：<span className="whitespace-nowrap">普陀山</span>-<wbr /><span className="whitespace-nowrap">觀音道場</span>、<wbr /><span className="whitespace-nowrap">峨嵋山</span>-<wbr /><span className="whitespace-nowrap">普賢道場</span>、<wbr /><span className="whitespace-nowrap">九華山</span>-<wbr /><span className="whitespace-nowrap">地藏道場</span>、<wbr /><span className="whitespace-nowrap">五台山</span>-<wbr /><span className="whitespace-nowrap">文殊道場</span>。這四位菩薩分別代表修行要有慈悲心、實踐力、願力和智慧。後來我決定在靈鷲山的後山修建小四大名山，就是希望到靈鷲山朝山的人能夠和四位菩薩相遇，學習菩薩悲智願行的精神。
                </p>

                {/* 簽名檔位置預留 */}
                <div className="flex justify-end mt-12">
                  <div className="w-20 md:w-24 opacity-70">
                    {/* 簽名圖片 - 請上傳 signature.png 到 /public/images/ 後取消註解 */}
                    {/* <img
                      src="/images/signature.png"
                      alt="心道法師簽名"
                      className="w-full h-auto"
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 文章內容 */}
          <div className="space-y-8 text-stone-700 leading-loose">
            <p className="text-lg md:text-xl text-center md:text-left font-light" style={{ letterSpacing: '0.05em' }}>
              朝山，不只是禮拜一座有形的山，<br className="md:hidden"/>而是一場尋找內心靈山的歸程。
            </p>

            <p className="text-lg md:text-xl text-center md:text-left font-light leading-relaxed" style={{ letterSpacing: '0.03em', lineHeight: '2' }}>
              在靈鷲山，<br className="md:hidden"/>我們延續著四大名山慈悲接引的千年傳承。<br className="md:hidden"/>但我們走得更遠——在山海交會的聖地，<br className="md:hidden"/>我們將這份體力的磨練，轉化為<br className="md:hidden"/><span className="whitespace-nowrap">「心和平，世界就和平」</span>的當代導引。
            </p>

            {/* 詩意對句 */}
            <div className="py-8 my-8 border-l-4 border-amber-600 pl-6 bg-gradient-to-r from-amber-50/50 to-transparent">
              <p className="font-serif text-xl md:text-2xl text-amber-900 mb-4 font-medium">
                每一聲聖號，都與太平洋的浪潮共振；
              </p>
              <p className="font-serif text-xl md:text-2xl text-amber-900 font-medium">
                每一處跪拜，都與萬物生態的靈性相連。
              </p>
            </div>

            <p className="text-lg md:text-xl text-center md:text-left font-light leading-relaxed" style={{ letterSpacing: '0.03em', lineHeight: '2' }}>
              我們不只為個人消業求平安，<br className="md:hidden"/>更為「地球平安」而行。
            </p>

            <p className="text-lg md:text-xl text-center md:text-left font-light leading-relaxed pt-4" style={{ letterSpacing: '0.03em', lineHeight: '2' }}>
              來到靈鷲山朝聖，<br className="md:hidden"/>是承接一份古老的虔誠，<br className="md:hidden"/>更是在廣闊的山海間，<br className="md:hidden"/>完成一場歸零、覺醒、再出發的心靈洗禮。
            </p>
          </div>

          {/* 底部裝飾 */}
          <div className="mt-16 flex justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-amber-600/30 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-amber-600/50 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-amber-600/70" />
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
