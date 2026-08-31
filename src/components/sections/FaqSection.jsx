"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What does a web development agency do?",
    answer: "A web development agency provides comprehensive services to build, maintain, and scale websites and web applications. This includes front-end and back-end coding, UI/UX design integration, database architecture, server management, and ensuring seamless cross-platform compatibility and performance optimization."
  },
  {
    question: "Why are we a top web development agency?",
    answer: "We consistently combine technical excellence with deep business acumen. As a top web development agency, we employ the latest technologies (including AI-driven tools), adhere to rigorous coding standards, and focus heavily on user experience and SEO. Our proven track record of delivering secure, scalable, and high-performing digital solutions sets us apart."
  },
  {
    question: "What makes a web development agency award-winning?",
    answer: "An award-winning web development agency stands out through continuous innovation, exceptional design, robust functionality, and measurable client success. It involves delivering projects that push the boundaries of modern digital experiences, maintaining exceptionally high client satisfaction rates, and contributing actively to the advancement of web technologies."
  },
  {
    question: "How to hire a web development agency?",
    answer: "To hire the right web development agency, start by clearly defining your project scope, goals, and budget. Next, review their past portfolio to assess their technical capabilities and industry experience. Look for genuine client testimonials, evaluate their communication practices, and ensure they follow agile methodologies, prioritizing both security and performance."
  },
  {
    question: "How do you secure a web application?",
    answer: "Securing a web application involves implementing multiple layers of defense. We enforce HTTPS/SSL, implement robust authentication and authorization protocols, and strictly sanitize all user inputs to prevent vulnerabilities like SQL injection and Cross-Site Scripting (XSS). Additionally, we conduct regular security audits and keep all dependencies continuously updated."
  },
  {
    question: "How do you secure a web application where users can upload files?",
    answer: "When developing a web application where users can upload files, security is paramount. We implement strict file type validation (checking MIME types, not just extensions), limit maximum file sizes, and store uploaded files in secure cloud storage outside the public web root. Furthermore, we randomize filenames and implement malware scanning to prevent malicious code execution."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about our web development services and technical approaches.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-border/50 rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-lg pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-border/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
