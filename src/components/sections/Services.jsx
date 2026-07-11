"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Brand Strategy",
    items: ["Identity Design", "Messaging", "Creative Direction", "Market Research"],
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800",
    slug: "brand-service"
  },
  {
    num: "02",
    title: "Experience Design",
    items: ["UX Research", "Wireframes", "Interface Design", "Prototyping"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    slug: "experience-design-service"
  },
  {
    num: "03",
    title: "Development",
    items: ["Next.js", "React", "Headless CMS", "Performance Optimization"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    slug: "development-service"
  }
];

export function Services() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const serviceBlocks = gsap.utils.toArray('.service-block');
      
      serviceBlocks.forEach((block, i) => {
        gsap.from(block, {
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
          },
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-5xl md:text-7xl font-clash font-medium mb-24 max-w-2xl text-balance">
          Solutions Built for <span className="text-accent-green italic">Modern Brands</span>
        </h2>

        <div className="flex flex-col gap-32">
          {services.map((service, index) => (
            <div 
              key={service.num} 
              className={`service-block flex flex-col gap-12 lg:gap-24 items-center ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              }`}
            >
              
              {/* Text Content */}
              <div className="flex-1 w-full relative">
                <div className="text-[120px] md:text-[200px] font-clash font-bold text-border absolute -top-16 md:-top-32 left-0 leading-none select-none -z-10">
                  {service.num}
                </div>
                
                <h3 className="text-4xl md:text-5xl font-clash font-medium mb-8 pt-8">
                  {service.title}
                </h3>
                
                <ul className="space-y-4">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-xl text-muted">
                      <div className="w-2 h-2 rounded-full bg-accent-green" />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <Link href={`/${service.slug}`} className="mt-12 group flex items-center gap-4 text-foreground font-medium hover:text-accent-green transition-colors w-fit">
                  <span className="border-b border-foreground group-hover:border-accent-green pb-1 transition-colors">
                    Explore Service
                  </span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-x-2 transition-transform">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group">
                  <div className="absolute inset-0 bg-accent-green/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
