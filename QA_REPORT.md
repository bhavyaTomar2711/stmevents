# STM Events — QA & Code Review Report

**Date:** 2026-04-01
**Tester:** Senior QA Engineer (Playwright E2E) + Senior Code Reviewer
**App:** STM Events — Next.js 16.2.0 / Supabase / Cloudinary / Resend
**Base URL:** http://localhost:3000

---

## Part 1: Requirements Checklist (from PDF)

| # | Requirement | Status |
|---|-------------|--------|
| 1 | Hero section with video background / event footage | ✅ Present |
| 2 | Next upcoming event highlighted on homepage | ✅ Present |
| 3 | Event countdown timer | ✅ Present |
| 4 | Quick overview of STM Events | ✅ Present |
| 5 | Gallery / events visual preview on homepage | ✅ Present |
| 6 | Navigation to other sections | ⚠️ Anchor-only, not page links |
| 7 | Events listing page with event cards | ✅ Present |
| 8 | Event cards link to individual event pages | ❌ Cards not clickable |
| 9 | Individual event: title, date, location, lineup, images, description | ✅ Present |
| 10 | Individual event: Eventbrite ticket button | ⚠️ Wrong URL / missing on past events |
| 11 | Gallery: event photos, aftermovies, DJ sets, videos, trailers | ⚠️ Only 2/5 categories populated |
| 12 | Gallery media uploadable via admin panel | ✅ Present |
| 13 | About / Services overview | ✅ On homepage sections |
| 14 | Equipment rental listings (name, images, description, price) | ✅ Present |
| 15 | Equipment rental inquiry form (no direct booking) | ⚠️ No submission feedback |
| 16 | Resident DJ profiles (name, logo, photo) | ✅ Present |
| 17 | Admin: add/edit events (incl. date, description) | ❌ Date + description fields missing |
| 18 | Admin: gallery upload photos/videos | ✅ Present |
| 19 | Admin: add/edit equipment listings | ✅ Present |
| 20 | Admin: add/edit DJ profiles | ✅ Present |
| 21 | Admin: edit text content across pages (visual editor) | ✅ Present |
| 22 | Contact form (general, booking, rental inquiries) | ⚠️ No submission feedback |
| 23 | Bilingual EN/DE support | ⚠️ Switcher works but `html lang` not updated |
| 24 | Dark theme, black/white/purple palette | ✅ Present |
| 25 | Mobile responsive | ❌ 530px overflow on all inner pages |
| 26 | SEO-friendly page titles | ⚠️ Generic titles on 6 pages |
| 27 | Eventbrite redirect links | ⚠️ Pointing to wrong URL |

---

## Part 2: E2E Test Findings (Playwright)

### CRITICAL

---

#### BUG-01: User Login Broken — Valid Credentials Rejected

- **Actual Behavior:** Logging in with `saurabh.s.kshatriya7@gmail.com / 12121212` returns HTTP 401 "Invalid login credentials". The form stays on the login page with no error message shown.
- **Possible Cause:** User account may not exist in the connected Supabase project, or the password differs from what was provided. The `.env` Supabase credentials may point to the wrong environment.
- **Suggested Solution:** Verify the user exists in Supabase Auth dashboard. Reset the password for the test account. Confirm `.env` variables point to the correct Supabase project.
- **Severity: Critical**

---

#### BUG-02: Event Cards on `/events` Are Not Clickable

- **Actual Behavior:** Event cards on the `/events` listing page are `<div>` elements — clicking does nothing. Users cannot navigate to individual event detail pages from the listing.
- **Possible Cause:** The event card component is missing the wrapping `<a href="/events/[slug]">` anchor tag. Only the external Eventbrite "Tickets" link is present.
- **Suggested Solution:** Wrap each event card in `<a href={/events/${slug}}>` so the entire card is clickable and navigates to the event detail page.
- **Severity: Critical**

---

