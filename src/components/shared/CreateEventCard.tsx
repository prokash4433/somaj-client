 

import Link from "next/link";
import { Plus, Sparkles, Users, MapPin } from "lucide-react";

const CreateEventCard = () => {
          return (
                    <Link
                              href="/create-event"
                              className="group relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-emerald-400/30 bg-gradient-to-br from-[#15211b] via-[#162318] to-[#1d2c14] p-8 text-center transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-[0_20px_44px_-18px_rgba(110,140,30,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                              {/* Background glow */}
                              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-lime-400/10 blur-3xl transition duration-500 group-hover:bg-lime-400/25" />
                              <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-emerald-400/10 blur-3xl transition duration-500 group-hover:bg-emerald-400/20" />

                              {/* Subtle dotted pattern */}
                              <div
                                        className="pointer-events-none absolute inset-0 opacity-[0.07]"
                                        style={{
                                                  backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                                                  backgroundSize: "18px 18px",
                                        }}
                              />

                              {/* Icon with pulse ring */}
                              <div className="relative">
                                        <span className="absolute inset-0 rounded-2xl bg-lime-400/30 blur-xl transition duration-500 group-hover:bg-lime-400/50" />
                                        <span className="relative flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-lime-300/25 bg-gradient-to-br from-[#26331a] to-[#6b7d22] shadow-[0_12px_32px_-8px_rgba(132,160,40,0.6)] transition duration-300 group-hover:scale-110">
                                                  <Plus
                                                            className="h-8 w-8 text-white transition-transform duration-300 group-hover:rotate-90"
                                                            strokeWidth={2.25}
                                                  />
                                        </span>
                              </div>

                              {/* Text */}
                              <h3 className="relative mt-7 text-xl font-bold text-white">Create Event</h3>
                              <p className="relative mt-2 max-w-[240px] text-sm leading-relaxed text-[#9fb2a6]">
                                        Start a new community drive and bring volunteers together.
                              </p>

                              {/* Feature chips */}
                              <div className="relative mt-6 flex flex-wrap items-center justify-center gap-2">
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-[#b6c7bc]">
                                                  <Users className="h-3 w-3 text-emerald-400" />
                                                  Volunteers
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-[#b6c7bc]">
                                                  <MapPin className="h-3 w-3 text-emerald-400" />
                                                  Location
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-[#b6c7bc]">
                                                  <Sparkles className="h-3 w-3 text-emerald-400" />
                                                  Impact
                                        </span>
                              </div>
                    </Link>
          );
};

export default CreateEventCard;