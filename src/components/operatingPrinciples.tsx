// app/components/operating/OperatingPrinciplesGrid.tsx
'use client';

import * as React from 'react';
import { Layers3, Map, Sparkles, Users } from 'lucide-react';

type Card = {
  title: string | React.ReactNode;
  points: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
};

const ITEMS: Card[] = [
  {
    title: 'THE SERVANT LEADER PARADOX',
    icon: Users,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    points: [
      'Lead by getting out of the way',
      'Scale by doing less, not more',
      'Win by making others successful',
    ],
  },
  {
    title: 'THE WORK BREAKDOWN HERESY',
    icon: Map,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    points: [
      "User stories aren't requirements—they're conversations",
      "The best breakdown reveals what you don't know",
      'Map the journey, not just the features',
    ],
  },
  {
    title: 'THE PLATFORM MINDSET',
    icon: Layers3,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    points: [
      'Build for 10x load, not 2x',
      'Make failure cheap and recovery fast',
      "Let the user's story guide the architecture",
    ],
  },
  {
    title: (
      <>
        THE AI-FIRST <span className="line-through">FUTURE</span> PRESENT
      </>
    ),
    icon: Sparkles,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    points: [
      'Anyone can use AI; few use it well.',
      "AI augments thinking, doesn't replace it",
      'Better tools = better humans',
    ],
  },
];

export function OperatingPrinciples() {
  return (
    <section
      aria-label="My Operating Principles"
      className="mb-14 space-y-6 sm:mb-20"
      id="principles"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          My Operating Principles
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Core beliefs that guide decision-making and leadership approach
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {ITEMS.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <article
              key={index}
              className="border-border bg-card hover:bg-accent/50 rounded-xl border p-6 transition-colors"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className={`rounded-lg p-2 ${card.bgColor}`}>
                  <IconComponent className={`size-5 ${card.color}`} />
                </div>
                <h3 className="text-muted-foreground text-sm font-semibold uppercase tracking-wide">
                  {card.title}
                </h3>
              </div>

              <ul className="space-y-3 pl-1">
                {card.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 text-lg leading-none ${card.color}`}
                      aria-hidden="true"
                    >
                      ↳
                    </span>
                    <span className="text-foreground text-sm leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
