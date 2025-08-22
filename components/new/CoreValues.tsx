'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const values = [
  {
    title: "Authenticity",
    description: "We honor the centuries-old tradition of Neapolitan pizza, bringing its authentic spirit to the modern era with our gluten-free promise.",
    imageUrl: "/images/hero/pizza.model.jpg",
  },
  {
    title: "Quality",
    description: "From our specially milled flour to the freshest toppings, we never compromise on quality. Every ingredient is chosen to create the ultimate pizza experience.",
    imageUrl: "/images/hero/truffle.jpg",
  },
  {
    title: "Inclusivity",
    description: "We believe everyone deserves great pizza. Our 100% gluten-free kitchen ensures that people with dietary restrictions can dine with confidence and joy.",
    imageUrl: "/images/hero/pizza.02.jpg",
  },
];

const ParallaxSection = ({ title, description, imageUrl }: { title: string, description: string, imageUrl: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y,
        }}
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 text-center text-white p-8">
        <motion.h2 
          className="text-6xl md:text-8xl font-extrabold uppercase"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl max-w-2xl mx-auto mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
};

const CoreValues = () => {
  return (
    <div>
      {values.map((value, index) => (
        <ParallaxSection key={index} {...value} />
      ))}
    </div>
  );
};

export default CoreValues;
