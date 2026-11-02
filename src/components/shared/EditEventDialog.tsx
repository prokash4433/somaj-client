"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";
import {
          CalendarDays,
          Image as ImageIcon,
          MapPin,
          Pencil,
          Tag,
          Type,
          Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
          Dialog,
          DialogContent,
          DialogDescription,
          DialogHeader,
          DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
          Select,
          SelectContent,
          SelectItem,
          SelectTrigger,
          SelectValue,
} from "@/components/ui/select";

type EventData = {
          id?: string;
          _id?: string;
          eventId?: string;
          eventTitle?: string;
          title?: string;
          eventType?: string;
          category?: string;
          eventDate?: string;
          date?: string;
          location?: string;
          description?: string;
          thumbnail?: string;
          image?: string;
          organizerEmail?: string;
          organizer?: string;
};

type EditEventDialogProps = {
          event?: EventData;
          onUpdated?: (updatedEvent: EventData) => void;
};

const RequiredMark = () => (
          <span className="ml-1 text-base font-extrabold text-red-500">*</span>
);

const EditEventDialog = ({ event, onUpdated }: EditEventDialogProps) => {
          const [open, setOpen] = useState(false);
          const [loading, setLoading] = useState(false);

          const [form, setForm] = useState({
                    eventTitle: "",
                    eventType: "",
                    eventDate: "",
                    location: "",
                    thumbnail: "",
                    description: "",
                    organizerEmail: "",
          });

          useEffect(() => {
                    if (!event) return;

                    setForm({
                              eventTitle: event.eventTitle ?? event.title ?? "",
                              eventType: event.eventType ?? event.category ?? "",
                              eventDate: (event.eventDate ?? event.date ?? "").slice(0, 10),
                              location: event.location ?? "",
                              thumbnail: event.thumbnail ?? event.image ?? "",
                              description: event.description ?? "",
                              organizerEmail: event.organizerEmail ?? event.organizer ?? "",
                    });
          }, [event, open]);

          const updateField = (name: string, value: string) => {
                    setForm((previous) => ({
                              ...previous,
                              [name]: value,
                    }));
          };

          const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();

                    if (!event) {
                              toast.error("Event information is missing.");
                              return;
                    }

                    const eventId = event._id ?? event.id ?? event.eventId;

                    if (!eventId) {
                              toast.error("Event ID is missing.");
                              console.error("Event object:", event);
                              return;
                    }

                    setLoading(true);

                    try {
                              const payload = {
                                        eventTitle: form.eventTitle.trim(),
                                        eventType: form.eventType,
                                        eventDate: form.eventDate,
                                        location: form.location.trim(),
                                        thumbnail: form.thumbnail.trim(),
                                        description: form.description.trim(),
                                        organizerEmail: form.organizerEmail.trim().toLowerCase(),
                              };

                              const res = await fetch(
                                        `http://localhost:5000/event/${encodeURIComponent(eventId)}`,
                                        {
                                                  method: "PATCH",
                                                  headers: {
                                                            "Content-Type": "application/json",
                                                  },
                                                  body: JSON.stringify(payload),
                                        }
                              );

                              const data = await res.json().catch(() => ({}));

                              if (!res.ok) {
                                        throw new Error(
                                                  data.message || "Failed to submit event changes."
                                        );
                              }

                              const updatedEvent: EventData = {
                                        ...event,
                                        ...payload,
                                        title: payload.eventTitle,
                                        category: payload.eventType,
                                        date: payload.eventDate,
                                        image: payload.thumbnail,
                                        organizer: payload.organizerEmail,
                                        ...(data.event ?? {}),
                              };

                              onUpdated?.(updatedEvent);

                              toast.success("Event updated successfully!", {
                                        description: "Your event changes have been saved.",
                                        duration: 3000,
                              });

                              setOpen(false);
                    } catch (error) {
                              console.error("Event Update Error:", error);

                              toast.error("Unable to update event.", {
                                        description:
                                                  error instanceof Error
                                                            ? error.message
                                                            : "Something went wrong. Please try again.",
                                        duration: 4000,
                              });
                    } finally {
                              setLoading(false);
                    }
          };

          return (
                    <>
                              <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setOpen(true)}
                                        className="h-9 cursor-pointer rounded-lg border border-[#dce5d9] bg-[#f0f5e9] px-3 text-xs font-bold text-[#354d24] shadow-sm transition-all duration-300 hover:border-[#829f20] hover:bg-[#e3eed5] hover:text-[#283d18] active:scale-[0.98] dark:border-[#34443a] dark:bg-[#14221b] dark:text-[#a8cf35] dark:hover:border-[#829f20] dark:hover:bg-[#283d18] dark:hover:text-white"
                              >
                                        <Pencil size={13} className="mr-1.5" />
                                        Edit
                              </Button>

                              <Dialog open={open} onOpenChange={setOpen}>
                                        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border border-[#526b24] bg-background text-foreground sm:max-w-2xl">
                                                  <DialogHeader>
                                                            <DialogTitle className="text-xl font-extrabold sm:text-2xl">
                                                                      Update Event
                                                            </DialogTitle>

                                                            <DialogDescription className="text-sm leading-6 text-muted-foreground">
                                                                      Update your event details below. Review the information
                                                                      carefully before submitting your changes.
                                                            </DialogDescription>
                                                  </DialogHeader>

                                                  <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                                                            <div className="space-y-2">
                                                                      <Label htmlFor="edit-eventTitle" className="font-semibold">
                                                                                Event Title <RequiredMark />
                                                                      </Label>

                                                                      <div className="relative">
                                                                                <Type
                                                                                          size={18}
                                                                                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                                                />
                                                                                <Input
                                                                                          id="edit-eventTitle"
                                                                                          name="eventTitle"
                                                                                          required
                                                                                          value={form.eventTitle}
                                                                                          onChange={(e) =>
                                                                                                    updateField("eventTitle", e.target.value)
                                                                                          }
                                                                                          placeholder="Enter event title"
                                                                                          className="h-11 rounded-xl border-[#526b24] bg-background pl-10 focus-visible:border-[#829f20] focus-visible:ring-[#829f20]"
                                                                                />
                                                                      </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                                      <div className="space-y-2">
                                                                                <Label htmlFor="edit-eventType" className="font-semibold">
                                                                                          Event Type <RequiredMark />
                                                                                </Label>

                                                                                <div className="relative">
                                                                                          <Tag
                                                                                                    size={17}
                                                                                                    className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground"
                                                                                          />

                                                                                          <Select
                                                                                                    value={form.eventType}
                                                                                                    onValueChange={(value) =>
                                                                                                              updateField("eventType", value)
                                                                                                    }
                                                                                                    required
                                                                                          >
                                                                                                    <SelectTrigger
                                                                                                              id="edit-eventType"
                                                                                                              className="h-11 rounded-xl border-[#526b24] bg-background pl-10"
                                                                                                    >
                                                                                                              <SelectValue placeholder="Select event type" />
                                                                                                    </SelectTrigger>

                                                                                                    <SelectContent className="border-[#829f20] bg-white text-gray-900 dark:border-[#526b24] dark:bg-[#26391c] dark:text-white">
                                                                                                              <SelectItem value="Plantation">Plantation</SelectItem>
                                                                                                              <SelectItem value="Cleanup">Cleanup</SelectItem>
                                                                                                              <SelectItem value="Donation">Donation</SelectItem>
                                                                                                              <SelectItem value="Community Support">
                                                                                                                        Community Support
                                                                                                              </SelectItem>
                                                                                                              <SelectItem value="Other">Other</SelectItem>
                                                                                                    </SelectContent>
                                                                                          </Select>
                                                                                </div>
                                                                      </div>

                                                                      <div className="space-y-2">
                                                                                <Label htmlFor="edit-eventDate" className="font-semibold">
                                                                                          Event Date <RequiredMark />
                                                                                </Label>

                                                                                <div className="relative">
                                                                                          <CalendarDays
                                                                                                    size={17}
                                                                                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                                                          />
                                                                                          <Input
                                                                                                    id="edit-eventDate"
                                                                                                    name="eventDate"
                                                                                                    type="date"
                                                                                                    required
                                                                                                    value={form.eventDate}
                                                                                                    onChange={(e) =>
                                                                                                              updateField("eventDate", e.target.value)
                                                                                                    }
                                                                                                    className="h-11 rounded-xl border-[#526b24] bg-background pl-10"
                                                                                          />
                                                                                </div>
                                                                      </div>
                                                            </div>

                                                            <div className="space-y-2">
                                                                      <Label htmlFor="edit-location" className="font-semibold">
                                                                                Location / Venue <RequiredMark />
                                                                      </Label>

                                                                      <div className="relative">
                                                                                <MapPin
                                                                                          size={18}
                                                                                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                                                />
                                                                                <Input
                                                                                          id="edit-location"
                                                                                          name="location"
                                                                                          required
                                                                                          value={form.location}
                                                                                          onChange={(e) =>
                                                                                                    updateField("location", e.target.value)
                                                                                          }
                                                                                          placeholder="Enter event location"
                                                                                          className="h-11 rounded-xl border-[#526b24] bg-background pl-10"
                                                                                />
                                                                      </div>
                                                            </div>

                                                            <div className="space-y-2">
                                                                      <Label htmlFor="edit-thumbnail" className="font-semibold">
                                                                                Thumbnail Image URL
                                                                      </Label>

                                                                      <div className="relative">
                                                                                <ImageIcon
                                                                                          size={18}
                                                                                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                                                />
                                                                                <Input
                                                                                          id="edit-thumbnail"
                                                                                          name="thumbnail"
                                                                                          type="url"
                                                                                          value={form.thumbnail}
                                                                                          onChange={(e) =>
                                                                                                    updateField("thumbnail", e.target.value)
                                                                                          }
                                                                                          placeholder="https://..."
                                                                                          className="h-11 rounded-xl border-[#526b24] bg-background pl-10"
                                                                                />
                                                                      </div>
                                                            </div>

                                                            <div className="space-y-2">
                                                                      <Label htmlFor="edit-description" className="font-semibold">
                                                                                Event Description <RequiredMark />
                                                                      </Label>

                                                                      <Textarea
                                                                                id="edit-description"
                                                                                name="description"
                                                                                required
                                                                                value={form.description}
                                                                                onChange={(e) =>
                                                                                          updateField("description", e.target.value)
                                                                                }
                                                                                placeholder="Describe the purpose and activities of your event..."
                                                                                className="min-h-28 resize-y rounded-xl border-[#526b24] bg-background p-3 leading-7"
                                                                      />
                                                            </div>

                                                            <div className="space-y-2">
                                                                      <Label
                                                                                htmlFor="edit-organizerEmail"
                                                                                className="font-semibold"
                                                                      >
                                                                                Organizer Email <RequiredMark />
                                                                      </Label>

                                                                      <div className="relative">
                                                                                <Mail
                                                                                          size={18}
                                                                                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                                                />
                                                                                <Input
                                                                                          id="edit-organizerEmail"
                                                                                          name="organizerEmail"
                                                                                          type="email"
                                                                                          required
                                                                                          value={form.organizerEmail}
                                                                                          onChange={(e) =>
                                                                                                    updateField("organizerEmail", e.target.value)
                                                                                          }
                                                                                          placeholder="Enter organizer email"
                                                                                          className="h-11 rounded-xl border-[#526b24] bg-background pl-10"
                                                                                />
                                                                      </div>
                                                            </div>

                                                            <Button
                                                                      type="submit"
                                                                      disabled={loading}
                                                                      className="h-11 w-full cursor-pointer rounded-xl border border-[#526b24] bg-[#3b5426] font-bold text-white transition-all hover:border-[#829f20] hover:bg-[#3b5426] active:scale-[0.98] disabled:cursor-not-allowed"
                                                            >
                                                                      <Pencil size={16} className="mr-2" />
                                                                      {loading ? "Updating..." : "Update Event"}
                                                            </Button>
                                                  </form>
                                        </DialogContent>
                              </Dialog>
                    </>
          );
};

export default EditEventDialog;