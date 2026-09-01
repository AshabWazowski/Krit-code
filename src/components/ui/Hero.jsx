"use client";

import { motion } from "framer-motion";

export const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 max-w-5xl mx-auto"
            >
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                    Elevate Your Digital Presence with Expert <span className="text-primary pr-2">Engineering</span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
                >
                    We build high-converting, fully responsive web applications utilizing dark/light mode best practices and sophisticated 3D aesthetics. Let&apos;s make your vision a reality.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button className="px-8 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all hover:scale-105 active:scale-95 text-lg">
                        Get Started
                    </button>
                    <button className="px-8 py-3.5 rounded-full bg-white text-black hover:bg-white/90 font-medium transition-all hover:scale-105 active:scale-95 text-lg">
                        Get A Quote
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
};
