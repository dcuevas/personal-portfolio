import { allBlogs } from 'contentlayer2/generated';

export function getBlogPosts() {
  return allBlogs
    .filter((post) => post.published)
    .sort((a, b) => {
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    });
}

export function getLatestBlogPosts(limit: number = 3) {
  return getBlogPosts().slice(0, limit);
}

export function getBlogPost(slug: string) {
  return allBlogs.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3) {
  const currentPost = getBlogPost(currentSlug);
  if (!currentPost) return [];

  return allBlogs
    .filter((post) => post.slug !== currentSlug && post.published)
    .filter((post) => {
      // Find posts with overlapping tags
      const currentTags = currentPost.tags || [];
      const postTags = post.tags || [];
      return currentTags.some((tag) => postTags.includes(tag));
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}
