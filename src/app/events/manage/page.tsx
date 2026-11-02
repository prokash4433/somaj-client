
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
          Settings,
          PlusCircle,
          ArrowRight,
          Sparkles,
          Calendar,
          MapPin,
          Tag,
          User,
          Pencil,
          Trash2,
          Eye,
          CalendarDays,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type EventItem = {
          id: string;
          title: string;
          category: string;
          date: string;
          location: string;
          description: string;
          organizer: string;
          image: string;
};

const STORAGE_KEY = "events";
const EVENTS_UPDATED_EVENT = "events-updated";

const readEvents = (): EventItem[] => {
          try {
                    const stored = localStorage.getItem(STORAGE_KEY);

                    if (!stored) return [];

                    const parsed: unknown = JSON.parse(stored);

                    if (!Array.isArray(parsed)) return [];

                    return parsed.filter(
                              (event): event is EventItem =>
                                        event !== null &&
                                        typeof event === "object" &&
                                        typeof event.id === "string" &&
                                        typeof event.title === "string"
                    );
          } catch {
                    return [];
          }
};

const formatDate = (date: string) => {
          if (!date) return "Date not set";

          const normalizedDate = /^\d{4}-\d{2}-\d{2}$/.test(date)
                    ? `${date}T00:00:00`
                    : date;

          const parsedDate = new Date(normalizedDate);

          if (Number.isNaN(parsedDate.getTime())) {
                    return "Date not set";
          }

          return parsedDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
          });
};

