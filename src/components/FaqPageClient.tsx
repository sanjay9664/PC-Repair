"use client";

import Link from "next/link";
import { useState } from "react";
import { BUSINESS_INFO, FAQ_ITEMS, FaqItem } from "@/data/services";
import { buildMailtoUrl, buildWhatsAppUrl } from "@/utils/inquiry";

type CategoryFilter = "All" | FaqItem["category"];

const CATEGORIES: CategoryFilter[] = [
  "All",
  "Pricing & Visit",
  "Booking & Tracking",
  "Repairs & Parts",
];

export default function FaqPageClient() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("All");

  const filteredFaqs =
    selectedCategory === "All"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-5">
      <div className="container py-lg-3">
        <div className="row g-5">
          <div className="col-lg-8">
            <div className="d-flex flex-wrap gap-2 mb-4">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${
                    selectedCategory === category
                      ? "btn-am-primary"
                      : "btn-am-outline"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="accordion am-faq" id="amFaqPageAccordion">
              {filteredFaqs.map((item, idx) => (
                <div className="accordion-item" key={item.id}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${idx !== 0 ? "collapsed" : ""}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#page-${item.id}`}
                      aria-expanded={idx === 0 ? "true" : "false"}
                      aria-controls={`page-${item.id}`}
                    >
                      <span className="badge text-bg-light border text-primary me-2">
                        {item.category}
                      </span>
                      <span>{item.question}</span>
                    </button>
                  </h2>
                  <div
                    id={`page-${item.id}`}
                    className={`accordion-collapse collapse ${
                      idx === 0 ? "show" : ""
                    }`}
                    data-bs-parent="#amFaqPageAccordion"
                  >
                    <div className="accordion-body text-secondary lh-lg">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="am-card p-4 bg-white">
              <span className="am-section-kicker">Still Have Questions?</span>
              <h2 className="h5 fw-bold mb-2">Direct Technician Help Desk</h2>
              <p className="text-secondary small mb-4">
                Message or call us directly for exact part availability or
                location-based visit fees.
              </p>

              <div className="d-grid gap-2 mb-3">
                <a
                  href={buildWhatsAppUrl(
                    `Hello ${BUSINESS_INFO.brandName}, I have a question about doorstep repair.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-am-whatsapp"
                >
                  <i className="bi bi-whatsapp me-2"></i>Chat on WhatsApp
                </a>
                <a
                  href={`tel:${BUSINESS_INFO.primaryPhone}`}
                  className="btn btn-am-outline"
                >
                  <i className="bi bi-telephone me-2"></i>Call{" "}
                  {BUSINESS_INFO.primaryPhone}
                </a>
                <a
                  href={buildMailtoUrl(
                    "Question regarding doorstep computer service",
                    `Hello ${BUSINESS_INFO.brandName},\n\nMy question:`
                  )}
                  className="btn btn-am-primary"
                >
                  <i className="bi bi-envelope me-2"></i>Send Email
                </a>
              </div>

              <div className="pt-3 border-top small text-secondary">
                Ready to schedule a visit?{" "}
                <Link href="/book-service" className="fw-bold text-primary">
                  Open Booking Form
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

