"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: "朝山法門", href: "/dharma" },
  { title: "朝山路線與行儀", href: "/routes" },
  { title: "法師開示", href: "/teachings" },
  { title: "行前準備", href: "/preparation" },
  { title: "最新活動", href: "/events" },
  { title: "常見問題", href: "/faq" },
];

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      // 滾動超過視窗高度的 80% 時開始縮減
      const scrollThreshold = window.innerHeight * 0.8;
      setScrolled(window.scrollY > scrollThreshold);
    };

    // 立即檢查一次當前滾動位置
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 在客戶端掛載前，使用預設樣式避免 hydration mismatch
  const isScrolled = isMounted ? scrolled : false;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled ? "py-3" : "py-5"
      }`}
      aria-label="主要導航"
      suppressHydrationWarning
    >
      <div className="container mx-auto px-4">
        {/* 膠囊容器 */}
        <div
          className={`
            relative mx-auto max-w-6xl rounded-full
            backdrop-blur-md
            transition-all duration-500 ease-out
            ${
              isScrolled
                ? "bg-stone-100/95 shadow-lg"
                : "bg-black/20 shadow-2xl"
            }
            ${isScrolled ? "px-6 py-3" : "px-8 py-4"}
          `}
          suppressHydrationWarning
        >
          <div className="flex items-center justify-between">
            {/* Logo - 左側 */}
            <Link
              href="/"
              className="flex items-center gap-3 transition-all duration-500"
              aria-label="靈鷲山首頁"
            >
              <motion.div
                animate={{
                  scale: isScrolled ? 0.85 : 1,
                }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2"
              >
                {/* Logo 圖標 */}
                <div
                  className={`
                    rounded-full flex items-center justify-center
                    transition-all duration-500
                    ${isScrolled ? "w-9 h-9" : "w-12 h-12"}
                    ${
                      isScrolled
                        ? "bg-gradient-to-br from-amber-600 to-amber-700"
                        : "bg-gradient-to-br from-amber-400 to-amber-500"
                    }
                  `}
                >
                  <svg
                    className={`transition-all duration-500 ${isScrolled ? "w-5 h-5" : "w-6 h-6"}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      fill="white"
                      fillOpacity="0.9"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {/* Logo 文字 */}
                <span
                  className={`
                    font-serif font-bold tracking-wide transition-all duration-500
                    ${isScrolled ? "text-lg text-stone-800" : "text-xl text-white"}
                  `}
                >
                  靈鷲山
                </span>
              </motion.div>
            </Link>

            {/* 桌面版導航 - 中間 */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      px-5 py-2 rounded-full font-medium
                      transition-all duration-300
                      ${
                        isScrolled
                          ? "text-stone-700 hover:bg-amber-100 hover:text-amber-900"
                          : "text-white/90 hover:bg-white/20 hover:text-white"
                      }
                    `}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA 按鈕 - 右側 */}
            <motion.div
              animate={{
                scale: isScrolled ? 0.9 : 1,
              }}
              transition={{ duration: 0.5 }}
              className="hidden md:block"
            >
              <Link
                href="#contact"
                className={`
                  block px-6 py-2 rounded-full font-medium
                  transition-all duration-300
                  ${
                    isScrolled
                      ? "bg-amber-600 text-white hover:bg-amber-700 shadow-md"
                      : "bg-white text-amber-900 hover:bg-amber-50 shadow-lg"
                  }
                `}
              >
                立即報名
              </Link>
            </motion.div>

            {/* 移動版漢堡選單按鈕 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`
                md:hidden p-2 rounded-full
                transition-all duration-300
                ${
                  isScrolled
                    ? "text-stone-800 hover:bg-stone-200"
                    : "text-white hover:bg-white/20"
                }
              `}
              aria-label="開啟選單"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 移動版展開選單 */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4"
            >
              <div
                className={`
                  rounded-3xl overflow-hidden backdrop-blur-md
                  ${
                    isScrolled
                      ? "bg-stone-100/95 shadow-lg"
                      : "bg-black/30 shadow-2xl"
                  }
                `}
              >
                <ul className="py-4">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`
                          block px-8 py-4 font-medium
                          transition-all duration-300
                          ${
                            isScrolled
                              ? "text-stone-700 hover:bg-amber-100 hover:text-amber-900"
                              : "text-white/90 hover:bg-white/10 hover:text-white"
                          }
                        `}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                  <li className="px-6 pt-4">
                    <Link
                      href="#contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        block text-center px-6 py-3 rounded-full font-medium
                        transition-all duration-300
                        ${
                          isScrolled
                            ? "bg-amber-600 text-white hover:bg-amber-700"
                            : "bg-white text-amber-900 hover:bg-amber-50"
                        }
                      `}
                    >
                      立即報名
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
