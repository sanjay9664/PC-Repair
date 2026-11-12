"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BUSINESS_INFO,
  DeviceType,
  SERVICE_CATEGORIES,
} from "@/data/services";
import { buildWhatsAppUrl } from "@/utils/inquiry";

type FilterOption = "All" | DeviceType | "Software";

const FILTER_TABS: Array<{ label: string; value: FilterOption; icon: string }> = [
  { label: "All Services", value: "All", icon: "bi-grid" },
  { label: "Laptop Repair", value: "Laptop", icon: "bi-laptop" },
  { label: "Desktop PC", value: "Desktop PC", icon: "bi-pc-display" },
  { label: "Peripherals", value: "Peripheral", icon: "bi-keyboard" },
  { label: "Software & OS", value: "Software", icon: "bi-cpu" },
];

export default function ServicesPageClient() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");

  const filtered = SERVICE_CATEGORIES.filter((cat) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Software") return cat.id === "software-support";
    if (activeFilter === "Laptop") return cat.id === "laptop-repair";
    return cat.deviceValue === activeFilter;
  });

  return (
    <section className="py-5">
      <div className="container py-lg-3">
        {/* Filter Pills */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div className="d-flex flex-wrap gap-2" role="tablist">
            {FILTER_TABS.map((tab) => {
              const selected = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveFilter(tab.value)}
                  className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2 ${
                    selected ? "btn-am-primary" : "btn-am-outline"
                  }`}
                >
                  <i className={`bi ${tab.icon}`}></i>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          <span className="text-secondary small">
            Showing {filtered.length} service{filtered.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Detailed Visual Service Cards */}
        <div className="row g-4">
          {filtered.map((cat) => {
            const waUrl = buildWhatsAppUrl(
              `Hello ${BUSINESS_INFO.brandName}, I need help with ${cat.title}. Please share visit details.`
            );
            return (
              <div className="col-lg-6" key={cat.id}>
                <div className="am-card h-100 d-flex flex-column">
                  <div className="am-service-img-wrap" style={{ height: "230px" }}>
                    <img src={cat.image} alt={cat.imageAlt} />
                    <span className="am-service-img-badge">
                      <i className={`bi ${cat.icon}`}></i>
                    </span>
                  </div>

                  <div className="p-4 p-md-4 d-flex flex-column flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h2 className="h4 fw-bold mb-0">{cat.title}</h2>
                      <span className="badge text-bg-primary bg-opacity-10 text-primary">
                        {cat.deviceValue}
                      </span>
                    </div>

                    <p className="text-secondary mb-3">{cat.description}</p>

                    <div className="row g-3 mb-4 flex-grow-1">
                      <div className="col-sm-6">
                        <div className="p-3 rounded-3 bg-light border h-100">
                          <div className="fw-bold small text-dark mb-2">
                            <i className="bi bi-check2-circle text-primary me-1"></i>
                            Included Checks
                          </div>
                          <ul className="list-unstyled small text-secondary mb-0 d-flex flex-column gap-1">
                            {cat.highlights.map((item) => (
                              <li key={item}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="p-3 rounded-3 bg-light border h-100">
                          <div className="fw-bold small text-dark mb-2">
                            <i className="bi bi-wrench-adjustable text-primary me-1"></i>
                            Common Problems Fixed
                          </div>
                          <ul className="list-unstyled small text-secondary mb-0 d-flex flex-column gap-1">
                            {cat.commonIssues.map((issue) => (
                              <li key={issue}>• {issue}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2">
                      <Link
                        href={`/book-service?device=${encodeURIComponent(
                          cat.deviceValue
                        )}&service=${encodeURIComponent(cat.defaultService)}`}
                        className="btn btn-am-primary flex-grow-1"
                      >
                        <i className="bi bi-calendar-check me-2"></i>Book{" "}
                        {cat.title}
                      </Link>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-am-whatsapp"
                      >
                        <i className="bi bi-whatsapp me-1"></i>WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

