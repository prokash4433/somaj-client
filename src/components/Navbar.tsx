
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HandHeart,
  CalendarDays,
  CirclePlus,
  ClipboardList,
  CalendarCheck,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import ThemeToggle from "./shared/ThemeToggle";
import { authClient } from "@/lib/auth-client";

const menuItems = [
  { label: "Create Event", href: "/create-event", icon: CirclePlus },
  { label: "Manage Events", href: "/events/manage", icon: ClipboardList },
  { label: "Joined Events", href: "/events/joined", icon: CalendarCheck },
  { label: "My Profile", href: "/profile", icon: User },
];

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full border border-[#dce5d8] bg-white shadow-sm transition-colors duration-300 dark:border-[#26372b] dark:bg-[#14251e]">
      <div className="mx-auto flex min-h-[62px] w-full max-w-[1400px] items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-5 md:px-8 lg:px-10">

        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#536d13] bg-[#26391c] shadow-[0_0_15px_rgba(194,248,0,0.12)] transition-all duration-300 hover:border-[#829f20]">
            <HandHeart
              size={21}
              strokeWidth={1.8}
              className="text-white"
            />
          </div>

          <span className="truncate text-lg font-extrabold tracking-tight text-[#536d13] transition-colors duration-300 dark:text-[#829f20] sm:text-xl md:text-[23px]">
            Somaj
          </span>
        </Link>

        {/* Upcoming Events */}
        <Link
          href="/events"
          className="flex shrink min-w-0 items-center justify-center gap-1 rounded-full border border-[#dce5d8] bg-[#edf2e9] px-2 py-2 text-[10px] font-semibold text-[#536d13] transition-all duration-300 ease-in-out hover:scale-105 hover:border-[#829f20] active:scale-95 dark:border-[#304638] dark:bg-[#101e18] dark:text-[#829f20] sm:gap-2 sm:px-3.5 sm:text-xs md:text-[13px]"
        >
          <CalendarDays size={15} className="shrink-0" />
          <span className="truncate">Upcoming Events</span>
        </Link>

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">

          <ThemeToggle />

          {isPending ? (
            <div className="h-9 w-16 animate-pulse rounded-lg bg-[#edf2e9] dark:bg-[#1d3228]" />
          ) : user ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger>
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Open user menu"
                  aria-expanded={open}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpen((prev) => !prev);
                    }
                  }}
                  className="group flex cursor-pointer items-center gap-1.5 rounded-full outline-none transition-all duration-300 active:scale-95"
                >
                  <Avatar className="h-9 w-9 border-2 border-[#829f20] shadow-[0_0_12px_rgba(194,248,0,0.2)] transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(194,248,0,0.35)]">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image as string}
                      alt={user?.name || "User"}
                    />

                    <AvatarFallback className="bg-[#26391c] text-sm font-bold text-[#c2f800]">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#dce5d8] bg-[#edf2e9] text-[#536d13] dark:border-[#304638] dark:bg-[#101e18] dark:text-[#829f20]">
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-300 ${open ? "rotate-180" : ""
                        }`}
                    />
                  </span>
                </div>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                sideOffset={12}
                className="w-64 rounded-2xl border border-[#dce5d8] bg-white p-2 shadow-xl backdrop-blur-md dark:border-[#26372b] dark:bg-[#14251e] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
              >
                {/* User Info */}
                <div className="mb-2 rounded-xl border border-[#dce5d8] bg-[#edf2e9] px-3.5 py-3 dark:border-[#26372b] dark:bg-[#0e1a14]">
                  <p className="truncate text-sm font-bold text-[#1f2a1b] dark:text-white">
                    {user?.name}
                  </p>

                  <p className="truncate text-xs text-[#6b7a65] dark:text-[#9fb0a3]">
                    {user?.email}
                  </p>
                </div>

                {/* Menu Links */}
                <div className="flex flex-col gap-0.5">
                  {menuItems.map(({ label, href, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="group/item flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-semibold text-[#1f2a1b] transition-all duration-200 hover:bg-[#edf2e9] dark:text-[#e4ece6] dark:hover:bg-[#1d3228]"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#dce5d8] bg-white text-[#536d13] transition-all duration-200 group-hover/item:border-[#829f20] group-hover/item:text-[#829f20] dark:border-[#304638] dark:bg-[#101e18] dark:text-[#829f20]">
                        <Icon size={16} />
                      </span>

                      {label}
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-2 h-px bg-[#dce5d8] dark:bg-[#26372b]" />

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="group/logout flex w-full cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-bold text-red-600 transition-all duration-200 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-500/10"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition-all duration-200 group-hover/logout:border-red-400 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-500">
                    <LogOut size={16} />
                  </span>

                  Logout
                </button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link
              href="/login"
              className="shrink-0 rounded-lg border border-[#526b24] bg-[#293c20] px-2.5 py-2 text-xs font-bold text-white shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:border-[#829f20] hover:bg-[#3b5426] hover:shadow-[0_0_12px_rgba(194,248,0,0.15)] active:scale-95 sm:px-3.5"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
