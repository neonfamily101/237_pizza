/**
 * IrregularImageGallery – artful masonry
 * -------------------------------------------------
 * Dependencies: react, react-dom, framer-motion, tailwindcss
 * Tailwind: https://tailwindcss.com/docs/installation
 *
 * Tips
 * - This layout uses CSS columns for a true masonry flow.
 * - We add deterministic micro-variations (tilt, margin, chrome) per index
 *   so the gallery feels hand-placed yet stable on re-renders.
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// ——— Helpers: deterministic pseudo-random based on index
function seedRand(n: number) {
  // simple LCG for stable randomness per index
  let seed = (n + 1) * 9301 + 49297;
  seed = (seed % 233280);
  return () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
}

function pick<T>(arr: T[], rnd: () => number) {
  return arr[Math.floor(rnd() * arr.length) % arr.length];
}

// ——— Variants for staggered reveal
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export default function IrregularImageGallery() {
  const images = [
    { src: "/images/market/gluten.png", alt: "237 Pizza의 신선한 Gluten" },
    { src: "/images/market/stairs.jpeg", alt: "Stairs" },
    { src: "/images/market/hell.jpg", alt: "Hell" },
    { src: "/images/market/animation_image.png", alt: "Animation 0" },
    { src: "/images/market/inside.jpeg", alt: "매장 내부" },
    { src: "/images/market/inside1.jpeg", alt: "Inside 1" },
    { src: "/images/market/inside2.jpeg", alt: "Inside 2" },
    { src: "/images/market/make.jpeg", alt: "Make" },
    { src: "/images/market/animation_image1.png", alt: "237피자를 만드는 사장님" },
    { src: "/images/market/cheese.png", alt: "237 Pizza의 신선한 Cheese" },
    { src: "/images/market/oil.png", alt: "237 Pizza의 신선한 Oil" },
    { src: "/images/market/olive.png", alt: "237 Pizza의 신선한 Olive" },
    { src: "/images/market/tomato.png", alt: "237 Pizza의 신선한 Tomato" },
  ];

  return (
    <div className="w-screen min-h-screen bg-[#F8F4E9]">
      {/* subtle top gradient + padding frame */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-8">
        <header className="sticky text-center top-0 z-20 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 pt-4 pb-6 backdrop-blur supports-[backdrop-filter]:bg-[#F8F4E9]/70">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#9A3434]">
            Market
          </h1>
          <p className="text-stone-500 text-sm md:text-base mt-1">A hand-placed, irregular mosaic</p>
        </header>

        {/* Masonry via CSS columns */}
        <motion.div
  className="columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]"
  variants={containerVariants}
  initial="hidden"
  animate="show"
>
          {images.map((img, i) => (
            <GalleryItem key={i} index={i} {...img} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ——— Single Card with tasteful irregularities
function GalleryItem({ src, alt, index }: { src: string; alt: string; index: number }) {
  const styles = useMemo(() => {
    const rnd = seedRand(index);

    // slight random tilt (-3° … 3°), stronger on larger screens
    const tilt = (rnd() * 6 - 3).toFixed(2);

    // irregular top offsets (in rem) to desynchronize rows
    const mtOptions = ["mt-0", "mt-2", "mt-4", "mt-6", "mt-8", "mt-10", "mt-12", "mt-16"]; 
    const marginTop = pick(mtOptions, rnd);

    // occasional polaroid frames for visual rhythm (about 1/3)
    const frameStyle = rnd() > 0.66 ? "frame-polaroid" : rnd() > 0.5 ? "frame-thin" : "frame-none";

    // corner radius variety
    const radius = pick(["rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl"], rnd);

    // slight per-card elevation on hover
    const hoverShadow = pick([
      "hover:shadow-xl",
      "hover:shadow-2xl",
      "hover:shadow-lg",
    ], rnd);

    // micro-translate to break strict column alignment
    const xJitter = ((rnd() - 0.5) * 10).toFixed(1); // -5px ~ 5px

    return { tilt, marginTop, frameStyle, radius, hoverShadow, xJitter };
  }, [index]);

  return (
    <motion.figure
      className={[
        "mb-5 break-inside-avoid inline-block w-full align-top",
        styles.marginTop,
      ].join(" ")}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ transform: `translateX(${styles.xJitter}px) rotate(${styles.tilt}deg)` }}
      whileHover={{ rotate: 0, scale: 1.035, zIndex: 10 }}
    >
      <div
        className={[
          "group relative transition-transform will-change-transform",
          styles.frameStyle === "frame-polaroid" && "bg-[#fffdf7] p-3 pb-4 shadow-md border border-stone-200",
          styles.frameStyle === "frame-thin" && "bg-transparent p-[6px] ring-1 ring-stone-200/70 shadow-sm",
          styles.frameStyle === "frame-none" && "bg-transparent",
          styles.radius,
          styles.hoverShadow,
        ].filter(Boolean).join(" ")}
      >
        <div className={["overflow-hidden", styles.radius].join(" ")}> 
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto select-none object-cover"
            onError={(e) => {
              const t = e.currentTarget as HTMLImageElement;
              t.onerror = null;
              t.src = "https://placehold.co/600x500/0b0b0b/ffffff?text=Image+Not+Found";
            }}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 160, damping: 18, mass: 0.6 }}
          />
        </div>

        {/* Polaroid-like caption appears only when framed */}
        {styles.frameStyle === "frame-polaroid" && (
          <figcaption className="mt-2 text-[14px] leading-5 text-stone-500/90 tracking-wide font-bold">
            {alt}
          </figcaption>
        )}

        {/* soft vignette on hover for depth */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 [mask-image:radial-gradient(120%_120%_at_50%_35%,#000_55%,transparent_75%)]" />
      </div>
    </motion.figure>
  );
}

// ——— Tailwind additions (optional)
// Add these to your global.css if you want smoother column gaps on Safari
// .columns-2, .columns-3, .columns-4 { column-gap: theme(spacing.5); }
