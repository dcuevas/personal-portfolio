'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';

type MDXContentProps = {
  code: string;
};

const components = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: (props: any) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
};

export const MDXContent = ({ code }: MDXContentProps) => {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
};