#### BUG-03: Global Navigation Missing on All Inner Pages

- **Actual Behavior:** The persistent navigation bar (EVENTS, GALLERY, DJS, LEISTUNGEN, KONTAKT, language switcher) is completely absent on `/events`, `/djs`, `/equipment`, `/gallery`, and all detail pages. Only a "Back to homepage" link is shown.
- **Possible Cause:** The `<Navigation>` component is only included in the homepage layout, not in `app/layout.tsx` (root layout).
- **Suggested Solution:** Move the `<Navigation>` component into the root layout so it renders on all pages.
- **Severity: Critical**

---

#### BUG-04: Admin Create Event Form Missing Date/Time and Description Fields

- **Actual Behavior:** The `/admin/events/new` form has no date/time input and no description field. It is impossible to set when an event takes place from the admin panel.
- **Possible Cause:** The date field was omitted from the admin form component, despite the event data model having a `date` field.
- **Suggested Solution:** Add a `datetime-local` input and a description textarea to the admin event creation/edit form.
- **Severity: Critical**

---

### MAJOR

---

#### BUG-05: No Error Message Shown on Failed Login

- **Actual Behavior:** When login fails, the API returns 400/401 but the UI shows no error — no alert, no toast, no inline message. User receives zero feedback.
- **Possible Cause:** The login form's error handler does not render any error state after a failed API response.
- **Suggested Solution:** Display a visible error message (e.g., "Invalid email or password") in the form when the API returns an error. Use `role="alert"` for accessibility.
- **Severity: Major**

---

#### BUG-06: `/admin/login` Redirects to User Login Page

- **Actual Behavior:** Navigating to `/admin/login` redirects to `/account/login` (the regular user login page) instead of an admin login interface.
- **Possible Cause:** The `/admin/login` route is consumed by middleware that redirects unauthenticated users to `/account/login` without distinguishing admin routes.
- **Suggested Solution:** Create a dedicated `/admin/login` page or ensure the admin login route is correctly registered and not overridden by the user login redirect.
- **Severity: Major**

---

#### BUG-07: Admin Routes Redirect to User Login Instead of Admin Login

- **Actual Behavior:** Visiting any `/admin/*` route unauthenticated redirects to `/account/login` instead of `/admin/login`. Confusing for admins.
- **Possible Cause:** The admin middleware redirects to `/account/login` unconditionally.
- **Suggested Solution:** Update admin middleware to redirect to `/admin/login` for all `/admin/*` routes.
- **Severity: Major**

---

#### BUG-08: All Inner Pages Have 530px Horizontal Overflow on Mobile (375px)

- **Actual Behavior:** On a 375px mobile viewport, `/events`, `/djs`, `/equipment`, and `/gallery` all have `scrollWidth = 890px` vs `clientWidth = 360px` — severe horizontal scrolling. Homepage is unaffected.
- **Possible Cause:** A fixed-width element (likely footer grid or main content grid) does not collapse on mobile. The 890px width suggests a fixed container.
- **Suggested Solution:** Add `overflow-x: hidden` to the page wrapper and audit all inner-page layouts for fixed-width elements. Use `max-w-full` and `w-full` Tailwind classes on containers.
- **Severity: Major**

---

#### BUG-09: Hero "TICKETS KAUFEN" Button Links to Wrong URL (Vercel Staging)

- **Actual Behavior:** The primary CTA button on the homepage hero links to `https://stmevents.vercel.app` instead of an Eventbrite ticket purchase URL.
- **Possible Cause:** The `eventbrite_link` field for the featured event was set to the Vercel deployment URL instead of the correct Eventbrite URL.
- **Suggested Solution:** Update the featured event's Eventbrite link to the correct ticket purchase URL in the admin panel.
- **Severity: Major**

---

#### BUG-10: Equipment Rental Inquiry Form — Silent Submission (No Feedback)

