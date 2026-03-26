import Link from "next/link";
import Image from "next/image";

export default function ImpressumPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#07070d]">
      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/[0.06] bg-[#07070d]/80 backdrop-blur-xl">
        <div className="mx-auto flex items-center justify-between px-6 py-4 md:px-10 lg:px-16">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Image
              src="https://res.cloudinary.com/dqiuwzvfb/image/upload/v1774434332/logoo_bho6qe.png"
              alt="STM Events"
              width={100}
              height={34}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-white/40 transition-colors hover:text-white/70"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Site
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="relative flex-1 px-6 py-16 sm:px-10 lg:px-16">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 60%)", filter: "blur(100px)" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 ring-1 ring-purple-500/20">
                <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white">Impressum</h1>
            </div>
            <div className="h-px bg-gradient-to-r from-purple-500/30 via-purple-500/10 to-transparent" />
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {/* Company Info */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
              <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-400/70">
                Angaben gemäß § 5 TMG
              </h2>
              <div className="space-y-2 text-[15px] leading-relaxed text-white/50">
                <p className="font-medium text-white/70">STM Events UG (haftungsbeschränkt)</p>
                <p>— Adresse wird nach Eintragung ergänzt —</p>
                <p>Berlin, Germany</p>
              </div>
            </section>

            {/* Contact */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
              <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-400/70">
                Kontakt
              </h2>
              <div className="space-y-2 text-[15px] leading-relaxed text-white/50">
                <p>E-Mail: info@stmevents.com</p>
              </div>
            </section>

            {/* Responsible */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
              <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-400/70">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <div className="space-y-2 text-[15px] leading-relaxed text-white/50">
                <p>— Wird nach Eintragung der UG ergänzt —</p>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
              <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-400/70">
                Haftungsausschluss
              </h2>
              <div className="space-y-4 text-[14px] leading-relaxed text-white/40">
                <div>
                  <h3 className="mb-1 font-medium text-white/60">Haftung für Inhalte</h3>
                  <p>
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
                    und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                  </p>
                </div>
                <div>
                  <h3 className="mb-1 font-medium text-white/60">Haftung für Links</h3>
                  <p>
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
                    Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                  </p>
                </div>
                <div>
                  <h3 className="mb-1 font-medium text-white/60">Urheberrecht</h3>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                    Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung,
                    Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
                    schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Note */}
          <div className="mt-10 rounded-xl border border-amber-500/10 bg-amber-500/[0.03] p-4">
            <p className="text-center text-[12px] text-amber-400/50">
              Diese Seite wird aktualisiert, sobald die Unternehmensregistrierung (UG) abgeschlossen ist.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.04] bg-[#07070d]">
        <div className="mx-auto flex flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row md:px-10 lg:px-16">
          <div className="flex items-center gap-3">
            <Image
              src="https://res.cloudinary.com/dqiuwzvfb/image/upload/v1774434332/logoo_bho6qe.png"
              alt="STM Events"
              width={70}
              height={24}
              className="h-5 w-auto opacity-40"
            />
            <span className="text-[11px] tracking-wider text-white/15">&copy; {new Date().getFullYear()} STM Events</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
