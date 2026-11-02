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
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-emerald-900/15 bg-white text-[#829f20] transition-colors hover:border-[#829f20] hover:text-[#9bbd2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#829f20]/60 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-[#829f20]"
                              >
                              {copied ? (
                              <Check size={17} strokeWidth={2.25} className="text-[#829f20]" />
                              ) : (
                              <Share2 size={17} strokeWidth={1.75} />
                              )}
                              </button>

                              {copied && (
                                        <span
                                        role="status"
                                        className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#829f20] px-2.5 py-1 text-xs font-medium text-white shadow-lg"
                                        >
                                                  Link copied
                                        </span>
                              )}
                    </div>
          );
};

export default ShareButton;