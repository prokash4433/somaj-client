
"use client";

import Link from "next/link";
import {
      HandHeart,
      CalendarDays,
      PlusCircle,
      Settings2,
      CalendarCheck2,
      MapPin,
      Mail,
      Heart,
      ArrowUp,
      ArrowUpRight,
      Globe,
} from "lucide-react";

const BRAND = "Somaj";

const EXPLORE_LINKS = [
      { label: "Upcoming Events", href: "/events", icon: CalendarDays },
      { label: "Create an Event", href: "/create-event", icon: PlusCircle },
      { label: "Manage My Events", href: "/events/manage", icon: Settings2 },
      { label: "My Joined Events", href: "/events/joined", icon: CalendarCheck2 },
];

const CAUSES = [
      { label: "Winter Clothes & Blanket Relief", dot: "bg-sky-500" },
      { label: "City Clean-up & Waste Segregation", dot: "bg-[#829f20]" },
      { label: "Urban Tree Plantation Drives", dot: "bg-emerald-500" },
      { label: "Underprivileged Meal Sharing", dot: "bg-orange-500" },
      { label: "Free Medical & Health Camps", dot: "bg-violet-500" },
      { label: "Free Blood Donation", dot: "bg-red-500" },
];

const HEADING =
      "text-xs font-extrabold uppercase tracking-[0.18em] text-[#1f3314] dark:text-white";

