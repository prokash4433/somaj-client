
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
          const { theme, setTheme } = useTheme();
          const [mounted, setMounted] = useState(false);

          useEffect(() => {
                    setMounted(true);
          }, []);

          if (!mounted) {
                    return (
                              <div className="h-[38px] w-[78px] shrink-0 rounded-full border border-[#536d13] bg-[#101e18] sm:h-[42px] sm:w-[86px]" />
                    );
          }

          return (
                    <div
                              role="group"
                              aria-label="Choose website theme"
                              className="flex w-fit shrink-0 items-center overflow-hidden rounded-full border border-[#536d13] bg-[#101e18] p-0.5 shadow-[0_0_12px_rgba(194,248,0,0.08)] transition-all duration-300 ease-in-out hover:scale-105 hover:border-[#829f20] hover:shadow-[0_0_15px_rgba(194,248,0,0.15)] active:scale-95"
                    >
                              {/* Light Mode */}
                              <button
                                        type="button"
                                        aria-label="Switch to light mode"
                                        aria-pressed={theme === "light"}
                                        onClick={() => setTheme("light")}
                                        className={`flex h-7 w-8 items-center justify-center rounded-full transition-all duration-300 sm:h-8 sm:w-9 ${theme === "light"
                                                            ? "bg-[#3b5426] shadow-inner"
                                                            : "hover:bg-[#293c20]"
                                                  }`}
                              >
                                        <Sun
                                                  size={16}
                                                  className={`transition-all duration-300 sm:w-[17px] ${theme === "light"
                                                                      ? "rotate-45 fill-[#ffc928] text-[#ffc928]"
                                                                      : "fill-[#ffc928] text-[#ffc928] hover:rotate-45"
                                                            }`}
                                        />
                              </button>

                              {/* Middle Divider */}
                              <span className="mx-0.5 h-4 w-px bg-[#536d13] sm:mx-1 sm:h-5" />

                              {/* Dark Mode */}
                              <button
                                        type="button"
                                        aria-label="Switch to dark mode"
                                        aria-pressed={theme === "dark"}
                                        onClick={() => setTheme("dark")}
                                        className={`flex h-7 w-8 items-center justify-center rounded-full transition-all duration-300 sm:h-8 sm:w-9 ${theme === "dark"
                                                            ? "bg-[#293c20] shadow-inner"
                                                            : "hover:bg-[#3b5426]"
                                                  }`}
                              >
                                        <Moon
                                                  size={16}
                                                  className={`transition-all duration-300 sm:w-[17px] ${theme === "dark"
                                                                      ? "-rotate-12 text-white"
                                                                      : "text-gray-400 hover:-rotate-12 hover:text-white"
                                                            }`}
                                        />
                              </button>
                    </div>
          );
};

export default ThemeToggle;
