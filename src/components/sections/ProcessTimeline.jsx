"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { title: "Discover", subtitle: "Research & Strategy" },
  { title: "Design", subtitle: "UI/UX & Prototyping" },
  { title: "Develop", subtitle: "Frontend & Backend" },
  { title: "Deploy", subtitle: "Launch & Iterate" }
];

export function ProcessTimeline() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the line drawing down
      gsap.fromTo(lineRef.current, 
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".process-steps-container",
            start: "top 50%",
            end: "bottom 70%",
            scrub: 1
          }
        }
      );

      const items = gsap.utils.toArray('.process-step');
      items.forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 70%",
          },
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-32 bg-secondary relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-5xl md:text-7xl font-clash font-medium mb-24 text-center">
          From Idea to <span className="italic text-accent-green">Launch</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Steps */}
          <div className="relative pl-8 md:pl-16 process-steps-container py-12">
            {/* Background line */}
            <div className="absolute left-[7px] md:left-[31px] top-0 bottom-0 w-[2px] bg-border" />
            {/* Animated line */}
            <div ref={lineRef} className="absolute left-[7px] md:left-[31px] top-0 w-[2px] bg-accent-green z-10" />
            
            <div className="flex flex-col gap-16">
              {steps.map((step, index) => (
                <div key={index} className="process-step relative">
                  <div className="absolute -left-[38px] md:-left-[62px] top-2 w-6 h-6 rounded-full bg-secondary border-4 border-accent-green z-20" />
                  
                  <div className="text-accent-green font-clash text-lg mb-2">0{index + 1}</div>
                  <h3 className="text-3xl md:text-4xl font-clash font-medium mb-4">{step.title}</h3>
                  <p className="text-xl text-muted">{step.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="relative h-[600px] hidden lg:block rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-accent-green/20 blur-[100px] rounded-full scale-75 transform -translate-x-1/4" />
            <div className="absolute inset-0 z-10 rounded-3xl overflow-hidden glass p-4">
               <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
                  alt="Process"
                  fill
                  className="object-cover mix-blend-luminosity opacity-80"
                />
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
