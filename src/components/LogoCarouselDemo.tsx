"use client";

import React, { type SVGProps } from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { LogoCarousel, type Logo } from "@/components/ui/logo-carousel";

function ReactIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-11.5 -10.232 23 20.463" {...props}>
      <circle r="2.05" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function TypeScriptIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 128 128" {...props}>
      <path fill="currentColor" d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1A23.09 23.09 0 0177.14 107a24.2 24.2 0 01-3.82-5.37c.15-.12 7.83-4.53 8.75-5 .16-.08.42.22 1.09 1.4a11.24 11.24 0 009.54 5.6c4.51.15 7.5-1.94 7.5-5.3a5.21 5.21 0 00-.74-2.76c-1-1.6-2.83-2.57-8.11-4.9-6-2.63-8.62-4.24-10.86-6.65a16.1 16.1 0 01-3.27-7.07 31.2 31.2 0 01-.29-5.61c.38-8.37 5.17-14 13.2-15.43a34.1 34.1 0 0111.11.35zM73.22 64h14v-7.32H45.89v7.32h14V107h13.33z"/>
    </svg>
  );
}

function TailwindIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 54 33" {...props}>
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"/>
    </svg>
  );
}

function FigmaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 38 57" {...props}>
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M19 28.5a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"/>
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M0 47.5A9.5 9.5 0 019.5 38H19v9.5a9.5 9.5 0 11-19 0z"/>
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M19 0v19h9.5a9.5 9.5 0 100-19H19z"/>
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M0 9.5A9.5 9.5 0 009.5 19H19V0H9.5A9.5 9.5 0 000 9.5z"/>
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M0 28.5A9.5 9.5 0 009.5 38H19V19H9.5A9.5 9.5 0 000 28.5z"/>
    </svg>
  );
}

function VercelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 76 65" {...props}>
      <path fill="currentColor" d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  );
}

function ShopifyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 109 124" {...props}>
      <path fill="currentColor" d="M95.9 23.9c-.1-.6-.6-1-1.1-1-.5 0-9.3-.2-9.3-.2s-7.4-7.2-8.1-7.9c-.7-.7-2.2-.5-2.7-.3 0 0-1.4.4-3.7 1.1-.4-1.3-1-2.8-1.8-4.4-2.6-5-6.5-7.7-11.1-7.7-.3 0-.6 0-1 .1-.1-.2-.3-.3-.4-.5-2-2.2-4.6-3.3-7.7-3.2-6 .2-12 4.5-16.8 12.2-3.4 5.4-6 12.2-6.7 17.5-6.9 2.1-11.7 3.6-11.8 3.7-3.5 1.1-3.6 1.2-4 4.5-.3 2.5-9.5 73-9.5 73l76.4 13.2 33.1-8.2s-13.6-92.3-13.8-93.9zM67.2 16.8l-5.9 1.8c0-.5 0-1.1-.1-1.7-.3-2.8-1.2-5.6-2.5-8.1 3.1.6 5.2 4.1 6.5 8zM56.3 19.2l-12.1 3.7c1.2-4.6 3.4-9.1 6.1-12.1 1-.1 2.4-2.4 3.6-3.6 1.9 3.6 2.6 8.6 2.4 12zM46.4 4.6c1.2 0 2.2.1 3.1.4-1.4 1.3-2.7 2.9-3.9 4.9-3.6 5.7-6.4 14.6-7.4 20.8l-9.5 2.9c1.9-9.7 9.2-28.6 17.7-29z"/>
      <path fill="currentColor" d="M94.8 22.9c-.5 0-9.3-.2-9.3-.2s-7.4-7.2-8.1-7.9c-.3-.3-.6-.4-1-.5l-4.6 93.9 33.1-8.2s-13.6-92.3-13.8-93.9c-.1-.6-.6-1.2-1.1-1.2h-4.2z"/>
    </svg>
  );
}

function StripeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 25" {...props}>
      <path fill="currentColor" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.02 1.04-.06 1.48zm-6.06-5.53c-1.27 0-2.07.94-2.27 2.62h4.39c-.04-1.63-.76-2.62-2.12-2.62zM43.49 5.6a8.99 8.99 0 0 1 3.75-.8v3.97c-.54-.09-1.21-.09-1.8.05-1.6.35-2.66 1.46-2.66 3.56v7.3h-4.35V5.08h4.12l.25 2.04c.57-1.33 2.02-2.09 2.69-1.52zm-13.6 14.11c-3.05 0-5.38-.9-6.56-1.99l1.64-2.89a8.08 8.08 0 0 0 4.7 1.53c1.18 0 1.95-.37 1.95-1.1 0-.93-1.4-1.26-3.02-1.71-2.27-.63-5.07-1.59-5.07-4.86 0-3.05 2.5-4.95 6.12-4.95 2.58 0 4.49.7 5.72 1.56l-1.56 2.89a8.35 8.35 0 0 0-4.07-1.26c-1.1 0-1.87.37-1.87 1.03 0 .8 1.3 1.1 2.87 1.54 2.31.63 5.17 1.59 5.17 4.86 0 3.28-2.7 5.35-6.02 5.35zm-19.5 0c-1.8 0-3.17-.7-4.08-1.82l-.17 1.55H2v-19.3h4.35v6.34c.88-.87 2.1-1.48 3.67-1.48 3.47 0 5.95 2.97 5.95 7.36 0 4.95-2.56 7.35-5.58 7.35zm-.7-11.3c-1.27 0-2.22.6-2.78 1.4v5.16c.56.74 1.46 1.3 2.7 1.3 1.73 0 2.85-1.43 2.85-3.99 0-2.48-1.04-3.87-2.77-3.87z"/>
    </svg>
  );
}

function NextjsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 180" {...props}>
      <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="white"/>
      </mask>
      <g mask="url(#mask0)">
        <circle cx="90" cy="90" r="90" fill="currentColor"/>
        <path d="M149.508 157.52L69.142 54H54v71.976h12.114V69.384l73.885 95.51a90.304 90.304 0 009.509-7.374z" fill="black"/>
        <rect x="115" y="54" width="12" height="72" fill="black"/>
      </g>
    </svg>
  );
}

const allLogos: Logo[] = [
  { name: "React", id: 1, img: ReactIcon },
  { name: "TypeScript", id: 2, img: TypeScriptIcon },
  { name: "Tailwind", id: 3, img: TailwindIcon },
  { name: "Figma", id: 4, img: FigmaIcon },
  { name: "Vercel", id: 5, img: VercelIcon },
  { name: "Shopify", id: 6, img: ShopifyIcon },
  { name: "Stripe", id: 7, img: StripeIcon },
  { name: "Next.js", id: 8, img: NextjsIcon },
];

export function LogoCarouselDemo() {
  return (
    <section className="relative py-16 md:py-24 bg-black">
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2">
            <GradientHeading variant="light" size="sm">
              Teknologiamme
            </GradientHeading>
            <GradientHeading variant="secondary" size="xxs" weight="semi">
              Modernit työkalut parempaan tulokseen
            </GradientHeading>
          </div>

          <LogoCarousel logos={allLogos} columnCount={4} />
        </div>
      </div>
    </section>
  );
}
