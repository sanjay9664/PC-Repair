import Link from "next/link";
import { BUSINESS_INFO } from "@/data/services";
import { buildMailtoUrl, buildWhatsAppUrl } from "@/utils/inquiry";

export default function ContactFooter() {
  const whatsappUrl = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.brandName}, I need laptop/desktop repair help.`
  );
  const mailtoUrl = buildMailtoUrl(
    "Doorstep Repair Inquiry",
    `Hello ${BUSINESS_INFO.brandName},\n\nI would like to inquire about a doorstep repair visit.\nArea:\nDevice & Issue:\nPhone:`
  );

  return (
    <>
      {/* Contact CTA Banner */}
      <section id="contact" className="am-cta-banner py-5">
        <div className="container py-3 text-center">
          <span className="badge rounded-pill bg-white text-primary fw-bold px-3 py-2 mb-3">
            Need Help Right Now?
          </span>
          <h2 className="fw-bold display-6 mb-2">
            Speak Directly With Our Technician Desk
          </h2>
          <p className="opacity-75 mx-auto mb-4" style={{ maxWidth: "600px" }}>
            Call, WhatsApp, or email us for laptop, desktop PC, peripheral, and
            software support across Noida, Ghaziabad, and Vijay Nagar.
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
            <a
              href={`tel:${BUSINESS_INFO.primaryPhone}`}
              className="btn btn-light text-primary fw-bold rounded-3 px-4 py-2 d-inline-flex align-items-center gap-2"
            >
              <i className="bi bi-telephone-fill"></i>
              <span>{BUSINESS_INFO.primaryPhone}</span>
            </a>

            <a
              href={`tel:${BUSINESS_INFO.secondaryPhone}`}
              className="btn btn-light text-primary fw-bold rounded-3 px-4 py-2 d-inline-flex align-items-center gap-2"
            >
              <i className="bi bi-telephone-fill"></i>
              <span>{BUSINESS_INFO.secondaryPhone}</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-am-whatsapp px-4 py-2 d-inline-flex align-items-center gap-2"
            >
              <i className="bi bi-whatsapp"></i>
              <span>WhatsApp Now</span>
            </a>

            <a
              href={mailtoUrl}
              className="btn btn-outline-light fw-bold rounded-3 px-4 py-2 d-inline-flex align-items-center gap-2"
            >
              <i className="bi bi-envelope-fill"></i>
              <span>{BUSINESS_INFO.email}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="am-footer py-5">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="am-brand-badge">{BUSINESS_INFO.shortName}</span>
                <div>
                  <div className="fw-bold text-white">
                    {BUSINESS_INFO.brandName}
                  </div>
                  <small className="text-secondary">
                    {BUSINESS_INFO.brandTagline}
                  </small>
                </div>
              </div>
              <p className="small text-secondary mb-0" style={{ maxWidth: "360px" }}>
                Doorstep laptop &amp; desktop PC hardware repair, component
                replacement, peripherals setup, and software troubleshooting.
              </p>
            </div>

            <div className="col-6 col-lg-2">
              <h3 className="h6 fw-bold text-white mb-3">Quick Links</h3>
              <ul className="list-unstyled small mb-0 d-flex flex-column gap-2">
                <li>
                  <Link href="/" className="text-decoration-none text-secondary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-decoration-none text-secondary">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/hardware-parts" className="text-decoration-none text-secondary">
                    Hardware Parts
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-decoration-none text-secondary">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-6 col-lg-2">
              <h3 className="h6 fw-bold text-white mb-3">Support</h3>
              <ul className="list-unstyled small mb-0 d-flex flex-column gap-2">
                <li>
                  <Link href="/book-service" className="text-decoration-none text-secondary">
                    Book Service
                  </Link>
                </li>
                <li>
                  <Link href="/track" className="text-decoration-none text-secondary">
                    Track Ticket
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-decoration-none text-secondary">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-4">
              <h3 className="h6 fw-bold text-white mb-3">Direct Contact &amp; Areas</h3>
              <ul className="list-unstyled small text-secondary mb-0 d-flex flex-column gap-2">
                <li>
                  <i className="bi bi-geo-alt text-primary me-2"></i>
                  Noida • Ghaziabad • Vijay Nagar, Ghaziabad
                </li>
                <li>
                  <i className="bi bi-telephone text-primary me-2"></i>
                  <a
                    href={`tel:${BUSINESS_INFO.primaryPhone}`}
                    className="text-decoration-none text-light"
                  >
                    {BUSINESS_INFO.primaryPhone}
                  </a>{" "}
                  /{" "}
                  <a
                    href={`tel:${BUSINESS_INFO.secondaryPhone}`}
                    className="text-decoration-none text-light"
                  >
                    {BUSINESS_INFO.secondaryPhone}
                  </a>
                </li>
                <li>
                  <i className="bi bi-envelope text-primary me-2"></i>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-decoration-none text-light"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </li>
                <li>
                  <i className="bi bi-wallet2 text-primary me-2"></i>
                  UPI &amp; Cash Accepted
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-secondary border-opacity-25 my-4" />

          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 small text-secondary">
            <span>
              © {new Date().getFullYear()} {BUSINESS_INFO.fullBrandName}
            </span>
            <span>Noida • Ghaziabad • Vijay Nagar</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp & Call Quick Buttons */}
      <div className="am-floating-actions" aria-label="Quick Contact">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="am-float-btn am-float-whatsapp"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <i className="bi bi-whatsapp"></i>
        </a>
        <a
          href={`tel:${BUSINESS_INFO.primaryPhone}`}
          className="am-float-btn am-float-call"
          title={`Call ${BUSINESS_INFO.primaryPhone}`}
          aria-label={`Call ${BUSINESS_INFO.primaryPhone}`}
        >
          <i className="bi bi-telephone-fill"></i>
        </a>
      </div>
    </>
  );
}
