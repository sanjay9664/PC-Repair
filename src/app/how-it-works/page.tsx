import type { Metadata } from "next";
import Link from "next/link";
import ContactFooter from "@/components/ContactFooter";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import ProcessSection from "@/components/ProcessSection";
import { BUSINESS_INFO } from "@/data/services";

export const metadata: Metadata = {
  title: "How It Works | A M Hardware & Software Services at Doorstep",
  description:
    "Step-by-step doorstep computer repair process, location-based visit charge policy, and Noida / Ghaziabad coverage.",
};

const VISIT_CHECKLIST = [
  "On-spot inspection of your laptop, desktop PC, or peripheral right in front of you",
  "Clear explanation of the fault and repair/part estimate before any replacement",
  "Full functionality check (power, display, keyboard, ports, audio, Wi-Fi) after repair",
  "Pay directly via UPI or Cash only after work is completed",
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          kicker="How Doorstep Service Works"
          title="Simple, Transparent On-Site Repair Process"
          description="No advance fees or complicated portals—send your query via WhatsApp or Email, confirm your location visit fee, and get fixed at your doorstep."
          currentPage="How It Works"
          bgImage="/images/service-software-os.jpg"
        />

        <ProcessSection />

        <section className="py-5">
          <div className="container py-lg-3">
            <div className="row g-4 align-items-stretch">
              <div className="col-lg-6">
                <div className="am-card h-100 p-4 p-md-5">
                  <span className="am-section-kicker">Visit &amp; Pricing Policy</span>
                  <h2 className="h4 fw-bold mb-3">
                    Why Visit Charges Are Confirmed By Location
                  </h2>
                  <p className="text-secondary mb-3">
                    Instead of charging a flat high rate for everyone, our visit
                    and diagnosis charge is tailored to your exact sector or
                    locality across Noida, Ghaziabad, and Vijay Nagar.
                  </p>
                  <div className="p-3 rounded-3 bg-primary bg-opacity-10 border border-primary border-opacity-25 text-dark small mb-4">
                    <i className="bi bi-info-circle-fill text-primary me-2"></i>
                    {BUSINESS_INFO.visitNote}
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <Link href="/book-service" className="btn btn-am-primary">
                      Book Doorstep Visit
                    </Link>
                    <Link href="/track" className="btn btn-am-outline">
                      View Service Areas
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="am-card h-100 p-4 p-md-5">
                  <span className="am-section-kicker">At Your Doorstep</span>
                  <h2 className="h4 fw-bold mb-3">
                    What Happens During the Visit
                  </h2>
                  <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                    {VISIT_CHECKLIST.map((point) => (
                      <li className="d-flex align-items-start gap-3" key={point}>
                        <span
                          className="am-icon-box am-icon-primary flex-shrink-0"
                          style={{ width: 34, height: 34, fontSize: "1rem" }}
                        >
                          <i className="bi bi-check2"></i>
                        </span>
                        <span className="text-secondary">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ContactFooter />
    </>
  );
}

