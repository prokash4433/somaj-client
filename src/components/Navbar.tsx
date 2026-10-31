
"use client";

import Link from "next/link";

import {
          HandHeart,
          CalendarDays,
          Sun,
          Moon,
} from "lucide-react";

const Navbar = () => {
          return (
                    <nav className="w-full border border-[#26372b] bg-[#14251e] shadow-sm transition-colors duration-300 dark:bg-[#14251e]">
                              <div className="mx-auto flex min-h-[62px] w-full max-w-[1400px] items-center justify-between gap-3 px-3 py-2 sm:px-5 md:px-8 lg:px-10">

                                        {/* Logo */}
                                        <Link href="/" className="flex shrink-0 items-center gap-2.5">
                                                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#536d13] bg-[#26391c] shadow-[0_0_15px_rgba(194,248,0,0.12)]">
                                                            <HandHeart
                                                                      size={21}
                                                                      strokeWidth={1.8}
                                                                      className="text-white"
                                                            />
                                                  </div>

                                                  <span className="text-xl font-extrabold tracking-tight text-[#829f20] sm:text-[23px]">
                                                            Somaj
                                                  </span>
                                        </Link>

                                        {/* Upcoming Events */}
                                        <Link
                                                  href="/events"
                                                  className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#304638] bg-[#101e18] px-2.5 py-2 text-[11px] font-semibold text-[#829f20] transition-all duration-300 hover:border-[#829f20] sm:gap-2 sm:px-3.5 sm:text-[13px]"
                                        >
                                                  <CalendarDays size={15} className="shrink-0" />
                                                  <span>Upcoming Events</span>
                                        </Link>

                                        {/* Right Side */}
                                        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

                                                  {/* Theme Toggle */}
                                                  <button
                                                            type="button"
                                                            aria-label="Theme toggle"
                                                            className="flex shrink-0 items-center gap-1 rounded-full border border-[#304638] bg-[#1b3025] p-1.5 transition-all duration-300 hover:border-[#829f20]"
                                                  >
                                                            <Sun
                                                                      size={18}
                                                                      className="fill-[#ffc928] text-[#ffc928]"
                                                            />

                                                            <Moon
                                                                      size={18}
                                                                      className="text-gray-400"
                                                            />
                                                  </button>

                                                  {/* Login */}
                                                  <Link
                                                            href="/login"
                                                            className="shrink-0 rounded-lg border border-[#526b24] bg-[#293c20] px-2.5 py-2 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#3b5426] hover:shadow-[0_0_12px_rgba(194,248,0,0.15)] sm:px-3.5"
                                                  >
                                                            Login
                                                  </Link>

                                        </div>
                              </div>
                    </nav>
          );
};

export default Navbar;
