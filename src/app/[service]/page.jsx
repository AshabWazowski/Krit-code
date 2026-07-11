import { notFound } from "next/navigation";
import Image from "next/image";

const serviceDetails = {
  "brand-service": {
    title: "Brand Strategy",
    description: "We build brands that resonate. Our brand strategy services dive deep into the core of your business to uncover your unique value proposition and communicate it effectively to your audience.",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=1200",
    features: [
      {
        title: "Identity Design",
        description: "Crafting visually stunning and meaningful brand identities that stand the test of time."
      },
      {
        title: "Messaging",
        description: "Developing a clear, compelling voice that speaks directly to your target audience."
      },
      {
        title: "Creative Direction",
        description: "Guiding the visual and thematic elements to ensure consistency across all platforms."
      },
      {
        title: "Market Research",
        description: "Analyzing market trends and consumer behavior to position your brand effectively."
      }
    ]
  },
  "experience-design-service": {
    title: "Experience Design",
    description: "Creating intuitive, engaging, and accessible digital experiences. We design with the user in mind, ensuring every interaction is meaningful and delightful.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200",
    features: [
      {
        title: "UX Research",
        description: "Understanding user needs and behaviors through qualitative and quantitative research."
      },
      {
        title: "Wireframes",
        description: "Building the structural foundation of your digital product to optimize user flow."
      },
      {
        title: "Interface Design",
        description: "Designing beautiful, functional interfaces that enhance usability and aesthetics."
      },
      {
        title: "Prototyping",
        description: "Creating interactive prototypes to test and refine the user experience before development."
      }
    ]
  },
  "development-service": {
    title: "Development",
    description: "Bringing designs to life with robust, scalable, and high-performance code. Our development team builds modern web applications tailored to your specific needs.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    features: [
      {
        title: "Next.js",
        description: "Leveraging the power of Next.js for server-side rendering and static site generation."
      },
      {
        title: "React",
        description: "Building dynamic, interactive user interfaces with the React library."
      },
      {
        title: "Headless CMS",
        description: "Implementing flexible content management systems for seamless content updates."
      },
      {
        title: "Performance Optimization",
        description: "Ensuring lightning-fast load times and smooth performance across all devices."
      }
    ]
  }
};

export async function generateMetadata({ params }) {
  const serviceSlug = (await params).service;
  const service = serviceDetails[serviceSlug];

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Antigravity`,
    description: service.description,
  };
}

export default async function ServicePage({ params }) {
  const serviceSlug = (await params).service;
  const service = serviceDetails[serviceSlug];

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-clash font-bold mb-6 text-balance">
            {service.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted text-balance">
            {service.description}
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden mb-24 group">
          <div className="absolute inset-0 bg-accent-green/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Image 
            src={service.image} 
            alt={service.title} 
            fill 
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Features Section */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-clash font-medium mb-16 text-center">
            What we do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {service.features.map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-foreground/5 border border-border hover:border-accent-green transition-colors">
                <div className="w-12 h-12 rounded-full bg-accent-green/20 flex items-center justify-center mb-6 text-accent-green">
                  <span className="font-clash font-medium">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-2xl font-clash font-medium mb-4">{feature.title}</h3>
                <p className="text-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
