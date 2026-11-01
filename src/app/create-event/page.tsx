
"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import {
          ArrowLeft,
          CalendarDays,
          Image as ImageIcon,
          MapPin,
          PlusCircle,
          Sparkles,
          Tag,
          Type,
          Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

const RequiredMark = () => (
          <span className="ml-1 text-base font-extrabold text-red-500">*</span>
);

const CreateEventPage = () => {
          const [today, setToday] = useState("");
          const [loading, setLoading] = useState(false);

          // Get today's local date
          useEffect(() => {
                    const now = new Date();

                    const year = now.getFullYear();
                    const month = String(now.getMonth() + 1).padStart(2, "0");
                    const day = String(now.getDate()).padStart(2, "0");

                    setToday(`${year}-${month}-${day}`);
          }, []);

          // Calculate tomorrow's date
          const minDate = today
                    ? (() => {
                              const [year, month, day] = today.split("-").map(Number);
                              const tomorrow = new Date(year, month - 1, day + 1);

                              return [
                                        tomorrow.getFullYear(),
                                        String(tomorrow.getMonth() + 1).padStart(2, "0"),
                                        String(tomorrow.getDate()).padStart(2, "0"),
                              ].join("-");
                    })()
                    : undefined;

          // Form Submit
          const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
                    e.preventDefault();

                    const formElement = e.currentTarget;

                    // Get Form Data
                    const formData = new FormData(formElement);

                    const eventDate = formData.get("eventDate") as string;

                    // Validate Date
                    if (!today || !eventDate || eventDate <= today) {
                              alert("Please select a future date for your event.");
                              return;
                    }

                    // Convert FormData to Object
                    const eventData = Object.fromEntries(formData.entries());

                    try {
                              setLoading(true);

                              const res = await fetch("http://localhost:5000/event", {
                                        method: "POST",
                                        headers: {
                                                  "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(eventData),
                              });

                              const data = await res.json();

                              if (!res.ok) {
                                        throw new Error(data.message || "Failed to create event");
                              }

                              console.log("Event Created Successfully:", data);

                              alert("Event created successfully!");

                              // Reset Form
                              formElement.reset();

                    } catch (error) {
                              console.error("Event Creation Error:", error);

                              alert(
                                        error instanceof Error
                                                  ? error.message
                                                  : "Something went wrong!"
                              );
                    } finally {
                              setLoading(false);
                    }
          };

          return (
                    <main className="mt-20 min-h-screen w-full bg-background px-4 py-6 text-foreground transition-colors duration-300 sm:px-6">
                              <div className="mx-auto max-w-3xl">

                                        {/* Back Navigation */}
                                        <Link
                                                  href="/events"
                                                  className="mb-4 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-[#829f20]"
                                        >
                                                  <ArrowLeft size={16} />
                                                  Back to Upcoming Events
                                        </Link>

                                        {/* Main Card */}
                                        <Card className="overflow-hidden rounded-2xl border border-[#526b24] bg-card shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.01] hover:border-[#829f20]">
                                                  <CardContent className="p-5 sm:p-6 md:p-7">

                                                            {/* Header */}
                                                            <div className="mb-6 space-y-2">
                                                                      <div className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#526b24] bg-[#3b5426]/10 px-3 py-1.5 text-sm font-semibold text-[#829f20] transition-all duration-300 hover:border-[#829f20] hover:bg-[#3b5426] hover:text-white">
                                                                                <Sparkles size={15} />
                                                                                Social Service Drive
                                                                      </div>

                                                                      <div className="space-y-2">
                                                                                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                                                                                          Create a Community Event
                                                                                </h1>

                                                                                <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                                                                                          Organize a local relief effort, environmental cleanup, or
                                                                                          community support drive.
                                                                                </p>
                                                                      </div>
                                                            </div>

                                                            {/* Event Form */}
                                                            <form onSubmit={handleSubmit} className="space-y-4">

                                                                      {/* Event Title */}
                                                                      <div className="space-y-2">
                                                                                <Label htmlFor="eventTitle" className="text-base font-semibold">
                                                                                          Event Title <RequiredMark />
                                                                                </Label>

                                                                                <div className="relative">
                                                                                          <Type
                                                                                                    size={18}
                                                                                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                                                          />

                                                                                          <Input
                                                                                                    id="eventTitle"
                                                                                                    name="eventTitle"
                                                                                                    required
                                                                                                    placeholder="e.g. Winter Clothes Distribution – Mohammodpur, Dhaka"
                                                                                                    className="h-11 rounded-xl border-[#526b24] bg-background pl-10 text-base transition-all duration-300 focus-visible:border-[#829f20] focus-visible:ring-[#829f20]"
                                                                                          />
                                                                                </div>
                                                                      </div>

                                                                      {/* Event Type & Date */}
                                                                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                                                                {/* Event Type */}
                                                                                <div className="space-y-2">
                                                                                          <Label htmlFor="eventType" className="text-base font-semibold">
                                                                                                    Event Type <RequiredMark />
                                                                                          </Label>

                                                                                          <div className="relative">
                                                                                                    <Tag
                                                                                                              size={17}
                                                                                                              className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground"
                                                                                                    />

                                                                                                    <Select name="eventType" required>
                                                                                                              <SelectTrigger
                                                                                                                        id="eventType"
                                                                                                                        className="h-11 cursor-pointer rounded-xl border-[#526b24] bg-background pl-10 text-base transition-all duration-300 hover:border-[#829f20] hover:bg-[#3b5426]/10 focus:border-[#829f20]"
                                                                                                              >
                                                                                                                        <SelectValue placeholder="Select event type" />
                                                                                                              </SelectTrigger>

                                                                                                              <SelectContent
                                                                                                                        className="cursor-pointer border-[#829f20] bg-white text-gray-900 dark:border-[#526b24] dark:bg-[#26391c] dark:text-white"
                                                                                                              >
                                                                                                                        <SelectItem value="Plantation" className="cursor-pointer transition-colors hover:bg-[#829f20]/15 focus:bg-[#829f20]/20">
                                                                                                                                  Plantation
                                                                                                                        </SelectItem>

                                                                                                                        <SelectItem value="Cleanup" className="cursor-pointer transition-colors hover:bg-[#829f20]/15 focus:bg-[#829f20]/20">
                                                                                                                                  Cleanup
                                                                                                                        </SelectItem>

                                                                                                                        <SelectItem value="Donation" className="cursor-pointer transition-colors hover:bg-[#829f20]/15 focus:bg-[#829f20]/20">
                                                                                                                                  Donation
                                                                                                                        </SelectItem>

                                                                                                                        <SelectItem value="Education" className="cursor-pointer transition-colors hover:bg-[#829f20]/15 focus:bg-[#829f20]/20">
                                                                                                                                  Education
                                                                                                                        </SelectItem>

                                                                                                                        <SelectItem value="Relief" className="cursor-pointer transition-colors hover:bg-[#829f20]/15 focus:bg-[#829f20]/20">
                                                                                                                                  Relief
                                                                                                                        </SelectItem>

                                                                                                                        <SelectItem value="Community Support" className="cursor-pointer transition-colors hover:bg-[#829f20]/15 focus:bg-[#829f20]/20">
                                                                                                                                  Community Support
                                                                                                                        </SelectItem>

                                                                                                                        <SelectItem value="Other" className="cursor-pointer transition-colors hover:bg-[#829f20]/15 focus:bg-[#829f20]/20">
                                                                                                                                  Other
                                                                                                                        </SelectItem>
                                                                                                              </SelectContent>
                                                                                                    </Select>
                                                                                          </div>
                                                                                </div>

                                                                                {/* Event Date */}
                                                                                <div className="space-y-2">
                                                                                          <Label htmlFor="eventDate" className="text-base font-semibold">
                                                                                                    Event Date <RequiredMark />
                                                                                          </Label>

                                                                                          <div className="relative">
                                                                                                    <CalendarDays
                                                                                                              size={17}
                                                                                                              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                                                                    />

                                                                                                    <Input
                                                                                                              id="eventDate"
                                                                                                              name="eventDate"
                                                                                                              type="date"
                                                                                                              required
                                                                                                              min={minDate}
                                                                                                              disabled={!today}
                                                                                                              className="h-11 cursor-pointer rounded-xl border-[#526b24] bg-background pl-10 text-base transition-all duration-300 hover:border-[#829f20] focus-visible:border-[#829f20] focus-visible:ring-[#829f20]"
                                                                                                    />
                                                                                          </div>

                                                                                          <p className="text-sm text-muted-foreground">
                                                                                                    Event date must be in the future.
                                                                                          </p>
                                                                                </div>
                                                                      </div>

                                                                      {/* Location */}
                                                                      <div className="space-y-2">
                                                                                <Label htmlFor="location" className="text-base font-semibold">
                                                                                          Location / Venue <RequiredMark />
                                                                                </Label>

                                                                                <div className="relative">
                                                                                          <MapPin
                                                                                                    size={18}
                                                                                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                                                          />

                                                                                          <Input
                                                                                                    id="location"
                                                                                                    name="location"
                                                                                                    required
                                                                                                    placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                                                                                                    className="h-11 rounded-xl border-[#526b24] bg-background pl-10 text-base transition-all duration-300 focus-visible:border-[#829f20] focus-visible:ring-[#829f20]"
                                                                                          />
                                                                                </div>
                                                                      </div>

                                                                      {/* Thumbnail */}
                                                                      <div className="space-y-2">
                                                                                <Label htmlFor="thumbnail" className="text-base font-semibold">
                                                                                          Thumbnail Image URL
                                                                                </Label>

                                                                                <div className="relative">
                                                                                          <ImageIcon
                                                                                                    size={18}
                                                                                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                                                          />

                                                                                          <Input
                                                                                                    id="thumbnail"
                                                                                                    name="thumbnail"
                                                                                                    type="url"
                                                                                                    placeholder="https://..."
                                                                                                    className="h-11 rounded-xl border-[#526b24] bg-background pl-10 text-base transition-all duration-300 focus-visible:border-[#829f20] focus-visible:ring-[#829f20]"
                                                                                          />
                                                                                </div>
                                                                      </div>

                                                                      {/* Description */}
                                                                      <div className="space-y-2">
                                                                                <Label htmlFor="description" className="text-base font-semibold">
                                                                                          Event Description <RequiredMark />
                                                                                </Label>

                                                                                <Textarea
                                                                                          id="description"
                                                                                          name="description"
                                                                                          required
                                                                                          placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
                                                                                          className="min-h-28 resize-y rounded-xl border-[#526b24] bg-background p-3 text-base leading-7 transition-all duration-300 focus-visible:border-[#829f20] focus-visible:ring-[#829f20] sm:min-h-32"
                                                                                />
                                                                      </div>

                                                                      {/* Organizer Email */}
                                                                      <div className="space-y-2">
                                                                                <Label htmlFor="organizerEmail" className="text-base font-semibold">
                                                                                          Organizer Email
                                                                                </Label>

                                                                                <div className="relative">
                                                                                          <Mail
                                                                                                    size={18}
                                                                                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                                                          />

                                                                                          <Input
                                                                                                    id="organizerEmail"
                                                                                                    name="organizerEmail"
                                                                                                    type="email"
                                                                                                    required
                                                                                                    placeholder="Enter your email address"
                                                                                                    className="h-11 rounded-xl border-[#526b24] bg-background pl-10 text-base transition-all duration-300 focus-visible:border-[#829f20] focus-visible:ring-[#829f20]"
                                                                                          />
                                                                                </div>
                                                                      </div>

                                                                      {/* Publish Button */}
                                                                      <Button
                                                                                type="submit"
                                                                                disabled={!today || loading}
                                                                                className="h-12 w-full cursor-pointer rounded-xl border border-[#526b24] bg-[#3b5426] text-base font-bold text-white shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-[#829f20] hover:bg-[#3b5426] hover:text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:hover:scale-100"
                                                                      >
                                                                                <PlusCircle size={19} className="mr-2" />
                                                                                {loading ? "Publishing..." : "Publish Event"}
                                                                      </Button>

                                                            </form>
                                                  </CardContent>
                                        </Card>
                              </div>
                    </main>
          );
};

export default CreateEventPage;
