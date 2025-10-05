import { format } from 'date-fns';
import { Metadata } from 'next';
import Link from 'next/link';

import { BlogHeader } from '@/components/blog-header';
import { SectionHeading } from '@/components/section-heading';
import { ThemeToggle } from '@/components/theme-toggle';
import { getBlogPosts } from '@/lib/blog';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Thoughts on software development, leadership, and building great teams.',
};

const BlogPage = () => {
  const posts = getBlogPosts();

  return (
    <>
      <div className="container flex flex-col items-center">
        <BlogHeader />
        <div className="w-full max-w-4xl px-4 py-24 sm:py-32">
          <SectionHeading heading="Blog" />
          <p className="text-muted-foreground mb-12 text-center">
            Thoughts on software development, leadership, and building great
            teams.
          </p>

          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={cn(
                  'border-border bg-card hover:border-primary group block overflow-hidden rounded-lg border transition-all',
                  'hover:shadow-lg'
                )}
              >
                <div className="flex flex-col gap-0 md:flex-row">
                  {post.image && (
                    <div className="aspect-video w-full overflow-hidden md:w-80 md:shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image}
                        alt={post.title}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <div className="flex items-center justify-between">
                      <time
                        className="text-muted-foreground text-sm"
                        dateTime={post.publishedAt}
                      >
                        {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                      </time>
                      <span className="text-muted-foreground text-sm">
                        {post.readingTime}
                      </span>
                    </div>

                    <h2 className="group-hover:text-primary text-2xl font-bold transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground">{post.summary}</p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
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
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <footer className="text-muted-foreground mt-16 border-t pt-8 text-center text-sm">
            © 2025 Darío Cuevas. All rights reserved.
          </footer>
        </div>
      </div>
      <ThemeToggle className="bg-background hidden sm:fixed sm:bottom-8 sm:right-8 sm:flex" />
    </>
  );
};

export default BlogPage;
