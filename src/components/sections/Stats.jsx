"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 18, suffix: "", label: "Industry Awards" },
  { value: 97, suffix: "%", label: "Client Retention" }
];

function Counter({ from, to, suffix, inView }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;

    let start = from;
    const duration = 2000;
    const increment = (to - from) / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        clearInterval(timer);
        setCount(to);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [from, to, inView]);

  return (
    <span className="text-6xl md:text-8xl font-clash font-medium text-foreground">
      {count}
      <span className="text-accent-green">{suffix}</span>
    </span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-secondary" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className="flex flex-col items-center justify-center pt-12 md:pt-0"
            >
              <Counter from={0} to={stat.value} suffix={stat.suffix} inView={isInView} />
              <p className="text-lg text-muted mt-4 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
