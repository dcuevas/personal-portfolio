import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Feature Flags', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  describe('NEXT_PUBLIC_ENABLE_BLOG', () => {
    it('should default to true when not set', async () => {
      vi.stubEnv('NEXT_PUBLIC_ENABLE_BLOG', undefined);
      const { env } = await import('@/env.mjs');
      expect(env.NEXT_PUBLIC_ENABLE_BLOG).toBe(true);
    });

    it('should be true when set to "true"', async () => {
      vi.stubEnv('NEXT_PUBLIC_ENABLE_BLOG', 'true');
      const { env } = await import('@/env.mjs');
      expect(env.NEXT_PUBLIC_ENABLE_BLOG).toBe(true);
    });

    it('should be false when set to "false"', async () => {
      vi.stubEnv('NEXT_PUBLIC_ENABLE_BLOG', 'false');
      const { env } = await import('@/env.mjs');
      expect(env.NEXT_PUBLIC_ENABLE_BLOG).toBe(false);
    });

    it('should be false for any non-"true" string value', async () => {
      vi.stubEnv('NEXT_PUBLIC_ENABLE_BLOG', 'anything-else');
      const { env } = await import('@/env.mjs');
      expect(env.NEXT_PUBLIC_ENABLE_BLOG).toBe(false);
    });
  });

  describe('Navigation Links with Feature Flag', () => {
    it('should include blog link when flag is true', async () => {
      vi.stubEnv('NEXT_PUBLIC_ENABLE_BLOG', 'true');
      const { links } = await import('@/lib/data');
      const blogLink = links.find((link) => link.name === 'Blog');
      expect(blogLink).toBeDefined();
      expect(blogLink?.hash).toBe('#blog');
    });

    it('should exclude blog link when flag is false', async () => {
      vi.stubEnv('NEXT_PUBLIC_ENABLE_BLOG', 'false');
      const { links } = await import('@/lib/data');
      const blogLink = links.find((link) => link.name === 'Blog');
      expect(blogLink).toBeUndefined();
    });

    it('should preserve other navigation links regardless of flag', async () => {
      vi.stubEnv('NEXT_PUBLIC_ENABLE_BLOG', 'false');
      const { links } = await import('@/lib/data');

      const expectedLinks = [
        'Home',
        'About',
        'Experience',
        'Principles',
        'Contact',
      ];
      const linkNames = links.map((link) => link.name);

      expectedLinks.forEach((name) => {
        expect(linkNames).toContain(name);
      });
    });
  });
});
