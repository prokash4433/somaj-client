
"use client";

import { useState } from "react";
import Link from "next/link";
 

import {
          ArrowRight,
          Eye,
          EyeOff,
          ImageIcon,
          Lock,
          Mail,
          User,
          X,
          HandHeart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const inputClass =
          "h-12 rounded-xl border-[#829f20]/25 bg-[#f6f9ec]/70 pl-11 text-[15px] shadow-none transition-all placeholder:text-[#7d8f75] hover:border-[#829f20]/50 focus-visible:border-[#829f20] focus-visible:ring-[3px] focus-visible:ring-[#829f20]/25 dark:border-white/10 dark:bg-white/[0.04] dark:placeholder:text-white/35 dark:hover:border-[#829f20]/50";

const iconClass =
          "pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#6f8a22] transition-colors group-focus-within:text-[#4d6b17] dark:text-[#a8cf35] dark:group-focus-within:text-[#c5e77b]";

const labelClass =
          "text-sm font-semibold text-[#1f3314] dark:text-white";

const RegisterPage = () => {
          const handleRegister = async (
                    e: React.SubmitEvent<HTMLFormElement>
          ) => {
                    e.preventDefault();

                    const formData = new FormData(e.currentTarget);

                    const user = Object.fromEntries(
                              formData.entries()
                    ) as {
                              name: string;
                              photo: string;
                              email: string;
                              password: string;
                    };

                    const { data, error } = await authClient.signUp.email({
                              name: user.name,
                              image: user.photo || undefined,
                              email: user.email,
                              password: user.password,
                    });

                    if (data) {
                              toast.success("Account created successfully!");

                              redirect("/events");
                    }

                    if (error) {
                              toast.error(error.message || "Registration failed!");
                              console.log(error);
                    }
          };

          const [showPassword, setShowPassword] = useState(false);
          const [password, setPassword] = useState("");

          // Password strength conditions
          const hasUppercase = /[A-Z]/.test(password);
          const hasLowercase = /[a-z]/.test(password);
          const hasMinLength = password.length >= 6;

          const passwordRules = [
                    {
                              label: "At least one uppercase letter (A-Z)",
                              isValid: hasUppercase,
                    },
                    {
                              label: "At least one lowercase letter (a-z)",
                              isValid: hasLowercase,
                    },
                    {
                              label: "Minimum 6 characters length",
                              isValid: hasMinLength,
                    },
          ];

          const strengthCount = passwordRules.filter(
                    (rule) => rule.isValid
          ).length;

          return (
                    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-12 pt-28 text-foreground">

                              {/* Background glows */}
                              <div className="pointer-events-none absolute -top-32 left-1/2 h-[440px] w-[760px] -translate-x-1/2 rounded-full bg-[#829f20]/15 blur-[120px] dark:bg-[#829f20]/10" />

                              <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[#3b5426]/15 blur-3xl dark:bg-[#3b5426]/25" />

                              <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#c5e77b]/20 blur-3xl dark:bg-[#829f20]/10" />

                              <div className="relative w-full max-w-md">
                                        <div className="relative overflow-hidden rounded-[28px] border border-[#829f20]/25 bg-white/80 p-7 shadow-[0_30px_70px_-30px_rgba(60,90,20,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-[#16221d]/80 dark:shadow-[0_30px_70px_-25px_rgba(0,0,0,0.75)] sm:p-9">

                                                  {/* Top accent line */}
                                                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#3b5426] via-[#829f20] to-[#c5e77b]" />

                                                  {/* Header */}
                                                  <div className="flex flex-col items-center text-center">
                                                            <div className="relative">
                                                                      <div className="absolute inset-0 rounded-2xl bg-[#829f20]/40 blur-xl" />

                                                                      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#a8cf35]/40 bg-gradient-to-br from-[#3b5426] to-[#829f20] shadow-lg">
                                                                                <HandHeart
                                                                                          className="h-7 w-7 text-white"
                                                                                          strokeWidth={1.75}
                                                                                />
                                                                      </div>
                                                            </div>

                                                            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[#1f3314] dark:text-white">
                                                                      Create Account
                                                            </h1>

                                                            <p className="mt-2 text-sm text-[#4b5d44] dark:text-[#9fb2a6]">
                                                                      Join the community and start driving social change
                                                            </p>
                                                  </div>

                                                  {/* Register Form */}
                                                  <form onSubmit={handleRegister} className="mt-8 space-y-5">

                                                            {/* Full Name */}
                                                            <div>
                                                                      <Label htmlFor="name" className={labelClass}>
                                                                                Full Name
                                                                      </Label>

                                                                      <div className="group relative mt-2">
                                                                                <User className={iconClass} strokeWidth={1.75} />

                                        <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Your Name"
                                                                                          className={inputClass}
                                                                                          required
                                                                                />
                                                                      </div>
                                                            </div>

                                                            {/* Email */}
                                                            <div>
                                                                      <Label htmlFor="email" className={labelClass}>
                                                                                Email Address
                                                                      </Label>

                                                                      <div className="group relative mt-2">
                                                                                <Mail className={iconClass} strokeWidth={1.75} />

                                                                                <Input
                                                                                          id="email"
                                                                                          name="email"
                                                                                          type="email"
                                                                                          autoComplete="email"
                                                                                          placeholder="name@example.com"
                                                                                          className={inputClass}
                                                                                          required
                                                                                />
                                                                      </div>
                                                            </div>

                                                            {/* Profile Photo */}
                                                            <div>
                                                                      <Label htmlFor="photo" className={labelClass}>
                                                                                Profile Photo URL
                                                                      </Label>

                                                                      <div className="group relative mt-2">
                                                                                <ImageIcon className={iconClass} strokeWidth={1.75} />

                                                                                <Input
                                                                                          id="photo"
                                                                                          name="photo"
                                                                                          type="url"
                                                                                          placeholder="https://images.unsplash.com/..."
                                                                                          className={`${inputClass} pr-12`}
                                                                                />
                                                                      </div>

                                                                      <p className="mt-1.5 text-xs text-[#6b7d63] dark:text-[#8aa093]">
                                                                                Optional: Leave empty for default avatar
                                                                      </p>
                                                            </div>

                                                            {/* Password */}
                                                            <div>
                                                                      <Label htmlFor="password" className={labelClass}>
                                                                                Password
                                                                      </Label>

                                                                      <div className="group relative mt-2">
                                                                                <Lock className={iconClass} strokeWidth={1.75} />

                                                                                <Input
                                                                                          id="password"
                                                                                          name="password"
                                                                                          type={showPassword ? "text" : "password"}
                                                                                          autoComplete="new-password"
                                                                                          placeholder="••••••••"
                                                                                          value={password}
                                                                                          onChange={(e) => setPassword(e.target.value)}
                                                                                          className={`${inputClass} pr-12`}
                                                                                          required
                                                                                />

                                                                                {/* Show / Hide Password */}
                                                                                <button
                                                                                          type="button"
                                                                                          onClick={() => setShowPassword((prev) => !prev)}
                                                                                          aria-label={
                                                                                                    showPassword ? "Hide password" : "Show password"
                                                                                          }
                                                                                          aria-pressed={showPassword}
                                                                                          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#6f8a22] transition-colors hover:bg-[#829f20]/15 hover:text-[#4d6b17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#829f20] dark:text-[#a8cf35] dark:hover:text-[#c5e77b]"
                                                                                >
                                                                                          {showPassword ? (
                                                                                                    <EyeOff size={17} />
                                                                                          ) : (
                                                                                                    <Eye size={17} />
                                                                                          )}
                                                                                </button>
                                                                      </div>

                                                                      {/* Password Strength Indicator */}
                                                                      <div className="mt-3 flex gap-1.5">
                                                                                {[0, 1, 2].map((index) => (
                                                                                          <span
                                                                                                    key={index}
                                                                                                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${strengthCount > index
                                                                                                                        ? "bg-[#829f20] dark:bg-[#a8cf35]"
                                                                                                                        : "bg-[#829f20]/15 dark:bg-white/10"
                                                                                                              }`}
                                                                                          />
                                                                                ))}
                                                                      </div>

                                                                      {/* Password Rules */}
                                                                      <ul className="mt-3 space-y-1.5">
                                                                                {passwordRules.map((rule) => (
                                                                                          <li
                                                                                                    key={rule.label}
                                                                                                    className={`flex items-center gap-2 text-xs transition-colors ${rule.isValid
                                                                                                                        ? "text-[#5f7a1a] dark:text-[#a8cf35]"
                                                                                                                        : "text-[#6b7d63] dark:text-[#8aa093]"
                                                                                                              }`}
                                                                                          >
                                                                                                    <span
                                                                                                              className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors ${rule.isValid
                                                                                                                                  ? "bg-[#829f20]/20 text-[#5f7a1a] dark:bg-[#829f20]/25 dark:text-[#c5e77b]"
                                                                                                                                  : "bg-[#829f20]/10 text-[#8a9b82] dark:bg-white/10"
                                                                                                                        }`}
                                                                                                    >
                                                                                                              {rule.isValid ? (
                                                                                                                        <span className="text-[10px] font-bold">✓</span>
                                                                                                              ) : (
                                                                                                                        <X size={10} strokeWidth={3} />
                                                                                                              )}
                                                                                                    </span>

                                                                                                    {rule.label}
                                                                                          </li>
                                                                                ))}
                                                                      </ul>
                                                            </div>

                                                            {/* Register Button */}
                                                            <Button
                                                                      type="submit"
                                                                      className="group h-12 w-full cursor-pointer rounded-xl border border-[#526b24]/70 bg-gradient-to-br from-[#3b5426] to-[#6f8a22] text-[15px] font-bold text-white shadow-[0_10px_28px_-10px_rgba(90,120,30,0.7)] transition-all duration-300 hover:border-[#829f20] hover:brightness-110 hover:shadow-[0_14px_34px_-8px_rgba(90,120,30,0.85)] focus-visible:ring-[#829f20]/50 active:scale-[0.98]"
                                                            >
                                                                      Register

                                                                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                            </Button>

                                                            {/* Divider */}
                                                            <div className="relative flex items-center">
                                                                      <div className="flex-grow border-t border-[#829f20]/20 dark:border-white/10" />

                                                                      <span className="mx-4 text-xs font-medium text-[#7d8f75] dark:text-[#8aa093]">
                                                                                OR
                                                                      </span>

                                                                      <div className="flex-grow border-t border-[#829f20]/20 dark:border-white/10" />
                                                            </div>

                                                            {/* Google Register Button */}
                                                            <Button
                                                                      type="button"
                                                                      variant="outline"
                                                                      className="h-12 w-full cursor-pointer rounded-xl border border-[#829f20]/25 bg-white text-[15px] font-semibold text-[#1f3314] shadow-none transition-all duration-300 hover:border-[#829f20]/60 hover:bg-[#f6f9ec] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                                                            >
                                                                      {/* Google Icon */}
                                                                      <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 48 48"
                                                                                className="h-5 w-5"
                                                                                aria-hidden="true"
                                                                      >
                                                                                <path
                                                                                          fill="#4285F4"
                                                                                          d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11c-.5 2.5-2 4.6-4.2 6v5h6.8c4-3.7 6-9 6-14.7Z"
                                                                                />
                                                                                <path
                                                                                          fill="#34A853"
                                                                                          d="M24 44c5.4 0 9.9-1.8 13.2-4.8l-6.8-5c-1.8 1.2-4 2-6.4 2-4.9 0-9.1-3.3-10.6-7.8H6.4v5.1A20 20 0 0 0 24 44Z"
                                                                                />
                                                                                <path
                                                                                          fill="#FBBC05"
                                                                                          d="M13.4 28.4a12 12 0 0 1 0-8.8v-5.1H6.4a20 20 0 0 0 0 19l7-5.1Z"
                                                                                />
                                                                                <path
                                                                                          fill="#EA4335"
                                                                                          d="M24 11.8c2.9 0 5.5 1 7.5 3l5.8-5.8A19.5 19.5 0 0 0 24 4 20 20 0 0 0 6.4 14.5l7 5.1c1.5-4.5 5.7-7.8 10.6-7.8Z"
                                                                                />
                                                                      </svg>

                                                                      Continue with Google
                                                            </Button>
                                                  </form>

                                                  {/* Footer */}
                                                  <p className="mt-6 text-center text-sm text-[#4b5d44] dark:text-[#9fb2a6]">
                                                            Already have an account?{" "}

                                                            <Link
                                                                      href="/login"
                                                                      className="font-bold text-[#5f7a1a] underline-offset-4 transition-colors hover:text-[#829f20] hover:underline dark:text-[#a8cf35] dark:hover:text-[#c5e77b]"
                                                            >
                                                                      Login here
                                                            </Link>
                                                  </p>

                                        </div>
                              </div>
                    </main>
          );
};

export default RegisterPage;
