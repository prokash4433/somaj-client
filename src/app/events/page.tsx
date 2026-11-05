"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
          CalendarDays,
          CalendarCheck2,
          MapPin,
          Search,
          Plus,
          ArrowUpRight,
          ImageOff,
} from "lucide-react";
import CreateEventCard from "@/components/shared/CreateEventCard";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const API_URL = "http://localhost:5000/events";

const CATEGORIES = ["All", "Cleanup", "Plantation", "Donation", "Health Camp", "Education"];

type EventItem = {
          id: string;
          title: string;
          location: string;
          date: string;
          category: string;
          image: string;
};

// Tomar JSON: eventTitle, eventType, eventDate, location, thumbnail
function normalize(raw: any, index: number): EventItem {
          return {
                    id: String(raw._id ?? raw.id ?? index),
                    title: raw.eventTitle ?? "Untitled event",
                    location: raw.location ?? "",
                    date: raw.eventDate ?? "",
                    category: raw.eventType ?? "",
                    image: raw.thumbnail ?? "",
          };
}

const formatDate = (d: string) =>
          d
                    ? new Date(d).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                    })
                    : "";

const UpcomingEventPage = () => {
          const [events, setEvents] = useState<EventItem[]>([]);
          const [loading, setLoading] = useState(true);
          const [active, setActive] = useState("All");
          const [query, setQuery] = useState("");

          useEffect(() => {
                    const load = async () => {
                              try {
                                 const token = await getTokenFromClient();
               const res = await fetch(API_URL, 
                  { cache: "no-store",
                     headers:{
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`
                     }
                   });
               const data = await res.json();
               const list = Array.isArray(data) ? data : data.events ?? data.data ?? [];

               const today = new Date();
               today.setHours(0, 0, 0, 0);

               // Past event bad, soonest first
               const upcoming = list
                                                  .map((raw: any, i: number) => normalize(raw, i))
                                                  .filter((e: EventItem) => !e.date || new Date(e.date) >= today)
                                                  .sort(
                                                            (a: EventItem, b: EventItem) =>
                                                                      new Date(a.date).getTime() - new Date(b.date).getTime()
                                                  );

                                        setEvents(upcoming);
                              } catch (err) {
                                        console.error("Failed to load events:", err);
                              } finally {
                                        setLoading(false);
                              }
                    };
                    load();
          }, []);

          const filtered = useMemo(() => {
                    const q = query.trim().toLowerCase();
                    return events.filter((e) => {
                              const matchCat = active === "All" || e.category.toLowerCase() === active.toLowerCase();
                              const matchQuery =
                                        !q || e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q);
                              return matchCat && matchQuery;
                    });
          }, [events, active, query]);

          return (
                    <section className="mt-15 min-h-screen bg-[#f3f7f1] text-[#12261a] transition-colors dark:bg-[#0d1511] dark:text-[#e8f0ea]">
                              <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
                                        {/* ───────── Header ───────── */}
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#829f20]/30 bg-[#829f20]/10 px-3.5 py-1.5 text-xs font-semibold text-[#6b8419] transition hover:border-[#829f20] dark:bg-[#101e18] dark:text-[#a3c22e]">
           <CalendarDays className="h-3.5 w-3.5" strokeWidth={2} />
          Future Community Drives
          </span>

                                                            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">
                                                                      Upcoming Events
                                                            </h1>

            <p className="mt-4 text-sm leading-relaxed text-[#4f6356] dark:text-[#9fb2a6] sm:text-[15px]">
            Discover verified volunteer initiatives scheduled for upcoming dates. Past
            events are automatically excluded so you can focus on active drives that need
            support.
                                                            </p>
                                                  </div>

          <Link
          href="/create-event"
          className="group inline-flex w-fit items-center gap-2.5 rounded-xl border border-lime-300/20 bg-gradient-to-br from-[#3f5a1f] to-[#6f8a22] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(90,120,30,0.55)] transition duration-300 ease-in-out hover:scale-105 hover:shadow-[0_12px_32px_-6px_rgba(90,120,30,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#829f20] dark:from-[#26331a] dark:to-[#5f7020] dark:shadow-[0_8px_30px_-8px_rgba(132,160,40,0.45)] dark:hover:shadow-[0_12px_36px_-6px_rgba(132,160,40,0.6)]"
          >
          <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" strokeWidth={2.25} />
          Create Event
       </Link>
                  </div>

               <div className="mt-9 h-px w-full bg-black/10 dark:bg-white/[0.07]" />

               {/* ───────── Filters + search ───────── */}
            <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                                  <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Event categories">
                                                            {CATEGORIES.map((c) => {
                                                                      const isActive = active === c;
                                                                      return (
                                                                                <button
                                                                                          key={c}
                                                                                          role="tab"
                                                                                          aria-selected={isActive}
                                                                                          onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#829f20] ${isActive
                                                                                                              ? "border-[#829f20] bg-[#829f20]/15 text-[#5f7516] shadow-[0_0_18px_-4px_rgba(130,159,32,0.45)] dark:bg-[#829f20]/20 dark:text-[#b4d03a] dark:shadow-[0_0_18px_-4px_rgba(130,159,32,0.55)]"
                                                                                                              : "border-[#829f20]/25 bg-white text-[#4f6356] hover:border-[#829f20]/60 hover:bg-[#829f20]/[0.07] hover:text-[#5f7516] dark:border-[#829f20]/25 dark:bg-[#829f20]/[0.06] dark:text-[#9fb2a6] dark:hover:border-[#829f20]/60 dark:hover:text-white"
                                                                                                    }`}
                                                                                >
                                                                                          {c}
                                                                                </button>
                                                                      );
                                                            })}
                                                  </div>

                                                  <label className="relative block w-full lg:w-72">
                                                            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#829f20]" />
                                                            <input
                                                                      value={query}
                                                                      onChange={(e) => setQuery(e.target.value)}
               placeholder="Search events or areas..."
               className="w-full rounded-xl border border-[#829f20]/30 bg-white py-3 pl-10 pr-4 text-sm text-[#12261a] transition placeholder:text-[#6b7f72] focus:border-[#829f20] focus:outline-none focus:ring-2 focus:ring-[#829f20]/25 dark:border-[#829f20]/25 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-[#7d9084] dark:focus:border-[#829f20] dark:focus:ring-[#829f20]/30"
                                                            />
                                                  </label>
                                        </div>

                                        {/* ───────── Cards ───────── */}
                                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                                  {loading &&
                                                            Array.from({ length: 3 }).map((_, i) => (
                                                                      <div
            key={i}
         className="h-[360px] animate-pulse rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#15211b]"
                                                                      />
                                                            ))}

                                                  {!loading &&
                                                            filtered.map((e) => (
                                                                      <article
                                                                                key={e.id}
className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#829f20]/40 hover:shadow-[0_18px_40px_-18px_rgba(60,80,20,0.35)] dark:border-white/10 dark:bg-[#15211b] dark:shadow-none dark:hover:border-[#829f20]/40 dark:hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)]"
                                                                      >
                                                                                {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#e3ece4] dark:bg-[#1b2a22]">
                                                                                          {e.image ? (
                                                                                                    // eslint-disable-next-line @next/next/no-img-element
                                                                                                    <img
                                                                                                              src={e.image}
                                                                                                              alt={e.title}
                                                                                                              loading="lazy"
                                                                                                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                                                                    />
                                                                                          ) : (
                                                                                                    <div className="flex h-full w-full items-center justify-center text-[#8aa093] dark:text-[#4d6356]">
                                                                                                              <ImageOff className="h-8 w-8" />
                                                                                                    </div>
                                                                                          )}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40 dark:from-[#15211b] dark:opacity-60" />

                                    {/* Event type badge */}
               {e.category && (
                                                                                                    <span className="absolute left-3.5 top-3.5 rounded-full border border-[#829f20]/50 bg-[#f4f8e6]/90 px-3 py-1 text-[11px] font-semibold text-[#5f7516] backdrop-blur-md dark:border-[#829f20]/50 dark:bg-[#0d1511]/75 dark:text-[#b4d03a]">
                                                                                                              {e.category}
                                                                                                    </span>
                                                                                          )}
                                                                                </div>

                                                                                {/* Body */}
            <div className="flex flex-1 flex-col p-5">
            <h3 className="line-clamp-2 text-lg font-bold leading-snug text-[#12261a] dark:text-white">
                                                                                                    {e.title}
                                                                                          </h3>

            <ul className="mt-3 space-y-2 text-sm text-[#4f6356] dark:text-[#9fb2a6]">
                                                                                                    {e.location && (
                                                                                                              <li className="flex items-center gap-2.5">
                                                                                                                        <MapPin className="h-4 w-4 shrink-0 text-[#829f20]" strokeWidth={2} />
                                                                                                                        <span className="truncate">{e.location}</span>
                                                                                                              </li>
                                                                                                    )}
                                                                                                    {e.date && (
                                                                                                              <li className="flex items-center gap-2.5">
                                                                                                                        <CalendarCheck2 className="h-4 w-4 shrink-0 text-[#829f20]" strokeWidth={2} />
                                                                                                                        <span>{formatDate(e.date)}</span>
                                                                                                              </li>
                                                                                                    )}
                                                                                          </ul>

                                                                                          <Link
                                                                                                    href={`/events/${e.id}`}
                                                                                                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-lime-300/15 bg-gradient-to-br from-[#3f5a1f] to-[#6f8a22] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#829f20] dark:from-[#26331a] dark:to-[#5f7020]"
                                                                                          >
                                                                                                    View Event
                                                                                                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                                                          </Link>
                                                                                </div>
                                                                      </article>
                                                            ))}
                                        </div>

                                        {/* ───────── Kichu na paile Create Event card ───────── */}
                                        {!loading && filtered.length === 0 && (
                                                  <div className="mx-auto mt-4 max-w-sm">
                                                            <p className="mb-5 text-center text-sm text-[#6b7f72] dark:text-[#7d9084]">
                                                                      No events match your filters.
                                                            </p>
                                                            <CreateEventCard />
                                                  </div>
                                        )}
                              </div>
                    </section>
          );
};

export default UpcomingEventPage;