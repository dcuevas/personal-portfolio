'use client';

import { motion } from 'framer-motion';

import { SectionHeading } from '@/components/section-heading';
import { Skills } from '@/components/skills';
import { useSectionInView } from '@/hooks/use-section-in-view';

export const About = () => {
  const { ref } = useSectionInView('About');

  return (
    <motion.section
      ref={ref}
      id="about"
      className="my-10 flex w-full scroll-mt-28 flex-col items-center md:mb-20"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading heading="About Me" />
      <div className="-mt-5 max-w-2xl text-center leading-7">
        <p className="mb-4">
          I&apos;m Darío Cuevas, Engineer Leader from Spain. With over 15 years
          in software development, I have progressed from a hands-on developer
          to a strategic engineering manager, shaping high-quality digital
          products throughout my journey. As a dedicated servant leader, my core
          philosophy is to empower teams through autonomy, fostering a culture
          of ownership and outcome-driven development. I focus on breaking down
          complex work, cultivating a platform mindset, and aligning technology
          with business goals to build high-performing, self-sufficient teams
          that consistently deliver value.
        </p>
        <p>
          I&apos;m always looking for new opportunities where I can contribute,
          learn and grow. If you have a good opportunity that matches my skills
          experience then don&apos;t hesitate to contact me.
        </p>
      </div>
      <Skills />
    </motion.section>
  );
};
