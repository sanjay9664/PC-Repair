"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  BUSINESS_INFO,
  DeviceType,
  HERO_SLIDES,
  QUICK_SELECT_ITEMS,
} from "@/data/services";
import { buildWhatsAppUrl } from "@/utils/inquiry";

interface HeroCarouselProps {
  onQuickSelect?: (device: DeviceType, service: string) => void;
}

export default function HeroCarousel({ onQuickSelect }: HeroCarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const quickWhatsappUrl = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.brandName}, I want to book a doorstep repair technician.`
  );

  useEffect(() => {
    let instance: { dispose: () => void } | null = null;
    let cancelled = false;

    import("bootstrap/js/dist/carousel").then((mod) => {
      if (cancelled || !carouselRef.current) return;
      const Carousel = mod.default;
      instance = new Carousel(carouselRef.current, {
        interval: 5500,
        ride: "carousel",
        pause: "hover",
        wrap: true,
      });
    });

    return () => {
      cancelled = true;
      if (instance) {
        instance.dispose();
      }
    };
  }, []);

  return (
    <section className="am-carousel-wrapper">
      <div
        id="amHeroCarousel"
        ref={carouselRef}
        className="carousel slide carousel-fade am-carousel"
        data-bs-ride="carousel"
      >
        {/* Slide Indicators */}
        <div className="carousel-indicators">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              data-bs-target="#amHeroCarousel"
              data-bs-slide-to={idx}
              className={idx === 0 ? "active" : ""}
              aria-current={idx === 0 ? "true" : undefined}
              aria-label={`Slide ${idx + 1}: ${slide.title}`}
            ></button>
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`carousel-item ${idx === 0 ? "active" : ""}`}
            >
              <div className="am-carousel-slide py-5">
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="am-carousel-bg"
                />
                <div className="am-carousel-overlay"></div>

                <div className="container am-carousel-content py-3 py-lg-5">
                  <div className="row align-items-center g-4 g-lg-5">
                    <div className="col-lg-7">
                      <div className="am-glass-pill mb-3">
                        <i className="bi bi-geo-alt-fill text-info"></i>
                        <span>{slide.badge}</span>
                      </div>

                      <h1 className="am-hero-display mb-3">
                        {slide.title}{" "}
                        <span className="am-hero-highlight d-block d-sm-inline">
                          {slide.highlight}
                        </span>
                      </h1>

                      <p
                        className="fs-5 text-white text-opacity-75 mb-4"
                        style={{ maxWidth: "600px" }}
                      >
                        {slide.subtitle}
                      </p>

                      <div className="d-flex flex-wrap gap-3 mb-4">
                        <Link
                          href={slide.primaryCtaHref}
                          className="btn btn-am-primary d-inline-flex align-items-center gap-2"
                        >
                          <i className="bi bi-calendar-check"></i>
                          <span>{slide.primaryCtaLabel}</span>
                        </Link>

                        <a
                          href={quickWhatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-am-whatsapp d-inline-flex align-items-center gap-2"
                        >
                          <i className="bi bi-whatsapp"></i>
                          <span>Chat on WhatsApp</span>
                        </a>

                        <a
                          href={`tel:${BUSINESS_INFO.primaryPhoneTel}`}
                          className="btn btn-outline-light fw-bold rounded-3 px-4 py-2 d-inline-flex align-items-center gap-2"
                        >
                          <i className="bi bi-telephone"></i>
                          <span>{BUSINESS_INFO.primaryPhone}</span>
                        </a>
                      </div>

                      <div className="d-flex align-items-start gap-2 text-white-50 small">
                        <i className="bi bi-info-circle-fill text-info mt-1"></i>
                        <span>{BUSINESS_INFO.visitNote}</span>
                      </div>
                    </div>

                    {/* Right Quick Service Selector Card */}
                    <div className="col-lg-5 d-none d-lg-block">
                      <div className="am-hero-glass-panel p-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <span className="badge bg-primary bg-opacity-75 mb-1">
                              Instant Pre-Fill
                            </span>
                            <h2 className="h5 fw-bold text-white mb-0">
                              What needs repair today?
                            </h2>
                          </div>
                          <span className="fs-4 text-info">
                            <i className="bi bi-tools"></i>
                          </span>
                        </div>

                        <p className="small text-white-50 mb-3">
                          Select an option to pre-fill your booking and send
                          directly via WhatsApp or Email.
                        </p>

                        <div className="row g-2 mb-3">
                          {QUICK_SELECT_ITEMS.map((item) => (
                            <div className="col-6" key={item.label}>
                              {onQuickSelect ? (
                                <button
                                  type="button"
                                  className="am-quick-chip-dark"
                                  onClick={() =>
                                    onQuickSelect(item.device, item.service)
                                  }
                                >
                                  <i className={`bi ${item.icon}`}></i>
                                  <span>{item.label}</span>
                                </button>
                              ) : (
                                <Link
                                  href={`/book-service?device=${encodeURIComponent(
                                    item.device
                                  )}&service=${encodeURIComponent(item.service)}`}
                                  className="am-quick-chip-dark text-decoration-none"
                                >
                                  <i className={`bi ${item.icon}`}></i>
                                  <span>{item.label}</span>
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-top border-light border-opacity-10 d-flex align-items-center justify-content-between small">
                          <span className="text-white-50">
                            Call: {BUSINESS_INFO.primaryPhone} /{" "}
                            {BUSINESS_INFO.secondaryPhone}
                          </span>
                          <Link
                            href="/book-service"
                            className="text-info fw-semibold text-decoration-none"
                          >
                            Full Form <i className="bi bi-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prev / Next Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#amHeroCarousel"
          data-bs-slide="prev"
          style={{ width: "5%" }}
          aria-label="Previous slide"
        >
          <span className="am-carousel-ctrl">
            <i className="bi bi-chevron-left"></i>
          </span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#amHeroCarousel"
          data-bs-slide="next"
          style={{ width: "5%" }}
          aria-label="Next slide"
        >
          <span className="am-carousel-ctrl">
            <i className="bi bi-chevron-right"></i>
          </span>
        </button>
      </div>

      {/* Mobile Quick-Select Strip directly below Carousel */}
      <div className="d-lg-none bg-dark text-white py-3 border-top border-secondary border-opacity-25">
        <div className="container">
          <div className="small fw-bold text-info mb-2">
            Quick Select Service:
          </div>
          <div className="d-flex flex-wrap gap-2">
            {QUICK_SELECT_ITEMS.slice(0, 6).map((item) =>
              onQuickSelect ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onQuickSelect(item.device, item.service)}
                  className="btn btn-sm btn-outline-light rounded-pill"
                >
                  <i className={`bi ${item.icon} me-1`}></i>
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={`/book-service?device=${encodeURIComponent(
                    item.device
                  )}&service=${encodeURIComponent(item.service)}`}
                  className="btn btn-sm btn-outline-light rounded-pill"
                >
                  <i className={`bi ${item.icon} me-1`}></i>
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

