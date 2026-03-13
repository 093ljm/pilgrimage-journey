"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FadeCarouselProps {
  children: React.ReactNode[];
  autoplayInterval?: number; // 自动播放间隔，单位毫秒
}

export function FadeCarousel({
  children,
  autoplayInterval = 0, // 默认不自动播放
}: FadeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for forward, -1 for backward
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false); // 追踪用户是否手动操作过
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;

    setUserInteracted(true); // 用户手动操作，停止自动播放
    const newIndex = (currentIndex + 1) % children.length;
    setPreviousIndex(currentIndex);
    setCurrentIndex(newIndex);
    setDirection(1);
    setIsTransitioning(true);

    // 转场完成后重置状态
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2500);
  }, [children.length, currentIndex, isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;

    setUserInteracted(true); // 用户手动操作，停止自动播放
    const newIndex = (currentIndex - 1 + children.length) % children.length;
    setPreviousIndex(currentIndex);
    setCurrentIndex(newIndex);
    setDirection(-1);
    setIsTransitioning(true);

    // 转场完成后重置状态
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2500);
  }, [children.length, currentIndex, isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex || isTransitioning) return;

      setUserInteracted(true); // 用户手动操作，停止自动播放
      setPreviousIndex(currentIndex);
      setCurrentIndex(index);
      setDirection(index > currentIndex ? 1 : -1);
      setIsTransitioning(true);

      // 转场完成后重置状态
      setTimeout(() => {
        setIsTransitioning(false);
      }, 2500);
    },
    [currentIndex, isTransitioning]
  );

  // 自动播放功能 - 用户手动操作后停止
  useEffect(() => {
    if (autoplayInterval <= 0 || userInteracted) return; // 用户操作后停止自动播放

    const startAutoplay = () => {
      autoplayTimerRef.current = setTimeout(() => {
        if (!isTransitioning) {
          handleNext();
        } else {
          startAutoplay(); // 如果正在转场，则延迟自动播放
        }
      }, autoplayInterval);
    };

    startAutoplay();

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [autoplayInterval, isTransitioning, handleNext, userInteracted]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 当前页面和前一个页面同时显示，实现交叉淡入淡出 */}
      <div className="relative h-full w-full">
        {/* 当前页面，在下层淡入 */}
        <motion.div
          key={currentIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {children[currentIndex]}
        </motion.div>

        {/* 前一个页面，在上层淡出 */}
        <AnimatePresence initial={false}>
          {isTransitioning && previousIndex !== currentIndex && (
            <motion.div
              key={previousIndex}
              className="absolute inset-0 z-10"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
            >
              {children[previousIndex]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation arrows - 增加尺寸和对比度以提高可用性 */}
      <button
        className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
        onClick={handlePrev}
        aria-label="Previous slide"
        disabled={isTransitioning}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
        onClick={handleNext}
        aria-label="Next slide"
        disabled={isTransitioning}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Navigation dots - 增加尺寸和点击区域以提高可用性 */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {children.map((_, index) => (
          <button
            key={index}
            className={`h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-3 bg-white/60 hover:bg-white/80"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  );
}

export function CarouselSlide({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full">
      {children}
    </div>
  );
}

export function BackgroundImage({
  src,
  alt,
  priority = false,
  useMinimalOverlay = false,
  flipHorizontal = false,
  colorTone = "none",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  useMinimalOverlay?: boolean;
  flipHorizontal?: boolean;
  colorTone?: "none" | "warm-desaturate" | "cool-muted" | "sepia-calm";
}) {
  // 根據色調類型設置濾鏡
  const getFilterStyle = () => {
    switch (colorTone) {
      case "warm-desaturate":
        // 降低飽和度 + 微暖色調
        return "saturate(0.6) brightness(0.95) contrast(1.05) hue-rotate(5deg)";
      case "cool-muted":
        // 冷色調 + 柔和
        return "saturate(0.5) brightness(0.9) contrast(1.1) hue-rotate(-10deg)";
      case "sepia-calm":
        // 復古寧靜感
        return "sepia(0.3) saturate(0.7) brightness(0.95) contrast(1.05)";
      default:
        return "none";
    }
  };

  return (
    <div className="absolute inset-0 z-0 bg-stone-900">
      {/* 图片层 - 保持完整通透 + 優化載入 */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center transition-opacity duration-300"
        style={{
          transform: flipHorizontal ? 'scaleX(-1)' : undefined,
          filter: getFilterStyle(),
          willChange: priority ? 'auto' : 'transform',
        }}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
      {/* 仅在需要时使用极轻微的底部渐层 - 确保底部导航点可见 */}
      {useMinimalOverlay && (
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
      )}
    </div>
  );
}

export function TextOverlay({
  mainTitle,
  content,
  endQuote,
  shadowStyle = "strong",
  useContentBlur = false,
  useVignetteEffect = false,
  textColor = "#ffffff",
  verticalPosition = "center",
  spaciousLayout = false,
}: {
  mainTitle: string;
  content: string;
  endQuote: string;
  shadowStyle?: "normal" | "strong" | "ultra";
  useContentBlur?: boolean;
  useVignetteEffect?: boolean;
  textColor?: string;
  verticalPosition?: "center" | "bottom" | "top";
  spaciousLayout?: boolean;
}) {
  // 標題使用的多層陰影（保持原樣）
  const titleShadowStyles = {
    normal: `
      0 2px 4px rgba(0, 0, 0, 0.8),
      0 4px 8px rgba(0, 0, 0, 0.7),
      0 8px 16px rgba(0, 0, 0, 0.5),
      0 0 32px rgba(0, 0, 0, 0.4)
    `,
    strong: `
      0 2px 4px rgba(0, 0, 0, 0.95),
      0 4px 8px rgba(0, 0, 0, 0.9),
      0 8px 16px rgba(0, 0, 0, 0.8),
      0 12px 24px rgba(0, 0, 0, 0.7),
      0 0 40px rgba(0, 0, 0, 0.6)
    `,
    ultra: `
      0 1px 2px rgba(0, 0, 0, 1),
      0 2px 4px rgba(0, 0, 0, 0.95),
      0 4px 8px rgba(0, 0, 0, 0.9),
      0 8px 16px rgba(0, 0, 0, 0.85),
      0 12px 24px rgba(0, 0, 0, 0.8),
      0 16px 32px rgba(0, 0, 0, 0.7),
      0 0 48px rgba(0, 0, 0, 0.65)
    `,
  }[shadowStyle];

  // 三層超強白色發光 - 用於複雜背景（如佛像浮雕）
  const vignetteTextShadow = `
    0 0 20px rgba(255, 255, 255, 1),
    0 0 15px rgba(255, 255, 255, 1),
    0 0 10px rgba(255, 255, 255, 0.9),
    0 0 5px rgba(255, 255, 255, 0.8),
    0 0 3px rgba(0, 0, 0, 0.8),
    0 2px 15px rgba(0, 0, 0, 0.4)
  `;

  // Page 5 標題使用的白光陰影
  const contentBlurTitleShadow = `
    0 0 20px rgba(255, 255, 255, 1),
    0 0 15px rgba(255, 255, 255, 1),
    0 0 10px rgba(255, 255, 255, 0.9),
    0 0 5px rgba(255, 255, 255, 0.8),
    0 2px 4px rgba(0, 0, 0, 0.95),
    0 4px 8px rgba(0, 0, 0, 0.9),
    0 8px 16px rgba(0, 0, 0, 0.8)
  `;

  // Page 5 小標使用的陰影 - 底層白光 + 原有陰影
  const getQuoteShadow = () => {
    if (useContentBlur) {
      // 底層白光（调暗）
      const whiteGlow = `
        0 0 15px rgba(255, 255, 255, 0.6),
        0 0 10px rgba(255, 255, 255, 0.5),
      `;
      // 组合：白光 + 原有陰影
      return whiteGlow + titleShadowStyles;
    }
    return titleShadowStyles;
  };

  // 內文使用強化的多層次陰影 - 電影海報級質感
  const contentShadowStyles = useVignetteEffect
    ? vignetteTextShadow
    : useContentBlur
      ? `
        0 2px 4px rgba(0, 0, 0, 0.8),
        0 0 20px rgba(0, 0, 0, 0.3),
        0 4px 8px rgba(0, 0, 0, 0.4)
      `
      : titleShadowStyles;

  // 根據垂直位置設置對齊方式
  const getVerticalAlignment = () => {
    switch (verticalPosition) {
      case "top":
        return "justify-start pt-32";
      case "bottom":
        return "justify-end pb-16";
      default:
        return "justify-center";
    }
  };

  return (
    <div className={`absolute inset-0 flex flex-col items-center px-6 text-center ${getVerticalAlignment()}`} style={{ color: textColor }}>
      {/* 底部向上的轻微渐层 - 帮助文字可读性但不遮挡画面 */}
      {!useVignetteEffect && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      )}

      {/* 文字容器 - 完全透明，无遮罩 */}
      <div className={`relative flex w-full max-w-3xl flex-col items-center ${spaciousLayout ? 'justify-between h-full pt-48 pb-24' : 'justify-center gap-6'} px-4`}>
        <h1
          className="font-serif text-4xl font-bold tracking-[0.05em] sm:text-5xl md:text-6xl"
          style={{
            textShadow: useVignetteEffect ? vignetteTextShadow : titleShadowStyles
          }}
          dangerouslySetInnerHTML={{ __html: mainTitle }}
        />

        {/* 內文和小標容器 - 在 spaciousLayout 模式下作為一個整體 */}
        <div className={spaciousLayout ? "flex flex-col gap-6" : "contents"}>
          {/* 內文區塊 - 根據不同模式使用不同方案 */}
          <div
            className={useContentBlur ? "relative px-5 py-5" : useVignetteEffect ? "relative px-10 py-10" : ""}
            style={
              useVignetteEffect
                ? {
                    // 毛玻璃效果 - 極淡白色背景 + 背景模糊
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(5px)',
                    borderRadius: '12px', // 輕微圓角，讓毛玻璃更自然
                  }
                : useContentBlur
                  ? {
                      // 使用 backdrop-filter 讓文字後方背景輕微模糊
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      // 極淡的橫向漸層 - 完全透明到15%黑色再到透明
                      background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.15) 80%, transparent)',
                      // 移除圓角，讓它與畫面融合
                      borderRadius: '0',
                    }
                  : {}
            }
          >
            <div
              className="max-w-2xl text-base md:text-lg lg:text-xl"
              style={{
                textShadow: contentShadowStyles,
                textWrap: "balance" as React.CSSProperties["textWrap"],
                letterSpacing: useContentBlur ? "0.1em" : "normal", // 恢復 Page 2 字距與其他頁面一致
                lineHeight: (useContentBlur || useVignetteEffect) ? "1.8" : "1.625", // 增加行高
                fontWeight: useVignetteEffect ? 600 : undefined, // Page 2 使用 SemiBold 字重
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

          <div
            className="mt-4 font-serif text-xl font-semibold tracking-wide md:text-2xl"
            style={{
              textShadow: useVignetteEffect ? vignetteTextShadow : getQuoteShadow()
            }}
          >
            {endQuote}
          </div>
        </div>
      </div>
    </div>
  );
}
