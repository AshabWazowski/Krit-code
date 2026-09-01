"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const reviews = [
    {
        name: "Daniel Henry",
        role: "Managing Director",
        review: "Lorem ipsum is simply dummy text of the printing and typesetting industry. BizDash has been the industry's standard for our online marketing strategy.",
        rating: 4.5,
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
        name: "Martin Leo",
        role: "Business Development Executive",
        review: "Their 3D interactive designs and robust backend engineering elevated our business. They delivered exactly what we needed under a tight deadline.",
        rating: 4.7,
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
        name: "David Finch",
        role: "CEO",
        review: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Absolutely incredible performance and attention to detail from the team.",
        rating: 5.0,
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
    {
        name: "Sam Hyper",
        role: "Founder",
        review: "The new web application is blazingly fast and perfectly optimized. Our conversion rates have skyrocketed since the launch. Highly recommended.",
        rating: 5.0,
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    },
    {
        name: "Oliver Alex",
        role: "Managing Director",
        review: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Communication was flawless and the final output exceeded our expectations.",
        rating: 4.8,
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026301d",
    },
];

export const ReviewsCarousel = () => {
    const [width, setWidth] = useState(0);
    const carousel = useRef(null);

    useEffect(() => {
        if (carousel.current) {
            setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
        }
    }, []);

    return (
        <section className="py-24 px-4 w-full relative z-10 overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
                >
                    What Our Clients Have <span className="text-accent">to Say</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-foreground/70 text-lg max-w-2xl mx-auto"
                >
                    Don&apos;t just take our word for it. Here&apos;s what some of our amazing clients have to say about working with us.
                </motion.p>
            </div>

            <motion.div
                ref={carousel}
                className="cursor-grab overflow-hidden max-w-[1400px] mx-auto py-4"
                whileTap={{ cursor: "grabbing" }}
            >
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="flex gap-6 px-4 md:px-12"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            className="min-w-[320px] md:min-w-[400px] glass rounded-3xl p-8 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex -space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.floor(review.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-foreground/20 fill-foreground/20'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xl font-bold text-yellow-500">{review.rating}</span>
                                </div>
                                <p className="text-foreground/80 leading-relaxed font-light mb-8 italic">
                                    "{review.review}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <img
                                    src={review.avatar}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full border-2 border-primary/20 object-cover"
                                    draggable={false}
                                />
                                <div>
                                    <h4 className="font-bold text-base">{review.name}</h4>
                                    <p className="text-xs text-foreground/50">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};
