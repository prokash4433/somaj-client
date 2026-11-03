"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check, HeartHandshake, Loader2, Users } from "lucide-react";
import ShareButton from "./ShareButton";
import { joinEvent, useEventVolunteers } from "@/lib/joinedStorage";

// Login ready hole eta true kore dio
const REQUIRE_LOGIN = false;

type Props = {
          eventId: string;
          title: string;
          category?: string;
          date?: string;
          location?: string;
          image: string | null;
          baseCount: number;
          baseEmails: string[];
          apiJoined: boolean;
          isLoggedIn: boolean;
};

const JoinSection = ({
          eventId,
          title,
          category,
          date,
          location,
          image,
          baseCount,
          baseEmails,
          apiJoined,
          isLoggedIn,
}: Props) => {
          const router = useRouter();
          const [loading, setLoading] = useState(false);
          const { joined, count } = useEventVolunteers(
                    eventId,
                    baseCount,
                    baseEmails,
                    apiJoined
          );

          const handleJoin = async () => {
                    if (loading) return;

                    if (joined) {
                              toast("You've already joined this drive. Thank you!", { icon: "🌿" });
                              return;
                    }

                    if (REQUIRE_LOGIN && !isLoggedIn) {
                              toast.error("Please log in to join this event.");
                              router.push("/login");
                              return;
                    }

                    setLoading(true);
                    // Pore backend ready hole ekhane fetch POST boshabe
                    await new Promise((r) => setTimeout(r, 600));

                    joinEvent({
                              id: eventId,
                              title,
                              category: category ?? "Community",
                              date: date ?? "",
                              location: location ?? "Location not set",
                              image,
                              volunteers: count + 1,
                    });

                    setLoading(false);
                    toast.success(`You're in! Thanks for joining "${title}" 🎉`, {
                              duration: 4500,
                    });
          };

          return (
                    <section className="flex flex-col gap-4 rounded-2xl border border-emerald-900/10 bg-emerald-50/70 p-4 dark:border-white/10 dark:bg-[#0e1713] sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#829f20]/30 bg-[#829f20]/15 text-[#829f20]">
                                                  <Users size={22} strokeWidth={1.75} />
                                        </div>
                                        <div>
                                                  <p className="text-[15px] font-semibold text-[#10261b] dark:text-white">
                                                            {count} {count === 1 ? "Volunteer" : "Volunteers"} Joined
                                                  </p>
                                                  <p className="text-sm text-emerald-900/60 dark:text-emerald-100/55">
                                                            {joined
                                                                      ? "You're part of this drive. Thank you!"
                                                                      : "Sign up to join hands for this drive"}
                                                  </p>
                                        </div>
                              </div>

                              <div className="flex items-center gap-3">
                                        <ShareButton />
                                        <button
                                                  type="button"
                                                  onClick={handleJoin}
                                                  disabled={loading}
                                                  className={`inline-flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-6 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/50 disabled:cursor-not-allowed disabled:opacity-70 sm:flex-none ${joined
                                                                      ? "border-[#829f20] bg-[#829f20] text-white shadow-[0_8px_24px_-10px_rgba(130,159,32,0.7)]"
                                                                      : "border-lime-800/20 bg-gradient-to-br from-lime-100 to-lime-200 text-lime-900 hover:brightness-95 dark:border-lime-200/15 dark:from-[#2b3a1a] dark:to-[#1d2a14] dark:text-lime-100/90 dark:shadow-inner dark:shadow-white/5 dark:hover:brightness-110"
                                                            }`}
                                        >
                                                  {loading ? (
                                                            <Loader2 size={17} className="animate-spin" />
                                                  ) : (
                                                            <HeartHandshake size={17} strokeWidth={1.75} />
                                                  )}
                                                  {joined ? "Joined" : "Join Event"}
                                                  {joined && <Check size={16} strokeWidth={2.5} />}
                                        </button>
                              </div>
                    </section>
          );
};

export default JoinSection;