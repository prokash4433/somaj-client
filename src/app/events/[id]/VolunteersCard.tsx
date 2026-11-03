"use client";

import Link from "next/link";
import { Lock, Users } from "lucide-react";

import {
          Avatar,
          AvatarFallback,
          AvatarImage,
} from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useEventVolunteers } from "@/lib/joinedStorage";

// Login ready hole eta true kore dio
const REQUIRE_LOGIN = false;

type VolunteerDetail = {
          name?: string;
          image?: string;
};

type Props = {
          eventId: string;
          baseCount: number;
          baseEmails: string[];
          apiJoined: boolean;
          isLoggedIn: boolean;
          // email -> { name, image } (API থেকে যা পাওয়া যায়)
          volunteerDetails?: Record<string, VolunteerDetail>;
};

const VolunteersCard = ({
          eventId,
          baseCount,
          baseEmails,
          apiJoined,
          isLoggedIn,
          volunteerDetails = {},
}: Props) => {
          const { count, emails, myEmail } = useEventVolunteers(
                    eventId,
                    baseCount,
                    baseEmails,
                    apiJoined
          );

          const { data: session } = authClient.useSession();
          const me = session?.user;

          const canView = !REQUIRE_LOGIN || isLoggedIn;

          // একজন volunteer এর name + image বের করার helper
          const getInfo = (email: string) => {
                    const isMe = !!me?.email && email === me.email;
                    const detail = volunteerDetails[email];

                    const name =
                              (isMe ? me?.name : undefined) ||
                              detail?.name ||
                              email.split("@")[0];

                    const image = (isMe ? me?.image : undefined) || detail?.image || "";

                    return { name, image, isMe };
          };

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
                                                            Login to view volunteers
                                                  </Link>
                                        ) : emails.length === 0 ? (
                                                  <p className="text-xs text-emerald-900/60 dark:text-emerald-100/55">
                                                            {count} volunteers have joined this drive.
                                                  </p>
                                        ) : (
                                                  <ul className="max-h-60 space-y-1.5 overflow-y-auto pr-1">
                                                            {emails.map((email) => {
                                                                      const { name, image, isMe } = getInfo(email);

                                                                      return (
                                                                                <li
                                                                                          key={email}
                                                                                          title={email}
                                                                                          className="group/vol flex items-center gap-2.5 rounded-xl border border-transparent bg-white/70 px-2.5 py-2 transition-all duration-300 hover:border-[#829f20]/50 dark:bg-white/[0.04]"
                                                                                >
                                                                                          <Avatar className="h-8 w-8 shrink-0 border border-[#829f20]/40 transition-all duration-300 group-hover/vol:border-[#829f20]">
                                                                                                    {image && (
                                                                                                              <AvatarImage
                                                                                                                        referrerPolicy="no-referrer"
                                                                                                                        src={image}
                                                                                                                        alt={name}
                                                                                                                        className="object-cover"
                                                                                                              />
                                                                                                    )}
                                                                                                    <AvatarFallback className="bg-gradient-to-br from-[#3a4d1f] to-[#6f8a22] text-xs font-bold text-white">
                                                                                                              {name.charAt(0).toUpperCase()}
                                                                                                    </AvatarFallback>
                                                                                          </Avatar>

                                                                                          <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-[#10261b] dark:text-white/90">
                                                                                                    {name}
                                                                                          </span>

                                                                                          {(isMe || email === myEmail) && (
                                                                                                    <span className="rounded-full bg-[#829f20] px-2 py-0.5 text-[10px] font-bold text-white">
                                                                                                              You
                                                                                                    </span>
                                                                                          )}
                                                                                </li>
                                                                      );
                                                            })}
                                                  </ul>
                                        )}
                              </div>
                    </div>
          );
};

export default VolunteersCard;