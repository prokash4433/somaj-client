<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Single Next.js 16 App Router app (social events platform, "Somaj"). Not a monorepo. npm only — `package-lock.json` is the lockfile; ignore the README's yarn/pnpm/bun suggestions (README is otherwise stock create-next-app).

- Routes in `src/app/`: `/`, `/events`, `/create-event`, `/login`, `/profile`. Path alias `@/*` → `src/*`.
- UI primitives in `src/components/ui/` (shadcn-generated); page-level components in `src/components/`.
- The backend is **not in this repo**: pages call hardcoded `http://localhost:5000` (`GET /events` in `src/app/events/page.tsx`, `POST /event` in `src/app/create-event/page.tsx`). Those fetches fail unless that separate server is running.

## Commands and baseline

- `npm run dev` (Turbopack), `npm run lint` (ESLint 9 flat config, whole repo), `npm run build`.
- No test runner, no typecheck script, no CI, no formatter. Typecheck with `npx tsc --noEmit`.
- Baseline is currently red (verified on `main`) — don't assume you broke it:
  - `npx tsc --noEmit` and `npm run build` fail: `src/app/profile/page.tsx` is a committed empty file ("is not a module"). Build compiles fine and only fails its TS step.
  - `npm run lint` fails with 4 pre-existing `react-hooks/set-state-in-effect` errors in `create-event/page.tsx`, `shared/ThemeToggle.tsx`, `ui/carousel.tsx`, `hooks/use-mobile.ts`. Only errors you newly introduce matter.
- `next build` prints a benign warning that a `package-lock.json` in `C:\Projects` was ignored (outside this git repo).

## Toolchain gotchas

- Next.js is **16.4.3** — newer than most training data; App Router docs live in `node_modules/next/dist/docs/01-app/`.
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`). Don't hand-add `memo`/`useMemo` for performance.
- Tailwind CSS v4 is CSS-first: no `tailwind.config.*`, no PostCSS config. Theme tokens/vars are in `src/app/globals.css`, loaded via the `@tailwindcss/turbopack` loader rule in `next.config.ts`. Don't add a config file or switch to `@tailwindcss/postcss`.
- shadcn components use the `base-nova` style built on **Base UI** (`@base-ui/react`), not Radix — extend them with Base UI imports; add new ones with `npx shadcn add <component>` (`components.json`).
- `cn` is the npm `cn` package, re-exported from `src/lib/utils.ts` — don't replace it with clsx/tailwind-merge.
- Theming: `next-themes` class strategy, default dark, system disabled (`src/app/layout.tsx`); palette tokens in `src/app/globals.css`.