- **Actual Behavior:** After submitting the equipment rental inquiry form, the panel closes silently with no success toast, confirmation message, or error indicator.
- **Possible Cause:** The form submission handler closes the modal on completion but does not dispatch a success notification. The toast system is not triggered in this context.
- **Suggested Solution:** Show a visible success message (e.g., "Your inquiry was sent successfully!") after form submission. Show an error state on failure.
- **Severity: Major**

---

#### BUG-11: Homepage Contact Form — Silent Submission (No Feedback)

- **Actual Behavior:** Submitting the homepage contact form ("ANFRAGE SENDEN") produces no visible feedback — no toast, no success message, no error. The form remains visible and unchanged.
- **Possible Cause:** Same as BUG-10 — the submit handler calls the API but renders no UI feedback.
- **Suggested Solution:** Show a success confirmation or error message after form submission.
- **Severity: Major**

---

#### BUG-12: Main Nav Links Point to Anchor Sections, Not Dedicated Pages

- **Actual Behavior:** All main navigation links point to homepage anchor fragments (`#events`, `#gallery`, `#djs`) rather than dedicated pages (`/events`, `/gallery`, `/djs`). The actual sub-pages exist but are unreachable from the nav.
- **Possible Cause:** Navigation was built for a single-page scroll layout and links were never updated when sub-pages were created.
- **Suggested Solution:** Update nav links: EVENTS → `/events`, GALERIE → `/gallery`, DJS → `/djs`.
- **Severity: Major**

---

### MINOR

---

#### BUG-13: Stats Section Shows "0+" Placeholder Counters

- **Actual Behavior:** Homepage stats show "0+ Produzierte Events", "0K+ Begeisterte Gäste", "0+ Gefeatured Artists", "0+ Venues" — all zeroes.
- **Possible Cause:** Stats values are hardcoded as 0 or fetched from DB with no records. No admin interface found to manage these stats.
- **Suggested Solution:** Update stats with real data or add a visual editor field to manage them.
- **Severity: Minor**

---

#### BUG-14: Past Event Detail Pages Have No Ticket Button or Fallback CTA

- **Actual Behavior:** Past event pages show "Dieses Event ist vorbei" but no ticket link or useful CTA is shown at all.
- **Possible Cause:** The ticket button is conditionally hidden for past events with no fallback state.
- **Suggested Solution:** Show a disabled/informational state (e.g., "Tickets are no longer available") rather than silently removing the button.
- **Severity: Minor**

---

#### BUG-15: Gallery Only Has 2 of 5 Required Categories

- **Actual Behavior:** The `/gallery` page shows only "Alle" and "Events" filter buttons. The PDF requires: event, aftermovie, djset, bts, promo.
- **Possible Cause:** Gallery items were only uploaded under the "Events" category.
- **Suggested Solution:** Upload gallery content for the missing 4 categories via the admin panel.
- **Severity: Minor**

---

#### BUG-16: `<html lang="en">` Not Updated When Switching to German

- **Actual Behavior:** The `<html lang>` attribute stays `"en"` even when the site is displayed in German. Affects screen readers and SEO.
- **Possible Cause:** The `lang` attribute is statically set in the layout and never updated when language state changes.
- **Suggested Solution:** Dynamically update `document.documentElement.lang` when language switches, or use Next.js i18n configuration.
- **Severity: Minor**

---

#### BUG-17: Missing Descriptive Page `<title>` Tags on 6 Pages

- **Actual Behavior:** `/djs`, `/equipment`, `/impressum`, `/privacy-policy`, `/terms`, and `/account/login` all use the generic title `"STM Events"`.
- **Possible Cause:** The `metadata` export in these page files does not set a descriptive title.
- **Suggested Solution:** Add `export const metadata = { title: 'Page Name | STM Events' }` to each page file.
- **Severity: Minor**

---

#### BUG-18: SoundCloud and TikTok Social Links Are Dead (`href="#"`)

