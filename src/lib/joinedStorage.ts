"use client";

import { useEffect, useState } from "react";

export type JoinedEvent = {
          id: string;
          title: string;
          category: string;
          date: string;
          location: string;
          image: string | null;
          volunteers: number;
          joinedAt: string;
};

const EVENTS_KEY = "somaj:joined-events";
const volunteersKey = (id: string) => `somaj:volunteers:${id}`;
const CHANGE_EVENT = "somaj:joined-change";

const read = <T,>(key: string, fallback: T): T => {
          try {
                    const raw = localStorage.getItem(key);
                    return raw ? (JSON.parse(raw) as T) : fallback;
          } catch {
                    return fallback;
          }
};

const write = (key: string, value: unknown) => {
          try {
                    localStorage.setItem(key, JSON.stringify(value));
          } catch {
                    /* storage full / blocked */
          }
          window.dispatchEvent(new Event(CHANGE_EVENT));
};

/**
 * Logged in user er email. Tomar auth system e email jekhane save thake
 * (localStorage key) oita ekhane add koro. Na paile guest label dekhabe.
 */
export const getCurrentEmail = (): string => {
          try {
                    for (const key of ["userEmail", "email"]) {
                              const v = localStorage.getItem(key);
                              if (v && v.includes("@")) return v.replace(/"/g, "");
                    }
                    const user = localStorage.getItem("user");
                    if (user) {
                              const parsed = JSON.parse(user);
                              if (parsed?.email) return String(parsed.email);
                    }
          } catch {
                    /* ignore */
          }
          return "volunteer@this-device";
};

export const joinEvent = (event: Omit<JoinedEvent, "joinedAt">) => {
          const list = read<JoinedEvent[]>(EVENTS_KEY, []);
          if (!list.some((e) => e.id === event.id)) {
                    write(EVENTS_KEY, [
                              ...list,
                              { ...event, joinedAt: new Date().toISOString() },
                    ]);
          }

          const emails = read<string[]>(volunteersKey(event.id), []);
          const me = getCurrentEmail();
          if (!emails.includes(me)) write(volunteersKey(event.id), [...emails, me]);
};

export const leaveEvent = (id: string) => {
          write(
                    EVENTS_KEY,
                    read<JoinedEvent[]>(EVENTS_KEY, []).filter((e) => e.id !== id)
          );
          const me = getCurrentEmail();
          write(
                    volunteersKey(id),
                    read<string[]>(volunteersKey(id), []).filter((e) => e !== me)
          );
};

const subscribe = (cb: () => void) => {
          window.addEventListener(CHANGE_EVENT, cb);
          window.addEventListener("storage", cb);
          return () => {
                    window.removeEventListener(CHANGE_EVENT, cb);
                    window.removeEventListener("storage", cb);
          };
};

/** Joined events page er jonno */
export const useJoinedEvents = () => {
          const [events, setEvents] = useState<JoinedEvent[]>([]);
          const [ready, setReady] = useState(false);

          useEffect(() => {
                    const sync = () => {
                              setEvents(read<JoinedEvent[]>(EVENTS_KEY, []));
                              setReady(true);
                    };
                    sync();
                    return subscribe(sync);
          }, []);

          return { events, ready };
};

/** Event details page er jonno: joined status, dynamic count, email list */
export const useEventVolunteers = (
          eventId: string,
          baseCount: number,
          baseEmails: string[],
          apiJoined: boolean
) => {
          const [local, setLocal] = useState<string[]>([]);
          const [joinedLocal, setJoinedLocal] = useState(false);
          const [myEmail, setMyEmail] = useState("");

          useEffect(() => {
                    const sync = () => {
                              setLocal(read<string[]>(volunteersKey(eventId), []));
                              setJoinedLocal(
                                        read<JoinedEvent[]>(EVENTS_KEY, []).some((e) => e.id === eventId)
                              );
                              setMyEmail(getCurrentEmail());
                    };
                    sync();
                    return subscribe(sync);
          }, [eventId]);

          const extra = local.filter((e) => !baseEmails.includes(e));
          const emails = [...baseEmails, ...extra];
          const count = Math.max(baseCount, baseEmails.length) + extra.length;

          return { joined: apiJoined || joinedLocal, count, emails, myEmail };
};