const Footer = () => {
      const year = new Date().getFullYear();

      return (
            <footer className="relative w-full overflow-hidden border-t border-[#829f20]/30 text-[#4b5d44] transition-colors duration-300 dark:border-[#526b24]/30 dark:text-[#9fb2a6]">
                  {/* Soft gradient layers */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f7faef] via-[#eef4dc]/70 to-[#dfeac3]/80 dark:from-transparent dark:via-[#829f20]/[0.05] dark:to-[#3b5426]/25" />
                  <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#a8cf35]/25 blur-3xl dark:bg-[#829f20]/10" />
                  <div className="pointer-events-none absolute -bottom-40 -right-24 h-80 w-80 rounded-full bg-[#829f20]/20 blur-3xl dark:bg-[#3b5426]/15" />

                  {/* Top accent line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6d8d18]/80 to-transparent" />

                  <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-14 sm:px-8">
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1.2fr] lg:gap-12">

                              {/* Brand */}
                              <div>
                                    <Link href="/" className="group inline-flex items-center gap-3">
                                          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#829f20]/50 bg-gradient-to-br from-[#3b5426] to-[#829f20] text-white shadow-[0_8px_24px_-8px_rgba(90,120,30,0.6)] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                                                <HandHeart size={22} />
                                          </span>

                                          <span className="bg-gradient-to-r from-[#2f4a1d] via-[#4d6b17] to-[#7a9a1c] bg-clip-text text-2xl font-extrabold tracking-tight text-transparent dark:from-[#a8cf35] dark:via-[#c5e77b] dark:to-[#c5e77b]">
                                                {BRAND}
                                          </span>
                                    </Link>

                                    <p className="mt-5 max-w-xs text-sm leading-7 text-[#4b5d44] dark:text-[#9fb2a6]">
                                          A community-powered platform where neighbours organise, join, and
                                          track social service drives, from winter clothes to tree
                                          plantations, all in one place.
                                    </p>

                                    <div className="mt-5 space-y-2.5 text-xs text-[#4b5d44] dark:text-[#9fb2a6]">
                                          <p className="flex items-center gap-2">
                                                <MapPin
                                                      size={14}
                                                      className="shrink-0 text-[#5f7a1a] dark:text-[#a8cf35]"
                                                />
                                                Dhaka, Bangladesh • Nationwide Impact
                                          </p>

                                          <a
                                                href="mailto:hello@somaj.com"
                                                className="inline-flex items-center gap-2 transition-colors hover:text-[#3b5426] dark:hover:text-[#a8cf35]"
                                          >
                                                <Mail
                                                      size={14}
                                                      className="shrink-0 text-[#5f7a1a] dark:text-[#a8cf35]"
                                                />
                                                hello@somaj.com
                                          </a>
                                    </div>
                              </div>

                              {/* Explore */}
                              <div>
                                    <h3 className={HEADING}>Explore Platform</h3>

                                    <span className="mt-2 block h-0.5 w-8 rounded-full bg-gradient-to-r from-[#5f7a1a] to-[#a8cf35]" />

                                    <ul className="mt-5 space-y-3">
                                          {EXPLORE_LINKS.map(({ label, href, icon: Icon }) => (
                                                <li key={label}>
                                                      <Link
                                                            href={href}
                                                            className="group inline-flex items-center gap-2.5 text-sm font-medium text-[#4b5d44] transition-all duration-300 hover:translate-x-1 hover:text-[#3b5426] dark:text-[#9fb2a6] dark:hover:text-[#a8cf35]"
                                                      >
                                                            <Icon
                                                                  size={15}
                                                                  className="text-[#5f7a1a] transition-transform duration-300 group-hover:scale-110 dark:text-[#a8cf35]"
                                                            />
                                                            {label}
                                                      </Link>
                                                </li>
                                          ))}
                                    </ul>
                              </div>

                              {/* Causes */}
                              <div>
                                    <h3 className={HEADING}>Active Causes</h3>

                                    <span className="mt-2 block h-0.5 w-8 rounded-full bg-gradient-to-r from-[#5f7a1a] to-[#a8cf35]" />

                                    <ul className="mt-5 space-y-3">
                                          {CAUSES.map(({ label, dot }) => (
                                                <li
                                                      key={label}
                                                      className="group flex cursor-default items-center gap-3 text-sm font-medium text-[#4b5d44] transition-all duration-300 hover:translate-x-1 hover:text-[#1f3314] dark:text-[#9fb2a6] dark:hover:text-white"
                                                >
                                                      <span
                                                            className={`h-2 w-2 shrink-0 rounded-full ${dot} ring-2 ring-white/80 transition-transform duration-300 group-hover:scale-150 dark:ring-transparent`}
                                                      />
                                                      {label}
                                                </li>
                                          ))}
                                    </ul>
                              </div>

                              {/* Community */}
                              <div>
                                    <h3 className={HEADING}>Community Spirit</h3>

                                    <span className="mt-2 block h-0.5 w-8 rounded-full bg-gradient-to-r from-[#5f7a1a] to-[#a8cf35]" />

                                    <p className="mt-5 text-sm leading-7 text-[#4b5d44] dark:text-[#9fb2a6]">
                                          Connect with passionate volunteers, discover meaningful community
                                          initiatives, and work together to create a positive change where
                                          it matters most.
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2.5">
                                          <span className="inline-flex items-center gap-2 rounded-full border border-[#829f20]/50 bg-white/70 px-3.5 py-2 text-xs font-bold text-[#3b5426] shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:border-[#5f7a1a] hover:bg-white dark:border-[#829f20]/40 dark:bg-[#829f20]/10 dark:text-[#c5e77b] dark:shadow-none dark:hover:bg-[#829f20]/15">
                                                <Globe size={14} className="text-[#5f7a1a] dark:text-[#a8cf35]" />
                                                100% Volunteer Driven
                                          </span>
                                    </div>

                                    <Link
                                          href="/create-event"
                                          className="group mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#4d6b17] transition-colors hover:text-[#2f4a1d] dark:text-[#a8cf35] dark:hover:text-[#c5e77b]"
                                    >
                                          Start a drive today
                                          <ArrowUpRight
                                                size={15}
                                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                          />
                                    </Link>
                              </div>
                        </div>

                        {/* Bottom bar */}
                        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#829f20]/30 pt-6 text-xs text-[#5a6b53] dark:border-[#526b24]/25 dark:text-[#9fb2a6] sm:flex-row">
                              <p>
                                    © {year} {BRAND}. Built with care for community service and social
                                    development.
                              </p>

                              <div className="flex items-center gap-4">
                                    <p className="inline-flex items-center gap-1.5">
                                          Made with
                                          <Heart
                                                size={14}
                                                className="animate-pulse fill-rose-500 text-rose-500"
                                          />
                                          for a better tomorrow
                                    </p>

                                    <button
                                          type="button"
                                          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                          aria-label="Back to top"
                                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#829f20]/50 bg-white/80 text-[#3b5426] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#5f7a1a] hover:bg-[#829f20] hover:text-white active:scale-95 dark:border-[#526b24]/40 dark:bg-[#3b5426]/10 dark:text-[#a8cf35] dark:shadow-none dark:hover:bg-[#829f20]/20 dark:hover:text-[#a8cf35]"
                                    >
                                          <ArrowUp size={15} />
                                    </button>
                              </div>
                        </div>
                  </div>
            </footer>
      );
};

export default Footer;
