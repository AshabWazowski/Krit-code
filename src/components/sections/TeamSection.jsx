"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Haider Abidi",
    role: "Creative Director",
    bio: "Former lead at major agencies, Alex brings a visionary approach to digital brand experiences.",
    image: "/assets/Haider.png",
    shape: "bg-accent-green"
  },
  {
    name: "Suhail Abbas",
    role: "Lead Designer",
    bio: "Obsessed with micro-interactions and editorial typography. Sophia crafts intuitive interfaces.",
    image: "/assets/Suhail.png",
    shape: "bg-accent-yellow"
  },
  {
    name: "Haider Abidi",
    role: "Technical Lead",
    bio: "A master of modern web frameworks, Marcus ensures our bold designs perform flawlessly.",
    image: "/assets/Haider.png",
    shape: "bg-muted/30"
  }
];

export function TeamSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const members = gsap.utils.toArray('.team-member');
      
      members.forEach((member, i) => {
        gsap.from(member, {
          scrollTrigger: {
            trigger: member,
            start: "top 85%",
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.2)",
          delay: i * 0.15
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-32 bg-background overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-5xl md:text-7xl font-clash font-medium mb-24 text-center">
          Meet the <span className="italic text-accent-green">People</span> Behind the Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16">
          {team.map((member, index) => (
            <div key={index} className="team-member flex flex-col items-center text-center group cursor-pointer">
              
              <div className="relative w-64 h-64 mb-8">
                {/* Decorative background shape */}
                <div className={`absolute inset-0 ${member.shape} rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-110 transform group-hover:scale-125`} />
                
                {/* Portrait */}
                <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-border z-10 bg-secondary">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-clash font-medium mb-2">{member.name}</h3>
              <div className="text-accent-green font-medium mb-4">{member.role}</div>
              <p className="text-muted leading-relaxed max-w-sm">
                {member.bio}
              </p>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
