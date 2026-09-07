/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["*.preview.same-app.com"],

  // ============================================================
  // 圖片最佳化
  // ------------------------------------------------------------
  // ★ 後台上傳的照片常常是相機直出的大圖（實測有 5616x3744、7MB）。
  //   開啟最佳化後，Next.js 會依照版面實際需要的寬度自動縮圖並轉成
  //   WebP，訪客下載的檔案通常只剩原圖的 2~5%。
  //
  //   ※ 千萬不要改回 unoptimized: true，那會把原圖整份丟給訪客，
  //     手機用戶等半天還吃掉大量流量。
  // ============================================================
  images: {
    formats: ["image/webp"],
    // 產生的尺寸階梯，對應常見的螢幕寬度
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "source.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "ext.same-assets.com", pathname: "/**" },
      { protocol: "https", hostname: "ugc.same-assets.com", pathname: "/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
    ],
  },
};

module.exports = nextConfig;
