import { BicepsFlexed, Bone, Brain, Droplet, Dna, FlaskConical, Fingerprint, HeartPulse, PersonStanding, ShieldPlus, Soup, Wind, type LucideIcon } from 'lucide-react';
import { useId } from 'react';
import type { SystemId } from '../types';

export const SYSTEM_ICONS: Record<SystemId | 'all', LucideIcon> = {
  all: PersonStanding,
  skeletal: Bone,
  muscular: BicepsFlexed,
  nervous: Brain,
  cardiovascular: HeartPulse,
  respiratory: Wind,
  digestive: Soup,
  urinary: Droplet,
  reproductive: Dna,
  endocrine: FlaskConical,
  lymphatic: ShieldPlus,
  integumentary: Fingerprint,
};

export function Logo({ className = 'h-8 w-8' }: { className?: string }) {
  // Unique gradient ID: the sidebar can be rendered twice (desktop column and mobile drawer).
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#67e8f9" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#0b1626" stroke={`url(#${id})`} strokeWidth="2.5" />
      <circle cx="32" cy="15" r="5.5" fill={`url(#${id})`} />
      <path d="M32 22c-6 0-10 3-12 8l-3 9 4 1 4-8v24h5V43h4v13h5V32l4 8 4-1-3-9c-2-5-6-8-12-8z" fill={`url(#${id})`} opacity=".9" />
    </svg>
  );
}
