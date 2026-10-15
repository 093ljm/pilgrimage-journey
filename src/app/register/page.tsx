import type { Metadata } from "next";
import { RegistrationForm } from "@/components/registration-form";
import { getGuanyinAssembliesSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "朝山報名 - 靈鷲山朝聖之旅",
  description: "線上填寫朝山報名資料，教團同仁收到後將為您安排。也可以來電報名。",
};

export default function RegisterPage() {
  // 電話沿用後台「最新活動（觀音三會）」的報名電話，管理員在後台修改後這裡會一起更新
  const { phone, phoneExt } = getGuanyinAssembliesSettings();
  const phoneHref = `tel:${phone.replace(/[^0-9]/g, "")}${phoneExt ? `,${phoneExt}` : ""}`;

  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, #fef3c7 0%, #fde68a 55%, #f59e0b 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise1'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise1)' opacity='0.5' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 pb-20 pt-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="mb-3 font-serif text-sm tracking-[0.3em] text-amber-700/80">REGISTRATION</p>
            <h1 className="font-serif text-4xl font-bold tracking-wide text-stone-800 md:text-5xl">朝山報名</h1>
            <div className="mx-auto my-6 h-px w-16 bg-amber-600/50" />
            <p className="text-lg leading-loose text-stone-700">
              發心，就是啟程。
              <br />
              請填寫以下資料，教團同仁收到後將為您安排。
            </p>
          </div>

          <RegistrationForm phone={phone} phoneExt={phoneExt} />

          <p className="mt-10 text-center text-base leading-relaxed text-stone-700">
            不方便線上填寫，也歡迎來電報名：
            <a href={phoneHref} className="whitespace-nowrap font-bold text-amber-900 underline underline-offset-4">
              {phone}
              {phoneExt && ` 分機 ${phoneExt}`}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
