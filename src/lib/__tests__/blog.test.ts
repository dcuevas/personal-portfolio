import { describe, expect, it, vi } from 'vitest';

import {
  getBlogPost,
  getBlogPosts,
  getLatestBlogPosts,
  getRelatedPosts,
} from '../blog';

// Mock contentlayer data
vi.mock('contentlayer2/generated', () => ({
  allBlogs: [
    {
      slug: 'post-1',
      title: 'First Post',
      publishedAt: '2025-01-15',
      summary: 'First post summary',
      tags: ['nextjs', 'react'],
      published: true,
      body: { raw: 'Content here', code: '' },
    },
    {
      slug: 'post-2',
      title: 'Second Post',
      publishedAt: '2025-01-10',
      summary: 'Second post summary',
      tags: ['typescript', 'react'],
      published: true,
      body: { raw: 'Content here', code: '' },
    },
    {
      slug: 'post-3',
      title: 'Third Post',
      publishedAt: '2025-01-05',
      summary: 'Third post summary',
      tags: ['nextjs', 'typescript'],
      published: true,
      body: { raw: 'Content here', code: '' },
    },
    {
      slug: 'draft-post',
      title: 'Draft Post',
      publishedAt: '2025-01-20',
      summary: 'Draft post summary',
      tags: ['draft'],
      published: false,
      body: { raw: 'Content here', code: '' },
    },
  ],
}));

describe('Blog Helper Functions', () => {
  describe('getBlogPosts', () => {
    it('should return only published posts', () => {
      const posts = getBlogPosts();
      expect(posts).toHaveLength(3);
      expect(posts.every((post) => post.published)).toBe(true);
    });

    it('should return posts sorted by date descending', () => {
      const posts = getBlogPosts();
      expect(posts[0].slug).toBe('post-1');
      expect(posts[1].slug).toBe('post-2');
      expect(posts[2].slug).toBe('post-3');
    });

    it('should not include draft posts', () => {
      const posts = getBlogPosts();
      expect(posts.find((post) => post.slug === 'draft-post')).toBeUndefined();
    });
  });

  describe('getLatestBlogPosts', () => {
    it('should return limited number of posts', () => {
      const posts = getLatestBlogPosts(2);
      expect(posts).toHaveLength(2);
    });

    it('should return posts in correct order', () => {
      const posts = getLatestBlogPosts(2);
      expect(posts[0].slug).toBe('post-1');
      expect(posts[1].slug).toBe('post-2');
    });

    it('should default to 3 posts when no limit provided', () => {
      const posts = getLatestBlogPosts();
      expect(posts).toHaveLength(3);
    });

    it('should handle limit greater than available posts', () => {
      const posts = getLatestBlogPosts(10);
      expect(posts).toHaveLength(3);
    });
  });

  describe('getBlogPost', () => {
    it('should return post by slug', () => {
      const post = getBlogPost('post-1');
      expect(post).toBeDefined();
      expect(post?.title).toBe('First Post');
    });

    it('should return undefined for non-existent slug', () => {
      const post = getBlogPost('non-existent');
      expect(post).toBeUndefined();
    });

    it('should return draft posts when queried directly', () => {
      const post = getBlogPost('draft-post');
      expect(post).toBeDefined();
      expect(post?.published).toBe(false);
    });
  });

  describe('getRelatedPosts', () => {
    it('should return posts with overlapping tags', () => {
      const relatedPosts = getRelatedPosts('post-1');
      expect(relatedPosts.length).toBeGreaterThan(0);

      // post-1 has tags ['nextjs', 'react']
      // post-2 has tag 'react' (overlap)
      // post-3 has tag 'nextjs' (overlap)
      expect(relatedPosts).toContainEqual(
        expect.objectContaining({ slug: 'post-2' })
      );
      expect(relatedPosts).toContainEqual(
        expect.objectContaining({ slug: 'post-3' })
      );
    });

    it('should not include the current post', () => {
      const relatedPosts = getRelatedPosts('post-1');
      expect(
        relatedPosts.find((post) => post.slug === 'post-1')
      ).toBeUndefined();
    });

    it('should return empty array for non-existent post', () => {
      const relatedPosts = getRelatedPosts('non-existent');
      expect(relatedPosts).toEqual([]);
    });

    it('should respect the limit parameter', () => {
      const relatedPosts = getRelatedPosts('post-1', 1);
      expect(relatedPosts).toHaveLength(1);
    });

    it('should return posts sorted by date descending', () => {
      const relatedPosts = getRelatedPosts('post-1');
      if (relatedPosts.length > 1) {
        const dates = relatedPosts.map((post) =>
          new Date(post.publishedAt).getTime()
        );
        const sortedDates = [...dates].sort((a, b) => b - a);
        expect(dates).toEqual(sortedDates);
      }
    });

    it('should not include draft posts', () => {
      const relatedPosts = getRelatedPosts('post-1');
      expect(
        relatedPosts.find((post) => post.slug === 'draft-post')
      ).toBeUndefined();
    });
  });
});
