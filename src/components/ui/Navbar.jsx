"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md py-4 border-b border-border" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-clash tracking-wide uppercase">
         Biz<span className="text-accent-green">Dash</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: "Work", path: "/work" },
            { name: "Services", path: "/services" },
            { name: "Articles", path: "/article" },
            { name: "Contact", path: "/v1/book-appointment" }
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/v1/book-appointment"
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-background bg-accent-green hover:bg-accent-yellow transition-colors rounded-full"
          >
            Book Strategy Call
          </Link>
        </motion.div>
        
        {/* Mobile menu button could go here */}
        <button className="md:hidden text-foreground">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
}
