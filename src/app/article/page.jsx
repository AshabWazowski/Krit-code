import { SeoContent } from "@/components/sections/SeoContent";
import { BlogGrid } from "@/components/sections/BlogGrid";

export const metadata = {
  title: "Articles | BizDash",
  description: "Read our latest articles on web development and how we can help your business grow.",
};

export default function ArticlePage() {
  return (
    <main className="min-h-screen pt-20 pb-20">
      <BlogGrid />
      <SeoContent />
    </main>
  );
}
