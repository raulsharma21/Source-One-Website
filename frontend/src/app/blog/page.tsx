import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpenText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Source One Blog | Importing Insights & Logistics News",
  description: "Stay informed with the latest articles, tips, and industry news on global importing, logistics, and supply chain management from the Source One blog.",
};

// Force dynamic rendering - avoid fetching backend during build (causes Vercel deploy failures)
export const dynamic = 'force-dynamic';

interface BlogPost {
  id: string;
  content: string;
  generated_at: string;
  word_count: number;
  category: string;
  status: string;
}

// Extract title from HTML content
function extractTitle(htmlContent: string): string {
  const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (titleMatch) {
    return titleMatch[1].replace(/<[^>]*>/g, ''); // Remove any remaining HTML tags
  }
  // Fallback: try h2 or h3
  const h2Match = htmlContent.match(/<h2[^>]*>(.*?)<\/h2>/i);
  if (h2Match) {
    return h2Match[1].replace(/<[^>]*>/g, '');
  }
  return 'Recent Industry Insights';
}

// Extract excerpt from HTML content
function extractExcerpt(htmlContent: string, maxLength: number = 150): string {
  // Remove HTML tags and get plain text
  const plainText = htmlContent.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  
  // Find the first paragraph that's not the title
  const sentences = plainText.split(/[.!?]+/);
  let excerpt = '';
  
  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    if (trimmedSentence.length > 20) { // Skip very short sentences
      excerpt = trimmedSentence;
      break;
    }
  }
  
  if (!excerpt && plainText.length > 0) {
    excerpt = plainText.substring(0, maxLength);
  }
  
  if (excerpt.length > maxLength) {
    excerpt = excerpt.substring(0, maxLength) + '...';
  }
  
  return excerpt || 'Read more about the latest developments in sourcing and importing.';
}

// Format date
function formatDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch {
    return 'Recent';
  }
}

// Smart image generation based on blog content analysis using Picsum Photos
function generateSmartImageUrl(content: string, id: string): string {
  // Analyze content for specific trade/logistics themes
  const themeAnalysis = analyzeContent(content);
  const seed = id.substring(0, 8);
  
  // Use Picsum with intelligent seeding based on content theme
  return `https://picsum.photos/seed/${seed}-${themeAnalysis}/600/338`;
}

function analyzeContent(content: string): string {
  const contentLower = content.toLowerCase();
  
  // Define theme categories with associated keywords
  const themes = {
    shipping: ['shipping', 'maritime', 'port', 'vessel', 'container', 'cargo ship', 'ocean', 'freight'],
    manufacturing: ['manufacturing', 'factory', 'production', 'assembly', 'industrial', 'plant', 'facility'],
    logistics: ['logistics', 'warehouse', 'distribution', 'supply chain', 'fulfillment', 'storage'],
    trade: ['trade', 'import', 'export', 'customs', 'border', 'international', 'commerce', 'tariff'],
    transportation: ['truck', 'freight', 'delivery', 'transport', 'highway', 'railway', 'aviation'],
    technology: ['technology', 'digital', 'automation', 'ai', 'software', 'tech', 'innovation'],
    finance: ['tariff', 'cost', 'price', 'economic', 'financial', 'revenue', 'budget', 'investment'],
    agriculture: ['agriculture', 'farming', 'food', 'agricultural products', 'crops', 'livestock'],
    energy: ['energy', 'oil', 'renewable', 'solar', 'wind', 'power', 'electricity', 'fuel'],
    automotive: ['automotive', 'car', 'vehicle', 'automobile', 'auto', 'motor'],
    textiles: ['textile', 'clothing', 'apparel', 'fabric', 'fashion', 'garment'],
    electronics: ['electronics', 'computer', 'semiconductor', 'chip', 'device', 'hardware']
  };
  
  // Score each theme based on keyword frequency
  let maxScore = 0;
  let dominantTheme = 'business';
  
  for (const [theme, keywords] of Object.entries(themes)) {
    let score = 0;
    keywords.forEach(keyword => {
      const matches = (contentLower.match(new RegExp(keyword, 'g')) || []).length;
      score += matches;
    });
    
    if (score > maxScore) {
      maxScore = score;
      dominantTheme = theme;
    }
  }
  
  return dominantTheme;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('https://source-one-backend.vercel.app/api/blogs', {
      next: { revalidate: 0 } // Always fetch fresh data to see new blogs immediately
    });
    
    if (!response.ok) {
      console.error('Failed to fetch blog posts:', response.status);
      return [];
    }
    
    const data = await response.json();
    return data.blogs || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground flex items-center justify-center tracking-tight min-h-[60px] sm:min-h-[72px]">
          <BookOpenText className="mr-3 h-10 w-10 sm:h-12 sm:w-12 text-[#5DA9E9]" />
          Our Blog
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Stay updated with the latest news, insights, and articles on sourcing and importing from Source One.
        </p>
      </section>

      {blogPosts.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => {
            const title = extractTitle(post.content);
            const excerpt = extractExcerpt(post.content);
            const formattedDate = formatDate(post.generated_at);
            const imageUrl = generateSmartImageUrl(post.content, post.id);
            
            return (
              <Card key={post.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
                <CardHeader className="p-0">
                  <div className="aspect-[16/9] relative w-full">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill 
                      style={{ objectFit: 'cover' }} 
                      className="rounded-t-lg"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <CardTitle className="text-xl font-semibold mb-2 line-clamp-2">{title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mb-3">
                    {formattedDate} • {post.word_count} words
                  </CardDescription>
                  <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">
                    {excerpt}
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto self-start text-primary hover:underline">
                    <Link href={`/blog/${post.id}`}> 
                      Read More &rarr;
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </section>
      ) : (
        <section className="text-center py-10">
          <div className="space-y-4">
            <p className="text-xl text-muted-foreground">No blog posts available yet.</p>
            <p className="text-sm text-muted-foreground">
              Our automated blog generation system will publish new content weekly.
            </p>
          </div>
        </section>
      )}

      <section className="mt-16 p-8 bg-accent text-accent-foreground rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Want to Contribute or Have a Topic Suggestion?</h2>
        <p className="text-center mb-6 max-w-2xl mx-auto">
          We're always looking for fresh perspectives and interesting topics. Reach out if you'd like to contribute or suggest a topic for our blog.
        </p>
        <div className="text-center">
          <Button asChild size="lg" variant="secondary" className="transition-transform hover:scale-105">
            <Link href="/contact">
              Contact Us
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}