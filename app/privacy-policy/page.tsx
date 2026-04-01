import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy | STM Events",
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <div className="mt-2 h-1 w-16 bg-gradient-to-r from-purple-500 to-transparent" />

          <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-white/50">
            <section>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-white/80">1. Data Collection</h2>
              <p>
                We collect personal data only when you voluntarily provide it to us, such as when you fill out a contact form,
                submit a booking or rental inquiry, or create an account. The types of data we may collect include your name,
                email address, phone number, and any other information you choose to provide.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-white/80">2. Use of Data</h2>
              <p>We use the collected data for the following purposes:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>To respond to your inquiries and requests</li>
                <li>To process event bookings and equipment rental inquiries</li>
                <li>To send relevant updates about events (only with your consent)</li>
                <li>To improve our website and services</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-white/80">3. Data Storage</h2>
              <p>
                Your data is stored securely using industry-standard encryption and security practices.
                We use Supabase for data storage and Cloudinary for media hosting. Your data is not sold
                or shared with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-white/80">4. Cookies</h2>
              <p>
                Our website uses essential cookies required for authentication and functionality.
                We do not use third-party tracking or advertising cookies.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-white/80">5. Your Rights</h2>
              <p>Under GDPR, you have the right to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-white/80">6. Contact</h2>
              <p>
                For any questions regarding your data privacy, please contact us at{" "}
                <a href="mailto:info@stmevents.com" className="text-purple-400 transition-colors hover:text-purple-300">
                  info@stmevents.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-white/80">7. Changes</h2>
              <p>
                We reserve the right to update this privacy policy at any time. Changes will be posted on this page
                with an updated effective date.
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
