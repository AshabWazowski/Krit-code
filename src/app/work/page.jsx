"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "Web Application",
    description: "A comprehensive financial dashboard allowing users to track investments, manage portfolios, and analyze market trends in real-time. Built with modern web technologies for blazing fast performance.",
    image: "/assets/fintech.png",
    link: "https://fintech-dashboard-drab-xi.vercel.app"
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    category: "E-commerce",
    description: "A modern, high-converting e-commerce storefront with seamless checkout, inventory management, and personalized recommendations. Designed to maximize conversion rates.",
    image: "/assets/e-com.png",
    link: "https://dancing-torrone-36031d.netlify.app"
  },
  {
    id: 3,
    title: "Healthcare Portal",
    category: "Web Application",
    description: "A secure clinic portal for booking appointments, accessing medical records, and telemedicine consultations. careDash compliant architecture with a focus on accessibility.",
    image: "/assets/healthcare.png",
    link: "https://fastidious-souffle-5432c4.netlify.app"
  },
  {
    id: 4,
    title: "SocialPlus",
    category: "Social Media App",
    description: "A Gen-Z social platform to share thoughts and ideas. Connect with like-minded people and share your creativity with the world.",
    image: "/assets/socialMedia.png",
    link: "https://social-plus-client.vercel.app"
  },
  {
    id: 5,
    title: "Happy Nails",
    category: "Luxury Spa Salon",
    description: "Experience the luxury of premium nail care with Happy Nails. A full-featured booking platform with a stunning, minimalist design.",
    image: "/assets/salon.png",
    link: "https://my-salon-nu.vercel.app/"
  },
  {
    id: 6,
    title: "The Care Wellness",
    category: "Healthcare Platform",
    description: "A premium healthcare platform for wellness and medical services. Streamlined booking and patient care management.",
    image: "/assets/careWellness.png",
    link: "https://thecarewellness.haiderabbasabidi.com/"
  }
];

export default function WorkPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-green/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-accent-yellow/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-clash font-medium mb-6">Our Work</h1>
          <p className="text-muted text-xl max-w-2xl">
            A selection of recent projects that showcase our expertise in design, development, and digital strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {projects.map((project) => (
            <div key={project.id} className="group relative">
              <div className="relative h-[400px] lg:h-[500px] w-full rounded-[2rem] overflow-hidden mb-8 glass">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6 px-4 py-2 bg-background/80 backdrop-blur-md rounded-full text-sm font-medium z-10">
                  {project.category}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-clash font-medium mb-4 group-hover:text-accent-green transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-muted text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="shrink-0 pt-2">
                  <Link 
                    href={project.link}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-accent-green rounded-full font-medium transition-colors"
                  >
                    Live Demo <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-32 text-center glass p-12 md:p-20 rounded-[3rem]">
          <h2 className="text-4xl md:text-5xl font-clash font-medium mb-6">Have a project in mind?</h2>
          <p className="text-muted text-xl mb-10 max-w-2xl mx-auto">
            Let&apos;s work together to build something extraordinary. We&apos;re currently taking on new projects.
          </p>
          <Link 
            href="/v1/book-appointment"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-green text-background hover:bg-accent-yellow rounded-full font-medium transition-colors text-lg"
          >
            Start Your Project <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
