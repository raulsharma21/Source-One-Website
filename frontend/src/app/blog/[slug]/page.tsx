
import type { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Button } from '@/components/ui/button';
import { CalendarDays, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PostProps {
  params: {
    slug: string;
  };
}

interface PostData {
  title: string;
  date: string;
  excerpt: string;
  imageUrl?: string;
  imageHint?: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog');

export async function generateStaticParams() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter(filename => filename.endsWith('.md'))
    .map((filename) => ({
      slug: filename.replace(/\.md$/, ''),
    }));
}

async function getPostData(slug: string): Promise<PostData | null> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title || 'Untitled Post',
    date: data.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    excerpt: data.excerpt || '',
    imageUrl: data.imageUrl,
    imageHint: data.imageHint,
    content: content,
  };
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const post = await getPostData(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  return {
    title: `${post.title} | Source One Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PostProps) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-12">
      <header className="py-8">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" asChild className="mb-6 text-[#5DA9E9] hover:text-[#5DA9E9]/80">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-muted-foreground text-sm">
            <CalendarDays className="mr-2 h-4 w-4 text-[#5DA9E9]" />
            <span>Published on {post.date}</span>
          </div>
        </div>
      </header>

      {post.imageUrl && (
        <section className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority // Prioritize loading hero image for blog post
              data-ai-hint={post.imageHint || 'blog post image'}
            />
          </div>
        </section>
      )}

      <section className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8">
            {/* Basic Markdown rendering: newlines become <br>, wrap in prose for styling */}
            <div 
              className="prose prose-lg max-w-none text-foreground dark:prose-invert prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} 
            />
          </CardContent>
        </Card>
      </section>

      <section className="mt-16 p-8 bg-muted/50 text-center rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Enjoyed this article?</h2>
        <p className="max-w-xl mx-auto text-muted-foreground mb-6">
          Share it with your network or check out more insights on our blog.
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link href="/blog">
            More Blog Posts
          </Link>
        </Button>
      </section>
    </article>
  );
}
