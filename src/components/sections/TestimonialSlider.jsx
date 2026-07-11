"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah Jenkins",
    position: "CMO",
    company: "Nova Commerce",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    text: "Working with Studio transformed our brand. They didn't just build a website; they engineered an experience that drove our conversion rate up by 150% in the first quarter."
  },
  {
    name: "Michael Chen",
    position: "Founder",
    company: "Atlas Finance",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    text: "The level of strategic thinking they brought to the table was unmatched. The design language they established for us set a new benchmark in our industry."
  },
  {
    name: "Emma Watson",
    position: "Director of Product",
    company: "Pulse Health",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    text: "An incredibly talented team that delivers on their promises. Their attention to detail in both UX and technical execution is truly world-class."
  }
];

function StarRating() {
  return (
    <div className="flex gap-1 mb-6 text-accent-yellow">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialSlider() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-header", {
        scrollTrigger: {
          trigger: ".testimonial-header",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-32 bg-secondary relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="testimonial-header">
            <h2 className="text-5xl md:text-7xl font-clash font-medium mb-8">
              Trusted by <span className="italic text-accent-green">Visionary Teams</span>
            </h2>
            <p className="text-xl text-muted max-w-md">
              We partner with forward-thinking companies to build digital products that leave a lasting impact.
            </p>
          </div>

          <div className="w-full max-w-sm mx-auto lg:max-w-md">
            <Swiper
              effect="cards"
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              className="w-full"
            >
              {testimonials.map((t, index) => (
                <SwiperSlide key={index} className="rounded-3xl bg-card border border-border p-8 shadow-2xl">
                  <StarRating />
                  
                  <p className="text-xl md:text-2xl font-medium leading-relaxed mb-10 text-foreground">
                    "{t.text}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden">
                      <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-clash font-medium text-lg">{t.name}</div>
                      <div className="text-muted text-sm">{t.position}, {t.company}</div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>
    </section>
  );
}
