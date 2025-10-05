# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website showcasing professional experience, skills, and contact information. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Live at https://dariocuevas.vercel.app

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (uses Turbopack)
pnpm run dev

# Production build
pnpm run build

# Start production server
pnpm start

# Preview build locally
pnpm run preview

# Linting
pnpm run lint          # Check for issues
pnpm run lint:fix      # Auto-fix issues

# Formatting
pnpm run format:check  # Check formatting
pnpm run format:write  # Apply formatting

# Type checking
pnpm run typecheck

# Testing
pnpm run test          # Run tests in watch mode
pnpm run test:ui       # Run tests with UI
pnpm run test:coverage # Run tests with coverage report
```

## Architecture

### Core Structure

- **App Router**: Single-page portfolio using Next.js 15 App Router (`src/app/`)
- **Component-based sections**: Each portfolio section is a standalone component in `src/components/`
- **Server Actions**: Email functionality uses Next.js Server Actions (`src/actions/send-email.ts`)
- **Type-safe environment**: Environment variables validated with `@t3-oss/env-nextjs` and Zod (`src/env.mjs`)
- **Blog/Articles**: MDX-based blog using Contentlayer for content management (`src/content/blog/*.mdx`)

### Key Patterns

**Section Navigation System**
- `ActiveSectionProvider` (context) tracks which section is currently visible
- `useSectionInView` hook combines `react-intersection-observer` with context
- Each section component uses this hook to register itself
- Header navigation highlights active section based on scroll position
- Prevents nav updates during user clicks (1-second debounce)

**Data Management**
- Static content lives in `src/lib/data.tsx` (experience, links, skills)
- Site configuration in `src/lib/site-config.ts`
- Portfolio content is hardcoded, not CMS-driven

**Styling Approach**
- Tailwind CSS with custom theme using CSS variables (`hsl(var(--color))` pattern)
- Three custom font families: sans, mono, heading (defined in `src/lib/fonts.ts`)
- Theme switching via `next-themes` with dark mode support
- Radix UI components for accessible dialog/primitives

**Email Contact Form**
- Form validation: React Hook Form + Zod schema (`src/lib/form-schema.ts`)
- Server Action sends email via Resend API
- Toast notifications via Sonner

**Blog System**
- **Content Management**: Contentlayer processes MDX files from `src/content/blog/`
- **Configuration**: `contentlayer.config.ts` defines Blog document type with computed fields
- **MDX Plugins**:
  - `remark-gfm` for GitHub Flavored Markdown
  - `rehype-slug` for heading IDs
  - `rehype-pretty-code` for syntax highlighting (github-dark theme)
  - `rehype-autolink-headings` for anchor links
- **Computed Fields**:
  - `slug`: Auto-generated from filename
  - `readingTime`: Calculated using `reading-time` package
  - `structuredData`: JSON-LD for SEO
- **Blog Helpers** (`src/lib/blog.ts`):
  - `getBlogPosts()`: Returns all published posts sorted by date
  - `getLatestBlogPosts(limit)`: Returns N most recent posts
  - `getBlogPost(slug)`: Returns single post by slug
  - `getRelatedPosts(slug, limit)`: Returns related posts based on tags
- **Components**:
  - `BlogPreview`: Shows latest posts on homepage (conditionally via feature flag)
  - `BlogHeader`: Navigation for blog pages
  - `MDXContent`: Renders MDX content with `useMDXComponent`
- **Routes**:
  - `/blog`: All blog posts listing
  - `/blog/[slug]`: Individual blog post pages
- **MDX Frontmatter Fields**:
  - `title` (required): Post title
  - `publishedAt` (required): ISO date string
  - `summary` (required): Post description
  - `image` (optional): Hero image path
  - `tags` (optional): Array of tag strings
  - `published` (optional): Boolean, defaults to true

### Path Aliases

Uses `@/*` for all imports (maps to `./src/*`):
```typescript
import { Component } from '@/components/component'
import { useHook } from '@/hooks/use-hook'
import { data } from '@/lib/data'
```

### ESLint Import Ordering

Enforced via `simple-import-sort` plugin:
1. CSS imports
2. Node built-ins, React, external packages
3. Components
4. Lib and hooks
5. Relative imports

## Environment Variables

Required `.env` file:
```bash
SITE_URL='https://example.com'               # For sitemap generation
RESEND_API_KEY='your_resend_api_key'         # For contact form emails
GOOGLE_SITE_VERIFICATION_ID='optional_id'    # Google Search Console
NEXT_PUBLIC_ENABLE_BLOG='true'               # Toggle blog section (true/false, defaults to true)
```

All validated in `src/env.mjs` using t3-oss/env-nextjs.

### Feature Flags

**Blog Section Toggle**
- Set `NEXT_PUBLIC_ENABLE_BLOG='false'` to hide the blog section and remove it from navigation
- Controlled in `src/env.mjs` with boolean transformation
- Affects: `src/app/page.tsx` (BlogPreview component), `src/lib/data.tsx` (navigation links)
- Requires rebuild after changing

## Code style
- TypeScript strict mode
- Single quotes, no semicolons
- Use functional patterns where possible

## Build System

- **Next.js 15** with Turbopack for fast development
- **Post-build**: Automatically generates sitemap via `next-sitemap`
- **Git hooks**: Husky + lint-staged runs ESLint and Prettier on pre-commit

## Adding New Sections

1. Create component in `src/components/[section-name].tsx`
2. Add section to `src/app/page.tsx` import and JSX
3. Register in `src/lib/data.tsx` links array
4. Add type to `src/lib/types.ts` SectionName union
5. Component should use `useSectionInView('[SectionName]')` hook

## Adding New Blog Posts

1. Create new `.mdx` file in `src/content/blog/[slug].mdx`
2. Add required frontmatter fields:
   ```mdx
   ---
   title: 'Your Post Title'
   publishedAt: '2025-01-15'
   summary: 'Brief description of the post'
   image: '/images/post-image.jpg' # optional
   tags: ['tag1', 'tag2'] # optional
   published: true # optional, defaults to true
   ---

   Your MDX content here...
   ```
3. Contentlayer will auto-generate types and process the content
4. Post appears automatically in blog listings when `published: true`

## Testing

### Test Setup
- **Framework**: Vitest with React Testing Library
- **Configuration**: `vitest.config.ts` with jsdom environment
- **Test Location**: Tests colocated in `__tests__` directories alongside source code

### Running Tests
```bash
pnpm run test          # Watch mode (interactive)
pnpm run test:ui       # Visual UI for debugging tests
pnpm run test:coverage # Generate coverage report
```

### Current Test Coverage
- **Blog helpers** (`src/lib/__tests__/blog.test.ts`):
  - `getBlogPosts()` - filtering published posts, sorting
  - `getLatestBlogPosts()` - limiting results
  - `getBlogPost()` - finding by slug
  - `getRelatedPosts()` - tag-based recommendations
- **Feature flags** (`src/lib/__tests__/feature-flags.test.ts`):
  - `NEXT_PUBLIC_ENABLE_BLOG` environment variable transformation
  - Navigation link filtering based on feature flags

### Writing New Tests
1. Create `__tests__` directory next to the code you're testing
2. Name test files with `.test.ts` or `.test.tsx` extension
3. Use Vitest globals (`describe`, `it`, `expect`) - no imports needed
4. Mock external dependencies with `vi.mock()`
5. Use `@testing-library/react` for component tests

### Test Best Practices
- Test behavior, not implementation
- Use descriptive test names (what/when/expected)
- Mock external dependencies (APIs, environment variables)
- Aim for 60-70% coverage on critical paths
- Run tests before committing changes

## CI/CD

### GitHub Actions
Automated CI pipeline runs on push to `main` and feature branches (`feat/**`), and on pull requests:

1. **Lint** - ESLint checks
2. **Type Check** - TypeScript validation
3. **Test** - Vitest unit tests
4. **Build** - Next.js production build

Configuration: `.github/workflows/ci.yml`

The pipeline must pass before merging pull requests. Tests are not run during local builds to keep development fast.

## Deployment

Deployed on Vercel. Build command: `pnpm run build`. Sitemap auto-generates post-build at `/sitemap.xml`.

**Note:** Vercel builds will succeed even if GitHub Actions fails. The CI workflow provides an additional quality gate before merging to main.
