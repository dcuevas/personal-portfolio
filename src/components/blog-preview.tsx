'use client';

import { Blog } from 'contentlayer/generated';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { SectionHeading } from './section-heading';

import { useSectionInView } from '@/hooks/use-section-in-view';
import { cn } from '@/lib/utils';

type BlogPreviewProps = {
  posts: Blog[];
};

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export const BlogPreview = ({ posts }: BlogPreviewProps) => {
  const { ref } = useSectionInView('Blog', 0.5);

  return (
    <section
      ref={ref}
      id="blog"
      className="mb-14 scroll-mt-28 text-center sm:mb-20"
    >
      <SectionHeading heading="Latest Articles" />
      <p className="text-muted-foreground mb-8">
        Thoughts on software development, leadership, and building great teams
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            <Link
              href={`/blog/${post.slug}`}
              className={cn(
                'border-border bg-card hover:border-primary group block h-full overflow-hidden rounded-lg border text-left transition-all',
                'hover:shadow-lg'
              )}
            >
              <div className="flex h-full flex-col">
                {post.image && (
                  <div className="aspect-video w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center justify-between">
                    <time
                      className="text-muted-foreground text-xs"
                      dateTime={post.publishedAt}
                    >
                      {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                    </time>
                    <span className="text-muted-foreground text-xs">
                      {post.readingTime}
                    </span>
                  </div>

                  <h3 className="group-hover:text-primary line-clamp-2 text-xl font-bold transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground line-clamp-3 flex-1 text-sm">
                    {post.summary}
                  </p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/blog"
          className="hover:bg-primary/90 bg-primary text-primary-foreground inline-flex items-center rounded-full px-6 py-3 font-medium transition-colors"
        >
          View all articles →
        </Link>
      </div>
    </section>
  );
};
