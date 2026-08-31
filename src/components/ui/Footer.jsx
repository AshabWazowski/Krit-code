import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="relative bg-[#07050a] pt-20 pb-10 border-t border-border/30 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/10 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <h3 className="text-3xl font-extrabold tracking-tight mb-4">
                            Biz<span className="text-primary">Dash</span>
                        </h3>
                        <p className="text-foreground/60 text-sm leading-relaxed mb-6">
                            Elevating digital presence through expert engineering, stunning UI/UX, and results-driven strategies.
                            Built to scale.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70 hover:text-primary transition-colors hover:-translate-y-1 duration-300">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70 hover:text-primary transition-colors hover:-translate-y-1 duration-300">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70 hover:text-primary transition-colors hover:-translate-y-1 duration-300">
                                <Github className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70 hover:text-primary transition-colors hover:-translate-y-1 duration-300">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Links: Menu */}
                    <div>
                        <h4 className="font-bold mb-6 tracking-wide">Menu</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">About Us</a></li>
                            <li><a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Services</a></li>
                            <li><a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Blog</a></li>
                            <li><a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Links: Services */}
                    <div>
                        <h4 className="font-bold mb-6 tracking-wide">Services</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Digital Marketing</a></li>
                            <li><a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Web Development</a></li>
                            <li><a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">SEO Optimization</a></li>
                            <li><a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">View All</a></li>
                        </ul>
                    </div>

                    {/* Links: Help */}
                    <div>
                        <h4 className="font-bold mb-6 tracking-wide">Help</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">FAQs</a></li>
                            <li><a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Location</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-foreground/40">
                        © {new Date().getFullYear()} BizDash. All Rights Reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-foreground/40">
                        <a href="#" className="hover:text-foreground transition-colors">English (US)</a>
                        <a href="#" className="hover:text-foreground transition-colors">Support</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
