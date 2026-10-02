import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";

export const THORN_BOOKING_MESSAGE =
  "Hi Thorn! I'd like to book with the fall26 code (20% off the Shasta Lake Fall Sale, Oct 1–31). I see you're open 8:00 AM–4:30 PM, 7 days a week — can you help me check availability?";

export function openThornBooking() {
  window.dispatchEvent(
    new CustomEvent("str-open-thorn", { detail: { message: THORN_BOOKING_MESSAGE } }),
  );
}

export function BookWithThornButton({ className }: { className?: string }) {
  return (
    <Button
      type="button"
      size="lg"
      onClick={openThornBooking}
      className={className}
      aria-label="Book with Thorn — opens the chat with the fall26 code and hours pre-filled"
    >
      <PawPrint className="mr-2 h-5 w-5" aria-hidden="true" />
      Book with Thorn
    </Button>
  );
}
