"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().optional(),
  email: z.string().email("Invalid email address"),
  budget: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const budgets = ["<$10k", "$10k-$50k", "$50k-$100k", "$100k+"];
const projectTypes = ["Website", "Web App", "Mobile App", "Brand Identity", "Other"];

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    reset();
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-accent-green/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Left Side Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-clash font-medium leading-[1.1] mb-8">
              Let's Build Something <span className="italic text-accent-green">Exceptional</span>
            </h2>
            <p className="text-xl text-muted max-w-md mb-12">
              Whether you're launching a startup or scaling an enterprise, we'd love to hear about your vision.
            </p>
            
            <div className="space-y-8 mb-12">
              <div>
                <h4 className="font-medium mb-2">Email</h4>
                <a href="mailto:hello@studio.com" className="text-xl md:text-2xl font-clash text-muted hover:text-accent-green transition-colors">hello@studio.com</a>
              </div>
              <div>
                <h4 className="font-medium mb-2">Office</h4>
                <address className="text-xl md:text-2xl font-clash text-muted not-italic">
                  <br />San Francisco, CA 94107
                </address>
              </div>
            </div>
            
            <div>
              <Link href="/v1/book-appointment" className="inline-flex items-center gap-2 px-8 py-4 text-background bg-foreground hover:bg-accent-green transition-colors rounded-full font-medium">
                Schedule Consultation <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="glass p-8 md:p-12 rounded-[2.5rem]">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center text-center h-full py-16 space-y-6"
              >
                <div className="w-20 h-20 bg-accent-green/20 rounded-full flex items-center justify-center text-accent-green mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-3xl font-clash font-medium text-foreground">Thank you for contacting!</h3>
                <p className="text-muted text-lg max-w-sm">We've received your inquiry and will get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input
                    {...register("name")}
                    id="name"
                    type="text"
                    className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-accent-green transition-colors peer text-lg"
                    placeholder=" "
                  />
                  <label htmlFor="name" className="absolute left-0 top-4 text-muted peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-accent-green peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted transition-all duration-300 pointer-events-none">
                    Name*
                  </label>
                  {errors.name && <span className="text-red-400 text-sm mt-1 absolute -bottom-6 left-0">{errors.name.message}</span>}
                </div>
                
                <div className="relative group">
                  <input
                    {...register("company")}
                    id="company"
                    type="text"
                    className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-accent-green transition-colors peer text-lg"
                    placeholder=" "
                  />
                  <label htmlFor="company" className="absolute left-0 top-4 text-muted peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-accent-green peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted transition-all duration-300 pointer-events-none">
                    Business Name
                  </label>
                </div>
              </div>

              <div className="relative group">
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-accent-green transition-colors peer text-lg"
                  placeholder=" "
                />
                <label htmlFor="email" className="absolute left-0 top-4 text-muted peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-accent-green peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted transition-all duration-300 pointer-events-none">
                  Email*
                </label>
                {errors.email && <span className="text-red-400 text-sm mt-1 absolute -bottom-6 left-0">{errors.email.message}</span>}
              </div>
              
              {/* <div className="space-y-4 pt-4">
                <label className="text-sm text-muted">Project Type</label>
                <div className="flex flex-wrap gap-3">
                  {projectTypes.map((type) => (
                    <label key={type} className="cursor-pointer">
                      <input type="radio" value={type} {...register("projectType")} className="peer sr-only" />
                      <div className="px-6 py-3 rounded-full border border-border peer-checked:bg-accent-green peer-checked:text-background peer-checked:border-accent-green transition-colors hover:border-muted">
                        {type}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <label className="text-sm text-muted">Budget Range</label>
                <div className="flex flex-wrap gap-3">
                  {budgets.map((budget) => (
                    <label key={budget} className="cursor-pointer">
                      <input type="radio" value={budget} {...register("budget")} className="peer sr-only" />
                      <div className="px-6 py-3 rounded-full border border-border peer-checked:bg-accent-green peer-checked:text-background peer-checked:border-accent-green transition-colors hover:border-muted">
                        {budget}
                      </div>
                    </label>
                  ))}
                </div>
              </div> */}

              <div className="relative group pt-4">
                <textarea
                  {...register("message")}
                  id="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-accent-green transition-colors peer text-lg resize-none"
                  placeholder=" "
                />
                <label htmlFor="message" className="absolute left-0 top-8 text-muted peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-accent-green peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted transition-all duration-300 pointer-events-none">
                  Enquiry*
                </label>
                {errors.message && <span className="text-red-400 text-sm mt-1 absolute -bottom-6 left-0">{errors.message.message}</span>}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 rounded-full bg-accent-green text-background font-medium text-lg hover:bg-accent-yellow transition-colors disabled:opacity-70 mt-8"
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </motion.button>
              
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
