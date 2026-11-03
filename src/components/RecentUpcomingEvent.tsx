"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
          Flame,
          ArrowRight,
          Tag,
          Calendar,
          MapPin,
          User,
          ImageOff,
          CalendarX2,
} from "lucide-react";

const API_URL = "http://localhost:5000/events";
const LIMIT = 6;

type EventItem = {
          id: string;
          title: string;
          location: string;
          date: string;
          category: string;
          image: string;
          description: string;
          organizer: string;
};

// eventTitle, eventType, eventDate, location, thumbnail (+ description, organizer)
function normalize(raw: any, index: number): EventItem {
          return {
                    id: String(raw._id ?? raw.id ?? index),
                    title: raw.eventTitle ?? raw.title ?? "Untitled event",
                    location: raw.location ?? "",
                    date: raw.eventDate ?? raw.date ?? "",
                    category: raw.eventType ?? raw.category ?? "",
                    image: raw.thumbnail ?? raw.image ?? "",
                    description: raw.description ?? raw.eventDescription ?? "",
                    organizer: raw.organizer ?? raw.organizerName ?? "",
          };
}

const formatDate = (d: string) => {
          if (!d) return "Date not set";
          const normalized = /^\d{4}-\d{2}-\d{2}$/.test(d) ? `${d}T00:00:00` : d;
          const parsed = new Date(normalized);
          if (Number.isNaN(parsed.getTime())) return "Date not set";
          return parsed.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
          });
};

