/**
 * Minimal line iconography for booth experiences and decorative use.
 * Ported from the Gold Coast design package.
 */

type IconProps = { size?: number; className?: string };

export const Icons = {
  ThreeSixty: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <path d="M3.5 10.5 L2 13 L4.5 14" />
      <path d="M20.5 13.5 L22 11 L19.5 10" />
      <circle cx="12" cy="12" r="2.2" />
    </svg>
  ),
  Glam: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="3" width="14" height="18" rx="7" />
      <circle cx="12" cy="11" r="3.2" />
      <path d="M7.5 18.5 C 9 17 15 17 16.5 18.5" />
    </svg>
  ),
  Camera: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2.5" y="6.5" width="19" height="13" rx="2.5" />
      <path d="M8 6.5 L9.5 4 H14.5 L16 6.5" />
      <circle cx="12" cy="13" r="3.8" />
      <circle cx="18" cy="9.5" r=".6" fill="currentColor" />
    </svg>
  ),
  Mirror: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="11" rx="7" ry="9" />
      <path d="M9 14 C 10 12.5 14 12.5 15 14" />
      <circle cx="9.5" cy="9" r=".7" fill="currentColor" />
      <circle cx="14.5" cy="9" r=".7" fill="currentColor" />
    </svg>
  ),
  Selfie: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <circle cx="12" cy="6.5" r=".8" fill="currentColor" />
      <circle cx="12" cy="13" r="2.5" />
      <path d="M10.5 18.8 H 13.5" />
    </svg>
  ),
  Phone: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 5 C 5 3 7 3 8 4 L 10 6 C 11 7 11 8 10 9 L 9.5 9.5 C 10 11 13 14 14.5 14.5 L 15 14 C 16 13 17 13 18 14 L 20 16 C 21 17 21 19 19 19 C 11 19 5 13 5 5 Z" />
    </svg>
  ),
  Corporate: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="14" rx="1.5" />
      <path d="M3 8 H 21" />
      <circle cx="6" cy="6" r=".6" fill="currentColor" />
      <circle cx="8" cy="6" r=".6" fill="currentColor" />
      <path d="M7 11 H 17" />
      <path d="M7 14 H 13" />
    </svg>
  ),
  Spark: ({ size = 16, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2 L13.5 9 L21 11 L13.5 13 L12 21 L10.5 13 L3 11 L10.5 9 Z" opacity=".95"/>
    </svg>
  ),
  Check: ({ size = 14, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12 L10 17 L19 7"/>
    </svg>
  ),
  Heart: ({ size = 18, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M12 20 C 4 14 3 8 7 6 C 9.5 4.8 11 6 12 7.5 C 13 6 14.5 4.8 17 6 C 21 8 20 14 12 20 Z" />
    </svg>
  ),
  Diamond: ({ size = 18, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" className={className}>
      <path d="M6 4 H18 L22 9 L12 21 L2 9 Z" />
      <path d="M2 9 H22" />
      <path d="M6 4 L10 9 L12 21" />
      <path d="M18 4 L14 9 L12 21" />
      <path d="M10 9 H14" />
    </svg>
  ),
  Briefcase: ({ size = 18, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" className={className}>
      <rect x="3" y="7" width="18" height="13" rx="1.5" />
      <path d="M9 7 V4 H15 V7" />
      <path d="M3 12 H21" />
    </svg>
  ),
  Cake: ({ size = 18, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" className={className}>
      <path d="M3 19 H21" />
      <rect x="4" y="13" width="16" height="6" />
      <path d="M4 16 Q 8 14, 12 16 T 20 16" />
      <path d="M8 9 V 13 M12 8 V 13 M16 9 V 13" />
      <path d="M8 9 C 8 7, 6 7, 8 5 C 10 7, 8 7, 8 9 Z" fill="currentColor" />
    </svg>
  ),
  Scroll: ({ size = 18, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" className={className}>
      <path d="M4 5 V19 C 4 20 5 21 6 21 H18 C 19 21 20 20 20 19 V8 L17 5 Z"/>
      <path d="M8 10 H16 M8 14 H16 M8 18 H13" />
    </svg>
  ),
  School: ({ size = 18, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" className={className}>
      <path d="M2 9 L12 4 L22 9 L12 14 Z" />
      <path d="M6 11 V16 C 6 17.5 9 19 12 19 C 15 19 18 17.5 18 16 V11" />
      <path d="M22 9 V14" />
    </svg>
  ),
  Star: ({ size = 18, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" className={className}>
      <path d="M12 3 L14.5 9 L21 10 L16 14.5 L17.5 21 L12 17.5 L6.5 21 L8 14.5 L3 10 L9.5 9 Z" />
    </svg>
  ),
  Qr: ({ size = 20, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <path d="M14 14 H17 V17 H14 Z M19 14 H21 M14 19 H17 M19 17 V21 M21 19 V21" />
    </svg>
  ),
  Share: ({ size = 20, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" className={className}>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8 11 L16 7 M8 13 L16 17" />
    </svg>
  ),
  Brush: ({ size = 20, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" className={className}>
      <path d="M4 20 C 4 17 6 16 8 16 L 14 10 L 17 13 L 11 19 C 9 21 6 21 4 20 Z" />
      <path d="M14 10 L 18 6 C 19 5 21 5 22 6 C 23 7 23 9 22 10 L 18 14" />
    </svg>
  ),
  Lead: ({ size = 20, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" className={className}>
      <path d="M3 17 L9 11 L13 14 L21 6" />
      <path d="M15 6 H21 V12" />
    </svg>
  ),
};

export type IconName = keyof typeof Icons;

export function boothIconFor(name: string, size = 16) {
  const k = name.toLowerCase();
  if (k.includes('360')) return <Icons.ThreeSixty size={size} />;
  if (k.includes('glam')) return <Icons.Glam size={size} />;
  if (k.includes('mirror')) return <Icons.Mirror size={size} />;
  if (k.includes('selfie')) return <Icons.Selfie size={size} />;
  if (k.includes('audio') || k.includes('guestbook')) return <Icons.Phone size={size} />;
  if (k.includes('open') || k.includes('photo')) return <Icons.Camera size={size} />;
  if (k.includes('corporate') || k.includes('brand')) return <Icons.Corporate size={size} />;
  if (k.includes('lead')) return <Icons.Lead size={size} />;
  if (k.includes('digital') || k.includes('share')) return <Icons.Share size={size} />;
  return <Icons.Spark size={size} />;
}
