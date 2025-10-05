'use client';

export const Footer = () => {
  return (
    <footer className="text-muted-foreground my-2 text-sm">
      © {new Date().getFullYear()}{' '}
      <a
        href="https://github.com/dcuevas"
        className="text-muted-foreground font-medium underline-offset-4 hover:underline"
      >
        Darío Cuevas
      </a>
      . All rights reserved.
    </footer>
  );
};