- **Actual Behavior:** SoundCloud and TikTok footer icon links both have `href="#"`. Instagram works correctly.
- **Possible Cause:** Placeholder links were added but real URLs were never filled in.
- **Suggested Solution:** Add real SoundCloud and TikTok profile URLs, or remove the icons.
- **Severity: Minor**

---

#### BUG-19: Logo Nav Link Points to `href="#"` Instead of `/`

- **Actual Behavior:** The STM Events logo in the nav has `href="#"`. On inner pages (if nav is ever fixed) it would do nothing.
- **Possible Cause:** Set to `href="#"` for single-page homepage context and never updated.
- **Suggested Solution:** Change the logo link to `href="/"`.
- **Severity: Minor**

---

#### BUG-20: Admin Visiting `/account/profile` Gets Redirected to Admin Dashboard

- **Actual Behavior:** Admin users navigating to `/account/profile` are redirected to `/admin` instead of seeing their profile. Admins cannot access their own user profile page.
- **Possible Cause:** `AccountAuthGate.tsx` detects an admin session and redirects to `/admin` without checking if the target was a specific account sub-page.
- **Suggested Solution:** Only redirect to `/admin` when accessing root `/account`, not specific sub-pages like `/account/profile`.
- **Severity: Minor**

---

#### BUG-21: Signup Form Missing Password Confirmation Field

- **Actual Behavior:** The registration form only has Name, Email, and Password — no "Confirm Password" field. Users can accidentally set a typo'd password with no detection.
- **Possible Cause:** Confirm password field was not added to the signup form component.
- **Suggested Solution:** Add a "Confirm Password" field with client-side validation checking both passwords match.
- **Severity: Minor**

---

#### BUG-22: DJ Detail Pages Have No Booking / Contact Button

- **Actual Behavior:** DJ profile pages show name, photo, genres, and social links but have no "Book this DJ" or inquiry button. No clear path for a user who wants to book a DJ.
- **Possible Cause:** A booking CTA was not added to the DJ detail page template.
- **Suggested Solution:** Add a "DJ buchen" button linking to the contact form pre-filled with "DJ Buchung" as the subject.
- **Severity: Minor**

---

## Part 3: Code Review Findings

### CRITICAL

---

#### CR-01: Account Routes Have No Server-Side Auth Protection (Client-Side Only)

- **File:** `app/account/AccountAuthGate.tsx`, `app/account/layout.tsx`
- **Issue:** Account routes (`/account/*`) rely entirely on a `"use client"` component that calls `/api/auth/me` in a `useEffect`. Auth check happens *after* the page HTML is sent to the browser. In contrast, admin routes (`app/admin/layout.tsx`) correctly use a server component with `redirect()` before rendering.
- **Root Cause:** `AccountLayout` renders `<AccountAuthGate>` (a client component) instead of performing server-side session validation. No `middleware.ts` exists.
- **Suggested Solution:** Convert `app/account/layout.tsx` to an async server component mirroring the admin layout pattern, or add a `middleware.ts` that validates Supabase session cookies for both `/account/*` and `/admin/*` routes before the page renders.
- **Severity: Critical**

---

#### CR-02: HTML Injection in All Three Email Templates

- **Files:** `app/api/book-event/route.ts:35-57`, `app/api/contact/route.ts:35-55`, `app/api/rental-inquiry/route.ts:41-88`
- **Issue:** User-supplied fields (`name`, `email`, `message`, `phone`, `requirements`, etc.) are interpolated directly into HTML strings passed to `resend.emails.send()` without any HTML escaping. A user submitting `name = <script>alert(1)</script>` or a crafted `message` will have that payload rendered in the admin's email client.
- **Root Cause:** No `escapeHtml()` helper is applied before template interpolation.
- **Suggested Solution:** Add and apply an HTML escaping function to all user-supplied values before interpolation:
  ```ts
  function escapeHtml(s: string): string {
    return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
            .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }
  ```
