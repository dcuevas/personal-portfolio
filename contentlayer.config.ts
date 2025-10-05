import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace('blog/', ''),
  },
  readingTime: {
    type: 'string',
    resolve: (doc) => readingTime(doc.body.raw).text,
  },
  structuredData: {
    type: 'json',
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      image: doc.image
        ? `https://dariocuevas.com${doc.image}`
        : `https://dariocuevas.com/og?title=${encodeURIComponent(doc.title)}`,
      url: `https://dariocuevas.com/blog/${doc._raw.flattenedPath.replace('blog/', '')}`,
      author: {
        '@type': 'Person',
        name: 'Dario Cuevas',
      },
    }),
  },
};

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    publishedAt: {
      type: 'string',
      required: true,
    },
    summary: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
    published: {
      type: 'boolean',
      default: true,
    },
  },
  computedFields,
}));
export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [Blog],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          keepBackground: false,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
});
