
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Compass } from "lucide-react";

const features = [
          {
                    icon: "📍",
                    title: "Hyperlocal events",
                    description: "Find service events in your own neighbourhood.",
          },
          {
                    icon: "🤝",
                    title: "One-click join",
                    description: "Join events instantly and track them in one place.",
          },
          {
                    icon: "🛡️",
                    title: "Secure access",
                    description: "Token-protected actions keep your events safe.",
          },
];

const HeroSection = () => {
          const { resolvedTheme } = useTheme();
          const [mounted, setMounted] = useState(false);

          useEffect(() => {
                    setMounted(true);
          }, []);

          // Prevent server/client theme mismatch.
          const isDark = mounted && resolvedTheme === "dark";

          return (
                    <section
                              className={`w-full px-5 py-12 transition-colors duration-300 sm:py-14 ${isDark ? "bg-[#0d1712]" : "bg-[#f8faf8]"
                                        }`}
                    >
                              <div className="mx-auto max-w-6xl">
                                        {/* Section Heading */}
                                        <div className="mb-8 text-center">
                                                  <h2
                                                            className={`text-2xl font-bold tracking-tight transition-colors duration-300 sm:text-3xl ${isDark ? "text-white" : "text-[#17271f]"
                                                                      }`}
                                                  >
                                                            Why Somaj?
                                                  </h2>

                                                  <p
                                                            className={`mt-3 text-sm transition-colors duration-300 sm:text-base ${isDark ? "text-[#a9c6d0]" : "text-[#64756b]"
                                                                      }`}
                                                  >
                                                            Everything you need to organise and join community service.
                                                  </p>
                                        </div>

                                        {/* Feature Cards */}
                                        <div className="mx-auto grid max-w-[972px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                                  {features.map((feature) => (
                                                            <div
                                                                      key={feature.title}
                                                                      className={`group flex min-h-[192px] flex-col items-center justify-center rounded-2xl border px-5 py-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 ${isDark
                                                                                          ? "border-[#293d32] bg-[#17271f] shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:border-[#607b43] hover:bg-[#1c3025] hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
                                                                                          : "border-[#e0e9e2] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:border-[#a9c58c] hover:bg-[#f1f7ef] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                                                                                }`}
                                                            >
                                                                      {/* Feature Icon */}
                                                                      <span className="mb-3 text-3xl transition-transform duration-300 group-hover:scale-110">
                                                                                {feature.icon}
                                                                      </span>

                                                                      {/* Feature Title */}
                                                                      <h3
                                                                                className={`text-base font-bold transition-colors duration-300 ${isDark ? "text-white" : "text-[#17271f]"
                                                                                          }`}
                                                                      >
                                                                                {feature.title}
                                                                      </h3>

                                                                      {/* Feature Description */}
                                                                      <p
                                                                                className={`mt-5 max-w-[190px] text-sm leading-relaxed transition-colors duration-300 ${isDark ? "text-[#a9c6d0]" : "text-[#64756b]"
                                                                                          }`}
                                                                      >
                                                                                {feature.description}
                                                                      </p>
                                                            </div>
                                                  ))}

                                                  {/* Upcoming Only Discovery */}
                                                  <div
                                                            className={`group flex min-h-[192px] flex-col items-start justify-center rounded-2xl border px-5 py-7 text-left shadow-sm transition-all duration-300 hover:-translate-y-2 ${isDark
                                                                                ? "border-[#293d32] bg-[#17271f] shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:border-[#607b43] hover:bg-[#1c3025] hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
                                                                                : "border-[#e0e9e2] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:border-[#a9c58c] hover:bg-[#f1f7ef] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                                                                      }`}
                                                  >
                                                            {/* Feature Icon */}
                                                            <div
                                                                      className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-300 ${isDark ? "bg-[#293d32]" : "bg-[#eaf3e8]"
                                                                                }`}
                                                            >
                                                                      <Compass
                                                                                size={18}
                                                                                strokeWidth={2}
                                                                                className="text-amber-500 transition-transform duration-300 group-hover:rotate-45"
                                                                      />
                                                            </div>

                                                            {/* Feature Title */}
                                                            <h3
                                                                      className={`text-[13px] font-bold leading-snug transition-colors duration-300 ${isDark ? "text-white" : "text-[#17271f]"
                                                                                }`}
                                                            >
                                                                      Upcoming Only Discovery
                                                            </h3>

                                                            {/* Feature Description */}
                                                            <p
                                                                      className={`mt-2 max-w-[220px] text-[11px] leading-[1.7] transition-colors duration-300 ${isDark ? "text-[#a9c6d0]" : "text-[#64756b]"
                                                                                }`}
                                                            >
                                                                      Discover upcoming community service events through future-date
                                                                      filtering and find meaningful opportunities to volunteer.
                                                            </p>
                                                  </div>
                                        </div>
                              </div>
                    </section>
          );
};

export default HeroSection;
