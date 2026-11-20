import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    SITE_URL: z.string().url().optional(),
    GOOGLE_SITE_VERIFICATION_ID: z.string().min(1).optional(),
    RESEND_API_KEY: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_ENABLE_BLOG: z
      .string()
      .default('true')
      .transform((val) => val === 'true'),
    NEXT_PUBLIC_ENABLE_COMMENTS: z
      .string()
      .default('true')
      .transform((val) => val === 'true'),
    NEXT_PUBLIC_REMARK42_HOST: z
      .string()
      .url()
      .default('https://comments.dariocuevas.com'),
    NEXT_PUBLIC_REMARK42_SITE_ID: z.string().min(1).default('dariocuevas.com'),
  },
  runtimeEnv: {
    SITE_URL: process.env.SITE_URL,
    GOOGLE_SITE_VERIFICATION_ID: process.env.GOOGLE_SITE_VERIFICATION_ID,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXT_PUBLIC_ENABLE_BLOG: process.env.NEXT_PUBLIC_ENABLE_BLOG,
    NEXT_PUBLIC_ENABLE_COMMENTS: process.env.NEXT_PUBLIC_ENABLE_COMMENTS,
    NEXT_PUBLIC_REMARK42_HOST: process.env.NEXT_PUBLIC_REMARK42_HOST,
    NEXT_PUBLIC_REMARK42_SITE_ID: process.env.NEXT_PUBLIC_REMARK42_SITE_ID,
  },
});
