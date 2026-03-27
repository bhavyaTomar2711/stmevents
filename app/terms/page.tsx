import Link from "next/link";
import Image from "next/image";

export default function TermsPage() {
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
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24 md:px-10">
          <h1 className="text-3xl font-bold uppercase tracking-wider text-white sm:text-4xl">
            Terms & Conditions
          </h1>
          <div className="mt-2 h-1 w-16 bg-gradient-to-r from-purple-500 to-transparent" />

          <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-white/50">
            <section>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-white/80">1. General</h2>
              <p>
                By accessing and using the STM Events website, you agree to be bound by these Terms & Conditions.
                If you do not agree with any part of these terms, you should not use the website.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-white/80">2. Event Bookings</h2>
              <p>
                All event bookings made through our website are subject to availability.
                We reserve the right to cancel or modify events. In case of cancellation by us,
                attendees will be notified and any applicable refunds will be processed.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-white/80">3. Equipment Rentals</h2>
              <p>Equipment rental inquiries submitted through our platform are subject to the following conditions:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>All rental prices are in EUR and may vary based on duration and availability</li>
                <li>The renter is responsible for the equipment during the rental period</li>
                <li>Any damage to equipment must be reported immediately</li>
                <li>Late returns may incur additional fees</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-white/80">4. Intellectual Property</h2>
              <p>
                All content on this website, including text, images, logos, and design, is the property of STM Events
                and is protected by copyright laws. Unauthorized reproduction or distribution is prohibited.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-white/80">5. User Accounts</h2>
              <p>
                Users are responsible for maintaining the confidentiality of their account credentials.
                You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-white/80">6. Liability</h2>
              <p>
                STM Events shall not be liable for any indirect, incidental, or consequential damages
                arising from the use of our website or services. We make no guarantees about the
                availability or accuracy of information on the website.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-white/80">7. Governing Law</h2>
              <p>
                These terms are governed by the laws of the Federal Republic of Germany.
                Any disputes shall be resolved in the courts of Berlin, Germany.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-white/80">8. Changes</h2>
              <p>
                We reserve the right to modify these Terms & Conditions at any time.
                Continued use of the website after changes constitutes acceptance of the new terms.
              </p>
            </section>
          </div>

          <div className="mt-16 border-t border-white/[0.06] pt-8">
            <p className="text-[12px] text-white/20">Last updated: March 2026</p>
          </div>
        </div>
      </main>
    </div>
  );
}
