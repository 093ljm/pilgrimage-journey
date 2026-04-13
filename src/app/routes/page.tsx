import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "朝山路線與行儀 - 靈鷲山朝聖之旅",
  description: "靈鷲山朝山路線指引與行儀規範，規劃您的朝聖之旅",
};

export default function RoutesPage() {
  const routes = [
    {
      id: "一",
      path: "【前山】濱海公路口→天眼門",
      duration: "約4小時",
    },
    {
      id: "二",
      path: "【前山】地藏廣場(紅色鐵皮屋)→天眼門",
      duration: "約1.5小時",
    },
    {
      id: "三",
      path: "【前山】天眼門→觀音道場",
      duration: "約20分鐘",
    },
    {
      id: "四",
      path: "【後山】地藏道場→普賢道場→文殊道場→天眼門→觀音道場",
      duration: "約1.5小時",
      note: "通常配合無生道場週年慶開放。區會於非開放期間提出申請，總本山將視當時氣候與步道狀況決定是否通核。初夏時節，後山昆蟲生態活躍，安管護法志工須手持竹棍開導引路，迴避自然界生物。",
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
        <div className="max-w-4xl mx-auto">
          {/* 頁面標題 */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 text-stone-800 tracking-wide">
            朝山路線與行儀
          </h1>

          {/* 第一部分：朝山路線 */}
          <article className="mb-16">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-900">
                一、朝山路線
              </h2>
            </div>

            {/* 說明文字 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg mb-10">
              <p className="text-base md:text-lg text-stone-700 leading-loose" style={{ letterSpacing: '0.02em' }}>
                幹部可依活動接引對象的朝山經驗值，規劃不同的朝山路線。以下四種路線提供：
              </p>
            </div>

            {/* 路線表格 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
              {/* 表頭 */}
              <div className="grid grid-cols-[80px_1fr_120px] md:grid-cols-[100px_1fr_150px] bg-amber-700 text-white">
                <div className="p-4 md:p-5 font-bold text-center border-r border-amber-600">
                  路線
                </div>
                <div className="p-4 md:p-5 font-bold text-center border-r border-amber-600">
                  朝山路程
                </div>
                <div className="p-4 md:p-5 font-bold text-center">
                  時間長度
                </div>
              </div>

              {/* 表格內容 */}
              {routes.map((route, index) => (
                <div
                  key={route.id}
                  className={`grid grid-cols-[80px_1fr_120px] md:grid-cols-[100px_1fr_150px] ${
                    index % 2 === 0 ? 'bg-white/40' : 'bg-amber-50/40'
                  } ${index !== routes.length - 1 ? 'border-b border-amber-200' : ''}`}
                >
                  <div className="p-4 md:p-5 text-center font-serif text-xl md:text-2xl text-amber-900 font-bold border-r border-amber-200 flex items-center justify-center">
                    {route.id}
                  </div>
                  <div className="p-4 md:p-5 border-r border-amber-200">
                    <p className="text-base md:text-lg text-stone-700 leading-relaxed" style={{ letterSpacing: '0.02em' }}>
                      {route.path}
                    </p>
                    {route.note && (
                      <p className="mt-3 text-sm text-stone-500 leading-relaxed bg-amber-100/50 p-3 rounded-lg">
                        ※ {route.note}
                      </p>
                    )}
                  </div>
                  <div className="p-4 md:p-5 text-center text-base md:text-lg text-amber-900 font-medium flex items-center justify-center">
                    {route.duration}
                  </div>
                </div>
              ))}
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
