
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpenText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const metadata: Metadata = {
  title: "Source One Blog | Importing Insights & Logistics News",
  description: "Stay informed with the latest articles, tips, and industry news on global importing, logistics, and supply chain management from the Source One blog.",
};

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  imageHint: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog');
  if (!fs.existsSync(postsDirectory)) {
    console.warn("Blog posts directory 'src/content/blog' does not exist. No posts will be loaded.");
    return [];
  }
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents); // data is the frontmatter

      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title || 'Untitled Post',
        date: data.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        excerpt: data.excerpt || '',
        imageUrl: data.imageUrl || 'https://placehold.co/600x338.png', // Default placeholder
        imageHint: data.imageHint || 'blog image',
      };
    });

  // Sort posts by date in descending order (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
          Stay updated with the latest news, insights, and articles from Source One.
        </p>
      </section>

      {blogPosts.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
              <CardHeader className="p-0">
                <div className="aspect-[16/9] relative w-full">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill 
                    style={{ objectFit: 'cover' }} 
                    className="rounded-t-lg"
                    data-ai-hint={post.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-grow">
                <CardTitle className="text-xl font-semibold mb-2">{post.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground mb-3">{post.date}</CardDescription>
                <p className="text-muted-foreground mb-4 flex-grow">
                  {post.excerpt}
                </p>
                <Button asChild variant="link" className="p-0 h-auto self-start text-primary hover:underline">
                  <Link href={`/blog/${post.slug}`}> 
                    Read More &rarr;
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      ) : (
        <section className="text-center py-10">
          <p className="text-xl text-muted-foreground">No blog posts yet. Check back soon!</p>
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
