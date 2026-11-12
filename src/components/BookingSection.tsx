"use client";

import { useEffect, useState } from "react";
import {
  BUSINESS_INFO,
  SERVICE_OPTIONS,
} from "@/data/services";
import {
  BookingFormValues,
  buildMailtoUrl,
  buildWhatsAppUrl,
  formatBookingMessage,
  generateTicketId,
  isValidIndianPhone,
  SavedBookingRecord,
} from "@/utils/inquiry";

interface BookingPreset {
  device?: string;
  service?: string;
  area?: string;
  nonce: number;
}

interface BookingSectionProps {
  preset: BookingPreset;
  onBookingCreated: (record: SavedBookingRecord) => void;
}

const INITIAL_VALUES: BookingFormValues = {
  name: "",
  phone: "",
  area: "",
  device: "",
  brandModel: "",
  service: "",
  preferredDate: "",
  preferredTime: BUSINESS_INFO.timeSlots[0],
  address: "",
  description: "",
  payment: "UPI",
};

export default function BookingSection({
  preset,
  onBookingCreated,
}: BookingSectionProps) {
  const [values, setValues] = useState<BookingFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<
    Partial<Record<keyof BookingFormValues, string>>
  >({});
  const [photoName, setPhotoName] = useState<string>("");
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string>("");
  const [generatedTicket, setGeneratedTicket] = useState<{
    ticket: string;
    message: string;
    subject: string;
    channel: "whatsapp" | "email";
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [todayIso, setTodayIso] = useState("");

  useEffect(() => {
    setTodayIso(new Date().toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    if (preset.nonce === 0) return;
    setValues((prev) => ({
      ...prev,
      device: preset.device || prev.device,
      service: preset.service || prev.service,
      area: preset.area || prev.area,
    }));
    setErrors((prev) => ({
      ...prev,
      device: preset.device ? undefined : prev.device,
      service: preset.service ? undefined : prev.service,
      area: preset.area ? undefined : prev.area,
    }));
  }, [preset]);

  useEffect(() => {
    return () => {
      if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    };
  }, [photoPreviewUrl]);

  const handleFieldChange = (
    field: keyof BookingFormValues,
    value: string
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (photoPreviewUrl) {
      URL.revokeObjectURL(photoPreviewUrl);
    }
    if (!file) {
      setPhotoName("");
      setPhotoPreviewUrl("");
      return;
    }
    setPhotoName(file.name);
    setPhotoPreviewUrl(URL.createObjectURL(file));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof BookingFormValues, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your full name.";
    if (!isValidIndianPhone(values.phone)) {
      nextErrors.phone = "Please enter a valid 10-digit mobile number.";
    }
    if (!values.area) nextErrors.area = "Please select your service area.";
    if (!values.device) nextErrors.device = "Please select your device type.";
    if (!values.service) nextErrors.service = "Please choose the required service.";
    if (!values.address.trim()) {
      nextErrors.address = "Please enter your full doorstep address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitViaChannel = (channel: "whatsapp" | "email") => {
    if (!validate()) return;

    const ticket = generateTicketId();
    const message = formatBookingMessage(ticket, values, photoName || undefined);
    const subject = `Doorstep Service Booking [${ticket}] - ${values.device} (${values.area})`;

    const record: SavedBookingRecord = {
      ...values,
      ticket,
      createdAt: new Date().toISOString(),
      photoName: photoName || undefined,
    };

    onBookingCreated(record);
    setGeneratedTicket({ ticket, message, subject, channel });
    setCopied(false);

    if (channel === "whatsapp") {
      window.open(
        buildWhatsAppUrl(message, BUSINESS_INFO.whatsappPrimary),
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      window.location.href = buildMailtoUrl(subject, message);
    }
  };

  const handleCopy = async () => {
    if (!generatedTicket) return;
    try {
      await navigator.clipboard.writeText(generatedTicket.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setGeneratedTicket(null);
    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    setPhotoPreviewUrl("");
    setPhotoName("");
  };

  return (
    <section id="book" className="am-booking-section py-5">
      <div className="container py-lg-4">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "700px" }}>
          <span className="am-section-kicker">Book Service</span>
          <h2 className="am-section-title mb-2">
            Request a Doorstep Technician Visit
          </h2>
          <p className="text-secondary mb-0">
            Fill in your device and location details below and send your query
            directly on <strong>WhatsApp</strong> or <strong>Email</strong>.{" "}
            {BUSINESS_INFO.visitNote}
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            <div className="am-form-card p-4 p-md-5">
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  submitViaChannel("whatsapp");
                }}
              >
                <div className="row g-3">
                  {/* Customer Name */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-dark">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder="Enter your name"
                      value={values.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-dark">
                      Mobile Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      placeholder="10-digit mobile number"
                      value={values.phone}
                      onChange={(e) => handleFieldChange("phone", e.target.value)}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>

                  {/* Service Area */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-dark">
                      Service Area <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.area ? "is-invalid" : ""}`}
                      value={values.area}
                      onChange={(e) => handleFieldChange("area", e.target.value)}
                    >
                      <option value="">Choose service area</option>
                      {BUSINESS_INFO.serviceAreas.map((area) => (
                        <option value={area} key={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                    {errors.area && (
                      <div className="invalid-feedback">{errors.area}</div>
                    )}
                  </div>

                  {/* Device Type */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-dark">
                      Device Type <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.device ? "is-invalid" : ""}`}
                      value={values.device}
                      onChange={(e) => handleFieldChange("device", e.target.value)}
                    >
                      <option value="">Choose device</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Desktop PC">Desktop PC</option>
                      <option value="Peripheral">Peripheral</option>
                    </select>
                    {errors.device && (
                      <div className="invalid-feedback">{errors.device}</div>
                    )}
                  </div>

                  {/* Brand / Model */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-dark">
                      Brand / Model
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Dell Inspiron 3511 / HP Pavilion"
                      value={values.brandModel}
                      onChange={(e) =>
                        handleFieldChange("brandModel", e.target.value)
                      }
                    />
                  </div>

                  {/* Required Service */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-dark">
                      Required Service <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.service ? "is-invalid" : ""}`}
                      value={values.service}
                      onChange={(e) =>
                        handleFieldChange("service", e.target.value)
                      }
                    >
                      <option value="">Choose service</option>
                      {SERVICE_OPTIONS.map((svc) => (
                        <option value={svc} key={svc}>
                          {svc}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <div className="invalid-feedback">{errors.service}</div>
                    )}
                  </div>

                  {/* Preferred Date */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-dark">
                      Preferred Visit Date
                    </label>
                    <input
                      type="date"
                      min={todayIso}
                      className="form-control"
                      value={values.preferredDate}
                      onChange={(e) =>
                        handleFieldChange("preferredDate", e.target.value)
                      }
                    />
                  </div>

                  {/* Preferred Time */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-dark">
                      Preferred Time Slot
                    </label>
                    <select
                      className="form-select"
                      value={values.preferredTime}
                      onChange={(e) =>
                        handleFieldChange("preferredTime", e.target.value)
                      }
                    >
                      {BUSINESS_INFO.timeSlots.map((slot) => (
                        <option value={slot} key={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Full Address */}
                  <div className="col-12">
                    <label className="form-label fw-bold small text-dark">
                      Full Doorstep Address <span className="text-danger">*</span>
                    </label>
                    <textarea
                      rows={2}
                      className={`form-control ${errors.address ? "is-invalid" : ""}`}
                      placeholder="House/Flat No., Sector/Locality, Landmark, Pincode"
                      value={values.address}
                      onChange={(e) =>
                        handleFieldChange("address", e.target.value)
                      }
                    ></textarea>
                    {errors.address && (
                      <div className="invalid-feedback">{errors.address}</div>
                    )}
                  </div>

                  {/* Problem Description */}
                  <div className="col-12">
                    <label className="form-label fw-bold small text-dark">
                      Describe the Problem
                    </label>
                    <textarea
                      rows={3}
                      className="form-control"
                      placeholder="Tell us what issue you are facing (e.g., not turning on, cracked screen, slow boot, battery draining fast)..."
                      value={values.description}
                      onChange={(e) =>
                        handleFieldChange("description", e.target.value)
                      }
                    ></textarea>
                  </div>

                  {/* Optional Problem Photo */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-dark">
                      Problem Photo (Optional Preview)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={handlePhotoChange}
                    />
                    <div className="form-text">
                      Since there is no server upload, attach the photo directly
                      inside WhatsApp or Email once it opens.
                    </div>
                    {photoPreviewUrl && (
                      <div className="mt-2 d-flex align-items-center gap-2 p-2 border rounded-3 bg-light">
                        <img
                          src={photoPreviewUrl}
                          alt="Selected issue preview"
                          className="rounded"
                          style={{ width: 48, height: 48, objectFit: "cover" }}
                        />
                        <div className="small text-truncate">
                          <div className="fw-semibold text-dark text-truncate">
                            {photoName}
                          </div>
                          <span className="text-secondary">Ready to attach</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Preference */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-dark">
                      Preferred Payment Mode (After Service)
                    </label>
                    <select
                      className="form-select"
                      value={values.payment}
                      onChange={(e) =>
                        handleFieldChange("payment", e.target.value)
                      }
                    >
                      {BUSINESS_INFO.paymentModes.map((mode) => (
                        <option value={mode} key={mode}>
                          {mode}
                        </option>
                      ))}
                    </select>
                    <div className="form-text">
                      Pay directly via UPI or Cash after technician inspection and
                      repair completion.
                    </div>
                  </div>
                </div>

                {/* Dual Action Buttons */}
                <div className="row g-3 mt-4 pt-2">
                  <div className="col-md-6">
                    <button
                      type="submit"
                      className="btn btn-am-whatsapp w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="bi bi-whatsapp fs-5"></i>
                      <span>Send Query via WhatsApp</span>
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="button"
                      onClick={() => submitViaChannel("email")}
                      className="btn btn-am-primary w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="bi bi-envelope-fill fs-5"></i>
                      <span>Send Query via Email</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Generated Ticket Preview & Fallback Actions */}
              {generatedTicket && (
                <div className="mt-4 pt-4 border-top">
                  <div className="alert alert-success border-0 rounded-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
                    <div>
                      <div className="fw-bold">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        Ticket Reference Ready:{" "}
                        <span className="badge text-bg-dark ms-1">
                          {generatedTicket.ticket}
                        </span>
                      </div>
                      <small className="d-block mt-1">
                        Your{" "}
                        {generatedTicket.channel === "whatsapp"
                          ? "WhatsApp chat"
                          : "Email draft"}{" "}
                        has been triggered. You can also use the quick buttons
                        below if it didn&apos;t open automatically.
                      </small>
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn btn-sm btn-outline-success rounded-3 fw-semibold align-self-start"
                    >
                      New Request
                    </button>
                  </div>

                  <pre className="am-ticket-preview p-3 mb-3">
                    {generatedTicket.message}
                  </pre>

                  <div className="d-flex flex-wrap gap-2">
                    <a
                      href={buildWhatsAppUrl(
                        generatedTicket.message,
                        BUSINESS_INFO.whatsappPrimary
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-am-whatsapp btn-sm px-3 py-2 d-inline-flex align-items-center gap-2"
                    >
                      <i className="bi bi-whatsapp"></i>
                      <span>WhatsApp ({BUSINESS_INFO.primaryPhone})</span>
                    </a>

                    <a
                      href={buildWhatsAppUrl(
                        generatedTicket.message,
                        BUSINESS_INFO.whatsappSecondary
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-success btn-sm px-3 py-2 rounded-3 fw-semibold d-inline-flex align-items-center gap-2"
                    >
                      <i className="bi bi-whatsapp"></i>
                      <span>Backup ({BUSINESS_INFO.secondaryPhone})</span>
                    </a>

                    <a
                      href={buildMailtoUrl(
                        generatedTicket.subject,
                        generatedTicket.message
                      )}
                      className="btn btn-am-primary btn-sm px-3 py-2 d-inline-flex align-items-center gap-2"
                    >
                      <i className="bi bi-envelope"></i>
                      <span>Open Email</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="btn btn-am-outline btn-sm px-3 py-2 d-inline-flex align-items-center gap-2"
                    >
                      <i
                        className={`bi ${
                          copied ? "bi-clipboard-check text-success" : "bi-clipboard"
                        }`}
                      ></i>
                      <span>{copied ? "Copied!" : "Copy Details"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
