"use client";

import { useState } from "react";
import {
          AlertDialog,
          AlertDialogAction,
          AlertDialogCancel,
          AlertDialogContent,
          AlertDialogDescription,
          AlertDialogFooter,
          AlertDialogTitle,
          AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
          Trash2,
          TriangleAlert,
          CalendarX2,
          Users,
          ShieldCheck,
          Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type DeleteEventDialogProps = {
          eventId: string;
          eventTitle?: string;
          onDeleted?: (id: string) => void;
};

// MongoDB ObjectId = 24 character hex string
const isMongoId = (id: string) => /^[a-f\d]{24}$/i.test(id);

const DeleteEventDialog = ({
          eventId,
          eventTitle,
          onDeleted,
}: DeleteEventDialogProps) => {
          const [isDeleting, setIsDeleting] = useState(false);

          const handleDeleteEvent = async () => {
                    
                    const token = await getTokenFromClient()
                    
                    const id = eventId?.trim();

                    if (!id) {
                              toast.error("Unable to delete event", {
                                        description: "Event ID is missing.",
                              });
                              console.error("Missing event ID:", eventId);
                              return;
                    }

                    try {
                              setIsDeleting(true);

                              // Old/local-only events: no database record, so remove locally only.
                              if (!isMongoId(id)) {
                                        toast.success("Event deleted successfully!", {
                                                  description: "The event has been removed.",
                                        });
                                        onDeleted?.(id);
                                        return;
                              }

          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${encodeURIComponent(id)}`,
          { method: "DELETE",
                    headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                    },        
           }
          );

          const data = await res.json().catch(() => null);

                              // Already deleted on the server: still remove it from the page.
                              const alreadyGone = res.status === 404 || data?.deletedCount === 0;

                              if (!res.ok && !alreadyGone) {
                                        throw new Error(data?.message || `Delete failed. HTTP ${res.status}`);
                              }

                              toast.success("Event deleted successfully!", {
                                        description: alreadyGone
                                                  ? "The event was already removed from the server."
                                                  : "The event has been removed.",
                              });

                              onDeleted?.(id);
                    } catch (error) {
                              console.error("Delete event error:", error);

                              toast.error("Failed to delete event", {
                                        description:
                                                  error instanceof Error
                                                            ? error.message
                                                            : "Something went wrong. Please try again.",
                              });
                    } finally {
                              setIsDeleting(false);
                    }
          };

          return (
                    <AlertDialog>
                              <AlertDialogTrigger
                                        render={
                                                  <Button
                                                            type="button"
                                                            variant="outline"
                                                            aria-label="Delete event"
                                                            className="h-9 cursor-pointer rounded-lg border border-red-500/30 bg-red-500/10 px-3 text-xs font-bold text-red-600 transition-all hover:border-red-500/50 hover:bg-red-500/15 hover:text-red-700 active:scale-[0.98] dark:text-red-400 dark:hover:text-red-300"
                                                  >
                                                            <Trash2 size={13} className="mr-1.5" />
                                                            Delete
                                                  </Button>
                                        }
                              />

                              <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md gap-0 overflow-hidden rounded-3xl border border-[#526b24]/30 bg-card p-0 shadow-2xl">
                                        {/* Top accent bar */}
                                        <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-red-400 to-[#829f20]" />

                                        <div className="relative px-6 pb-2 pt-7 text-center sm:px-8">
                                                  {/* Soft background glow */}
                                                  <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl" />

                                                  {/* Icon */}
                                                  <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-600 shadow-sm dark:text-red-400">
                                                            <CalendarX2 size={30} strokeWidth={2} />
                                                            <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-card bg-red-600 text-white">
                                                                      <TriangleAlert size={12} />
                                                            </span>
                                                  </div>

                                                  <AlertDialogTitle className="relative text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                                                            Delete this event?
                                                  </AlertDialogTitle>

                                                  <AlertDialogDescription className="relative mt-2 text-sm leading-6 text-muted-foreground">
                                                            You are about to permanently remove this social drive from your
                                                            organizer dashboard.
                                                  </AlertDialogDescription>

                                                  {/* Event name chip */}
                                                  {eventTitle?.trim() && (
                                                            <div className="relative mt-4 rounded-xl border border-[#526b24]/30 bg-[#3b5426]/10 px-4 py-3">
                                                                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#6d8d18] dark:text-[#a8cf35]">
                                                                                Event to be deleted
                                                                      </p>
                                                                      <p className="mt-1 line-clamp-2 text-sm font-extrabold text-foreground">
                                                                                {eventTitle}
                                                                      </p>
                                                            </div>
                                                  )}

                                                  {/* What happens */}
                                                  <ul className="relative mt-4 space-y-2.5 text-left">
                                                            <li className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3.5 py-3">
                                                                      <CalendarX2
                                                                                size={16}
                                                                                className="mt-0.5 shrink-0 text-red-500"
                                                                      />
                                                                      <span className="text-xs leading-5 text-muted-foreground">
                                                                                The event page and all its details will be removed.
                                                                      </span>
                                                            </li>

                                                            <li className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3.5 py-3">
                                                                      <Users size={16} className="mt-0.5 shrink-0 text-red-500" />
                                                                      <span className="text-xs leading-5 text-muted-foreground">
                                                                                Volunteers and community members will no longer be able to
                                                                                find or join it.
                                                                      </span>
                                                            </li>

                                                            <li className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3.5 py-3">
                                                                      <ShieldCheck
                                                                                size={16}
                                                                                className="mt-0.5 shrink-0 text-[#718b32] dark:text-[#a8cf35]"
                                                                      />
                                                                      <span className="text-xs leading-5 text-muted-foreground">
                                                                                This action cannot be undone. Only delete it if you are sure.
                                                                      </span>
                                                            </li>
                                                  </ul>
                                        </div>

                                        <AlertDialogFooter className="flex flex-col-reverse gap-2.5 border-t border-border bg-muted/30 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
                                                  <AlertDialogCancel
                                                            disabled={isDeleting}
                                                            className="h-11 cursor-pointer rounded-xl border border-[#526b24]/40 bg-transparent px-5 text-sm font-bold text-foreground transition-all hover:border-[#829f20] hover:bg-[#3b5426]/10 active:scale-[0.98]"
                                                  >
                                                            Keep Event
                                                  </AlertDialogCancel>

                                                  <AlertDialogAction
                                                            disabled={isDeleting}
                                                            onClick={(e) => {
                                                                      e.preventDefault();
                                                                      if (!isDeleting) {
                                                                                void handleDeleteEvent();
                                                                      }
                                                            }}
                                                            className="h-11 cursor-pointer rounded-xl border border-red-700/60 bg-red-600 px-5 text-sm font-bold text-white shadow-[0_5px_20px_rgba(220,38,38,0.25)] transition-all hover:bg-red-700 active:scale-[0.98] disabled:opacity-70"
                                                  >
                                                            {isDeleting ? (
                                                                      <>
                                                                                <Loader2 size={16} className="mr-2 animate-spin" />
                                                                                Deleting...
                                                                      </>
                                                            ) : (
                                                                      <>
                                                                                <Trash2 size={15} className="mr-2" />
                                                                                Yes, Delete Event
                                                                      </>
                                                            )}
                                                  </AlertDialogAction>
                                        </AlertDialogFooter>
                              </AlertDialogContent>
                    </AlertDialog>
          );
};

export default DeleteEventDialog;