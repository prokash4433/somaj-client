"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

const ShareButton = () => {
          const [copied, setCopied] = useState(false);

          const handleShare = async () => {
                    const url = window.location.href;
                    try {
                              await navigator.clipboard.writeText(url);
                    } catch {
                              // Fallback for browsers without clipboard API
                              const input = document.createElement("textarea");
                              input.value = url;
                              document.body.appendChild(input);
                              input.select();
                              document.execCommand("copy");
                              document.body.removeChild(input);
                    }
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
          };

          return (
                    <div className="relative">
                              <button
                                        type="button"
                                        onClick={handleShare}
                                        aria-label="Copy event link"
                                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-emerald-900/15 bg-white text-emerald-900/70 transition-colors hover:border-emerald-600/40 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:border-white/10 dark:bg-white/[0.03] dark:text-emerald-100/70 dark:hover:border-emerald-400/40 dark:hover:text-emerald-300"
                              >
                                        {copied ? (
                                                  <Check size={17} strokeWidth={2.25} className="text-emerald-600 dark:text-emerald-300" />
                                        ) : (
                                                  <Share2 size={17} strokeWidth={1.75} />
                                        )}
                              </button>

                              {copied && (
                                        <span
                                                  role="status"
                                                  className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#10261b] px-2.5 py-1 text-xs font-medium text-white shadow-lg dark:bg-emerald-300 dark:text-[#10261b]"
                                        >
                                                  Link copied
                                        </span>
                              )}
                    </div>
          );
};

export default ShareButton;