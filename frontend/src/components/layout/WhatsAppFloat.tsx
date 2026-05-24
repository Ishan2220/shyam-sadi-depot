import { BRAND } from "@/lib/constants";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  const href = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    "Hi Saree Depot — I'd love help choosing a saree."
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 md:bottom-8 md:right-8"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={1.75} />
    </a>
  );
}
