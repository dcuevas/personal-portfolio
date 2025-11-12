import { Feed } from 'feed';
import { NextResponse } from 'next/server';

import { getBlogPosts } from '@/lib/blog';
import { siteConfig } from '@/lib/site-config';

export async function GET() {
  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: 'en',
    image: `${siteConfig.url}/og-image.png`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Dario Cuevas`,
    feedLinks: {
      rss2: `${siteConfig.url}/blog/feed.xml`,
      json: `${siteConfig.url}/blog/feed.json`,
      atom: `${siteConfig.url}/blog/atom.xml`,
    },
    author: {
      name: 'Dario Cuevas',
      link: siteConfig.url,
    },
  });

  const posts = getBlogPosts();

  posts.forEach((post) => {
    const postUrl = `${siteConfig.url}/blog/${post.slug}`;
    const imageUrl = post.image
      ? post.image.startsWith('http')
        ? post.image
        : `${siteConfig.url}${post.image}`
      : undefined;

    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.summary,
      content: post.summary,
      author: [
        {
          name: 'Dario Cuevas',
          link: siteConfig.url,
        },
      ],
      date: new Date(post.publishedAt),
      image: imageUrl,
      category: post.tags?.map((tag) => ({ name: tag })),
    });
  });

  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
