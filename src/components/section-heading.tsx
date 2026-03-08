import { ReactNode } from 'react';

type TProps = {
  heading: string;
  content?: string | ReactNode | undefined;
};

export const SectionHeading = ({ heading, content }: TProps) => {
  return (
    <div className="mb-10 text-center">
      <h2 className="font-heading text-3xl font-semibold">{heading}</h2>
      <div className="bg-primary mx-auto mt-3 h-0.5 w-10 rounded-full opacity-50" />
      {content && (
        <p className="text-muted-foreground mt-4 text-sm">{content}</p>
      )}
    </div>
  );
};
