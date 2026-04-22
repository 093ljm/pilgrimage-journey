"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface SubNavItem {
  title: string;
  href: string;
}

interface NavItem {
  title: string;
  href?: string;
  submenu?: SubNavItem[];
}

const navItems: NavItem[] = [
  { title: "朝山法門", href: "/dharma" },
  { title: "朝山路線與行儀", href: "/routes" },
  { title: "法師開示", href: "/teachings" },
  { title: "行前準備", href: "/preparation" },
  { title: "最新活動", href: "/events" },
  { title: "常見問題", href: "/faq" },
  {
    title: "聖山導覽",
    submenu: [
      { title: "聖人", href: "/guide/saints" },
      { title: "聖物", href: "/guide/relics" },
      { title: "聖地", href: "/guide/places" },
    ]
  },
];

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(null);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out`}
      aria-label="主要導航"
      suppressHydrationWarning
    >
      {/* 手機版和平板：頂部橫列 - 貼在背景上，滾動後消失 */}
      <div className="lg:hidden absolute top-0 left-0 right-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-start">
            <span className="font-serif text-base font-bold tracking-wider text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
              靈鷲山 · 無生道場 · 朝山
            </span>
          </div>
        </div>
      </div>

      {/* 手機版和平板：漢堡按鈕 - 固定在右上角 */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-3 rounded-full backdrop-blur-md bg-stone-100/95 text-stone-800 shadow-lg transition-all duration-300 hover:bg-stone-200/95"
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

      {/* 桌面版：膠囊容器 */}
      <div className={`hidden lg:block container mx-auto px-4 ${
        isScrolled ? "py-3" : "py-5"
      }`}>
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
            ${isScrolled ? "px-8 py-3" : "px-10 py-4"}
          `}
          suppressHydrationWarning
        >
          <div className="flex items-center justify-between">
            {/* Logo - 左側 */}
            <Link
              href="/"
              className="flex items-center gap-3 transition-all duration-500 hover:opacity-80 active:scale-95"
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
            <ul className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <li
                  key={item.href || item.title}
                  className="relative"
                  onMouseEnter={() => item.submenu && setOpenSubmenu(item.title)}
                  onMouseLeave={() => item.submenu && setOpenSubmenu(null)}
                >
                  {item.submenu ? (
                    <>
                      <button
                        className={`
                          px-5 py-2 rounded-full font-medium text-base flex items-center gap-1
                          transition-all duration-300
                          ${
                            isScrolled
                              ? "text-stone-700 hover:bg-amber-100 hover:text-amber-900"
                              : "text-white/90 hover:bg-white/20 hover:text-white"
                          }
                        `}
                      >
                        {item.title}
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${openSubmenu === item.title ? 'rotate-180' : ''}`}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* 下拉菜單 */}
                      <AnimatePresence>
                        {openSubmenu === item.title && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className={`
                              absolute top-full mt-2 left-0 min-w-[160px]
                              rounded-2xl overflow-hidden backdrop-blur-md shadow-lg
                              ${
                                isScrolled
                                  ? "bg-stone-100/95"
                                  : "bg-black/30"
                              }
                            `}
                          >
                            <ul className="py-2">
                              {item.submenu.map((subItem) => (
                                <li key={subItem.href}>
                                  <Link
                                    href={subItem.href}
                                    className={`
                                      block px-6 py-3 font-medium
                                      transition-all duration-300
                                      ${
                                        isScrolled
                                          ? "text-stone-700 hover:bg-amber-100 hover:text-amber-900"
                                          : "text-white/90 hover:bg-white/10 hover:text-white"
                                      }
                                    `}
                                  >
                                    {subItem.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      className={`
                        px-5 py-2 rounded-full font-medium text-base
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
                  )}
                </li>
              ))}
            </ul>

            {/* CTA 按鈕 - 右側 */}
            <motion.div
              animate={{
                scale: isScrolled ? 0.9 : 1,
              }}
              transition={{ duration: 0.5 }}
              className="hidden lg:block"
            >
              <Link
                href="#contact"
                className={`
                  block px-6 py-2 rounded-full font-medium text-base
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
          </div>
        </div>
      </div>

      {/* 移動版展開選單 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed inset-0 z-40"
          >
            {/* 背景遮罩 */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* 側邊菜單 */}
            <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-stone-50 shadow-2xl overflow-y-auto">
              {/* Logo 區域 */}
              <div className="p-6 bg-gradient-to-br from-amber-600 to-amber-700">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <svg
                      className="w-7 h-7"
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
                  <span className="font-serif text-2xl font-bold text-white">
                    靈鷲山
                  </span>
                </Link>
              </div>

              {/* 菜單列表 */}
              <div className="bg-stone-50">
                <ul className="py-4">
                  {navItems.map((item) => (
                    <li key={item.href || item.title}>
                      {item.submenu ? (
                        <>
                          <button
                            onClick={() => setMobileOpenSubmenu(mobileOpenSubmenu === item.title ? null : item.title)}
                            className="w-full flex items-center justify-between px-6 py-4 font-medium text-stone-700 hover:bg-amber-100 hover:text-amber-900 transition-all duration-300 border-b border-stone-200"
                          >
                            {item.title}
                            <svg
                              className={`w-4 h-4 transition-transform duration-200 ${mobileOpenSubmenu === item.title ? 'rotate-180' : ''}`}
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {/* 移動版子菜單 */}
                          <AnimatePresence>
                            {mobileOpenSubmenu === item.title && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden bg-stone-100/50"
                              >
                                {item.submenu.map((subItem) => (
                                  <li key={subItem.href}>
                                    <Link
                                      href={subItem.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="block pl-10 pr-6 py-3 font-medium text-stone-600 hover:bg-amber-50 hover:text-amber-900 transition-all duration-300"
                                    >
                                      {subItem.title}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href!}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-6 py-4 font-medium text-stone-700 hover:bg-amber-100 hover:text-amber-900 transition-all duration-300 border-b border-stone-200"
                        >
                          {item.title}
                        </Link>
                      )}
                    </li>
                  ))}
                  <li className="px-6 py-6">
                    <Link
                      href="#contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center px-6 py-3 rounded-full font-medium bg-amber-600 text-white hover:bg-amber-700 transition-all duration-300 shadow-md"
                    >
                      立即報名
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