const ManageEventPage = () => {
          const [events, setEvents] = useState<EventItem[]>([]);
          const [loaded, setLoaded] = useState(false);

          const syncEvents = useCallback(() => {
                    setEvents(readEvents());
                    setLoaded(true);
          }, []);

          useEffect(() => {
                    // Load saved events when the page opens.
                    syncEvents();

                    // Update immediately when another component saves an event.
                    window.addEventListener(EVENTS_UPDATED_EVENT, syncEvents);

                    // Update when localStorage changes in another tab.
                    const handleStorage = (event: StorageEvent) => {
                              if (event.key === STORAGE_KEY || event.key === null) {
                                        syncEvents();
                              }
                    };

                    window.addEventListener("storage", handleStorage);

                    return () => {
                              window.removeEventListener(EVENTS_UPDATED_EVENT, syncEvents);
                              window.removeEventListener("storage", handleStorage);
                    };
          }, [syncEvents]);

          const handleDelete = (id: string) => {
                    const shouldDelete = window.confirm(
                              "Are you sure you want to delete this event?"
                    );

                    if (!shouldDelete) return;

                    const updatedEvents = readEvents().filter(
                              (event) => event.id !== id
                    );

                    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEvents));

                    // Notify components in the current tab immediately.
                    window.dispatchEvent(new Event(EVENTS_UPDATED_EVENT));

                    setEvents(updatedEvents);
          };

          return (
                    <main className="mt-15 min-h-screen w-full bg-background px-4 py-10 text-foreground transition-colors duration-300 sm:px-6 lg:px-8">
                              <div className="mx-auto max-w-7xl">
                                        {/* Header */}
                                        <section className="mb-10 border-b border-[#526b24]/30 pb-7">
                                                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                                                            <div className="space-y-4">
                                                                      <div className="inline-flex items-center gap-2 rounded-full border border-[#526b24]/40 bg-[#3b5426]/10 px-3 py-1.5 text-xs font-bold text-[#6d8d18] shadow-sm dark:text-[#a8cf35]">
                                                                                <Settings size={14} />
                                                                                Organizer Dashboard
                                                                      </div>

                                                                      <div className="space-y-2">
                                                                                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[42px]">
                                                                                          Manage My Events
                                                                                </h1>

                                                                                <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                                                                                          View, edit, and manage the social drives you have
                                                                                          published. Keep all your initiatives organized in one place.
                                                                                </p>
                                                                      </div>
                                                            </div>

                                                            <Link href="/create-event" className="shrink-0">
                                                                      <Button className="h-12 w-full cursor-pointer rounded-xl border border-[#526b24]/70 bg-[#3b5426] px-6 font-bold text-white shadow-[0_5px_20px_rgba(59,84,38,0.15)] transition-all duration-300 hover:scale-105 hover:border-[#829f20] hover:bg-[#526b24] active:scale-95 sm:w-auto">
                                                                                <PlusCircle size={18} className="mr-2" />
                                                                                Create New Event
                                                                      </Button>
                                                            </Link>
                                                  </div>
                                        </section>

                                        {/* Loading State */}
                                        {!loaded && (
                                                  <section
                                                            className="flex min-h-[300px] items-center justify-center"
                                                            aria-live="polite"
                                                  >
                                                            <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                                                                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#829f20]/30 border-t-[#829f20]" />
                                                                      Loading your events...
                                                            </div>
                                                  </section>
                                        )}

                                        {/* Event Cards */}
                                        {loaded && events.length > 0 && (
                                                  <section
                                                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                                            aria-label="My events"
                                                  >
                                                            {events.map((event) => (
                                                                      <article
                                                                                key={event.id}
                                                                                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#829f20]/50 hover:shadow-lg"
                                                                      >
                                                                                {/* Image */}
                                                                                <div className="relative h-52 w-full overflow-hidden bg-[#edf3e6] dark:bg-[#14221b]">
                                                                                          {event.image ? (
                                                                                                    // eslint-disable-next-line @next/next/no-img-element
                                                                                                    <img
                                                                                                              src={event.image}
                                                                                                              alt={event.title || "Event"}
                                                                                                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                                                                    />
                                                                                          ) : (
                                                                                                    <div className="flex h-full items-center justify-center text-[#718b32] dark:text-[#a8cf35]">
                                                                                                              <CalendarDays size={48} strokeWidth={1.4} />
                                                                                                    </div>
                                                                                          )}

                                                                                          <span className="absolute left-3 top-3 inline-flex max-w-[85%] items-center gap-1.5 truncate rounded-full border border-white/15 bg-[#14221b]/85 px-3 py-1.5 text-xs font-bold text-[#c5e77b] shadow-sm backdrop-blur">
                                                                                                    <Tag size={12} className="shrink-0 text-[#a8cf35]" />
                                                                                                    <span className="truncate">
                                                                                                              {event.category || "Community"}
                                                                                                    </span>
                                                                                          </span>

                                                                                          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#14221b]/85 px-3 py-1.5 text-xs font-bold text-white shadow-sm backdrop-blur">
                                                                                                    <Calendar
                                                                                                              size={13}
                                                                                                              className="shrink-0 text-[#a8cf35]"
                                                                                                    />
                                                                                                    {formatDate(event.date)}
                                                                                          </span>
                                                                                </div>

                                                                                {/* Event Content */}
                                                                                <div className="flex h-[260px] flex-col p-5">
                                                                                          <h3 className="line-clamp-2 min-h-12 text-lg font-extrabold leading-6 text-foreground transition-colors group-hover:text-[#718b32] dark:group-hover:text-[#a8cf35]">
                                                                                                    {event.title}
                                                                                          </h3>

                                                                                          <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                                                                                                    <MapPin
                                                                                                              size={14}
                                                                                                              className="shrink-0 text-[#718b32] dark:text-[#a8cf35]"
                                                                                                    />
                                                                                                    <span className="line-clamp-1">
                                                                                                              {event.location || "Location not specified"}
                                                                                                    </span>
                                                                                          </p>

                                                                                          <p className="mt-3 line-clamp-2 text-xs leading-5 text-muted-foreground">
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

                                                                                          {/* Action Buttons */}
                                                                                          <div className="flex items-center gap-2 pt-3">
                                                                                                    <Link href={`/events/${event.id}`} className="min-w-0 flex-1">
                                                                                                              <Button
                                                                                                                        variant="secondary"
                                                                                                                        className="h-9 w-full cursor-pointer rounded-lg border border-[#dce5d9] bg-[#f0f5e9] px-2 text-xs font-bold text-[#354d24] shadow-sm transition-all duration-300 hover:border-[#829f20] hover:bg-[#e3eed5] hover:text-[#283d18] active:scale-[0.98] dark:border-[#34443a] dark:bg-[#14221b] dark:text-[#a8cf35] dark:hover:border-[#829f20] dark:hover:bg-[#283d18] dark:hover:text-white"
                                                                                                              >
                                                                                                                        <Eye size={13} className="mr-1.5 shrink-0" />
                                                                                                                        View
                                                                                                              </Button>
                                                                                                    </Link>

                                                                                                    <Link
                                                                                                              href={`/events/edit/${event.id}`}
                                                                                                              aria-label={`Edit ${event.title}`}
                                                                                                    >
                                                                                                              <Button
                                                                                                                        variant="outline"
                                                                                                                        className="h-9 cursor-pointer rounded-lg border border-[#dce5d9] bg-[#f0f5e9] px-3 text-xs font-bold text-[#354d24] shadow-sm transition-all duration-300 hover:border-[#829f20] hover:bg-[#e3eed5] hover:text-[#283d18] active:scale-[0.98] dark:border-[#34443a] dark:bg-[#14221b] dark:text-[#a8cf35] dark:hover:border-[#829f20] dark:hover:bg-[#283d18] dark:hover:text-white"
                                                                                                              >
                                                                                                                        <Pencil size={13} className="mr-1.5" />
                                                                                                                        Edit
                                                                                                              </Button>
                                                                                                    </Link>

                                                                                                    <Button
                                                                                                              type="button"
                                                                                                              variant="outline"
                                                                                                              aria-label={`Delete ${event.title}`}
                                                                                                              onClick={() => handleDelete(event.id)}
                                                                                                              className="h-9 cursor-pointer rounded-lg border border-red-500/30 bg-red-500/10 px-3 text-xs font-bold text-red-600 transition-all hover:border-red-500/50 hover:bg-red-500/15 hover:text-red-700 active:scale-[0.98] dark:text-red-400 dark:hover:text-red-300"
                                                                                                    >
                                                                                                              <Trash2 size={13} className="mr-1.5" />
                                                                                                              Delete
                                                                                                    </Button>
                                                                                          </div>
                                                                                </div>
                                                                      </article>
                                                            ))}
                                                  </section>
                                        )}

                                        {/* Empty State */}
                                        {loaded && events.length === 0 && (
                                                  <section className="relative flex min-h-[380px] flex-col items-center justify-center overflow-hidden rounded-[28px] border border-dashed border-[#526b24]/40 bg-card/40 px-5 py-14 text-center shadow-sm sm:min-h-[400px] sm:px-10">
                                                            <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#829f20]/[0.06] blur-3xl" />
                                                            <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#3b5426]/[0.08] blur-3xl" />

                                                            <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#526b24]/30 bg-[#3b5426]/10 text-[#718b32] shadow-sm transition-all duration-300 hover:rotate-6 hover:scale-110 dark:text-[#a8cf35]">
                                                                      <Settings size={30} strokeWidth={2.2} />
                                                                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-[#829f20] text-white">
                                                                                <Sparkles size={12} />
                                                                      </span>
                                                            </div>

                                                            <h2 className="relative text-xl font-extrabold tracking-tight sm:text-2xl">
                                                                      You Haven&apos;t Created Any Events Yet
                                                            </h2>

                                                            <p className="relative mt-3 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                                                                      Take the initiative! Create a winter clothes drive, blanket
                                                                      distribution, or cleanup campaign in your neighborhood.
                                                            </p>

                                                            <Link href="/create-event" className="group relative mt-7">
                                                                      <Button className="h-12 cursor-pointer rounded-xl border border-[#526b24]/70 bg-[#3b5426] px-7 font-bold text-white shadow-[0_5px_20px_rgba(59,84,38,0.15)] transition-all duration-300 hover:scale-105 hover:border-[#829f20] hover:bg-[#526b24] active:scale-95">
                                                                                <PlusCircle size={18} className="mr-2" />
                                                                                Create an Event
                                                                                <ArrowRight
                                                                                          size={16}
                                                                                          className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                                                                                />
                                                                      </Button>
                                                            </Link>

                                                            <p className="relative mt-6 text-xs font-medium tracking-wide text-muted-foreground/70">
                                                                      START SOMETHING MEANINGFUL TODAY
                                                            </p>
                                                  </section>
                                        )}
                              </div>
                    </main>
          );
};

export default ManageEventPage;
