import Link from "next/link";
import { cookies } from "next/headers";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Check,
  MapPin,
  SearchX,
  Tag,
} from "lucide-react";
import JoinSection from "./JoinSection";
import VolunteersCard from "./VolunteersCard";
import OrganizerContact from "./OrganizerContact";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

// ---- Builds relevant volunteer guidelines from the event's own data ----
const buildGuidelines = (opts: {
  category?: string;
  title?: string;
  description?: string;
  location?: string;
  date?: string;
}): string[] => {
  const { category = "", title = "", description = "", location, date } = opts;
  const text = `${category} ${title} ${description}`.toLowerCase();

  const arrive = `Please arrive 15 minutes before the scheduled time${location ? ` at ${location}` : " at the designated location"
    }${date ? ` on ${date}` : ""}.`;

  const rules: { test: RegExp; items: string[] }[] = [
    {
      test: /blood|plasma/,
      items: [
        arrive,
        "Bring a valid ID and make sure you meet the donor eligibility requirements.",
        "Eat a healthy meal and drink plenty of water before donating.",
        "Follow the medical team's instructions and rest after donating.",
      ],
    },
    {
      test: /cloth|winter|blanket|jacket|sweater/,
      items: [
        arrive,
        "Bring clean, usable clothes and blankets, sorted by size or age if possible.",
        "Wear comfortable clothing suitable for sorting and handing out items.",
        "Treat every family with respect and dignity during distribution.",
      ],
    },
    {
      test: /food|meal|iftar|ration|feed|hunger/,
      items: [
        arrive,
        "Wash your hands and wear gloves and a mask while packing or serving food.",
        "Help keep queues orderly and serve everyone with respect.",
        "Follow the coordinator's instructions on packing and distribution.",
      ],
    },
    {
      test: /tree|plant|green|environment|garden/,
      items: [
        arrive,
        "Wear closed shoes, a cap and light clothing suited to outdoor work.",
        "Bring a water bottle and gloves, and plan for sun or rain.",
        "Follow the planting guide and take care of saplings and tools.",
      ],
    },
    {
      test: /clean|waste|litter|river|drain|plastic/,
      items: [
        arrive,
        "Wear gloves, a mask and closed shoes for safe cleaning work.",
        "Bring a reusable bag and water bottle.",
        "Do not touch hazardous waste and report it to a coordinator instead.",
      ],
    },
    {
      test: /educat|teach|school|literacy|book|tutor|student/,
      items: [
        arrive,
        "Bring stationery or learning materials related to the session.",
        "Be patient and friendly with students and encourage every learner.",
        "Prepare a short, simple lesson plan if you are teaching.",
      ],
    },
    {
      test: /health|medical|doctor|checkup|clinic|vaccin/,
      items: [
        arrive,
        "Follow the instructions of the medical team and the camp coordinator.",
        "Wear a mask and keep patients' personal information private.",
        "Help with registration, queue management and guiding patients.",
      ],
    },
    {
      test: /flood|disaster|cyclone|emergency|rescue|relief/,
      items: [
        arrive,
        "Wear sturdy footwear and bring drinking water and a charged phone or power bank.",
        "Stay with your team and follow the coordinator's safety instructions.",
        "Bring any pre-coordinated relief packages or distribution items if requested.",
      ],
    },
    {
      test: /donat|fund|charity/,
      items: [
        arrive,
        "Wear comfortable clothing suitable for physical social work and distribution.",
        "Bring any pre-coordinated relief packages or distribution items if requested.",
      ],
    },
  ];

  const match = rules.find((r) => r.test.test(text));
  if (match) return match.items;

  return [
    arrive,
    "Wear comfortable clothing suitable for physical social work.",
    "Carry a water bottle and a valid ID, and follow your coordinator's instructions.",
  ];
};

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // ---- Login check (cookie based) ----
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore
    .getAll()
    .some((c) => /(token|session|jwt|auth)/i.test(c.name) && !!c.value);

  let data: any = null;
  try {
    const res = await fetch(`${API}/event/${id}`, {
      headers: {
        authorization: "user logged in",
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    data = await res.json();
  } catch {
    data = null;
  }

  // ---- Read values from the API response ----
  const raw = data?.data ?? data?.event ?? data?.result ?? data;
  const event = Array.isArray(raw) ? raw[0] : raw;

  const title =
    event?.title ?? event?.name ?? event?.eventName ?? event?.eventTitle;

  // Event not found / API error
  if (!event || !title) {
    return (
      <div className="mx-auto mt-[3.75rem] w-full max-w-2xl px-4 py-8 sm:px-6">
        <Link
          href="/events"
          className="group mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white px-3.5 py-2 text-sm font-medium text-emerald-900 transition-colors hover:text-emerald-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-emerald-100/70 dark:hover:text-emerald-300"
        >
          <ArrowLeft
            size={16}
            strokeWidth={2}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to Upcoming Events
        </Link>
        <div className="flex flex-col items-center rounded-[28px] border border-emerald-900/10 bg-white px-6 py-16 text-center dark:border-white/10 dark:bg-[#16221d]">
          <SearchX
            size={40}
            strokeWidth={1.5}
            className="text-emerald-700 dark:text-emerald-300"
          />
          <h1 className="mt-4 text-xl font-bold text-[#10261b] dark:text-white">
            Event not found
          </h1>
          <p className="mt-1 text-sm text-emerald-900/60 dark:text-emerald-100/55">
            This event may have been removed or the link is incorrect.
          </p>
        </div>
      </div>
    );
  }

  const category = event?.category ?? event?.type ?? event?.eventType;
  const location = event?.location ?? event?.address ?? event?.venue;
  const description = event?.description ?? event?.details ?? event?.about;

  const iconRaw = event?.emoji ?? event?.icon;
  const emoji =
    typeof iconRaw === "string" && iconRaw.length <= 8 ? iconRaw : "🧥";

  // Image
  const imgField = Array.isArray(event?.image ?? event?.images)
    ? (event?.image ?? event?.images)[0]
    : (event?.image ??
      event?.imageUrl ??
      event?.img ??
      event?.photo ??
      event?.thumbnail ??
      event?.banner ??
      event?.coverImage ??
      event?.cover);
  const imgStr: string | undefined =
    typeof imgField === "string" ? imgField : imgField?.url;
  const image = imgStr
    ? /^(https?:)?\/\//.test(imgStr) || imgStr.startsWith("data:")
      ? imgStr
      : `${API}/${imgStr.replace(/^\/+/, "")}`
    : null;

  // Date
  const rawDate = event?.date ?? event?.eventDate ?? event?.startDate;
  let dateLabel = "";
  if (rawDate) {
    const d = new Date(rawDate);
    dateLabel = !isNaN(d.getTime())
      ? d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      })
      : String(rawDate);
  }

  // Volunteers (API theke jetuku ache)
  const volunteerSource =
    event?.volunteers ??
    event?.joinedVolunteers ??
    event?.joinedUsers ??
    event?.participants ??
    event?.attendees;
  const baseCount: number = Array.isArray(volunteerSource)
    ? volunteerSource.length
    : Number(
      event?.volunteerCount ??
      event?.volunteersJoined ??
      event?.joinedCount ??
      volunteerSource ??
      0
    ) || 0;
  const baseEmails: string[] = Array.isArray(volunteerSource)
    ? volunteerSource
      .map((v: any) =>
        typeof v === "string" ? v : (v?.email ?? v?.userEmail ?? v?.user?.email)
      )
      .filter(
        (e: unknown): e is string => typeof e === "string" && e.includes("@")
      )
    : [];
  const apiJoined = Boolean(event?.isJoined ?? event?.joined ?? event?.hasJoined);

  // email -> { name, image } (volunteer দের নাম আর ছবি)
  const volunteerDetails: Record<string, { name?: string; image?: string }> = {};
  if (Array.isArray(volunteerSource)) {
    volunteerSource.forEach((v: any) => {
      if (!v || typeof v !== "object") return;
      const email = v?.email ?? v?.userEmail ?? v?.user?.email;
      if (typeof email !== "string") return;
      volunteerDetails[email] = {
        name: v?.name ?? v?.userName ?? v?.user?.name,
        image: v?.image ?? v?.photo ?? v?.user?.image,
      };
    });
  }

  // Organizer (login না থাকলে এই নামটা fallback হিসেবে দেখাবে)
  const orgRaw =
    event?.organizer ?? event?.createdBy ?? event?.creator ?? event?.user;
  const organizer = orgRaw && typeof orgRaw === "object" ? orgRaw : {};
  const orgString =
    typeof orgRaw === "string" && !/^[a-f0-9]{24}$/i.test(orgRaw)
      ? orgRaw
      : undefined;
  const organizerName: string =
    organizer?.name ??
    organizer?.displayName ??
    orgString ??
    event?.organizerName ??
    "Somaj Team";

  // Guidelines (API first, otherwise generated from the event's own data)
  const guidelinesRaw = event?.guidelines ?? event?.volunteerGuidelines;
  const guidelines: string[] =
    Array.isArray(guidelinesRaw) && guidelinesRaw.length > 0
      ? guidelinesRaw
      : typeof guidelinesRaw === "string" && guidelinesRaw.trim()
        ? guidelinesRaw.split("\n").filter(Boolean)
        : buildGuidelines({
          category,
          title,
          description,
          location,
          date: dateLabel,
        });

  return (
    <div className="mx-auto mt-[3.75rem] w-full max-w-2xl px-4 py-8 sm:px-6">
      {/* Back button */}
      <Link
        href="/events"
        className="group mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white px-3.5 py-2 text-sm font-medium shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:border-[#829f20] focus-visible:outline-none focus-visible:ring-2 dark:border-white/10 dark:bg-white/[0.04] dark:text-[#829f20] dark:shadow-none"
      >
        <ArrowLeft
          size={16}
          strokeWidth={2}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        Back to Upcoming Events
      </Link>

      <article className="overflow-hidden rounded-[28px] border border-emerald-900/10 bg-white shadow-[0_20px_50px_-24px_rgba(16,60,40,0.35)] dark:border-white/10 dark:bg-[#16221d] dark:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
        {/* ---------- Hero ---------- */}
        <header className="relative isolate flex min-h-[260px] flex-col justify-end overflow-hidden px-5 pb-6 pt-5 sm:min-h-[300px] sm:px-7">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={title}
              className="absolute inset-0 -z-30 h-full w-full object-cover"
            />
          ) : (
            <>
              <div
                aria-hidden
                className="absolute inset-0 -z-30 bg-gradient-to-b from-[#f0a03c] via-[#e8803f] to-[#4a2a16]"
              />
              <div
                aria-hidden
                className="absolute left-1/2 top-[36%] -z-20 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 blur-3xl"
              />
              <div
                aria-hidden
                className="absolute left-1/2 top-[36%] -z-10 -translate-x-1/2 -translate-y-1/2 text-[76px] leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)] sm:text-[88px]"
              >
                {emoji}
              </div>
            </>
          )}

          {/* readability overlay */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
          />

          {category && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#14301f] shadow-sm backdrop-blur sm:left-6 sm:top-5">
              <Tag size={13} strokeWidth={2} />
              {category}
            </span>
          )}

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-4xl">
            {title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-white">
            {location && (
              <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-sm">
                <MapPin size={15} strokeWidth={2} className="text-[#829f20]" />
                {location}
              </span>
            )}
            {dateLabel && (
              <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-sm">
                <CalendarDays
                  size={15}
                  strokeWidth={2}
                  className="text-[#829f20]"
                />
                {dateLabel}
              </span>
            )}
          </div>
        </header>

        {/* ---------- Body ---------- */}
        <div className="space-y-7 p-5 sm:p-6">
          {/* Volunteer bar + Join button (client component) */}
          <JoinSection
            eventId={id}
            title={title}
            category={category}
            date={rawDate ? String(rawDate) : ""}
            location={location}
            image={image}
            baseCount={baseCount}
            baseEmails={baseEmails}
            apiJoined={apiJoined}
            isLoggedIn={isLoggedIn}
          />

          {/* About + Organizer */}
          <div className="grid gap-6 md:grid-cols-[1fr_14rem]">
            <section>
              <h2 className="text-xl font-bold tracking-tight text-[#10261b] dark:text-white">
                About this Social Initiative
              </h2>
              {description && (
                <p className="mt-3 text-[15px] leading-7 text-[#2b4338] dark:text-white/85">
                  {description}
                </p>
              )}

              <div className="mt-6 border-t border-emerald-900/10 pt-5 dark:border-white/10">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-900/60 dark:text-emerald-100/55">
                  Volunteer Guidelines
                </h3>
                <ul className="mt-4 space-y-3.5">
                  {guidelines.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm leading-6 text-emerald-950/75 dark:text-emerald-100/70"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#829f20]/15 text-[#829f20]">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Right column: organizer + joined volunteers */}
            <div className="h-fit space-y-4">
              <aside className="group h-fit rounded-2xl border border-emerald-900/10 bg-emerald-50/70 p-5 transition-all duration-300 hover:scale-[1.03] hover:border-[#829f20] dark:border-white/10 dark:bg-[#0e1713] dark:hover:border-[#829f20]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-900/60 dark:text-emerald-100/55">
                  Initiative Organizer
                </h3>

                {/* Avatar (image / first letter) + name + email */}
                <OrganizerContact organizerName={organizerName} />

                <div className="mt-5 flex items-center gap-2 border-t border-emerald-900/10 pt-4 text-xs text-emerald-900/65 dark:border-white/10 dark:text-emerald-100/60">
                  <BadgeCheck
                    size={16}
                    strokeWidth={1.75}
                    className="text-[#829f20]"
                  />
                  Verified Platform Member
                </div>
              </aside>

              <VolunteersCard
                eventId={id}
                baseCount={baseCount}
                baseEmails={baseEmails}
                apiJoined={apiJoined}
                isLoggedIn={isLoggedIn}
                volunteerDetails={volunteerDetails}
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default EventDetailsPage;