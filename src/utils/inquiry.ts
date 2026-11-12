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

export function formatBookingMessage(
  ticket: string,
  values: BookingFormValues,
  photoName?: string
): string {
  const lines = [
    `*New Doorstep Service Request - ${BUSINESS_INFO.brandName}*`,
    `Ticket Ref: ${ticket}`,
    `--------------------------------`,
    `Customer Name: ${values.name.trim()}`,
    `Mobile Number: ${values.phone.trim()}`,
    `Service Area: ${values.area}`,
    `Full Address: ${values.address.trim()}`,
    `--------------------------------`,
    `Device Type: ${values.device}`,
    `Brand / Model: ${values.brandModel.trim() || "Not specified"}`,
    `Required Service: ${values.service}`,
    `Problem Details: ${values.description.trim() || "Not specified"}`,
    `Preferred Date: ${values.preferredDate || "Earliest available"}`,
    `Preferred Slot: ${values.preferredTime}`,
    `Payment Mode: ${values.payment}`,
  ];

  if (photoName) {
    lines.push(`Photo Note: Customer selected "${photoName}" (will attach directly)`);
  }

  lines.push(
    `--------------------------------`,
    `Please confirm the visit charge for my location and technician slot.`
  );

  return lines.join("\n");
}

export function buildWhatsAppUrl(
  message: string,
  phone: string = BUSINESS_INFO.whatsappPrimary
): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(subject: string, body: string): string {
  return `mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export function buildStatusInquiryMessage(ticket: string): string {
  return [
    `Hello ${BUSINESS_INFO.brandName},`,
    `Please share a status update for my doorstep service request.`,
    `Ticket Ref: ${ticket.trim()}`,
  ].join("\n");
}

