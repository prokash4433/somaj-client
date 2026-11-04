"use client";

import { useEffect, useState } from "react";
import {
          BadgeCheck,
          ImageIcon,
          Loader2,
          Mail,
          Pencil,
          Save,
          User,
          X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

const inputClass =
          "h-11 w-full rounded-xl border border-emerald-900/15 bg-white px-3.5 text-sm font-medium text-[#10261b] outline-none transition-all placeholder:text-emerald-900/40 focus:border-[#829f20] focus:ring-2 focus:ring-[#829f20]/30 dark:border-white/10 dark:bg-[#0e1713] dark:text-white dark:placeholder:text-emerald-100/30";

const ProfilePage = () => {
          const { data: session, isPending } = authClient.useSession();
          const user = session?.user;

          const [show, setShow] = useState(false);
          const [name, setName] = useState("");
          const [image, setImage] = useState("");
          const [saving, setSaving] = useState(false);

          // Session ashle form-e current value boshiye dibe
          useEffect(() => {
                    if (user) {
                              setName(user.name ?? "");
                              setImage(user.image ?? "");
                    }
          }, [user]);

          const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
                    e.preventDefault();

                    const formData = new FormData(e.currentTarget);
                    const newUserData = Object.fromEntries(formData.entries()) as {
                              name: string;
                              image: string;
                    };
                    await authClient.updateUser({
                              ...newUserData,
                    });

                    // Apnar update logic ekhane boshan
                    // setSaving(true) ... setSaving(false)
          };

          if (isPending) {
                    return (
                              <div className="mx-auto mt-[3.75rem] w-full max-w-md px-4 py-10 sm:px-6">
                                        <div className="h-80 animate-pulse rounded-[28px] bg-[#edf2e9] dark:bg-[#1d3228]" />
                              </div>
                    );
          }

          return (
                    <div className="mx-auto mt-[3.75rem] w-full max-w-md space-y-6 px-4 py-10 sm:px-6">
                              {/* ---------- Profile Card ---------- */}
                              <article className="overflow-hidden rounded-[28px] border border-emerald-900/10 bg-white shadow-[0_20px_50px_-24px_rgba(16,60,40,0.35)] dark:border-white/10 dark:bg-[#16221d] dark:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
                                        {/* Cover */}
                                        <div className="relative h-28 bg-gradient-to-br from-[#536d13] via-[#829f20] to-[#26391c]">
                                                  <div
                                                            aria-hidden
                                                            className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/15 blur-2xl"
                                                  />
                                        </div>

                                        {/* Avatar */}
                                        <div className="-mt-14 flex justify-center">
                                                  <Avatar className="h-28 w-28 border-4 border-white shadow-[0_8px_24px_-8px_rgba(130,159,32,0.7)] dark:border-[#16221d]">
                                                            <AvatarImage
                                                                      referrerPolicy="no-referrer"
                                                                      src={user?.image as string}
                                                                      alt={user?.name || "User"}
                                                            />
                                                            <AvatarFallback className="bg-[#26391c] text-3xl font-bold text-[#c2f800]">
                                                                      {user?.name?.charAt(0).toUpperCase() || "U"}
                                                            </AvatarFallback>
                                                  </Avatar>
                                        </div>

                                        {/* Info */}
                                        <div className="px-6 pb-7 pt-4 text-center">
                                                  <h1 className="text-2xl font-extrabold tracking-tight text-[#10261b] dark:text-white">
                                                            {user?.name || "Somaj Member"}
                                                  </h1>

                                                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#829f20]/30 bg-[#829f20]/15 px-3 py-1 text-xs font-semibold text-[#536d13] dark:text-[#829f20]">
                                                            <BadgeCheck size={14} strokeWidth={2} />
                                                            Verified Platform Member
                                                  </span>

                                                  <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-900/10 bg-emerald-50/70 p-3.5 text-left dark:border-white/10 dark:bg-[#0e1713]">
                                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#829f20]/30 bg-[#829f20]/15 text-[#829f20]">
                                                                      <Mail size={18} strokeWidth={1.75} />
                                                            </span>
                                                            <div className="min-w-0">
                                                                      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-900/60 dark:text-emerald-100/55">
                                                                                Email
                                                                      </p>
                                                                      <p className="truncate text-sm font-semibold text-[#10261b] dark:text-white">
                                                                                {user?.email}
                                                                      </p>
                                                            </div>
                                                  </div>
                                        </div>
                              </article>

                              {/* ---------- Edit Profile Toggle Button ---------- */}
                              <button
                                        type="button"
                                        onClick={() => setShow((prev) => !prev)}
                                        aria-expanded={show}
                                        className={`inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border px-6 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/50 ${show
                                                            ? "border-[#829f20] bg-[#829f20] text-white shadow-[0_8px_24px_-10px_rgba(130,159,32,0.7)] hover:brightness-95"
                                                            : "border-lime-800/20 bg-gradient-to-br from-lime-100 to-lime-200 text-lime-900 hover:brightness-95 dark:border-lime-200/15 dark:from-[#2b3a1a] dark:to-[#1d2a14] dark:text-lime-100/90 dark:shadow-inner dark:shadow-white/5 dark:hover:brightness-110"
                                                  }`}
                              >
                                        {show ? (
                                                  <X size={17} strokeWidth={2} />
                                        ) : (
                                                  <Pencil size={17} strokeWidth={1.75} />
                                        )}
                                        {show ? "Close" : "Edit Profile"}
                              </button>

                              {/* ---------- Edit Profile Form (show true hole dekhabe) ---------- */}
                              {show && (
                                        <section className="animate-in fade-in slide-in-from-top-2 rounded-[28px] border border-emerald-900/10 bg-white p-5 shadow-[0_20px_50px_-24px_rgba(16,60,40,0.35)] duration-300 dark:border-white/10 dark:bg-[#16221d] dark:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] sm:p-6">
                                                  <h2 className="text-xl font-bold tracking-tight text-[#10261b] dark:text-white">
                                                            Edit Profile
                                                  </h2>
                                                  <p className="mt-1 text-sm text-emerald-900/60 dark:text-emerald-100/55">
                                                            Update your name and profile photo.
                                                  </p>

                                                  <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                                                            {/* Name */}
                                                            <div>
                                                                      <label
                                                                                htmlFor="name"
                                                                                className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900/60 dark:text-emerald-100/55"
                                                                      >
                                                                                <User size={14} strokeWidth={2} className="text-[#829f20]" />
                                                                                Full Name
                                                                      </label>
                                                                      <input
                                                                                id="name"
                                                                                name="name"
                                                                                type="text"
                                                                                value={name}
                                                                                onChange={(e) => setName(e.target.value)}
                                                                                placeholder="Your name"
                                                                                className={inputClass}
                                                                      />
                                                            </div>

                                                            {/* Image */}
                                                            <div>
                                                                      <label
                                                                                htmlFor="image"
                                                                                className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900/60 dark:text-emerald-100/55"
                                                                      >
                                                                                <ImageIcon
                                                                                          size={14}
                                                                                          strokeWidth={2}
                                                                                          className="text-[#829f20]"
                                                                                />
                                                                                Profile Image URL
                                                                      </label>
                                                                      <input
                                                                                id="image"
                                                                                name="image"
                                                                                type="url"
                                                                                value={image}
                                                                                onChange={(e) => setImage(e.target.value)}
                                                                                placeholder="https://example.com/photo.jpg"
                                                                                className={inputClass}
                                                                      />
                                                            </div>

                                                            {/* Submit */}
                                                            <button
                                                                      type="submit"
                                                                      disabled={saving}
                                                                      className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-lime-800/20 bg-gradient-to-br from-lime-100 to-lime-200 px-6 text-sm font-semibold text-lime-900 transition-all hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/50 disabled:cursor-not-allowed disabled:opacity-70 dark:border-lime-200/15 dark:from-[#2b3a1a] dark:to-[#1d2a14] dark:text-lime-100/90 dark:shadow-inner dark:shadow-white/5 dark:hover:brightness-110"
                                                            >
                                                                      {saving ? (
                                                                                <Loader2 size={17} className="animate-spin" />
                                                                      ) : (
                                                                                <Save size={17} strokeWidth={1.75} />
                                                                      )}
                                                                      {saving ? "Saving..." : "Save Changes"}
                                                            </button>
                                                  </form>
                                        </section>
                              )}
                    </div>
          );
};

export default ProfilePage;