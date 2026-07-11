"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Nova Commerce", category: "E-commerce Platform", image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800", colSpan: "md:col-span-8", rowSpan: "md:row-span-2" },
  { title: "Atlas Finance", category: "FinTech Dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", colSpan: "md:col-span-4", rowSpan: "md:row-span-1" },
  { title: "Pulse Health", category: "Healthcare Platform", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800", colSpan: "md:col-span-4", rowSpan: "md:row-span-1" },
  { title: "Vertex AI", category: "Artificial Intelligence", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800", colSpan: "md:col-span-4", rowSpan: "md:row-span-2" },
  { title: "Luna Studio", category: "Creative Portfolio", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800", colSpan: "md:col-span-8", rowSpan: "md:row-span-1" },
  { title: "Orbit CRM", category: "SaaS Dashboard", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800", colSpan: "md:col-span-8", rowSpan: "md:row-span-1" }
];

export function PortfolioGrid() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.portfolio-card');
      
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i % 2 === 0 ? 0 : 0.1
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 className="text-5xl md:text-7xl font-clash font-medium text-balance max-w-xl">
            Selected <span className="italic text-accent-green">Works</span>
          </h2>
          <button className="hidden md:inline-flex px-8 py-4 border border-border hover:bg-card rounded-full font-medium transition-colors">
            View All Projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`portfolio-card group relative overflow-hidden rounded-3xl ${project.colSpan} ${project.rowSpan} cursor-pointer`}
            >
              <Image 
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div>
                    <div className="text-accent-green font-medium mb-2">{project.category}</div>
                    <h3 className="text-3xl font-clash font-medium">{project.title}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="md:hidden w-full mt-12 px-8 py-4 border border-border hover:bg-card rounded-full font-medium transition-colors">
          View All Projects
        </button>
      </div>
    </section>
  );
}