- **Severity: Critical**

---

#### CR-03: `/api/upload` Accessible to Any Authenticated User, Not Admin-Only

- **File:** `app/api/upload/route.ts:9-18`
- **Issue:** The authorization check only verifies the user is logged in (`if (!user) return 401`). Any registered user can upload unlimited files to Cloudinary under any folder they specify. The `folder` parameter comes from the request body with no allowlist validation.
- **Root Cause:** Admin email check (present in other routes) was omitted from the upload route.
- **Suggested Solution:** Add the admin check used in other routes:
  ```ts
  const isAdmin = user.email?.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();
  if (!isAdmin) return Response.json({ error: "Forbidden" }, { status: 403 });
  ```
  Also validate `folder` against an allowlist of known folders.
- **Severity: Critical**

---

#### CR-04: Cloudinary Signature Computed With Fragile Custom Implementation

- **File:** `app/api/upload/route.ts:34`
- **Issue:** The Cloudinary upload signature is hand-rolled as a string concatenation instead of using the official SDK. The implementation happens to work for two params but will silently produce invalid signatures if additional parameters are ever added.
- **Root Cause:** Manual implementation instead of using the `cloudinary` npm package (already in `package.json`).
- **Suggested Solution:** Use `cloudinary.utils.api_sign_request()` from the already-installed `cloudinary` SDK to generate signatures correctly.
- **Severity: Critical**

---

### MAJOR

---

#### CR-05: `/api/translate` Has No Authentication or Rate Limiting

- **File:** `app/api/translate/route.ts`
- **Issue:** Zero authentication on this endpoint. Any anonymous user can POST arbitrary text and the server proxies it to MyMemory's translation API. Since MyMemory rate-limits by server IP, abuse will exhaust the translation quota for all users.
- **Suggested Solution:** Add admin check since translation is only used inside the admin panel. Alternatively apply IP-based rate limiting using the existing rate limiter pattern.
- **Severity: Major**

---

#### CR-06: Admin Writes Performed Directly from Browser Client (No Server-Side Auth Verify)

- **Files:** `app/admin/_components/DeleteButton.tsx:11-13`, `app/admin/events/EventForm.tsx:53,72-74`, `app/admin/inquiries/page.tsx:26-39`
- **Issue:** Admin CRUD operations (delete, upsert) call the Supabase browser client directly with the anon key. Security depends entirely on RLS policies being correct. A misconfigured RLS rule would allow any authenticated user to delete or modify records.
- **Suggested Solution:** Route all write operations through API routes that perform the `isAdmin` check server-side, mirroring the pattern already used in `/api/site-content`.
- **Severity: Major**

---

#### CR-07: `next.config.ts` Image Remote Patterns Allow Any HTTPS Host

- **File:** `next.config.ts:5-10`
- **Issue:** `hostname: "**"` wildcard allows Next.js image optimizer to proxy images from *any* HTTPS URL. Can be abused for SSRF or cache exhaustion.
- **Suggested Solution:** Restrict to known hostnames:
  ```ts
  remotePatterns: [
    { protocol: "https", hostname: "res.cloudinary.com" },
  ]
  ```
- **Severity: Major**

---

#### CR-08: `ADMIN_EMAIL` Falls Back to Empty String, Breaking Admin Detection Silently

- **Files:** `app/api/auth/login/route.ts:3`, `app/api/auth/me/route.ts:3`, `app/admin/layout.tsx:6`, `app/api/site-content/route.ts:4`
- **Issue:** All four locations use `process.env.ADMIN_EMAIL || ""`. If the env var is unset, no one can ever access admin, with no error or log warning.
- **Suggested Solution:** Fail fast at startup: `if (!process.env.ADMIN_EMAIL) throw new Error("ADMIN_EMAIL environment variable is not set")`.
- **Severity: Major**

---

#### CR-09: Unescaped iframe `src` from User Input in RichTextEditor

