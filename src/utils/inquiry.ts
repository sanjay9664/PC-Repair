import { BUSINESS_INFO } from "@/data/services";

export interface BookingFormValues {
  name: string;
  phone: string;
  area: string;
  device: string;
  brandModel: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
  description: string;
  payment: string;
}

export interface SavedBookingRecord extends BookingFormValues {
  ticket: string;
  createdAt: string;
  photoName?: string;
}

export function generateTicketId(): string {
  const year = new Date().getFullYear();
  const suffix = String(Date.now()).slice(-6);
  return `AM-${year}-${suffix}`;
}

export function normalizeIndianPhone(raw: string): string {
  return raw.replace(/\D/g, "");
}

export function isValidIndianPhone(raw: string): boolean {
  const digits = normalizeIndianPhone(raw);
  return digits.length === 10 || (digits.length === 12 && digits.startsWith("91"));
}

/**
 * Formats a concise WhatsApp-ready booking message using WhatsApp markdown.
 */
export function formatBookingMessage(
  ticket: string,
  values: BookingFormValues,
  photoName?: string
): string {
  const lines = [
    `*New Doorstep Service Request - ${BUSINESS_INFO.brandName}*`,
    `Ticket Ref: *${ticket}*`,
    `--------------------------------`,
    `*Customer Name:* ${values.name.trim()}`,
    `*Mobile Number:* ${values.phone.trim()}`,
    `*Service Area:* ${values.area}`,
    `*Full Address:* ${values.address.trim()}`,
    `--------------------------------`,
    `*Device Type:* ${values.device}`,
    `*Brand / Model:* ${values.brandModel.trim() || "Not specified"}`,
    `*Required Service:* ${values.service}`,
    `*Problem Details:* ${values.description.trim() || "Not specified"}`,
    `*Preferred Date:* ${values.preferredDate || "Earliest available"}`,
    `*Preferred Slot:* ${values.preferredTime}`,
    `*Payment Mode:* ${values.payment}`,
  ];

  if (photoName) {
    lines.push(`*Photo Note:* Selected "${photoName}" (attaching in chat)`);
  }

  lines.push(
    `--------------------------------`,
    `Please confirm the visit charge for my location and technician slot.`
  );

  return lines.join("\n");
}

/**
 * Formats a structured, business-grade email subject line for booking requests.
 */
export function formatProfessionalEmailSubject(
  ticket: string,
  values: BookingFormValues
): string {
  return `[Service Request ${ticket}] ${values.device} - ${values.service} | ${values.area}`;
}

/**
 * Formats a clean, formal plain-text email body for booking inquiries.
 */
export function formatProfessionalEmailBody(
  ticket: string,
  values: BookingFormValues,
  photoName?: string
): string {
  const lines = [
    `Dear ${BUSINESS_INFO.fullBrandName} Team,`,
    ``,
    `I would like to schedule a doorstep technician visit. Please find my complete service query details below:`,
    ``,
    `====================================================`,
    `SERVICE TICKET SUMMARY`,
    `====================================================`,
    `Ticket Reference  : ${ticket}`,
    `Preferred Date    : ${values.preferredDate || "Earliest available"}`,
    `Preferred Slot    : ${values.preferredTime}`,
    `Payment Mode      : ${values.payment} (After Service)`,
    ``,
    `CUSTOMER INFORMATION`,
    `----------------------------------------------------`,
    `Full Name         : ${values.name.trim()}`,
    `Mobile Number     : ${values.phone.trim()}`,
    `Service Area      : ${values.area}`,
    `Doorstep Address  : ${values.address.trim()}`,
    ``,
    `DEVICE & PROBLEM DETAILS`,
    `----------------------------------------------------`,
    `Device Type       : ${values.device}`,
    `Brand / Model     : ${values.brandModel.trim() || "Not specified"}`,
    `Required Service  : ${values.service}`,
    `Issue Description : ${values.description.trim() || "Not specified"}`,
  ];

  if (photoName) {
    lines.push(
      `Photo Attachment  : ${photoName} (will attach directly to this email)`
    );
  }

  lines.push(
    `====================================================`,
    ``,
    `Kindly confirm the doorstep visit/diagnosis charge for my location and let me know the technician schedule.`,
    ``,
    `Warm regards,`,
    `${values.name.trim()}`,
    `Contact: ${values.phone.trim()}`
  );

  return lines.join("\n");
}

export function formatProfessionalGeneralEmailBody(contextNote?: string): string {
  return [
    `Dear ${BUSINESS_INFO.fullBrandName} Team,`,
    ``,
    `I would like to inquire about a doorstep computer/laptop service.`,
    contextNote ? `Topic: ${contextNote}` : ``,
    ``,
    `----------------------------------------------------`,
    `My Name           : `,
    `Mobile Number     : `,
    `Service Area      : (Noida / Ghaziabad / Vijay Nagar)`,
    `Device & Model    : `,
    `Issue / Query     : `,
    `----------------------------------------------------`,
    ``,
    `Please let me know the location-based visit charge and available slot.`,
    ``,
    `Thank you.`,
  ]
    .filter((line, idx, arr) => !(line === "" && arr[idx - 1] === ""))
    .join("\n");
}

export function buildWhatsAppUrl(
  message: string,
  phone: string = BUSINESS_INFO.whatsappPrimary
): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a mailto URL addressed to both business emails by default (To + CC)
 * so every customer query reaches both contacts reliably across mail clients.
 */
export function buildMailtoUrl(
  subject: string,
  body: string,
  recipient?: string
): string {
  if (recipient) {
    return `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return `mailto:${BUSINESS_INFO.email}?cc=${encodeURIComponent(
    BUSINESS_INFO.secondaryEmail
  )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildStatusInquiryMessage(ticket: string): string {
  return [
    `Hello ${BUSINESS_INFO.brandName},`,
    `Please share a status update for my doorstep service request.`,
    `Ticket Ref: ${ticket.trim()}`,
  ].join("\n");
}

export function formatProfessionalStatusEmailBody(ticket: string): string {
  return [
    `Dear ${BUSINESS_INFO.fullBrandName} Team,`,
    ``,
    `I would like to request a status update regarding my doorstep repair ticket.`,
    ``,
    `----------------------------------------------------`,
    `Ticket Reference  : ${ticket.trim()}`,
    `----------------------------------------------------`,
    ``,
    `Kindly reply with the current technician or repair status.`,
    ``,
    `Thank you.`,
  ].join("\n");
}
