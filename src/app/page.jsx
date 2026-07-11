import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";
import { TeamSection } from "@/components/sections/TeamSection";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { ContactForm } from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <ProcessTimeline />
      <PortfolioGrid />
      <TestimonialSlider />
      <TeamSection />
      <BlogGrid />
      <ContactForm />
    </>
  );
}
