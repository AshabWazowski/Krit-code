"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, CheckCircle2, User, Mail, Phone, Building2 } from "lucide-react";
import clsx from "clsx";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  budget: z.string().optional(),
  projectType: z.string().optional(),
  details: z.string().optional(),
});

const DURATIONS = [
  { label: "30 min", value: 30 },
  { label: "1 hour", value: 60 },
  { label: "1.5 hours", value: 90 },
];

export function BookingForm() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState(1); // 1: Date/Time, 2: Form, 3: Success
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        if (res.ok) {
          const json = await res.json();
          const bookings = [];
          if (json.data) {
            json.data.forEach(user => {
              if (user.bookings) {
                user.bookings.forEach(booking => bookings.push(booking));
              }
            });
          }
          setBookedSlots(bookings);
        }
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      }
    };
    fetchBookings();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  // Calendar logic
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isDateDisabled = (year, month, day) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Disable past dates
    if (date < today) return true;
    
    // Disable Sundays (0 is Sunday in JS Date)
    if (date.getDay() === 0) return true;

    return false;
  };

  // Generate time slots (9 AM to 9 PM IST)
  // 9 AM = 9 * 60 = 540 mins
  // 9 PM = 21 * 60 = 1260 mins
  const generateTimeSlots = () => {
    const slots = [];
    const startMins = 9 * 60;
    const endMins = 21 * 60;
    const interval = 30; // 30 min intervals

    for (let m = startMins; m + selectedDuration <= endMins; m += interval) {
      const hours = Math.floor(m / 60);
      const mins = m % 60;
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
      const displayMins = mins.toString().padStart(2, "0");
      slots.push(`${displayHours}:${displayMins} ${ampm}`);
    }
    return slots;
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.fullName,
        email: data.email,
        phone: Number(data.phone.replace(/\D/g, "")),
        projectType: data.projectType,
        budget: data.budget,
        enquiry: data.details,
        type: "booking",
        date: selectedDate.toISOString().split("T")[0],
        time: selectedTime
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setStep(3);
      } else {
        console.error("Booking failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="glass rounded-[2rem] overflow-hidden min-h-[600px] border border-border/50">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col md:flex-row h-full"
          >
            {/* Left side: Calendar */}
            <div className="w-full md:w-2/3 p-8 border-r border-border/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-accent-green/20 rounded-full flex items-center justify-center text-accent-green">
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-clash font-medium">Select a Date</h2>
                  <p className="text-muted text-sm">Choose your preferred day for the meeting.</p>
                </div>
              </div>

              {/* Duration Picker */}
              <div className="mb-8">
                <label className="text-sm text-muted mb-3 block">Meeting Duration</label>
                <div className="flex flex-wrap gap-3">
                  {DURATIONS.map((dur) => (
                    <button
                      key={dur.value}
                      onClick={() => {
                        setSelectedDuration(dur.value);
                        setSelectedTime(null);
                      }}
                      className={clsx(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                        selectedDuration === dur.value
                          ? "bg-foreground text-background border-foreground"
                          : "bg-transparent text-foreground border-border hover:border-foreground"
                      )}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="max-w-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={prevMonth}
                      className="p-2 rounded-full hover:bg-white/5 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextMonth}
                      className="p-2 rounded-full hover:bg-white/5 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2 text-center text-sm text-muted">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="py-2">{day}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isDisabled = isDateDisabled(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const isSelected =
                      selectedDate?.getDate() === day &&
                      selectedDate?.getMonth() === currentDate.getMonth() &&
                      selectedDate?.getFullYear() === currentDate.getFullYear();

                    return (
                      <button
                        key={day}
                        disabled={isDisabled}
                        onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                        className={clsx(
                          "aspect-square flex items-center justify-center rounded-full text-sm transition-all",
                          isDisabled && "text-muted/30 cursor-not-allowed",
                          !isDisabled && !isSelected && "hover:bg-white/10 hover:text-accent-green",
                          isSelected && "bg-accent-green text-background font-medium shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                        )}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right side: Time slots */}
            <div className="w-full md:w-1/3 p-8 bg-black/20">
              <h2 className="text-xl font-clash font-medium mb-6">Available Times</h2>
              
              {!selectedDate ? (
                <div className="flex flex-col items-center justify-center h-48 text-center text-muted">
                  <Clock className="w-8 h-8 mb-3 opacity-50" />
                  <p className="text-sm">Select a date to view available time slots.</p>
                </div>
              ) : (
                <div className="space-y-3 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="text-sm text-accent-green mb-4">
                    {selectedDate.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })} (IST)
                  </div>
                  
                  {generateTimeSlots().map((time) => {
                    // Extract local YYYY-MM-DD instead of UTC to match how users select dates in local timezone
                    const offset = selectedDate.getTimezoneOffset() * 60000;
                    const localDate = new Date(selectedDate.getTime() - offset);
                    const selectedDateStr = localDate.toISOString().split("T")[0];
                    
                    const isBooked = bookedSlots.some(b => {
                      if (!b.date || !b.time) return false;
                      const bDate = new Date(b.date);
                      const bOffset = bDate.getTimezoneOffset() * 60000;
                      const bDateLocalStr = new Date(bDate.getTime() - bOffset).toISOString().split("T")[0];
                      return bDateLocalStr === selectedDateStr && b.time === time;
                    });
                    
                    return (
                    <div key={time} className="flex gap-2">
                      <button
                        onClick={() => !isBooked && setSelectedTime(time)}
                        disabled={isBooked}
                        className={clsx(
                          "flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all border",
                          isBooked
                            ? "bg-black/10 border-border/50 text-muted/30 cursor-not-allowed line-through"
                            : selectedTime === time
                              ? "bg-accent-green text-background border-accent-green"
                              : "bg-transparent border-border hover:border-accent-green hover:text-accent-green"
                        )}
                      >
                        {time} {isBooked && "(Booked)"}
                      </button>
                      
                      {/* Show confirm button next to selected time */}
                      {selectedTime === time && !isBooked && (
                        <motion.button
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          className="bg-foreground text-background px-4 rounded-xl text-sm font-medium hover:bg-accent-green transition-colors whitespace-nowrap"
                          onClick={() => setStep(2)}
                        >
                          Next
                        </motion.button>
                      )}
                    </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="p-8 md:p-12"
          >
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Calendar
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-clash font-medium mb-4">Confirm Details</h2>
                <div className="bg-black/20 p-6 rounded-2xl space-y-4">
                  <div className="flex gap-3">
                    <CalendarIcon className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted mb-1">Date</p>
                      <p className="font-medium">
                        {selectedDate?.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted mb-1">Time & Duration</p>
                      <p className="font-medium">{selectedTime} ({selectedDuration} min)</p>
                      <p className="text-xs text-muted mt-1">India Standard Time (IST)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <User className="w-4 h-4 text-muted" /> Full Name *
                      </label>
                      <input
                        {...register("fullName")}
                        className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent-green transition-colors"
                        placeholder="John Doe"
                      />
                      {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted" /> Email *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent-green transition-colors"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted" /> Phone Number *
                      </label>
                      <input
                        {...register("phone")}
                        className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent-green transition-colors"
                        placeholder="+1 234 567 8900"
                      />
                      {errors.phone && <p className="text-red-400 text-xs">{errors.phone.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted" /> Project Type
                      </label>
                      <select
                        {...register("projectType")}
                        className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent-green transition-colors appearance-none"
                      >
                        <option value="" className="bg-background">Select type...</option>
                        <option value="web" className="bg-background">Web Development</option>
                        <option value="mobile" className="bg-background">Mobile App</option>
                        <option value="uiux" className="bg-background">UI/UX Design</option>
                        <option value="branding" className="bg-background">Branding</option>
                        <option value="other" className="bg-background">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Budget</label>
                    <select
                      {...register("budget")}
                      className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent-green transition-colors appearance-none"
                    >
                      <option value="" className="bg-background">Select budget...</option>
                      <option value="<5k" className="bg-background">Less than $5,000</option>
                      <option value="5k-10k" className="bg-background">$5,000 - $10,000</option>
                      <option value="10k-25k" className="bg-background">$10,000 - $25,000</option>
                      <option value="25k+" className="bg-background">$25,000+</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Additional Details (Enquiry)</label>
                    <textarea
                      {...register("details")}
                      rows={3}
                      className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent-green transition-colors resize-none"
                      placeholder="Tell us a bit about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-accent-green hover:bg-accent-yellow text-background font-medium rounded-xl transition-colors disabled:opacity-70 flex items-center justify-center gap-2 mt-8"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center px-6"
          >
            <div className="w-24 h-24 bg-accent-green/20 rounded-full flex items-center justify-center text-accent-green mb-8">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-3xl md:text-4xl font-clash font-medium mb-4">Booking Confirmed!</h2>
            <p className="text-muted text-lg max-w-lg mb-8">
              Thank you for scheduling a call with us. We've sent a calendar invitation to your email address with the meeting details.
            </p>
            <div className="bg-black/20 p-6 rounded-2xl space-y-3 mb-10 text-left w-full max-w-md">
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <span className="text-muted">Date:</span>
                <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <span className="text-muted">Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Duration:</span>
                <span className="font-medium">{selectedDuration} Minutes</span>
              </div>
            </div>
            
            <button
              onClick={() => window.location.href = "/"}
              className="px-8 py-3 border border-border hover:bg-white/5 transition-colors rounded-full font-medium"
            >
              Return Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
