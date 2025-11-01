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
  },
  runtimeEnv: {
    SITE_URL: process.env.SITE_URL,
    GOOGLE_SITE_VERIFICATION_ID: process.env.GOOGLE_SITE_VERIFICATION_ID,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXT_PUBLIC_ENABLE_BLOG: process.env.NEXT_PUBLIC_ENABLE_BLOG,
    NEXT_PUBLIC_ENABLE_COMMENTS: process.env.NEXT_PUBLIC_ENABLE_COMMENTS,
  },
});
