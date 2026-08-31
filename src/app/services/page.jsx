"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

const services = [
  {
    num: "01",
    title: "Brand Strategy",
    description: "We help define your core identity, target audience, and market positioning. Our strategies ensure your brand resonates and stands out in a crowded digital landscape.",
    items: ["Identity Design", "Messaging", "Creative Direction", "Market Research"],
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800",
    slug: "brand-service"
  },
  {
    num: "02",
    title: "Experience Design",
    description: "User-centric design that converts. We craft intuitive and engaging digital experiences that delight users and drive business goals.",
    items: ["UX Research", "Wireframes", "Interface Design", "Prototyping"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    slug: "experience-design-service"
  },
  {
    num: "03",
    title: "Development",
    description: "Robust, scalable, and high-performance engineering. We build modern web applications using the latest technologies to ensure long-term success.",
    items: ["Next.js", "React", "Headless CMS", "Performance Optimization"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    slug: "development-service"
  },
  {
    num: "04",
    title: "Custom Workflow Dashboards",
    description: "Streamline your business operations with tailored internal tools and workflow dashboards. We automate your processes so you can focus on growth.",
    items: ["Internal Tools", "Data Visualization", "Process Automation", "API Integrations"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    slug: "workflow-dashboards"
  },
  {
    num: "05",
    title: "Social Media Setup",
    description: "Expert setup and optimization for your social profiles. We establish a strong foundational presence across all relevant platforms for your brand.",
    items: ["Profile Optimization", "Content Strategy", "Platform Integration", "Analytics Setup"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    slug: "social-media-setup"
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-green/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-accent-yellow/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="mb-24">
          <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-clash font-medium mb-6">Our Services</h1>
          <p className="text-muted text-xl max-w-2xl">
            Comprehensive digital solutions tailored to elevate your business. From strategy to execution, we've got you covered.
          </p>
        </div>

        <div className="flex flex-col gap-32">
          {services.map((service, index) => (
            <div 
              key={service.num} 
              className={`flex flex-col gap-12 lg:gap-24 items-center ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              }`}
            >
              {/* Text Content */}
              <div className="flex-1 w-full relative">
                <div className="text-[120px] md:text-[200px] font-clash font-bold text-border absolute -top-16 md:-top-32 left-0 leading-none select-none -z-10">
                  {service.num}
                </div>
                
                <h2 className="text-4xl md:text-5xl font-clash font-medium mb-6 pt-8">
                  {service.title}
                </h2>
                
                <p className="text-muted text-lg leading-relaxed mb-8 max-w-xl">
                  {service.description}
                </p>
                
                <ul className="space-y-4 mb-12">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-lg text-foreground/80">
                      <div className="w-2 h-2 rounded-full bg-accent-green" />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <Link href={`/v1/book-appointment`} className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-accent-green rounded-full font-medium transition-colors">
                  Discuss This Service <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden group glass">
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
        
        {/* CTA Section */}
        <div className="mt-40 text-center glass p-12 md:p-20 rounded-[3rem]">
          <h2 className="text-4xl md:text-5xl font-clash font-medium mb-6">Ready to transform your business?</h2>
          <p className="text-muted text-xl mb-10 max-w-2xl mx-auto">
            Schedule a free consultation call with our team to discuss your goals and how we can help you achieve them.
          </p>
          <Link 
            href="/v1/book-appointment"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-green text-background hover:bg-accent-yellow rounded-full font-medium transition-colors text-lg"
          >
            Book Strategy Call <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
