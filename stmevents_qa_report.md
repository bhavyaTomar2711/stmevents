# STM Events Web Application - QA Testing Report

**URL Tested**: [https://stmevents.vercel.app/](https://stmevents.vercel.app/)  
**Date of Testing**: April 3, 2026  
**Focus Areas**: Admin Dashboard capabilities, User Panel functionality, Feature Validation, Authentication & Security, and general UX.  

## Table of Contents
1. [Overview](#1-overview)
2. [Role-Specific Findings](#2-role-specific-findings)
    - [Admin Role](#admin-role)
    - [User Role](#user-role)
3. [Global UI/UX & Performance Issues](#3-global-uiux--performance-issues)
4. [Summary of Critical Action Items](#4-summary-of-critical-action-items)

---

## 1. Overview
Comprehensive testing was conducted on the STM Events platform. This involved testing all accessible modules within the **Admin** panel (using the provided credentials) and then subsequently creating a brand new **User** account from scratch to evaluate the public-facing booking flow and user dashboard (`/account`).

While the user interface is modern and visually appealing, several fundamental functionalities involving database persistence (saving, deleting, creating) are significantly broken across both roles.

---

## 2. Role-Specific Findings

### Admin Role
**Account**: `admin123@gmail.com`
The Admin acts as the primary curator for events, equipment, resident DJs, and the visual structure of the homepage.

**✅ What is Working:**
*   **Dashboard Insights**: Successfully loads aggregate metric cards (Total Events, Galleries, Messages).
*   **Minor Modules**: Equipment lists, Resident DJ management, and marking inquiries as read/replied function properly.

**🛑 Bugs & Issues Discovered:**
> [!CAUTION]
> **Event Date Corruption**  
> Creating or editing an event fails to persist the explicitly chosen date. No matter what is selected in the date picker, the platform saves the event date as **January 1, 1970**.
>
> **Broken Deletion Triggers**  
> Deleting entities is globally impaired. The "Delete" button inside both the **Events** view and **Contacts/Inquiries** view is totally unresponsive. It does not spawn a modal, nor does it fire a successful network request.
> 
> **Visual Editor Save State Hangs**  
> When editing the frontend website text (e.g., Hero headings) via the Visual Editor, pressing "Publish" causes the button to hang indefinitely on a "Saving..." state. Changes never push to the live environment.

**UX Observations:**
- The "Add Event" form is structurally unwieldy. 
- There is no central "User Management" module for the Admin to view registered customers.


### User Role
**Created Account**: `qatester_stm2@gmail.com`
The User profile allows guests to save events, book tickets, and issue equipment rental requests.

**✅ What is Working:**
*   **Security Validation**: Navigating directly to `/admin` as a standard user correctly redirects the session back to `/account`, proving access controls are working over sensitive routes.
*   **Account Generation & Auth**: Successful standard signup flow and authentication process.
*   **Gallery Inspection**: Full functionality checking out past event photos.

**🛑 Bugs & Issues Discovered:**
> [!WARNING]
> **"Save Event" Fails to Persist**  
> Users can click "Save Event" on an event's details page, but the action does not sync with the user's dashboard. The "Saved Events" counter constantly remains at 0, demonstrating a failure to write to the user's saved list in the database.
>
> **Unbookable Events**  
> The homepage displays a "BOOK THIS EVENT" or "GET TICKETS" button on event cards. However, once a user clicks into the specific event's dedicated detail page, the call-to-action button to finalize the internal booking is completely missing.
> 
> **Equipment Rental Lockout**  
> On public views, equipment cards display a proper rental inquiry button ("Mietanfrage senden"). Paradoxically, once a user logs into their account, this exact button disappears, effectively locking logged-in users out from requesting rental gear.

**UX Observations:**
- **Language Persistence:** The platform automatically reverts to German (`de`) constantly—particularly when switching modules or completing an auth cycle—even if the user explicitly toggles to English.
- User Dashboard counters (Rentals, Bookings, Saved) are visually static out-of-the-box and remain `0` due to the bugs listed above.

---

## 3. Global UI/UX & Performance Issues
1. **Broken Persistence Pipelines:** The application can query data effectively (events show up) but struggles heavily with `POST`, `PUT`, and `DELETE` requests in its current build, suggesting an API/Supabase schema discrepancy or client-side handler failures.
2. **Missing UI Linking:** Call-to-action endpoints (like initiating an event purchase or finalizing a rental from the details view) are physically absent from the Document Object Model (DOM) for logged-in users.

---

## 4. Summary of Critical Action Items
1.  **Investigate Event Date Binding**: Fix the React state/form payload so that the date-picker accurately posts the configured date instead of Unix Epoch `0` (`Jan 1, 1970`).
2.  **Fix Deletion Endpoints**: Attach valid `onClick` handlers to the delete buttons in the Admin Events and Messages lists, ensuring they trigger confirmation modals and valid database DELETE requests.
3.  **Restore User Call-to-Actions**: 
    *   Bring the specific "Book Event" button back to the Event Details page. 
    *   Stop hiding the "Send Rental Request" button for authenticated users inside the Equipment view.
4.  **Save Feature / Dashboard Counters**: Hook up the "Save Event" user action to the appropriate backend table, and ensure the `/account` dashboard counters react dynamically to user data.
5.  **Visual Editor Fix**: Inspect the publishing payload and API response. The frontend is not receiving the `200 OK` required to switch the button out of its `isSubmitting` state.
