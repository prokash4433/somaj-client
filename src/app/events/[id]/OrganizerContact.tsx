"use client";

import Link from "next/link";
import { Lock, Mail } from "lucide-react";

import {
          Avatar,
          AvatarFallback,
          AvatarImage,
} from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

type Props = {
          // Login না থাকলে এই নামটা দেখাবে
          organizerName?: string;
};

const OrganizerContact = ({ organizerName = "Somaj Team" }: Props) => {
          const { data: session, isPending } = authClient.useSession();
          const user = session?.user;

          const displayName = user?.name || organizerName;
          const firstLetter = displayName.trim().charAt(0).toUpperCase() || "S";

          return (
                    <div className="mt-4 flex items-center gap-3">
                              {/* Avatar: image থাকলে image, না থাকলে প্রথম অক্ষর */}
                              <Avatar className="h-12 w-12 shrink-0 ring-2 ring-lime-700/15 transition-all duration-300 group-hover:ring-[#829f20] dark:ring-lime-200/10 dark:group-hover:ring-[#829f20]">
                                        {user?.image && (
                                                  <AvatarImage
                                                            referrerPolicy="no-referrer"
                                                            src={user.image}
                                                            alt={displayName}
                                                            className="object-cover"
                                                  />
                                        )}
                                        <AvatarFallback className="bg-gradient-to-br from-[#3a4d1f] to-[#1d2a14] text-lg font-bold text-white">
                                                  {firstLetter}
                                        </AvatarFallback>
                              </Avatar>

                              <div className="min-w-0">
                                        {isPending ? (
                                                  // Session load হওয়ার সময় skeleton
                                                  <div className="space-y-2">
                                                            <div className="h-4 w-28 animate-pulse rounded bg-emerald-900/10 dark:bg-white/10" />
                                                            <div className="h-3 w-36 animate-pulse rounded bg-emerald-900/10 dark:bg-white/10" />
                                                  </div>
                                        ) : (
                                                  <>
                                                            <p className="truncate text-[15px] font-semibold text-[#10261b] dark:text-white">
                                                                      {displayName}
                                                            </p>

                                                            {user?.email ? (
                                                                      <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-emerald-900/60 dark:text-emerald-100/55">
                                                                                <Mail size={13} strokeWidth={1.75} className="shrink-0" />
                                                                                <span className="truncate">{user.email}</span>
                                                                      </p>
                                                            ) : (
                                                                      <Link
                                                                                href="/login"
                                                                                className="mt-0.5 inline-flex items-center gap-1.5 text-xs font-medium text-[#829f20] hover:underline"
                                                                      >
                                                                                <Lock size={13} strokeWidth={1.75} className="shrink-0" />
                                                                                Login to view contact
                                                                      </Link>
                                                            )}
                                                  </>
                                        )}
                              </div>
                    </div>
          );
};

export default OrganizerContact;