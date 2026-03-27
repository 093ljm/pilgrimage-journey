import type { Metadata } from "next";
import { Inter, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import { FluidInteraction } from "@/components/ui/fluid-interaction";
import { FloatingNav } from "@/components/ui/floating-nav";

const inter = Inter({ subsets: ["latin"] });
const notoSerifTC = Noto_Serif_TC({
  weight: ['400', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-noto-serif-tc',
});

export const metadata: Metadata = {
  title: "靈鷲山朝聖之旅 - 山海朝聖 · 覺性回歸",
  description: "靈鷲山朝山之旅，承兩千年法乳之長流，啟太平洋靈鷲之新章。體驗佛教朝聖傳統，在山海交會的聖地完成心靈洗禮。",
  keywords: ["靈鷲山", "朝山", "朝聖", "心道法師", "佛教", "修行", "台灣佛教", "福隆"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={`${notoSerifTC.variable}`}>
      <body className={inter.className}>
        {/* 懸浮膠囊式導航 */}
        <FloatingNav />

        {/* 流体互动效果 - 保留这个效果，它很好 */}
        <FluidInteraction
          intensity={0.6}
          viscosity={0.95}
          dissipation={0.98}
          color="#ffffff"
          opacity={0.15}
        />
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
