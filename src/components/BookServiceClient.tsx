"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BookingSection from "@/components/BookingSection";
import { SavedBookingRecord } from "@/utils/inquiry";

const STORAGE_KEY = "am_recent_bookings_v1";

export default function BookServiceClient() {
  const searchParams = useSearchParams();
  const [preset, setPreset] = useState<{
    device?: string;
    service?: string;
    area?: string;
    nonce: number;
  }>({ nonce: 0 });

  useEffect(() => {
    const device = searchParams.get("device") || undefined;
    const service = searchParams.get("service") || undefined;
    const area = searchParams.get("area") || undefined;

    if (device || service || area) {
      setPreset((prev) => ({
        device,
        service,
        area,
        nonce: prev.nonce + 1,
      }));
    }
  }, [searchParams]);

  const handleBookingCreated = (record: SavedBookingRecord) => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const existing: SavedBookingRecord[] = raw ? JSON.parse(raw) : [];
      const updated = [
        record,
        ...(Array.isArray(existing) ? existing : []),
      ].slice(0, 5);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <BookingSection preset={preset} onBookingCreated={handleBookingCreated} />
  );
}

