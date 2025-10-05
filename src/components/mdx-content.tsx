'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';

type MDXContentProps = {
  code: string;
};

export const MDXContent = ({ code }: MDXContentProps) => {
  const Component = useMDXComponent(code);
  return <Component />;
};
