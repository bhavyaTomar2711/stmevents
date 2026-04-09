export type Locale = "en" | "de";

const translations = {
  // ── Navbar ──
  "nav.events": { en: "EVENTS", de: "EVENTS" },
  "nav.gallery": { en: "GALLERY", de: "GALERIE" },
  "nav.services": { en: "SERVICES", de: "LEISTUNGEN" },
  "nav.djs": { en: "DJS", de: "DJS" },
  "nav.contact": { en: "CONTACT", de: "KONTAKT" },
  "nav.equipment": { en: "EQUIPMENT", de: "EQUIPMENT" },
  "nav.myAccount": { en: "My Account", de: "Mein Konto" },
  "nav.signUp": { en: "Sign Up", de: "Registrieren" },

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
  "stats.eventsProducedValue": { en: "50+", de: "50+" },
  "stats.peopleMovedValue": { en: "10K+", de: "10K+" },
  "stats.artistsFeaturedValue": { en: "30+", de: "30+" },
  "stats.venuesValue": { en: "15+", de: "15+" },

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
  "about.image": {
    en: "https://res.cloudinary.com/dqiuwzvfb/image/upload/v1774434331/about_us_eixodf.png",
    de: "https://res.cloudinary.com/dqiuwzvfb/image/upload/v1774434331/about_us_eixodf.png",
  },
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
  "contact.emailValue": { en: "contact@stm-events.com", de: "contact@stm-events.com" },
  "contact.phoneLabel": { en: "Phone", de: "Telefon" },
  "contact.phoneValue": { en: "+49 123 456 7890", de: "+49 123 456 7890" },
  "contact.locationLabel": { en: "Location", de: "Standort" },
  "contact.locationValue": { en: "Berlin, Germany", de: "Berlin, Deutschland" },
  "contact.followUs": { en: "Follow Us", de: "Folge uns" },
  "contact.instagramUrl": { en: "https://www.instagram.com/stmevents.de?igsh=MWR6NDI3MGs3NmU4Mg%3D%3D&utm_source=qr", de: "https://www.instagram.com/stmevents.de?igsh=MWR6NDI3MGs3NmU4Mg%3D%3D&utm_source=qr" },
  "contact.tiktokUrl": { en: "#", de: "#" },
  "contact.facebookUrl": { en: "#", de: "#" },
  "contact.soundcloudUrl": { en: "#", de: "#" },
  "contact.quote": {
    en: "We don't just plan events — we engineer experiences that people remember forever.",
    de: "Wir planen nicht nur Events — wir erschaffen Erlebnisse, die für immer in Erinnerung bleiben.",
  },
  "contact.quoteAuthor": { en: "STM Events Team", de: "STM Events Team" },

  // ── Footer ──
  "footer.instagramUrl": { en: "#", de: "#" },
  "footer.tiktokUrl": { en: "#", de: "#" },
  "footer.facebookUrl": { en: "#", de: "#" },
  "footer.soundcloudUrl": { en: "#", de: "#" },
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
  "common.home": { en: "Home", de: "Startseite" },
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

  // ── DJ Detail ──
  "djDetail.allDJs": { en: "All DJs", de: "Alle DJs" },
  "djDetail.follow": { en: "Follow", de: "Folgen" },
  "djDetail.viewEvents": { en: "View Events", de: "Events ansehen" },
  "djDetail.allArtists": { en: "All Artists", de: "Alle Künstler" },

  // ── Search ──
  "search.eventsPlaceholder": { en: "Search events...", de: "Events suchen..." },
  "search.galleryPlaceholder": { en: "Search gallery...", de: "Galerie durchsuchen..." },
  "search.equipmentPlaceholder": { en: "Search equipment...", de: "Equipment suchen..." },
  "search.djsPlaceholder": { en: "Search artists...", de: "Künstler suchen..." },
  "search.noResults": { en: "No results found.", de: "Keine Ergebnisse gefunden." },

  // ── Account Shell ──
  "account.shell.title": { en: "My Account", de: "Mein Konto" },
  "account.shell.dashboard": { en: "Dashboard", de: "Dashboard" },
  "account.shell.myBookings": { en: "My Bookings", de: "Meine Buchungen" },
  "account.shell.savedEvents": { en: "Saved Events", de: "Gespeicherte Events" },
  "account.shell.myRentals": { en: "My Rentals", de: "Meine Mietanfragen" },
  "account.shell.profile": { en: "Profile", de: "Profil" },
  "account.shell.backToWebsite": { en: "Back to Website", de: "Zurück zur Website" },
  "account.shell.logout": { en: "Logout", de: "Abmelden" },

  // ── Account Dashboard ──
  "account.dashboard.welcome": { en: "Welcome back,", de: "Willkommen zurück," },
  "account.dashboard.overview": { en: "Here's your activity overview", de: "Hier ist deine Aktivitätsübersicht" },
  "account.dashboard.quickLinks": { en: "Quick Links", de: "Schnellzugriff" },
  "account.dashboard.browseEvents": { en: "Browse Events", de: "Events entdecken" },
  "account.dashboard.browseEventsDesc": { en: "Discover upcoming experiences", de: "Entdecke kommende Erlebnisse" },
  "account.dashboard.rentEquipment": { en: "Rent Equipment", de: "Equipment mieten" },
  "account.dashboard.rentEquipmentDesc": { en: "Professional sound & lighting", de: "Professioneller Sound & Licht" },
  "account.dashboard.editProfile": { en: "Edit Profile", de: "Profil bearbeiten" },
  "account.dashboard.editProfileDesc": { en: "Update your info", de: "Info aktualisieren" },

  // ── Account Status ──
  "account.status.pending": { en: "Pending", de: "Ausstehend" },
  "account.status.reviewed": { en: "Reviewed", de: "Geprüft" },
  "account.status.replied": { en: "Replied", de: "Beantwortet" },
  "account.status.submitted": { en: "Submitted", de: "Eingereicht" },

  // ── Account Bookings ──
  "account.bookings.title": { en: "My Bookings", de: "Meine Buchungen" },
  "account.bookings.subtitle": { en: "Your event booking requests", de: "Deine Eventbuchungsanfragen" },
  "account.bookings.empty": { en: "No booking requests yet", de: "Noch keine Buchungsanfragen" },
  "account.bookings.emptyDesc": { en: "Book an event to see your requests here", de: "Buche ein Event, um deine Anfragen hier zu sehen" },
  "account.bookings.browse": { en: "Browse Events", de: "Events entdecken" },
  "account.bookings.fallback": { en: "Event Booking", de: "Eventbuchung" },
  "account.bookings.yourMessage": { en: "Your Message", de: "Deine Nachricht" },

  // ── Account Rentals ──
  "account.rentals.title": { en: "My Rentals", de: "Meine Mietanfragen" },
  "account.rentals.subtitle": { en: "Your equipment rental requests", de: "Deine Equipment-Mietanfragen" },
  "account.rentals.empty": { en: "No rental requests", de: "Keine Mietanfragen" },
  "account.rentals.emptyDesc": { en: "Inquire about equipment to see your requests here", de: "Frage nach Equipment, um deine Anfragen hier zu sehen" },
  "account.rentals.browse": { en: "Browse Equipment", de: "Equipment entdecken" },
  "account.rentals.fallback": { en: "Equipment Rental", de: "Equipment-Miete" },
  "account.rentals.requirements": { en: "Requirements", de: "Anforderungen" },

  // ── Account Saved Events ──
  "account.saved.title": { en: "Saved Events", de: "Gespeicherte Events" },
  "account.saved.subtitle": { en: "Events you're interested in", de: "Events, die dich interessieren" },
  "account.saved.empty": { en: "No saved events", de: "Keine gespeicherten Events" },
  "account.saved.emptyDesc": { en: "Save events you're interested in", de: "Speichere Events, die dich interessieren" },
  "account.saved.discover": { en: "Discover Events", de: "Events entdecken" },
  "account.saved.viewEvent": { en: "View Event", de: "Event ansehen" },
  "account.saved.remove": { en: "Remove", de: "Entfernen" },

  // ── Account Profile ──
  "account.profile.title": { en: "Profile", de: "Profil" },
  "account.profile.subtitle": { en: "Manage your personal information", de: "Verwalte deine persönlichen Daten" },
  "account.profile.yourName": { en: "Your Name", de: "Dein Name" },
  "account.profile.fullName": { en: "Full Name", de: "Vollständiger Name" },
  "account.profile.emailNote": { en: "Email cannot be changed for security reasons.", de: "E-Mail kann aus Sicherheitsgründen nicht geändert werden." },
  "account.profile.phone": { en: "Phone", de: "Telefon" },
  "account.profile.bio": { en: "Bio", de: "Bio" },
  "account.profile.bioPlaceholder": { en: "Tell us about yourself...", de: "Erzähl uns von dir..." },
  "account.profile.saving": { en: "Saving...", de: "Wird gespeichert..." },
  "account.profile.saveChanges": { en: "Save Changes", de: "Änderungen speichern" },
  "account.profile.saved": { en: "Profile updated!", de: "Profil aktualisiert!" },

  // ── Account Login ──
  "account.login.welcomeBack": { en: "Welcome Back", de: "Willkommen zurück" },
  "account.login.createAccount": { en: "Create Account", de: "Konto erstellen" },
  "account.login.forgotPassword": { en: "Forgot Password", de: "Passwort vergessen" },
  "account.login.signInSub": { en: "Sign in to your account", de: "Melde dich bei deinem Konto an" },
  "account.login.createSub": { en: "Join the STM Events community", de: "Werde Teil der STM Events Community" },
  "account.login.forgotSub": { en: "Enter your email to receive a reset link", de: "Gib deine E-Mail ein, um einen Reset-Link zu erhalten" },
  "account.login.fullName": { en: "Full Name", de: "Vollständiger Name" },
  "account.login.namePlaceholder": { en: "Your name", de: "Dein Name" },
  "account.login.email": { en: "Email", de: "E-Mail" },
  "account.login.confirmPassword": { en: "Confirm Password", de: "Passwort bestätigen" },
  "account.login.confirmPasswordPlaceholder": { en: "Repeat password", de: "Passwort wiederholen" },
  "account.login.passwordMismatch": { en: "Passwords do not match.", de: "Passwörter stimmen nicht überein." },
  "account.login.emailPlaceholder": { en: "you@example.com", de: "du@beispiel.de" },
  "account.login.password": { en: "Password", de: "Passwort" },
  "account.login.forgotLink": { en: "Forgot password?", de: "Passwort vergessen?" },
  "account.login.signingIn": { en: "Signing in...", de: "Anmelden..." },
  "account.login.signIn": { en: "Sign In", de: "Anmelden" },
  "account.login.creating": { en: "Creating...", de: "Erstellen..." },
  "account.login.create": { en: "Create Account", de: "Konto erstellen" },
  "account.login.sending": { en: "Sending...", de: "Senden..." },
  "account.login.sendReset": { en: "Send Reset Link", de: "Reset-Link senden" },
  "account.login.backToSignIn": { en: "Back to sign in", de: "Zurück zum Anmelden" },
  "account.login.noAccount": { en: "Don't have an account?", de: "Kein Konto?" },
  "account.login.signUp": { en: "Sign up", de: "Registrieren" },
  "account.login.haveAccount": { en: "Already have an account?", de: "Bereits ein Konto?" },
  "account.login.signInLink": { en: "Sign in", de: "Anmelden" },
  "account.login.backToSite": { en: "Back to Site", de: "Zurück zur Website" },
  "account.login.bookEvents": { en: "Book Events", de: "Events buchen" },
  "account.login.saveFavorites": { en: "Save Favorites", de: "Favoriten speichern" },
  "account.login.rentGear": { en: "Rent Gear", de: "Equipment mieten" },
  "account.login.resetSent": { en: "Password reset link sent! Check your email inbox.", de: "Passwort-Reset-Link gesendet! Bitte prüfe dein E-Mail-Postfach." },
  "account.login.accountCreated": { en: "Account created! You can now sign in.", de: "Konto erstellt! Du kannst dich jetzt anmelden." },
  "account.login.error": { en: "Something went wrong. Please try again.", de: "Etwas ist schiefgelaufen. Bitte versuche es erneut." },
} as const;

export type TranslationKey = keyof typeof translations;
export default translations;
