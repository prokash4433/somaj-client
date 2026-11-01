
"use client";

import Link from "next/link";

import {
  HandHeart,
  CalendarDays,
} from "lucide-react";

import ThemeToggle from "./shared/ThemeToggle";

const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full border border-[#dce5d8] bg-white shadow-sm transition-colors duration-300 dark:border-[#26372b] dark:bg-[#14251e]">

      <div className="mx-auto flex min-h-[62px] w-full max-w-[1400px] items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-5 md:px-8 lg:px-10">

        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#536d13] bg-[#26391c] shadow-[0_0_15px_rgba(194,248,0,0.12)] transition-all duration-300 hover:border-[#829f20]">
            <HandHeart
              size={21}
              strokeWidth={1.8}
              className="text-white"
            />
          </div>

          <span className="truncate text-lg font-extrabold tracking-tight text-[#536d13] transition-colors duration-300 dark:text-[#829f20] sm:text-xl md:text-[23px]">
            Somaj
          </span>
        </Link>

        {/* Upcoming Events */}
        <Link
          href="/events"
          className="flex shrink min-w-0 items-center justify-center gap-1 rounded-full border border-[#dce5d8] bg-[#edf2e9] px-2 py-2 text-[10px] font-semibold text-[#536d13] transition-all duration-300 ease-in-out hover:scale-105 hover:border-[#829f20] active:scale-95 dark:border-[#304638] dark:bg-[#101e18] dark:text-[#829f20] sm:gap-2 sm:px-3.5 sm:text-xs md:text-[13px]"
        >
          <CalendarDays
            size={15}
            className="shrink-0"
          />

          <span className="truncate">
            Upcoming Events
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Login */}
          <Link
            href="/login"
            className="shrink-0 rounded-lg border border-[#526b24] bg-[#293c20] px-2.5 py-2 text-xs font-bold text-white shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:border-[#829f20] hover:bg-[#3b5426] hover:shadow-[0_0_12px_rgba(194,248,0,0.15)] active:scale-95 sm:px-3.5"
          >
            Login
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
