"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    title: "Design Systems That Scale",
    category: "Design",
    time: "5 min read",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "The Psychology Behind Great Interfaces",
    category: "UX Research",
    time: "8 min read",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Building Faster Websites with Next.js",
    category: "Engineering",
    time: "6 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600"
  }
];

export function BlogGrid() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.blog-card');
      
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: i * 0.1
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journal" className="py-32 bg-secondary relative" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 className="text-5xl md:text-7xl font-clash font-medium">
            Latest <span className="italic text-accent-green">Insights</span>
          </h2>
          <button className="hidden md:inline-flex px-8 py-4 border border-border hover:bg-card rounded-full font-medium transition-colors">
            View Journal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {articles.map((article, index) => (
            <Link href="/article" key={index} className="blog-card group cursor-pointer flex flex-col h-full">
              
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-8">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-4 py-2 bg-background/80 backdrop-blur-md rounded-full text-xs font-medium uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-muted text-sm mb-4">
                <span>{article.time}</span>
                <div className="w-1 h-1 rounded-full bg-border" />
                <span>Article</span>
              </div>
              
              <h3 className="text-2xl font-clash font-medium group-hover:text-accent-green transition-colors mb-6 line-clamp-2">
                {article.title}
              </h3>
              
              <div className="mt-auto flex items-center justify-between border-t border-border pt-6">
                <span className="font-medium">Read More</span>
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              
            </Link>
          ))}
        </div>
        
        <button className="md:hidden w-full mt-12 px-8 py-4 border border-border hover:bg-card rounded-full font-medium transition-colors">
          View Journal
        </button>
      </div>
    </section>
  );
}
