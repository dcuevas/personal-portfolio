import { Fraunces, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const fontHeading = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
});

const fontDisplay = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const fonts = [
  fontSans.variable,
  fontMono.variable,
  fontHeading.variable,
  fontDisplay.variable,
];
