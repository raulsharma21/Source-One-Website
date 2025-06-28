import type { Metadata } from 'next';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from 'next/navigation';

interface BlogPost {
  id: string;
  content: string;
  generated_at: string;
  word_count: number;
  category: string;
  status: string;
}

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Extract title from HTML content for metadata
function extractTitle(htmlContent: string): string {
  const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (titleMatch) {
    return titleMatch[1].replace(/<[^>]*>/g, '');
  }
  const h2Match = htmlContent.match(/<h2[^>]*>(.*?)<\/h2>/i);
  if (h2Match) {
    return h2Match[1].replace(/<[^>]*>/g, '');
  }
  return 'Source One Blog Post';
}

// Extract excerpt for metadata
function extractExcerpt(htmlContent: string): string {
  const plainText = htmlContent.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const sentences = plainText.split(/[.!?]+/);
  
  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    if (trimmedSentence.length > 20) {
      return trimmedSentence.length > 150 
        ? trimmedSentence.substring(0, 150) + '...'
        : trimmedSentence;
    }
  }
  
  return 'Read the latest insights on sourcing and importing from Source One.';
}

// Smart image generation based on blog content analysis using Picsum Photos
function generateSmartImageUrl(content: string, id: string): string {
  // Analyze content for specific trade/logistics themes
  const themeAnalysis = analyzeContent(content);
  const seed = id.substring(0, 8);
  
  // Use Picsum with intelligent seeding based on content theme
  return `https://picsum.photos/seed/${seed}-${themeAnalysis}/800/400`;
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

async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`https://source-one-backend.vercel.app/api/blogs/${id}`, {
      next: { revalidate: 0 } // Always fetch fresh data
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      console.error('Failed to fetch blog post:', response.status);
      return null;
    }
    
    const post = await response.json();
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params; // Await params before using
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Source One',
      description: 'The requested blog post could not be found.',
    };
  }
  
  const title = extractTitle(post.content);
  const description = extractExcerpt(post.content);
  
  return {
    title: `${title} | Source One Blog`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      publishedTime: post.generated_at,
      authors: ['Source One'],
    },
  };
}

function formatDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'UTC'
    });
  } catch {
    return 'Recently Published';
  }
}

function formatReadingTime(wordCount: number): string {
  const wordsPerMinute = 200; // Average reading speed
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params; // Await params before using
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }
  
  const formattedDate = formatDate(post.generated_at);
  const readingTime = formatReadingTime(post.word_count);
  const imageUrl = generateSmartImageUrl(post.content, post.id);
  const title = extractTitle(post.content);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back to Blog Link */}
      <div className="pt-4">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Hero Image */}
      <Card className="overflow-hidden">
        <div className="aspect-[2/1] relative w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-full"
            priority
          />
        </div>
      </Card>

      {/* Blog Post Content */}
      <Card className="shadow-lg">
        <CardContent className="p-8 lg:p-12">
          {/* Article Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-4 border-b">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>{post.word_count} words</span>
            </div>
            <div>
              <span>{readingTime}</span>
            </div>
            <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
              {post.category.replace('_', ' ')}
            </div>
          </div>

          {/* Article Content */}
          <article 
            className="prose prose-lg max-w-none
              prose-headings:text-foreground
              prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-0
              prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-4 prose-h2:mt-8
              prose-h3:text-xl prose-h3:font-medium prose-h3:mb-3 prose-h3:mt-6
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-li:mb-1
              prose-blockquote:border-l-primary prose-blockquote:bg-accent/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
              prose-code:bg-accent prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-accent prose-pre:border"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="text-sm text-muted-foreground">
                <p>Published by <span className="font-medium text-foreground">Source One</span></p>
                <p>Automated industry insights and analysis</p>
              </div>
              
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/blog">
                    More Articles
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}