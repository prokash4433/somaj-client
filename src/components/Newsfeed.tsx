 

"use client";

import { useState } from "react";
import {
          Send,
          Mail,
          BellRing,
          CheckCircle2,
          Loader2,
          ShieldCheck,
          Shirt,
          HeartHandshake,
          Sprout,
} from "lucide-react";
import { toast } from "sonner";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PERKS = [
          { icon: Shirt, label: "Winter drives" },
          { icon: HeartHandshake, label: "Relief alerts" },
          { icon: Sprout, label: "Green cleanups" },
];

const Newsfeed = () => {
          const [email, setEmail] = useState("");
          const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
          const [error, setError] = useState("");

          const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
                    e.preventDefault();

                    const value = email.trim();

                    if (!EMAIL_REGEX.test(value)) {
                              setError("Please enter a valid email address.");
                              return;
                    }

                    setError("");
                    setStatus("loading");

                    try {
                               
                              await new Promise((resolve) => setTimeout(resolve, 900));

                              setStatus("success");
                              setEmail("");
                              toast.success("You're subscribed!", {
                                        description: "We'll notify you about new community drives.",
                              });
                    } catch {
                              setStatus("idle");
                              toast.error("Subscription failed", {
                                        description: "Something went wrong. Please try again.",
                              });
                    }
          };

          return (
                    <section className="w-full px-4 py-14 text-foreground transition-colors duration-300 sm:px-6 lg:px-8">
                              <div className="group/card relative mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-[#526b24]/30 bg-gradient-to-br from-[#f1f6e6] via-white to-[#e6efd2] p-px shadow-[0_20px_60px_-25px_rgba(82,107,36,0.45)] transition-all duration-500 hover:border-[#829f20]/60 hover:shadow-[0_28px_70px_-25px_rgba(130,159,32,0.55)] dark:from-[#14221b] dark:via-[#0f1a14] dark:to-[#26331a]">
                                        <div className="relative overflow-hidden rounded-[27px] bg-gradient-to-br from-[#f6faee] via-white to-[#eaf2d8] px-6 py-12 text-center dark:from-[#12201a] dark:via-[#0d1712] dark:to-[#1d2a14] sm:px-12 sm:py-14">
                                                  {/* Glow blobs */}
                                                  <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#829f20]/20 blur-3xl transition-transform duration-700 group-hover/card:translate-x-6 group-hover/card:translate-y-4" />
                                                  <div className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-[#3b5426]/20 blur-3xl transition-transform duration-700 group-hover/card:-translate-x-6 group-hover/card:-translate-y-4 dark:bg-[#526b24]/25" />

                                                  {/* Subtle dotted pattern */}
                                                  <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#526b24_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] dark:opacity-[0.18]" />

                                                  <div className="relative">
                                                            {/* Icon */}
                                                            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#526b24]/30 bg-[#3b5426]/10 text-[#526b24] shadow-sm transition-all duration-300 hover:rotate-6 hover:scale-110 dark:text-[#a8cf35]">
                                                                      <BellRing size={26} strokeWidth={2} />
                                                            </div>

                                                            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#6d8d18] dark:text-[#a8cf35]">
                                                                      Stay Connected
                                                            </span>

                                                            <h2 className="mx-auto mt-3 max-w-xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                                                                      Subscribe to{" "}
                                                                      <span className="bg-gradient-to-r from-[#3b5426] via-[#6d8d18] to-[#829f20] bg-clip-text text-transparent dark:from-[#a8cf35] dark:via-[#c5e77b] dark:to-[#829f20]">
                                                                                Local Cause Alerts
                                                                      </span>
                                                            </h2>

                                                            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:text-[15px]">
                                                                      Get notified when new winter drives, blanket distributions, or
                                                                      emergency cleanups are organized in your neighborhood.
                                                            </p>

                                                            {/* Perks */}
                                                            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                                                                      {PERKS.map(({ icon: Icon, label }) => (
                                                                                <span
                                                                                          key={label}
                                                                                          className="inline-flex items-center gap-1.5 rounded-full border border-[#526b24]/25 bg-[#3b5426]/10 px-3 py-1.5 text-xs font-semibold text-[#526b24] transition-all duration-300 hover:scale-105 hover:border-[#829f20]/60 hover:bg-[#829f20]/15 dark:text-[#c5e77b]"
                                                                                >
                                                                                          <Icon size={13} />
                                                                                          {label}
                                                                                </span>
                                                                      ))}
                                                            </div>

                                                            {/* Form / Success */}
                                                            {status === "success" ? (
                                                                      <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-2 rounded-2xl border border-[#829f20]/40 bg-[#829f20]/10 px-6 py-6">
                                                                                <CheckCircle2
                                                                                          size={32}
                                                                                          className="text-[#6d8d18] dark:text-[#a8cf35]"
                                                                                />
                                                                                <p className="text-base font-extrabold">You&apos;re all set!</p>
                                                                                <p className="text-sm text-muted-foreground">
                                                                                          We&apos;ll email you whenever a new community drive is
                                                                                          announced.
                                                                                </p>
                                                                                <button
                                                                                          type="button"
                                                                                          onClick={() => setStatus("idle")}
                                                                                          className="mt-2 cursor-pointer text-xs font-bold text-[#6d8d18] underline-offset-4 transition-colors hover:underline dark:text-[#a8cf35]"
                                                                                >
                                                                                          Subscribe another email
                                                                                </button>
                                                                      </div>
                                                            ) : (
                                                                      <form
                                                                                onSubmit={handleSubmit}
                                                                                noValidate
                                                                                className="mx-auto mt-8 max-w-lg"
                                                                      >
                                                                                <div className="flex flex-col gap-3 sm:flex-row">
                                                                                          <label className="relative block flex-1">
                                                                                                    <span className="sr-only">Email address</span>
                                                                                                    <Mail
                                                                                                              size={17}
                                                                                                              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#718b32] dark:text-[#a8cf35]"
                                                                                                    />
                                                                                                    <input
                                                                                                              type="email"
                                                                                                              value={email}
                                                                                                              onChange={(e) => {
                                                                                                                        setEmail(e.target.value);
                                                                                                                        if (error) setError("");
                                                                                                              }}
                                                                                                              placeholder="Enter your email address"
                                                                                                              disabled={status === "loading"}
                                                                                                              aria-invalid={!!error}
                                                                                                              className={`h-12 w-full rounded-xl border bg-white/80 pl-11 pr-4 text-sm text-foreground shadow-sm backdrop-blur transition-all duration-300 placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:opacity-60 dark:bg-white/[0.04] ${error
                                                                                                                                  ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/25"
                                                                                                                                  : "border-[#526b24]/30 hover:border-[#829f20]/60 focus:border-[#829f20] focus:ring-[#829f20]/25"
                                                                                                                        }`}
                                                                                                    />
                                                                                          </label>

                                                                                          <button
                                                                                                    type="submit"
                                                                                                    disabled={status === "loading"}
                                                                                                    className="group inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#526b24]/70 bg-gradient-to-br from-[#3b5426] to-[#6f8a22] px-6 text-sm font-bold text-white shadow-[0_8px_24px_-8px_rgba(90,120,30,0.55)] transition-all duration-300 hover:scale-105 hover:border-[#829f20] hover:shadow-[0_12px_32px_-6px_rgba(90,120,30,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#829f20] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 dark:from-[#3b5426] dark:to-[#829f20]"
                                                                                          >
                                                                                                    {status === "loading" ? (
                                                                                                              <>
                                                                                                                        <Loader2 size={16} className="animate-spin" />
                                                                                                                        Subscribing...
                                                                                                              </>
                                                                                                    ) : (
                                                                                                              <>
                                                                                                                        <Send
                                                                                                                                  size={16}
                                                                                                                                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                                                                                                        />
                                                                                                                        Subscribe
                                                                                                              </>
                                                                                                    )}
                                                                                          </button>
                                                                                </div>

                                                                                {error && (
                                                                                          <p
                                                                                                    role="alert"
                                                                                                    className="mt-2 text-left text-xs font-medium text-red-600 dark:text-red-400"
                                                                                          >
                                                                                                    {error}
                                                                                          </p>
                                                                                )}
                                                                      </form>
                                                            )}

                                                            <p className="mt-5 inline-flex items-center justify-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                                                                      <ShieldCheck
                                                                                size={13}
                                                                                className="text-[#718b32] dark:text-[#a8cf35]"
                                                                      />
                                                                      Stay connected. Make a difference.
                                                            </p>
                                                  </div>
                                        </div>
                              </div>
                    </section>
          );
};

export default Newsfeed;