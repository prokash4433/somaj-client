"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
          const { theme, resolvedTheme, setTheme } = useTheme();
          const [mounted, setMounted] = useState(false);

          useEffect(() => {
                    setMounted(true);
          }, []);

          // Keep server and initial client rendering consistent.
          if (!mounted) {
                    return (
                              <div
                                        aria-hidden="true"
                                        className="h-[38px] w-[78px] shrink-0 rounded-full border border-[#829f20]/60 bg-gradient-to-br from-[#f8fbef] via-[#eef5d9] to-[#dbe9b8] dark:border-[#536d13] dark:bg-none dark:bg-[#101e18] sm:h-[42px] sm:w-[86px]"
                              />
                    );
          }

          const activeTheme = resolvedTheme ?? theme;

          return (
                    <div
                              role="group"
                              aria-label="Choose website theme"
                              className="flex w-fit shrink-0 items-center overflow-hidden rounded-full border border-[#829f20]/60 bg-gradient-to-br from-[#f8fbef] via-[#eef5d9] to-[#dbe9b8] p-0.5 shadow-[0_2px_10px_rgba(82,107,36,0.18)] transition-all duration-300 ease-in-out hover:scale-105 hover:border-[#5f7a1a] hover:shadow-[0_4px_14px_rgba(82,107,36,0.3)] active:scale-95 dark:border-[#536d13] dark:bg-none dark:bg-[#101e18] dark:shadow-[0_0_12px_rgba(194,248,0,0.08)] dark:hover:border-[#829f20] dark:hover:shadow-[0_0_15px_rgba(194,248,0,0.15)]"
                    >
                              {/* Light Mode */}
                              <button
                                        type="button"
                                        aria-label="Switch to light mode"
                                        aria-pressed={activeTheme === "light"}
                                        onClick={() => setTheme("light")}
                                        className={`flex h-7 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-300 sm:h-8 sm:w-9 ${activeTheme === "light"
                                                            ? "bg-[#829f20]/35 shadow-inner dark:bg-[#3b5426]"
                                                            : "hover:bg-[#829f20]/10 dark:hover:bg-[#293c20]"
                                                  }`}
                              >
                                        <Sun
                                                  size={16}
                                                  aria-hidden="true"
                                                  className={`transition-all duration-300 sm:w-[17px] ${activeTheme === "light"
                                                                      ? "rotate-45 fill-[#f5a300] text-[#f5a300] dark:fill-[#ffc928] dark:text-[#ffc928]"
                                                                      : "fill-[#f5a300] text-[#f5a300] hover:rotate-45 dark:fill-[#ffc928] dark:text-[#ffc928]"
                                                            }`}
                                        />
                              </button>

                              {/* Middle Divider */}
                              <span
                                        aria-hidden="true"
                                        className="mx-0.5 h-4 w-px bg-[#829f20]/40 dark:bg-[#536d13] sm:mx-1 sm:h-5"
                              />

                              {/* Dark Mode */}
                              <button
                                        type="button"
                                        aria-label="Switch to dark mode"
                                        aria-pressed={activeTheme === "dark"}
                                        onClick={() => setTheme("dark")}
                                        className={`flex h-7 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-300 sm:h-8 sm:w-9 ${activeTheme === "dark"
                                                            ? "bg-[#293c20] shadow-inner"
                                                            : "hover:bg-[#829f20]/10 dark:hover:bg-[#3b5426]"
                                                  }`}
                              >
                                        <Moon
                                                  size={16}
                                                  aria-hidden="true"
                                                  className={`transition-all duration-300 sm:w-[17px] ${activeTheme === "dark"
                                                                      ? "-rotate-12 text-white"
                                                                      : "text-[#4b5d44] hover:-rotate-12 hover:text-[#1f3314] dark:text-gray-400 dark:hover:text-white"
                                                            }`}
                                        />
                              </button>
                    </div>
          );
};

export default ThemeToggle;