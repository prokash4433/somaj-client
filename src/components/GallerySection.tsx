"use client";

import { useState } from "react";
import {
          MapPin,
          ArrowUpRight,
          Shirt,
          HeartHandshake,
          Waves,
          Sprout,
          UtensilsCrossed,
          BookOpen,
          type LucideIcon,
} from "lucide-react";

type GalleryItem = {
          title: string;
          tag: string;
          location: string;
          image: string;
          icon: LucideIcon;
};

const GALLERY: GalleryItem[] = [
          {
                    title: "Winter Clothes Drive",
                    tag: "Warmth for rickshaw pullers",
                    location: "Mirpur 10, Dhaka",
                    image:
                              "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=900&q=85",
                    icon: Shirt,
          },
          {
                    title: "Night Blanket Relief",
                    tag: "Shelterless night support",
                    location: "Mohammadpur, Dhaka",
                    image:
                              "https://images.unsplash.com/photo-1482275548304-a58859dc31b7?auto=format&fit=crop&w=900&q=85",
                    icon: HeartHandshake,
          },
          {
                    title: "Dhanmondi Lake Clean-up",
                    tag: "Eco plastic-free waters",
                    location: "Dhanmondi, Dhaka",
                    image:
                              "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=900&q=85",
                    icon: Waves,
          },
          {
                    title: "Urban Tree Plantation",
                    tag: "1000 green saplings",
                    location: "Uttara, Dhaka",
                    image:
                              "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=85",
                    icon: Sprout,
          },
          {
                    title: "Community Food Relief",
                    tag: "Fresh meals sharing",
                    location: "Old Dhaka",
                    image:
                              "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85",
                    icon: UtensilsCrossed,
          },
          {
                    title: "Children Book & Bag Drive",
                    tag: "Education for underprivileged",
                    location: "Rayerbazar, Dhaka",
                    image:
                              "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=85",
                    icon: BookOpen,
          },
];

const GalleryCard = ({ item }: { item: GalleryItem }) => {
          const [failed, setFailed] = useState(false);
          const Icon = item.icon;

          return (
                    <article className="group relative h-[240px] cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#829f20]/60 hover:shadow-[0_18px_40px_-14px_rgba(82,107,36,0.45)]">
                              {/* Image or fallback */}
                              {!failed ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                                  src={item.image}
                                                  alt={item.title}
                                                  loading="lazy"
                                                  onError={() => setFailed(true)}
                                                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        />
                              ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#3b5426]/30 via-[#526b24]/15 to-[#829f20]/25 text-[#718b32]/50 transition-transform duration-700 group-hover:scale-110 dark:from-[#26331a] dark:via-[#14221b] dark:to-[#3b5426]/60 dark:text-[#a8cf35]/30">
                                                  <Icon size={64} strokeWidth={1.2} />
                                        </div>
                              )}

                              {/* Dark gradient for text readability */}
                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

                              {/* Green tint on hover */}
                              <div className="pointer-events-none absolute inset-0 bg-[#3b5426]/0 transition-colors duration-500 group-hover:bg-[#3b5426]/20" />

                              {/* Arrow icon (top-right) */}
                              <span className="absolute right-3.5 top-3.5 z-10 flex h-9 w-9 translate-y-1 scale-75 items-center justify-center rounded-full border border-white/20 bg-[#14221b]/80 text-[#c5e77b] opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                                        <ArrowUpRight size={16} />
                              </span>

                              {/* Content */}
                              <div className="absolute inset-x-0 bottom-0 z-10 p-4">
                                        <span className="inline-flex max-w-full items-center rounded-md border border-[#829f20]/40 bg-[#3b5426]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#c5e77b] backdrop-blur transition-colors duration-300 group-hover:border-[#a8cf35]/70 group-hover:bg-[#526b24]">
                                                  <span className="truncate">{item.tag}</span>
                                        </span>

                                        <h3 className="mt-2 text-base font-extrabold leading-tight text-white transition-transform duration-300 group-hover:translate-x-0.5">
                                                  {item.title}
                                        </h3>

                                        <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-white/80">
                                                  <MapPin size={12} className="shrink-0 text-[#a8cf35]" />
                                                  <span className="truncate">{item.location}</span>
                                        </p>

                                        {/* Bottom accent line */}
                                        <div className="mt-3 h-0.5 w-0 rounded-full bg-gradient-to-r from-[#829f20] to-[#c5e77b] transition-all duration-500 group-hover:w-full" />
                              </div>
                    </article>
          );
};

const GallerySection = () => {
          return (
                    <section className="w-full px-4 py-14 text-foreground transition-colors duration-300 sm:px-6 lg:px-8">
                              <div className="mx-auto max-w-6xl">
                                        {/* Header */}
                                        <div className="mb-10 text-center">
                                                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6d8d18] dark:text-[#a8cf35]">
                                                            Visual Stories
                                                  </span>

                                                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                                                            Community in Action
                                                  </h2>

                                                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
                                                            Moments from volunteer drives, relief distributions, and green
                                                            initiatives across Dhaka and beyond.
                                                  </p>

                                                  <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-[#3b5426] to-[#829f20]" />
                                        </div>

                                        {/* Grid */}
                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                                  {GALLERY.map((item) => (
                                                            <GalleryCard key={item.title} item={item} />
                                                  ))}
                                        </div>
                              </div>
                    </section>
          );
};

export default GallerySection;