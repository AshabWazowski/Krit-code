import { BookingForm } from "@/components/sections/BookingForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Book an Appointment | BizDash",
  description: "Schedule a strategy call or consultation with our team.",
};

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-green/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-accent-yellow/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-5xl">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-clash font-medium mb-4">Book a Consultation</h1>
          <p className="text-muted text-lg max-w-2xl">
            Choose a date and time that works for you. We'll send you an invitation with a meeting link.
          </p>
        </div>

        <BookingForm />
      </div>
    </div>
  );
}
