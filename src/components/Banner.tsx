
"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import Countdown from "./shared/CountDown";
 

const Banner = () => {
          const { theme } = useTheme();

          const isDark = theme === "dark";

          return (
          <section
          className={`relative mt-10 flex min-h-[365px] w-full items-center justify-center overflow-hidden border-t px-5 py-16 text-center transition-colors duration-300 ${isDark
          ? "border-[#26372b] bg-gradient-to-r from-[#050805] via-[#111d0e] to-[#263820]"
          : "border-[#d5eae1] bg-gradient-to-r from-[#f0faf6] via-[#e4f5ed] to-[#d5eee3]"}`}>
                              {/* Background Glow */}
          <div
          className={`pointer-events-none absolute inset-0 ${isDark
          ? "bg-[radial-gradient(ellipse_at_center,rgba(111,148,45,0.10),transparent_65%)]"
          : "bg-[radial-gradient(ellipse_at_center,rgba(20,184,135,0.10),transparent_65%)]"}`}/>

          <div className="relative z-10 mx-auto max-w-4xl">

                    {/* Heading */}
          <h1
          className={`text-3xl font-bold leading-tight tracking-tight transition-colors duration-300 sm:text-4xl md:text-5xl ${isDark ? "text-white" : "text-[#142b23]"}`}>
          Together, <span className="text-[]">we build a better society.</span>
          </h1>

                              {/* Description */}
          <p
          className={`mx-auto mt-6 max-w-[510px] text-sm leading-relaxed transition-colors duration-300 sm:text-base ${isDark ? "text-gray-200" : "text-[#536b60]"}`}>
          Somaj connects volunteers with local social service events — from
          winter clothes drives to riverbank cleanups.
          </p>

                              {/* Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">

          <Link
          href="/events"
          className="rounded-lg border border-[#81915d] bg-gradient-to-b from-[#384d25] to-[#536c27] px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-[#526c30] hover:to-[#718d36] hover:shadow-[0_5px_20px_rgba(133,170,66,0.2)]">
          Explore Events
          </Link>

          <Link
          href="/create-event"
          className="rounded-lg border border-[#81915d] bg-gradient-to-b from-[#26391e] to-[#425727] px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-[#405a2b] hover:to-[#607b32] hover:shadow-[0_5px_20px_rgba(133,170,66,0.2)]">
          Start an Event
          </Link>

          </div>

          <div>
          <Countdown />        
          </div>
                    </div>

                               
          </section>
          );
};

export default Banner;