- **File:** `app/admin/_components/RichTextEditor.tsx:88-95`
- **Issue:** The `addVideo` callback inserts a user-supplied URL directly into an `<iframe src="${url}">` string without validation. A URL containing `"` can break out of the attribute and inject HTML. Output is later rendered via `dangerouslySetInnerHTML`.
- **Suggested Solution:** Validate `url` is a valid HTTPS URL from an allowlist of known embed domains (YouTube, Vimeo). Use a proper TipTap extension for video embeds instead of raw `insertContent`.
- **Severity: Major**

---

#### CR-10: No CSRF Protection on Any API Route

- **Issue:** No middleware, no CSRF tokens, no Origin header checks. Since auth is cookie-based (Supabase SSR), a malicious third-party site can trigger admin actions (site-content update, file upload) via cross-origin POST if the admin happens to visit it.
- **Suggested Solution:** Check the `Origin` header on all state-changing API routes:
  ```ts
  const origin = request.headers.get("origin");
  if (origin !== process.env.NEXT_PUBLIC_SITE_URL) return Response.json({ error: "Forbidden" }, { status: 403 });
  ```
- **Severity: Major**

---

### MINOR

---

#### CR-11: In-Memory Rate Limiter Resets on Server Restart / Serverless Cold Start

- **File:** `app/api/auth/login/route.ts:6-8`
- **Issue:** The `attempts` Map is module-level state and is lost on every restart or serverless invocation, making the rate limiter ineffective in production.
- **Suggested Solution:** Use a persistent store (Supabase table, Upstash Redis) for rate limiting counters.
- **Severity: Minor**

---

#### CR-12: DB Errors Silently Swallowed on All Inquiry Routes

- **Files:** `app/api/book-event/route.ts:18-25`, `app/api/contact/route.ts:17-24`, `app/api/rental-inquiry/route.ts:17-31`
- **Issue:** Supabase `insert` errors are caught and ignored — the API returns `200 { success: true }` even when the submission was never saved. Inquiry data is silently lost.
- **Suggested Solution:** At minimum `console.error` the DB error. Consider returning a 500 or logging to an error tracker.
- **Severity: Minor**

---

#### CR-13: Hardcoded Admin Notification Email Address

- **Files:** `app/api/book-event/route.ts:29`, `app/api/contact/route.ts:28`, `app/api/rental-inquiry/route.ts:33`
- **Issue:** `to: "morganstanly1515@gmail.com"` is hardcoded in all three inquiry routes. Cannot be changed without a code deployment.
- **Suggested Solution:** Use `process.env.ADMIN_NOTIFY_EMAIL` instead.
- **Severity: Minor**

---

#### CR-14: `DeleteButton` Accepts Arbitrary Table Name as String

- **File:** `app/admin/_components/DeleteButton.tsx:6`
- **Issue:** `table: string` is unvalidated. If ever derived from external data, allows deletion from arbitrary Supabase tables.
- **Suggested Solution:** Type as union: `table: "events" | "djs" | "equipment" | "gallery_items"`.
- **Severity: Minor**

---

#### CR-15: `safeGetUser()` Creates Redundant Supabase Client in Catch Branch

- **File:** `lib/supabase/client.ts:26-29`
- **Issue:** Creates a second client instance in the catch block unnecessarily. The original `supabase` variable is still in scope.
- **Suggested Solution:** Reuse the existing `supabase` instance for `signOut()`.
- **Severity: Minor**

---

## Summary Tables

### E2E Test Findings

