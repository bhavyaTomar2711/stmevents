export type Locale = "en" | "de";

const translations = {
  // ── Navbar ──
  "nav.events": { en: "EVENTS", de: "EVENTS" },
  "nav.gallery": { en: "GALLERY", de: "GALERIE" },
  "nav.services": { en: "SERVICES", de: "LEISTUNGEN" },
  "nav.djs": { en: "DJS", de: "DJS" },
  "nav.contact": { en: "CONTACT", de: "KONTAKT" },
  "nav.myAccount": { en: "My Account", de: "Mein Konto" },

  // ── Hero ──
  "hero.nextEvent": { en: "NEXT EVENT", de: "NÄCHSTES EVENT" },
  "hero.experience": { en: "EXPERIENCE", de: "ERLEBE" },
  "hero.theUnderground": { en: "THE UNDERGROUND", de: "DEN UNDERGROUND" },
  "hero.getTickets": { en: "GET TICKETS", de: "TICKETS KAUFEN" },
  "hero.stayTuned": { en: "Stay tuned — new events coming soon.", de: "Bleibt dran — neue Events kommen bald." },

  // ── Stats Bar ──
  "stats.eventsProduced": { en: "Events Produced", de: "Produzierte Events" },
  "stats.peopleMoved": { en: "People Moved", de: "Begeisterte Gäste" },
  "stats.artistsFeatured": { en: "Artists Featured", de: "Gefeatured Artists" },
  "stats.venues": { en: "Venues", de: "Venues" },

  // ── Upcoming Events ──
  "events.label": { en: "Upcoming Experiences", de: "Kommende Erlebnisse" },
  "events.heading1": { en: "UPCOMING", de: "KOMMENDE" },
  "events.heading2": { en: "EVENTS", de: "EVENTS" },
  "events.description": {
    en: "Discover our next underground experiences and immersive nights.",
    de: "Entdecke unsere nächsten Underground-Erlebnisse und immersiven Nächte.",
  },
  "events.viewAll": { en: "View All Events", de: "Alle Events ansehen" },

  // ── Event Card ──
  "eventCard.tickets": { en: "Tickets", de: "Tickets" },
  "eventCard.soldOut": { en: "Sold Out", de: "Ausverkauft" },
  "eventCard.limited": { en: "Limited", de: "Begrenzt" },
  "eventCard.finalRelease": { en: "Final Release", de: "Letzte Tickets" },
  "eventCard.comingSoon": { en: "Coming Soon", de: "Bald verfügbar" },

  // ── Event Detail ──
  "eventDetail.allEvents": { en: "All Events", de: "Alle Events" },
  "eventDetail.lineup": { en: "Lineup", de: "Lineup" },
  "eventDetail.getTickets": { en: "Get Tickets", de: "Tickets kaufen" },
  "eventDetail.soldOut": { en: "Sold Out", de: "Ausverkauft" },
  "eventDetail.bookEvent": { en: "Book This Event", de: "Event buchen" },
  "eventDetail.eventEnded": { en: "This Event Has Ended", de: "Dieses Event ist vorbei" },
  "eventDetail.browseUpcoming": { en: "Browse Upcoming Events", de: "Kommende Events ansehen" },
  "eventDetail.liveMusic": { en: "Live Music", de: "Live Musik" },
  "eventDetail.immersiveVisuals": { en: "Immersive Visuals", de: "Immersive Visuals" },
  "eventDetail.premiumSound": { en: "Premium Sound", de: "Premium Sound" },
  "eventDetail.exclusiveVibes": { en: "Exclusive Vibes", de: "Exklusive Vibes" },
  "eventDetail.moreExperiences": { en: "Discover more underground experiences", de: "Entdecke mehr Underground-Erlebnisse" },
  "eventDetail.secureCheckout": {
    en: "Secure checkout powered by Eventbrite",
    de: "Sicherer Checkout über Eventbrite",
  },
  "eventDetail.shareEvent": { en: "Share Event", de: "Event teilen" },
  "eventDetail.copyLink": { en: "Copy Link", de: "Link kopieren" },

  // ── Event CTA Sticky ──
  "cta.limitedTickets": { en: "Limited Tickets", de: "Begrenzte Tickets" },
  "cta.finalRelease": { en: "Final Release", de: "Letzte Tickets" },
  "cta.poweredBy": { en: "Powered by Eventbrite", de: "Über Eventbrite" },
  "cta.getTickets": { en: "Get Tickets", de: "Tickets kaufen" },

  // ── Gallery ──
  "gallery.label": { en: "The Experience", de: "Das Erlebnis" },
  "gallery.heading1": { en: "STEP INSIDE", de: "TAUCHE EIN IN" },
  "gallery.heading2": { en: "THE NIGHT", de: "DIE NACHT" },
  "gallery.description": {
    en: "A glimpse into the energy, lights, and moments that define STM Events.",
    de: "Ein Blick in die Energie, Lichter und Momente, die STM Events ausmachen.",
  },
  "gallery.viewAll": { en: "Explore Full Gallery", de: "Gesamte Galerie ansehen" },

  // ── Resident DJs ──
  "djs.label": { en: "Resident DJs", de: "Resident DJs" },
  "djs.heading1": { en: "MEET THE", de: "UNSERE" },
  "djs.heading2": { en: "ARTISTS", de: "KÜNSTLER" },
  "djs.description": {
    en: "The sound behind the experience.",
    de: "Der Sound hinter dem Erlebnis.",
  },
  "djs.viewAll": { en: "View All DJs", de: "Alle DJs ansehen" },

  // ── Equipment ──
  "equipment.label": { en: "Equipment Rentals", de: "Equipment Vermietung" },
  "equipment.heading1": { en: "Professional", de: "Professionelles" },
  "equipment.heading2": { en: "Sound & Lighting", de: "Sound & Licht" },
  "equipment.description": {
    en: "High-performance gear designed to elevate every event. No direct online booking — contact us for availability and custom packages.",
    de: "Hochleistungsgeräte für jedes Event. Keine Online-Buchung — kontaktiere uns für Verfügbarkeit und individuelle Pakete.",
  },
  "equipment.unavailable": { en: "Unavailable", de: "Nicht verfügbar" },
  "equipment.details": { en: "Details", de: "Details" },
  "equipment.customSetup": {
    en: "Need a custom setup? We build tailored sound and lighting packages for events of any scale.",
    de: "Individuelle Lösung gesucht? Wir erstellen maßgeschneiderte Sound- und Lichtpakete für Events jeder Größe.",
  },
  "equipment.viewAll": { en: "View All Equipment", de: "Gesamtes Equipment ansehen" },
  "equipment.getQuote": { en: "Get a Custom Quote", de: "Individuelles Angebot" },

  // ── Services ──
  "services.label": { en: "Services", de: "Leistungen" },
  "services.heading1": { en: "What We", de: "Was wir" },
  "services.heading2": { en: "Offer", de: "bieten" },
  "services.description": {
    en: "From curated DJ lineups to full-scale event production.",
    de: "Von kuratierten DJ-Lineups bis zur Full-Scale-Eventproduktion.",
  },
  "services.djBookings": { en: "DJ Bookings", de: "DJ Buchungen" },
  "services.djBookingsDesc": {
    en: "Curated DJ lineups featuring top-tier underground and mainstream talent, tailored to your crowd and vision.",
    de: "Kuratierte DJ-Lineups mit erstklassigem Underground- und Mainstream-Talent, abgestimmt auf euer Publikum.",
  },
  "services.privateEvents": { en: "Private Events", de: "Private Events" },
  "services.privateEventsDesc": {
    en: "Exclusive, invite-only experiences designed for high-end clients — from luxury launches to private celebrations.",
    de: "Exklusive, einladungsbeschränkte Erlebnisse für anspruchsvolle Kunden — von Luxus-Launches bis zu privaten Feiern.",
  },
  "services.clubEvents": { en: "Club Events", de: "Club Events" },
  "services.clubEventsDesc": {
    en: "High-energy club nights with immersive production, cutting-edge sound, and atmospheres that keep people moving.",
    de: "Energiegeladene Clubnächte mit immersiver Produktion, modernstem Sound und Atmosphären, die bewegen.",
  },
  "services.eventProduction": { en: "Event Production", de: "Event Produktion" },
  "services.eventProductionDesc": {
    en: "Full-scale event production — lighting, sound, stage design, and visuals engineered for maximum impact.",
    de: "Full-Scale-Eventproduktion — Licht, Sound, Bühnendesign und Visuals für maximale Wirkung.",
  },
  "services.learnMore": { en: "Learn more", de: "Mehr erfahren" },
  "services.tagline": { en: "Tailored to your vision", de: "Auf eure Vision zugeschnitten" },

  // ── About ──
  "about.label": { en: "About STM Events", de: "Über STM Events" },
  "about.heading": {
    en: "Creating underground experiences that",
    de: "Underground-Erlebnisse schaffen, die",
  },
  "about.headingHighlight": { en: "move", de: "bewegen" },
  "about.headingEnd": { en: "people", de: "" },
  "about.p1": {
    en: "STM Events is more than just nightlife — it's a curated journey into sound, energy, and connection. We craft immersive experiences where music, visuals, and atmosphere collide to create unforgettable nights.",
    de: "STM Events ist mehr als nur Nachtleben — es ist eine kuratierte Reise in Sound, Energie und Verbindung. Wir schaffen immersive Erlebnisse, in denen Musik, Visuals und Atmosphäre zu unvergesslichen Nächten verschmelzen.",
  },
  "about.p2": {
    en: "From warehouse raves to intimate club sets, every event is designed to blur the line between artist and audience. No barriers. No boundaries. Just raw, unfiltered energy.",
    de: "Von Warehouse-Raves bis zu intimen Club-Sets — jedes Event verwischt die Grenze zwischen Künstler und Publikum. Keine Barrieren. Keine Grenzen. Nur rohe, ungefilterte Energie.",
  },
  "about.est": { en: "Est. 2023", de: "Gegr. 2023" },

  // ── Contact ──
  "contact.label": { en: "Get In Touch", de: "Kontakt aufnehmen" },
  "contact.heading1": { en: "LET'S CREATE", de: "LASS UNS" },
  "contact.heading2": { en: "YOUR NEXT EVENT", de: "DEIN NÄCHSTES EVENT GESTALTEN" },
  "contact.description": {
    en: "From underground nights to full-scale productions — we bring your vision to life.",
    de: "Von Underground-Nächten bis zu Full-Scale-Produktionen — wir bringen eure Vision zum Leben.",
  },
  "contact.name": { en: "Name", de: "Name" },
  "contact.namePlaceholder": { en: "Your name", de: "Dein Name" },
  "contact.email": { en: "Email", de: "E-Mail" },
  "contact.emailPlaceholder": { en: "your@email.com", de: "deine@email.com" },
  "contact.subject": { en: "Subject", de: "Betreff" },
  "contact.eventBooking": { en: "Event Booking", de: "Event Buchung" },
  "contact.djBooking": { en: "DJ Booking", de: "DJ Buchung" },
  "contact.equipmentRental": { en: "Equipment Rental", de: "Equipment Miete" },
  "contact.generalInquiry": { en: "General Inquiry", de: "Allgemeine Anfrage" },
  "contact.message": { en: "Message", de: "Nachricht" },
  "contact.messagePlaceholder": {
    en: "Tell us about your event or inquiry...",
    de: "Erzähl uns von deinem Event oder deiner Anfrage...",
  },
  "contact.send": { en: "SEND INQUIRY", de: "ANFRAGE SENDEN" },
  "contact.sending": { en: "SENDING...", de: "SENDEN..." },
  "contact.sent": { en: "SENT SUCCESSFULLY !", de: "ERFOLGREICH GESENDET !" },
  "contact.emailLabel": { en: "Email", de: "E-Mail" },
  "contact.phoneLabel": { en: "Phone", de: "Telefon" },
  "contact.locationLabel": { en: "Location", de: "Standort" },
  "contact.followUs": { en: "Follow Us", de: "Folge uns" },
  "contact.quote": {
    en: "We don't just plan events — we engineer experiences that people remember forever.",
    de: "Wir planen nicht nur Events — wir erschaffen Erlebnisse, die für immer in Erinnerung bleiben.",
  },
  "contact.quoteAuthor": { en: "STM Events Team", de: "STM Events Team" },

  // ── Footer ──
  "footer.rights": { en: "All rights reserved.", de: "Alle Rechte vorbehalten." },
  "footer.tagline": {
    en: "Crafting immersive underground experiences where music, visuals, and atmosphere collide to create unforgettable nights.",
    de: "Immersive Underground-Erlebnisse, in denen Musik, Visuals und Atmosphäre zu unvergesslichen Nächten verschmelzen.",
  },
  "footer.quickLinks": { en: "Quick Links", de: "Quick Links" },
  "footer.contactUs": { en: "Contact", de: "Kontakt" },
  "footer.madeWith": { en: "Designed & built for the underground.", de: "Designed & gebaut für den Underground." },

  // ── Countdown ──
  "countdown.days": { en: "DAYS", de: "TAGE" },
  "countdown.hours": { en: "HOURS", de: "STD" },
  "countdown.minutes": { en: "MINUTES", de: "MIN" },
  "countdown.seconds": { en: "SECONDS", de: "SEK" },

  // ── Shared / Subpages ──
  "common.backToHome": { en: "Back to Home", de: "Zurück zur Startseite" },
  "common.noItems": { en: "No items in this category yet.", de: "Noch keine Einträge in dieser Kategorie." },
  "common.resident": { en: "Resident", de: "Resident" },

  // ── Gallery Page ──
  "galleryPage.label": { en: "The Experience", de: "Das Erlebnis" },
  "galleryPage.heading": { en: "GALLERY", de: "GALERIE" },
  "galleryPage.description": {
    en: "Photos, videos, and moments from our underground experiences.",
    de: "Fotos, Videos und Momente unserer Underground-Erlebnisse.",
  },
  "galleryPage.filterAll": { en: "All", de: "Alle" },
  "galleryPage.filterEvents": { en: "Events", de: "Events" },
  "galleryPage.filterAftermovies": { en: "Aftermovies", de: "Aftermovies" },
  "galleryPage.filterDJSets": { en: "DJ Sets", de: "DJ Sets" },
  "galleryPage.filterBTS": { en: "Behind the Scenes", de: "Hinter den Kulissen" },
  "galleryPage.filterPromo": { en: "Promo", de: "Promo" },
  "galleryPage.from": { en: "from", de: "von" },

  // ── Events Page ──
  "eventsPage.label": { en: "All Events", de: "Alle Events" },
  "eventsPage.heading": { en: "EVENTS", de: "EVENTS" },
  "eventsPage.description": {
    en: "Discover upcoming nights and immersive underground experiences.",
    de: "Entdecke kommende Nächte und immersive Underground-Erlebnisse.",
  },

  // ── Equipment Page ──
  "equipmentPage.label": { en: "Equipment Catalog", de: "Equipment Katalog" },
  "equipmentPage.heading": { en: "EQUIPMENT", de: "EQUIPMENT" },
  "equipmentPage.description": {
    en: "Professional sound, lighting, and DJ gear available for rental. Contact us for availability and custom packages.",
    de: "Professionelles Sound-, Licht- und DJ-Equipment zum Mieten. Kontaktiere uns für Verfügbarkeit und individuelle Pakete.",
  },
  "equipmentPage.noItems": { en: "No equipment in this category yet.", de: "Noch kein Equipment in dieser Kategorie." },
  "equipmentPage.filterAll": { en: "All", de: "Alle" },
  "equipmentPage.filterDJGear": { en: "DJ Gear", de: "DJ Gear" },
  "equipmentPage.filterSound": { en: "Sound", de: "Sound" },
  "equipmentPage.filterLighting": { en: "Lighting", de: "Licht" },
  "equipmentPage.filterStage": { en: "Stage", de: "Bühne" },
  "equipmentPage.filterEffects": { en: "Effects", de: "Effekte" },

  // ── Booking Modal ──
  "booking.label": { en: "Request Booking", de: "Buchung anfragen" },
  "booking.name": { en: "Name", de: "Name" },
  "booking.namePlaceholder": { en: "Your full name", de: "Dein vollständiger Name" },
  "booking.email": { en: "Email", de: "E-Mail" },
  "booking.emailPlaceholder": { en: "your@email.com", de: "deine@email.com" },
  "booking.phone": { en: "Phone (optional)", de: "Telefon (optional)" },
  "booking.phonePlaceholder": { en: "+49 123 456 789", de: "+49 123 456 789" },
  "booking.message": { en: "Message", de: "Nachricht" },
  "booking.messagePlaceholder": {
    en: "Tell us about your event — date, location, expected guests...",
    de: "Erzähl uns von deinem Event — Datum, Location, erwartete Gäste...",
  },
  "booking.submit": { en: "Send Request", de: "Anfrage senden" },
  "booking.sending": { en: "Sending...", de: "Wird gesendet..." },
  "booking.successTitle": { en: "Request Sent!", de: "Anfrage gesendet!" },
  "booking.successMessage": {
    en: "We'll get back to you within 24 hours.",
    de: "Wir melden uns innerhalb von 24 Stunden.",
  },
  "booking.error": {
    en: "Something went wrong. Please try again.",
    de: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
  },

  // ── Rental Modal ──
  "rental.label": { en: "Inquire About Rental", de: "Mietanfrage" },
  "rental.name": { en: "Name", de: "Name" },
  "rental.namePlaceholder": { en: "Your full name", de: "Dein vollständiger Name" },
  "rental.email": { en: "Email", de: "E-Mail" },
  "rental.emailPlaceholder": { en: "your@email.com", de: "deine@email.com" },
  "rental.phone": { en: "Phone", de: "Telefon" },
  "rental.phonePlaceholder": { en: "+49 123 456 789", de: "+49 123 456 789" },
  "rental.date": { en: "Rental Date", de: "Mietdatum" },
  "rental.duration": { en: "Duration", de: "Dauer" },
  "rental.durationPlaceholder": { en: "e.g. 1 day / 5 hours", de: "z.B. 1 Tag / 5 Stunden" },
  "rental.location": { en: "Location", de: "Standort" },
  "rental.locationPlaceholder": { en: "Event venue or address", de: "Veranstaltungsort oder Adresse" },
  "rental.requirements": { en: "Additional Requirements (optional)", de: "Zusätzliche Anforderungen (optional)" },
  "rental.requirementsPlaceholder": {
    en: "Any special setup needs, delivery instructions...",
    de: "Besondere Aufbauanforderungen, Lieferhinweise...",
  },
  "rental.submit": { en: "Submit Inquiry", de: "Anfrage senden" },
  "rental.sending": { en: "Sending...", de: "Wird gesendet..." },
  "rental.successTitle": { en: "Inquiry Sent!", de: "Anfrage gesendet!" },
  "rental.successMessage": {
    en: "We'll get back to you with availability and pricing.",
    de: "Wir melden uns mit Verfügbarkeit und Preisen.",
  },
  "rental.error": {
    en: "Something went wrong. Please try again.",
    de: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
  },
  "rental.allEquipment": { en: "Browse All Equipment", de: "Gesamtes Equipment ansehen" },
  "rental.inquire": { en: "Inquire About Rental", de: "Mietanfrage stellen" },
  "rental.unavailable": { en: "Currently Unavailable", de: "Derzeit nicht verfügbar" },
  "rental.description": { en: "Description", de: "Beschreibung" },
  "rental.specifications": { en: "Specifications", de: "Spezifikationen" },

  // ── DJs Page ──
  "djsPage.label": { en: "The Artists", de: "Die Künstler" },
  "djsPage.heading": { en: "DJS", de: "DJS" },
  "djsPage.description": {
    en: "The sound behind every STM Events experience.",
    de: "Der Sound hinter jedem STM Events Erlebnis.",
  },
} as const;

export type TranslationKey = keyof typeof translations;
export default translations;
