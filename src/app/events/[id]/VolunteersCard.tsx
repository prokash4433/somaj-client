"use client";

import Link from "next/link";
import { Lock, Users } from "lucide-react";
import { useEventVolunteers } from "@/lib/joinedStorage";

// Login ready hole eta true kore dio
const REQUIRE_LOGIN = false;

type Props = {
          eventId: string;
          baseCount: number;
          baseEmails: string[];
          apiJoined: boolean;
          isLoggedIn: boolean;
};

const VolunteersCard = ({
          eventId,
          baseCount,
          baseEmails,
          apiJoined,
          isLoggedIn,
}: Props) => {
          const { count, emails, myEmail } = useEventVolunteers(
                    eventId,
                    baseCount,
                    baseEmails,
                    apiJoined
          );

          const canView = !REQUIRE_LOGIN || isLoggedIn;

          return (
                    <div className="rounded-2xl border border-emerald-900/10 bg-emerald-50/70 p-5 dark:border-white/10 dark:bg-[#0e1713]">
                              <div className="flex items-center justify-between">
                                        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900/60 dark:text-emerald-100/55">
                                                  <Users size={14} strokeWidth={2} className="text-[#829f20]" />
                                                  Joined Volunteers
                                        </h3>
                                        <span className="rounded-full border border-[#829f20]/40 bg-[#829f20]/15 px-2.5 py-0.5 text-xs font-bold text-[#4d6b17] dark:text-[#c5e77b]">
                                                  {count}
                                        </span>
                              </div>

                              <div className="mt-4">
                                        {count === 0 ? (
                                                  <p className="rounded-xl border border-dashed border-[#829f20]/40 px-3 py-4 text-center text-xs text-emerald-900/60 dark:text-emerald-100/55">
                                                            No one has joined yet. Be the first volunteer!
                                                  </p>
                                        ) : !canView ? (
                                                  <Link
                                                            href="/login"
                                                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#829f20] hover:underline"
                                                  >
                                                            <Lock size={13} strokeWidth={1.75} />
                                                            Login to view volunteer emails
                                                  </Link>
                                        ) : emails.length === 0 ? (
                                                  <p className="text-xs text-emerald-900/60 dark:text-emerald-100/55">
                                                            {count} volunteers have joined this drive.
                                                  </p>
                                        ) : (
          <ul className="max-h-60 space-y-2 overflow-y-auto pr-1">
          {emails.map((email) => (
          <li
          key={email}
          className="flex items-center gap-3 rounded-xl border border-transparent bg-white/70 px-3 py-2 transition-all duration-300 hover:border-[#829f20]/50 dark:bg-white/[0.04]"
                                                                      >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3a4d1f] to-[#6f8a22] text-xs font-bold text-white">
          {email.charAt(0).toUpperCase()}
          </span>
          <span className="min-w-0 flex-1 truncate text-xs font-medium text-[#10261b] dark:text-white/85">
          {email}
          </span>
          {email === myEmail && (
          <span className="rounded-full bg-[#829f20] px-2 py-0.5 text-[10px] font-bold text-white">
                                                                                                    You
                    </span>
           )}
                    </li>
          ))}
                    </ul>
          )}
                              </div>
                    </div>
          );
};

export default VolunteersCard;