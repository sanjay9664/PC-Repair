"use client";

import Link from "next/link";
import {
  DeviceType,
  HARDWARE_PARTS,
  SERVICE_CATEGORIES,
} from "@/data/services";

interface ServicesSectionProps {
  onSelectService?: (device: DeviceType, service: string) => void;
}

export default function ServicesSection({
  onSelectService,
}: ServicesSectionProps) {
  return (
    <section id="services" className="py-5">
      <div className="container py-lg-4">
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-5">
          <div>
            <span className="am-section-kicker">Our Services</span>
            <h2 className="am-section-title mb-2">
              Complete Computer Care at Your Doorstep
            </h2>
            <p className="text-secondary mb-0" style={{ maxWidth: "620px" }}>
              From urgent hardware faults to software cleanup and upgrades, our
              technician resolves issues right at your home or office.
            </p>
          </div>
          <Link
            href="/services"
            className="btn btn-am-outline btn-sm px-3 py-2 align-self-start align-self-md-end"
          >
            View All Services <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>

        <div className="row g-4 mb-5">
          {SERVICE_CATEGORIES.map((cat) => (
            <div className="col-md-6 col-xl-3" key={cat.id}>
              <div className="am-card h-100 d-flex flex-column">
                <div className="am-service-img-wrap">
                  <img src={cat.image} alt={cat.imageAlt} />
                  <span className="am-service-img-badge">
                    <i className={`bi ${cat.icon}`}></i>
                  </span>
                </div>

                <div className="p-4 d-flex flex-column flex-grow-1">
                  <h3 className="h5 fw-bold mb-2">{cat.title}</h3>
                  <p className="text-secondary small mb-3">{cat.description}</p>

                  <ul className="list-unstyled small text-secondary mb-4 flex-grow-1">
                    {cat.highlights.map((bullet) => (
                      <li
                        className="d-flex align-items-start gap-2 mb-2"
                        key={bullet}
                      >
                        <i className="bi bi-check-circle-fill text-primary mt-1"></i>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {onSelectService ? (
                    <button
                      type="button"
                      onClick={() =>
                        onSelectService(cat.deviceValue, cat.defaultService)
                      }
                      className="btn btn-outline-primary w-100 rounded-3 fw-semibold"
                    >
                      Book {cat.title}{" "}
                      <i className="bi bi-arrow-right ms-1"></i>
                    </button>
                  ) : (
                    <Link
                      href={`/book-service?device=${encodeURIComponent(
                        cat.deviceValue
                      )}&service=${encodeURIComponent(cat.defaultService)}`}
                      className="btn btn-outline-primary w-100 rounded-3 fw-semibold"
                    >
                      Book {cat.title}{" "}
                      <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Hardware Parts Showcase */}
        <div id="hardware" className="pt-2">
          <div className="bg-white border rounded-4 overflow-hidden shadow-sm">
            <div className="row g-0 align-items-stretch">
              <div className="col-lg-5 position-relative bg-dark" style={{ minHeight: "260px" }}>
                <img
                  src="/images/hero-hardware-parts.jpg"
                  alt="Genuine laptop hardware spare parts and toolkit"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
                <div
                  className="position-absolute inset-0 w-100 h-100 top-0 start-0 d-flex flex-column justify-content-end p-4"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(9,21,43,0.1) 0%, rgba(9,21,43,0.88) 100%)",
                  }}
                >
                  <span className="badge text-bg-primary align-self-start mb-2">
                    Doorstep Part Replacement
                  </span>
                  <h3 className="h4 fw-bold text-white mb-1">
                    Laptop Hardware &amp; Upgrade Services
                  </h3>
                  <p className="small text-white-50 mb-3">
                    Screen, Keyboard, Battery, DC Jack, Laptop Body, Speaker,
                    SSD / HDD &amp; RAM.
                  </p>
                  <Link
                    href="/hardware-parts"
                    className="btn btn-light btn-sm fw-bold rounded-3 align-self-start px-3 py-2"
                  >
                    Explore Parts Guide <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>

              <div className="col-lg-7 p-4 p-lg-5">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                  <div>
                    <span className="am-section-kicker mb-1">
                      Select Component
                    </span>
                    <h3 className="h5 fw-bold mb-0">
                      Click any part to pre-fill your booking
                    </h3>
                  </div>
                </div>

                <div className="row g-3">
                  {HARDWARE_PARTS.map((part) => (
                    <div className="col-sm-6" key={part.id}>
                      {onSelectService ? (
                        <button
                          type="button"
                          className="am-part-btn h-100"
                          onClick={() =>
                            onSelectService(part.deviceValue, part.serviceValue)
                          }
                        >
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <div className="d-flex align-items-center gap-2">
                              <span
                                className="am-icon-box am-icon-primary"
                                style={{
                                  width: 36,
                                  height: 36,
                                  fontSize: "1rem",
                                }}
                              >
                                <i className={`bi ${part.icon}`}></i>
                              </span>
                              <span className="fw-bold text-dark">
                                {part.name}
                              </span>
                            </div>
                            <i className="bi bi-arrow-up-right text-secondary"></i>
                          </div>
                          <div className="text-secondary small">
                            {part.tagline}
                          </div>
                        </button>
                      ) : (
                        <Link
                          href={`/book-service?device=${encodeURIComponent(
                            part.deviceValue
                          )}&service=${encodeURIComponent(part.serviceValue)}`}
                          className="am-part-btn h-100 d-block text-decoration-none"
                        >
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <div className="d-flex align-items-center gap-2">
                              <span
                                className="am-icon-box am-icon-primary"
                                style={{
                                  width: 36,
                                  height: 36,
                                  fontSize: "1rem",
                                }}
                              >
                                <i className={`bi ${part.icon}`}></i>
                              </span>
                              <span className="fw-bold text-dark">
                                {part.name}
                              </span>
                            </div>
                            <i className="bi bi-arrow-up-right text-secondary"></i>
                          </div>
                          <div className="text-secondary small">
                            {part.tagline}
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
