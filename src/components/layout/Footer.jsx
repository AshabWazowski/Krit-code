import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary pt-24 pb-12 rounded-t-[3rem] mt-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-b border-border pb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-clash font-medium text-balance mb-8">
              Ready to Elevate Your Brand?
            </h2>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium text-background bg-accent-green hover:bg-accent-yellow transition-colors rounded-full"
            >
              Start a Project <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="flex gap-16">
            <div>
              <h4 className="font-clash text-lg mb-6 text-foreground">Navigation</h4>
              <ul className="space-y-4">
                {["Work", "Services", "Studio", "Journal", "Contact"].map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase()}`} className="text-muted hover:text-accent-green transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-clash text-lg mb-6 text-foreground">Social</h4>
              <ul className="space-y-4">
                {["Twitter", "LinkedIn", "Instagram", "Dribbble"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted hover:text-accent-green transition-colors flex items-center gap-1">
                      {item} <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} Studio. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
