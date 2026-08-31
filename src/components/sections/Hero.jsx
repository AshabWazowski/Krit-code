"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

const projects = [
  { id: 1, category: "FinTech", num: "01", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" },
  { id: 2, category: "E-commerce", num: "02", image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=600" },
  { id: 3, category: "Healthcare", num: "03", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600" },
  { id: 4, category: "AI Platform", num: "04", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600" }
];

export function Hero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2
      });

      gsap.from(cardsRef.current, {
        y: 150,
        opacity: 0,
        rotation: 5,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-40 pb-20 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent-green/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-accent-yellow/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="max-w-3xl">
            <h1 ref={headlineRef} className="text-5xl md:text-7xl lg:text-8xl font-clash font-medium leading-[1.1] mb-8">
              <div className="overflow-hidden"><span className="block">We Create</span></div>
              <div className="overflow-hidden"><span className="block italic text-accent-green">Digital Products</span></div>
              <div className="overflow-hidden"><span className="block">That Handles</span></div>
              <div className="overflow-hidden"><span className="block">Businesses Workflow</span></div>
            </h1>
            
            <p className="text-lg md:text-xl text-muted max-w-xl mb-12 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
              Your all-in-one digital foundation: Custom workflow dashboards and expert setup for your Social profiles.
            </p>
            
            <div className="flex flex-wrap gap-6 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
              <Link href="/v1/book-appointment" className="px-8 py-4 bg-accent-green hover:bg-accent-yellow text-background rounded-full font-medium transition-colors inline-block text-center">
                Start Your Project
              </Link>
              <button className="px-8 py-4 border border-border hover:bg-card rounded-full font-medium transition-colors">
                View Our Work
              </button>
            </div>
          </div>

          <div className="relative h-[600px] hidden lg:block">
            {/* Floating achievement badge */}
            <div className="absolute top-10 right-10 glass px-6 py-4 rounded-2xl z-20 animate-float">
              <div className="flex gap-4 items-center">
                <div className="text-4xl font-clash text-accent-green">Awwwards</div>
                <div className="text-sm text-muted">Site of the<br/>Day Winner</div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="relative w-full h-full mt-20 ml-10">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className={`absolute w-64 h-80 rounded-2xl overflow-hidden glass shadow-2xl transition-transform hover:scale-105 hover:z-30 cursor-pointer`}
                  style={{
                    top: `${index * 40}px`,
                    left: `${index * 60}px`,
                    zIndex: index
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.category}
                    fill
                    className="object-cover opacity-80 mix-blend-overlay hover:opacity-100 hover:mix-blend-normal transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent p-6 flex flex-col justify-end">
                    <div className="text-accent-green font-clash text-xl mb-1">{project.num}</div>
                    <div className="text-lg font-medium">{project.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
