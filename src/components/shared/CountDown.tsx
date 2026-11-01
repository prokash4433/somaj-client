
"use client";

import { useTheme } from "next-themes";

const statistics = [
          {
                    value: "1,550+",
                    label: "Active Volunteers",
                    color: "text-emerald-500",
          },
          {
                    value: "150+",
                    label: "Events Completed",
                    color: "text-green-500",
          },
          {
                    value: "20,000+",
                    label: "Lives Impacted",
                    color: "text-indigo-500",
          },
          {
                    value: "100%",
                    label: "Community Driven",
                    color: "text-amber-500",
          },
];

const Countdown = () => {
          const { theme } = useTheme();

          const isDark = theme === "dark";

          return (
                    <section className="relative w-full px-5 pb-10 pt-2">
                              <div className="mx-auto max-w-[900px]">

                                        {/* Statistics Panel */}
                                        <div className="grid grid-cols-2 gap-3 rounded-2xl p-3 md:grid-cols-4 md:gap-4 md:p-4">

                                                  {statistics.map((stat) => (
                                                            <div
                                                                      key={stat.label}
                                                                      className={`group flex min-h-[85px] cursor-pointer flex-col items-center justify-center rounded-xl border px-2 py-4 text-center transition-all duration-300 hover:-translate-y-2 hover:scale-105 ${isDark
                                                                                          ? "border-[#293d32] bg-[#1c3025] hover:border-[#607b43] hover:bg-[#243c2c] hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
                                                                                          : "border-[#e5f0e9] bg-[#f7fbf8] hover:border-[#a9c58c] hover:bg-[#eaf5ec] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                                                                                }`}
                                                            >
                                                                      {/* Static Number */}
                                                                      <h3
                                                                                className={`text-2xl font-extrabold tracking-tight transition-transform duration-300 group-hover:scale-110 sm:text-3xl ${stat.color}`}
                                                                      >
                                                                                {stat.value}
                                                                      </h3>

                                                                      {/* Label */}
                                                                      <p
                                                                                className={`mt-1 text-[11px] font-medium transition-colors duration-300 sm:text-xs ${isDark ? "text-[#a9c6b7]" : "text-[#64756b]"
                                                                                          }`}
                                                                      >
                                                                                {stat.label}
                                                                      </p>
                                                            </div>
                                                  ))}

                                        </div>
                              </div>
                    </section>
          );
};

export default Countdown;
