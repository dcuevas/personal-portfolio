import { About } from '@/components/about';
import { BlogPreview } from '@/components/blog-preview';
import { Contact } from '@/components/contact';
import { Experience } from '@/components/experience';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Intro } from '@/components/intro';
import { OperatingPrinciples } from '@/components/operatingPrinciples';
import { SectionDivider } from '@/components/section-divider';
import { ThemeToggle } from '@/components/theme-toggle';
import { env } from '@/env.mjs';
import { getLatestBlogPosts } from '@/lib/blog';

const HomePage = async () => {
  const latestPosts = env.NEXT_PUBLIC_ENABLE_BLOG ? getLatestBlogPosts(3) : [];

  return (
    <>
      <div className="container flex flex-col items-center">
        <Header />
        <Intro />
        <SectionDivider />
        <About />
        <Experience />
        <OperatingPrinciples />
        {env.NEXT_PUBLIC_ENABLE_BLOG && <BlogPreview posts={latestPosts} />}
        <Contact />
        <Footer />
      </div>
      <ThemeToggle className="bg-background hidden sm:fixed sm:bottom-8 sm:right-8 sm:flex" />
    </>
  );
};

export default HomePage;
