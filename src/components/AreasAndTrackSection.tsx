"use client";

import { useState } from "react";
import { BUSINESS_INFO } from "@/data/services";
import {
  buildMailtoUrl,
  buildStatusInquiryMessage,
  buildWhatsAppUrl,
  SavedBookingRecord,
} from "@/utils/inquiry";

interface AreasAndTrackSectionProps {
  recentBookings: SavedBookingRecord[];
  onSelectArea: (area: string) => void;
}

const AREA_DETAILS = [
  {
    name: "Noida",
    badge: "Active Coverage",
    description:
      "Doorstep laptop, PC & peripheral repair across Noida residential sectors, apartments, and offices.",
  },
  {
    name: "Ghaziabad",
    badge: "Active Coverage",
    description:
      "Fast technician visits across major Ghaziabad localities for hardware replacement & OS support.",
  },
  {
    name: "Vijay Nagar, Ghaziabad",
    badge: "Priority Local Zone",
    description:
      "Quick-response local support in Vijay Nagar, Ghaziabad with location-confirmed visit fees.",
  },
];

export default function AreasAndTrackSection({
  recentBookings,
  onSelectArea,
}: AreasAndTrackSectionProps) {
  const [ticketInput, setTicketInput] = useState("");
  const [ticketError, setTicketError] = useState("");

  const handleTrackVia = (channel: "whatsapp" | "email") => {
    const cleanTicket = ticketInput.trim();
    if (!cleanTicket) {
      setTicketError("Please enter your ticket number (e.g. AM-2026-123456).");
      return;
    }
    setTicketError("");
    const msg = buildStatusInquiryMessage(cleanTicket);

    if (channel === "whatsapp") {
      window.open(
        buildWhatsAppUrl(msg, BUSINESS_INFO.whatsappPrimary),
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      window.location.href = buildMailtoUrl(
        `Status Check for Ticket ${cleanTicket}`,
        msg
      );
    }
  };

  return (
    <section id="track" className="py-5 bg-white border-bottom">
      <div className="container py-lg-4">
        <div className="row g-4 align-items-stretch">
          {/* Left: Service Areas */}
          <div id="areas" className="col-lg-6">
            <div className="h-100 p-4 p-md-5 rounded-4 bg-light border">
              <span className="am-section-kicker">Service Coverage</span>
              <h2 className="h3 fw-bold mb-2">Areas We Serve</h2>
              <p className="text-secondary small mb-4">
                Click your area below to pre-select it in the doorstep booking
                form.
              </p>

              <div className="d-flex flex-column gap-3">
                {AREA_DETAILS.map((area) => (
                  <div key={area.name} className="am-area-card p-3 p-md-4">
                    <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-geo-alt-fill text-primary fs-5"></i>
                        <h3 className="h6 fw-bold mb-0">{area.name}</h3>
                      </div>
                      <span className="badge text-bg-primary bg-opacity-10 text-primary fw-semibold">
                        {area.badge}
                      </span>
                    </div>
                    <p className="text-secondary small mb-3">
                      {area.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => onSelectArea(area.name)}
                      className="btn btn-sm btn-outline-primary rounded-3 fw-semibold"
                    >
                      Book Visit in {area.name.split(",")[0]}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Ticket Tracking via WhatsApp/Email + Browser History */}
          <div className="col-lg-6">
            <div className="h-100 p-4 p-md-5 rounded-4 bg-white border shadow-sm d-flex flex-column">
              <span className="am-section-kicker">Track Repair</span>
              <h2 className="h3 fw-bold mb-2">Check Your Service Ticket</h2>
              <p className="text-secondary small mb-4">
                Enter your reference ticket ID to ask for a live status update
                directly on WhatsApp or Email.
              </p>

              <div className="mb-3">
                <label className="form-label fw-bold small">
                  Ticket Reference Number
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-ticket-perforated text-primary"></i>
                  </span>
                  <input
                    type="text"
                    className={`form-control ${ticketError ? "is-invalid" : ""}`}
                    placeholder="e.g. AM-2026-123456"
                    value={ticketInput}
                    onChange={(e) => {
                      setTicketInput(e.target.value);
                      if (ticketError) setTicketError("");
                    }}
                  />
                </div>
                {ticketError && (
                  <div className="text-danger small mt-1">{ticketError}</div>
                )}
              </div>

              <div className="d-flex flex-wrap gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => handleTrackVia("whatsapp")}
                  className="btn btn-am-whatsapp btn-sm px-3 py-2 d-inline-flex align-items-center gap-2"
                >
                  <i className="bi bi-whatsapp"></i>
                  <span>Ask Status on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleTrackVia("email")}
                  className="btn btn-am-primary btn-sm px-3 py-2 d-inline-flex align-items-center gap-2"
                >
                  <i className="bi bi-envelope"></i>
                  <span>Ask Status via Email</span>
                </button>
              </div>

              <div className="mt-auto pt-3 border-top">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h3 className="h6 fw-bold mb-0">
                    Your Recent Requests (This Browser)
                  </h3>
                  <span className="badge text-bg-light border text-secondary">
                    {recentBookings.length} saved
                  </span>
                </div>

                {recentBookings.length === 0 ? (
                  <p className="text-secondary small mb-0">
                    Requests you create from this browser appear here for quick
                    ticket reference.
                  </p>
                ) : (
                  <div className="d-flex flex-column gap-2 mt-2">
                    {recentBookings.slice(0, 3).map((item) => (
                      <div
                        key={item.ticket}
                        className="p-2 px-3 rounded-3 bg-light border d-flex align-items-center justify-content-between gap-2"
                      >
                        <div className="small">
                          <div className="fw-bold text-dark">
                            {item.ticket} — {item.device}
                          </div>
                          <div className="text-secondary">
                            {item.service} • {item.area}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setTicketInput(item.ticket)}
                          className="btn btn-sm btn-outline-secondary rounded-3"
                        >
                          Use ID
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

