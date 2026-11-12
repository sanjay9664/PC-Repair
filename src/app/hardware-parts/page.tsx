import type { Metadata } from "next";
import Link from "next/link";
import ContactFooter from "@/components/ContactFooter";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import { BUSINESS_INFO, HARDWARE_PARTS } from "@/data/services";
import { buildWhatsAppUrl } from "@/utils/inquiry";

export const metadata: Metadata = {
  title: "Hardware Parts & Upgrades | A M Hardware & Software Services",
  description:
    "Laptop screen, keyboard, battery, DC jack, body/hinges, speaker, SSD/HDD, and RAM replacement at your doorstep.",
};

export default function HardwarePartsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          kicker="Hardware & Upgrades"
          title="Laptop & PC Component Replacement"
          description="Screen, keyboard, battery, DC jack, laptop body, speaker, SSD/HDD, and RAM upgrades checked and fitted at your doorstep."
          currentPage="Hardware Parts"
          bgImage="/images/hero-hardware-parts.jpg"
        />

        <section className="py-5">
          <div className="container py-lg-3">
            {/* Top Showcase Card */}
            <div className="bg-white border rounded-4 overflow-hidden shadow-sm mb-5">
              <div className="row g-0 align-items-center">
                <div className="col-lg-6">
                  <img
                    src="/images/hero-hardware-parts.jpg"
                    alt="Laptop replacement hardware parts and repair toolkit"
                    className="w-100"
                    style={{ maxHeight: "340px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-lg-6 p-4 p-lg-5">
                  <span className="am-section-kicker">Model Compatibility First</span>
                  <h2 className="h3 fw-bold mb-2">
                    Share Your Brand &amp; Model for Exact Part Pricing
                  </h2>
                  <p className="text-secondary mb-3">
                    Laptop screens, batteries, keyboards, and hinges vary by
                    exact laptop model (for example, Dell Inspiron 3511 or HP
                    Pavilion 15). Share your model name or a photo on WhatsApp
                    so we bring the matching part to your doorstep.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <Link
                      href="/book-service"
                      className="btn btn-am-primary"
                    >
                      <i className="bi bi-calendar-check me-2"></i>Book Part
                      Service
                    </Link>
                    <a
                      href={buildWhatsAppUrl(
                        `Hello ${BUSINESS_INFO.brandName}, I want to check laptop/PC part availability and price.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-am-whatsapp"
                    >
                      <i className="bi bi-whatsapp me-2"></i>Ask Quote on
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 8 Hardware Component Cards */}
            <div className="row g-4">
              {HARDWARE_PARTS.map((part) => {
                const partWa = buildWhatsAppUrl(
                  `Hello ${BUSINESS_INFO.brandName}, I need help with ${part.name} (${part.deviceValue}). Please share availability and visit charge.`
                );
                return (
                  <div className="col-md-6 col-lg-3" key={part.id}>
                    <div className="am-card h-100 p-4 d-flex flex-column">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <span className="am-icon-box am-icon-primary">
                          <i className={`bi ${part.icon}`}></i>
                        </span>
                        <span className="badge text-bg-light border text-secondary">
                          {part.deviceValue}
                        </span>
                      </div>

                      <h3 className="h5 fw-bold mb-2">{part.name}</h3>
                      <p className="text-secondary small mb-3">
                        {part.tagline}
                      </p>

                      <div className="p-3 rounded-3 bg-light border mb-4 flex-grow-1">
                        <div className="fw-bold small text-dark mb-2">
                          Common Symptoms
                        </div>
                        <ul className="list-unstyled small text-secondary mb-0 d-flex flex-column gap-1">
                          {part.symptoms.map((symptom) => (
                            <li key={symptom}>• {symptom}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="d-grid gap-2">
                        <Link
                          href={`/book-service?device=${encodeURIComponent(
                            part.deviceValue
                          )}&service=${encodeURIComponent(part.serviceValue)}`}
                          className="btn btn-am-primary btn-sm py-2"
                        >
                          Book {part.name}
                        </Link>
                        <a
                          href={partWa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-success btn-sm py-2 rounded-3 fw-semibold"
                        >
                          <i className="bi bi-whatsapp me-1"></i>Ask Price
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <ContactFooter />
    </>
  );
}