| # | Finding | Severity |
|---|---------|----------|
| BUG-01 | User login broken — valid credentials return 401 | **Critical** |
| BUG-02 | Event cards on `/events` not clickable | **Critical** |
| BUG-03 | Global navigation missing on all inner pages | **Critical** |
| BUG-04 | Admin create event form missing date/time + description | **Critical** |
| BUG-05 | No error message shown on failed login | Major |
| BUG-06 | `/admin/login` redirects to user login | Major |
| BUG-07 | Admin routes redirect to user login, not admin login | Major |
| BUG-08 | 530px horizontal overflow on inner pages at 375px mobile | Major |
| BUG-09 | Hero "TICKETS KAUFEN" links to wrong Vercel staging URL | Major |
| BUG-10 | Equipment rental inquiry — silent submission, no feedback | Major |
| BUG-11 | Homepage contact form — silent submission, no feedback | Major |
| BUG-12 | Main nav links point to anchor sections, not dedicated pages | Major |
| BUG-13 | Stats section shows "0+" placeholder counters | Minor |
| BUG-14 | Past event detail pages have no ticket button or fallback | Minor |
| BUG-15 | Gallery only has 2 of 5 required categories | Minor |
| BUG-16 | `<html lang="en">` not updated when switching to German | Minor |
| BUG-17 | Missing descriptive page `<title>` tags on 6 pages | Minor |
| BUG-18 | SoundCloud and TikTok social links dead (`href="#"`) | Minor |
| BUG-19 | Logo nav link points to `href="#"` instead of `/` | Minor |
| BUG-20 | Admin visiting `/account/profile` redirected to `/admin` | Minor |
| BUG-21 | Signup form missing password confirmation field | Minor |
| BUG-22 | DJ detail pages have no booking/contact button | Minor |

**E2E Total: 22 findings — 4 Critical, 8 Major, 10 Minor**

### Code Review Findings

| # | Finding | Severity |
|---|---------|----------|
| CR-01 | Account routes have no server-side auth (client-side only) | **Critical** |
| CR-02 | HTML injection in all three email templates | **Critical** |
| CR-03 | `/api/upload` accessible to any authenticated user | **Critical** |
| CR-04 | Cloudinary signature fragile hand-rolled implementation | **Critical** |
| CR-05 | `/api/translate` unauthenticated + no rate limiting | Major |
| CR-06 | Admin writes performed from browser client (no server auth) | Major |
| CR-07 | Image remote patterns allow any HTTPS host | Major |
| CR-08 | `ADMIN_EMAIL` falls back to empty string silently | Major |
| CR-09 | Unescaped iframe src in RichTextEditor | Major |
| CR-10 | No CSRF protection on any API route | Major |
| CR-11 | In-memory rate limiter resets on restart | Minor |
| CR-12 | DB errors silently swallowed on inquiry routes | Minor |
| CR-13 | Hardcoded admin notification email | Minor |
| CR-14 | DeleteButton accepts arbitrary table string | Minor |
| CR-15 | Redundant Supabase client in safeGetUser catch | Minor |

**Code Review Total: 15 findings — 4 Critical, 6 Major, 5 Minor**

---

## Combined Priority Fix Order

| Priority | Issue | Type | Effort |
|----------|-------|------|--------|
| 1 | CR-02: HTML injection in emails | Security | Low |
| 2 | CR-03: Upload open to all users | Security | Low |
| 3 | BUG-01: User login broken | Functional | Low |
| 4 | BUG-02: Event cards not clickable | Functional | Low |
| 5 | BUG-03: Global nav missing on inner pages | Functional | Low |
| 6 | BUG-04: Admin event form missing date/description | Functional | Low |
| 7 | CR-01: Account routes — no server-side auth | Security | Medium |
| 8 | CR-07: Wildcard image hostname | Security | Low |
| 9 | BUG-08: Mobile horizontal overflow | UI | Medium |
| 10 | BUG-12: Nav links point to anchors not pages | UX | Low |
| 11 | CR-05: /api/translate unauthenticated | Security | Low |
| 12 | BUG-09, 10, 11: Missing form feedback + wrong URLs | UX | Low |
| 13 | CR-10: No CSRF protection | Security | Medium |
| 14 | CR-13: Hardcoded admin email | Config | Low |
