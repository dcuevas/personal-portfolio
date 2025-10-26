import { format } from 'date-fns';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BlogHeader } from '@/components/blog-header';
import { MDXContent } from '@/components/mdx-content';
import { ThemeToggle } from '@/components/theme-toggle';
import { env } from '@/env.mjs';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { cn } from '@/lib/utils';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const canonicalUrl = env.SITE_URL
    ? `${env.SITE_URL}/blog/${slug}`
    : undefined;

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Dario Cuevas'],
      url: canonicalUrl,
      images: post.image
        ? [post.image]
        : [`/og?title=${encodeURIComponent(post.title)}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: post.image
        ? [post.image]
        : [`/og?title=${encodeURIComponent(post.title)}`],
    },
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="container flex flex-col items-center">
        <BlogHeader />
        <div className="w-full max-w-3xl px-4 py-24 sm:py-32">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center text-sm transition-colors"
          >
            ← Back to articles
          </Link>

          <article>
            <header className="mb-8">
              <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>

              <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                </time>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {post.image && (
                <div className="mt-8 overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}
            </header>

            <div
              className={cn(
                'prose prose-neutral dark:prose-invert max-w-none',
                'prose-headings:font-heading prose-headings:font-bold',
                'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
                'prose-code:before:content-none prose-code:after:content-none',
                'prose-pre:bg-muted prose-pre:border prose-pre:border-border'
              )}
            >
              <MDXContent code={post.body.code} />
            </div>

            {/* JSON-LD structured data for SEO */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(post.structuredData),
              }}
            />
          </article>

          <footer className="text-muted-foreground mt-16 border-t pt-8 text-center text-sm">
            © 2025 Darío Cuevas. All rights reserved.
          </footer>
        </div>
      </div>
      <ThemeToggle className="bg-background hidden sm:fixed sm:bottom-8 sm:right-8 sm:flex" />
    </>
  );
};

export default BlogPostPage;
