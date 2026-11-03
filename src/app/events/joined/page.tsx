import {
          ArrowRight,
          ArrowUpRight,
          CalendarDays,
          CheckCircle2,
          Handshake,
          MapPin,
          PlusCircle,
          Tag,
          Users,
} from "lucide-react";
import Link from "next/link";

type JoinedEvent = {
          id: string;
          title: string;
          category: string;
          date: string; // ISO string
          location: string;
          volunteers: number;
};

// TODO: real data diye replace koro. Empty array hole empty state dekhabe
const joinedEvents: JoinedEvent[] = [];

const EventsRoute = "/events"; // tomar events page er route ekhane bosao

const formatDate = (iso: string) =>
          new Date(iso).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
          });

const JoinedEventPage = () => {
          const sorted = [...joinedEvents].sort(
                    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );

          return (
                    <section className="relative mt-15 min-h-screen overflow-hidden px-4 py-12 text-foreground transition-colors duration-300 sm:px-8">
                              {/* Soft background glows */}
                              <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#829f20]/15 blur-[120px] dark:bg-[#829f20]/10" />
                              <div className="pointer-events-none absolute -bottom-40 -right-24 h-80 w-80 rounded-full bg-[#3b5426]/10 blur-3xl dark:bg-[#3b5426]/20" />

                              <div className="relative mx-auto max-w-6xl">
                                        {/* Header */}
                                        <header className="border-b border-[#829f20]/30 pb-8 dark:border-[#526b24]/30">
                                                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                                                            <div>
                                                                      <span className="inline-flex items-center gap-2 rounded-full border border-[#829f20]/40 bg-[#829f20]/10 px-3.5 py-1.5 text-xs font-bold text-[#4d6b17] shadow-sm dark:text-[#a8cf35]">
                                                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                                                                My Volunteer Commitments
                                                                      </span>

                                                                      <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                                                                                Joined{" "}
                                                                                <span className="bg-gradient-to-r from-[#3b5426] via-[#6d8d18] to-[#829f20] bg-clip-text text-transparent dark:from-[#a8cf35] dark:via-[#c5e77b] dark:to-[#829f20]">
                                                                                          Events
                                                                                </span>
                                                                      </h1>

                                                                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#4b5d44] dark:text-[#9fb2a6]">
                                                                                Here are all the social development and community service drives
                                                                                you have signed up for, sorted by event date.
                                                                      </p>
                                                            </div>

                                                            {/* Count chip */}
                                                            <div className="flex w-fit items-center gap-3 rounded-2xl border border-[#829f20]/40 bg-gradient-to-br from-[#f8fbef] to-[#e4efc9] px-5 py-3 shadow-sm dark:border-[#526b24]/40 dark:from-[#14221b] dark:to-[#1d2a14]">
                                                                      <Handshake className="h-6 w-6 text-[#5f7a1a] dark:text-[#a8cf35]" />
                                                                      <div>
                                                                                <p className="text-2xl font-extrabold leading-none text-[#1f3314] dark:text-white">
                                                                                          {sorted.length}
                                                                                </p>
                                                                                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#4b5d44] dark:text-[#9fb2a6]">
                                                                                          Events Joined
                                                                                </p>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </header>

                                        {sorted.length === 0 ? (
                                                  <EmptyState />
                                        ) : (
                                                  <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                                            {sorted.map((event) => (
                                                                      <li
                                                                                key={event.id}
                                                                                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#829f20]/25 bg-white/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-[#829f20]/60 hover:shadow-[0_18px_40px_-18px_rgba(82,107,36,0.45)] dark:border-white/10 dark:bg-[#15211b]/70 dark:hover:border-[#829f20]/50 dark:hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)]"
                                                                      >
                                                                                {/* Top accent line */}
                                                                                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#3b5426] via-[#829f20] to-[#c5e77b] transition-transform duration-500 group-hover:scale-x-100" />

                                                                                {/* Hover glow */}
                                                                                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#829f20]/0 blur-3xl transition-colors duration-500 group-hover:bg-[#829f20]/20" />

                                                                                <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full border border-[#829f20]/40 bg-[#f4f8e6] px-3 py-1 text-xs font-bold text-[#4d6b17] dark:bg-[#14221b] dark:text-[#c5e77b]">
                                                                                          <Tag className="h-3 w-3" />
                                                                                          {event.category}
                                                                                </span>

                                                                                <h3 className="relative mt-4 line-clamp-2 text-lg font-extrabold leading-snug text-[#1f3314] transition-colors duration-300 group-hover:text-[#5f7a1a] dark:text-white dark:group-hover:text-[#a8cf35]">
                                                                                          {event.title}
                                                                                </h3>

                                                                                <div className="relative mt-4 space-y-2.5 text-sm text-[#4b5d44] dark:text-[#9fb2a6]">
                                                                                          <p className="flex items-center gap-2.5">
                                                                                                    <CalendarDays className="h-4 w-4 shrink-0 text-[#5f7a1a] dark:text-[#a8cf35]" />
                                                                                                    {formatDate(event.date)}
                                                                                          </p>
                                                                                          <p className="flex items-center gap-2.5">
                                                                                                    <MapPin className="h-4 w-4 shrink-0 text-[#5f7a1a] dark:text-[#a8cf35]" />
                                                                                                    <span className="line-clamp-1">{event.location}</span>
                                                                                          </p>
                                                                                          <p className="flex items-center gap-2.5">
                                                                                                    <Users className="h-4 w-4 shrink-0 text-[#5f7a1a] dark:text-[#a8cf35]" />
                                                                                                    {event.volunteers} volunteers joined
                                                                                          </p>
                                                                                </div>

                                                                                <Link
                                                                                          href={`/events/${event.id}`}
                                                                                          className="relative mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#526b24]/70 bg-gradient-to-br from-[#3b5426] to-[#6f8a22] px-4 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(90,120,30,0.6)] transition-all duration-300 hover:border-[#829f20] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#829f20] active:scale-[0.98]"
                                                                                >
                                                                                          View Event
                                                                                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                                                </Link>
                                                                      </li>
                                                            ))}
                                                  </ul>
                                        )}
                              </div>
                    </section>
          );
};

const EmptyState = () => (
          <div className="relative mt-10 flex flex-col items-center overflow-hidden rounded-[28px] border border-dashed border-[#829f20]/50 bg-gradient-to-br from-[#f8fbef]/80 via-white/50 to-[#eef5d9]/80 px-6 py-20 text-center shadow-sm dark:border-[#526b24]/40 dark:from-[#14221b]/60 dark:via-transparent dark:to-[#1d2a14]/60">
                    <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[#829f20]/15 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-[#3b5426]/15 blur-3xl" />

                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#829f20]/40 bg-[#829f20]/10 shadow-sm transition-all duration-300 hover:rotate-6 hover:scale-110">
                              <Handshake className="h-8 w-8 text-[#5f7a1a] dark:text-[#a8cf35]" />
                    </div>

                    <h2 className="relative mt-6 text-xl font-extrabold text-[#1f3314] dark:text-white sm:text-2xl">
                              You Haven&apos;t Joined Any Events Yet
                    </h2>
                    <p className="relative mt-3 max-w-md text-sm leading-relaxed text-[#4b5d44] dark:text-[#9fb2a6]">
                              Discover active community cleanups, blanket distributions, and winter
                              relief drives in your area and join hands!
                    </p>

                    <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
                              <Link
                                        href={EventsRoute}
                                        className="group inline-flex items-center gap-2 rounded-xl border border-[#526b24]/70 bg-gradient-to-br from-[#3b5426] to-[#6f8a22] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_24px_-8px_rgba(90,120,30,0.55)] transition-all duration-300 hover:scale-105 hover:border-[#829f20] hover:shadow-[0_12px_32px_-6px_rgba(90,120,30,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#829f20] focus-visible:ring-offset-2 active:scale-95"
                              >
                                        Explore Upcoming Events
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Link>

                              <Link
                                        href="/create-event"
                                        className="group inline-flex items-center gap-2 rounded-xl border border-[#829f20]/50 bg-white/70 px-6 py-3 text-sm font-bold text-[#3b5426] shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:border-[#5f7a1a] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#829f20] active:scale-95 dark:border-[#526b24]/50 dark:bg-[#829f20]/10 dark:text-[#c5e77b] dark:hover:bg-[#829f20]/20"
                              >
                                        <PlusCircle className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                                        Create an Event
                              </Link>
                    </div>
          </div>
);

export default JoinedEventPage;