const RecentUpcomingEvent = () => {
          const [events, setEvents] = useState<EventItem[]>([]);
          const [loading, setLoading] = useState(true);

          useEffect(() => {
                    const load = async () => {
                              try {
                                        const res = await fetch(API_URL, { cache: "no-store" });
                                        const data = await res.json();
                                        const list = Array.isArray(data) ? data : data.events ?? data.data ?? [];

                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);

                                        // Past event bad, soonest first, then only 6
                                        const upcoming = list
                                                  .map((raw: any, i: number) => normalize(raw, i))
                                                  .filter((e: EventItem) => !e.date || new Date(e.date) >= today)
                                                  .sort(
                                                            (a: EventItem, b: EventItem) =>
                                                                      new Date(a.date).getTime() - new Date(b.date).getTime()
                                                  )
                                                  .slice(0, LIMIT);

                                        setEvents(upcoming);
                              } catch (err) {
                                        console.error("Failed to load recent events:", err);
                              } finally {
                                        setLoading(false);
                              }
                    };
                    load();
          }, []);

          return (
                    <section className="w-full bg-background px-4 py-14 text-foreground transition-colors duration-300 sm:px-6 lg:px-8">
                              <div className="mx-auto max-w-6xl">
                                        {/* Header */}
                                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                                  <div>
                                                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#6d8d18] dark:text-[#a8cf35]">
                                                                      <Flame size={13} className="text-orange-500" />
                                                                      Upcoming Initiatives
                                                            </span>

                                                            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                                                                      Recent Upcoming Events
                                                            </h2>

                                                            <p className="mt-2 text-sm text-muted-foreground">
                                                                      Latest {LIMIT} community drives scheduled in your city. Get
                                                                      involved today.
                                                            </p>
                                                  </div>

                                                  <Link
                                                            href="/events"
                                                            className="group inline-flex items-center gap-2 text-sm font-bold text-[#6d8d18] transition-colors hover:text-[#526b24] dark:text-[#a8cf35] dark:hover:text-[#c5e77b]"
                                                  >
                                                            View All Events
                                                            <ArrowRight
                                                                      size={15}
                                                                      className="transition-transform duration-300 group-hover:translate-x-1"
                                                            />
                                                  </Link>
                                        </div>

                                        {/* Cards */}
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                                  {/* Loading skeleton */}
                                                  {loading &&
                                                            Array.from({ length: LIMIT }).map((_, i) => (
                                                                      <div
                                                                                key={i}
                                                                                className="h-[400px] animate-pulse rounded-2xl border border-border bg-card"
                                                                      />
                                                            ))}

                                                  {!loading &&
                                                            events.map((event) => (
                                                                      <article
                                                                                key={event.id}
                                                                                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#829f20]/50 hover:shadow-lg"
                                                                      >
                                                                                {/* Image */}
                                                                                <div className="relative h-[180px] w-full overflow-hidden bg-[#edf3e6] dark:bg-[#14221b]">
                                                                                          {event.image ? (
                                                                                                    // eslint-disable-next-line @next/next/no-img-element
                                                                                                    <img
                                                                                                              src={event.image}
                                                                                                              alt={event.title}
                                                                                                              loading="lazy"
                                                                                                              onError={(e) => {
                                                                                                                        e.currentTarget.style.display = "none";
                                                                                                              }}
                                                                                                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                                                                    />
                                                                                          ) : (
                                                                                                    <div className="absolute inset-0 flex items-center justify-center text-[#718b32]/60 dark:text-[#a8cf35]/40">
                                                                                                              <ImageOff size={34} strokeWidth={1.5} />
                                                                                                    </div>
                                                                                          )}

                                                                                          {/* Bottom fade */}
                                                                                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                                                                                          {/* Category badge */}
                                                                                          {event.category && (
                                                                                                    <span className="absolute left-3 top-3 z-10 inline-flex max-w-[85%] items-center gap-1.5 rounded-full border border-[#829f20]/50 bg-[#f4f8e6]/90 px-3 py-1 text-[11px] font-bold text-[#526b24] backdrop-blur dark:bg-[#14221b]/85 dark:text-[#c5e77b]">
                                                                                                              <Tag size={11} className="shrink-0" />
                                                                                                              <span className="truncate">{event.category}</span>
                                                                                                    </span>
                                                                                          )}

                                                                                          {/* Date badge */}
                                                                                          <span className="absolute bottom-3 left-3 z-10 inline-flex max-w-[90%] items-center gap-1.5 rounded-lg border border-white/10 bg-[#14221b]/85 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                                                                                                    <Calendar size={13} className="shrink-0 text-[#a8cf35]" />
                                                                                                    <span className="truncate">{formatDate(event.date)}</span>
                                                                                          </span>
                                                                                </div>

                                                                                {/* Body */}
                                                                                <div className="flex flex-1 flex-col p-5">
                                                                                          <h3 className="line-clamp-1 text-lg font-extrabold leading-6 text-foreground transition-colors group-hover:text-[#718b32] dark:group-hover:text-[#a8cf35]">
                                                                                                    {event.title}
                                                                                          </h3>

                                                                                          <p className="mt-2.5 flex items-center gap-2 text-xs text-muted-foreground">
                                                                                                    <MapPin
                                                                                                              size={14}
                                                                                                              className="shrink-0 text-[#718b32] dark:text-[#a8cf35]"
                                                                                                    />
                                                                                                    <span className="line-clamp-1">
                                                                                                              {event.location || "Location not specified"}
                                                                                                    </span>
                                                                                          </p>

                                                                                          <p className="mt-2.5 line-clamp-2 min-h-10 text-xs leading-5 text-muted-foreground">
                                                                                                    {event.description || "No description provided."}
                                                                                          </p>

                                                                                          <div className="mt-auto flex items-center gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
                                                                                                    <User
                                                                                                              size={14}
                                                                                                              className="shrink-0 text-[#718b32] dark:text-[#a8cf35]"
                                                                                                    />
                                                                                                    <span className="line-clamp-1">
                                                                                                              {event.organizer || "Event Organizer"}
                                                                                                    </span>
                                                                                          </div>

                                                                                          <Link
                                                                                                    href={`/events/${event.id}`}
                                                                                                    className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#526b24]/70 bg-[#3b5426] px-4 text-sm font-bold text-white transition-all duration-300 hover:border-[#829f20] hover:bg-[#526b24] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#829f20]"
                                                                                          >
                                                                                                    View Event
                                                                                                    <ArrowRight size={15} />
                                                                                          </Link>
                                                                                </div>
                                                                      </article>
                                                            ))}
                                        </div>

                                        {/* Empty state */}
                                        {!loading && events.length === 0 && (
                                                  <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#526b24]/40 bg-card/40 px-5 py-12 text-center">
                                                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#526b24]/30 bg-[#3b5426]/10 text-[#718b32] dark:text-[#a8cf35]">
                                                                      <CalendarX2 size={26} />
                                                            </div>
                                                            <h3 className="text-lg font-extrabold">No upcoming events yet</h3>
                                                            <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                                                                      New community drives will appear here as soon as they are
                                                                      scheduled.
                                                            </p>
                                                  </div>
                                        )}
                              </div>
                    </section>
          );
};

export default RecentUpcomingEvent;