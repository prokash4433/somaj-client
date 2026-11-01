
"use client";

import { useTheme } from "next-themes";

 

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
          {
                    icon: "🌗",
                    title: "Light & dark",
                    description: "Comfortable viewing day or night.",
          },
];

const HeroSection = () => {
          const { theme } = useTheme();

          const isDark = theme === "dark";

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

                                        </div>
                              </div>
                    </section>
          );
};

export default HeroSection;
