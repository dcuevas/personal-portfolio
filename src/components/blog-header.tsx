'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { links } from '@/lib/data';
import { cn } from '@/lib/utils';

export const BlogHeader = () => {
  return (
    <header className="relative z-[999] w-full">
      <motion.div
        className="bg-background/80 border-border fixed left-1/2 top-0 h-[4.5rem] w-full -translate-x-1/2 rounded-none border shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full dark:border-white/[0.1] dark:shadow-white/[0.03]"
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
      />

      <nav className="fixed left-1/2 top-[0.15rem] flex h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium sm:w-[initial] sm:flex-nowrap sm:gap-5">
          {links.map((link) => (
            <motion.li
              className="relative flex h-3/4 items-center justify-center"
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={cn(
                  'hover:text-foreground flex w-full items-center justify-center p-3 transition',
                  link.name === 'Blog'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
                href={`/${link.hash}`}
              >
                {link.name}
              </Link>

              {link.name === 'Blog' && (
                <motion.span
                  className="bg-muted absolute inset-0 -z-10 rounded-full"
                  layoutId="activeSection"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
